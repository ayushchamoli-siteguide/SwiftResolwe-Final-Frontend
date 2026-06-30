# SwiftResolwe (ODR 2.0) — Marketing Landing Page

## Original Problem Statement
Build a production-quality, fully responsive marketing landing page for SwiftResolwe — an Indian Online Dispute Resolution platform ("ODR 2.0"). Frontend only, except for a functional AI chat assistant. Light theme, cyan accent (#0891B2), Geist + Geist Mono fonts. No hyphens/dashes in visible copy. 12 sections including hero with animated triage SVG, ticker, four standalone resolution tiers, panel of neutrals, dual track (individuals/enterprise), enterprise sectors, case managers, economic advantage with interactive calculator, jurisdictional callout, FAQ, footer. Floating chat launcher with assistant.

## Stack
- React 19 + Tailwind 3 + framer-motion 11 + lucide-react + lenis 1.3
- Geist + Geist Mono via Google Fonts
- Backend kept minimal (status-check only). Chat is client-side fallback (deterministic KB retrieval) per user choice (option iv).

## User Choices
- a) iv — Chat: fallback only, no live LLM
- b) Approved plan

## Implemented (2026-12)
- All 12 sections with exact copy from spec (no dashes/hyphens)
- Hero with animated SVG triage (6 dispute nodes → SWIFT TRIAGE ENGINE hub → 4 parallel tier endpoints, no inter-tier arrows)
- TrustMetrics with count-ups, 30%-faster marquee ticker (pause on hover), 8 sector tiles
- Tech Manifesto callout
- 4 standalone Resolution Tier cards (neutral simultaneous stagger, no escalation visual), typing reveal on bullets
- Panel of Neutrals (Justice Ramana pull quote + 2 panel cards)
- Dual Track Gateway (Individuals/MSMEs + Banks/NBFCs/Enterprises) with emerald checkmarks
- 5 V/0x Enterprise sector cards
- 3 Case Managers cards + Schedule consultation CTA
- Economic Advantage: animated timeline bars + 3 metric cards + Interactive calculator with Indian numbering (L/Cr), formula per spec
- Jurisdictional Clarity callout (slate-deep)
- 8-item FAQ accordion (Q01-Q08)
- Sticky glass header with brand glyph (one-time draw-on), mobile menu, Schedule CTA on scroll
- Footer with 3 link columns + Coming Soon Message A, identity column, statutory ribbon
- ScrollProgress bar, Lenis smooth scroll (disabled on prefers-reduced-motion)
- ComingSoonModal (variants A and B), ScheduleConsultModal, /login placeholder page
- Floating ChatAssistant with KB-based fallback; shows Coming Soon Message B on first open

## Backlog / Future
- P1: Wire live LLM (Emergent Universal Key) when user opts in
- P1: Real consultation booking (Resend email) integration
- P2: Empanelled neutrals public dossier page
- P2: Developer portal & REST API docs

## Architecture
- /app/frontend/src/App.js — router + shell (header/footer/chat/modals + Lenis)
- /app/frontend/src/components/swift/* — SwiftContext, Header, Footer, ChatAssistant, ComingSoonModal, ScheduleConsultModal, ScrollProgress, BrandGlyph, Reveal, TypingReveal, hooks.js
- /app/frontend/src/components/swift/sections/* — 11 section components
- /app/frontend/src/pages/Landing.jsx, /app/frontend/src/pages/Login.jsx
- /app/frontend/src/index.css — design tokens (cyan accent #0891B2, slate-deep #0E1726, positives emerald, no orange), keyframes, marquee, typing mask, CTA styles
