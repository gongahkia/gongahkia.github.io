window.onload = function() {
    console.log("Howdy")

    // Toggle functionality
    const crt = document.querySelector('.crt');
    const vignette = document.querySelector('.vignette');
    const backgroundCanvas = document.querySelector(".background");

    const crtToggle = document.getElementById('crtToggle');
    const vignetteToggle = document.getElementById('vignetteToggle');
    const backgroundToggle = document.getElementById('backgroundToggle');

    // Check if localStorage is available (won't work in Claude artifacts)
    const hasLocalStorage = typeof (Storage) !== "undefined";

    // Load saved preferences (fallback to defaults if localStorage unavailable)
    let savedCRT = true;
    let savedVignette = true;
    let savedBackground = true;

    if (hasLocalStorage) {
        savedCRT = localStorage.getItem('crt-enabled') !== 'false';
        savedVignette = localStorage.getItem('vignette-enabled') !== 'false';
        savedBackground = localStorage.getItem('background-enabled') !== 'false';
    }

    // Apply saved settings
    if (!savedCRT) {
        crt.classList.add('no-crt');
        crtToggle.classList.remove('active');
    }
    if (!savedVignette) {
        vignette.classList.add('no-vignette');
        vignetteToggle.classList.remove('active');
    }
    if (!savedBackground) {
        crt.classList.add('no-background');
        backgroundToggle.classList.remove('active');
    }

    crtToggle.addEventListener('click', () => {
        crt.classList.toggle('no-crt');
        crtToggle.classList.toggle('active');
        if (hasLocalStorage) {
            localStorage.setItem('crt-enabled', crtToggle.classList.contains('active'));
        }
    });

    vignetteToggle.addEventListener('click', () => {
        vignette.classList.toggle('no-vignette');
        vignetteToggle.classList.toggle('active');
        if (hasLocalStorage) {
            localStorage.setItem('vignette-enabled', vignetteToggle.classList.contains('active'));
        }
    });

    backgroundToggle.addEventListener('click', () => {
        const isActive = backgroundToggle.classList.toggle('active');
        crt.classList.toggle('no-background');
        if (hasLocalStorage) {
            localStorage.setItem('background-enabled', isActive);
        }

        if (isActive) {
            startBackground();
        } else {
            stopBackground();
        }
    });


    // Simple animated background
    const canvas = backgroundCanvas;
    const ctx = canvas.getContext("2d");
    const buffer = document.createElement("canvas");
    const bufferCtx = buffer.getContext("2d");
    let animationFrameId = null;
    let lastRender = 0;
    let lastFrameTime = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    const TARGET_FPS = 15;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    function startBackground() {
        if (animationFrameId || crt.classList.contains('no-background') || document.hidden) return;

        canvas.width = canvas.height = 512;
        buffer.width = buffer.height = 512;
        lastRender = 0;
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(frame);
    }

    function stopBackground() {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function frame(now) {
        if (crt.classList.contains('no-background') || document.hidden) {
            animationFrameId = null;
            return;
        }

        animationFrameId = requestAnimationFrame(frame);
        if (now - lastRender < FRAME_INTERVAL) return;

        const delta = (now - lastFrameTime) / 1000;
        lastFrameTime = now;
        lastRender = now;

        bufferCtx.clearRect(0, 0, buffer.width, buffer.height);
        bufferCtx.drawImage(canvas, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(buffer, 0, delta * 32);

        for (let i = 0; i < Math.random() * 64; i++) {
            ctx.fillStyle = Math.random() > 0.5 ? '#BE89FF' : '#232136';
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.5, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.fillStyle = 'rgba(35, 33, 54, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    startBackground();

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopBackground();
        } else {
            startBackground();
        }
    });


    // Set current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

};
