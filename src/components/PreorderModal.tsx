"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  BRAND,
  EMAILJS_CONFIGURED,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  PRODUCTS,
  SIZES,
} from "@/lib/constants";
import type { Product, Size } from "@/lib/constants";
import { usePreorder } from "./PreorderContext";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Status = "idle" | "submitting" | "sent" | "mailto" | "error";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
  productId: string;
  size: Size | "";
  quantity: number;
  notes: string;
  understands: boolean;
}

function emptyForm(product: Product | null, size: Size | null, quantity: number): FormState {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    country: "",
    productId: product?.id ?? PRODUCTS[0].id,
    size: size ?? "",
    quantity: quantity || 1,
    notes: "",
    understands: false,
  };
}

function buildMailtoBody(form: FormState, productName: string) {
  const lines = [
    "New pre-order — WEWILLBE First Collection",
    "",
    `Name: ${form.firstName} ${form.lastName}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Address: ${form.street} ${form.houseNumber}, ${form.postalCode} ${form.city}, ${form.country}`,
    "",
    `Product: ${productName}`,
    `Size: ${form.size}`,
    `Quantity: ${form.quantity}`,
    form.notes ? `Notes: ${form.notes}` : "",
  ].filter(Boolean);
  return lines.join("\n");
}

export default function PreorderModal() {
  const { isOpen, product, size, quantity, close } = usePreorder();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<FormState>(emptyForm(product, size, quantity));

  useEffect(() => {
    if (isOpen) {
      setForm(emptyForm(product, size, quantity));
      setStatus("idle");
    }
  }, [isOpen, product, size, quantity]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.understands || !form.size) return;

    const selectedProduct = PRODUCTS.find((p) => p.id === form.productId) ?? PRODUCTS[0];
    setStatus("submitting");

    if (EMAILJS_CONFIGURED) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            phone: form.phone,
            street: form.street,
            house_number: form.houseNumber,
            postal_code: form.postalCode,
            city: form.city,
            country: form.country,
            product: selectedProduct.name,
            size: form.size,
            quantity: form.quantity,
            notes: form.notes,
            to_email: BRAND.contactEmail,
          },
          { publicKey: EMAILJS_PUBLIC_KEY }
        );
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    // No EmailJS credentials configured yet — fall back to a real,
    // working mailto: link rather than faking success. See
    // lib/constants.ts and .env.example.
    const subject = encodeURIComponent(`Pre-order — ${selectedProduct.name} (${form.size})`);
    const body = encodeURIComponent(buildMailtoBody(form, selectedProduct.name));
    window.location.href = `mailto:${BRAND.contactEmail}?subject=${subject}&body=${body}`;
    setStatus("mailto");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-stretch justify-center bg-ink/97 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_LUXURY }}
          role="dialog"
          aria-modal="true"
          aria-label="Pre-order"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            className="relative flex h-full w-full max-w-3xl flex-col overflow-y-auto bg-ink px-6 py-16 md:px-14 md:py-20"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_LUXURY }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center text-2xl text-paper/60 hover:text-paper md:right-10 md:top-8"
            >
              &times;
            </button>

            {(status === "sent" || status === "mailto") ? (
              <ConfirmationView status={status} onClose={close} />
            ) : (
              <>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  Pre-Order
                </span>
                <h2 className="mt-3 font-sans text-3xl font-black uppercase leading-none text-paper md:text-5xl">
                  Reserve Yours
                </h2>
                <p className="mt-3 max-w-lg text-sm text-paper/50">
                  This is a pre-order. You won&rsquo;t be charged now — we&rsquo;ll follow up with
                  payment details before it ships this Sunday.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                  <fieldset className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label="First Name" required>
                      <input
                        required
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className={inputClass}
                        autoComplete="given-name"
                      />
                    </Field>
                    <Field label="Last Name" required>
                      <input
                        required
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className={inputClass}
                        autoComplete="family-name"
                      />
                    </Field>
                    <Field label="Email" required>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={inputClass}
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Phone" required>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={inputClass}
                        autoComplete="tel"
                      />
                    </Field>
                  </fieldset>

                  <fieldset className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label="Street" required>
                      <input
                        required
                        value={form.street}
                        onChange={(e) => update("street", e.target.value)}
                        className={inputClass}
                        autoComplete="address-line1"
                      />
                    </Field>
                    <Field label="House Number" required>
                      <input
                        required
                        value={form.houseNumber}
                        onChange={(e) => update("houseNumber", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Postal Code" required>
                      <input
                        required
                        value={form.postalCode}
                        onChange={(e) => update("postalCode", e.target.value)}
                        className={inputClass}
                        autoComplete="postal-code"
                      />
                    </Field>
                    <Field label="City" required>
                      <input
                        required
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        className={inputClass}
                        autoComplete="address-level2"
                      />
                    </Field>
                    <Field label="Country" required className="md:col-span-2">
                      <input
                        required
                        value={form.country}
                        onChange={(e) => update("country", e.target.value)}
                        className={inputClass}
                        autoComplete="country-name"
                      />
                    </Field>
                  </fieldset>

                  <fieldset className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Field label="Product" required>
                      <select
                        required
                        value={form.productId}
                        onChange={(e) => update("productId", e.target.value)}
                        className={inputClass}
                      >
                        {PRODUCTS.map((p) => (
                          <option key={p.id} value={p.id} className="bg-ink">
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Size" required>
                      <select
                        required
                        value={form.size}
                        onChange={(e) => update("size", e.target.value as Size)}
                        className={inputClass}
                      >
                        <option value="" disabled className="bg-ink">
                          Select
                        </option>
                        {SIZES.map((s) => (
                          <option key={s} value={s} className="bg-ink">
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Quantity" required>
                      <input
                        required
                        type="number"
                        min={1}
                        max={9}
                        value={form.quantity}
                        onChange={(e) => update("quantity", Number(e.target.value))}
                        className={inputClass}
                      />
                    </Field>
                  </fieldset>

                  <Field label="Notes (optional)">
                    <textarea
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </Field>

                  <label className="flex items-start gap-3 text-sm text-paper/70">
                    <input
                      required
                      type="checkbox"
                      checked={form.understands}
                      onChange={(e) => update("understands", e.target.checked)}
                      className="mt-1 h-4 w-4 flex-shrink-0 accent-accent"
                    />
                    I understand this is a pre-order.
                  </label>

                  {status === "error" && (
                    <p className="text-sm text-accent">
                      Something went wrong sending that. You can also email us directly at{" "}
                      <a href={`mailto:${BRAND.contactEmail}`} className="underline">
                        {BRAND.contactEmail}
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || !form.understands}
                    className="w-full bg-paper py-5 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-opacity hover:bg-white disabled:opacity-40"
                  >
                    {status === "submitting" ? "Sending…" : "Complete Pre-Order"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  "w-full border-b border-paper/25 bg-transparent py-3 text-sm text-paper placeholder:text-paper/30 focus:border-paper focus:outline-none";

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-paper/50">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
    </label>
  );
}

function ConfirmationView({ status, onClose }: { status: "sent" | "mailto"; onClose: () => void }) {
  return (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_LUXURY }}
    >
      <motion.span
        className="mb-6 h-16 w-16 rounded-full border-2 border-accent"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_LUXURY, delay: 0.1 }}
      />
      {status === "sent" ? (
        <>
          <h2 className="font-sans text-3xl font-black uppercase leading-tight text-paper md:text-5xl">
            Welcome to the
            <br />
            First Collection.
          </h2>
          <p className="mt-5 max-w-sm text-sm text-paper/60">
            Your pre-order has been received. We&rsquo;ll be in touch with payment and shipping
            details before it ships this Sunday.
          </p>
        </>
      ) : (
        <>
          <h2 className="font-sans text-2xl font-black uppercase leading-tight text-paper md:text-4xl">
            Almost there.
          </h2>
          <p className="mt-5 max-w-sm text-sm text-paper/60">
            Your email app should have opened with everything filled in — hit send to confirm
            your pre-order. If nothing opened, email us directly at {BRAND.contactEmail}.
          </p>
        </>
      )}
      <button
        type="button"
        onClick={onClose}
        className="mt-10 border border-paper/30 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-paper hover:border-paper"
      >
        Close
      </button>
    </motion.div>
  );
}
