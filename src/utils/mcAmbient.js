/**
 * mcAmbient.js
 * Synthesises a soothing Minecraft-style ambient background track
 * inspired by C418's "Mood City" — using only the Web Audio API.
 * No audio file required.
 */

let ctx = null;
let masterGain = null;
let running = false;
let scheduledNodes = [];

// ── C major pentatonic — gentle, dreamlike ────────────────────
const NOTES = [130.81, 146.83, 164.81, 196.00, 220.00,  // C3 D3 E3 G3 A3
    261.63, 293.66, 329.63, 392.00, 440.00,  // C4 D4 E4 G4 A4
    523.25, 587.33, 659.25];                  // C5 D5 E5

function getCtx() {
    if (!ctx) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = ctx.createGain();
        masterGain.gain.value = 0.18;
        masterGain.connect(ctx.destination);
    }
    return ctx;
}

// ── Simple reverb via delay feedback loop ────────────────────
function createReverb(ac) {
    const delay = ac.createDelay(2.5);
    const fb = ac.createGain();
    const wet = ac.createGain();
    delay.delayTime.value = 0.45;
    fb.gain.value = 0.4;
    wet.gain.value = 0.38;
    delay.connect(fb);
    fb.connect(delay);
    delay.connect(wet);
    return { input: delay, output: wet };
}

// ── Play one soft piano-like note ───────────────────────────
function playNote(freq, startTime, duration = 3.0) {
    if (!running) return;
    const ac = ctx;
    const osc = ac.createOscillator();
    const env = ac.createGain();

    osc.type = 'triangle';
    osc.frequency.value = freq;

    // Soft attack, long decay (piano-like)
    env.gain.setValueAtTime(0, startTime);
    env.gain.linearRampToValueAtTime(0.55, startTime + 0.08);
    env.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    const reverb = createReverb(ac);
    osc.connect(env);
    env.connect(reverb.input);
    reverb.output.connect(masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
    scheduledNodes.push(osc);
}

// ── Drone — low pad note ─────────────────────────────────────
function startDrone() {
    const ac = ctx;
    const osc = ac.createOscillator();
    const env = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = 65.41; // C2
    env.gain.value = 0.12;
    osc.connect(env);
    env.connect(masterGain);
    osc.start();
    scheduledNodes.push(osc);
}

// ── Schedule random arpeggio-like phrases ────────────────────
let phraseTimer = null;

function schedulePhrase() {
    if (!running) return;
    const ac = ctx;
    const now = ac.currentTime;

    // Pick 3–5 random pentatonic notes for this phrase
    const count = 3 + Math.floor(Math.random() * 3);
    const gap = 0.6 + Math.random() * 0.5;   // beat spacing
    const pool = [...NOTES].sort(() => Math.random() - 0.5).slice(0, count);

    pool.forEach((freq, i) => {
        playNote(freq, now + i * gap, 2.5 + Math.random() * 1.5);
    });

    // Schedule next phrase after silence
    const nextIn = (count * gap) + 1.5 + Math.random() * 3;
    phraseTimer = setTimeout(schedulePhrase, nextIn * 1000);
}

// ── Public API ────────────────────────────────────────────────
export function startAmbient() {
    if (running) return;
    const ac = getCtx();
    if (ac.state === 'suspended') ac.resume();
    running = true;
    startDrone();
    schedulePhrase();
}

export function stopAmbient() {
    running = false;
    clearTimeout(phraseTimer);
    scheduledNodes.forEach(n => { try { n.stop(); } catch (_) { } });
    scheduledNodes = [];
    if (masterGain) {
        masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    }
    setTimeout(() => {
        if (masterGain) masterGain.gain.value = 0.18;
    }, 500);
}

export function isPlaying() { return running; }
