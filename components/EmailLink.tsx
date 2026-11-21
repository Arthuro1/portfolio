"use client";

import { useEffect, useRef, useState } from "react";

export const EMAIL = "arthur.meteng@yahoo.com";

/**
 * A mailto link that also copies the address. Where no mail app is set up,
 * mailto does nothing, so the copy is what the visitor gets. `children`
 * renders the content and receives `copied`, true for a few seconds after a click.
 */
export default function EmailLink({
  className,
  label,
  children,
}: {
  className?: string;
  label?: string;
  children: (copied: boolean) => React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).then(
      () => {
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 3000);
      },
      () => {},
    );
  };

  return (
    <a href={`mailto:${EMAIL}`} onClick={copy} className={className} aria-label={label}>
      {children(copied)}
    </a>
  );
}
