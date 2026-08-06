"use client";

import { useRef } from "react";
import type { ReactNode, MouseEvent as ReactMouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  strength?: number;
  ariaLabel?: string;
}

/** Wraps a button/link with a subtle cursor-follow "magnetic" pull on
 * hover-capable pointers. Disabled entirely for touch/coarse pointers and
 * prefers-reduced-motion, per the brief's own "handcrafted, not gimmicky"
 * standard — the pull is small (max ~10px) so it reads as premium weight,
 * not a toy. */
export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  type = "button",
  strength = 0.35,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  function handleMouseMove(e: ReactMouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }

  const sharedProps = {
    ref,
    className: `inline-block transition-transform duration-300 ${className}`,
    style: { transitionTimingFunction: "var(--ease-luxury)" },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <a {...sharedProps} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button {...sharedProps} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
