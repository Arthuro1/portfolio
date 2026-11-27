"use client";

import { useEffect, useRef, useState } from "react";

// Base64 and decoded only on click, so the address is neither in the served
// HTML nor readable in the JS bundle, where email harvesters would find it.
const ENCODED_EMAIL = "YXJ0aHVyLm1ldGVuZ0B5YWhvby5jb20=";

/**
 * A button that reveals the address on click: it copies it and opens the mail
 * app. Where no mail app is set up, mailto does nothing, so the copy is what
 * the visitor gets. `children` renders the content and receives `copied`, true
 * for a few seconds after a click, and `address`, null until the first click.
 */
export default function EmailLink({
  className,
  label,
  children,
}: {
  className?: string;
  label?: string;
  children: (copied: boolean, address: string | null) => React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const reveal = () => {
    const email = atob(ENCODED_EMAIL);
    setAddress(email);
    navigator.clipboard?.writeText(email).then(
      () => {
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 3000);
      },
      () => {},
    );
    window.location.href = `mailto:${email}`;
  };

  return (
    <button type="button" onClick={reveal} className={className} aria-label={label}>
      {children(copied, address)}
    </button>
  );
}
