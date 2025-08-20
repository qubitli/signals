import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  return price.toFixed(price < 1 ? 3 : 2)
}
