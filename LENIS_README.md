# Lenis Smooth Scrolling - Documentation

## Overview
This website uses **Lenis** by Studio Freight for buttery-smooth momentum scrolling. All enhancements are already integrated and working.

## Features Implemented ✅

### 1. **Enhanced Scroll Settings**
- **Duration**: 1.4s (luxurious feel)
- **Wheel Multiplier**: 1.2x (slightly faster than default)
- **Auto Resize**: Automatically adjusts on viewport changes
- **Smooth Easing**: Custom easeOut curve for natural deceleration

### 2. **Scroll-to-Anchor Support**
All `#` hash links automatically scroll smoothly with:
- 80px offset (accounts for fixed navbar)
- 1.5s duration
- Smooth easing

**Example Usage:**
```tsx
<a href="#about">About Section</a>
<div id="about">...</div>
```

### 3. **Scroll to Top Button**
- Appears after scrolling 300px down
- Smooth animated button with scale effect
- Located at bottom-right corner

### 4. **Programmatic Scrolling Hooks**

#### `useLenisScroll()`
Control scrolling from any component:

```tsx
import { useLenisScroll } from "@/hooks/use-lenis";

function MyComponent() {
  const { scrollTo, scrollToTop, stop, start } = useLenisScroll();

  return (
    <>
      <button onClick={scrollToTop}>Go to Top</button>
      <button onClick={() => scrollTo("#section")}>Go to Section</button>
      <button onClick={() => scrollTo(500)}>Scroll to 500px</button>
      <button onClick={stop}>Pause Scroll</button>
      <button onClick={start}>Resume Scroll</button>
    </>
  );
}
```

#### `useLenisScrollListener()`
Listen to scroll events:

```tsx
import { useLenisScrollListener } from "@/hooks/use-lenis";

function MyComponent() {
  useLenisScrollListener((e) => {
    console.log("Scroll position:", e.scroll);
    console.log("Scroll direction:", e.direction); // 1 or -1
    console.log("Scroll velocity:", e.velocity);
  });

  return <div>...</div>;
}
```

### 5. **GSAP + Lenis Integration**
The navbar animations sync with Lenis scroll events for smooth performance.

## Usage Examples

### Scroll to a Section Smoothly
```tsx
import { useLenisScroll } from "@/hooks/use-lenis";

function Hero() {
  const { scrollTo } = useLenisScroll();

  return (
    <button onClick={() => scrollTo("#contact", { duration: 2 })}>
      Contact Us
    </button>
  );
}
```

### Create a Scroll Progress Indicator
```tsx
import { useState } from "react";
import { useLenisScrollListener } from "@/hooks/use-lenis";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useLenisScrollListener((e) => {
    const height = document.body.scrollHeight - window.innerHeight;
    setProgress((e.scroll / height) * 100);
  });

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-primary z-50"
      style={{ width: `${progress}%` }}
    />
  );
}
```

### Pause Scrolling During Modal/Dropdown
```tsx
import { useEffect } from "react";
import { useLenisScroll } from "@/hooks/use-lenis";

function Modal({ isOpen }) {
  const { stop, start } = useLenisScroll();

  useEffect(() => {
    if (isOpen) {
      stop(); // Disable scroll when modal is open
    } else {
      start(); // Re-enable when closed
    }
  }, [isOpen, stop, start]);

  return isOpen ? <div>Modal Content</div> : null;
}
```

## Advanced Configuration

To adjust scroll behavior, edit `src/components/SmoothScroll.tsx`:

```tsx
const lenis = new Lenis({
  duration: 1.4,        // Scroll duration (higher = slower)
  wheelMultiplier: 1.2, // Scroll speed (higher = faster)
  touchMultiplier: 2,   // Mobile touch sensitivity
  infinite: false,      // Infinite scroll (circular)
  autoResize: true,     // Auto-adjust on resize
});
```

## Performance Notes

- **Bundle Size**: Three.js chunk is lazy-loaded (~486KB gzipped: 126KB)
- **Scroll Performance**: Uses `passive: true` listeners for 60fps
- **Mobile**: Native touch scrolling (better performance than synthetic)
- **GSAP Sync**: Navbar animations listen to Lenis events

## Browser Support

✅ Chrome, Edge, Safari, Firefox (all modern versions)  
✅ Mobile: iOS Safari, Chrome Mobile, Samsung Internet

## Testing

```powershell
npm run dev
```

Then:
1. Scroll with mouse wheel → should feel smooth with momentum
2. Click any `#` hash link → smooth scroll to section
3. Scroll down 300px → see scroll-to-top button appear
4. Click scroll-to-top → smooth scroll to top

## Troubleshooting

**Scroll feels too slow/fast:**
- Adjust `duration` (1.0-2.0 recommended)
- Adjust `wheelMultiplier` (0.5-2.0 recommended)

**Anchor links not working:**
- Ensure elements have valid `id` attributes
- Check offset value matches navbar height

**Scroll-to-top button not appearing:**
- Check z-index conflicts
- Verify scroll position > 300px
