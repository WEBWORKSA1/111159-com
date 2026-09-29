# 111159.com: the global 11.11 Deals, Countdown & China-Sourcing Hub

*"Want it all, for good."* (111159 → yāo-yāo-yāo-yāo-wǔ-jiǔ → 要要要要·我久)

This is a static, dependency-free website built for the **GitHub Pages free plan**.

- **Research and idea:** see [`RESEARCH.md`](RESEARCH.md).
- **Phase-wise build prompt:** see [`PROMPT.md`](PROMPT.md).

## Pages
| Page | Purpose |
|---|---|
| `index.html` | Hero, live 11.11 countdown, stats, tools, quick lead form, videos, donate strip |
| `sourcing.html` | **Lead generation**: 4-step RFQ, brand cross-border form, partner-agent signup |
| `deals.html` + `assets/data/deals.json` | Deal directory with filters, votes, submit-a-deal and alerts |
| `singles-day.html` | History, data, how the festival works, dates 2026–2030 |
| `meaning.html` | Chinese number meanings and interactive decoder |
| `tools.html` / `embed.html` | Countdown (embeddable), 满减 coupon stacker, landed cost, currency |
| `videos.html` | Lite-YouTube video hub |
| `guides.html` | Playbook, customs by country, shipping, scam checklist, FAQ |
| `contests.html` | Lucky Number Challenge with referrals and official rules |
| `donate.html` | Preset amounts, platforms, pledge form, allocation, tiers |
| `advertise.html` | Rate card and sponsorship inquiry |
| `careers.html` | Roles and application form |
| `about.html`, `contact.html`, `privacy.html`, `terms.html`, `disclosure.html`, `404.html` | Company and legal pages |

## Configure (one file: `assets/js/config.js`)
- `adsenseClient`: your AdSense ID (`ca-pub-…`). Ads load automatically; until it is set, house ads show instead. Also edit `ads.txt`.
- `ga4Id`: Google Analytics 4 (loads only after cookie consent).
- `donate.*`: Buy Me a Coffee, Ko-fi, PayPal.me, GitHub Sponsors and Stripe Payment Link. Any that are empty route to the pledge form.
- `social.youtube`: your channel URL.
- `formAlias`: optional FormSubmit alias (see below).

## Forms & the contact inbox
- The contact inbox is **never written in plain text** in this repo or on the site. It is stored encoded in `config.js` and decoded in the browser only when a form is sent or an "email us" link is clicked.
- All forms post to FormSubmit (free). If the service is unreachable, the site opens the visitor's email app with the form contents as a fallback.
- **One-time activation:** the first form submission triggers an activation email from FormSubmit to the inbox. Click **Activate** once. FormSubmit then shows a random alias string; paste it into `formAlias` for extra privacy.

## Deploy (GitHub Pages)
1. Go to Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
2. For the custom domain, add a file named `CNAME` containing `111159.com`. Then set DNS as follows:
   - `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` CNAME → `webworksa1.github.io`
3. Tick **Enforce HTTPS**.

## Editing deals
Edit `assets/data/deals.json`. Replace each `url` with your affiliate link. Badges can be `Hot`, `Staff Pick`, `Sponsored` or `New`.

## Legal
See `disclosure.html`. The site avoids "Double 11 / 双11 / 双十一" as branding and uses "Singles' Day" and "11.11" descriptively. All third-party marks belong to their owners.

© 111159.com
