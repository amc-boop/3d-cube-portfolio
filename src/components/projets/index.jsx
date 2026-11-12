'use client';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useMotionValue, useTransform, motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';

// Contenu des fiches : uniquement les informations déjà présentes, réorganisées par rubrique
const projects = [
    {
        id: 1,
        title: "Hackathon Payfit",
        subtitle: "Hackathon PayFit x Eugenia School",
        highlights: ["1 semaine", "80 participants"],
        sections: [
            { label: "Problème", text: "Produire du contenu SEO à grande échelle avec l'IA, sans hallucinations, dans un secteur très réglementé : les RH et la paie." },
            { label: "Solution", text: "Un pipeline multi-agents automatisé, avec une validation humaine à la fin. Il repère les opportunités SEO, vérifie les points juridiques sur les sources officielles (.gouv.fr), rédige, puis contrôle la qualité." },
            { label: "Points forts", text: "Publication automatique sur LinkedIn et Reddit. Repérage de prospects en difficulté par scraping LinkedIn, avec une réponse générée par l'IA envoyée sur Slack. Interface front-end aux couleurs de PayFit." },
        ],
        stack: ["Make", "Supabase", "OpenAI", "DALL-E", "Apify", "Gemini", "Slack", "Lovable"],
        src: "/projects/Hackathon payfit.pdf",
        type: "pdf",
        color: "#D8EBF6"
    },
    {
        id: 2,
        title: "BDD Eugenia School",
        subtitle: "Gamification du recrutement, Eugenia School x Albert School",
        highlights: ["2 écoles"],
        sections: [
            { label: "Contexte", text: "Projet mené avec Eugenia School pour moderniser le processus de recrutement de deux écoles." },
            { label: "Problème", text: "Les tests de personnalité classiques sont peu engageants, et beaucoup de candidats abandonnent en cours de route." },
            { label: "Solution", text: "Un test de personnalité gamifié qui oriente automatiquement le candidat vers Eugenia School ou Albert School selon son profil, relié à une base de données en temps réel." },
            { label: "Difficultés", text: "Concevoir un scoring fiable et assez nuancé pour distinguer les deux profils, garder une expérience fun sans perdre en pertinence, et synchroniser les réponses et les résultats en temps réel avec Supabase." },
        ],
        stack: ["Supabase", "JavaScript", "HTML/CSS"],
        src: "/projects/Loom BDD.mp4",
        type: "video",
        color: "#C7E8FD"
    },
    {
        id: 3,
        title: "Fairway",
        subtitle: "FairWay, l'app de golf tout-en-un",
        highlights: ["Équipe de 5"],
        sections: [
            { label: "Contexte", text: "Projet entrepreneurial à Eugenia School : concevoir et pitcher une startup de A à Z." },
            { label: "Problème", text: "L'expérience du golfeur est éclatée entre plusieurs services, et le coaching traditionnel coûte trop cher pour les jeunes joueurs." },
            { label: "Solution", text: "Une app mobile qui réunit la réservation de parcours, un coaching IA basé sur l'analyse du swing, la mise en relation entre partenaires de jeu et une marketplace d'équipement." },
            { label: "Difficultés", text: "Se démarquer face à Hole19 et Golfshot, convaincre un marché premium et construire un modèle freemium viable." },
        ],
        stack: ["Figma", "DeepSeek", "Computer Vision", "Mistral AI", "Stripe", "AWS"],
        src: "/projects/FairWay-2.pdf",
        type: "pdf",
        color: "#B0E1FF"
    },
    {
        id: 4,
        title: "Projet Looker",
        subtitle: "Dashboard Looker Studio, analytics marketing",
        highlights: [],
        sections: [
            { label: "Contexte", text: "Création d'un dashboard marketing sur Looker Studio à partir de vraies données e-commerce." },
            { label: "Problème", text: "Rendre les données brutes de GA4 lisibles et exploitables pour piloter la performance marketing de bout en bout." },
            { label: "Solution", text: "Un dashboard interactif filtrable par période, avec les KPIs clés (CA, sessions, taux de conversion), le funnel d'acquisition, les tendances utilisateurs et la performance par canal." },
            { label: "Difficultés", text: "Trouver un ordre de lecture clair, modéliser le funnel de conversion (de la session à l'achat) et croiser les données par canal pour en tirer des insights pertinents." },
        ],
        stack: ["Looker Studio", "Google Analytics 4", "BigQuery"],
        src: "/projects/Projet Looker collectif.pdf",
        type: "pdf",
        color: "#98D8FF"
    },
    {
        id: 5,
        title: "Projet de Statistiques descriptives",
        subtitle: "Analyse statistique et régression linéaire, Eugenia School",
        highlights: ["60 étudiants", "r = 0,93", "R² = 87 %"],
        sections: [
            { label: "Contexte", text: "Étude de l'impact des heures de travail sur les notes d'examen, à partir d'un sondage auprès de 60 étudiants." },
            { label: "Problème", text: "Savoir s'il existe une relation linéaire mesurable entre le temps de travail par semaine et la note à l'examen." },
            { label: "Démarche", text: "Statistiques descriptives, nuage de points, calcul de la corrélation (r = 0,93) et modèle de régression linéaire (Ŷ = 1,08X + 5,52, R² = 87 %)." },
            { label: "Difficultés", text: "Calculer à la main la covariance, l'écart-type et le coefficient de corrélation, puis expliquer les limites du modèle : une corrélation n'est pas une causalité, et certaines variables ne sont pas mesurées." },
        ],
        stack: ["Excel", "PowerPoint"],
        src: "/projects/Presentation_Projet_Statistiques.pptx-2.pdf",
        type: "pdf",
        color: "#8FCDFF"
    }
];

