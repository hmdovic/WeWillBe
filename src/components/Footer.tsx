import { BRAND } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-ink py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <span className="font-sans text-lg font-black uppercase tracking-[0.04em] text-paper">
          {BRAND.name}
        </span>
        <nav className="flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.1em] text-paper/60">
          <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
            Instagram
          </a>
          <a href={BRAND.tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
            TikTok
          </a>
          <a href={`mailto:${BRAND.contactEmail}`} className="hover:text-paper">
            Email
          </a>
        </nav>
        <p className="text-[0.7rem] text-paper/35">
          &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
