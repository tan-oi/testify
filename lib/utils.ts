

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate short unique embed ID (6 characters)
export function generateEmbedId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Validate embed ID format
export function isValidEmbedId(embedId: string): boolean {
  return /^[A-Za-z0-9]{6}$/.test(embedId);
}

// Generate embed URL
export function generateEmbedUrl(embedId: string): string {
  return `${process.env.NEXT_PUBLIC_TRUE_HOST}/embeds/testimonial/${embedId}`;
}


export const getDetailsQueryKey = (slug: string) => ["space", "details", slug];






