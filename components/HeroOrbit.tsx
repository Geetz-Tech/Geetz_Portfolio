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

    let visible = true;
    let moveFrame = 0;
    let scrollFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let rect = root.getBoundingClientRect();

    const resetPointer = () => {
      root.style.setProperty('--px', '0px');
      root.style.setProperty('--py', '0px');
      root.style.setProperty('--rx', '0deg');
      root.style.setProperty('--ry', '0deg');
    };

    const applyPointer = () => {
      moveFrame = 0;
      if (!visible || reduce.matches || !fine.matches || compact.matches) return;
      const nx = ((pointerX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const ny = ((pointerY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
      root.style.setProperty('--px', `${(nx * 6).toFixed(2)}px`);
      root.style.setProperty('--py', `${(ny * 6).toFixed(2)}px`);
      root.style.setProperty('--rx', `${(-ny * 3).toFixed(2)}deg`);
      root.style.setProperty('--ry', `${(nx * 3.5).toFixed(2)}deg`);
    };

    const onMove = (event: PointerEvent) => {
      if (reduce.matches || !fine.matches || compact.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!moveFrame) moveFrame = window.requestAnimationFrame(applyPointer);
    };

    const onEnter = () => {
      rect = root.getBoundingClientRect();
    };

    const applyScroll = () => {
      scrollFrame = 0;
      if (!visible || reduce.matches || compact.matches) {
        root.style.setProperty('--scroll', '0');
        return;
      }
      const hero = root.closest('.hero');
      if (!(hero instanceof HTMLElement)) return;
      const heroRect = hero.getBoundingClientRect();
      const span = Math.max(1, heroRect.height * 0.7);
      const progress = Math.min(1, Math.max(0, -heroRect.top / span));
      root.style.setProperty('--scroll', progress.toFixed(3));
    };

    const onScroll = () => {
      if (!visible) return;
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(applyScroll);
    };

    resetPointer();
    applyScroll();
    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', resetPointer);
    window.addEventListener('scroll', onScroll, { passive: true });
    compact.addEventListener('change', applyScroll);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          resetPointer();
          root.style.setProperty('--scroll', '0');
        }
      },
      { threshold: 0.08 },
    );
    io.observe(root);

    return () => {
      if (moveFrame) window.cancelAnimationFrame(moveFrame);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', resetPointer);
      window.removeEventListener('scroll', onScroll);
      compact.removeEventListener('change', applyScroll);
      io.disconnect();
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
