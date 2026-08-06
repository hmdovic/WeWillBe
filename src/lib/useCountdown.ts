"use client";

import { useEffect, useState } from "react";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

function computeCountdown(target: number): CountdownValue {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, isOver: false };
}

/** Ticks every second toward `targetIso`. Starts at the "over" state during
 * SSR/first paint (no Date.now() mismatch), then syncs on mount. */
export function useCountdown(targetIso: string): CountdownValue {
  const target = new Date(targetIso).getTime();
  const [value, setValue] = useState<CountdownValue>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    setValue(computeCountdown(target));
    const id = window.setInterval(() => {
      setValue(computeCountdown(target));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return value;
}
