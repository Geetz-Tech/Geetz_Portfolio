'use client';

import { useEffect, useRef, useState } from 'react';
import {
  clients,
  expertise,
  journey,
  products,
  profile,
  type Project,
  technologyGroups,
  workflow,
} from '../data/content';

const nav = [
  ['about', 'About'],
  ['expertise', 'Expertise'],
  ['products', 'Products'],
  ['client-work', 'Client Work'],
  ['journey', 'Journey'],
  ['contact', 'Contact'],
];

const socials = [
  { label: 'LinkedIn', shortLabel: 'in', url: profile.linkedin },
  { label: 'GitHub', shortLabel: 'GH', url: profile.github },
  {
    label: 'Email Me',
    shortLabel: '@',
    url: profile.email ? `mailto:${profile.email}` : '',
  },
];

function ExternalLink({
  href,
  children,
  className = '',
  label,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  if (!href) return null;
  return (
    <a
      className={className}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
    >
      {children}
    </a>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  return (
    <button
      className="project-card reveal"
      style={
        {
          '--accent': project.accent,
          '--delay': `${index * 70}ms`,
        } as React.CSSProperties
      }
      onClick={() => onOpen(project)}
      aria-label={`View ${project.name} details`}
    >
      <div className="poster-art" aria-hidden="true">
        <span className="poster-grid" />
        <b>{project.monogram}</b>
        <i>{String(index + 1).padStart(2, '0')}</i>
      </div>
      <div className="card-copy">
        <div>
          <p>{project.category}</p>
          <h3>{project.name}</h3>
        </div>
        <span aria-hidden="true">↗</span>
      </div>
      <p className="card-description">{project.description}</p>
      {project.private && <small>⌁ &nbsp; Private commercial product</small>}
    </button>
  );
}

export function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [intro, setIntro] = useState(true);
  const productRow = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const verifiedTechnologyGroups = technologyGroups.filter(
    (group) => group.items.length > 0,
  );

  useEffect(() => {
    const seen = sessionStorage.getItem('geetz-intro');
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const timer = window.setTimeout(
      () => {
        setIntro(false);
        sessionStorage.setItem('geetz-intro', '1');
      },
      reduceMotion ? 0 : seen ? 180 : 1850,
    );
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = selected ? modalRef.current : menu ? menuRef.current : null;
    document.body.style.overflow = container ? 'hidden' : '';
    if (!container) return;

    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    focusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (selected) setSelected(null);
        else setMenu(false);
        return;
      }
      if (event.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      lastFocus.current?.focus();
    };
  }, [selected, menu]);

  const openProject = (project: Project) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setSelected(project);
  };

  const toggleMenu = () => {
    lastFocus.current = document.activeElement as HTMLElement;
    setMenu((open) => !open);
  };

  const closeMenu = () => setMenu(false);
  const moveProducts = (direction: number) =>
    productRow.current?.scrollBy({ left: direction * 390, behavior: 'smooth' });

  return (
    <>
      <div
        className={`preloader ${intro ? '' : 'preloader-out'}`}
        aria-hidden="true"
      >
        <div className="intro-word">
          <span>G</span>
          <i>EETZ</i>
        </div>
        <p>Software Engineer · AI Product Builder</p>
      </div>

      <header className="nav">
        <a className="brand" href="#overview" aria-label="GEETZ home">
          G<span>EE</span>TZ
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-end">
          <div className="nav-socials" aria-label="Professional profiles">
            {socials.slice(0, 2).map((social) => (
              <ExternalLink
                key={social.label}
                href={social.url}
                label={`Open ${social.label}`}
              >
                {social.shortLabel}
              </ExternalLink>
            ))}
          </div>
          {profile.resume && (
            <ExternalLink className="resume-link" href={profile.resume}>
              Résumé ↓
            </ExternalLink>
          )}
          <button
            className="menu-button"
            aria-label={menu ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menu}
            aria-controls="mobile-navigation"
            onClick={toggleMenu}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${menu ? 'open' : ''}`}
        ref={menuRef}
        aria-hidden={!menu}
      >
        {nav.map(([id, label], index) => (
          <a key={id} onClick={closeMenu} href={`#${id}`}>
            <span>0{index + 1}</span>
            {label}
          </a>
        ))}
        <div className="mobile-socials">
          {socials.map((social) => (
            <ExternalLink key={social.label} href={social.url}>
              {social.label} ↗
            </ExternalLink>
          ))}
          <ExternalLink href={profile.companyWebsite}>
            Kripra&apos;s Digital AI ↗
          </ExternalLink>
        </div>
      </div>

      <main>
        <section id="overview" className="hero section">
          <div className="hero-glow" aria-hidden="true" />
          <div className="grid-plane" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              Founder · Software Engineer · AI Product Builder
            </p>
            <h1>
              Ideas, engineered
              <br />
              into <em>impact.</em>
            </h1>
            <p className="intro">
              I&apos;m <strong>Geetha K S</strong>, Founder of Kripra&apos;s
              Digital AI Pvt. Ltd. I build AI-powered products, enterprise
              platforms, and custom digital solutions from concept to production.
            </p>
            <div className="actions">
              <a className="button primary" href="#products">
                Explore my work <span>↓</span>
              </a>
              <a className="button secondary" href="#contact">
                Let&apos;s connect <span>↗</span>
              </a>
            </div>
            <div className="availability">
              <i />
              Building purposeful technology from India <span>—</span> available
              globally
            </div>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <div className="orb">
              <span>G</span>
            </div>
            <p>GEETZ / {new Date().getFullYear()}</p>
          </div>
          <div className="scroll-cue" aria-hidden="true">
            <span>Scroll to explore</span>
            <i />
          </div>
        </section>

        <section id="about" className="section about">
          <div className="section-label reveal">
            <span>01</span> About
          </div>
          <div className="about-layout">
            <h2 className="reveal">
              Founder mindset.
              <br />
              <em>Engineer&apos;s discipline.</em>
            </h2>
            <div className="about-copy reveal">
              <p>
                I turn ideas and business requirements into thoughtful software
                products—working across product thinking, architecture,
                engineering, AI, and delivery.
              </p>
              <p>
                My focus spans enterprise applications, SaaS, full-stack
                development, and workflow digitisation. The work is practical,
                intentional, and built for the real world.
              </p>
              <div className="signature">
                GEETZ <span>Building from concept to production</span>
              </div>
            </div>
          </div>
        </section>

        <section id="expertise" className="section expertise">
          <div className="section-label reveal">
            <span>02</span> What I build
          </div>
          <div className="section-heading reveal">
            <h2>Engineering, end to end.</h2>
            <p>From first requirements to production-ready systems.</p>
          </div>
          <div className="expertise-grid">
            {expertise.map(([number, title, text]) => (
              <article className="expertise-card reveal" key={number}>
                <span>{number}</span>
                <div className="expertise-icon" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="products" className="section products">
          <div className="section-label reveal">
            <span>03</span> Featured products
          </div>
          <div className="section-heading row reveal">
            <div>
              <h2>Products with purpose.</h2>
              <p>
                Selected commercial work, described with confidentiality intact.
              </p>
            </div>
            <div className="row-controls">
              <button onClick={() => moveProducts(-1)} aria-label="Scroll products left">
                ←
              </button>
              <button onClick={() => moveProducts(1)} aria-label="Scroll products right">
                →
              </button>
            </div>
          </div>
          <div className="project-row" ref={productRow}>
            {products.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                onOpen={openProject}
              />
            ))}
          </div>
        </section>

        <section id="client-work" className="section clients">
          <div className="section-label reveal">
            <span>04</span> Client projects
          </div>
          <div className="section-heading reveal">
            <h2>Built in partnership.</h2>
            <p>
              Professional technology engagements, kept intentionally high-level.
            </p>
          </div>
          <div className="client-grid">
            {clients.map((client, index) => (
              <button
                key={client.name}
                className="client-card reveal"
                onClick={() => openProject(client)}
                aria-label={`View ${client.name} project details`}
              >
                <span className="client-no">0{index + 1}</span>
                <div className="client-mark" aria-hidden="true">
                  {client.monogram}
                </div>
                <div>
                  <p>{client.category}</p>
                  <h3>{client.name}</h3>
                  <small>Project details kept confidential</small>
                </div>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
        </section>

        {verifiedTechnologyGroups.length > 0 && (
          <section id="stack" className="section stack">
            <div className="section-label reveal">
              <span>05</span> Engineering stack
            </div>
            <div className="section-heading reveal">
              <h2>Tools follow the problem.</h2>
              <p>Verified technologies selected for the work at hand.</p>
            </div>
            <div className="stack-grid">
              {verifiedTechnologyGroups.map((group, index) => (
                <div className="stack-card reveal" key={group.name}>
                  <span>0{index + 1}</span>
                  <h3>{group.name}</h3>
                  <p>{group.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="process" className="section process">
          <div className="section-label reveal">
            <span>05</span> How I build
          </div>
          <div className="section-heading reveal">
            <h2>From signal to software.</h2>
          </div>
          <div className="workflow">
            {workflow.map((step, index) => (
              <div className="workflow-step reveal" key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b>{step}</b>
                {index < workflow.length - 1 && <i aria-hidden="true">→</i>}
              </div>
            ))}
          </div>
        </section>

        <section id="journey" className="section journey">
          <div className="section-label reveal">
            <span>06</span> Professional journey
          </div>
          <div className="journey-layout">
            <h2 className="reveal">
              Building forward,
              <br />
              <em>one layer at a time.</em>
            </h2>
            <div className="timeline">
              {journey.map((item, index) => (
                <div className="timeline-item reveal" key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item}</h3>
                  <i aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="company" className="section company">
          <div className="company-card reveal">
            <div>
              <p>Company / Founder</p>
              <h2>
                Kripra&apos;s
                <br />
                Digital AI
              </h2>
              <small>Pvt. Ltd.</small>
            </div>
            <div>
              <p>
                A technology company focused on thoughtful AI and software
                solutions for modern businesses.
              </p>
              <ExternalLink className="text-link" href={profile.companyWebsite}>
                Visit company website <span>↗</span>
              </ExternalLink>
            </div>
            <b aria-hidden="true">K</b>
          </div>
        </section>

        <section id="github" className="section github">
          <div className="github-card reveal">
            <div className="code-mark" aria-hidden="true">
              &lt;/&gt;
            </div>
            <div>
              <p>Engineering / GitHub</p>
              <h2>
                Built openly.
                <br />
                <em>Protected responsibly.</em>
              </h2>
              <span>
                Selected commercial products are maintained in private
                repositories to protect proprietary technology and client
                confidentiality.
              </span>
            </div>
            <ExternalLink className="round-link" href={profile.github}>
              View GitHub ↗
            </ExternalLink>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="contact-orb" aria-hidden="true" />
          <p className="eyebrow reveal">
            <span />
            Start a conversation
          </p>
          <h2 className="reveal">
            Have an idea
            <br />
            <em>worth building?</em>
          </h2>
          <p className="reveal">
            Let&apos;s turn ambitious ideas into thoughtful, scalable digital
            products.
          </p>
          <div className="contact-links reveal">
            {socials.map((social) => (
              <ExternalLink key={social.label} href={social.url}>
                {social.label} <span>↗</span>
              </ExternalLink>
            ))}
            <ExternalLink href={profile.companyWebsite}>
              Visit Kripra&apos;s Digital AI <span>↗</span>
            </ExternalLink>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#overview" aria-label="Back to top">
          G<span>EE</span>TZ
        </a>
        <p>
          <strong>Geetha K S</strong>
          Founder · Software Engineer · AI Product Builder
        </p>
        <div>
          {socials.map((social) => (
            <ExternalLink key={social.label} href={social.url}>
              {social.label.replace(' Me', '')}
            </ExternalLink>
          ))}
        </div>
        <small>© {new Date().getFullYear()} Geetha K S</small>
      </footer>

      {selected && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setSelected(null)}
        >
          <article
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-overview"
            ref={modalRef}
            onMouseDown={(event) => event.stopPropagation()}
            style={{ '--accent': selected.accent } as React.CSSProperties}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close project details"
            >
              ×
            </button>
            <div className="modal-art" aria-hidden="true">
              <b>{selected.monogram}</b>
              <span>{selected.category}</span>
            </div>
            <div className="modal-content">
              <p>{selected.private ? 'Private commercial product' : 'Client project'}</p>
              <h2 id="modal-title">{selected.name}</h2>
              <div className="modal-grid">
                <div>
                  <span>Overview</span>
                  <p id="modal-overview">{selected.description}</p>
                </div>
                <div>
                  <span>My role</span>
                  <p>{selected.role}</p>
                </div>
                <div>
                  <span>Technology</span>
                  <p>
                    {selected.technologies.length
                      ? selected.technologies.join(', ')
                      : 'Not publicly disclosed'}
                  </p>
                </div>
                <div>
                  <span>Project type</span>
                  <p>{selected.category}</p>
                </div>
                <div>
                  <span>Status</span>
                  <p>{selected.status}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
