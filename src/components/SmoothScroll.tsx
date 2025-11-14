import { useEffect, createContext, useContext } from "react";
import Lenis from "@studio-freight/lenis";

// Create context to allow components to access Lenis instance
const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // Slightly slower for more luxurious feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easeOut
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2, // Slightly faster scroll
      touchMultiplier: 2,
      infinite: false,
      autoResize: true, // Automatically handle viewport resize
    });

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Scroll to anchor support for hash links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -80, // Account for fixed navbar
              duration: 1.5,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }
    };

    // Expose Lenis globally for programmatic scrolling
    (window as any).lenis = lenis;

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
};

