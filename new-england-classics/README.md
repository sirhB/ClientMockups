# New England Classics — website redesign demo
Client: The New England Classic Car Company · 1483 Stratford Ave, Stratford, CT 06615 · 203-377-6746 · newenglandclassics.com

Live: https://sirhb.github.io/ClientMockups/new-england-classics/

- 5 themes (Noir Cinema, Pit Lane, White Cube, Still Frame, The Catalogue) with switcher; `?theme=` deep links; choice saved in localStorage (`nec-theme`).
- Pages: home, inventory (73 priced cars for sale, make filter), car detail, contact/services (11 real services + enquiry form), `pay/` invoice page.
- All photos/logo self-hosted in `assets/img/` (scraped from their site).
- Payments: `assets/js/config.js` — disabled, `pk_test_REPLACE_ME` only. `data/invoices.json` is fictional demo data.
- `crm-mockups/`: 16 Dealer Desk CRM screens (real inventory, fictional DEMO customers) + contact sheet. Regenerate: `python3 crm_nec.py && python3 render_necrm.py`.
- `pitch/`: pricing sheet (html/pdf/png) and walk-in phone wallpaper.
- `mockups/`: desktop and mobile contact sheets of all themes × pages.
