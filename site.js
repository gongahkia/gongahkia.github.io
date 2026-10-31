"use strict";

(() => {
  // keep the navbar separate from the page fade, including returns from a scrolled page.
  const headerStateKey = "gabriel-v11-header-hidden";
  window.addEventListener("pageswap", event => {
    if (!event.viewTransition) return;
    const header = document.querySelector(".site-nav");
    try {
      sessionStorage.setItem(headerStateKey, String(header.getBoundingClientRect().bottom <= 0));
    } catch (_) { /* the page transition still works when storage is disabled. */ }
  });
  window.addEventListener("pagereveal", event => {
    try {
      const hidden = sessionStorage.getItem(headerStateKey) === "true";
      sessionStorage.removeItem(headerStateKey);
      if (hidden) event.viewTransition?.types?.add("header-enter");
    } catch (_) { /* use the normal navbar transition when storage is disabled. */ }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const clickContainer = document.querySelector("#click-container");
    const clickWords = ["click", "clack", "thock", "thonk", "thup", "pop", "whump", "thud", "plip", "clonk", "snap", "tck", "tak", "bonk", "klak", "tik", "tock", "plink", "clunk", "thwack", "bop", "klik", "plonk", "tunk", "pok", "ping", "thwick", "blip", "clop", "klock", "thwump", "tnk"];
    let audioContext;
    let audioBuffer;
    let lastClickSound = -Infinity;

    function playClickSound() {
      const now = performance.now();
      if (now - lastClickSound < 80) return;
      lastClickSound = now;

      try {
        const AudioConstructor = window.AudioContext || window.webkitAudioContext;
        if (!AudioConstructor) return;
        audioContext ||= new AudioConstructor();
        if (audioContext.state === "suspended" || audioContext.state === "interrupted") {
          audioContext.resume().catch(() => {});
        }

        // Reuse v10's short, quiet synthesized click; no audio file needs loading.
        if (!audioBuffer || audioBuffer.sampleRate !== audioContext.sampleRate) {
          const length = Math.floor(audioContext.sampleRate * 0.006);
          audioBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
          const channel = audioBuffer.getChannelData(0);
          for (let index = 0; index < length; index += 1) {
            const progress = index / length;
            const sine = Math.sin(2 * Math.PI * 3400 * progress);
            const noise = Math.random() * 2 - 1;
            channel[index] = (sine * 0.6 + noise * 0.4) * (1 - progress) ** 3;
          }
        }

        const source = audioContext.createBufferSource();
        const gain = audioContext.createGain();
        source.buffer = audioBuffer;
        gain.gain.value = 0.08;
        source.connect(gain);
        gain.connect(audioContext.destination);
        source.onended = () => {
          source.disconnect();
          gain.disconnect();
        };
        source.start();
      } catch (_) { /* floating words still work when audio is unavailable. */ }
    }

    // A single click listener covers mouse clicks and completed touch taps,
    // without triggering on touch scrolling or playing twice for one tap.
    document.addEventListener("click", event => {
      if (!clickContainer || event.button !== 0 || event.detail === 0) return;
      playClickSound();
      const word = document.createElement("span");
      word.className = "click-animation";
      word.textContent = clickWords[Math.floor(Math.random() * clickWords.length)];
      word.style.left = `${event.clientX}px`;
      word.style.top = `${event.clientY}px`;
      word.style.setProperty("--click-drift", `${Math.round((Math.random() - 0.5) * 20)}px`);
      word.style.setProperty("--click-tilt", `${((Math.random() - 0.5) * 10).toFixed(2)}deg`);
      clickContainer.append(word);
      window.setTimeout(() => word.remove(), 1000);
    });

    for (const hand of document.querySelectorAll(".wave-hand")) {
      const glyph = hand.querySelector(".wave-hand-glyph");
      let hovered = false;
      let tapped = false;
      let waveTimer;
      const updateWaveSpeed = () => {
        const excited = hovered || tapped || hand.matches(":focus-visible");
        // Change speed in place so the hand never jumps back to the first frame.
        for (const animation of glyph.getAnimations()) {
          animation.updatePlaybackRate(excited ? 4.5 : 1);
        }
      };
      hand.addEventListener("pointerenter", event => {
        hovered = event.pointerType !== "touch";
        updateWaveSpeed();
      });
      hand.addEventListener("pointerleave", () => { hovered = false; updateWaveSpeed(); });
      hand.addEventListener("focus", updateWaveSpeed);
      hand.addEventListener("blur", updateWaveSpeed);
      hand.addEventListener("click", () => {
        window.clearTimeout(waveTimer);
        tapped = true;
        updateWaveSpeed();
        waveTimer = window.setTimeout(() => { tapped = false; updateWaveSpeed(); }, 1800);
      });
      window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", updateWaveSpeed);
    }

    if (document.body.hasAttribute("data-heading-anchors")) {
      // preserve existing fragment URLs without the floating TOC or progress UI.
      const usedIds = new Set([...document.querySelectorAll("[id]")].map(node => node.id));
      const headings = [...document.querySelectorAll(".prose h2, .prose h3, .prose h4, [data-toc]")]
        .filter(node => !node.hasAttribute("data-toc-ignore"));
      headings.forEach((heading, index) => {
        if (heading.id) return;
        const text = (heading.getAttribute("data-toc-title") || heading.textContent || "Section").trim();
        if (!text) return;
        const base = text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || `toc-heading-${index}`;
        let id = base;
        let suffix = 2;
        while (usedIds.has(id)) id = `${base}-${suffix++}`;
        heading.id = id;
        usedIds.add(id);
      });
      let target;
      try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); }
      catch (_) { /* malformed fragments do not affect the article. */ }
      if (target) document.fonts.ready.then(() => target.scrollIntoView());
    }

    const currentPage = new URL(window.location.href);
    for (const link of document.querySelectorAll("a[href]")) {
      const destination = new URL(link.href);
      const external = ["http:", "https:"].includes(destination.protocol)
        && destination.origin !== currentPage.origin;
      link.toggleAttribute("data-external", external);
    }

    function updateNavigation() {
      const current = new URL(window.location.href);
      const path = current.pathname.replace(/index\.html$/, "");
      let activeSection = false;
      for (const link of document.querySelectorAll(".site-nav nav a")) {
        const target = new URL(link.href);
        const active = path.startsWith(target.pathname);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
        activeSection ||= active;
      }
      const home = document.querySelector(".wordmark");
      if (path === new URL(home.href).pathname && !activeSection) home.setAttribute("aria-current", "page");
      else home.removeAttribute("aria-current");
    }
    updateNavigation();
    window.addEventListener("hashchange", updateNavigation);

    const year = document.querySelector("#current-year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
