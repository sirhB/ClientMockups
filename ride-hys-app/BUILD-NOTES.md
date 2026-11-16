# BUILD-NOTES.md — Ride Hys app redesign concept

Built 2026-11-16. Single self-contained file (`index.html`, no external
assets, no network calls). Playwright-verified end to end; screenshots
in `shots/`.

## What was verified (live sources, 2026-11-16)

- App Store (id 1031122532): Ride Hys, seller Livery Coach Solutions,
  LLC, v1.4.93, rating 2.0/5 from 8 ratings; "book travel anywhere
  globally".
- hyslimo.com: founded 1951; 100+ late-model vehicles; fleet classes
  (Executive Sedans, SUVs, Stretch, Super Stretch, Vans & Sprinters,
  Coaches, Limo Buses); 800-255-LIMO (5466), 203-934-6331;
  "Book travel anywhere in the world – without making a single phone
  call."
- Company profiles: HQ 480 Island Ln, West Haven, CT 06516; offices
  Greenwich, New Haven, Hartford; airports BDL, HPN, JFK, LGA, EWR,
  TEB; Reserve@hyslimo.com.
- Instagram (@hyslimo, 2026-10-08): "TRAVEL BETTER. ARRIVE
  CONFIDENTLY." / "SAME DESTINATION. A BETTER WAY TO GET THERE." /
  Professional Drivers, Premium Vehicles, On-Time Pickups, No Cancelled
  Rides, No Surge Pricing.

## Sample / placeholder (must be replaced with real data before any launch)

- All fares (Sedan $145, SUV $185, Stretch $295, Super Stretch $395,
  Sprinter $225, Limo Bus $425, Coach $495) — illustrative only.
- Chauffeur "Daniel M.", plate HYS·1951, vehicle year, profile
  "Alex Morgan", all trips and times.
- Seat/bag counts are plausible demo values per class, not Hy's
  published capacities.

## Verification

- Playwright (chromium headless shell, `/tmp/pwtest/test.js`): 19
  checks — full booking flow, car selection cascade, live-map car
  movement, schedule toggle, airport chips, receipt, account; 0 JS
  console/page errors; 1440px + 390px, no horizontal overflow.
- One overflow bug found and fixed (grid children `min-width:0`,
  phone `width:100%` under 560px). Two visual nits fixed after
  screenshot review (car-row fare wrap, chauffeur card wrap).
- Impeccable detector, final run: 3 findings, all deliberate —
  cream palette (paper ground vs black phone, documented in
  DESIGN.md), map full-bleed (a map is edge-to-edge by nature),
  em-dash advisory. Two real findings fixed: hero eyebrow removed
  (byline below the headline instead) and skipped heading levels
  (phone "Upcoming"/"Past"/offices are now styled labels, not h3s).

## Not done

- Not sent to Hy's, not pushed to the ClientMockups repo. No outreach
  script written for Hy's yet — note Hy's HAS a website and an app,
  so this is a redesign pitch, not a no-website-first prospect.
- No real quote/pricing integration; no real map tiles (drawn SVG maps).

## v2 — driver app + control center (2026-11-16)

- Rider/Driver switch above the phone. Driver side: online toggle,
  today stats, next assignment, incoming request with 20s countdown,
  accept/decline, 3-step active trip, today's trips, earnings with
  Friday payout.
- Control Center section: KPIs, live fleet map (3 cars looping
  routes), active-trips board with filters + detail panel
  (message/reassign/call), incoming queue with one-tap Assign,
  chauffeurs on shift, live clock.
- One shared demo state: rider confirm → queue HY-1049; driver
  accept → board En route; trip steps → board status; complete →
  earnings $412 → $557, board cleared.
- Verification: Playwright suite 2, 28 checks, all green, 0 console
  errors; detector re-run clean apart from deliberate findings.
  Bug fixed: `[hidden]` overridden by flex display rules (schedule
  row + inactive tab bar leaked visible) — global
  `[hidden]{display:none !important}`.
- Sample data added: 5 board trips (HY-1042–1046), 2 queued
  bookings (HY-1047–1048), 8 chauffeurs, KPIs (14 active, 32 online,
  6 min avg pickup, 98% on-time). All labeled sample in the footer.
