'use client';
import { useRef, useEffect, useState } from 'react';

const paragraphs = [
    "Étudiant à Eugenia School, je construis mon parcours autour de trois piliers : la technologie, l'innovation et l'entrepreneuriat.",
    "Contrairement à une approche classique du commerce, je me focalise sur la maîtrise opérationnelle de l'IA et des nouveaux outils digitaux. Mon objectif est simple : allier la stratégie commerciale à la puissance technologique pour créer de la valeur.",
    "Sportif et passionné par le dépassement de soi, je cherche à relever des défis concrets au sein d'entreprises innovantes, avant de lancer ma propre structure.",
    "Je vous invite à consulter aussi mon profil LinkedIn pour en apprendre davantage sur moi. Me suivre, c'est voir mes compétences en action, pas seulement les lire."
];

function RevealParagraph({ text, scrollContainer }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            {
                root: scrollContainer?.current ?? null,
                threshold: 0.2,
            }
        );
        const el = ref.current;
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, [scrollContainer]);

    const words = text.split(' ');

    return (
        <p ref={ref} style={{
            margin: 0,
            lineHeight: 1.9,
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            fontWeight: 400,
            color: '#2D3748',
            textAlign: 'left',
            width: '100%',
            maxWidth: 'none',
        }}>
            {words.map((word, i) => (
                <span
                    key={i}
                    style={{
                        display: 'inline-block',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0px)' : 'translateY(16px)',
                        transition: `opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s`,
                        marginRight: '0.28em',
                    }}
                >
                    {word}
                </span>
            ))}
        </p>
    );
}

export default function ScrollRevealText({ scrollContainer }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'stretch',
            width: '100%',
        }}>
            {/* Colonne gauche : image sticky (40%) */}
            <div style={{
                flex: '0 0 40%',
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflow: 'hidden',
                alignSelf: 'flex-start',
                background: '#000',
                flexShrink: 0,
            }}>
                <img
                    src="/photo-de-moi.png"
                    alt="Alexandre McNamara"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                    }}
                />
            </div>

            {/* Colonne droite : texte scrollable (60%) */}
            <div style={{ flex: '0 0 60%', display: 'flex', alignItems: 'center' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '7vh',
                    paddingTop: '12vh',
                    paddingBottom: '5vh',
                    paddingLeft: '8%',
                    paddingRight: '8%',
                    boxSizing: 'border-box',
                    width: '100%',
                }}>
                    {paragraphs.map((paragraph, pIndex) => (
                        <RevealParagraph
                            key={pIndex}
                            text={paragraph}
                            scrollContainer={scrollContainer}
                        />
                    ))}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '1vh' }}>
                        <a
                            href="https://www.linkedin.com/in/alexandre-mcnamara"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5em',
                                color: '#2D3748',
                                textDecoration: 'none',
                                fontWeight: 600,
                                fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                                transition: 'opacity 0.2s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2D3748" width="32" height="32">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                        </a>

                        <a
                            href="https://github.com/amc-boop"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5em',
                                color: '#2D3748',
                                textDecoration: 'none',
                                fontWeight: 600,
                                fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                                transition: 'opacity 0.2s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2D3748" width="32" height="32">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                            </svg>
                            Github
                        </a>

                        <a
                            href="mailto:amcnamarapccb@gmail.com"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5em',
                                color: '#2D3748',
                                textDecoration: 'none',
                                fontWeight: 600,
                                fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                                transition: 'opacity 0.2s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#2D3748"/>
                            </svg>
                            Gmail
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
