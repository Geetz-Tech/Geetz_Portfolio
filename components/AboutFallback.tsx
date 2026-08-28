'use client';

import Image from 'next/image';

export function AboutFallback({ name }: { name: string }) {
  return (
    <section id="about" className="section about is-in about-static">
      <div className="section-label">
        <span>01</span> About
      </div>
      <div className="about-layout">
        <h2 className="about-heading">
          <span>Founder mindset.</span>
          <em>Engineer&apos;s discipline.</em>
        </h2>
        <figure className="about-portrait is-settled">
          <div className="about-lanyard" aria-hidden="true">
            <i className="about-lanyard-line" />
          </div>
          <div className="about-card">
            <div className="about-drop">
              <div className="about-hang">
                <i className="about-lanyard-clip" aria-hidden="true" />
                <div className="about-card-body">
                  <span className="about-slot" aria-hidden="true" />
                  <div className="about-portrait-frame">
                    <div className="about-portrait-shift">
                      <Image
                        src="/geetha-ks-portrait.jpg"
                        alt="Geetha K S"
                        fill
                        sizes="(max-width: 600px) 86vw, (max-width: 1100px) 38vw, 24vw"
                        priority={false}
                      />
                    </div>
                    <span aria-hidden="true">GEETZ · 01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <figcaption>{name} · Founder &amp; Engineer</figcaption>
        </figure>
        <div className="about-copy">
          <p>
            I&apos;m a Senior AI Product Engineer and Python full-stack developer
            with 8+ years building scalable enterprise applications — backend
            systems in Python and FastAPI, React frontends, and AI-assisted
            workflows using NLP and LLM technologies.
          </p>
          <p>
            My focus spans multi-tenant SaaS platforms, enterprise ERP and
            workforce systems, and AI product integration — owning the path
            from architecture through engineering, testing, and deployment.
          </p>
          <div className="signature">
            GEETZ <span>Building from concept to production</span>
          </div>
        </div>
      </div>
    </section>
  );
}
