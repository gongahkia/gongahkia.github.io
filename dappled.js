"use strict";

(() => {
    const BAYER_4 = [
        0, 8, 2, 10,
        12, 4, 14, 6,
        3, 11, 1, 9,
        15, 7, 13, 5,
    ];
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    function hashSeed(value) {
        let hash = 2166136261;
        for (let i = 0; i < value.length; i++) {
            hash ^= value.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    }

    function mulberry32(seed) {
        return function random() {
            seed |= 0;
            seed = (seed + 0x6d2b79f5) | 0;
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    function parseColor(value, fallback) {
        const color = (value || fallback).trim();
        const hex = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
        if (hex) {
            const raw = hex[1].length === 3
                ? hex[1].split("").map((char) => char + char).join("")
                : hex[1];
            const int = Number.parseInt(raw, 16);
            return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
        }
        const channels = color.match(/\d+(\.\d+)?/g)?.slice(0, 3).map(Number);
        if (channels?.length === 3) return channels;
        return fallback.match(/\d+/g).map(Number);
    }

    function cssColor(name, fallback) {
        return parseColor(getComputedStyle(document.documentElement).getPropertyValue(name).trim(), fallback);
    }

    function sceneRoots(random) {
        const variants = [
            [
                { x: 0.22, y: -0.28, angle: Math.PI / 2 + 0.35 },
                { x: -0.16, y: 0.82, angle: -0.18 },
                { x: 0.95, y: -0.18, angle: Math.PI / 2 + 0.62 },
            ],
            [
                { x: 0.34, y: -0.25, angle: Math.PI / 2 + 0.05 },
                { x: 1.12, y: 0.1, angle: Math.PI - 0.2 },
                { x: -0.14, y: 0.62, angle: 0.08 },
            ],
            [
                { x: 0.66, y: -0.3, angle: Math.PI / 2 - 0.28 },
                { x: 1.14, y: 0.74, angle: Math.PI + 0.1 },
                { x: 0.08, y: -0.2, angle: Math.PI / 2 - 0.1 },
            ],
        ];
        return variants[Math.floor(random() * variants.length)];
    }

    function buildScene(seed) {
        const random = mulberry32(seed);
        const segments = [];
        const leaves = [];
        const roots = sceneRoots(random);

        function grow(x, y, angle, length, width, depth, level) {
            if (level > 7 || width < 0.004 || segments.length > 900) return;
            const curve = (random() - 0.5) * 0.26;
            const x2 = x + Math.cos(angle + curve) * length;
            const y2 = y + Math.sin(angle + curve) * length;
            segments.push({ x1: x, y1: y, x2, y2, width, depth, phase: random() * Math.PI * 2 });

            const leafChance = level > 2 ? 4 : 1;
            for (let i = 0; i < leafChance; i++) {
                if (random() < 0.72) {
                    leaves.push({
                        x: x2 + (random() - 0.5) * 0.18,
                        y: y2 + (random() - 0.5) * 0.16,
                        r: 0.018 + random() * 0.065,
                        depth: Math.min(1, depth + random() * 0.4),
                        phase: random() * Math.PI * 2,
                    });
                }
            }

            const nextWidth = width * (0.66 + random() * 0.08);
            const nextLength = length * (0.64 + random() * 0.12);
            grow(x2, y2, angle + curve + (random() - 0.5) * 0.28, nextLength, nextWidth, depth + 0.08, level + 1);
            if (random() < 0.86) {
                const side = random() < 0.5 ? -1 : 1;
                grow(
                    x2,
                    y2,
                    angle + curve + side * (0.48 + random() * 0.52),
                    nextLength * (0.6 + random() * 0.32),
                    nextWidth * (0.68 + random() * 0.18),
                    depth + 0.18,
                    level + 1,
                );
            }
            if (random() < 0.28) {
                const side = random() < 0.5 ? -1 : 1;
                grow(
                    x2,
                    y2,
                    angle + curve + side * (0.9 + random() * 0.6),
                    nextLength * 0.48,
                    nextWidth * 0.55,
                    depth + 0.26,
                    level + 1,
                );
            }
        }

        roots.forEach((root, index) => {
            grow(
                root.x,
                root.y,
                root.angle + (random() - 0.5) * 0.35,
                0.42 - index * 0.06,
                0.028 - index * 0.004,
                0.04 + index * 0.14,
                0,
            );
        });

        for (let i = 0; i < 260; i++) {
            const edgeBias = random();
            leaves.push({
                x: edgeBias < 0.45 ? random() * 0.45 - 0.08 : edgeBias < 0.75 ? 0.45 + random() * 0.65 : 0.92 + random() * 0.18,
                y: edgeBias < 0.7 ? random() * 0.85 - 0.08 : random() * 0.4 - 0.12,
                r: 0.012 + random() * random() * 0.075,
                depth: 0.34 + random() * 0.66,
                phase: random() * Math.PI * 2,
            });
        }

        return { segments, leaves };
    }

    function fitCanvas(canvas, mask, visible, container) {
        const rect = container.getBoundingClientRect();
        const width = Math.max(1, Math.round(rect.width));
        const height = Math.max(1, Math.round(rect.height));
        const lowWidth = Math.max(1, Math.round(width / 4));
        const lowHeight = Math.max(1, Math.round(height / 4));
        if (canvas.width === lowWidth && canvas.height === lowHeight) return false;
        canvas.width = lowWidth;
        canvas.height = lowHeight;
        mask.width = lowWidth;
        mask.height = lowHeight;
        visible.width = lowWidth;
        visible.height = lowHeight;
        visible.style.width = `${width}px`;
        visible.style.height = `${height}px`;
        return true;
    }

    function renderScene(state, time) {
        const { mask, maskCtx, canvasCtx, visible, container, scene } = state;
        fitCanvas(canvasCtx.canvas, mask, visible, container);
        const width = mask.width;
        const height = mask.height;
        if (width < 2 || height < 2) return;

        const rootStyle = getComputedStyle(document.documentElement);
        const shadow = cssColor("--dappled-shadow", "rgb(12,32,56)");
        const mid = cssColor("--dappled-mid", "rgb(106,134,176)");
        const light = cssColor("--dappled-light", "rgb(131,161,201)");
        const wind = prefersReducedMotion ? 0.32 : 0.32 + Math.sin(time * 0.00034) * 0.16 + Math.sin(time * 0.00013 + 1.6) * 0.1;
        const parallax = state.pointer * 0.045;

        maskCtx.clearRect(0, 0, width, height);
        maskCtx.globalCompositeOperation = "source-over";
        maskCtx.lineCap = "round";
        maskCtx.lineJoin = "round";

        scene.segments.forEach((segment) => {
            const depth = Math.min(1, segment.depth);
            const sway = (Math.sin(time * 0.0012 + segment.phase) * 0.018 + wind * 0.03 + parallax) * depth;
            const x1 = (segment.x1 + sway * 0.35) * width;
            const y1 = (segment.y1 + sway * 0.08) * height;
            const x2 = (segment.x2 + sway) * width;
            const y2 = (segment.y2 + sway * 0.18) * height;
            maskCtx.strokeStyle = `rgba(0,0,0,${0.76 - depth * 0.18})`;
            maskCtx.lineWidth = Math.max(1, segment.width * height * (1.18 - depth * 0.28));
            maskCtx.beginPath();
            maskCtx.moveTo(x1, y1);
            maskCtx.lineTo(x2, y2);
            maskCtx.stroke();
        });

        scene.leaves.forEach((leaf) => {
            const depth = Math.min(1, leaf.depth);
            const sway = (Math.sin(time * 0.0018 + leaf.phase) * 0.026 + wind * 0.052 + parallax * 1.4) * depth;
            const x = (leaf.x + sway) * width;
            const y = (leaf.y + Math.sin(time * 0.001 + leaf.phase) * 0.008 * depth) * height;
            const rx = Math.max(1, leaf.r * width * (0.85 + depth * 0.45));
            const ry = Math.max(1, leaf.r * height * (0.6 + depth * 0.35));
            maskCtx.fillStyle = `rgba(0,0,0,${0.22 + (1 - depth) * 0.18})`;
            maskCtx.beginPath();
            maskCtx.ellipse(x, y, rx, ry, leaf.phase, 0, Math.PI * 2);
            maskCtx.fill();
        });

        const maskData = maskCtx.getImageData(0, 0, width, height).data;
        const output = canvasCtx.createImageData(width, height);
        const pixels = output.data;
        const center = Number.parseFloat(rootStyle.getPropertyValue("--dappled-center")) || 0.38;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4;
                const coverage = maskData[i + 3] / 255;
                const vignette = Math.max(0, 0.16 - Math.hypot(x / width - 0.5, y / height - 0.45) * 0.16);
                const tone = Math.max(0, Math.min(1, 1 - coverage * 1.24 + vignette + center - 0.38));
                const threshold = (BAYER_4[(x % 4) + (y % 4) * 4] + 0.5) / 16;
                const edge = coverage > 0.18 && coverage < 0.64 && ((BAYER_4[((x + 2) % 4) + ((y + 1) % 4) * 4] + 0.5) / 16) < coverage * 0.46;
                const color = tone > threshold ? light : edge ? mid : shadow;
                pixels[i] = color[0];
                pixels[i + 1] = color[1];
                pixels[i + 2] = color[2];
                pixels[i + 3] = 255;
            }
        }
        canvasCtx.putImageData(output, 0, 0);
        state.raf = prefersReducedMotion ? 0 : requestAnimationFrame((next) => renderScene(state, next));
    }

    function init(container) {
        if (container.dataset.dappledInit === "true") return;
        container.dataset.dappledInit = "true";
        const visible = document.createElement("canvas");
        visible.className = "dappled-canvas";
        visible.setAttribute("aria-hidden", "true");
        container.appendChild(visible);
        const mask = document.createElement("canvas");
        const canvasCtx = visible.getContext("2d", { alpha: false });
        const maskCtx = mask.getContext("2d", { willReadFrequently: true });
        if (!canvasCtx || !maskCtx) return;

        const state = {
            container,
            visible,
            mask,
            canvasCtx,
            maskCtx,
            pointer: 0,
            raf: 0,
            scene: buildScene(hashSeed(`${location.pathname}:dappled`)),
        };

        const resizeObserver = new ResizeObserver(() => {
            if (prefersReducedMotion) renderScene(state, performance.now());
        });
        resizeObserver.observe(container);
        window.addEventListener("pointermove", (event) => {
            state.pointer = event.clientX / Math.max(1, window.innerWidth) - 0.5;
        }, { passive: true });
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                cancelAnimationFrame(state.raf);
                state.raf = 0;
            } else if (!prefersReducedMotion && !state.raf) {
                state.raf = requestAnimationFrame((time) => renderScene(state, time));
            }
        });
        requestAnimationFrame((time) => renderScene(state, time));
    }

    function boot() {
        document.querySelectorAll(".dappled-scene").forEach(init);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot, { once: true });
    } else {
        boot();
    }
})();
