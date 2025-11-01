import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// scroll to element
export function scrollTo(elementOrSelector: Element | string | null) {
  let element: Element | null = null;
  
  if (typeof elementOrSelector === 'string') {
    element = document.querySelector(elementOrSelector);
  } else {
    element = elementOrSelector;
  }
  
  if (!element) {
    console.warn('scrollTo: element not found', elementOrSelector);
    return;
  }

  // Calculate offset for navbar (assuming navbar height is ~80px)
  const navHeight = 80;

  // On mobile, use native smooth scrolling for better performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
  
  if (isMobile) {
    // Calculate position with navbar offset for mobile
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementTop - navHeight);
    
    // Use native window.scrollTo for smooth, performant scrolling on mobile
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    return;
  }

  // Desktop: Use locomotive-scroll for smooth behavior
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof window !== 'undefined' && (window as { locomotive?: unknown }).locomotive) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
      const locomotive = (window as { locomotive?: any }).locomotive;
      const elementTop = (element as HTMLElement).offsetTop;
      const scrollPosition = Math.max(0, elementTop - navHeight);
      
      // Try using locomotive's scrollTo method - different APIs for different versions
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (typeof locomotive.scrollTo === 'function') {
        // Try with element first
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          locomotive.scrollTo(element, {
            offset: -navHeight,
          });
          return;
        } catch (e) {
          // If that fails, try with position
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            locomotive.scrollTo(scrollPosition);
            return;
          } catch (e2) {
            console.warn('Locomotive scrollTo failed, using fallback');
          }
        }
      }
      
      // Fallback: calculate position and scroll
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (locomotive.scroll?.instance) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        locomotive.scroll.instance.scrollTo(scrollPosition, {
          duration: 1000,
          easing: [0.25, 0.0, 0.35, 1.0],
        });
        return;
      }
    } catch (error) {
      console.warn('Error using locomotive scroll:', error);
    }
  }

  // Fallback to native scrollIntoView with offset
  const elementRect = element.getBoundingClientRect();
  const offsetPosition = elementRect.top + window.pageYOffset - navHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}
