import { useLayoutEffect, useRef, useState } from "react";

// A collapsible group whose collapsed part the browser's find-in-page can
// still reach, so a recruiter searching the page for a technology finds it.
// React renders `hidden` only as a boolean (hidden=""), so after each render
// the hidden elements inside `ref` are switched to hidden="until-found".
// When find-in-page reveals one, the browser fires `beforematch` and the
// whole group opens. Browsers without until-found just keep them hidden.
export function useFindable<T extends HTMLElement>() {
  const [open, setOpen] = useState(false);
  const ref = useRef<T>(null);

  // Runs after every render: items can be re-created (e.g. on a language switch).
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || open) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[hidden]"));
    if (root.hidden) targets.push(root);
    const reveal = () => setOpen(true);
    for (const el of targets) {
      el.setAttribute("hidden", "until-found");
      el.addEventListener("beforematch", reveal);
    }
    return () => {
      for (const el of targets) el.removeEventListener("beforematch", reveal);
    };
  });

  return { open, setOpen, ref };
}
