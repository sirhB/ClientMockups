# DESIGN.md — Ride Hys app redesign concept ("Midnight Dispatch")

Schema: impeccable/design.md. Written from the built demo
(`mockups/ride-hys-app/index.html`, single self-contained file, no
external assets). A new world, not a reskin of any earlier demo: the
mechanism is a live booking, not a transformation or a ledger, so the
palette, type, and signature interaction are its own.

## World

The page is the dispatcher's board at night, and the phone is the car:
warm black, champagne brass, cream paper around it. The app should
feel like the car — black, quiet, on time. Hairline rules instead of
nested cards; one brass rule under the wordmark; the map is a drawn
street diagram (Island Ln, Boston Post Rd, Saw Mill Rd), not a stock
tile. Every fare carries a "sample fare" note; every demo person is
labeled a sample profile.

## Color (hex as built; all tinted, no pure black/white)

- Page paper (warm cream): `#f6f1e7`; paper-2 `#efe8d2`; card `#fffdf6`.
- Ink: `#171512`; ink-2 `#3d3831`; muted (AA on paper): `#6d6558`.
- Brass (accent): `#a8842c`; brass dark (text on light, AA): `#7d6118`;
  brass light (accents + text on dark): `#d9b36a`.
- Phone ink: `#131110`; phone-2 `#1c1916`; phone-3 `#26211c`;
  phone line `#2c2822`.
- Phone cream text: `#ede6d6`; phone secondary: `#b9b0a0`.
- Success green: `#3f7d5a`. Error: `#a02318`.

Detector note: the near-black phone with a gold accent trips the
generic "near-black + one accent" warning. It is deliberate, not a
default: it comes from the subject's own world (black cars, brass
details, a 1951 heritage brand), and the brass is muted champagne,
never neon; the page around the phone is cream, so the dark is a
device, not the whole surface.

## Type

- Display / wordmark: **Georgia serif** 700 — the 1951 heritage voice.
  Page headline `clamp(44px, 5.4vw, 72px)`; phone greeting 28px.
- UI/body: system sans stack (`-apple-system, Segoe UI, Roboto…`) —
  the honest face for an iOS app prototype; tabular figures for every
  fare and time. Small caps letter-spaced labels for field names and
  section titles. No external fonts; nothing to load.

## Signature interaction: the live trip

Confirm a booking and the chauffeur drives the drawn route: the car
marker travels the SVG path (JS `getPointAtLength`, 20s), the timeline
advances with it (Confirmed → En route → Arriving → On trip), and the
ETA counts down. "Replay route" restarts it; "Complete trip (demo)"
lands on Trips with a receipt. One authored moment, not scattered
effects. The dispatch map carries the same idea at fleet scale: three
cars loop their routes while the board updates underneath.

## Components

- **Book**: Now/Schedule segmented control (schedule reveals date +
  time, default tomorrow 09:00), pickup/drop-off fields, airport chips
  (JFK LGA EWR HPN BDL) that fill the drop-off, a selected-car row
  with fare, and an upcoming-trip card.
- **Cars**: all seven real Hy's classes with seats, bags, ETA, and a
  sample fare; selection updates the book screen, the review, and the
  upcoming trip.
- **Review**: route, vehicle, guests/bags, total — fare before confirm,
  "No surge pricing" stated plainly.
- **Live**: drawn map, chauffeur card (sample profile), timeline,
  call (real number `tel:+12039346331`) and replay controls.
- **Trips**: upcoming + past trips with receipts; a completed demo
  trip appears with a receipt banner.
- **Account**: sample profile, payment, home/work, support rows with
  the real phone (800-255-LIMO) and email (Reserve@hyslimo.com), and
  the four CT offices.
- **Driver app** (same phone, Rider/Driver switch above it):
  online/offline switch, today stats (trips, earnings, rating),
  next assignment card, incoming-request screen with a 20-second
  countdown and Accept/Decline, active-trip screen with a 3-step
  nav list (arrived → on board → drop-off) that advances the trip
  and the dispatch board, today's trips, and an earnings screen with
  a Friday payout line.
