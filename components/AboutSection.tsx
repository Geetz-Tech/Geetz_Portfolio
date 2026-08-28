'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

export function AboutSection({ name }: { name: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.12, margin: '0px 0px -8% 0px' });
  const reduce = useReducedMotion() ?? false;
  const [dropSettled, setDropSettled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 22, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 70, damping: 22, mass: 0.6 });

  const cardX = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const cardTilt = useTransform(sx, [-0.5, 0.5], [-1.6, 1.6]);
  const imgX = useTransform(sx, [-0.5, 0.5], [-3.5, 3.5]);
  const imgY = useTransform(sy, [-0.5, 0.5], [-2.5, 2.5]);
  const glowX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const glowY = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const typeX = useTransform(sx, [-0.5, 0.5], [-2, 2]);

  const live = inView || reduce;
  const settled = reduce || dropSettled;
  const hang = live && settled && !reduce && !compact;
  const parallax = live && !reduce && finePointer && !compact;

  useEffect(() => {
    const compactMq = window.matchMedia('(max-width: 700px)');
    const fineMq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => {
      setCompact(compactMq.matches);
      setFinePointer(fineMq.matches);
    };
    sync();
    compactMq.addEventListener('change', sync);
    fineMq.addEventListener('change', sync);
    return () => {
      compactMq.removeEventListener('change', sync);
      fineMq.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!live || dropSettled || reduce) return;
    const timer = window.setTimeout(() => setDropSettled(true), 1600);
    return () => window.clearTimeout(timer);
  }, [live, dropSettled, reduce]);

  return (
    <section
      id="about"
      ref={rootRef}
      className={`section about${live ? ' is-in' : ''}${hang ? ' is-live' : ''}`}
      onPointerMove={(event) => {
        if (!parallax) return;
        const rect = event.currentTarget.getBoundingClientRect();
        px.set((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5);
        py.set((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div
        className="about-ambience"
        aria-hidden="true"
        animate={
          live && !reduce
            ? { x: ['-4%', '5%', '-4%'], y: ['2%', '-6%', '2%'] }
            : undefined
        }
        transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity }}
      >
        <motion.div className="about-ambience-shift" style={parallax ? { x: glowX, y: glowY } : undefined}>
          <i />
          <i />
        </motion.div>
      </motion.div>

      <motion.div
        className="section-label"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={live ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.42, ease: [0.22, 0.8, 0.24, 1] }}
      >
        <motion.span
          animate={live && !reduce ? { opacity: [0.55, 1, 0.7] } : undefined}
          transition={{ duration: 1.1, times: [0, 0.45, 1], ease: 'easeOut' }}
        >
          01
        </motion.span>{' '}
        About
      </motion.div>

      <div className="about-layout">
        <motion.h2 className="about-heading" style={parallax ? { x: typeX } : undefined}>
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={live ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ delay: reduce ? 0 : 0.1, duration: 0.5, ease: [0.22, 0.8, 0.24, 1] }}
          >
            Founder mindset.
          </motion.span>
          <motion.em
            initial={reduce ? false : { opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={
              live
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 16, filter: 'blur(8px)' }
            }
            transition={{ delay: reduce ? 0 : 0.22, duration: 0.7, ease: [0.22, 0.78, 0.2, 1] }}
          >
            Engineer&apos;s discipline.
          </motion.em>
        </motion.h2>

        <figure className={`about-portrait${settled ? ' is-settled' : ''}`}>
          <div className="about-lanyard" aria-hidden="true">
            <i className="about-lanyard-line" />
          </div>
          <motion.div
            className="about-card"
            style={
              parallax
                ? { x: cardX, rotate: cardTilt, transformOrigin: '50% 0%' }
                : { transformOrigin: '50% 0%' }
            }
          >
            <motion.div
              className="about-drop"
              initial={
                reduce
                  ? false
                  : {
                      opacity: 0,
                      y: compact ? -58 : -150,
                      rotate: compact ? -2 : -4,
                      scale: 0.98,
                    }
              }
              animate={live ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : undefined}
              transition={{
                delay: reduce ? 0 : compact ? 0.18 : 0.34,
                duration: reduce ? 0.01 : compact ? 0.7 : 1.05,
                ease: [0.22, 0.8, 0.24, 1],
              }}
              onAnimationComplete={() => setDropSettled(true)}
            >
              <motion.div
                className="about-hang"
                animate={
                  hang
                    ? { y: [0, 2.6, 0], rotate: [-1.15, 1.15, -1.15], x: [-2.2, 2.4, -2.2] }
                    : { y: 0, rotate: 0, x: 0 }
                }
                transition={
                  hang
                    ? { duration: 5.3, ease: 'easeInOut', repeat: Infinity }
                    : { duration: 0.6, ease: 'easeOut' }
                }
                style={{ transformOrigin: '50% 0%' }}
              >
              <i className="about-lanyard-clip" aria-hidden="true" />
              <div className="about-card-body">
                <span className="about-slot" aria-hidden="true" />
                <div className="about-portrait-frame">
                  <motion.div
                    className="about-portrait-shift"
                    style={parallax ? { x: imgX, y: imgY } : undefined}
                  >
                    <Image
                      src="/geetha-ks-portrait.jpg"
                      alt="Geetha K S"
                      fill
                      sizes="(max-width: 600px) 86vw, (max-width: 1100px) 38vw, 24vw"
                      priority={false}
                    />
                  </motion.div>
                  <span aria-hidden="true">GEETZ · 01</span>
                  <i className="about-card-sheen" aria-hidden="true" />
                </div>
              </div>
            </motion.div>
            </motion.div>
          </motion.div>
          <figcaption>{name} · Founder &amp; Engineer</figcaption>
        </figure>

        <div className="about-copy">
          <i className="about-copy-rail" aria-hidden="true" />
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={live ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: reduce ? 0 : 0.58, duration: 0.5, ease: [0.22, 0.8, 0.24, 1] }}
          >
            I&apos;m a{' '}
            <em className="about-lit">Senior AI Product Engineer</em> and{' '}
            <em className="about-lit">Python full-stack developer</em> with 8+ years
            building scalable enterprise applications — backend systems in Python
            and FastAPI, React frontends, and AI-assisted workflows using NLP and
            LLM technologies.
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={live ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: reduce ? 0 : 0.72, duration: 0.5, ease: [0.22, 0.8, 0.24, 1] }}
          >
            My focus spans multi-tenant SaaS platforms, enterprise ERP and
            workforce systems, and{' '}
            <em className="about-lit">AI product integration</em> — owning the
            path from architecture through engineering, testing, and
            deployment.
          </motion.p>
          <motion.div
            className="signature"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={live ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ delay: reduce ? 0 : 0.86, duration: 0.4 }}
          >
            GEETZ <span>Building from concept to production</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
