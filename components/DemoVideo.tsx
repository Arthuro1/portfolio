"use client";

import { useRef, useState } from "react";

type Labels = { button: string; title: string; credit: string; close: string };

/**
 * A pill that opens a modal player for a video hosted elsewhere, starting at
 * `start` seconds. Nothing loads until the dialog opens; closing stops it.
 * The video's origin must be allowed by media-src in lib/security-headers.js.
 */
export default function DemoVideo({ src, start, labels }: { src: string; start: number; labels: Labels }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };
  const hide = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={show}
        className="inline-flex items-center gap-1.5 rounded-full bg-brand-fill px-3 py-1.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
        </svg>
        {labels.button}
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        // A click on the backdrop lands on the dialog element itself.
        onClick={(e) => e.target === e.currentTarget && hide()}
        aria-label={labels.title}
        className="w-[min(960px,calc(100vw-2rem))] max-w-none rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4">
          <div className="min-w-0">
            <p className="font-display text-lg font-bold leading-snug">{labels.title}</p>
            <p className="mt-0.5 text-xs text-muted">{labels.credit}</p>
          </div>
          <button
            type="button"
            onClick={hide}
            aria-label={labels.close}
            className="shrink-0 rounded-lg border border-line p-2 text-muted transition-colors hover:border-accent-bright hover:text-accent"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {open && (
          <video
            src={`${src}#t=${start}`}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="aspect-video max-h-[calc(100dvh-9rem)] w-full bg-black object-contain"
          />
        )}
      </dialog>
    </>
  );
}
