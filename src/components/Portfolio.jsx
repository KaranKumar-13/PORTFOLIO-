import { useRef, useEffect, useState } from 'react';
import './Portfolio.css';
import {
    PERSONAL, SKILLS, PROJECTS, EDUCATION,
    CERTS, ACHIEVEMENTS, STATS
} from '../assets/cv-data';

/* ── Utility: skill bar colour by level ─────────────────────── */
function barColor(level) {
    if (level >= 80) return '#57861e';
    if (level >= 65) return '#5555ff';
    if (level >= 45) return '#ffaa00';
    return '#aa0000';
}

/* ── Floating deco block positions ──────────────────────────── */
const DECO = [
    { top: '18%', left: '4%', color: '#4a8a44', size: 22, dur: 5.2, delay: 0 },
    { top: '40%', right: '5%', color: '#966c4a', size: 16, dur: 7.1, delay: 1.5 },
    { top: '65%', left: '7%', color: '#888888', size: 20, dur: 6.0, delay: 0.8 },
    { top: '22%', right: '8%', color: '#4adcff', size: 14, dur: 4.8, delay: 2.2 },
    { top: '80%', right: '3%', color: '#ffaa00', size: 18, dur: 5.6, delay: 1.1 },
];

export default function Portfolio({ pendingSection }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const sectionsRef = {
        about: useRef(null),
        skills: useRef(null),
        projects: useRef(null),
        edu: useRef(null),
        contact: useRef(null),
    };

    const scrollTo = key => {
        sectionsRef[key]?.current?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false); // close nav on link click
    };

    // Auto-scroll to the section chosen on the loading screen
    useEffect(() => {
        if (!pendingSection) return;
        // Wait for the loading screen fade (1s) + small buffer
        const t = setTimeout(() => scrollTo(pendingSection), 1100);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pendingSection]);

    return (
        <div className="portfolio">

            {/* ══ NAVBAR ════════════════════════════════════════════ */}
            <nav className="navbar">
                <span className="navbar__logo">KARAN KUMAR ● PORTFOLIO</span>

                {/* Hamburger toggle — only visible on mobile */}
                <button
                    className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setMenuOpen(o => !o)}
                >
                    <span /><span /><span />
                </button>

                <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
                    {[
                        ['About', 'about'],
                        ['Skills', 'skills'],
                        ['Projects', 'projects'],
                        ['Edu', 'edu'],
                        ['Contact', 'contact'],
                    ].map(([label, key]) => (
                        <li key={key}>
                            <a href={`#${key}`} onClick={e => { e.preventDefault(); scrollTo(key); }}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* ══ HERO ══════════════════════════════════════════════ */}
            <section className="hero" id="hero">
                {DECO.map((d, i) => (
                    <div
                        key={i}
                        className="hero__block"
                        style={{
                            top: d.top, left: d.left, right: d.right,
                            background: d.color, width: d.size, height: d.size,
                            animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s`,
                        }}
                    />
                ))}

                {/* ── Player Book — left side ─────────────────────── */}
                <div className="hero__book">
                    <img className="hero__book-bg" src={`${import.meta.env.BASE_URL}book-bg.png`} alt="book" />
                    <img className="hero__book-photo" src={`${import.meta.env.BASE_URL}karan-photo.jpg`} alt="Karan Kumar" />
                </div>

                {/* ── Photo visible on mobile (book is hidden) ── */}
                <img className="hero__photo-mobile" src={`${import.meta.env.BASE_URL}karan-photo.jpg`} alt="Karan Kumar" />

                <div className="hero__badge">⛏ GAME DEV PORTFOLIO ⛏</div>

                <h1 className="hero__name">{PERSONAL.name}</h1>
                <div className="hero__title">Software Developer &amp; CS Student</div>
                <p className="hero__objective">{PERSONAL.objective}</p>

                <div className="hero__btns">
                    <button className="mc-btn" onClick={() => scrollTo('projects')}>
                        ▶ View Projects
                    </button>
                    <a
                        className="mc-btn"
                        href={PERSONAL.github}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textAlign: 'center', textDecoration: 'none' }}
                    >
                        GitHub ↗
                    </a>
                </div>
            </section>

            {/* ══ STATS ═════════════════════════════════════════════ */}
            <div className="stats">
                {STATS.map(s => (
                    <div key={s.label} className="stats__item">
                        <span className="stats__value">{s.value}</span>
                        <span className="stats__label">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* ══ ABOUT ═════════════════════════════════════════════ */}
            <section className="section" id="about" ref={sectionsRef.about}>
                <div className="section__head">
                    <h2>📖 CAREER OBJECTIVE</h2>
                    <div className="section__divider" />
                </div>
                <p className="about__text">{PERSONAL.objective}</p>
            </section>

            {/* ══ SKILLS ════════════════════════════════════════════ */}
            <section className="section section--alt" id="skills" ref={sectionsRef.skills}>
                <div className="section__head">
                    <h2>⚔ SKILLS &amp; TECH STACK</h2>
                    <div className="section__divider" />
                </div>
                <div className="skills__grid">
                    {SKILLS.map(cat => (
                        <div key={cat.category} className="skill-card">
                            <div className="skill-card__head">
                                <span className="skill-card__icon">{cat.icon}</span>
                                <span
                                    className="skill-card__title"
                                    style={{ color: cat.color, textShadow: `1px 1px 0 #000` }}
                                >
                                    {cat.category}
                                </span>
                            </div>
                            {cat.items.map(item => (
                                <div key={item.name} className="skill-item">
                                    <div className="skill-item__label">
                                        <span>{item.name}</span>
                                        <span className="skill-item__pct">{item.level}%</span>
                                    </div>
                                    <div className="skill-bar">
                                        <div
                                            className="skill-bar__fill"
                                            style={{
                                                width: `${item.level}%`,
                                                background: barColor(item.level),
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ PROJECTS ══════════════════════════════════════════ */}
            <section className="section" id="projects" ref={sectionsRef.projects}>
                <div className="section__head">
                    <h2>🗺 PROJECTS</h2>
                    <div className="section__divider" />
                </div>
                <div className="projects__grid">
                    {PROJECTS.map(proj => (
                        <div key={proj.title} className="project-card">
                            <div
                                className="project-card__accent"
                                style={{ background: proj.color }}
                            />
                            <div className="project-card__body">
                                <span className="project-card__icon">{proj.icon}</span>
                                <div
                                    className="project-card__title"
                                    style={{ color: proj.color, textShadow: '1px 1px 0 #000' }}
                                >
                                    {proj.title}
                                </div>
                                <div className="project-card__tags">
                                    {proj.stack.map(t => (
                                        <span key={t} className="project-card__tag">{t}</span>
                                    ))}
                                </div>
                                <ul className="project-card__points">
                                    {proj.points.map((pt, i) => (
                                        <li key={i}>{pt}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ CERTIFICATIONS & ACHIEVEMENTS ════════════════════ */}
            <section className="section section--alt" id="certs">
                <div className="section__head">
                    <h2>🏅 CERTIFICATIONS &amp; ACHIEVEMENTS</h2>
                    <div className="section__divider" />
                </div>

                <div className="certs__list" style={{ marginBottom: '32px' }}>
                    {CERTS.map(c =>
                        c.link ? (
                            <a
                                key={c.name}
                                className="cert-card"
                                href={c.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span
                                    className="cert-card__name"
                                    style={{ color: c.color, textShadow: '1px 1px 0 #000' }}
                                >
                                    {c.name}
                                </span>
                                {c.sub && <span className="cert-card__sub">{c.sub}</span>}
                                <span className="cert-card__link">View certificate ↗</span>
                            </a>
                        ) : (
                            <div key={c.name} className="cert-card">
                                <span
                                    className="cert-card__name"
                                    style={{ color: c.color, textShadow: '1px 1px 0 #000' }}
                                >
                                    {c.name}
                                </span>
                                {c.sub && <span className="cert-card__sub">{c.sub}</span>}
                            </div>
                        )
                    )}
                </div>

                <div className="achievements__list">
                    {ACHIEVEMENTS.map((a, i) => (
                        <div key={i} className="achievement-item">
                            <span className="achievement-item__icon">{a.icon}</span>
                            <span className="achievement-item__text">{a.text}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ EDUCATION ═════════════════════════════════════════ */}
            <section className="section" id="edu" ref={sectionsRef.edu}>
                <div className="section__head">
                    <h2>🎓 EDUCATION</h2>
                    <div className="section__divider" />
                </div>
                <div className="education__list">
                    {EDUCATION.map(e => (
                        <div key={e.institution} className="edu-item">
                            <div className="edu-item__left">
                                <span className="edu-item__icon">{e.icon}</span>
                                <div>
                                    <div className="edu-item__inst">{e.institution}</div>
                                    <div className="edu-item__degree">{e.degree}</div>
                                </div>
                            </div>
                            <div className="edu-item__right">
                                <div className="edu-item__period">{e.period}</div>
                                {e.score && (
                                    <div className="edu-item__score">Score: {e.score}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ CONTACT ═══════════════════════════════════════════ */}
            <section className="section section--alt" id="contact" ref={sectionsRef.contact}>
                <div className="section__head">
                    <h2>📡 CONTACT</h2>
                    <div className="section__divider" />
                </div>
                <div className="contact__grid">
                    {[
                        { icon: '📧', label: 'Email', value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
                        { icon: '📞', label: 'Phone', value: PERSONAL.phone, href: `tel:${PERSONAL.phone}` },
                        { icon: '💼', label: 'LinkedIn', value: 'karan-kumar-58b282341', href: PERSONAL.linkedin },
                        { icon: '🐙', label: 'GitHub', value: 'KaranKumar-13', href: PERSONAL.github },
                        { icon: '⚡', label: 'LeetCode', value: 'KaranKumar_13', href: PERSONAL.leetcode },
                    ].map(item => (
                        <a
                            key={item.label}
                            className="contact-item"
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span className="contact-item__icon">{item.icon}</span>
                            <div>
                                <div className="contact-item__label">{item.label}</div>
                                <div className="contact-item__value">{item.value}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* ══ FOOTER ════════════════════════════════════════════ */}
            <footer className="footer">
                © 2024 {PERSONAL.name} — All Rights Reserved. Do not distribute!
            </footer>

        </div>
    );
}
