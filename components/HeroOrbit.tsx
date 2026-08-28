'use client';

import { useEffect, useRef } from 'react';

export function HeroOrbit() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const compact = window.matchMedia('(max-width: 900px)');

    const resetPointer = () => {
      root.style.setProperty('--px', '0px');
      root.style.setProperty('--py', '0px');
      root.style.setProperty('--rx', '0deg');
      root.style.setProperty('--ry', '0deg');
    };

    const onMove = (event: PointerEvent) => {
      if (reduce.matches || !fine.matches || compact.matches) return;
      const rect = root.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const ny = ((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
      root.style.setProperty('--px', `${(nx * 6).toFixed(2)}px`);
      root.style.setProperty('--py', `${(ny * 6).toFixed(2)}px`);
      root.style.setProperty('--rx', `${(-ny * 3).toFixed(2)}deg`);
      root.style.setProperty('--ry', `${(nx * 3.5).toFixed(2)}deg`);
    };

    const onScroll = () => {
      if (reduce.matches || compact.matches) {
        root.style.setProperty('--scroll', '0');
        return;
      }
      const hero = root.closest('.hero');
      if (!(hero instanceof HTMLElement)) return;
      const rect = hero.getBoundingClientRect();
      const span = Math.max(1, rect.height * 0.7);
      const progress = Math.min(1, Math.max(0, -rect.top / span));
      root.style.setProperty('--scroll', progress.toFixed(3));
    };

    resetPointer();
    onScroll();
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', resetPointer);
    window.addEventListener('scroll', onScroll, { passive: true });
    compact.addEventListener('change', onScroll);

    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', resetPointer);
      window.removeEventListener('scroll', onScroll);
      compact.removeEventListener('change', onScroll);
    };
  }, []);

  return (
    <div className="hero-mark" aria-hidden="true" ref={rootRef}>
      <div className="hero-orbit">
        <div className="hero-orbit-core">
          <div className="hero-orbit-glow" />
          <div className="hero-orbit-disc" />
          <div className="hero-ring-tilt is-inner">
            <i className="hero-ring" />
          </div>
          <div className="hero-ring-tilt is-middle">
            <i className="hero-ring" />
          </div>
          <div className="hero-ring-tilt is-outer">
            <i className="hero-ring" />
          </div>
          <div className="hero-signal-track">
            <span className="hero-signal" />
          </div>
          <div className="hero-g-tilt">
            <div className="hero-g">
              <b className="hero-g-extrude">G</b>
              <b className="hero-g-face">G</b>
            </div>
            <span className="hero-g-tag">&lt; G /&gt;</span>
          </div>
        </div>
      </div>
      <p>
        <i className="hero-mark-line" />
        GEETZ / {new Date().getFullYear()}
      </p>
    </div>
  );
}
