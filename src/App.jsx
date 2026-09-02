import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Portfolio from './components/Portfolio';
import { playClick } from './utils/mcSound';
import { startAmbient, stopAmbient, isPlaying } from './utils/mcAmbient';
import './App.css';

export default function App() {
    const [entered, setEntered] = useState(false);
    const [pendingSection, setPendingSection] = useState(null);
    const [musicOn, setMusicOn] = useState(false);

    const handleNavigate = (section) => {
        setPendingSection(section);
    };

    // Global Minecraft click sound on any button / link / mc-btn
    useEffect(() => {
        let musicStarted = false;
        const handler = (e) => {
            const el = e.target.closest('button, a, [role="button"], .mc-btn');
            if (el) playClick();
            // Start ambient music on first interaction (browser autoplay policy)
            if (!musicStarted) { musicStarted = true; startAmbient(); setMusicOn(true); }
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);

    const toggleMusic = () => {
        if (isPlaying()) { stopAmbient(); setMusicOn(false); }
        else { startAmbient(); setMusicOn(true); }
    };

    return (
        <>
            {/* Loading screen sits on top — fades out when Enter is pressed */}
            <LoadingScreen onEnter={() => setEntered(true)} onNavigate={handleNavigate} />

            {/* Portfolio page rendered beneath, becomes interactive after loading */}
            <Portfolio isReady={entered} pendingSection={pendingSection} />

            {/* Floating music toggle — bottom right corner */}
            <button
                onClick={toggleMusic}
                title={musicOn ? 'Mute music' : 'Play music'}
                style={{
                    position: 'fixed', bottom: '16px', right: '16px',
                    zIndex: 9998,
                    width: '36px', height: '36px',
                    background: 'rgba(0,0,0,0.75)',
                    border: '2px solid #333',
                    boxShadow: '0 0 0 2px #1a1a1a, inset 0 0 0 1px #555',
                    color: musicOn ? '#55ff55' : '#aaaaaa',
                    fontSize: '16px',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'monospace',
                    lineHeight: 1,
                }}
            >
                {musicOn ? '♪' : '🔇'}
            </button>
        </>
    );
}
