'use client';

import { useEffect, useRef, useState } from 'react';
import { GeetzCompanionMark } from './GeetzCompanion';

const LETTERS = ['G', 'E', 'E', 'T', 'Z'] as const;

export function GeetzIntro() {
  const rootRef = useRef<HTMLElement>(null);
  const companionRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [aware, setAware] = useState(false);
  const [home, setHome] = useState(false);
  const [codeOn, setCodeOn] = useState(false);
  const glyphTimer = useRef<number>(0);
  const awareRef = useRef(false);
  const homeRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setReady(true), reduce ? 0 : 2200);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(glyphTimer.current);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    let mx = 0;
    let my = 0;
    let frame = 0;

    const setEnter = () => {
      if (reduce.matches) {
        root.style.setProperty('--enter', '0');
        return;
      }
      const rect = root.getBoundingClientRect();
      const travel = Math.max(1, rect.height * 0.55);
      const enter = Math.min(1, Math.max(0, window.scrollY / travel));
      root.style.setProperty('--enter', enter.toFixed(3));
    };

    const applyPointer = () => {
      frame = 0;
      if (!fine.matches || reduce.matches) return;

      const rect = root.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const x = mx - rect.left;
      const y = my - rect.top;
      root.style.setProperty('--mx', `${x}px`);
      root.style.setProperty('--my', `${y}px`);
      root.classList.add('is-lit');

      const companion = companionRef.current;
      const word = wordRef.current;
      if (companion && ready) {
        const c = companion.getBoundingClientRect();
        const cx = c.left + c.width / 2;
        const cy = c.top + c.height * 0.28;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.hypot(dx, dy);
        const near = dist < 92;
        if (near !== awareRef.current) {
          awareRef.current = near;
          setAware(near);
        }

        const ex = Math.max(-1.6, Math.min(1.6, dx / 110));
        const ey = Math.max(-1.2, Math.min(1.2, dy / 110));
        companion.style.setProperty('--ex', `${ex}px`);
        companion.style.setProperty('--ey', `${ey}px`);
        companion.style.setProperty(
          '--head',
          near ? `${Math.max(-3.6, Math.min(3.6, dx / 42))}deg` : '0deg',
        );
      }

      const letters = word?.querySelectorAll<HTMLElement>('.geetz-letter');
      if (letters && word) {
        const wr = word.getBoundingClientRect();
        const overWord =
          mx >= wr.left - 24 &&
          mx <= wr.right + 24 &&
          my >= wr.top - 36 &&
          my <= wr.bottom + 20;
        let overG = false;
        letters.forEach((letter, index) => {
          if (!overWord) {
            letter.style.setProperty('--lit', '0');
            return;
          }
          const lr = letter.getBoundingClientRect();
          const mid = lr.left + lr.width / 2;
          const falloff = lr.width * 1.35;
          const lit = Math.max(0, 1 - Math.abs(mx - mid) / falloff);
          letter.style.setProperty('--lit', lit.toFixed(3));
          if (index === 0) {
            overG =
              mx >= lr.left && mx <= lr.right && my >= lr.top && my <= lr.bottom;
          }
        });
        if (overG !== homeRef.current) {
          homeRef.current = overG;
          setHome(overG);
        }
      }
    };

    const onMove = (event: PointerEvent) => {
      mx = event.clientX;
      my = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(applyPointer);
    };

    setEnter();
    window.addEventListener('scroll', setEnter, { passive: true });
    window.addEventListener('resize', setEnter, { passive: true });
    if (fine.matches && !reduce.matches) {
      window.addEventListener('pointermove', onMove, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', setEnter);
      window.removeEventListener('resize', setEnter);
      window.removeEventListener('pointermove', onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ready]);

  const showCode = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setHovered(true);
    setCodeOn(true);
    window.clearTimeout(glyphTimer.current);
    glyphTimer.current = window.setTimeout(() => setCodeOn(false), 1100);
  };

  const hideCode = () => {
    setHovered(false);
    setCodeOn(false);
    window.clearTimeout(glyphTimer.current);
  };

  const enterPortfolio = () => {
    document.getElementById('overview')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };

  return (
    <section
      ref={rootRef}
      className={`geetz-world${ready ? ' is-ready' : ''}${home ? ' is-home' : ''}`}
      aria-label="Welcome to GEETZ"
    >
      <div className="geetz-world-glow" aria-hidden="true" />
      <div className="geetz-world-glyphs" aria-hidden="true">
        <i className="g-brace">{'{ }'}</i>
        <i className="g-tag">{'</>'}</i>
        <i className="g-bin">01</i>
        <i className="g-cur">_</i>
        <i className="g-gt">&gt;</i>
        <span className="g-line g-line-a" />
        <span className="g-line g-line-b" />
        <span className="g-line g-line-c" />
      </div>
      <span className="geetz-world-cursor" aria-hidden="true" />
      <span className="geetz-world-signal" aria-hidden="true" />

      <div className="geetz-world-inner">
        <p className="geetz-world-kicker">
          Welcome to the
          <br />
          World of code
        </p>

        <div className="geetz-world-mark">
          <div
            ref={companionRef}
            className={`geetz-companion${aware ? ' is-aware' : ''}${hovered ? ' is-hovered' : ''}${home ? ' is-home' : ''}`}
            aria-hidden="true"
            onMouseEnter={showCode}
            onMouseLeave={hideCode}
          >
            <div className="geetz-companion-idle">
              <div className="geetz-companion-body">
                <GeetzCompanionMark />
              </div>
            </div>
            <span className={`geetz-companion-code${codeOn ? ' is-on' : ''}`}>{'</>'}</span>
            <span className="geetz-home-link" />
          </div>

          <p className="geetz-world-word" ref={wordRef} aria-label="GEETZ">
            {LETTERS.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={`geetz-letter${index === 0 ? ' is-g' : ''}`}
              >
                {letter}
              </span>
            ))}
          </p>
        </div>

        <p className="geetz-world-line">Where ideas are engineered into impact.</p>
        <p className="geetz-world-role">
          <span>Software Engineer</span>
          <i aria-hidden="true">·</i>
          <span>AI Product Builder</span>
        </p>
      </div>

      <button type="button" className="geetz-world-scroll" onClick={enterPortfolio}>
        Scroll to enter
        <span aria-hidden="true">↓</span>
      </button>
    </section>
  );
}
