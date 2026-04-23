import React, { useState, useEffect } from 'react';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frameId = null;

    const handleScroll = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
        setScrollProgress(Math.max(0, Math.min(progress, 1)));
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[3px] overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.04)_0%,rgba(34,197,94,0.14)_50%,rgba(15,23,42,0.04)_100%)]"
      />
      <div
        className="h-full origin-left rounded-r-full bg-[linear-gradient(90deg,rgba(34,197,94,0.98)_0%,rgba(16,185,129,0.92)_55%,rgba(110,231,183,0.8)_100%)] shadow-[0_0_14px_rgba(34,197,94,0.26)] transition-transform duration-150 ease-out"
        style={{
          width: '100%',
          transform: `scaleX(${scrollProgress})`,
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
