import { useState, useEffect } from 'react';

export function useScroll(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(true);
  const [isCompact, setIsCompact] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollingDown = currentScroll > lastScroll;
      
      setScrolled(currentScroll > threshold);
      setScrollingUp(!scrollingDown);
      setIsCompact(scrollingDown && currentScroll > threshold);
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, lastScroll]);

  return { scrolled, scrollingUp, isCompact };
}
