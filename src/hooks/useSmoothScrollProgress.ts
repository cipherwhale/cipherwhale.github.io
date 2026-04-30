import { useEffect, useState } from "react";

type ScrollKinematics = {
  progress: number;
  velocity: number;
};

function getScrollProgress() {
  if (typeof window === "undefined") return 0;

  const maxScroll = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight,
  );

  return Math.min(1, Math.max(0, window.scrollY / maxScroll));
}

export function useSmoothScrollProgress(): ScrollKinematics {
  const [state, setState] = useState<ScrollKinematics>({
    progress: 0,
    velocity: 0,
  });

  useEffect(() => {
    let frame = 0;
    let eased = getScrollProgress();
    let smoothedVelocity = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const target = getScrollProgress();
      const previous = eased;
      const dt = Math.max(1 / 120, (now - lastTime) / 1000);

      eased += (target - eased) * 0.08;

      if (Math.abs(target - eased) < 0.0005) {
        eased = target;
      }

      const instantaneousVelocity = Math.abs(eased - previous) / dt;
      smoothedVelocity += (instantaneousVelocity - smoothedVelocity) * 0.18;

      setState({
        progress: eased,
        velocity: smoothedVelocity,
      });

      lastTime = now;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  return state;
}
