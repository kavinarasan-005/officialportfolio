import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// scroll to element - simplified and optimized
export function scrollTo(elementOrSelector: Element | string | null) {
  let element: Element | null = null;
  
  if (typeof elementOrSelector === 'string') {
    element = document.querySelector(elementOrSelector);
  } else {
    element = elementOrSelector;
  }
  
  if (!element) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('scrollTo: element not found', elementOrSelector);
    }
    return;
  }

  // Calculate offset for navbar (assuming navbar height is ~80px)
  const navHeight = 80;
  
  // Use native smooth scrolling for all devices (most performant)
  const elementRect = element.getBoundingClientRect();
  const elementTop = elementRect.top + window.pageYOffset;
  const offsetPosition = Math.max(0, elementTop - navHeight);
  
  // Native smooth scroll - works everywhere and is performant
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}
