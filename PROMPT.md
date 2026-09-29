# Phase-wise Build Prompt: 111159.com

Copy each phase into your AI builder in order. Every phase inherits the **Global Rules**.

---

## GLOBAL RULES (paste before every phase)

You are building **111159.com**, "the global 11.11 Deals, Countdown & China-Sourcing Hub". Tagline: *"Want it all, for good."* (111159 read as 要要要要·我久).

**Stack and hosting**
- The stack is static HTML5, CSS and vanilla JS only: no build step, no server, no paid services.
- It must run on the **GitHub Pages free plan**.
- All paths are relative. Include `.nojekyll`.

**Required on every page**
- Line 1 of `<body>` is a full-width top bar reading **"Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership"**, linked to `https://web.works/contact` (new tab).
- A shared header and footer are injected from `assets/js/site.js`, with a `<noscript>` fallback.
- A light/dark theme via CSS tokens.
- Mobile-first design that works from 320px up.
- WCAG AA contrast and visible focus states.

**Email handling**
- The only contact email is stored encoded in `assets/js/config.js` and assembled at runtime.
- The address must never appear in HTML, visible text, `mailto:` markup, the README or any commit.
- All forms POST via AJAX to `formsubmit.co/ajax/<decoded>`. If that fails, fall back to a runtime-built `mailto:` link.
- Every form has a honeypot field.

**Trademarks and legal**
- Never brand with "Double 11", "双11", "双十一", Tmall, Alibaba or any platform logo. "Singles' Day" and "11.11" are descriptive only.
- Every page links `disclosure.html`, which holds the trademark, copyright and affiliate disclosures.

**Monetization and SEO**
- AdSense slots are fixed-height `.ad-slot` containers that load only when `config.adsenseClient` is set. Until then they show a house ad pointing to `advertise.html`.
- Each page gets a unique `<title>` and meta description, Open Graph tags, a canonical of `https://111159.com/<page>`, and JSON-LD where relevant.

---

## PHASE 1: Foundation & brand system
1. **Design tokens:** festival red `#E0162B`, gold `#F5B301`, ink `#12131A`, paper `#FFF8F1`, green `#12A150` for price drops. Include a dark palette.
2. **Typography:** Inter for UI, Noto Serif SC for 汉字 accents. Big tabular numerals for prices and countdowns.
3. **Components:** buttons (primary, gold, ghost), cards, badges (Hot, Staff Pick, Sponsored, Expired), tabs, accordion, stepper, toast, modal, sticky mobile CTA, ad slot, lite-YouTube facade.
4. **`config.js`:** siteName, baseUrl, encoded email, adsenseClient, ga4Id, donation links (Buy Me a Coffee, Ko-fi, PayPal.me, GitHub Sponsors), social and YouTube channel, and next 11.11 target (00:00 China Standard Time, UTC+8).
5. **`site.js`:** header and nav with a mobile drawer, footer, theme toggle, cookie consent, ad loader, form engine, toasts, exit-intent modal and the countdown engine.
6. **Static files:** `robots.txt`, `sitemap.xml`, `ads.txt` placeholder, `manifest.webmanifest`, SVG favicon and logo, `404.html`.

## PHASE 2: Traffic engine (home + evergreen content)
1. **Home:** hero with an animated "111159" digit ticker and a live countdown to the next 11.11 (local and Beijing time, and a "LIVE NOW" state from 11/11 to 11/12). Then, in order:
   - platform shortcut grid
   - "What 111159 means" teaser
   - a stats band with sourced GMV figures
   - trending guides
   - a video row
   - a sourcing lead-gen band
   - deal-alert signup
   - donate strip
   - sponsor slot
   - three ad slots
2. **`meaning.html`:** the number decoder. It covers the digit-by-digit homophones (1 要, 5 我, 9 久), the 1111 bare-branches story and a lucky/unlucky number table (0–9, 520, 1314, 88, 666, 168, 518, 250). Add an interactive decoder that turns any number into meanings and a "luck score".
3. **`singles-day.html`:** history from 1993 to today, a year-by-year timeline, a stats table with sources, how the modern multi-week campaign works (pre-sale, deposits, 满减 threshold coupons, live-stream), and a dates table for 2026–2030. Add Event JSON-LD.
4. **`guides.html`:**
   - Singles' Day shopping playbook
   - Coupon stacking (满减) explained
   - Customs and import duty basics (US, CA, UK, EU, AU, IN)
   - Scam and counterfeit checklist
   - Cross-border shipping times
   - FAQ with FAQPage schema

