import React, { useState, useEffect, useRef } from 'react';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgress = useRef(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    const updateTargetProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress.current = totalHeight > 0
        ? Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100))
        : 0;
    };

    const animateProgress = () => {
      setScrollProgress((currentProgress) => {
        const distance = targetProgress.current - currentProgress;
        if (Math.abs(distance) < 0.1) {
          return targetProgress.current;
        }
        return currentProgress + distance * 0.18;
      });

      animationFrame.current = requestAnimationFrame(animateProgress);
    };

    updateTargetProgress();
    animationFrame.current = requestAnimationFrame(animateProgress);

    window.addEventListener('scroll', updateTargetProgress, { passive: true });
    window.addEventListener('resize', updateTargetProgress);

    return () => {
      window.removeEventListener('scroll', updateTargetProgress);
      window.removeEventListener('resize', updateTargetProgress);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed top-[3.8rem] left-0 right-0 h-[5px] z-[40] overflow-hidden"
    >
      <div
        className="h-full w-full origin-left rounded-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 shadow-[0_0_14px_rgba(34,197,94,0.45)] will-change-transform"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
