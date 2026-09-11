# PHASE 2: INFORMATION ARCHITECTURE & VISUAL REDESIGN
## Implementation Plan

**Status**: Ready for implementation  
**Focus**: Premium visual hierarchy, technical sophistication, no motion yet  
**Deliverable**: Desktop + mobile screenshots of redesigned sections  

---

## COMPONENTS TO CREATE/MODIFY

### 1. **SectorsSection.tsx** (NEW) ✅ CREATED
**Location**: `components/SectorsSection.tsx`
- Interactive domain experience (Education/Enterprise/Agriculture)
- Click-to-expand sector details
- Shows problem space → capabilities → product
- Responsive grid layout
- Keyboard accessible

**CSS Requirements** (to add to globals.css):
```css
.sectors { background: #08070b; }
.sectors-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  gap: 1.5rem; 
}
.sector-card { 
  padding: 2rem; 
  border: 1px solid #ffffff12; 
  background: linear-gradient(135deg, #100d18, #08070b);
  cursor: pointer;
  transition: border-color 0.3s, background 0.3s;
}
.sector-card.active { 
  border-color: var(--violet);
  background: linear-gradient(135deg, #2a1f47, #15101f);
}
.sector-detail { 
  margin-top: 2rem; 
  padding-top: 2rem; 
  border-top: 1px solid #ffffff12;
  display: grid; 
  gap: 1.5rem; 
}
```

---

### 2. **AboutSection.tsx** (REDESIGN)
**Current**: AboutGate + basic layout  
**Target**: Premium layout with:
- Left: Professional portrait (geetha-ks-portrait.jpg)
- Center: Technical narrative + positioning
- Right: Career progression timeline (visual)

**Structure**:
```
┌─────────────────────────────────────────┐
│         ABOUT SECTION                   │
├──────────┬──────────────┬───────────────┤
│          │              │               │
│ Portrait │    Bio       │  Career Flow  │
│          │    + CTO     │               │
│          │    Scope     │  2017 → 2026  │
│          │              │               │
└──────────┴──────────────┴───────────────┘
```

**Key Elements**:
- Portrait frame with subtle depth
- "CTO @ Krishvi International" prominent
- 9+ years positioning clear
- Career progression (Software → Enterprise → CTO → AI Product)
- No component restructuring—enhance existing layout

---

### 3. **JourneySection.tsx** (RESTRUCTURE)
**Current**: Dual-role layout showing Pragatham + KriPra  
**Target**: Clear hierarchy showing:
- **Primary**: Krishvi CTO (2024—Present)
- **Parallel**: Independent Product Building → KriPra (separate branch)
- **History**: Timeline back to 2016

**Visual Changes**:
- Timeline node for Krishvi positioned as PRIMARY
- Krishvi detail panel shows full CTO scope
- KriPra shown as SEPARATE entrepreneurial branch (not in primary timeline)
- Previous roles intact (2016—2024)

**Key Change**: 
KriPra is visually and textually SEPARATE, NOT hierarchically linked to Krishvi.

---

### 4. **ProductsSection.tsx** (HIERARCHY)
**Current**: Mixed carousel approach  
**Target**: Clear flagship vs. supporting distinction

**Layout**:
```
FLAGSHIP PRODUCTS (3)
├─ EDNORYX (MVP · Active Development)
├─ Enterprise ERP Platform (Working MVP · Active Development · Pre-commercial)
└─ Farmora (In Development · MVP-oriented)

SUPPORTING CATALOGUE (5, deprioritized)
├─ StaffTract.AI (deferred)
├─ JusticeAngel (deferred)
├─ Faturaix (deferred)
├─ Pyrosk AI (deferred)
└─ Trade ERP / CRM (deferred)
```

**Interaction**:
- Flagship products: Full details visible
- Supporting: Show in secondary section or hidden by default
- Status badges prominent on all

---

### 5. **EngineeringSection.tsx** (ENHANCED)
**Current**: Stack section (list of technologies)  
**Target**: Visual proof of engineering capability

