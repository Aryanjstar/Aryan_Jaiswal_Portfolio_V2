"use client";

import { useEffect, useRef, useState } from "react";

import { onToast } from "@/lib/toast";

/** One toast at a time, announced via role=status; auto-dismisses after 2.4 s. */
export function Toaster() {
  const [msg, setMsg] = useState<{ text: string; id: number; leaving?: boolean } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () =>
      onToast((text) => {
        clearTimeout(timer.current);
        setMsg({ text, id: Date.now() });
        timer.current = setTimeout(() => {
          setMsg((m) => (m ? { ...m, leaving: true } : m));
          timer.current = setTimeout(() => setMsg(null), 160);
        }, 2400);
      }),
    [],
  );

  return (
    <div role="status" aria-live="polite" className="toast-region no-print">
      {msg && (
        <div key={msg.id} className={msg.leaving ? "toast is-leaving" : "toast"}>
          {msg.text}
        </div>
      )}
    </div>
  );
}