## PHASE 3: Revenue engine: lead generation (highest priority)
1. **`sourcing.html`:**
   - Hero: "Get free quotes from verified China suppliers in 24h".
   - A 4-step RFQ form with a progress bar:
     - (1) product, category, description, reference link
     - (2) quantity + unit, target price, customisation, certifications
     - (3) destination country, Incoterm (EXW/FOB/CIF/DDP), timeline, business stage
     - (4) name, business email, company, WhatsApp, consent checkbox
   - Starred required fields, inline hints, and a save-to-localStorage draft.
   - Trust strip, "how it works" in 4 steps, a services grid (sourcing, QC inspection, samples, shipping, Amazon FBA prep), FAQ, and a sticky mobile CTA.
2. **Second form, "Sell to the 11.11 shopper":** for brands wanting cross-border marketplace entry (brand, URL, markets, platforms, budget).
3. **Third form, "Become a partner sourcing agent":** the supply side that buys leads.
4. **Lead magnet:** an exit-intent "11.11 Deal Calendar + Sourcing Checklist" email capture.
5. **Scoring and routing:** every lead gets a hidden `lead_score` (budget × quantity × timeline) and a `_subject` tag.

## PHASE 4: Community, contests, donations, careers, advertising
1. **`deals.html`:** a directory of platform event hubs driven by `assets/data/deals.json`, with filters (platform, category, region), sort, a hot-vote (localStorage), an expired toggle, a "Submit a deal" form (URL, code, description, expiry) and keyword deal alerts.
2. **`contests.html`:**
   - The "11.11 Lucky Number Challenge" with an entry form, bonus entries (share, subscribe, refer, each carrying a referral code), a prize ladder funded by sponsors and supporters, a winners table and a timeline.
   - Official rules: no purchase necessary, eligibility, odds, and the Québec Régie note.
3. **`donate.html`:** preset amounts $1.11 / $11.11 / $111.11 / $1,111; one-time or monthly; buttons for the configured platforms; a pledge form fallback; a transparent allocation chart (operations, promotions, marketing, hiring, contest prizes); and supporter tiers.
4. **`advertise.html`:** a rate card (countdown "presented by", hero takeover, featured deal slot, category sponsor, newsletter, sponsored guide, contest sponsor, YouTube integration, lead packages), audience notes and an inquiry form.
5. **`careers.html`:** open roles (bilingual deals editor, sourcing partners, video creator, partnerships manager, community moderator, translators, writers) and an application form.

## PHASE 5: Tools, video & retention
1. **`tools.html`:**
   - Countdown with an embed snippet
   - Number decoder
   - 满减 coupon-stack calculator
   - Landed-cost / margin calculator
   - Live currency converter (open.er-api.com with a static fallback)
2. **`videos.html`:** a lite-YouTube gallery (Singles' Day, lucky numbers, sourcing) with category chips and a subscribe CTA. Iframes load only on click.
3. **Retention:** newsletter and deal alerts, add-to-home-screen manifest, share buttons.

## PHASE 6: Trust, legal, SEO, launch
1. **Legal and company pages:** `about.html`, `contact.html` (general form with topic selector), `privacy.html` (AdSense/cookies/GA4/FormSubmit), `terms.html` and `disclosure.html` (trademark, copyright, affiliate, sponsored-content and no-endorsement notices).
2. **Launch checks:**
   - Lighthouse ≥ 90 on every category.
   - Validate JSON-LD.
   - Confirm with grep that the email appears nowhere in the repo.
   - Test the forms, then click FormSubmit's one-time activation email.
3. **Deploy:** push to `WEBWORKSA1/111159-com`. In Settings → Pages set the source to `main` / root. Add a `CNAME` of `111159.com`, then set DNS A records to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, plus `www` CNAME → `webworksa1.github.io`. Enforce HTTPS.
4. **After launch:**
   - Apply to AdSense, then set `adsenseClient` and `ads.txt`.
   - Join the affiliate programmes and replace the `aff` params in `deals.json`.
   - Set the donation links.
   - Submit the sitemap to Search Console.

## PHASE 7: Scale (expansion roadmap)
- A 中文 / ES / FR / HI language layer (`/zh/`, `/es/` and so on) with hreflang tags.
- A weekly "Deal Radar" newsletter using Beehiiv's free tier.
- Additional events: 618, Black Friday, 12.12, Chinese New Year sales.
- A price-history widget, a paid supplier directory, and a Telegram/WhatsApp alert channel.
- A move to Astro or Eleventy once there are more than 50 pages, keeping the GitHub Pages deploy.