- **Control Center**: browser-framed dispatch board on a light
  ground — KPI strip (active trips, chauffeurs online, avg pickup,
  on-time %), a wide drawn fleet map with three cars looping their
  routes, an active-trips board with status filters and a dark trip
  detail panel (message / reassign / call rider), an incoming
  bookings queue with one-tap Assign, and the chauffeurs-on-shift
  list. The board, the queue, and the driver app share one demo
  state: a rider booking lands in the queue, accepting it moves it
  to the board, completing it updates the driver's earnings.
- **Page frame**: pitch headline, 3-step "try the flow", screen-jump
  buttons that drive the phone, trust strip (their own promises), a
  seven-cell fleet grid, and a Today-vs-Concept comparison.

## Motion (design-motion-principles; primary Jakub, secondary Emil, Jhey selective)

- Mobile-app weighting: Jakub primary, Emil secondary; the live route
  is the one Jhey-adjacent moment.
- Screen changes: 260ms ease-out, opacity + 8px rise + blur clearing.
  Tab bar: instant state change (frequent action, no animation).
- Button press: scale .97. Nothing animates on scroll; no stagger,
  no pulses, no hover-scale. transform/opacity/filter only.
- `prefers-reduced-motion`: all durations collapse, the car sits at
  the destination, every interaction still works instantly.

## Honesty rules

- Real company facts only (see PRODUCT.md): founded 1951, West Haven
  HQ, fleet classes, airports, phones, email, taglines, and the
  current app's 2.0★ (8 ratings) from the App Store.
- Chauffeur and rider names, fares, trips, times, plate, dispatch
  board rows, chauffeur roster and statuses, KPIs, and earnings are
  sample data, labeled in PRODUCT.md and the page footer; fares also
  carry a "Sample fares" note inside the phone.
- "Redesign concept — not affiliated with Hy's" note on the page.
- Nothing submits anywhere; no booking is made; no payment is taken.

## Finish review verdict

- Playwright (chromium headless shell) verified: full booking flow
  (Book → Cars → Review → Confirm → Live → Complete → Trips receipt),
  car selection cascading to review/upcoming/receipt, car marker
  moving along the route, schedule toggle, airport chips filling the
  drop-off, account screen, 0 JS console/page errors; 1440px + 390px
  widths, no mobile overflow (one 18px overflow found and fixed:
  grid children needed `min-width:0` and the phone `width:100%`
  under 560px).
- Visual check: desktop hero, live map, and mobile hero screenshots
  reviewed in `shots/`; two nits fixed after looking (car-row fare
  wrap, chauffeur card wrap).
- Impeccable detector: final run 3 findings, all deliberate and
  documented (cream palette — paper ground vs black phone; map
  full-bleed; em-dash advisory). Two real findings fixed at finish:
  hero eyebrow removed, skipped heading levels fixed.
- **v2 (2026-11-16): driver app + control center.** Playwright
  suite 2 (28 checks): rider booking lands in the dispatch queue;
  driver mode switch, online toggle, request countdown, accept
  moving the booking to the board as En route, trip steps advancing
  the board status, completion updating earnings ($412 → $557) and
  clearing the board; dispatch filters, trip detail, one-tap Assign,
  fleet-map cars moving; 0 console errors; no overflow at 390px.
  One real bug found and fixed: `[hidden]` was overridden by
  `.tabbar{display:flex}` and `.field-row{display:flex}`, so the
  schedule row and the inactive tab bar were visible on load — fixed
  with a global `[hidden]{display:none !important}` rule. Detector
  re-run: only the deliberate findings (cream palette, two full-bleed
  maps). Screenshots: `shots/desktop-driver.png`,
  `shots/desktop-control.png`, `shots/mobile-control.png`.
