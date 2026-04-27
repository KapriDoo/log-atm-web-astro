/**
 * LOG ATM — Tipos TypeScript
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
  anim: string;
}

export interface ServiceItem {
  n: string;
  icon: string;
  title: string;
  desc: string;
  href: string;
  accent: boolean;
}

export interface WhyItem {
  icon: string;
  title: string;
  desc: string;
  anim: string;
}

export interface IndustryItem {
  icon: string;
  name: string;
  sub: string;
  color: string;
}

export interface FooterLink {
  href: string;
  label: string;
}

export interface ButtonProps {
  href: string;
  variant?: 'primary' | 'cta' | 'outline' | 'ghost' | 'whatsapp';
  icon?: string;
  external?: boolean;
}
