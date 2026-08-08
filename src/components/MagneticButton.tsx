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
 * hover-capable pointers, plus a press-down scale on every pointer type
 * (mouse or touch) — every button on this site routes through here, so
 * without it none of them had any tactile feedback at all. Disabled
 * entirely for touch/coarse pointers and prefers-reduced-motion, per the
 * brief's own "handcrafted, not gimmicky" standard — the pull is small
 * (max ~10px) so it reads as premium weight, not a toy. The press-scale
 * is combined into the same transform string rather than a separate CSS
 * class, since the class would just lose to this inline style anyway. */
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
  const offset = useRef({ x: 0, y: 0 });
  const pressed = useRef(false);

  function render() {
    const el = ref.current;
    if (!el) return;
    const { x, y } = offset.current;
    el.style.transform = `translate(${x}px, ${y}px) scale(${pressed.current ? 0.97 : 1})`;
  }

  function handleMouseMove(e: ReactMouseEvent) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    offset.current = {
      x: (e.clientX - rect.left - rect.width / 2) * strength,
      y: (e.clientY - rect.top - rect.height / 2) * strength,
    };
    render();
  }

  function handleMouseLeave() {
    offset.current = { x: 0, y: 0 };
    render();
  }

  function handlePressStart() {
    pressed.current = true;
    const el = ref.current;
    // Press feedback needs to feel instant — much faster than the slow
    // magnetic-pull ease it otherwise shares this transform with.
    if (el) el.style.transitionDuration = "120ms";
    render();
  }

  function handlePressEnd() {
    pressed.current = false;
    const el = ref.current;
    if (el) el.style.transitionDuration = "300ms";
    render();
  }

  const sharedProps = {
    ref,
    className: `inline-block transition-transform duration-300 ${className}`,
    style: { transitionTimingFunction: "var(--ease-luxury)" },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handlePressStart,
    onMouseUp: handlePressEnd,
    onTouchStart: handlePressStart,
    onTouchEnd: handlePressEnd,
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
