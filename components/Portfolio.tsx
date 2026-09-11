'use client';

import { useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';
import Image from 'next/image';
import {
  clients,
  expertise,
  type Expertise,
  journey,
  outcomes,
  products,
  profile,
  type Project,
  technologyGroups,
  workflow,
} from '../data/content';
import { GeetzIntro } from './GeetzIntro';
import { GeetzCompanionMark } from './GeetzCompanion';
import { HeroOrbit } from './HeroOrbit';
import { SectorsSection } from './SectorsSection';

const PRODUCT_LOOP_SETS = 3;

const nav = [
  { id: 'about', label: 'About', desc: 'CTO mindset, engineer’s discipline.' },
  { id: 'expertise', label: 'Expertise', desc: 'Full-stack engineering to AI integration.' },
  { id: 'products', label: 'Products', desc: 'Selected commercial platforms.' },
  { id: 'client-work', label: 'Client Work', desc: 'Real businesses, real engagements.' },
  { id: 'journey', label: 'Journey', desc: 'Professional chronology, 2016 — present.' },
  { id: 'contact', label: 'Contact', desc: 'Start a conversation.' },
];

type ArchLayer = { label: string; items: string[] };
type ArchSpec = { layers: ArchLayer[]; intelligence?: { items: string[]; note: string } };

const architectureByProduct: Record<string, ArchSpec> = {
  EDNORYX: {
    layers: [
      { label: 'Experience / UI', items: ['React'] },
      { label: 'API Layer', items: ['FastAPI', 'REST APIs'] },
      { label: 'Services', items: ['LMS', 'Assessments & quizzes', 'Student / Teacher / Parent workflows'] },
      { label: 'Data', items: ['PostgreSQL — student, grade & progress records'] },
    ],
    intelligence: {
      items: ['AI service/provider integration', 'LLM orchestration & grounding', 'AI-assisted teacher & assessment workflows'],
      note: 'Development-stage within the MVP environment — not a commercially deployed production assistant.',
    },
  },
  'Enterprise ERP Platform': {
    layers: [
      { label: 'Experience / UI', items: ['React'] },
      { label: 'API Layer', items: ['FastAPI', 'REST APIs'] },
      { label: 'Services', items: ['Modular enterprise modules', 'Workflow automation'] },
      { label: 'Data', items: ['PostgreSQL — multi-module schema'] },
    ],
    intelligence: {
      items: ['Feature-specific AI in select modules (e.g. education/intelligence workflows)'],
      note: 'Partial / feature-specific implementation — not platform-wide production AI.',
    },
  },
  Farmora: {
    layers: [
      { label: 'API Layer', items: ['FastAPI', 'REST APIs'] },
      { label: 'Services', items: ['Environment monitoring', 'Production management domain services'] },
      { label: 'Data', items: ['Domain models — environment, crop & production tracking'] },
    ],
    intelligence: {
      items: ['Architecture + development direction only'],
      note: 'Not yet implemented — roadmap capability. No autonomous intelligence, computer vision or robotics today.',
    },
  },
};

const socials = [
  { label: 'LinkedIn', shortLabel: 'in', url: profile.linkedin },
  { label: 'GitHub', shortLabel: 'GH', url: profile.github },
  { label: 'WhatsApp', shortLabel: 'WA', url: profile.whatsapp, ariaLabel: 'Contact Geetha on WhatsApp' },
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
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
  label?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return null;
  return (
    <a
      className={className}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      {...rest}
    >
      {children}
    </a>
  );
}

const expertiseIcons: Record<Expertise['icon'], React.ReactNode> = {
  stack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 3v4M12 17v4M4.2 6.2l2.8 2.8M17 15l2.8 2.8M3 12h4M17 12h4M4.2 17.8 7 15M17 9l2.8-2.8" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="3.5" y="3.5" width="7" height="7" />
      <rect x="13.5" y="3.5" width="7" height="7" />
      <rect x="3.5" y="13.5" width="7" height="7" />
      <rect x="13.5" y="13.5" width="7" height="7" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 8 0 5" />
    </svg>
  ),
  blueprint: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="3.5" y="4.5" width="17" height="15" rx="1" />
      <path d="M8 4.5v15M3.5 10h4.5M20 15h-4.5" />
    </svg>
  ),
  loop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M4 12a8 8 0 0 1 13.5-5.8L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.5 5.8L4 16" />
      <path d="M4 20v-4h4" />
    </svg>
  ),
};

function ExpertiseIcon({ type }: { type: Expertise['icon'] }) {
  return expertiseIcons[type];
}

