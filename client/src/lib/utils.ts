import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the correct public asset path for production (GitHub Pages) and development
 * @param path - Path relative to public folder (e.g., "/images/logo.png")
 * @returns Full path with base URL prepended
 */
export function getAssetPath(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
