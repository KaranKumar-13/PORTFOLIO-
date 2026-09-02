import { useEffect, useState, useCallback } from 'react';
import './LoadingScreen.css';
import { RANDOM_SPLASH } from '../assets/mc-assets';

/* ── Loading tips shown during the progress phase ────────────── */
const TIPS = [
    'Generating terrain…',
    'Placing grass blocks…',
    'Spawning mobs…',
    'Loading chunks…',
    'Rendering world…',
    'Planting trees…',
    'Initialising portfolio…',
    'Done!',
];

/* ── One splash text, picked randomly on each mount ─────────── */
const SPLASH = RANDOM_SPLASH();

/* ================================================================
   LOADING SCREEN
   Phase 1 (loading=true):  Panorama + logo + progress bar
   Phase 2 (loading=false): Full Java Edition title screen layout
   Phase 3 (hiding=true):   Fades out
   ================================================================ */
export default function LoadingScreen({ onEnter, onNavigate }) {
    const [progress, setProgress] = useState(0);
    const [tip, setTip] = useState(TIPS[0]);
    const [loading, setLoading] = useState(true);   // progress bar phase
    const [hiding, setHiding] = useState(false);  // fade-out phase

    /* ── Non-linear progress simulation ─────────────────────────── */
    useEffect(() => {
        let cur = 0;

        const tick = setInterval(() => {
            const rem = 100 - cur;
            const step = rem > 60
                ? 3 + Math.random() * 5
                : rem > 20
                    ? 0.8 + Math.random() * 2
                    : 2 + Math.random() * 3;

            cur = Math.min(100, cur + step);
            setProgress(Math.floor(cur));

            const tipIdx = Math.min(TIPS.length - 1, Math.floor(cur / (100 / TIPS.length)));
            setTip(TIPS[tipIdx]);

            if (cur >= 100) {
                clearInterval(tick);
                // Brief pause then switch to title-screen phase
                setTimeout(() => setLoading(false), 400);
            }
        }, 80);

        return () => clearInterval(tick);
    }, []);

    /* ── Enter the world ─────────────────────────────────────────── */
    const handleEnter = useCallback(() => {
        setHiding(true);
        setTimeout(() => onEnter?.(), 1000);
    }, [onEnter]);

    return (
        <div className={`ls${hiding ? ' ls--hidden' : ''}`}>

            {/* ── Panorama background ──────────────────────────────── */}
            <div className="ls__panorama" />
            <div className="ls__vignette" />

            {/* ── UI layer ─────────────────────────────────────────── */}
            <div className="ls__ui">

                {/* ── MINECRAFT logo ─────────────────────────────────── */}
                <div className="ls__logo-wrap">
                    <div className="ls__logo-mc">KARAN'S REALM</div>
                    <div className="ls__logo-edition">VIRTUAL WORLD</div>
                    {/* Splash only on title screen */}
                    {!loading && (
                        <div className="ls__splash">{SPLASH}</div>
                    )}
                </div>

                {/* ── PHASE 1: Loading bar ───────────────────────────── */}
                {loading && (
                    <div className="ls__loading-area">
                        <div className="ls__loading-tip">{tip}</div>
                        <div className="ls__bar-track">
                            <div className="ls__bar-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="ls__bar-pct">{progress}%</div>
                    </div>
                )}

                {/* ── PHASE 2: Java Edition title-screen layout ─────── */}
                {!loading && (
                    <div className="ls__title-ui">
                        <div className="ls__menu">

                            {/* Main button — "Enter the World" = Singleplayer */}
                            <button className="ls__menu-btn" onClick={handleEnter}>
                                ▶ &nbsp;Enter the World
                            </button>

                            {/* Second row — Like "Multiplayer" */}
                            <button className="ls__menu-btn" onClick={() => { onNavigate?.('projects'); handleEnter(); }}>
                                View Projects
                            </button>

                            {/* Third row — Like "Minecraft Realms" */}
                            <button className="ls__menu-btn" onClick={() => { onNavigate?.('about'); handleEnter(); }}>
                                About Me
                            </button>

                            {/* Small dual row — like "Options..." + "Quit Game" */}
                            <div className="ls__menu-row">
                                <button className="ls__menu-btn" onClick={() => { onNavigate?.('skills'); handleEnter(); }}>
                                    Skills
                                </button>
                                <button className="ls__menu-btn" onClick={() => { onNavigate?.('contact'); handleEnter(); }}>
                                    Contact
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Decorative Player Head (bottom-right) ──── */}
            {!loading && (
                <div className="ls__player-deco">
                    {/* Skin base */}
                    <div className="player__head">
                        {/* Hair layer (top overlay) */}
                        <div className="player__hair" />
                        {/* Eyes */}
                        <div className="player__eyes">
                            <div className="player__eye player__eye--left" />
                            <div className="player__eye player__eye--right" />
                        </div>
                        {/* Nose */}
                        <div className="player__nose" />
                        {/* Mouth */}
                        <div className="player__mouth" />
                    </div>
                </div>
            )}

            {/* ── Bottom HUD — version + copyright (Java Edition) ────── */}
            <div className="ls__bottom">
                <div className="ls__version">Portfolio v1.0.0</div>
                <div className="ls__copyright">
                    Copyright © 2024 Karan Kumar. Do not distribute!
                </div>
            </div>
        </div>
    );
}