**New Content**:
- **Full-Stack Development Flow**: UI → API → Backend → Data (with optional Integrations + AI branches)
- **Engineering Stack Architecture**: Layered visualization showing Backend → API → Services → Data → Intelligence → Operations
- No continuous animations—static but sophisticated visual hierarchy

**Visual Approach**:
- Vertical or horizontal flow depending on viewport
- Technology categorization at each layer
- Hover reveals detailed stack at that layer
- Color-coded sections (Frontend, Backend, Data, AI, Ops)

---

## SECTION ORDERING

**New Site Map** (with Phase 2 changes):

```
01. HERO / OVERVIEW
    └─ CTO identity established

02. ABOUT (REDESIGNED)
    └─ Portrait + Career progression

03. SECTORS (NEW)
    └─ Interactive domain experience

04. EXPERTISE (EXISTING, enhanced)
    └─ Full-Stack, AI/LLM, SaaS, APIs, Data, Automation

05. ENGINEERING (ENHANCED)
    └─ Full-Stack flow + Stack architecture

06. PRODUCTS (REDESIGNED HIERARCHY)
    ├─ Flagship (EDNORYX, ERP, Farmora)
    └─ Supporting (deprioritized)

07. HOW I BUILD (EXISTING)
    └─ Discover → Architect → Design → Engineer → Intelligence → Ship

08. ENGINEERING EVIDENCE
    └─ Outcomes (existing)

09. CLIENT WORK (EXISTING)
    └─ 3 client cards

10. CAREER JOURNEY (RESTRUCTURED)
    └─ Krishvi primary + KriPra parallel

11. GITHUB (EXISTING)
    └─ Technical proof

12. CONTACT (EXISTING, revised CTA)
    └─ "Building something ambitious? Let's engineer it with clarity."

13. FOOTER (EXISTING)
```

---

## CSS STRATEGY

**Keep existing**:
- Premium black/white/violet palette
- Responsive grid foundation
- Reveal animations (scroll-based)
- All motion utilities

**Add**:
- `.sectors-grid` and related sector styles
- Enhanced `.about-layout` for three-column
- `.journey-hierarchy` for Krishvi primary layout
- `.products-flagship` vs `.products-supporting` distinction
- `.engineering-flow` for visual architecture

**No major CSS refactor** — build on existing structure, add new classes for Phase 2 sections.

---

## IMPLEMENTATION SEQUENCE

**Step 1**: Integrate SectorsSection component into Portfolio.tsx  
**Step 2**: Enhance About section layout (three-column)  
**Step 3**: Restructure Journey to show Krishvi primary  
**Step 4**: Reorganize Products with flagship/supporting  
**Step 5**: Enhance Engineering section with visual flow  
**Step 6**: Add CSS for new/modified sections  
**Step 7**: Test responsive (desktop/mobile)  
**Step 8**: Capture screenshots  

---

## SCREENSHOT TARGETS

Before moving to Phase 3, capture:

**Desktop (1440px)**:
- [ ] Hero section
- [ ] About section (portrait + timeline)
- [ ] Sectors section (collapsed & expanded)
- [ ] Products section (flagship cards)
- [ ] Journey section (Krishvi primary)
- [ ] Engineering flow

**Mobile (375px)**:
- [ ] Hero section
- [ ] About section (stacked)
- [ ] Sectors section (accordion)
- [ ] Products section (responsive)
- [ ] Journey section (vertical timeline)
- [ ] Engineering flow (simplified)

---

## ANIMATION NOTES

Phase 2 is structure-first, not motion-first. Interactions needed for UX validation only:
- Sector card expand/collapse (JS, no animation)
- Product card focus states (CSS, no animation)
- Hover state highlights (CSS transitions are fine)

**Full motion implementation → Phase 4** (after structure is approved).

---

## READY FOR PHASE 2?

✅ SectorsSection component created  
✅ Clear visual hierarchy defined  
✅ Responsive approach planned  
✅ CSS strategy established  
✅ Implementation sequence ready  

**Next**: Integrate into Portfolio.tsx, add CSS, capture screenshots.

Awaiting approval to proceed with Phase 2 implementation.
