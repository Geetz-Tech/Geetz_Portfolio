# FLAGSHIP EVIDENCE MATRIX
## StaffTract.AI & JusticeAngel

**Status**: Awaiting lock/approval before any architecture diagrams are built  
**Date**: 2026-09-11  
**Purpose**: Separate known product context from verified/confirmed implementation evidence

**Legend:**
- 🟢 **Confirmed** — you've stated this as fact in this conversation
- 🟡 **Known context, unverified against current code/runtime** — plausible from prior work, needs your explicit confirmation
- 🔴 **Not established** — no information provided; must not be claimed

---

## PRODUCT 1: StaffTract.AI

| Field | Value | Confidence |
|---|---|---|
| **Product purpose** | AI-assisted recruitment and workforce intelligence platform, focused on GCC manpower/recruitment and India-side agency workflows | 🟢 Confirmed |
| **Target users** | Recruitment agencies, recruiters, workforce/manpower operations teams (GCC + India corridor) | 🟡 Known context |
| **Current stage** | Active Product Development / Prototype-to-MVP | 🟢 Confirmed (your stated portfolio-safe stage) |
| **Working features** (claimed built) | Candidate management, job/vacancy workflows, placement workflows, passport/visa/medical-status tracking, deployment tracking, recruiter workflows, document/compliance workflows, duplicate candidate detection, recruitment analytics | 🟡 Known context — not individually verified as *running* vs. designed |
| **Implemented AI** | None confirmed as implemented-and-working today | 🔴 Not established |
| **Development-stage AI** | Resume parsing, candidate-job matching, ranking/scoring, duplicate/fraud-oriented intelligence | 🟡 Known direction — status (started/partial/functional) not specified |
| **Planned AI** | Anything beyond the above not yet started | 🔴 Not established (default assumption) |
| **Tech stack** | FastAPI (backend), React/Vite/TypeScript (frontend), PostgreSQL, API-driven architecture, tenant isolation, auth/authz, file-upload validation | 🟡 Known context — "previously associated technical direction," not confirmed as current |
| **My contribution** | Product concept, workflow design, system architecture, backend/API design, AI feature direction, recruitment workflow modeling, testing/validation, product direction | 🟡 Known context — to verify |
| **Available proof** | None confirmed publicly shareable | 🔴 Not established |
| **Public/confidentiality status** | Presumed private/proprietary | 🟡 Assumed |
| **Explicitly prohibited claims** | 95%+ accuracy, bias-free AI, fully autonomous recruitment, production deployment, active customer usage, enterprise-scale adoption | — |

### My Assessment

StaffTract.AI has the richest known baseline of the two, with a coherent, plausible product scope (GCC/India recruitment operations) and a technical direction consistent with your verified stack elsewhere (FastAPI/React/PostgreSQL). However, three things are still open:

1. Whether the "working features" list reflects **running, testable functionality** or **designed/scoped functionality**
2. Whether **any** AI capability (resume parsing, matching, etc.) currently executes end-to-end, even in a dev/mock environment
3. Whether the tech stack listed is what's **actually deployed today**, not just historically associated

**Recommended verdict: FLAGSHIP WITH CAVEATS**

Suitable for a compact flagship-adjacent entry (Tier 2, not full architecture-diagram treatment like EDNORYX/ERP/Farmora) *if* you confirm at minimum: (a) the platform runs with core CRUD/workflow functionality today, and (b) at least one AI capability is in active/functional development — not purely conceptual. If neither can be confirmed, it should sit with the deferred/secondary products instead.

---

## PRODUCT 2: JusticeAngel

| Field | Value | Confidence |
|---|---|---|
| **Product purpose** | AI-assisted legal technology platform | 🟢 Confirmed (directional only) |
| **Target users** | Not specified | 🔴 Not established |
| **Current stage** | Not specified | 🔴 Not established |
| **Working features** | Legal research, case workflows, legal drafting, judgments/precedents, citations, document workflows, billing/audit/admin, bilingual Arabic/English, RTL readiness | 🟡 **Product scope/vision only** — you explicitly said do not assume these are implemented |
| **Implemented AI** | None | 🔴 Not established |
| **Development-stage AI** | Unclear | 🔴 Not established |
| **Planned/potential AI** | AI-assisted legal research, drafting assistance, citation/reference support, document summarization/extraction, knowledge retrieval, Arabic/English legal-language assistance | 🟡 "Potential areas to verify" — not confirmed as in development |
| **Tech stack** | Not specified | 🔴 Not established |
| **My contribution** | Not specified | 🔴 Not established |
| **Available proof** | None | 🔴 Not established |
| **Public/confidentiality status** | Presumed private | 🟡 Assumed |
| **Explicitly prohibited claims** | Autonomous legal advice, lawyer replacement, legal accuracy guarantees, court/government approval, production legal reasoning, customer deployment | — |

### My Assessment

JusticeAngel currently has materially less verified information than StaffTract.AI: no confirmed stage, no confirmed tech stack, no confirmed contribution details, and the feature list is explicitly framed by you as scope/vision rather than implementation. There isn't enough here to support even a caveated flagship or Tier-2 entry.

**Recommended verdict: NOT READY FOR FLAGSHIP**

Recommend holding JusticeAngel out of the visible product set entirely for now (same treatment as the other deferred/unverified products from Phase 1), rather than including it with a vague "exploration" label that implies more substance than currently confirmed. This can be revisited once you've done the evidence audit on your side.

---

## SUMMARY VERDICT TABLE

| Product | Verdict | Recommended Treatment |
|---|---|---|
| **StaffTract.AI** | FLAGSHIP WITH CAVEATS *(pending your confirmation of 2 items below)* | Tier 2 compact entry — not full architecture diagram — until confirmed |
| **JusticeAngel** | NOT READY FOR FLAGSHIP | Keep out of visible product set (same as other deferred products) |

### Two things needed from you to finalize StaffTract.AI's treatment:

1. Does the platform currently run with core CRUD/workflow functionality (candidate/job/placement records, not just schema/design)?
2. Is at least one AI capability (resume parsing, matching, ranking, or duplicate detection) functionally working today — even in a dev/mock state — or is AI still at the direction/design stage only?

**This matrix is not yet locked.** Awaiting your confirmation/adjustment before any architecture work touches these two products.

---

Proceeding now with Phase 3 architecture work for the three already-verified flagships: **EDNORYX, Enterprise ERP Platform, Farmora.**