function ProjectCard({
  project,
  index,
  onOpen,
  variant = 'supporting',
  active = false,
  animate = true,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
  variant?: 'flagship' | 'supporting';
  active?: boolean;
  animate?: boolean;
}) {
  return (
    <button
      className={`project-card ${variant} visual-${project.visual ?? 'modules'} ${animate ? 'reveal' : ''} ${active ? 'is-active' : ''}`}
      data-product-index={index}
      style={
        {
          '--accent': project.accent,
          '--delay': `${index * 70}ms`,
        } as React.CSSProperties
      }
      onClick={() => onOpen(project)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(project);
        }
      }}
      aria-label={`View ${project.name} details`}
    >
      <div className={`poster-art visual-${project.visual ?? 'modules'}`} aria-hidden="true">
        <span className="poster-grid" />
        <span className="product-system">
          <i /><i /><i /><i /><i />
        </span>
        <span className="product-character" aria-hidden="true">
          <i /><i /><i /><i /><i />
          <span className="character-core" />
        </span>
        <b>{project.monogram}</b>
        <em>{String(index + 1).padStart(2, '0')}</em>
      </div>
      <div className="card-copy">
        <div>
          {(project.displayCategory ?? project.category) && <p>{project.displayCategory ?? project.category}</p>}
          <h3>{project.name}</h3>
        </div>
        <span aria-hidden="true">↗</span>
      </div>
      {project.description && <p className="card-description">{project.description}</p>}
      {variant === 'supporting' && project.role && (
        <p className="motion-role"><span>Contribution</span>{project.role}</p>
      )}
      {variant === 'flagship' && (
        <div className="flagship-evidence">
          {project.role && (
            <p><span>Contribution</span>{project.role}</p>
          )}
          {project.technologies.length > 0 && (
            <p><span>Engineering signals</span>{project.technologies.join(' · ')}</p>
          )}
        </div>
      )}
      {project.private && project.status && <small>⌁ &nbsp; {project.status}</small>}
      {variant === 'supporting' && <span className="motion-explore">Explore product <i>↗</i></span>}
    </button>
  );
}

