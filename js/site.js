// AURELLE – small interactions (sliders, testimonials, FAQ, contact form)
(function () {
  // Before / after sliders
  document.querySelectorAll('[data-ba="range"]').forEach(function (r) {
    var box = r.parentElement;
    function update() {
      var v = r.value;
      box.querySelector('[data-ba="before"]').style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
      box.querySelector('[data-ba="line"]').style.left = v + '%';
      box.querySelector('[data-ba="handle"]').style.left = v + '%';
    }
    r.addEventListener('input', update);
  });

  // Testimonials
  var T = [
  {q:"From my very first consultation, Dr. Sharma took time to understand my skin. The results are subtle, natural and exactly what I hoped for.",n:"Ishita Bansal",i:"I"},
  {q:"Every step was explained and nothing was rushed. My skin feels healthier than it has in years.",n:"Ananya Mehra",i:"A"},
  {q:"Honest advice, no pressure and a plan that suited me. I finally feel confident without make-up.",n:"Kavya Malhotra",i:"K"}
  ];
  var t = 0, quote = document.querySelector('[data-t="quote"]');
  if (quote) {
    var dots = document.querySelectorAll('[data-dot]');
    function show(i) {
      t = (i + T.length) % T.length;
      quote.textContent = T[t].q;
      document.querySelector('[data-t="name"]').textContent = T[t].n;
      document.querySelector('[data-t="initial"]').textContent = T[t].i;
      dots.forEach(function (d, k) { d.style.background = k === t ? '#3A2A21' : '#CBB8A5'; });
    }
    document.querySelector('[data-t-prev]').addEventListener('click', function () { show(t - 1); });
    document.querySelector('[data-t-next]').addEventListener('click', function () { show(t + 1); });
    setInterval(function () { show(t + 1); }, 7000);
  }

  // FAQ accordion
  var faqs = document.querySelectorAll('[data-faq]');
  faqs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      faqs.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.hidden = true;
        b.querySelector('svg').style.transform = 'none';
      });
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling.hidden = false;
        btn.querySelector('svg').style.transform = 'rotate(180deg)';
      }
    });
  });

  // Treatment menu: filters + detail panel
  var TR = [{"cat": "skin", "name": "HydraFacial", "short": "Deep cleanse, gentle exfoliation and hydration infusion. Instant glow, no downtime.", "tag1": "1 SESSION", "tag2": "NO DOWNTIME", "desc": "A multi-step medical facial that cleanses, exfoliates, extracts and infuses hydrating serums in one sitting.", "who": "All skin types. Dull, dehydrated or congested skin, or a glow before an event.", "sessions": "1 session; monthly for maintenance.", "downtime": "None. You can wear make-up the same day.", "safety": "Pause retinoids 48 hours before. Not on active cold sores.", "expect": "Cleanse, gentle peel, painless extraction and serum infusion, finished with SPF.", "catLabel": "SKIN", "idx": "0", "page": "hydrafacial-gurugram.html"}, {"cat": "skin", "name": "Chemical Peels", "short": "Medical-grade peels for texture, glow and mild pigmentation. No heavy peeling.", "tag1": "4–6 SESSIONS", "tag2": "LIGHT FLAKING", "desc": "Doctor-selected peels matched to your skin type to refine texture, brighten and fade mild marks.", "who": "Uneven tone, mild pigmentation, open pores and dullness. Safe for Indian skin with the right peel.", "sessions": "4–6 sessions, 2–3 weeks apart.", "downtime": "Light flaking for 2–4 days.", "safety": "Daily sunscreen is essential. No waxing or scrubs for a week.", "expect": "Skin prep, peel applied for a few minutes and neutralised. Mild tingling only. Skin looks brighter within a week.", "catLabel": "SKIN", "idx": "1", "page": "chemical-peels-gurugram.html"}, {"cat": "skin", "name": "Acne & Scars", "short": "Medical and procedural plan for active acne, post-acne marks and pitted scars.", "tag1": "4–6 SESSIONS", "tag2": "LOW DOWNTIME", "desc": "A combined plan of prescription care, peels and resurfacing, built around your acne grade.", "who": "Active acne, red or dark post-acne marks and rolling or boxcar scars.", "sessions": "4–6 sessions, 3–4 weeks apart, plus home care.", "downtime": "Low. Mild redness for a day after procedures.", "safety": "Active breakouts are treated first before any scar procedure.", "expect": "A detailed assessment, a written home routine and in-clinic sessions. Most patients see clearer skin within 8–12 weeks.", "catLabel": "SKIN", "idx": "2", "page": "acne-scars-gurugram.html"}, {"cat": "skin", "name": "Pigmentation & Melasma", "short": "Melasma, sun spots and uneven tone. Combination peels, laser toning and home care.", "tag1": "3–5 SESSIONS", "tag2": "SUN PROTECTION CRITICAL", "desc": "A gentle, layered approach that fades pigment without triggering rebound darkening.", "who": "Melasma, sun spots, tanning and post-inflammatory pigmentation.", "sessions": "3–5 sessions, 3–4 weeks apart.", "downtime": "None to minimal.", "safety": "Strict daily sunscreen. Melasma is managed long-term, not cured.", "expect": "Peels or low-energy laser toning paired with a prescription routine. Tone evens gradually over 2–3 months.", "catLabel": "SKIN", "idx": "3", "page": "pigmentation-melasma-gurugram.html"}, {"cat": "anti", "name": "Anti-Wrinkle Injections", "short": "Softens frown lines, forehead lines and crow’s feet while keeping natural expression.", "tag1": "NO DOWNTIME", "tag2": "RESULTS 3–4 MONTHS", "desc": "Precise, low-dose injections that relax the muscles behind expression lines.", "who": "Adults with dynamic lines on the forehead, between the brows or around the eyes.", "sessions": "1 session; repeat every 3–4 months.", "downtime": "None. Avoid lying flat or exercise for 4 hours.", "safety": "Not during pregnancy or breastfeeding.", "expect": "Quick fine-needle injections. Results begin in 3–5 days and settle by 2 weeks.", "catLabel": "ANTI-AGEING", "idx": "4", "page": "anti-wrinkle-injections-gurugram.html"}, {"cat": "anti", "name": "Fillers & Skin Boosters", "short": "Restores lost volume and deep hydration. Subtle, never puffy.", "tag1": "HYALURONIC ACID", "tag2": "SUBTLE RESULTS", "desc": "Hyaluronic acid fillers and boosters for cheeks, lips, under-eyes and overall skin quality.", "who": "Volume loss, tired under-eyes, thin lips or dehydrated, crepey skin.", "sessions": "1 session; boosters as a course of 2–3.", "downtime": "Minor swelling or bruising for 1–2 days.", "safety": "Hyaluronic acid can be dissolved if ever needed.", "expect": "Numbing cream, careful placement with a fine cannula and an immediate, natural result.", "catLabel": "ANTI-AGEING", "idx": "5", "page": "fillers-skin-boosters-gurugram.html"}, {"cat": "anti", "name": "HIFU Lifting", "short": "Non-surgical lift for the jawline and lower face. Collagen builds over 2–3 months.", "tag1": "NO NEEDLES", "tag2": "ONCE A YEAR", "desc": "Focused ultrasound energy that tightens deeper layers of the skin without needles.", "who": "Early jowling, a softer jawline or loose skin under the chin.", "sessions": "1 session a year.", "downtime": "None. Mild tenderness for a few days.", "safety": "Not over metal implants or active acne in the area.", "expect": "A single session with mild warmth. Lift continues to improve for up to 3 months.", "catLabel": "ANTI-AGEING", "idx": "6", "page": "hifu-lifting-gurugram.html"}, {"cat": "laser", "name": "Laser Hair Reduction", "short": "Diode and Alexandrite with contact cooling. Suited to Indian skin types.", "tag1": "ALL SKIN TONES", "tag2": "6–8 SESSIONS", "desc": "Diode and Alexandrite lasers with contact cooling. Works on dark hair, not white or grey. Multiple sessions are needed because of the hair growth cycle.", "who": "Unwanted facial or body hair. All genders. Safe for skin types III–V with the right settings.", "sessions": "6–8 sessions, 5–6 weeks apart.", "downtime": "None. Mild redness for about an hour.", "safety": "No waxing or threading between sessions. Sunscreen needed.", "expect": "Shave before your visit. The laser is used with cooling on each area. Hair sheds in 10–14 days.", "catLabel": "LASER", "idx": "7", "page": "laser-hair-reduction-gurugram.html"}, {"cat": "laser", "name": "Skin Resurfacing", "short": "Fractional laser for scars, pores and texture. Controlled downtime, real improvement.", "tag1": "3–4 SESSIONS", "tag2": "2–4 DAYS DOWNTIME", "desc": "Fractional laser that creates micro-channels to rebuild collagen and smooth the skin’s surface.", "who": "Acne scars, enlarged pores, fine lines and rough texture.", "sessions": "3–4 sessions, 4–6 weeks apart.", "downtime": "2–4 days of redness and fine flaking.", "safety": "Avoid sun exposure for 2 weeks. Not on tanned skin.", "expect": "Numbing cream first, then a short laser pass. Smoother texture builds over each session.", "catLabel": "LASER", "idx": "8", "page": "skin-resurfacing-gurugram.html"}, {"cat": "hair", "name": "Hair Fall PRP", "short": "Your own platelet-rich plasma to strengthen thinning hair and reduce shedding.", "tag1": "4–6 SESSIONS", "tag2": "MONTHLY", "desc": "Growth factors from your own blood are injected into the scalp to support healthier hair growth.", "who": "Early thinning, a widening parting or excess shedding in men and women.", "sessions": "4–6 sessions, a month apart, then maintenance.", "downtime": "None. Avoid washing hair for 24 hours.", "safety": "Blood tests may be advised first to rule out other causes.", "expect": "A small blood draw, plasma prepared in minutes and fine scalp injections. Less shedding within 2–3 months.", "catLabel": "HAIR", "idx": "9", "page": "hair-fall-prp-gurugram.html"}, {"cat": "body", "name": "Body Contouring", "short": "Non-surgical fat reduction and skin tightening for stubborn areas.", "tag1": "6–8 SESSIONS", "tag2": "NO DOWNTIME", "desc": "Radiofrequency and ultrasound treatments to reduce stubborn fat and firm the skin.", "who": "Healthy adults near their goal weight with stubborn areas on the tummy, arms or thighs.", "sessions": "6–8 sessions, weekly.", "downtime": "None. Return to your day straight away.", "safety": "Not a weight-loss treatment. Not during pregnancy.", "expect": "A warm, relaxing session. Gradual contour change over 6–8 weeks.", "catLabel": "BODY", "idx": "10", "page": "body-contouring-gurugram.html"}];
  var chips = document.querySelectorAll('[data-filter]');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var k = c.getAttribute('data-filter');
      chips.forEach(function (o) {
        var on = o === c;
        o.setAttribute('aria-pressed', on);
        o.style.background = on ? '#3A2A21' : '#FFFCF8';
        o.style.color = on ? '#F7F0E8' : '#3A2A21';
        o.style.borderColor = on ? '#3A2A21' : '#DCCAB7';
      });
      document.querySelectorAll('[data-tr]').forEach(function (card) {
        card.hidden = !(k === 'all' || card.getAttribute('data-cat') === k);
      });
    });
  });
  var drawer = document.querySelector('[data-drawer]'), lastCard = null;
  function closeDrawer() { if (drawer) { drawer.hidden = true; document.body.style.overflow = ''; if (lastCard) lastCard.focus(); } }
  if (drawer) {
    document.querySelectorAll('[data-tr]').forEach(function (card) {
      card.addEventListener('click', function () {
        var t = TR[+card.getAttribute('data-tr')];
        drawer.querySelectorAll('[data-f]').forEach(function (el) { el.textContent = t[el.getAttribute('data-f')] || ''; });
        var pl = drawer.querySelector('[data-f-page]'); if (pl) pl.setAttribute('href', t.page);
        lastCard = card; drawer.hidden = false; document.body.style.overflow = 'hidden';
        drawer.querySelector('[data-close][aria-label="Close"]').focus();
      });
    });
    drawer.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', closeDrawer); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !drawer.hidden) closeDrawer(); });
  }

  // Results carousel
  var RS = [{"num": "01", "title": "Even, balanced tone", "text": "Pigmentation and melasma are treated gradually and gently, so the skin looks clearer without looking treated.", "img": "images/ba-pigmentation-after.jpg", "before": "images/ba-pigmentation-before.jpg", "bf": "none", "focus": "55% 42%", "alt": "Side profile of a woman with even-toned skin after pigmentation treatment"}, {"num": "02", "title": "Calmer, smoother skin", "text": "Breakouts and acne scars are treated in stages: first calming the skin, then refining texture over time.", "img": "images/ba-acne-after.jpg", "before": "images/ba-acne-before.jpg", "bf": "none", "focus": "60% 40%", "alt": "Woman by a window with calm, clear skin after acne treatment"}, {"num": "03", "title": "Radiance & skin quality", "text": "Our philosophy is to work with your features, not against them. A treatment plan should reflect your skin, your goals and your comfort.", "img": "images/hero-main.jpg", "before": "images/hero-main.jpg", "bf": "saturate(0.55) brightness(0.93) contrast(0.9)", "focus": "58% 35%", "alt": "Woman with luminous skin, looking over her shoulder"}, {"num": "04", "title": "Hydration & glow", "text": "Hydrating treatments restore bounce and light, for skin that simply looks well rested.", "img": "images/ba-hydration-after.jpg", "before": "images/ba-hydration-before.jpg", "bf": "none", "focus": "50% 50%", "alt": "Close-up of cheek showing hydrated, glowing skin after hydration treatment"}];
  var rp = document.querySelector('[data-r-prev]');
  if (rp) {
    var ri = 0;
    function showR(n) {
      ri = (n + RS.length) % RS.length; var c = RS[ri];
      document.querySelectorAll('[data-r-img]').forEach(function (im) { im.src = c.img; im.style.objectPosition = c.focus; im.alt = c.alt; });
      document.querySelectorAll('[data-r-before]').forEach(function (im) { im.src = c.before; im.style.objectPosition = c.focus; im.style.filter = c.bf; });
      document.querySelectorAll('[data-r]').forEach(function (el) { el.textContent = c[el.getAttribute('data-r')]; });
      document.querySelectorAll('[data-rdot]').forEach(function (d, k) { d.style.background = k === ri ? '#3A2A21' : '#CBB8A5'; });
      var r = document.querySelector('[data-ba="range"]'); if (r) { r.value = 50; r.dispatchEvent(new Event('input')); }
    }
    rp.addEventListener('click', function () { showR(ri - 1); });
    document.querySelector('[data-r-next]').addEventListener('click', function () { showR(ri + 1); });
  }

  // Contact form – shows a thank-you message.
  // To receive messages, set the form's action to your form service (e.g. Formspree / Hostinger form) and remove the preventDefault below.
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var wrap = document.querySelector('[data-form-wrap]'), sent = document.querySelector('[data-sent]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var lines = ['Hello Maison Beaumont, I would like to book a consultation.',
        'Name: ' + f.name.value, 'Phone: ' + f.phone.value,
        'Treatment: ' + f.treatment.value, 'Preferred time: ' + f.time.value];
      if (f.email.value) lines.push('Email: ' + f.email.value);
      if (f.message.value) lines.push('Note: ' + f.message.value);
      window.open('https://wa.me/19294187878?text=' + encodeURIComponent(lines.join('\n')), '_blank');
      wrap.hidden = true; sent.hidden = false; form.reset();
    });
    document.querySelector('[data-reset]').addEventListener('click', function () { sent.hidden = true; wrap.hidden = false; });
  }
})();
