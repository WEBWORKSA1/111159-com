/* 111159.com — site configuration. Edit values here; no other file needs changing. */
window.SITE = {
  name: "111159",
  baseUrl: "https://111159.com",
  tagline: "Want it all, for good.",
  // Contact inbox (encoded; decoded at runtime only — never write it in plain text anywhere)
  _k: 17,
  _e: [102,116,115,102,126,99,122,98,112,32,81,118,124,112,120,125,63,114,126,124],
  // Optional: after activating FormSubmit, paste the random alias it gives you here for extra privacy
  formAlias: "",
  // Google AdSense publisher ID, e.g. "ca-pub-1234567890123456" (leave "" until approved)
  adsenseClient: "",
  // Google Analytics 4 ID, e.g. "G-XXXXXXX"
  ga4Id: "",
  // Donation / support links (leave "" to route supporters to the pledge form)
  donate: {
    buymeacoffee: "",   // e.g. "https://buymeacoffee.com/yourname"
    kofi: "",           // e.g. "https://ko-fi.com/yourname"
    paypalme: "",       // e.g. "https://paypal.me/yourname"
    githubSponsors: "", // e.g. "https://github.com/sponsors/WEBWORKSA1"
    stripeLink: ""      // e.g. Stripe Payment Link
  },
  social: {
    youtube: "https://www.youtube.com/results?search_query=singles+day+11.11",
    x: "", instagram: "", tiktok: "", telegram: "", whatsapp: ""
  },
  contactPortal: "https://web.works/contact"
};
/* Apply saved theme before paint (avoids flash) */
try { var _t = localStorage.getItem("theme"); if (_t) document.documentElement.setAttribute("data-theme", _t); } catch (e) {}
