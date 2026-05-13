export const LIMITS = {
  name: 100,
  company: 120,
  email: 150,
  phone: 40,
  service: 80,
  route: 200,
  message: 5000,
  notes: 5000,
  short: 80,
  medium: 200,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function clean(s: unknown, max: number = LIMITS.medium): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

export function isEmail(s: unknown): s is string {
  return typeof s === "string" && EMAIL_RE.test(s.trim());
}

export function hasHeaderInjection(s: unknown): boolean {
  return typeof s === "string" && /[\r\n]/.test(s);
}

export function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export type FieldErrors = Record<string, string>;
