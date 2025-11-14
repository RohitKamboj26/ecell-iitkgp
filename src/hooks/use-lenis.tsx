import { useEffect } from "react";

/**
 * Hook to programmatically control Lenis smooth scrolling
 */
export const useLenisScroll = () => {
  const scrollTo = (target: string | HTMLElement | number, options?: any) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(target, {
        offset: -80, // Default offset for fixed navbar
        duration: 1.5,
        ...options,
      });
    }
  };

  const scrollToTop = () => {
    scrollTo(0, { duration: 1.2 });
  };

  const stop = () => {
    const lenis = (window as any).lenis;
    if (lenis) lenis.stop();
  };

  const start = () => {
    const lenis = (window as any).lenis;
    if (lenis) lenis.start();
  };

  return { scrollTo, scrollToTop, stop, start };
};

/**
 * Hook to trigger callbacks on scroll events
 */
export const useLenisScrollListener = (callback: (e: any) => void) => {
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (!lenis) return;

    lenis.on("scroll", callback);

    return () => {
      lenis.off("scroll", callback);
    };
  }, [callback]);
};
