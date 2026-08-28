'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { AboutFallback } from './AboutFallback';

export function AboutGate({ name }: { name: string }) {
  const [MotionAbout, setMotionAbout] = useState<ComponentType<{ name: string }> | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('./AboutSection')
      .then((mod) => {
        if (!cancelled) setMotionAbout(() => mod.AboutSection ?? mod.default);
      })
      .catch(() => {
        /* Keep the static About if motion cannot load. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!MotionAbout) return <AboutFallback name={name} />;
  return <MotionAbout name={name} />;
}
