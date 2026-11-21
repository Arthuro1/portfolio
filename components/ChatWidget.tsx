"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/context/LanguageContext";
import { resolveSafeHref } from "@/lib/safe-url";
import { OPEN_CHAT_EVENT, STREAM_INTERRUPTED } from "@/lib/chat-events";
import { buildHistory, HISTORY_LIMITS } from "@/lib/chat-history";
import type { ChatTurn } from "@/lib/chat-validation";
import EmailLink from "@/components/EmailLink";
import { CheckIcon, MailIcon } from "@/components/icons";

type Message = ChatTurn;

// Purely a UX guard; the server is the real authority.
const MAX_INPUT_LENGTH = HISTORY_LIMITS.maxMessageLength;
const FOLLOW_UPS_SHOWN = 2;
// Below Tailwind's `sm`, where the open panel covers most of the page.
const SMALL_SCREEN = "(max-width: 639px)";
const FOCUS_RING = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";
const CHIP = `text-left text-sm px-3 py-2 min-h-10 rounded-2xl border border-line text-ink hover:border-accent-bright hover:text-accent transition-colors ${FOCUS_RING}`;

export default function ChatWidget() {
  const { t } = useLanguage();
  const chat = t.chat;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Read out by screen readers: "Answering…" while loading, then the finished answer once (not per streamed chunk).
  const [status, setStatus] = useState("");
  const [fabHidden, setFabHidden] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasLoading = useRef(false);
  // Time of the last open, so a double-click on the toggle doesn't open and
  // immediately close the panel again.
  const openedAt = useRef(0);

  // Follow new content, but stop once the latest answer's first line reaches the
  // top, so a long answer and the follow-ups below it never push its start out of
  // view. Never scrolls up (the visitor may be reading further down); errors
  // always scroll into view.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let top = scroller.scrollHeight - scroller.clientHeight;
    if (answerRef.current && !error) {
      const offset = answerRef.current.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
      top = Math.min(top, scroller.scrollTop + offset - 16);
    }
    if (top <= scroller.scrollTop) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }, [messages, loading, error]);

  // Cancel any in-flight request when the component unmounts.
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // Cancel any in-flight request when the panel is closed.
  useEffect(() => {
    if (!open) abortRef.current?.abort();
  }, [open]);

  const show = useCallback(() => {
    openedAt.current = Date.now();
    setFabHidden(false);
    setOpen(true);
  }, []);

  const toggle = () => {
    if (!open) return show();
    if (Date.now() - openedAt.current > 400) setOpen(false);
  };

  // Other buttons on the page ("Ask my AI assistant") open the panel.
  useEffect(() => {
    window.addEventListener(OPEN_CHAT_EVENT, show);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, show);
  }, [show]);

  // Focus the input when the panel opens. On touch screens that would pop up
  // the keyboard over the suggestions, so focus the panel itself instead, which
  // lets screen readers announce it. Escape closes it.
  useEffect(() => {
    if (!open) return;
    const target = window.matchMedia("(pointer: fine)").matches ? inputRef : panelRef;
    target.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // When an answer finishes, put the cursor back in the input, which was
  // disabled while loading — unless the visitor has moved focus elsewhere.
  useEffect(() => {
    if (wasLoading.current && !loading && open && window.matchMedia("(pointer: fine)").matches) {
      const active = document.activeElement;
      if (!active || active === document.body || panelRef.current?.contains(active)) {
        inputRef.current?.focus({ preventScroll: true });
      }
    }
    wasLoading.current = loading;
  }, [loading, open]);

  // On phones and touch screens the round button covers content, so it hides
  // while the visitor scrolls down and returns on scroll up or near the end.
  useEffect(() => {
    if (open) return;
    const media = window.matchMedia(`${SMALL_SCREEN}, (pointer: coarse)`);
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 8) return;
      lastY = y;
      const nearEnd = window.innerHeight + y >= document.documentElement.scrollHeight - 160;
      // Never slide the button out of view while it has keyboard focus.
      const keyboardFocused = toggleRef.current?.matches(":focus-visible") ?? false;
      setFabHidden(media.matches && delta > 0 && y > 80 && !nearEnd && !keyboardFocused);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // `retry` resends the last question, which is already in the transcript;
  // any partial answer to it is dropped first.
  const send = useCallback(
    async (text: string, retry = false) => {
      const question = text.trim();
      // Prevent empty or duplicate concurrent submissions.
      if (!question || loading) return;

      let prior = messages;
      if (retry) {
        let last = messages.length - 1;
        while (last >= 0 && messages[last].role !== "user") last--;
        prior = messages.slice(0, Math.max(last, 0));
      }

      setError(null);
      setMessages([...prior, { role: "user", content: question }]);
      if (!retry) setInput("");
      setLoading(true);
      setStatus(chat.answering);

      const controller = new AbortController();
      abortRef.current = controller;

      let finished = "";
      try {
        // The last few turns go along as `history`; the server validates and
        // caps them again and treats them as untrusted.
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: question, history: buildHistory(prior, question) }),
          signal: controller.signal,
        });

        if (!res.ok) {
          setError(errorMessageFor(res, chat.errors));
          return;
        }
        if (!res.body) {
          setError(chat.errors.unavailable);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let assistantText = "";
        let opened = false;

        // Only create the assistant bubble once real content arrives, so a
        // failed request never leaves an empty bubble behind.
        const commit = (text: string) => {
          if (!opened) {
            opened = true;
            setMessages((prev) => [...prev, { role: "assistant", content: text }]);
          } else {
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: text };
              return updated;
            });
          }
        };

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const piece = decoder.decode(value, { stream: true });
          if (!piece) continue;
          assistantText += piece;
          commit(assistantText);
        }

        const tail = decoder.decode();
        if (tail) {
          assistantText += tail;
          commit(assistantText);
        }

        if (assistantText.endsWith(STREAM_INTERRUPTED)) {
          // The provider failed or timed out mid-answer: drop the partial answer so it
          // is neither shown as complete nor sent back as history, and offer Try again.
          setMessages((prev) => prev.slice(0, -1));
          setError(chat.errors.generic);
        } else if (!opened) {
          // Stream produced nothing at all.
          setError(chat.errors.unavailable);
        } else {
          finished = assistantText;
        }
      } catch (err) {
        // Aborts (unmount / panel close) are intentional and silent.
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError(chat.errors.generic);
        }
      } finally {
        setStatus(finished);
        setLoading(false);
        abortRef.current = null;
      }
    },
    [loading, messages, chat.errors, chat.answering],
  );

  // A same-page link scrolls the page natively; on small screens the panel
  // would cover the target, so it closes.
  const closeOnSmallScreen = () => {
    if (window.matchMedia(SMALL_SCREEN).matches) setOpen(false);
  };

  let lastQuestion = "";
  for (const m of messages) if (m.role === "user") lastQuestion = m.content;
  const asked = new Set(messages.filter((m) => m.role === "user").map((m) => m.content));
  const followUps = [...chat.followUps, ...chat.suggestions].filter((q) => !asked.has(q)).slice(0, FOLLOW_UPS_SHOWN);
  const answered = !loading && !error && messages[messages.length - 1]?.role === "assistant";

  return (
    <>
      {/* No hover translate: moving the button away from the cursor made
          clicks near its bottom edge miss. */}
      <button
        ref={toggleRef}
        type="button"
        onClick={toggle}
        onFocus={() => setFabHidden(false)}
        className={`fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-brand-fill text-white shadow-[0_10px_30px_-8px_rgb(var(--brand-fill)/0.9)] ring-2 ring-accent-bright/0 hover:ring-accent-bright hover:brightness-110 transition-all duration-300 motion-reduce:transition-none flex items-center justify-center ${FOCUS_RING} ${
          fabHidden && !open ? "translate-y-24 opacity-0 pointer-events-none" : ""
        }`}
        aria-label={open ? chat.close : chat.open}
        aria-expanded={open}
        aria-controls="chat-panel"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {open && (
        // Height follows the viewport so the header never slides under the
        // navbar or off-screen on short windows (zoomed or small laptops).
        <div ref={panelRef} id="chat-panel" className="panel-in fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] max-w-sm sm:w-96 max-h-[min(520px,calc(100dvh-10.5rem))] bg-surface rounded-2xl shadow-2xl border border-line flex flex-col overflow-hidden focus:outline-none" role="dialog" aria-label={chat.title} tabIndex={-1}>
          <div className="bg-brand-fill px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold font-display">P</div>
            <div>
              <p className="text-white text-sm font-semibold leading-none">{chat.title}</p>
              <p className="text-white/90 text-xs mt-0.5">{chat.subtitle}</p>
            </div>
          </div>

          <div ref={scrollerRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted">{chat.greeting}</p>
                <div className="space-y-2">
                  {chat.suggestions.map((s) => (
                    <button key={s} type="button" onClick={() => send(s)} className={`w-full ${CHIP}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                ref={i === messages.length - 1 && m.role === "assistant" ? answerRef : undefined}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user" ? "bg-brand-fill text-white rounded-br-sm" : "bg-raised text-ink rounded-bl-sm"
                }`}>
                  {m.role === "user" ? (
                    m.content
                  ) : m.content ? (
                    <ReactMarkdown
                      // Raw HTML stays disabled (no rehype-raw). Images and any
                      // non-allowlisted links are stripped; model output is
                      // never treated as HTML.
                      disallowedElements={["img"]}
                      unwrapDisallowed
                      components={{
                        p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-0.5 my-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside space-y-0.5 my-1">{children}</ol>,
                        li: ({ children }) => <li className="leading-snug">{children}</li>,
                        code: ({ children }) => <code className="bg-black/10 rounded px-1 text-xs font-mono">{children}</code>,
                        a: ({ href, children }) => {
                          const safe = resolveSafeHref(href);
                          if (!safe.safe) return <>{children}</>;
                          return (
                            <a
                              href={safe.href}
                              className="underline text-brand"
                              {...(safe.external
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : safe.href.startsWith("#")
                                  ? { onClick: closeOnSmallScreen }
                                  : {})}
                            >
                              {children}
                            </a>
                          );
                        },
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    <span className="flex gap-1 items-center py-0.5">
                      <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce motion-reduce:animate-none" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce motion-reduce:animate-none" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce motion-reduce:animate-none" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {loading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
              <div className="flex justify-start">
                <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-bl-sm bg-raised">
                  <span className="flex gap-1 items-center py-0.5">
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce motion-reduce:animate-none" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce motion-reduce:animate-none" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce motion-reduce:animate-none" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}

            {answered && (
              <div className="space-y-2 pt-1">
                {followUps.length > 0 && (
                  <div role="group" aria-label={chat.followUpsLabel} className="flex flex-wrap gap-2">
                    {followUps.map((q) => (
                      <button key={q} type="button" onClick={() => send(q)} className={CHIP}>
                        {q}
                      </button>
                    ))}
                  </div>
                )}
                <EmailLink
                  className={`inline-flex items-center gap-2 min-h-10 rounded-full border border-brand/50 bg-brand/[0.07] px-4 py-2 text-sm font-semibold text-brand hover:border-brand transition-colors ${FOCUS_RING}`}
                >
                  {(copied) => (
                    <>
                      {copied ? <CheckIcon className="w-4 h-4" /> : <MailIcon className="w-4 h-4" />}
                      <span aria-live="polite">{copied ? chat.emailCopied : chat.emailPaul}</span>
                    </>
                  )}
                </EmailLink>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center gap-2 px-2 py-1">
                <p role="alert" className="text-xs text-red-600 dark:text-red-400 text-center">
                  {error}
                </p>
                {lastQuestion && (
                  <button
                    type="button"
                    onClick={() => send(lastQuestion, true)}
                    className={`min-h-10 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-accent-bright hover:text-accent transition-colors ${FOCUS_RING}`}
                  >
                    {chat.retry}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Links and formatting are unwrapped so markdown syntax isn't read aloud. */}
          <div role="status" className="sr-only">
            <ReactMarkdown allowedElements={[]} unwrapDisallowed>{status}</ReactMarkdown>
          </div>

          <div className="border-t border-line p-3 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder={chat.placeholder}
              aria-label={chat.placeholder}
              maxLength={MAX_INPUT_LENGTH}
              className={`flex-1 min-w-0 text-sm px-3 py-2 rounded-lg border border-line bg-bg text-ink placeholder:text-muted ${FOCUS_RING}`}
              disabled={loading}
            />
            <button type="button" onClick={() => send(input)} disabled={loading || !input.trim()}
              className={`px-3 py-2 bg-brand-fill text-white rounded-lg hover:brightness-110 disabled:opacity-40 transition ${FOCUS_RING}`} aria-label={chat.send}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function errorMessageFor(
  res: Response,
  errors: { generic: string; rateLimited: string; tooLong: string; unavailable: string },
): string {
  switch (res.status) {
    case 429: {
      const retryAfter = res.headers.get("Retry-After");
      return retryAfter
        ? `${errors.rateLimited} (${retryAfter}s)`
        : errors.rateLimited;
    }
    case 413:
      return errors.tooLong;
    case 503:
      return errors.unavailable;
    default:
      return errors.generic;
  }
}
