import { BRAND } from "@/lib/constants";

/** Minimal line icons, no external icon package — two glyphs, used once. */
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M16.6 3c.4 2.4 2 4 4.6 4.2v3.1c-1.6.1-3-.4-4.6-1.4v6.6c0 3.7-3.9 6.3-7.6 4.7-2.6-1.1-3.9-4.1-2.9-6.8 1-2.6 4-3.9 6.6-3v3.3a2.4 2.4 0 1 0 1.7 2.3V3h2.2Z" />
    </svg>
  );
}

export default function SocialLinks({ className = "" }: { className?: string }) {
  // The icons stay small (18px) — the tap target doesn't. Each link is a
  // real 44px box with the icon centered inside, so the hit area meets
  // the 44x44 minimum without inflating how big the icons look; gap-2
  // between the two boxes keeps 8px of real separation between them.
  const tapArea = "flex h-11 w-11 items-center justify-center transition-colors hover:text-paper";
  return (
    <div className={`flex items-center gap-2 text-paper/70 ${className}`}>
      <a
        href={BRAND.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WEWILLBE on Instagram"
        className={tapArea}
      >
        <InstagramIcon />
      </a>
      <a
        href={BRAND.tiktokUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WEWILLBE on TikTok"
        className={tapArea}
      >
        <TikTokIcon />
      </a>
    </div>
  );
}
