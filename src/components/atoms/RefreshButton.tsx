"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { revalidateGitHubActivity } from "@/src/lib/actions";

export function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showUpdated, setShowUpdated] = useState(false);
  const didRefresh = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isPending && didRefresh.current) {
      didRefresh.current = false;
      setShowUpdated(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowUpdated(false), 2500);
    }
  }, [isPending]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleClick() {
    didRefresh.current = true;
    setShowUpdated(false);
    startTransition(async () => {
      await revalidateGitHubActivity();
      router.refresh();
    });
  }

  return (
    <span className="gh-refresh-wrap">
      {showUpdated && (
        <span className="gh-updated" aria-live="polite">updated</span>
      )}
      <button
        className={`gh-refresh${isPending ? " is-spinning" : ""}`}
        onClick={handleClick}
        disabled={isPending}
        aria-label="Refresh GitHub activity"
        title="Refresh activity"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path d="M8 16H3v5" />
        </svg>
      </button>
    </span>
  );
}
