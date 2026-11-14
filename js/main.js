(function () {
  "use strict";
  const $ = id => document.getElementById(id);

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  /* ---------- Hero slider (home page) ---------- */
  const slides = document.querySelectorAll(".slide");
  const dotsWrap = document.querySelector(".dots");
  if (slides.length && dotsWrap) {
    let current = 0, timer;
    slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.setAttribute("aria-label", "Slide " + (i + 1));
      d.addEventListener("click", () => { go(i); restart(); });
      dotsWrap.appendChild(d);
    });
    const dots = dotsWrap.querySelectorAll("button");
    const go = i => {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = (i + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    };
    const restart = () => { clearInterval(timer); timer = setInterval(() => go(current + 1), 6000); };
    document.querySelector(".slider-btn.prev").addEventListener("click", () => { go(current - 1); restart(); });
    document.querySelector(".slider-btn.next").addEventListener("click", () => { go(current + 1); restart(); });
    dots[0].classList.add("active");
    restart();
  }

  /* ---------- Open / closed status (India time) ---------- */
  const statusEl = $("templeStatus");
  if (statusEl) {
    const updateStatus = () => {
      const ist = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const mins = ist.getHours() * 60 + ist.getMinutes();
      const open = (mins >= 390 && mins < 630) || (mins >= 1080 && mins < 1200);
      statusEl.textContent = open ? "● Temple is open now" : "● Temple is closed now";
      statusEl.className = "status " + (open ? "open" : "closed");
    };
    updateStatus();
    setInterval(updateStatus, 60000);
  }

  /* ---------- Years & Varshikotsavam number ---------- */
  const now = new Date();
  const thisYear = now.getFullYear();
  const ordinal = n => { const s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
  if ($("year")) $("year").textContent = thisYear;
  if ($("yearsCount")) {
    // Prathishta was 27 January; completed years change on that date.
    const passedAnniv = now >= new Date(thisYear, 0, 27);
    $("yearsCount").textContent = thisYear - PRATHISHTA_YEAR - (passedAnniv ? 0 : 1);
  }
  if ($("utsavamCount")) {
    // Bhishma Ekadasi falls in Jan/Feb, so from March onward the next utsavam is next year.
    const nextUtsavYear = now.getMonth() >= 2 ? thisYear + 1 : thisYear;
    $("utsavamCount").textContent = ordinal(nextUtsavYear - PRATHISHTA_YEAR);
  }

  /* ---------- Upcoming events ---------- */
  const list = $("eventList");
  if (list) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const upcoming = EVENTS
      .map(e => {
        const [y, m, d] = e.date.split("-").map(Number);
        return { ...e, y, m, d, when: new Date(y, m - 1, d || 28) };
      })
      .filter(e => e.when >= today)
      .sort((a, b) => a.when - b.when);

    if (!upcoming.length) {
      list.innerHTML = '<li class="event-empty">Event dates will be announced soon.</li>';
    }
    upcoming.forEach(e => {
      const li = document.createElement("li");
      li.innerHTML =
        `<div class="event-date"><strong>${e.d ? e.d : "TBA"}</strong><span>${months[e.m - 1]} ${e.y}</span></div>
         <div><h4>${e.title}</h4><p>${e.subtitle}</p></div>`;
      list.appendChild(li);
    });
  }

  /* ---------- Updates ---------- */
  const ug = $("updatesGrid");
  if (ug) {
    UPDATES.forEach(u => {
      const card = document.createElement("article");
      card.className = "update-card";
      card.innerHTML =
        `<div class="update-card__img placeholder"><img src="${u.image}" alt="" onload="this.parentElement.classList.remove('placeholder')" onerror="this.remove()" /></div>
         <div class="update-card__body"><span class="update-card__date">${u.date}</span><h3>${u.title}</h3><p>${u.text}</p></div>`;
      ug.appendChild(card);
    });
  }

})();

/* ---------- Copy buttons (bank details) ---------- */
document.querySelectorAll("[data-copy]").forEach(btn => {
  btn.addEventListener("click", async () => {
    const text = btn.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (_) {}
      ta.remove();
    }
    const old = btn.textContent;
    btn.textContent = "Copied ✓"; btn.classList.add("done");
    setTimeout(() => { btn.textContent = old; btn.classList.remove("done"); }, 1800);
  });
});
