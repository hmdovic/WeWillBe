/**
 * Single source of truth for the launch page's business-facing config.
 * Anything marked "CONFIRM" below is a placeholder decision made in the
 * absence of real input — cheap to change, but change it before real
 * money is on the line.
 */

// Pre-order window closes here, orders ship the day after.
// CONFIRM: exact time — currently Saturday at noon, matching every other
// countdown this project has used.
export const PREORDER_DEADLINE = "2026-08-08T12:00:00";
export const SHIP_DAY_LABEL = "This Sunday";

export const BRAND = {
  name: "WEWILLBE",
  tagline: ["WE DON'T FOLLOW.", "WE BECOME."],
  collection: "FIRST COLLECTION",
  drop: "LEGENDS",
  contactEmail: "vormiq@outlook.com",
  instagramUrl: "https://www.instagram.com/wewillbe.store",
  tiktokUrl: "https://www.tiktok.com/@wewillbe.store",
};

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export interface Product {
  id: string;
  name: string;
  shortName: string;
  description: string;
  details: string[];
  price: number; // EUR
  frontImage: string;
  backImage: string;
  lifestyleImages: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "legends-tee",
    name: "LEGENDS TEE",
    shortName: "Tee",
    description:
      "Oversized box fit, heavyweight cotton. Plain up front — the wewillbe wordmark and LEGENDS printed clean across the back.",
    details: ["Oversized Box Fit", "Premium Heavyweight Cotton", "Screen-printed back graphic"],
    price: 69.95,
    frontImage: "/images/tee-01-front.jpg",
    backImage: "/images/tee-01-back.jpg",
    lifestyleImages: ["/images/tee-lifestyle-01.jpg", "/images/tee-lifestyle-02.jpg"],
  },
  {
    id: "legends-hoodie",
    name: "LEGENDS HOODIE",
    shortName: "Hoodie",
    // CONFIRM: price — placeholder, consistent with premium hoodie pricing,
    // not yet confirmed by the owner.
    description:
      "Oversized box fit, heavyweight cotton fleece. Plain up front — the wewillbe wordmark and LEGENDS printed clean across the back.",
    details: ["Oversized Box Fit", "Premium Heavyweight Cotton Fleece", "Screen-printed back graphic"],
    price: 129.95,
    frontImage: "/images/hoodie-01-front.jpg",
    backImage: "/images/hoodie-01-back.jpg",
    lifestyleImages: [
      "/images/hoodie-lifestyle-01.jpg",
      "/images/hoodie-lifestyle-02.jpg",
      "/images/hoodie-lifestyle-03.jpg",
    ],
  },
];

// Social proof — a manually-set number, not a fabricated live ticker.
// CONFIRM / update this by hand until it's wired to something real
// (e.g. count of stored pre-orders once there's a backend).
export const JOINED_COUNT = 128;

// EmailJS — see .env.example. Until real values are set, the pre-order
// form falls back to a mailto: link (works today, zero setup) instead of
// silently failing or faking success.
export const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
export const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
export const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
export const EMAILJS_CONFIGURED = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
);

// Google Analytics 4 — same inert-until-configured pattern as the rest of
// this project. Empty by default: no script loads, no banner shows.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
