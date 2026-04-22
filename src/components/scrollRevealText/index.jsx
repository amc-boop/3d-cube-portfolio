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
                </div>
            </div>
        </div>
    );
}
