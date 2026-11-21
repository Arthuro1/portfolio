"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/context/LanguageContext";
import { resolveSafeHref } from "@/lib/safe-url";
import { OPEN_CHAT_EVENT } from "@/lib/chat-events";

type Message = { role: "user" | "assistant"; content: string };

// Keep in sync with CHAT_MAX_MESSAGE_LENGTH default; purely a UX guard, the
// server is the real authority.
const MAX_INPUT_LENGTH = 1500;

export default function ChatWidget() {
  const { t } = useLanguage();
  const chat = t.chat;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Time of the last open, so a double-click on the toggle doesn't open and
  // immediately close the panel again.
  const openedAt = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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

  // Focus the input when the panel opens (not on touch screens, where it would
  // pop up the keyboard over the suggestions); Escape closes it.
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      // Prevent empty or duplicate concurrent submissions.
      if (!trimmed || loading) return;

      setError(null);
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setInput("");
      setLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        // Stateless contract: only the current message is sent. The visible
        // transcript is kept in local React state and never trusted by the API.
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed }),
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

        if (!opened) {
          // Stream produced nothing at all.
          setError(chat.errors.unavailable);
        }
      } catch (err) {
        // Aborts (unmount / panel close) are intentional and silent.
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError(chat.errors.generic);
        }
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [loading, chat.errors],
  );

  return (
    <>
      {/* No hover translate: moving the button away from the cursor made
          clicks near its bottom edge miss. */}
      <button
        ref={toggleRef}
        type="button"
        onClick={toggle}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-brand-fill text-white shadow-[0_10px_30px_-8px_rgb(var(--brand-fill)/0.9)] ring-2 ring-accent-bright/0 hover:ring-accent-bright hover:brightness-110 transition-all flex items-center justify-center"
        aria-label={open ? "Close assistant" : "Open assistant"}
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
        <div id="chat-panel" className="panel-in fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] max-w-sm sm:w-96 max-h-[min(520px,calc(100dvh-10.5rem))] bg-surface rounded-2xl shadow-2xl border border-line flex flex-col overflow-hidden" role="dialog" aria-label={chat.title}>
          <div className="bg-brand-fill px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold font-display">P</div>
            <div>
              <p className="text-white text-sm font-semibold leading-none">{chat.title}</p>
              <p className="text-white/75 text-xs mt-0.5">{chat.subtitle}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted text-center py-2">{chat.greeting}</p>
                <div className="space-y-2">
                  {chat.suggestions.map((s) => (
                    <button key={s} onClick={() => send(s)}
                      className="w-full text-left text-sm px-3 py-2 rounded-lg border border-line text-ink hover:border-accent-bright hover:text-accent transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
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
                      <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {loading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
              <div className="flex justify-start">
                <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-bl-sm bg-raised">
                  <span className="flex gap-1 items-center py-0.5">
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div role="alert" className="text-xs text-red-600 dark:text-red-400 text-center px-2 py-1">
                {error}
              </div>
            )}
            <div ref={bottomRef} />
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
              className="flex-1 min-w-0 text-sm px-3 py-2 rounded-lg border border-line focus:outline-none focus:border-accent-bright bg-bg text-ink placeholder:text-muted"
              disabled={loading}
            />
            <button onClick={() => send(input)} disabled={loading || !input.trim()}
              className="px-3 py-2 bg-brand-fill text-white rounded-lg hover:brightness-110 disabled:opacity-40 transition" aria-label="Send">
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
