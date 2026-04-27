import { useEffect, useState } from "react";

function getScrollProgress() {
  if (typeof window === "undefined") return 0;

  const maxScroll = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight,
  );

  return Math.min(1, Math.max(0, window.scrollY / maxScroll));
}

export function useSmoothScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    let eased = getScrollProgress();

    const tick = () => {
      const target = getScrollProgress();
      eased += (target - eased) * 0.08;

      if (Math.abs(target - eased) < 0.0005) {
        eased = target;
      }

      setProgress(eased);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  return progress;
}
