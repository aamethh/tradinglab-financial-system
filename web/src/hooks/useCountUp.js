import { useState, useEffect } from 'react';

export default function useCountUp(target, duration = 1600, shouldStart = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let raf;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic — fast start, gentle deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, shouldStart]);

  return value;
}
