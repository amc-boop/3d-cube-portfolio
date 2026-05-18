'use client';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';

const projects = [
    {
        id: 1,
        title: "Hackathon Payfit",
        description: `Hackathon PayFit x Eugenia School\nContexte — 1 semaine, 80 participants\nProblème — Scaler la production de contenu SEO par l'IA sans hallucination, dans le secteur ultra-réglementé des RH et de la paie.\nSolution — Un pipeline multi-agents automatisé avec validation humaine finale : détection d'opportunités SEO, vérification juridique via sources officielles (.gouv.fr), rédaction et contrôle qualité.\nDifférenciateurs — Publication automatique LinkedIn / Reddit, détection de prospects en difficulté via scraping LinkedIn → réponse IA envoyée sur Slack, interface front-end aux couleurs PayFit.\nStack — Make · Supabase · OpenAI · DALL-E · Apify · Gemini · Slack · Lovable`,
        src: "/projects/Hackathon payfit.pdf",
    type: "pdf",
    color: "#D8EBF6"
    },
{
    id: 2,
        title: "BDD Eugenia School",
            description: `Gamification du recrutement — Eugenia School x Albert School\nContexte — Projet réalisé avec Eugenia School pour moderniser le processus de recrutement de deux écoles.\nProblème — Les tests de personnalité classiques sont peu engageants et génèrent un fort taux d'abandon chez les candidats.\nSolution — Un test de personnalité gamifié qui oriente automatiquement le candidat vers Eugenia School ou Albert School selon son profil, connecté à une base de données en temps réel.\nDifficultés\n\nConcevoir une logique de scoring fiable et nuancée pour distinguer les deux profils\nRendre l'expérience fun sans sacrifier la pertinence des résultats\nSynchroniser les réponses et résultats en temps réel avec Supabase\n\nStack — Supabase · JavaScript · HTML/CSS`,
                src: "/projects/Loom BDD.mp4",
                    type: "video",
                        color: "#C7E8FD"
},
{
    id: 3,
        title: "Fairway",
            description: `FairWay — App de golf tout-en-un\nContexte — Projet entrepreneurial en équipe de 5 à Eugenia School : concevoir et pitcher une startup de A à Z.\nProblème — L'expérience golfeur est fragmentée et le coaching traditionnel trop coûteux pour les jeunes joueurs.\nSolution — App mobile centralisant réservation de parcours, coaching IA par analyse de swing, matching de partenaires et marketplace d'équipement.\nDifficultés — Se différencier face à Hole19 et Golfshot, convaincre un marché premium, et modéliser un business viable avec un freemium.\nStack — Figma · DeepSeek · Computer Vision · Mistral AI · Stripe · AWS`,
                src: "/projects/FairWay-2.pdf",
                    type: "pdf",
                        color: "#B0E1FF"
},
{
    id: 4,
        title: "Projet Looker",
            description: `Dashboard Looker Studio — Analytics Marketing\nContexte — Création d'un dashboard de visualisation de données marketing sur Looker Studio à partir de données e-commerce réelles.\nProblème — Rendre lisibles et actionnables des données brutes GA4 pour piloter la performance marketing de A à Z.\nSolution — Un dashboard interactif avec filtre par période, couvrant : KPIs clés (CA, sessions, taux de conversion), funnel d'acquisition, tendances utilisateurs et performance par canal.\nDifficultés — Structurer une logique de lecture claire, modéliser le funnel de conversion (session → achat), et croiser les données canaux pour en tirer des insights pertinents.\nStack — Looker Studio · Google Analytics 4 · BigQuery`,
                src: "/projects/Projet Looker collectif.pdf",
                    type: "pdf",
                        color: "#98D8FF"
},
{
    id: 5,
        title: "Projet de Statistiques descriptives",
            description: `Analyse Statistique & Régression Linéaire — Eugenia School\nContexte — Projet de statistiques descriptives sur l'impact des heures d'étude sur les notes d'examen, réalisé à partir d'un sondage de 60 étudiants.\nProblème — Déterminer s'il existe une relation linéaire mesurable entre le temps de travail hebdomadaire et la performance à l'examen.\nSolution — Analyse complète : statistiques descriptives, nuage de points, calcul de corrélation (r = 0,93) et modèle de régression linéaire (Ŷ = 1,08X + 5,52, R² = 87%).\nDifficultés — Calculer manuellement covariance, écart-type et coefficient de corrélation, interpréter les limites du modèle (corrélation ≠ causalité, variables non mesurées).\nStack — Excel · PowerPoint`,
                src: "/projects/Presentation_Projet_Statistiques.pptx-2.pdf",
                    type: "pdf",
                        color: "#8FCDFF"
}
];

export default function Projets({ scrollContainer }) {
    const container = useRef(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const { scrollYProgress } = useScroll({
        target: container,
        container: scrollContainer,
        offset: ['start start', 'end end']
    });

    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    useEffect(() => {
        const lenis = new Lenis({
            wrapper: scrollContainer.current,
            content: container.current,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [scrollContainer]);

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

function Card({ title, description, src, type, color, i, progress, range, onOpen, scrollIndicatorOpacity, nextProject }) {
    const scale = useTransform(progress, range, [1, 0.8]);
    const rotate = useTransform(progress, range, [0, -5]);

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
                    <p>{description}</p>
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