export function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [focusedNav, setFocusedNav] = useState<string | null>(null);
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const activeProductRef = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const careerJourney = [...journey].reverse();
  const [activeJourney, setActiveJourney] = useState(careerJourney.length - 1);
  const [activeCurrentRole, setActiveCurrentRole] = useState(0);
  const productRow = useRef<HTMLDivElement>(null);
  const productDrag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const productPaused = useRef(true);
  const productResumeTimer = useRef(0);
  const productSetWidth = useRef(0);
  const productVisible = useRef(false);
  const productSyncFrame = useRef(0);
  const productIgnoreScroll = useRef(false);
  const productAutoFrame = useRef(0);
  const startProductAuto = useRef(() => {});
  const stopProductAuto = useRef(() => {});
  const contactRef = useRef<HTMLElement>(null);
  const contactMoveFrame = useRef(0);
  const contactPointer = useRef({ x: 0, y: 0 });
  const contactFine = useRef(false);
  const contactReduce = useRef(false);
  const [contactReaction, setContactReaction] = useState<string | null>(null);
  const tier1Products = products.filter((p) => p.tier === 1);
  const tier2Products = products.filter((p) => p.tier === 2);
  const tier3Products = products.filter((p) => p.tier === 3);
  const loopedProducts = Array.from({ length: PRODUCT_LOOP_SETS }, (_, set) =>
    tier3Products.map((project) => ({ project, set, loopKey: `${set}-${project.name}` })),
  ).flat();
  const modalRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const verifiedTechnologyGroups = technologyGroups.filter(
    (group) => group.items.length > 0,
  );

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
    const sectionIds = ['overview', ...nav.map((item) => item.id), 'outcomes'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let scrolled = header.classList.contains('nav-scrolled');
    const onScroll = () => {
      const next = window.scrollY > 28;
      if (next === scrolled) return;
      scrolled = next;
      header.classList.toggle('nav-scrolled', next);
      header.classList.toggle('nav-top', !next);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => {
      contactReduce.current = reduce.matches;
      contactFine.current = fine.matches;
    };
    sync();
    reduce.addEventListener('change', sync);
    fine.addEventListener('change', sync);
    return () => {
      reduce.removeEventListener('change', sync);
      fine.removeEventListener('change', sync);
      if (contactMoveFrame.current) window.cancelAnimationFrame(contactMoveFrame.current);
    };
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
  const pauseProducts = () => {
    productPaused.current = true;
    window.clearTimeout(productResumeTimer.current);
    stopProductAuto.current();
    productRow.current?.classList.add('is-user');
    productRow.current?.classList.remove('is-auto');
  };

  const scheduleProductResume = () => {
    window.clearTimeout(productResumeTimer.current);
    productResumeTimer.current = window.setTimeout(() => {
      if (!selected) {
        productPaused.current = false;
        productRow.current?.classList.add('is-auto');
        productRow.current?.classList.remove('is-user');
        startProductAuto.current();
      }
    }, 4000);
  };

  const measureProductSet = () => {
    const row = productRow.current;
    if (!row) return;
    const cards = Array.from(row.children) as HTMLElement[];
    if (cards.length < tier3Products.length + 1) return;
    const width = cards[tier3Products.length].offsetLeft - cards[0].offsetLeft;
    if (width > 8) {
      const previous = productSetWidth.current;
      productSetWidth.current = width;
      if (!previous) {
        row.scrollLeft = width;
        window.requestAnimationFrame(() => syncProductIndex());
      }
    }
  };

  const normalizeProductLoop = () => {
    const row = productRow.current;
    const width = productSetWidth.current;
    if (!row || width < 8) return;
    if (row.scrollLeft >= width * 2) row.scrollLeft -= width;
    else if (row.scrollLeft < 2) row.scrollLeft += width;
  };

  const goToProduct = (index: number) => {
    const next = ((index % tier3Products.length) + tier3Products.length) % tier3Products.length;
    pauseProducts();
    scheduleProductResume();
    const row = productRow.current;
    if (!row) {
      setActiveProduct(next);
      return;
    }
    const center = row.getBoundingClientRect().left + row.clientWidth / 2;
    const cards = Array.from(row.children) as HTMLElement[];
    const match = cards.reduce(
      (best, card) => {
        if (Number(card.dataset.productIndex) !== next) return best;
        const mid = card.getBoundingClientRect().left + card.offsetWidth / 2;
        const distance = Math.abs(mid - center);
        return distance < best.distance ? { card, distance } : best;
      },
      { card: undefined as HTMLElement | undefined, distance: Number.POSITIVE_INFINITY },
    );
    match.card?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
    setActiveProduct(next);
    activeProductRef.current = next;
  };

  const nudgeProduct = (direction: -1 | 1) => {
    pauseProducts();
    scheduleProductResume();
    const row = productRow.current;
    if (!row) return;
    const center = row.getBoundingClientRect().left + row.clientWidth / 2;
    const cards = Array.from(row.children) as HTMLElement[];
    const withMid = cards.map((card) => ({
      card,
      mid: card.getBoundingClientRect().left + card.offsetWidth / 2,
    }));
    const target =
      direction > 0
        ? withMid.find((item) => item.mid > center + 28)
        : [...withMid].reverse().find((item) => item.mid < center - 28);
    target?.card.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const syncProductIndex = () => {
    const row = productRow.current;
    if (!row) return;
    normalizeProductLoop();
    const cards = Array.from(row.children) as HTMLElement[];
    const center = row.scrollLeft + row.clientWidth / 2;
    const span = row.clientWidth * 0.42;
    const metrics = cards.map((card) => {
      const mid = card.offsetLeft + card.offsetWidth / 2;
      const width = card.offsetWidth;
      return { card, width, distance: Math.abs(mid - center) };
    });
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (const { card, width, distance } of metrics) {
      const activeSpan = Math.max(48, width * 0.38);
      card.classList.toggle('is-active', distance < activeSpan);
      card.classList.toggle('is-near', distance >= activeSpan && distance < span);
      card.classList.toggle('is-edge', distance >= span);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = Number(card.dataset.productIndex ?? 0);
      }
    }
    if (nearest !== activeProductRef.current) {
      activeProductRef.current = nearest;
      setActiveProduct(nearest);
    }
  };

  const scheduleProductSync = () => {
    if (productSyncFrame.current) return;
    productSyncFrame.current = window.requestAnimationFrame(() => {
      productSyncFrame.current = 0;
      syncProductIndex();
    });
  };

  useEffect(() => {
    const row = productRow.current;
    if (!row) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 430px)');
    const section = row.closest('section');

    measureProductSet();
    const resize = new ResizeObserver(() => measureProductSet());
    resize.observe(row);

    const stopAuto = () => {
      if (productAutoFrame.current) {
        window.cancelAnimationFrame(productAutoFrame.current);
        productAutoFrame.current = 0;
      }
    };

    let autoFrames = 0;
    const tick = () => {
      productAutoFrame.current = 0;
      if (
        !productVisible.current ||
        productPaused.current ||
        selected ||
        reduce.matches ||
        mobile.matches ||
        document.hidden
      ) {
        return;
      }
      productIgnoreScroll.current = true;
      row.scrollLeft += 0.42;
      normalizeProductLoop();
      productIgnoreScroll.current = false;
      autoFrames += 1;
      if (autoFrames % 10 === 0) scheduleProductSync();
      productAutoFrame.current = window.requestAnimationFrame(tick);
    };

    const startAuto = () => {
      if (productAutoFrame.current) return;
      if (
        productPaused.current ||
        !productVisible.current ||
        selected ||
        reduce.matches ||
        mobile.matches ||
        document.hidden
      ) {
        return;
      }
      productAutoFrame.current = window.requestAnimationFrame(tick);
    };

    startProductAuto.current = startAuto;
    stopProductAuto.current = stopAuto;

    const visibility = new IntersectionObserver(
      ([entry]) => {
        productVisible.current = entry.isIntersecting;
        if (!entry.isIntersecting || selected || reduce.matches || mobile.matches) {
          productPaused.current = true;
          stopAuto();
          return;
        }
        if (row.classList.contains('is-user')) return;
        productPaused.current = false;
        row.classList.add('is-auto');
        startAuto();
      },
      { threshold: 0.22 },
    );
    if (section) visibility.observe(section);

    const onHidden = () => {
      if (document.hidden) stopAuto();
      else startAuto();
    };
    document.addEventListener('visibilitychange', onHidden);

    return () => {
      stopAuto();
      if (productSyncFrame.current) window.cancelAnimationFrame(productSyncFrame.current);
      window.clearTimeout(productResumeTimer.current);
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', onHidden);
      startProductAuto.current = () => {};
      stopProductAuto.current = () => {};
    };
  }, [selected]);

  useEffect(() => {
    if (selected) pauseProducts();
    else scheduleProductResume();
  }, [selected]);

  const contactCards: {
    label: string;
    hint: string;
    href: string;
    reaction: string;
    ariaLabel?: string;
    wide?: boolean;
  }[] = [
    { label: 'Email Me', hint: 'Start a project', href: profile.email ? `mailto:${profile.email}` : '', reaction: 'email' },
    { label: 'LinkedIn', hint: 'Connect professionally', href: profile.linkedin, reaction: 'linkedin' },
    { label: 'WhatsApp', hint: "Let's talk", href: profile.whatsapp, reaction: 'whatsapp', ariaLabel: 'Contact Geetha on WhatsApp' },
    { label: 'GitHub', hint: 'Explore my code', href: profile.github, reaction: 'github' },
    { label: 'KriPra Digital AI', hint: 'Venture in development', href: profile.companyWebsite, reaction: 'kripra', wide: true },
  ];

  const stackVisual = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, '-');

  return (
    <>
      <GeetzIntro />

      <header ref={headerRef} className="nav nav-top">
        <a className="brand" href="#overview" aria-label="GEETZ home">
          G<span>EE</span>TZ
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {nav.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>
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
          <a className="nav-cta" href="#contact">Let&apos;s connect <span>↗</span></a>
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
        <nav className="mobile-menu-list" aria-label="Primary navigation">
          {nav.map(({ id, label, desc }, index) => {
            const isActive = activeSection === id;
            const isFocused = focusedNav === id;
            return (
              <a
                key={id}
                onClick={closeMenu}
                onMouseEnter={() => setFocusedNav(id)}
                onMouseLeave={() => setFocusedNav(null)}
                onFocus={() => setFocusedNav(id)}
                onBlur={() => setFocusedNav(null)}
                href={`#${id}`}
                className={`${isActive ? 'active' : ''} ${isFocused ? 'focused' : ''}`.trim()}
              >
                <span className="mobile-menu-no">0{index + 1}</span>
                <span className="mobile-menu-label">{label}</span>
                <span className="mobile-menu-desc">{desc}</span>
                <i aria-hidden="true" />
              </a>
            );
          })}
        </nav>
        <div className="mobile-socials">
          {socials.map((social) => (
            <ExternalLink key={social.label} href={social.url}>
              {social.label} ↗
            </ExternalLink>
          ))}
          <ExternalLink href={profile.companyWebsite}>
            KriPra Digital AI ↗
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
              CTO @ Krishvi International · AI &amp; Enterprise Product Builder
            </p>
            <h1>
              Ideas, engineered
              <br />
              into <em>impact.</em>
            </h1>
            <p className="intro">
              I&apos;m <strong>Geetha K S</strong>, CTO at Krishvi International
              and a software engineer focused on turning complex operational
              problems into scalable digital products. My work spans enterprise
              architecture, full-stack engineering, system integration and
              AI-assisted product development.
            </p>
            <p className="intro">
              Alongside technology leadership, I architect and build enterprise
              platforms and AI-enabled products across education, enterprise
              operations and agriculture.
            </p>
            <div className="hero-facts" aria-label="Quick facts">
              <div><strong>9+</strong><span>Years Across Technology &amp; Engineering</span></div>
              <div><strong>CTO</strong><span>Krishvi International</span></div>
              <div><strong>AI &amp; Enterprise</strong><span>Product Builder</span></div>
            </div>
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
          <HeroOrbit />
          <div className="scroll-cue" aria-hidden="true">
            <span>Scroll to explore</span>
            <i />
          </div>
        </section>

        <section id="about-redesign" className="section about-redesign-section">
          <div className="section-label reveal">
            <span>—</span> About
          </div>
          <div className="about-redesign reveal">
            <div className="about-portrait-col">
              <div className="id-badge-wrap">
                <div className="id-badge-lanyard" aria-hidden="true">
                  <span className="id-badge-clip" />
                </div>
                <div className="id-badge-card">
                  <div className="id-badge-top">
                    <span className="id-badge-chip" aria-hidden="true" />
                    <span className="id-badge-label">EXECUTIVE ACCESS</span>
                  </div>
                  <div className="id-badge-photo">
                    <Image
                      src="/geetha-ks-portrait.jpg"
                      alt={profile.name}
                      fill
                      sizes="220px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="id-badge-info">
                    <h3>{profile.name}</h3>
                    <p>CTO · Software Engineer · Product Builder</p>
                    <span className="id-badge-org">Krishvi International</span>
                  </div>
                  <div className="id-badge-footer">
                    <img
                      className="id-badge-qr"
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&margin=0&color=9f74ff&bgcolor=0a0810&data=${encodeURIComponent(profile.linkedin)}`}
                      alt="QR code linking to LinkedIn profile"
                      width={54}
                      height={54}
                      loading="lazy"
                    />
                    <div className="id-badge-cred">
                      <span>CREDENTIAL</span>
                      <b>ACTIVE</b>
                    </div>
                  </div>
                  <span className="id-badge-edge" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="about-bio-col">
              <h3>Technology leadership meets engineering.</h3>
              <p>
                I&apos;m a hands-on CTO and software engineer building enterprise
                platforms and AI-enabled products. My approach: start with the
                operational problem, build the right architecture, engineer with
                precision, integrate with purpose.
              </p>
              <p>
                I lead technology strategy at Krishvi International while
                architecting independent products spanning education, enterprise
                operations and agriculture.
              </p>
              <div className="cto-scope">
                <span>CTO Scope — Krishvi International</span>
                <ul>
                  <li>Technology strategy &amp; direction</li>
                  <li>Strategic IT planning</li>
                  <li>System integration</li>
                  <li>Digital transformation</li>
                  <li>Software/product development</li>
                  <li>AI-focused project development</li>
                </ul>
              </div>
            </div>

            <div className="about-career-col">
              <h4>Career Progression</h4>
              <div className="career-flow-item">
                <span>2017</span>
                <strong>Software Engineering</strong>
              </div>
              <div className="career-flow-item">
                <span>2018–2021</span>
                <strong>Enterprise Systems &amp; Infrastructure</strong>
              </div>
              <div className="career-flow-item">
                <span>2021–2022</span>
                <strong>Product &amp; Systems Engineering</strong>
              </div>
              <div className="career-flow-item">
                <span>2022–2024</span>
                <strong>Technology Consulting</strong>
              </div>
              <div className="career-flow-item current">
                <span>2024–Present</span>
                <strong>Technology Leadership / CTO</strong>
              </div>
            </div>
          </div>
        </section>

        <SectorsSection />

        <section id="expertise" className="section expertise">
          <div className="section-label reveal">
            <span>02</span> What I build
          </div>
          <div className="section-heading reveal">
            <h2>Engineering, end to end.</h2>
            <p>From first requirements to production-ready systems.</p>
          </div>
          <div className="expertise-grid">
            {expertise.map((item) => (
              <article
                className={`expertise-card reveal ${item.primary ? 'primary' : ''}`}
                key={item.number}
              >
                <span className="expertise-no">{item.number}</span>
                <div className="expertise-icon" aria-hidden="true">
                  <ExpertiseIcon type={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.tags.length > 0 && (
                  <ul className="expertise-tags">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="products" className="section products">
          <div className="section-label reveal">
            <span>03</span> Product engineering
          </div>
          <div className="section-heading row reveal">
            <div>
              <h2>
                Products with <em>purpose.</em>
              </h2>
              <p>
                Flagship platforms I&apos;ve architected and engineered — each
                labeled by actual development stage, not marketing language.
              </p>
            </div>
          </div>

          <div className="products-flagship-label reveal">
            <span>Tier 1</span> Domain Flagships — core platform engineering
          </div>
          <div className="flagship-showcase reveal">
            {tier1Products.map((project, index) => {
              const arch = architectureByProduct[project.name];
              return (
              <article className="flagship-showcase-card" key={project.name} style={{ '--accent': project.accent } as React.CSSProperties}>
                <div className={`poster-art visual-${project.visual ?? 'modules'}`} aria-hidden="true">
                  <span className="poster-grid" />
                  <span className="product-system"><i /><i /><i /><i /><i /></span>
                  <b>{project.monogram}</b>
                  <em>{String(index + 1).padStart(2, '0')}</em>
                </div>
                <div className="flagship-showcase-copy">
                  <p className="flagship-category">{project.displayCategory ?? project.category}</p>
                  <h3>{project.name}</h3>
                  <p className="flagship-desc">{project.description}</p>
                  {project.role && (
                    <p className="flagship-meta"><span>My Contribution</span>{project.role}</p>
                  )}
                  {project.technologies.length > 0 && (
                    <p className="flagship-meta"><span>Technology</span>{project.technologies.join(' · ')}</p>
                  )}
                  {project.status && <span className="status-badge">{project.status}</span>}

                  {arch && (
                    <div className="arch-diagram">
                      <span className="arch-diagram-label">System architecture</span>
                      <div className="arch-stack">
                        {arch.layers.map((layer, li) => (
                          <div className="arch-layer" key={layer.label}>
                            <div
                              className="arch-layer-row"
                              tabIndex={0}
                              style={{ '--arch-d': `${li * 340}ms` } as React.CSSProperties}
                            >
                              <span className="arch-layer-name">{layer.label}</span>
                              <span className="arch-layer-items">{layer.items.join(' · ')}</span>
                            </div>
                            {li < arch.layers.length - 1 && (
                              <svg
                                className="arch-connector-svg"
                                viewBox="0 0 2 16"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                                style={{ '--arch-d': `${li * 340 + 170}ms` } as React.CSSProperties}
                              >
                                <line pathLength="1" x1="1" y1="0" x2="1" y2="16" />
                              </svg>
                            )}
                          </div>
                        ))}
                        {arch.intelligence && (
                          <div className="arch-branch" style={{ '--arch-d': `${arch.layers.length * 340}ms` } as React.CSSProperties}>
                            <svg className="arch-branch-svg" viewBox="0 0 22 16" preserveAspectRatio="none" aria-hidden="true">
                              <path pathLength="1" d="M1,0 L1,9 Q1,14 6,14 L22,14" fill="none" />
                            </svg>
                            <div
                              className="arch-intelligence"
                              tabIndex={0}
                              style={{ '--arch-d': `${arch.layers.length * 340 + 160}ms` } as React.CSSProperties}
                            >
                              <span className="arch-layer-name">Intelligence layer <em>(optional / where applicable)</em></span>
                              <span className="arch-layer-items">{arch.intelligence.items.join(' · ')}</span>
                              <p className="arch-intelligence-note">{arch.intelligence.note}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <button className="flagship-explore" onClick={() => openProject(project)}>
                    Explore product <i aria-hidden="true">↗</i>
                  </button>
                </div>
              </article>
            );})}
          </div>

          <div className="products-flagship-label reveal">
            <span>Tier 2</span> Strategic AI Flagships — AI-focused product architecture
          </div>
          <div className="flagship-showcase tier-2 reveal">
            {tier2Products.map((project, index) => (
              <article className="flagship-showcase-card" key={project.name} style={{ '--accent': project.accent } as React.CSSProperties}>
                <div className={`poster-art visual-${project.visual ?? 'modules'}`} aria-hidden="true">
                  <span className="poster-grid" />
                  <span className="product-system"><i /><i /><i /><i /><i /></span>
                  <b>{project.monogram}</b>
                  <em>{String(index + 1).padStart(2, '0')}</em>
                </div>
                <div className="flagship-showcase-copy">
                  <p className="flagship-category">{project.displayCategory ?? project.category}</p>
                  <h3>{project.name}</h3>
                  <p className="flagship-desc">{project.description}</p>
                  {project.role && (
                    <p className="flagship-meta"><span>My Contribution</span>{project.role}</p>
                  )}
                  {project.status && <span className="status-badge">{project.status}</span>}
                  <button className="flagship-explore" onClick={() => openProject(project)}>
                    Explore product <i aria-hidden="true">↗</i>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="products-supporting-label reveal">
            <span>Tier 3</span> Other Products / Explorations
          </div>
          <p className="products-supporting-note reveal">
            Broader product experimentation. Evidence and maturity under individual review.
          </p>

          <div className="motion-rail-head reveal" style={{ '--delay': '120ms' } as React.CSSProperties}>
            <div>
              <span>Product explorations</span>
              <p>{tier3Products.length} product explorations · use wheel, drag, swipe or arrow keys to explore.</p>
            </div>
            <div className="product-progress" aria-live="polite">
              <span>{String(activeProduct + 1).padStart(2, '0')} / {String(tier3Products.length).padStart(2, '0')}</span>
              <i aria-hidden="true"><b style={{ width: `${((activeProduct + 1) / tier3Products.length) * 100}%` }} /></i>
            </div>
            <div className="row-controls">
              <button onClick={() => nudgeProduct(-1)} aria-label="Previous product">←</button>
              <button onClick={() => nudgeProduct(1)} aria-label="Next product">→</button>
            </div>
          </div>
          <div
            className="project-row motion-product-rail reveal"
            style={{ '--delay': '220ms' } as React.CSSProperties}
            ref={productRow}
            tabIndex={0}
            role="region"
            aria-label="Product engineering catalogue"
            onScroll={() => {
              if (productIgnoreScroll.current) return;
              scheduleProductSync();
            }}
            onPointerEnter={pauseProducts}
            onPointerLeave={() => { if (!productDrag.current.active) scheduleProductResume(); }}
            onFocusCapture={pauseProducts}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) scheduleProductResume();
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') { event.preventDefault(); nudgeProduct(-1); }
              if (event.key === 'ArrowRight') { event.preventDefault(); nudgeProduct(1); }
            }}
            onWheel={(event) => {
              if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
              event.preventDefault();
              pauseProducts();
              event.currentTarget.scrollLeft += event.deltaX;
              scheduleProductResume();
            }}
            onPointerDown={(event) => {
              pauseProducts();
              productDrag.current = { active: true, startX: event.clientX, startScroll: event.currentTarget.scrollLeft, moved: false };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!productDrag.current.active) return;
              const distance = event.clientX - productDrag.current.startX;
              if (Math.abs(distance) > 5) productDrag.current.moved = true;
              event.currentTarget.scrollLeft = productDrag.current.startScroll - distance;
            }}
            onPointerUp={(event) => {
              productDrag.current.active = false;
              event.currentTarget.releasePointerCapture(event.pointerId);
              scheduleProductResume();
            }}
            onClickCapture={(event) => {
              if (productDrag.current.moved && event.detail > 0) {
                event.preventDefault();
                event.stopPropagation();
                productDrag.current.moved = false;
              } else if (event.detail === 0) {
                productDrag.current.moved = false;
              }
            }}
          >
            {loopedProducts.map(({ project, loopKey }, index) => (
              <ProjectCard
                key={loopKey}
                project={project}
                index={index % tier3Products.length}
                onOpen={openProject}
                active={activeProduct === index % tier3Products.length}
                animate={false}
              />
            ))}
          </div>
        </section>

        <section id="client-work" className="section clients">
          <div className="section-label reveal">
            <span>04</span> Client projects
          </div>
          <div className="section-heading reveal">
            <h2>Selected client work.</h2>
            <p>Real businesses. Real digital engagements — confidentiality intact.</p>
          </div>
          <div className="client-grid premium">
            {clients.map((client, index) => (
              <article
                className="client-card premium reveal"
                key={client.name}
                style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <button
                  className="client-preview"
                  onClick={() => openProject(client)}
                  aria-label={`View ${client.name} engagement details`}
                >
                  <span className="browser-frame" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <em>{client.website?.replace(/^https?:\/\//, '').replace(/\/$/, '')}</em>
                  </span>
                  {client.logo ? (
                    <div className={`client-logo-wrap client-logo-${index + 1}`}>
                      <Image
                        src={client.logo.src}
                        width={client.logo.width}
                        height={client.logo.height}
                        sizes="(max-width: 900px) 55vw, 24vw"
                        alt={client.name}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="client-mark" aria-hidden="true">{client.monogram}</div>
                  )}
                </button>
                <div className="client-copy">
                  <span className="client-no">0{index + 1}</span>
                  <p>{client.category}</p>
                  <h3>{client.name}</h3>
                  <small>{client.industry}</small>
                  <div className="client-actions">
                    <button onClick={() => openProject(client)}>
                      Engagement details ↗
                    </button>
                    {client.website && (
                      <ExternalLink href={client.website} label={`Visit ${client.name} website`}>
                        Visit website ↗
                      </ExternalLink>
                    )}
                  </div>
                </div>
              </article>
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
                <div className={`stack-card stack-${stackVisual(group.name)} reveal`} key={group.name}>
                  <span className="stack-art" aria-hidden="true"><i /><i /><i /><i /></span>
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
            <span>06</span> How I build
          </div>
          <div className="section-heading reveal">
            <h2>
              How I turn ideas<br />
              <em>into working systems.</em>
            </h2>
          </div>
          <div className="engineering-pipeline reveal" style={{'--pipeline-progress':`${(activeWorkflow/(workflow.length-1))*100}%`} as React.CSSProperties}>
            <ol className="pipeline-track" aria-label="Engineering workflow stages">
              {workflow.map((step, index) => (
                <li className={activeWorkflow === index ? 'active' : ''} key={step.label}>
                  <button
                    onClick={() => setActiveWorkflow(index)}
                    onMouseEnter={() => setActiveWorkflow(index)}
                    onFocus={() => setActiveWorkflow(index)}
                    aria-pressed={activeWorkflow === index}
                    aria-label={`${String(index + 1).padStart(2,'0')} ${step.label}: ${step.statement}`}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <i aria-hidden="true" />
                    <b>{step.label}</b>
                  </button>
                  {activeWorkflow === index && (
                    <div className="pipeline-mobile-detail">
                      <p>{step.statement}</p>
                      <ul>{step.signals.map(signal => <li key={signal}>{signal}</li>)}</ul>
                    </div>
                  )}
                </li>
              ))}
            </ol>
            <div className="pipeline-detail" aria-live="polite">
              <div>
                <span>{String(activeWorkflow + 1).padStart(2, '0')} / 06</span>
                <h3>{workflow[activeWorkflow].label}</h3>
              </div>
              <p>{workflow[activeWorkflow].statement}</p>
              <ul>
                {workflow[activeWorkflow].signals.map(signal => <li key={signal}>{signal}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="outcomes" className="section outcomes">
          <div className="section-label reveal">
            <span>07</span> Selected engineering outcomes
          </div>
          <div className="section-heading reveal">
            <h2>Built beyond the interface.</h2>
            <p>Evidence of engineering depth, described without confidential detail.</p>
          </div>
          <div className="outcomes-grid">
            {outcomes.map((item, index) => (
              <article className="outcome-card reveal" key={item.title}>
                <div className="outcome-top">
                  <span className="outcome-no">{String(index + 1).padStart(2, '0')}</span>
                  <span className="outcome-tag">{item.category}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="journey" className="section journey">
          <div className="section-label reveal">
            <span>08</span> Professional journey
          </div>
          <div className="journey-layout">
            <div className="journey-intro reveal">
              <h2>
                Building forward,<br />
                <em>one layer at a time.</em>
              </h2>
              <p>9+ years of engineering evolution — from software and enterprise systems to technology leadership and AI product development.</p>
              <div className="journey-range"><span>2016</span><i /><span>Present</span></div>
            </div>
            <div className="career-architecture reveal">
              <div className="career-scale" aria-hidden="true">
                {['2016','2018','2021','2022','2024','2025','NOW'].map(year => <span key={year}>{year}</span>)}
              </div>
              <div className="career-grid">
                <ol className="career-rail" aria-label="Professional journey from 2016 to present">
                  {careerJourney.map((item, index) => {
                    const isCurrentCTO = item.org === 'Krishvi International';
                    return (
                    <li className={`${activeJourney === index ? 'active' : ''} ${isCurrentCTO ? 'current' : ''}`} key={item.org + item.period}>
                      <button onClick={() => setActiveJourney(index)} aria-pressed={activeJourney === index}>
                        <span>{item.period.split('—')[0].trim()}</span>
                        <i aria-hidden="true" />
                        <div>
                          <small>{item.stage}</small>
                          <h3>{item.role}</h3>
                          <p>{item.org}</p>
                        </div>
                        {isCurrentCTO && <em>NOW</em>}
                      </button>
                      {activeJourney === index && (
                        <div className="career-mobile-detail">
                          <>
                              <p>{item.period}{item.location ? ` · ${item.location}` : ''}</p>
                              <span>{item.detail}</span>
                              {item.signals && <ul>{item.signals.map(signal => <li key={signal}>{signal}</li>)}</ul>}
                              {isCurrentCTO && (
                                <div className="journey-current-hierarchy">
                                  <div className="journey-primary-card">
                                    <h4>Chief Technology Officer</h4>
                                    <p>Krishvi International · 2024 — Present</p>
                                    <ul>
                                      <li>Technology strategy &amp; direction</li>
                                      <li>Strategic IT planning</li>
                                      <li>System integration</li>
                                      <li>Digital transformation</li>
                                      <li>Software/product development</li>
                                      <li>AI-focused project development</li>
                                    </ul>
                                  </div>
                                  <div className="journey-parallel-card">
                                    <h4>Independent Product Building → KriPra Digital AI</h4>
                                    <p>Venture in Development · Company registration in progress</p>
                                    <p className="separation-note">Separate from Krishvi International — not operated by or part of Krishvi International.</p>
                                  </div>
                                </div>
                              )}
                            </>
                        </div>
                      )}
                    </li>
                    );
                  })}
                </ol>
                <article className="career-detail" aria-live="polite">
                  <span>{careerJourney[activeJourney].stage}</span>
                  <h3>{careerJourney[activeJourney].role}</h3>
                  <p className="career-org">{careerJourney[activeJourney].org}</p>
                  <p className="career-period">{careerJourney[activeJourney].period}{careerJourney[activeJourney].location ? ` · ${careerJourney[activeJourney].location}` : ''}</p>
                  <p>{careerJourney[activeJourney].detail}</p>
                  {careerJourney[activeJourney].signals && <ul>{careerJourney[activeJourney].signals?.map(signal => <li key={signal}>{signal}</li>)}</ul>}
                  {careerJourney[activeJourney].org === 'Krishvi International' && (
                    <div className="journey-current-hierarchy">
                      <div className="journey-primary-card">
                        <h4>Chief Technology Officer</h4>
                        <p>Krishvi International · 2024 — Present</p>
                        <ul>
                          <li>Technology strategy &amp; direction</li>
                          <li>Strategic IT planning</li>
                          <li>System integration</li>
                          <li>Digital transformation</li>
                          <li>Software/product development</li>
                          <li>AI-focused project development</li>
                        </ul>
                      </div>
                      <div className="journey-parallel-card">
                        <h4>Independent Product Building → KriPra Digital AI</h4>
                        <p>Venture in Development · Company registration in progress</p>
                        <p className="separation-note">Separate from Krishvi International — not operated by or part of Krishvi International.</p>
                      </div>
                    </div>
                  )}
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="company" className="section company">
          <div className="company-card reveal">
            <div className="company-copy-left">
              <p>Founder Initiative</p>
              <h2>
                KriPra
                <br />
                Digital AI
              </h2>
              <small>Venture in Development</small>
            </div>
            <div className="company-copy-right">
              <p>
                Building AI-assisted and enterprise software platforms.
                Company registration in progress. A parallel independent
                direction alongside my primary role as CTO at Krishvi
                International.
              </p>
              <ExternalLink className="text-link" href={profile.companyWebsite}>
                Visit venture website <span>↗</span>
              </ExternalLink>
            </div>
            <b aria-hidden="true">K</b>
            <ol className="company-flow" aria-hidden="true">
              <li>Idea</li>
              <li>Engineering</li>
              <li>AI</li>
              <li>Venture</li>
            </ol>
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

        <section
          id="contact"
          className="section contact"
          ref={contactRef}
          onPointerMove={(event) => {
            if (contactReduce.current || !contactFine.current) return;
            contactPointer.current.x = event.clientX;
            contactPointer.current.y = event.clientY;
            const node = event.currentTarget;
            if (contactMoveFrame.current) return;
            contactMoveFrame.current = window.requestAnimationFrame(() => {
              contactMoveFrame.current = 0;
              const rect = node.getBoundingClientRect();
              node.style.setProperty('--mx', `${contactPointer.current.x - rect.left}px`);
              node.style.setProperty('--my', `${contactPointer.current.y - rect.top}px`);
            });
          }}
        >
          <div className="contact-orb" aria-hidden="true" />
          <div className="contact-glow" aria-hidden="true" />
          <p className="eyebrow reveal">
            <span />
            Start a conversation
          </p>
          <h2 className="reveal">
            Building something
            <br />
            <em>
              ambitious?
              <span className={`contact-cameo${contactReaction ? ` is-${contactReaction}` : ''}`} aria-hidden="true">
                <GeetzCompanionMark />
                <i className="cameo-signal" />
              </span>
            </em>
          </h2>
          <p className="reveal">
            Let&apos;s engineer it with clarity. Open to conversations around
            enterprise platforms, AI product development, technology
            partnerships and complex software systems.
          </p>
          <div className="contact-grid reveal">
            {contactCards.map((card) => (
              <ExternalLink
                key={card.label}
                href={card.href}
                className={`contact-card${card.wide ? ' is-wide' : ''}`}
                label={card.ariaLabel}
                onPointerEnter={() => setContactReaction(card.reaction)}
                onPointerLeave={() => setContactReaction(null)}
                onFocus={() => setContactReaction(card.reaction)}
                onBlur={() => setContactReaction(null)}
              >
                <b>{card.label} <i>↗</i></b>
                <small>{card.hint}</small>
              </ExternalLink>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand reveal">
            <a className="brand" href="#overview" aria-label="GEETZ home">
              G<span>EE</span>TZ
            </a>
            <p className="footer-name">{profile.name}</p>
            <p className="footer-role">CTO · Software Engineer · AI &amp; Enterprise Product Builder</p>
            <p className="footer-philosophy">
              Building intelligent products.
              <br />
              Solving real problems.
              <br />
              Creating <em>meaningful impact.</em>
            </p>
          </div>
          <nav className="footer-nav reveal" aria-label="Footer">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`}>{item.label}</a>
            ))}
          </nav>
        </div>
        <div className="footer-socials reveal">
          {socials.map((social) => (
            <ExternalLink key={social.label} href={social.url} label={'ariaLabel' in social ? social.ariaLabel : undefined}>
              {social.label.replace(' Me', '')}
            </ExternalLink>
          ))}
        </div>
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} {profile.name}</small>
          <p>Crafted with purpose. Engineered with passion.</p>
        </div>
        <i className="footer-line" aria-hidden="true" />
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
            aria-describedby={selected.description ? 'modal-overview' : undefined}
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
            <div className={`modal-art visual-${selected.visual ?? 'modules'}`} aria-hidden="true">
              <span className="product-system">
                <i /><i /><i /><i /><i />
              </span>
              <b>{selected.monogram}</b>
              {selected.category && <em>{selected.category}</em>}
            </div>
            <div className="modal-content">
              {!selected.needsReview && <p>{selected.private ? 'Private commercial product' : 'Client project'}</p>}
              <h2 id="modal-title">{selected.name}</h2>
              <div className="modal-grid">
                {selected.description && <div>
                  <span>Overview</span>
                  <p id="modal-overview">{selected.description}</p>
                </div>}
                {selected.role && (
                  <div>
                    <span>My contribution</span>
                    <p>{selected.role}</p>
                  </div>
                )}
                {selected.technologies.length > 0 && (
                  <div>
                    <span>Engineering signals</span>
                    <p>{selected.technologies.join(' · ')}</p>
                  </div>
                )}
                {selected.focus && selected.focus.length > 0 && (
                  <div>
                    <span>Product focus</span>
                    <p>{selected.focus.join(' · ')}</p>
                  </div>
                )}
                {selected.category && <div><span>Project type</span><p>{selected.category}</p></div>}
                {selected.status && <div><span>Status</span><p>{selected.status}</p></div>}
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