export default function Projets({ scrollContainer }) {
    const container = useRef(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    // Progression du scroll (0 → 1) calculée directement depuis le conteneur de l'overlay.
    // useScroll mesurait mal la position à l'ouverture de l'overlay, ce qui laissait
    // la première fiche réduite et inclinée alors qu'aucune autre fiche ne la recouvrait.
    const scrollYProgress = useMotionValue(0);

    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    useEffect(() => {
        const wrapper = scrollContainer.current;
        const updateProgress = () => {
            const max = wrapper.scrollHeight - wrapper.clientHeight;
            scrollYProgress.set(max > 0 ? Math.min(Math.max(wrapper.scrollTop / max, 0), 1) : 0);
        };
        updateProgress();
        wrapper.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);

        const lenis = new Lenis({
            wrapper,
            content: container.current,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            wrapper.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
            lenis.destroy();
        };
    }, [scrollContainer, scrollYProgress]);

    return (
        <main ref={container} className={styles.main}>
            {projects.map((project, i) => {
                const sectionSize = 1 / Math.max(projects.length - 1, 1);
                const start = i * sectionSize;
                const end = Math.min(start + sectionSize, 1);

                return (
                    <Card
                        key={project.id}
                        {...project}
                        i={i}
                        total={projects.length}
                        progress={scrollYProgress}
                        range={[start, end]}
                        onOpen={() => setSelectedMedia(project)}
                        scrollIndicatorOpacity={i === 0 ? scrollIndicatorOpacity : null}
                    />
                );
            })}

            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.modalOverlay}
                        onClick={() => setSelectedMedia(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className={styles.closeButton} onClick={() => setSelectedMedia(null)}>
                                Fermer
                            </button>
                            {selectedMedia.type === 'pdf' ? (
                                <iframe src={selectedMedia.src} className={styles.fullMedia} />
                            ) : (
                                <video src={selectedMedia.src} className={styles.fullMedia} controls autoPlay />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

function Card({ title, subtitle, highlights = [], sections = [], stack = [], src, type, color, i, total, progress, range, onOpen, scrollIndicatorOpacity, nextProject }) {
    // La dernière fiche garde sa taille d'origine (sa plage de scroll est vide : [1, 1])
    const isLast = i === total - 1;
    const scaleAnim = useTransform(progress, range, [1, 0.8]);
    const rotateAnim = useTransform(progress, range, [0, -5]);
    const scale = isLast ? 1 : scaleAnim;
    const rotate = isLast ? 0 : rotateAnim;

    return (
        <div className={styles.cardContainer}>
            {scrollIndicatorOpacity && (
                <motion.div
                    className={styles.scrollIndicator}
                    style={{ opacity: scrollIndicatorOpacity }}
                >
                    <svg className={styles.chev} viewBox="0 0 24 12" fill="none">
                        <path d="M2 2L12 10L22 2" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg className={`${styles.chev} ${styles.chev2}`} viewBox="0 0 24 12" fill="none">
                        <path d="M2 2L12 10L22 2" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            )}
            <motion.div
                style={{
                    backgroundColor: color,
                    scale,
                    rotate,
                    top: `calc(-5vh + ${i * 25}px)`
                }}
                className={styles.card}
            >
                <h2>{title}</h2>
                <div className={styles.content}>
                    <div className={styles.details}>
                        <p className={styles.subtitle}>{subtitle}</p>
                        {highlights.length > 0 && (
                            <div className={styles.highlights}>
                                {highlights.map((h) => <span key={h}>{h}</span>)}
                            </div>
                        )}
                        {sections.map((section) => (
                            <div key={section.label} className={styles.section}>
                                <h3>{section.label}</h3>
                                <p>{section.text}</p>
                            </div>
                        ))}
                        <ul className={styles.stack}>
                            {stack.map((tool) => <li key={tool}>{tool}</li>)}
                        </ul>
                    </div>
                    <div
                        className={`${styles.mediaContainer} ${styles.clickable}`}
                        onClick={onOpen}
                    >
                        {type === "pdf" && (
                            <iframe src={src + "#toolbar=0"} className={styles.media} title={title} />
                        )}
                        {type === "video" && (
                            <video src={src} className={styles.media} muted loop playsInline />
                        )}
                        {type === "image" && (
                            <img src={src} className={styles.media} alt={title} />
                        )}
                        <div className={styles.overlay}>
                            <span>Cliquer pour agrandir</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {nextProject && (
                <motion.div
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: '50%',
                        marginLeft: '-500px',
                        width: '1000px',
                        height: '75px',
                        borderRadius: '20px 20px 0 0',
                        backgroundColor: nextProject.color,
                        boxShadow: '0 -8px 30px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        paddingTop: '16px',
                        paddingLeft: '50px',
                        pointerEvents: 'none',
                        zIndex: 5,
                        opacity: scrollIndicatorOpacity,
                    }}
                >
                    <span style={{
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#2D3748',
                        opacity: 0.6,
                    }}>
                        {nextProject.title}
                    </span>
                </motion.div>
            )}
        </div>
    );
}

