# The Classic Car Gallery: website redesign mockup

Client: The Classic Car Gallery, 2316 Fairfield Avenue, Black Rock, CT 06605 · 203-256-9800 · current site: https://www.classiccargallery.com/

This is a static redesign prototype built with plain HTML, CSS and vanilla JS. It has no build step and no dependencies. It contains **4 pages** in **5 design directions**, and a floating theme switcher lets you move between them.

| Page | File |
|---|---|
| Home | `index.html` |
| Inventory | `inventory.html` |
| Vehicle detail | `detail.html` |
| Contact & services | `contact.html` |

## Design directions (themes)
1. **Noir Cinema** (`01-noir-cinema`): dark letterboxed hero, Bodoni display type, a "Now Showing" car strip.
2. **Pit Lane** (`02-pit-lane`): motorsport look with a diagonal split hero, italic condensed type and a numbered starting grid.
3. **White Cube** (`03-white-cube`): art-gallery whitespace, museum-style captions, a staggered collection wall.
4. **Still Frame** (`04-still-frame`): video-still heroes, chapter thumbnails, inventory shown as "episodes".
5. **The Catalogue** (`05-the-catalogue`): auction-catalogue style with numbered lots and an index of lots.

## Theme switcher
- Use the floating **◐ Theme** button at the bottom right of every page.
- Your choice is saved in `localStorage` (`ccg-theme`), so it carries over across pages and visits.
- You can deep-link a theme with `?theme=<id>`, e.g. `index.html?theme=02-pit-lane`.

## Structure
```
assets/css/<theme>--<page>.css   one stylesheet per theme and page; only the active one is enabled
assets/css/responsive.css        tablet/mobile rules and switcher UI
assets/js/theme-switcher.js      switcher, persistence, nav/card linking
mockups/                         approved design comps (PNG, 1440px) + contact sheet
```

## View locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder.

## Notes
- Copy, prices, specs and photos are the client's own, taken from classiccargallery.com on Oct 14, 2026. Photos are hotlinked from the client's server.
- These are **design proposals** and not real yet: the contact/appointment forms, inventory filters, the Catalogue's "condition report" button, and decorative labels such as Lot numbers and video timecodes.
- Inventory is a static snapshot. A production build should pull it from the client's inventory data.
- Mobile/tablet layouts are a responsive adaptation. The comps were designed at 1440px.
