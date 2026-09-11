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
    let enterFrame = 0;
    let visible = true;
    let letters: HTMLElement[] = [];

    const cacheLetters = () => {
      letters = wordRef.current
        ? Array.from(wordRef.current.querySelectorAll<HTMLElement>('.geetz-letter'))
        : [];
    };

    const setEnter = () => {
      enterFrame = 0;
      if (reduce.matches) {
        root.style.setProperty('--enter', '0');
        return;
      }
      if (!visible) return;
      const rect = root.getBoundingClientRect();
      const travel = Math.max(1, rect.height * 0.55);
      const enter = Math.min(1, Math.max(0, window.scrollY / travel));
      root.style.setProperty('--enter', enter.toFixed(3));
    };

    const scheduleEnter = () => {
      if (!enterFrame) enterFrame = window.requestAnimationFrame(setEnter);
    };

    const applyPointer = () => {
      frame = 0;
      if (!visible || !fine.matches || reduce.matches) return;

      const rect = root.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      root.style.setProperty('--mx', `${mx - rect.left}px`);
      root.style.setProperty('--my', `${my - rect.top}px`);
      root.classList.add('is-lit');

      const companion = companionRef.current;
      const word = wordRef.current;
      if (companion && ready) {
        const c = companion.getBoundingClientRect();
        const dx = mx - (c.left + c.width / 2);
        const dy = my - (c.top + c.height * 0.28);
        const near = Math.hypot(dx, dy) < 92;
        if (near !== awareRef.current) {
          awareRef.current = near;
          setAware(near);
        }

        companion.style.setProperty('--ex', `${Math.max(-1.6, Math.min(1.6, dx / 110))}px`);
        companion.style.setProperty('--ey', `${Math.max(-1.2, Math.min(1.2, dy / 110))}px`);
        companion.style.setProperty(
          '--head',
          near ? `${Math.max(-3.6, Math.min(3.6, dx / 42))}deg` : '0deg',
        );
      }

      if (letters.length && word) {
        const wr = word.getBoundingClientRect();
        const overWord =
          mx >= wr.left - 24 &&
          mx <= wr.right + 24 &&
          my >= wr.top - 36 &&
          my <= wr.bottom + 20;
        let overG = false;
        for (let index = 0; index < letters.length; index += 1) {
          const letter = letters[index];
          if (!overWord) {
            letter.style.setProperty('--lit', '0');
            continue;
          }
          const lr = letter.getBoundingClientRect();
          const mid = lr.left + lr.width / 2;
          letter.style.setProperty('--lit', Math.max(0, 1 - Math.abs(mx - mid) / (lr.width * 1.35)).toFixed(3));
          if (index === 0) {
            overG = mx >= lr.left && mx <= lr.right && my >= lr.top && my <= lr.bottom;
          }
        }
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

    const attachPointer = () => {
      if (fine.matches && !reduce.matches) {
        window.addEventListener('pointermove', onMove, { passive: true });
      }
    };

    const detachPointer = () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    cacheLetters();
    setEnter();
    window.addEventListener('scroll', scheduleEnter, { passive: true });
    window.addEventListener('resize', scheduleEnter, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          cacheLetters();
          attachPointer();
          scheduleEnter();
        } else {
          detachPointer();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(root);
    attachPointer();

    return () => {
      detachPointer();
      window.removeEventListener('scroll', scheduleEnter);
      window.removeEventListener('resize', scheduleEnter);
      if (enterFrame) window.cancelAnimationFrame(enterFrame);
      io.disconnect();
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
          <span>CTO @ Krishvi International</span>
          <i aria-hidden="true">·</i>
          <span>AI &amp; Enterprise Product Builder</span>
        </p>
      </div>

      <button type="button" className="geetz-world-scroll" onClick={enterPortfolio}>
        Scroll to enter
        <span aria-hidden="true">↓</span>
      </button>
    </section>
  );
}
