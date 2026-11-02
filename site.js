"use strict";

(() => {
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
      // IDs are generated during the build; settle deep links after fonts load.
      let target;
      try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); }
      catch (_) { /* malformed fragments do not affect the article. */ }
      if (target) document.fonts.ready.then(() => target.scrollIntoView());
    }

    const year = document.querySelector("#current-year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
