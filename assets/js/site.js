/* 111159.com — site engine (vanilla JS, no dependencies) */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  function inbox() { return (S._e || []).map(function (c) { return String.fromCharCode(c ^ S._k); }).join(""); }
  function endpoint() { return "https://formsubmit.co/ajax/" + (S.formAlias || inbox()); }
  var page = (location.pathname.split("/").pop() || "index.html").replace(/\?.*$/, "");
  if (page === "") page = "index.html";

  /* ---------- Theme ---------- */
  var savedTheme = store.get("theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme");
    if (!cur) cur = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store.set("theme", next);
  }

  /* ---------- Layout: header + footer ---------- */
  var NAV = [
    ["index.html", "Home"], ["singles-day.html", "11.11 Guide"], ["deals.html", "Deals"],
    ["sourcing.html", "Sourcing"], ["meaning.html", "Number Meanings"], ["tools.html", "Tools"],
    ["videos.html", "Videos"], ["contests.html", "Contests"], ["guides.html", "Guides"]
  ];
  var LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#E0162B"/><rect x="12" y="14" width="5" height="36" rx="2" fill="#fff"/><rect x="21" y="14" width="5" height="36" rx="2" fill="#fff"/><rect x="30" y="14" width="5" height="36" rx="2" fill="#fff"/><rect x="39" y="14" width="5" height="36" rx="2" fill="#fff"/><circle cx="51" cy="44" r="6" fill="#F5B301"/></svg>';
  function buildHeader() {
    var h = $("#site-header"); if (!h) return;
    var links = NAV.map(function (n) {
      return '<a href="' + n[0] + '"' + (n[0] === page ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
    }).join("");
    h.className = "site-header";
    h.innerHTML = '<div class="container nav">' +
      '<a class="brand" href="index.html" aria-label="111159 home">' + LOGO + '<span>111159<small>11.11 Deals · Sourcing · Culture</small></span></a>' +
      '<nav class="nav-links" aria-label="Main">' + links + "</nav>" +
      '<div class="nav-cta"><a class="btn btn-primary btn-sm" href="sourcing.html">Get Supplier Quotes</a>' +
      '<a class="btn btn-gold btn-sm" href="donate.html">Support</a>' +
      '<button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode">🌓</button>' +
      '<button class="icon-btn burger" id="burger" aria-label="Open menu" aria-expanded="false">☰</button></div></div>' +
      '<div class="drawer" id="drawer">' + links +
      '<a href="sourcing.html">Get Supplier Quotes →</a><a href="donate.html">Support 111159 ♥</a><a href="advertise.html">Advertise</a><a href="careers.html">Careers</a><a href="contact.html">Contact</a></div>';
    $("#themeBtn").addEventListener("click", toggleTheme);
    var b = $("#burger"), d = $("#drawer");
    b.addEventListener("click", function () {
      var open = d.classList.toggle("open");
      b.setAttribute("aria-expanded", open); b.textContent = open ? "✕" : "☰";
    });
  }
  function buildFooter() {
    var f = $("#site-footer"); if (!f) return;
    f.className = "site-footer";
    f.innerHTML = '<div class="container"><div class="foot-grid">' +
      '<div><a class="brand" href="index.html" style="color:#fff!important">' + LOGO + '<span>111159</span></a>' +
      '<p style="margin-top:12px">The global 11.11 hub: Singles\' Day countdown, deal directory, China-sourcing quotes and the culture behind the numbers. <span class="zh">要要要要 · 我久</span>: want it all, for good.</p>' +
      '<form class="inline-form" data-form="Newsletter (footer)" novalidate><input type="email" name="email" placeholder="Your email for 11.11 alerts" required aria-label="Email"><button class="btn btn-gold btn-sm">Subscribe</button></form></div>' +
      '<div><h4>Explore</h4><ul><li><a href="singles-day.html">Singles\' Day Guide</a></li><li><a href="deals.html">Deal Directory</a></li><li><a href="meaning.html">Chinese Number Meanings</a></li><li><a href="tools.html">Calculators &amp; Tools</a></li><li><a href="videos.html">Videos</a></li><li><a href="guides.html">Buying Guides</a></li></ul></div>' +
      '<div><h4>Business</h4><ul><li><a href="sourcing.html">China Sourcing Quotes</a></li><li><a href="sourcing.html#brands">Sell to 11.11 Shoppers</a></li><li><a href="sourcing.html#agents">Become a Sourcing Partner</a></li><li><a href="advertise.html">Advertise / Sponsor</a></li><li><a href="contests.html">Contests &amp; Prizes</a></li><li><a href="careers.html">Careers</a></li></ul></div>' +
      '<div><h4>Company</h4><ul><li><a href="about.html">About</a></li><li><a href="donate.html">Support Us</a></li><li><a href="contact.html">Contact</a></li><li><a href="privacy.html">Privacy Policy</a></li><li><a href="terms.html">Terms of Use</a></li><li><a href="disclosure.html">Trademark &amp; Affiliate Disclosure</a></li></ul></div>' +
      "</div>" +
      '<div class="legal-line">© <span id="yr"></span> 111159.com. All rights reserved. Original content, design and code © 111159.com. ' +
      '"Singles\' Day" and "11.11" are used descriptively for the annual 11 November shopping event. All third-party names and trademarks (e.g., Alibaba, Tmall, AliExpress, JD.com, Temu, Amazon) belong to their respective owners; 111159.com is independent and not affiliated with, sponsored or endorsed by them. Some links are affiliate links: we may earn a commission at no extra cost to you. <a href="disclosure.html">Full disclosure</a>. ' +
      '<a href="' + (S.contactPortal || "https://web.works/contact") + '" target="_blank" rel="noopener">Interested in this website / domain / sponsorship / advertising / partnership?</a></div></div>';
    $("#yr").textContent = new Date().getFullYear();
  }

  /* ---------- Toast ---------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove("show"); }, 3800);
  }
  window.toast = toast;

  /* ---------- Hidden-email links ---------- */
  function mailLinks() {
    $$(".js-mail").forEach(function (a) {
      a.setAttribute("href", "#");
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var subj = a.getAttribute("data-subject") || "Inquiry via 111159.com";
        location.href = "mailto:" + inbox() + "?subject=" + encodeURIComponent(subj);
      });
    });
  }

  /* ---------- Forms ---------- */
  function fieldsValid(scope) {
    var ok = true;
    $$("input,select,textarea", scope).forEach(function (el) {
      if (el.closest(".hp")) return;
      if (!el.checkValidity()) { ok = false; el.setAttribute("aria-invalid", "true"); }
      else el.removeAttribute("aria-invalid");
    });
    if (!ok) { var bad = $("[aria-invalid=true]", scope); if (bad) { bad.focus(); if (bad.reportValidity) bad.reportValidity(); } }
    return ok;
  }
  function leadScore(data) {
    var s = 0, q = parseFloat(data.quantity) || 0, b = (data.budget || "") + (data.target_price || "");
    if (q >= 1000) s += 30; else if (q >= 300) s += 20; else if (q >= 50) s += 10;
    if (/10,?000|25,?000|50,?000|100k|\+/i.test(data.budget || "")) s += 30; else if (b) s += 10;
    if (/asap|1 month|urgent/i.test(data.timeline || "")) s += 20; else if (data.timeline) s += 10;
    if (/established|scaling|brand|wholesale/i.test(data.business_stage || "")) s += 20;
    return Math.min(100, s);
  }
  function mailtoFallback(name, data) {
    var body = Object.keys(data).filter(function (k) { return k.charAt(0) !== "_"; })
      .map(function (k) { return k + ": " + data[k]; }).join("\n");
    location.href = "mailto:" + inbox() + "?subject=" + encodeURIComponent("[111159] " + name) + "&body=" + encodeURIComponent(body);
  }
  function wireForm(form) {
    var name = form.getAttribute("data-form") || "Form";
    if (!$(".hp", form)) {
      var hp = document.createElement("div"); hp.className = "hp"; hp.setAttribute("aria-hidden", "true");
      hp.innerHTML = '<label>Leave empty<input type="text" name="_honey" tabindex="-1" autocomplete="off"></label>';
      form.appendChild(hp);
    }
    var status = $(".form-status", form);
    if (!status) { status = document.createElement("div"); status.className = "form-status"; status.setAttribute("aria-live", "polite"); form.appendChild(status); }
    // restore draft
    var draftKey = "draft:" + name;
    if (form.hasAttribute("data-draft")) {
      try { var d = JSON.parse(store.get(draftKey) || "{}"); Object.keys(d).forEach(function (k) { var el = form.elements[k]; if (el && el.type !== "checkbox" && !el.value) el.value = d[k]; }); } catch (e) {}
      form.addEventListener("input", function () {
        var o = {}; $$("input,select,textarea", form).forEach(function (el) { if (el.name && el.type !== "checkbox" && el.name.charAt(0) !== "_") o[el.name] = el.value; });
        store.set(draftKey, JSON.stringify(o));
      });
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msw = form.closest("[data-steps]");
      if (msw && msw._isLast && !msw._isLast()) { msw._next(); return; }
      if (!fieldsValid(form)) return;
      var fd = new FormData(form), data = {};
      fd.forEach(function (v, k) { data[k] = data[k] ? data[k] + ", " + v : v; });
      if (data._honey) return;
      delete data._honey;
      if (form.hasAttribute("data-score")) data.lead_score = leadScore(data) + "/100";
      data._subject = "[111159.com] " + name + (data.name ? " — " + data.name : "");
      data._template = "table"; data._captcha = "false";
      data.page = location.href; data.submitted_at = new Date().toISOString();
      var ref = store.get("ref"); if (ref) data.referred_by = ref;
      var btn = $("button[type=submit],button:not([type])", form);
      if (btn) { btn.disabled = true; btn._t = btn.textContent; btn.textContent = "Sending…"; }
      fetch(endpoint(), { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().then(function (j) { if (!r.ok || j.success === "false" || j.success === false) throw new Error(j.message || "fail"); return j; }); })
        .then(function () {
          status.className = "form-status ok";
          status.textContent = form.getAttribute("data-success") || "Thank you! We received your submission and will reply within 24 hours.";
          toast("✓ Sent successfully");
          form.reset(); store.set(draftKey, "{}");
          if (typeof gtag === "function") gtag("event", "generate_lead", { form_name: name });
          var ms = form.closest("[data-steps]"); if (ms && ms._go) ms._go(0);
        })
        .catch(function () {
          status.className = "form-status err";
          status.textContent = "Couldn't reach the form service. Opening your email app so you can send it directly…";
          setTimeout(function () { mailtoFallback(name, data); }, 900);
        })
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = btn._t; } });
    });
  }

  /* ---------- Multi-step forms ---------- */
  function wireSteps(wrap) {
    var steps = $$(".fstep", wrap), bar = $(".progress i", wrap), labels = $$(".step-labels span", wrap), i = 0;
    function go(n) {
      i = n; steps.forEach(function (s, k) { s.classList.toggle("on", k === i); });
      labels.forEach(function (l, k) { l.classList.toggle("on", k <= i); });
      if (bar) bar.style.width = ((i + 1) / steps.length * 100) + "%";
      $$("[data-prev]", wrap).forEach(function (b) { b.style.visibility = i === 0 ? "hidden" : "visible"; });
      var last = i === steps.length - 1;
      $$("[data-next]", wrap).forEach(function (b) { b.style.display = last ? "none" : ""; });
      $$("button[type=submit]", wrap).forEach(function (b) { b.style.display = last ? "" : "none"; });
    }
    wrap._go = go;
    wrap._isLast = function () { return i === steps.length - 1; };
    wrap._next = function () { if (fieldsValid(steps[i])) go(Math.min(i + 1, steps.length - 1)); };
    $$("[data-next]", wrap).forEach(function (b) { b.addEventListener("click", function () { if (fieldsValid(steps[i])) { go(Math.min(i + 1, steps.length - 1)); wrap.scrollIntoView({ behavior: "smooth", block: "start" }); } }); });
    $$("[data-prev]", wrap).forEach(function (b) { b.addEventListener("click", function () { go(Math.max(i - 1, 0)); }); });
    go(0);
  }

  /* ---------- Countdown (next 11.11 at 00:00 China Standard Time, UTC+8) ---------- */
  function nextSinglesDay(now) {
    var y = now.getUTCFullYear();
    var start = Date.UTC(y, 10, 10, 16, 0, 0); // 11 Nov 00:00 CST
    var end = start + 864e5;
    if (now.getTime() >= end) { start = Date.UTC(y + 1, 10, 10, 16, 0, 0); end = start + 864e5; }
    return { start: start, end: end, year: new Date(start + 8 * 3600e3).getUTCFullYear() };
  }
  window.nextSinglesDay = nextSinglesDay;
  function countdowns() {
    var els = $$("[data-countdown]"); if (!els.length) return;
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function tick() {
      var now = new Date(), t = nextSinglesDay(now), live = now.getTime() >= t.start;
      els.forEach(function (el) {
        var diff = live ? t.end - now.getTime() : t.start - now.getTime();
        var d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
        var set = function (k, v) { var x = $("[data-cd=" + k + "]", el); if (x) x.textContent = v; };
        set("d", d); set("h", pad(h)); set("m", pad(m)); set("s", pad(s));
        var st = $("[data-cd=state]", el);
        if (st) st.innerHTML = live ? '<span class="live-badge">11.11 IS LIVE: ends in</span>' : "Next 11.11 (" + t.year + ") starts in";
        var loc = $("[data-cd=local]", el);
        if (loc) loc.textContent = "Starts " + new Date(t.start).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short" }) + " your time · 00:00 Beijing time (UTC+8)";
      });
    }
    tick(); setInterval(tick, 1000);
  }

  /* ---------- Ads (AdSense or house ads) ---------- */
  var adsLoaded = false;
  function ads() {
    var slots = $$(".ad-slot"); if (!slots.length) return;
    if (S.adsenseClient) {
      if (!adsLoaded) {
        var sc = document.createElement("script"); sc.async = true; sc.crossOrigin = "anonymous";
        sc.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + S.adsenseClient;
        document.head.appendChild(sc); adsLoaded = true;
      }
      slots.forEach(function (s) {
        var inner = $(".ad-inner", s) || s;
        inner.innerHTML = '<ins class="adsbygoogle" style="display:block;width:100%" data-ad-client="' + S.adsenseClient + '"' +
          (s.dataset.slot ? ' data-ad-slot="' + s.dataset.slot + '"' : "") + ' data-ad-format="auto" data-full-width-responsive="true"></ins>';
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
      });
    } else {
      var houses = [
        ["Your brand here during 11.11 peak traffic", "Sponsor the countdown seen by every visitor.", "advertise.html", "See ad packages"],
        ["Need products made in China?", "Get free quotes from vetted suppliers in 24h.", "sourcing.html", "Get quotes"],
        ["Keep 111159 free & independent", "Support from $1.11 funds prizes, writers and tools.", "donate.html", "Support us"]
      ];
      slots.forEach(function (s, k) {
        var h = houses[k % houses.length], inner = $(".ad-inner", s) || s;
        inner.innerHTML = '<div class="house-ad"><div><strong>' + h[0] + '</strong><div class="muted">' + h[1] + '</div></div><a class="btn btn-primary btn-sm" href="' + h[2] + '">' + h[3] + "</a></div>";
      });
    }
  }

  /* ---------- Analytics + cookie consent ---------- */
  function analytics() {
    if (!S.ga4Id) return;
    var sc = document.createElement("script"); sc.async = true; sc.src = "https://www.googletagmanager.com/gtag/js?id=" + S.ga4Id; document.head.appendChild(sc);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", S.ga4Id, { anonymize_ip: true });
  }
  function cookies() {
    var c = store.get("consent");
    if (c === "all") analytics();
    if (c) return;
    var el = document.createElement("div"); el.className = "cookie show"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", "Cookie consent");
    el.innerHTML = '<strong>Cookies &amp; ads</strong><p class="muted" style="margin:.4em 0 0;font-size:.9rem">We use cookies for analytics and to show ads (including Google AdSense) that keep 111159 free. See our <a href="privacy.html">Privacy Policy</a>.</p>' +
      '<div class="row"><button class="btn btn-ghost btn-sm" data-c="essential">Essential only</button><button class="btn btn-primary btn-sm" data-c="all">Accept all</button></div>';
    document.body.appendChild(el);
    $$("[data-c]", el).forEach(function (b) { b.addEventListener("click", function () { store.set("consent", b.dataset.c); el.remove(); if (b.dataset.c === "all") analytics(); }); });
  }

  /* ---------- Lite YouTube ---------- */
  function videos() {
    $$(".yt[data-id]").forEach(function (v) {
      var id = v.dataset.id;
      v.innerHTML = '<img loading="lazy" alt="' + (v.dataset.title || "Video") + '" src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg"><button class="play" aria-label="Play video: ' + (v.dataset.title || "") + '">▶</button>';
      v.addEventListener("click", function () {
        v.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + (v.dataset.title || "YouTube video") + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      }, { once: true });
    });
  }

  /* ---------- Exit-intent lead magnet ---------- */
  function exitIntent() {
    if (!document.body.hasAttribute("data-exit")) return;
    try { if (sessionStorage.getItem("exitShown")) return; } catch (e) {}
    var m = document.createElement("div"); m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-label", "Free 11.11 deal calendar");
    m.innerHTML = '<div class="modal-box"><button class="modal-close" aria-label="Close">×</button><span class="eyebrow">Free download</span><h2 style="font-size:1.5rem">Get the 11.11 Deal Calendar + Sourcing Checklist</h2>' +
      '<p class="muted">Pre-sale dates, coupon-stacking cheat sheet and a 20-point supplier vetting checklist, sent to your inbox.</p>' +
      '<form data-form="Lead magnet: 11.11 calendar" data-success="Sent! Check your inbox in a few minutes." novalidate><div class="form-grid"><div class="full"><input name="name" placeholder="First name" aria-label="First name"></div><div class="full"><input type="email" name="email" required placeholder="Email address" aria-label="Email"></div>' +
      '<div class="full"><select name="interest" aria-label="Interest"><option>I shop 11.11 deals</option><option>I import / source products</option><option>I sell to Chinese / global shoppers</option></select></div></div>' +
      '<button class="btn btn-primary btn-block" style="margin-top:14px">Send me the free kit</button><p class="form-note">No spam. Unsubscribe anytime.</p></form></div>';
    document.body.appendChild(m); wireForm($("form", m));
    function show() { m.classList.add("show"); try { sessionStorage.setItem("exitShown", "1"); } catch (e) {} document.removeEventListener("mouseout", onOut); }
    function onOut(e) { if (!e.relatedTarget && e.clientY < 10) show(); }
    document.addEventListener("mouseout", onOut);
    setTimeout(function () { try { if (!sessionStorage.getItem("exitShown") && innerWidth < 760) show(); } catch (e) {} }, 45000);
    m.addEventListener("click", function (e) { if (e.target === m || e.target.classList.contains("modal-close")) m.classList.remove("show"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") m.classList.remove("show"); });
  }

  /* ---------- Copy + share ---------- */
  function copyShare() {
    $$("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var t = b.getAttribute("data-copy"); var src = t.charAt(0) === "#" ? $(t) : null; var txt = src ? src.textContent : t;
        (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { toast("Copied!"); }, function () { toast("Copy: " + txt.slice(0, 60)); });
      });
    });
    $$("[data-share]").forEach(function (b) {
      b.addEventListener("click", function () {
        var url = location.href, title = document.title, net = b.getAttribute("data-share");
        if (net === "native" && navigator.share) { navigator.share({ title: title, url: url }).catch(function () {}); return; }
        var map = {
          x: "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(title),
          facebook: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url),
          whatsapp: "https://wa.me/?text=" + encodeURIComponent(title + " " + url),
          linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url),
          telegram: "https://t.me/share/url?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(title)
        };
        if (map[net]) window.open(map[net], "_blank", "noopener,width=640,height=560"); else if (navigator.clipboard) { navigator.clipboard.writeText(url); toast("Link copied"); }
      });
    });
  }

  /* ---------- Referral capture (contests) ---------- */
  function referral() {
    var m = location.search.match(/[?&]ref=([A-Za-z0-9-]{3,20})/); if (m) store.set("ref", m[1]);
    var mine = store.get("myref"); if (!mine) { mine = "111-" + Math.random().toString(36).slice(2, 8).toUpperCase(); store.set("myref", mine); }
    $$("[data-myref]").forEach(function (el) {
      var link = location.origin + location.pathname + "?ref=" + mine;
      if (el.tagName === "INPUT") el.value = mine; else el.textContent = link;
    });
  }

  /* ---------- Number decoder ---------- */
  var DIG = {
    "0": ["líng", "零", "你 (you) · 灵 (spirit)", 0],
    "1": ["yī / yāo", "一 · 幺", "要 (want) · unity · first", 1],
    "2": ["èr", "二", "爱 (love, in 520) · 'good things come in pairs'", 2],
    "3": ["sān", "三", "生 (life, in 1314) · also 散 (scatter)", 0],
    "4": ["sì", "四", "sounds like 死 (death): avoided", -3],
    "5": ["wǔ", "五", "我 (I / me) · 无 (none) · five elements", 0],
    "6": ["liù", "六", "溜 (smooth, 'everything goes well') · 666 = awesome", 2],
    "7": ["qī", "七", "起 (rise) · 气 (energy) · also Ghost Month", 0],
    "8": ["bā", "八", "发 (prosper, get rich): the luckiest", 3],
    "9": ["jiǔ", "九", "久 (long-lasting, forever) · longevity", 2]
  };
  var COMBOS = [
    ["5201314", "我爱你一生一世: I love you for a lifetime"], ["1314", "一生一世: forever, one life one world"], ["520", "我爱你: I love you (20 May is Chinese Valentine's)"],
    ["1111", "光棍节 Singles' Day (11 Nov): four 'bare sticks'; world's biggest shopping festival"], ["1159", "要要我久 · also 11:59, one minute to midnight"],
    ["168", "一路发: prosperity all the way"], ["518", "我要发: I will prosper"], ["888", "发发发: triple prosperity"], ["666", "溜溜溜: awesome / slick"],
    ["999", "久久久: forever and ever"], ["88", "拜拜: bye-bye (also double fortune)"], ["59", "我久 / 我就: me forever · I'm in"],
    ["250", "二百五: fool (avoid!)"], ["748", "去死吧: rude (avoid!)"], ["14", "要死: bad omen"], ["51", "我要: I want"], ["521", "我愿意: I do / I'm willing"],
    ["1314520", "一生一世我爱你"], ["886", "拜拜了: bye now"], ["995", "救救我: help me (SOS)"], ["530", "我想你: I miss you"]
  ];
  function decodeNumber(str) {
    var s = String(str).replace(/\D/g, "").slice(0, 20); if (!s) return null;
    var digits = s.split("").map(function (d) { return { d: d, py: DIG[d][0], zh: DIG[d][1], mean: DIG[d][2], w: DIG[d][3] }; });
    var raw = digits.reduce(function (a, x) { return a + x.w; }, 0);
    var found = []; COMBOS.forEach(function (c) { if (c[1] && s.indexOf(c[0]) > -1 && found.indexOf(c) < 0) found.push(c); });
    found.forEach(function (c) { raw += /avoid|bad/.test(c[1]) ? -4 : 3; });
    var score = Math.max(1, Math.min(99, Math.round(55 + raw * 6 / Math.sqrt(s.length))));
    var phone = digits.map(function (x) { return x.d === "1" ? "yāo" : x.py.split(" ")[0]; }).join("-");
    return { s: s, digits: digits, combos: found, score: score, phone: phone };
  }
  window.decodeNumber = decodeNumber;
  function decoders() {
    $$("[data-decoder]").forEach(function (w) {
      var inp = $("input", w), out = $(".decoder-out", w), sum = $(".decoder-sum", w);
      function run() {
        var r = decodeNumber(inp.value); if (!r) { out.innerHTML = ""; sum.innerHTML = ""; return; }
        out.innerHTML = r.digits.map(function (x) { return '<div class="dchip"><b>' + x.d + '</b><span class="zh">' + x.zh + "</span> <small class=\"muted\">" + x.py + "</small><div style=\"font-size:.85rem\">" + x.mean + "</div></div>"; }).join("");
        sum.innerHTML = '<div class="result-box"><div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap"><div>Luck score<br><b>' + r.score + '/99</b></div><div>Spoken as<br><b style="font-size:1.1rem">' + r.phone + "</b></div></div>" +
          (r.combos.length ? '<div style="margin-top:10px">Patterns found:<ul style="margin:.4em 0 0;padding-left:18px">' + r.combos.map(function (c) { return "<li><b style=\"font-size:1rem\">" + c[0] + "</b> · " + c[1] + "</li>"; }).join("") + "</ul></div>" : '<div style="margin-top:10px;opacity:.8">No famous slang pattern; meanings come from individual digits.</div>') +
          '<div style="margin-top:8px;font-size:.78rem;opacity:.7">For fun & culture only; not fortune-telling advice.</div></div>';
      }
      inp.addEventListener("input", run); run();
    });
  }

  /* ---------- Calculators ---------- */
  function num(id) { var el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; }
  function money(v, c) { try { return new Intl.NumberFormat(undefined, { style: "currency", currency: c || "USD", maximumFractionDigits: 2 }).format(v); } catch (e) { return v.toFixed(2); } }
  function calcs() {
    var st = $("#stackCalc");
    if (st) {
      var f = function () {
        var price = num("sc-price"), disc = num("sc-disc"), th = num("sc-th"), off = num("sc-off"), cp = num("sc-coupon"), cb = num("sc-cb");
        var afterDisc = price * (1 - disc / 100);
        var times = th > 0 ? Math.floor(afterDisc / th) : 0; var mj = times * off;
        var fin = Math.max(0, afterDisc - mj - cp); var back = fin * cb / 100; var net = fin - back;
        var gap = th > 0 ? (th - (afterDisc % th)) : 0;
        $("#sc-out").innerHTML = "Pay at checkout: <b>" + money(fin) + "</b><br>After cashback: <b>" + money(net) + "</b><br>Total saved: <b>" + money(price - net) + "</b> (" + (price ? Math.round((price - net) / price * 100) : 0) + "%)" +
          (th > 0 && gap > 0 && gap < th ? '<div style="margin-top:8px;font-size:.9rem;opacity:.85">Tip: add ' + money(gap) + " more to unlock another " + money(off) + " off.</div>" : "");
      };
      $$("input", st).forEach(function (i) { i.addEventListener("input", f); }); f();
    }
    var lc = $("#landedCalc");
    if (lc) {
      var g = function () {
        var cur = ($("#lc-cur") || {}).value || "USD";
        var unit = num("lc-unit"), qty = Math.max(1, num("lc-qty")), ship = num("lc-ship"), duty = num("lc-duty"), tax = num("lc-tax"), fees = num("lc-fees"), retail = num("lc-retail");
        var goods = unit * qty, cif = goods + ship, dutyAmt = cif * duty / 100, taxAmt = (cif + dutyAmt) * tax / 100, total = cif + dutyAmt + taxAmt + fees, per = total / qty;
        var margin = retail > 0 ? (retail - per) / retail * 100 : 0;
        $("#lc-out").innerHTML = "Total landed cost: <b>" + money(total, cur) + "</b><br>Landed cost per unit: <b>" + money(per, cur) + "</b><br>Duty " + money(dutyAmt, cur) + " · Tax " + money(taxAmt, cur) +
          (retail > 0 ? "<br>Gross margin at " + money(retail, cur) + ": <b>" + margin.toFixed(1) + "%</b> (" + money(retail - per, cur) + "/unit)" : "");
      };
      $$("input,select", lc).forEach(function (i) { i.addEventListener("input", g); }); g();
    }
    var fx = $("#fxCalc");
    if (fx) {
      var rates = { USD: 1, CNY: 7.1, EUR: 0.86, GBP: 0.75, CAD: 1.38, AUD: 1.52, INR: 88, JPY: 148, SGD: 1.29, MYR: 4.2 }, live = false;
      var h = function () {
        var a = num("fx-amt"), from = $("#fx-from").value, to = $("#fx-to").value;
        var v = a / rates[from] * rates[to];
        $("#fx-out").innerHTML = "<b>" + money(v, to) + "</b><div style=\"font-size:.8rem;opacity:.75\">" + (live ? "Live mid-market rate (open.er-api.com)" : "Indicative offline rate; live rate loading…") + "</div>";
      };
      $$("input,select", fx).forEach(function (i) { i.addEventListener("input", h); });
      fetch("https://open.er-api.com/v6/latest/USD").then(function (r) { return r.json(); }).then(function (j) {
        if (j && j.rates) { Object.keys(rates).forEach(function (k) { if (j.rates[k]) rates[k] = j.rates[k]; }); live = true; h(); }
      }).catch(function () {});
      h();
    }
  }

  /* ---------- Donate page ---------- */
  function donate() {
    var wrap = $("#donateBox"); if (!wrap) return;
    var amt = "11.11", freq = "one-time";
    var D = S.donate || {};
    function sync() {
      $$(".amount", wrap).forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.amt === amt); });
      var o = $("#donAmtOut"); if (o) o.textContent = "$" + amt + (freq === "monthly" ? "/month" : "");
      var pf = $("#pledgeAmount"); if (pf) pf.value = amt + " USD " + freq;
    }
    $$(".amount", wrap).forEach(function (b) { b.addEventListener("click", function () { amt = b.dataset.amt; var c = $("#customAmt"); if (c) c.value = ""; sync(); }); });
    var c = $("#customAmt"); if (c) c.addEventListener("input", function () { if (c.value) { amt = parseFloat(c.value).toFixed(2); sync(); } });
    $$("[data-freq]", wrap).forEach(function (b) { b.addEventListener("click", function () { freq = b.dataset.freq; $$("[data-freq]", wrap).forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); sync(); }); });
    $$("[data-pay]", wrap).forEach(function (b) {
      var key = b.dataset.pay, url = D[key];
      if (!url) { b.title = "Not configured yet: opens pledge form"; }
      b.addEventListener("click", function () {
        var u = D[key];
        if (u) { if (key === "paypalme") u = u.replace(/\/$/, "") + "/" + amt + "USD"; window.open(u, "_blank", "noopener"); }
        else { toast("Online checkout is coming soon. Send a pledge and we'll reply with a secure payment link."); var p = $("#pledge"); if (p) p.scrollIntoView({ behavior: "smooth" }); }
      });
    });
    sync();
  }

  /* ---------- Deals directory ---------- */
  function deals() {
    var grid = $("#dealGrid"); if (!grid) return;
    var state = { platform: "all", cat: "all", q: "", sort: "hot", hideExpired: true }, data = [];
    var votes = {}; try { votes = JSON.parse(store.get("votes") || "{}"); } catch (e) {}
    function render() {
      var now = Date.now();
      var list = data.filter(function (d) {
        var exp = d.expires && new Date(d.expires).getTime() < now; d._exp = exp;
        if (state.hideExpired && exp) return false;
        if (state.platform !== "all" && d.platform !== state.platform) return false;
        if (state.cat !== "all" && d.category !== state.cat) return false;
        if (state.q && (d.title + " " + d.desc + " " + d.platform + " " + d.category).toLowerCase().indexOf(state.q) < 0) return false;
        return true;
      });
      list.sort(function (a, b) {
        if (state.sort === "new") return (b.added || "").localeCompare(a.added || "");
        if (state.sort === "az") return a.title.localeCompare(b.title);
        return (b.hot + (votes[b.id] ? 1 : 0)) - (a.hot + (votes[a.id] ? 1 : 0));
      });
      $("#dealCount").textContent = list.length + " listings";
      grid.innerHTML = list.map(function (d) {
        return '<article class="card hover deal' + (d._exp ? " expired" : "") + '"><div class="deal-top"><div class="logo" style="background:' + d.color + '">' + d.platform.charAt(0) + '</div><div class="tag-list">' +
          (d.badges || []).map(function (b) { return '<span class="badge ' + (b === "Hot" ? "hot" : b === "Staff Pick" ? "gold" : b === "Sponsored" ? "gray" : "green") + '">' + b + "</span>"; }).join("") + (d._exp ? '<span class="badge gray">Expired</span>' : "") + "</div></div>" +
          "<h3>" + d.title + '</h3><div class="meta">' + d.platform + " · " + d.category + " · " + d.region + "</div><p style=\"margin:0;font-size:.93rem\">" + d.desc + "</p>" +
          (d.code ? '<div>Code: <span class="code" data-copy="' + d.code + '" role="button" tabindex="0">' + d.code + "</span></div>" : "") +
          '<div class="foot"><button class="vote' + (votes[d.id] ? " on" : "") + '" data-vote="' + d.id + '" aria-label="Vote hot">🔥 ' + (d.hot + (votes[d.id] ? 1 : 0)) + "°</button>" +
          '<a class="btn btn-primary btn-sm" href="' + d.url + '" target="_blank" rel="nofollow sponsored noopener">Go to event →</a></div></article>';
      }).join("") || '<p class="muted">No listings match. Try another filter, or <a href="#submit">submit a deal</a>.</p>';
      $$("[data-vote]", grid).forEach(function (b) { b.addEventListener("click", function () { var id = b.dataset.vote; votes[id] = !votes[id]; store.set("votes", JSON.stringify(votes)); render(); }); });
      $$("[data-copy]", grid).forEach(function (b) { b.addEventListener("click", function () { if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy); toast("Code copied: " + b.dataset.copy); }); });
    }
    function chips(id, key, values) {
      var box = $(id); if (!box) return;
      box.innerHTML = ["all"].concat(values).map(function (v) { return '<button class="chip" aria-pressed="' + (state[key] === v) + '" data-v="' + v + '">' + (v === "all" ? "All" : v) + "</button>"; }).join("");
      $$(".chip", box).forEach(function (c) { c.addEventListener("click", function () { state[key] = c.dataset.v; $$(".chip", box).forEach(function (x) { x.setAttribute("aria-pressed", x === c); }); render(); }); });
    }
    fetch("assets/data/deals.json").then(function (r) { return r.json(); }).then(function (j) {
      data = j.deals || [];
      var uniq = function (k) { return data.map(function (d) { return d[k]; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(); };
      chips("#platformChips", "platform", uniq("platform")); chips("#catChips", "cat", uniq("category"));
      render();
    }).catch(function () { grid.innerHTML = '<p class="muted">Deal list could not load. Please refresh.</p>'; });
    var q = $("#dealSearch"); if (q) q.addEventListener("input", function () { state.q = q.value.toLowerCase().trim(); render(); });
    var so = $("#dealSort"); if (so) so.addEventListener("change", function () { state.sort = so.value; render(); });
    var he = $("#hideExpired"); if (he) he.addEventListener("change", function () { state.hideExpired = he.checked; render(); });
  }

  /* ---------- Video filter ---------- */
  function videoFilter() {
    var box = $("#vidChips"); if (!box) return;
    $$(".chip", box).forEach(function (c) {
      c.addEventListener("click", function () {
        $$(".chip", box).forEach(function (x) { x.setAttribute("aria-pressed", x === c); });
        var v = c.dataset.v; $$("[data-cat]").forEach(function (el) { el.style.display = v === "all" || el.dataset.cat === v ? "" : "none"; });
      });
    });
  }

  /* ---------- Sticky mobile CTA ---------- */
  function sticky() {
    var s = $(".sticky-cta"); if (s) document.body.classList.add("has-sticky");
  }

  /* ---------- Init ---------- */
  function init() {
    buildHeader(); buildFooter(); mailLinks();
    $$("form[data-form]").forEach(wireForm);
    $$("[data-steps]").forEach(wireSteps);
    countdowns(); ads(); if (page !== "embed.html") cookies(); videos(); exitIntent(); copyShare(); referral();
    decoders(); calcs(); donate(); deals(); videoFilter(); sticky();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
