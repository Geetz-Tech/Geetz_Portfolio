'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { products } from '../data/content';

interface Domain {
  id: string;
  name: string;
  label: string;
  flow: string[];
  productName: string;
  accent: string;
}

function findProduct(name: string) {
  return products.find((p) => p.name === name);
}

const ednoryx = findProduct('EDNORYX');
const erp = findProduct('Enterprise ERP Platform');
const farmora = findProduct('Farmora');

const domains: Domain[] = [
  {
    id: 'education',
    label: 'Education Technology',
    name: 'Students / Teachers / Parents',
    flow: [
      'Students / Teachers / Parents',
      'LMS / Assessments / Student360',
      'AI-assisted teacher & assessment support',
    ],
    productName: ednoryx?.name ?? 'EDNORYX',
    accent: ednoryx?.accent ?? '#8c6cff',
  },
  {
    id: 'enterprise',
    label: 'Enterprise Systems',
    name: 'Business Operations',
    flow: [
      'Business Operations',
      'Modules / Workflows',
      'APIs / Data / Integrations',
    ],
    productName: erp?.name ?? 'Enterprise ERP Platform',
    accent: erp?.accent ?? '#b071ff',
  },
  {
    id: 'agriculture',
    label: 'Agriculture Technology',
    name: 'Environment / Monitoring',
    flow: [
      'Environment / Monitoring',
      'Production / Operations',
      'Data / Integration',
      'AI & automation direction',
    ],
    productName: farmora?.name ?? 'Farmora',
    accent: farmora?.accent ?? '#51b99b',
  },
];

const MAX_TILT = 5;

export function SectorsSection() {
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const finePointer = useRef(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    finePointer.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => { reducedMotion.current = mq.matches; };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  const handleMove = (id: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    if (!finePointer.current || reducedMotion.current) return;
    const el = cardRefs.current[id];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = px * MAX_TILT * 2;
    const rotateX = -py * MAX_TILT * 2;
    el.style.transition = 'none';
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
  };

  const handleLeave = (id: string) => () => {
    setActiveDomain((cur) => (cur === id ? null : cur));
    const el = cardRefs.current[id];
    if (!el) return;
    el.style.transition = 'transform .45s cubic-bezier(.22,.68,.32,1)';
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  const toggleMobile = (id: string) => {
    setExpandedMobile((cur) => (cur === id ? null : id));
  };

  return (
    <section id="sectors" className="section sectors reveal">
      <div className="section-label reveal">
        <span>02</span> Sectors
      </div>
      <div className="section-heading reveal">
        <h2>Product engineering across operational domains.</h2>
        <p>One engineering practice, three domains. Real problems in education, enterprise operations, and agriculture — real architecture behind each.</p>
      </div>

      <div className="domain-map reveal" data-active={activeDomain ?? undefined}>
        <div className="domain-center">
          <span>System Architecture &amp;</span>
          <strong>Product Engineering</strong>
        </div>

        <svg className="domain-connectors" viewBox="0 0 1200 210" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="domain-path"
            data-domain="education"
            pathLength="1"
            style={{ '--path-accent': domains[0].accent } as CSSProperties}
            d="M600,8 C600,70 200,55 200,140"
          />
          <path
            className="domain-path"
            data-domain="enterprise"
            pathLength="1"
            style={{ '--path-accent': domains[1].accent } as CSSProperties}
            d="M600,8 L600,140"
          />
          <path
            className="domain-path"
            data-domain="agriculture"
            pathLength="1"
            style={{ '--path-accent': domains[2].accent } as CSSProperties}
            d="M600,8 C600,70 1000,55 1000,140"
          />
        </svg>

        <div className="domain-grid">
          {domains.map((domain, i) => (
            <div
              key={domain.id}
              ref={(el) => { cardRefs.current[domain.id] = el; }}
              className={`domain-node${expandedMobile === domain.id ? ' is-expanded' : ''}`}
              style={{ '--accent': domain.accent, '--d': `${600 + i * 150}ms` } as CSSProperties}
              tabIndex={0}
              role="button"
              aria-expanded={expandedMobile === domain.id}
              onMouseEnter={() => setActiveDomain(domain.id)}
              onMouseMove={handleMove(domain.id)}
              onMouseLeave={handleLeave(domain.id)}
              onFocus={() => setActiveDomain(domain.id)}
              onBlur={() => setActiveDomain((cur) => (cur === domain.id ? null : cur))}
              onClick={() => toggleMobile(domain.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleMobile(domain.id);
                }
              }}
            >
              <div className="domain-node-inner">
                <span className="domain-node-label">{domain.label}</span>
                <ul className="domain-flow">
                  {domain.flow.map((step, si) => (
                    <li key={step} style={{ '--d': `${900 + i * 150 + si * 90}ms` } as CSSProperties}>
                      {step}
                    </li>
                  ))}
                </ul>
                <div
                  className="domain-product"
                  style={{ '--d': `${900 + i * 150 + domain.flow.length * 90 + 120}ms` } as CSSProperties}
                >
                  <strong>{domain.productName}</strong>
                  <span className="domain-cue" aria-hidden="true">{expandedMobile === domain.id ? '−' : '+'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
