# KrishiMitra

An offline-first digital assistant for small farmers. KrishiMitra combines weather, crop stage and mandi prices into simple daily actions, and gives farmers leaf scanning, price tracking, government scheme checks and one-tap expert help — in five Indian languages.

**Frontend only. Demo data only. No backend, no live APIs, no remote assets.**

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # preview the production build
```

On first open, choose a language and either complete the 4-step onboarding or tap **Use demo farmer**. The demo farmer is Ramanna from Kolar (tomato, 2 acres, sown 42 days ago).

## Screens

| Area | What it does |
| --- | --- |
| Onboarding | Language, village/pincode, crop, sowing date, land, soil |
| Home | Today's actions, crop stage, savings, quick actions, rain alert |
| Calendar | Season timeline, tasks, completion tracking |
| Ask | Typed or spoken questions, answers with sources and confidence |
| Scan | Camera/upload or sample leaf, simulated diagnosis, treatment and history |
| Weather | 7-day forecast, hourly rain, soil moisture, action tips |
| Prices | 30-day trend, mandi comparison, sell/wait advice, calculator, price alert |
| Schemes | 5-question eligibility check, scheme details, documents, apply steps |
| Soil | Soil Health Card summary, nutrient levels, fertilizer dose |
| Alerts | Rain, pest, price and deadline alerts; read state; channel previews |
| Community | Kisan Call Centre, KVK, agriculture officer, FPO, RSK |
| Impact | Pilot metrics and monthly reach chart |
| Settings | Language, text size, high contrast, profile, offline mode, reset |
| More | Profile summary and links to all secondary screens |

Five languages: **English, Kannada, Hindi, Telugu, Tamil**. All UI keys have complete dictionaries; local data uses English fallback where a translation is not available.

## Tech

- React 18 + Vite 5
- React Router 6 (`HashRouter`, so the built app works from any static path)
- Plain CSS with design tokens, large-text and high-contrast modes
- Responsive layout: mobile-first phone shell; at 1000px+ it becomes a desktop layout with a sidebar and wider content
- `lucide-react` icons, hand-written SVG/CSS charts
- `localStorage` for language, profile, settings, tasks, alerts and scan history
- Service worker app-shell cache; installable PWA with local manifest and SVG icon
- No Tailwind, UI kits, chart libraries, CDNs or network requests

## Demo rules

The demo is intentionally consistent across screens:

- Heavy rain in **2 days** (85% chance), soil moisture **62%**
- Therefore: skip irrigation, do not spray, apply fertilizer after rain
- Tomato at Kolar mandi is **₹1,850/quintal**, up 6.4%; hold 3 days, alert at ₹2,000
- Demo farmer is eligible for 4 of the 5 schemes
- Leaf scan is simulated (2.5 s) from sample images; no image leaves the device

## Checks

```bash
npm run check:i18n   # every t() key exists; all 5 dictionaries complete; placeholders match
npm run check:lines  # every file under src/ is under 250 lines
npm run build
```

## Project layout

```
src/
  components/   shell + reusable UI
  context/      AppContext (all demo state)
  data/         crops, weather, prices, diseases, schemes, soil, alerts, contacts, impact
  hooks/        localStorage, online status, speech
  i18n/         en, hi, kn, te, ta + helpers
  pages/        one page per screen
  services/     dates, advice, assistant, eligibility
  styles/       theme tokens + shared global/element/utility CSS
public/         manifest, icon, service worker
scripts/        i18n and line-count checks
```

KrishiMitra is a hackathon demo. Scheme rules, prices, weather and diagnoses are illustrative; verify decisions with local officials before acting.
