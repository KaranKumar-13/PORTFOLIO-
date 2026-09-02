/**
 * mcSound.js
 * Synthesises the Minecraft Java Edition UI click sound using Web Audio API.
 * No audio file required — generated purely in-browser.
 */

let ctx = null;

function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
}

/**
 * Play the Minecraft button-click "pop" sound.
 * Closely approximates the wooden-click noise used in Java Edition menus.
 */
export function playClick() {
    try {
        const ac = getCtx();
        const now = ac.currentTime;

        // ── Noise burst (short white noise) ──────────────────────
        const bufSize = ac.sampleRate * 0.06;           // 60 ms of samples
        const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

        const noise = ac.createBufferSource();
        noise.buffer = buf;

        // ── Band-pass filter — gives it the "woody" Minecraft tone ─
        const filter = ac.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800;   // centre frequency (Hz)
        filter.Q.value = 0.8;

        // ── Gain envelope — fast attack, quick decay ──────────────
        const gain = ac.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.005);   // attack
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08); // decay

        // ── Connect graph and fire ────────────────────────────────
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ac.destination);
        noise.start(now);
        noise.stop(now + 0.09);
    } catch (_) {
        // Silently ignore if Web Audio not supported
    }
}
