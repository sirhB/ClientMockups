# Surface brief — Ride Hys app redesign concept

Mode: Operate (interactive app prototype in a phone frame, plus a
dispatch dashboard) with a Persuade frame around it (the pitch to
Hy's). The phone is the product; the control center is the pitch to
the people who run the fleet.

Audience: the owners / decision-makers at Hy's Limousine Worldwide
(West Haven, CT), reached by Chris. The visitor's job: see their own
company in a modern app, tap through a booking, switch to the driver
side, and see dispatch run the fleet — then say yes to a call.

## Direction contract

THESIS: The app should feel like the car: black, quiet, on time. The
category default — a generic white-label booking form with a stock photo
hero — is refused; the first viewport puts a real booking in the
visitor's hands (pickup, drop-off, car, fare) instead of claims about
the company.

OWN-WORLD: "Midnight Dispatch." Warm black ground, champagne brass as
the single accent, cream for the page around the phone. Serif wordmark
(HY'S, Georgia) for the 1951 heritage; system sans for everything the
thumb operates. Hairline rules instead of nested cards; one brass rule
under the wordmark; tabular figures for every fare and time. The map is
a drawn street diagram, not a stock tile.

STORY: The visitor taps Book, picks JFK as the drop-off, chooses the
Executive Sedan, sees the fare before confirming, and watches a
chauffeur arrive on the live map — the whole reason the current app
exists, working in under a minute. Then they flip the phone to the
Driver side, accept the same trip, and drive it step by step. Then
they scroll to the Control Center and see that trip on the board,
with the queue, the fleet map, and the chauffeurs on shift — one
system, three sides. Then the fleet tab shows all seven real vehicle
classes, and Trips shows the paper trail.

FIRST VIEWPORT: Cream page, headline "Your black car, booked like a
flight." left; the phone right, with a Rider / Driver switch above
it, open on Book: HY'S wordmark, "Since 1951", pickup / drop-off
fields, Now / Schedule, airport chips (JFK LGA EWR HPN BDL), a
fare-up-front car row, and the brass "See cars & fares" button. Below
the phone, a strip: No surge pricing · No cancelled rides ·
Professional chauffeurs · On-time pickups. The Control Center sits
further down the page as its own full-width section, not in the
first viewport.

FORM: Code-led build (app screens stay code-first per workspace
convention; Operate surface). No concept-seed roll: this is a build
under a fixed brief with a verified fact base, and the direction is
recorded here.
seed: none (unavailable).

FINISH: unreviewed and undocumented is unfinished; this build ends with
the finish review, the verdict, DESIGN.md, and every shipping raster
carrying its provenance.

## Motion (design-motion-principles: Jakub primary, Emil secondary, Jhey selective)

- Mobile app weighting: Jakub primary (production polish), Emil
  secondary (restraint, under 300ms), Jhey only for the one signature
  moment.
- Screen changes: 260ms ease-out, opacity + 8px rise, blur clearing.
  Tab bar: instant state change, no animation (frequent action).
- Signature interaction: the live-trip car travels the drawn route
  (JS-driven along the SVG path, ~12s loop), status timeline advances
  with it. One authored moment, not scattered effects. The dispatch
  map carries the same idea at fleet scale: three cars loop their
  routes while the board updates.
- Button press: scale .97. No scroll animation, no stagger, no pulses,
  no hover-scale. transform/opacity/filter only.
- `prefers-reduced-motion`: all durations collapse; the car sits at the
  destination; every interaction still works instantly.

## Honesty

- Real facts only for the company (see PRODUCT.md). Chauffeur and
  rider names, fares, trips, times, plate, dispatch board rows,
  chauffeur roster and statuses, KPIs, and earnings are sample data,
  labeled in PRODUCT.md and the page footer; fares carry a "Sample
  fares" note in the phone.
- "Redesign concept — not affiliated with Hy's" note on the page.
- Nothing submits anywhere; no booking is made; no payment is taken.
