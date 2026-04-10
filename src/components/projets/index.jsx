'use client';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';

const projects = [
    {
        id: 1,
        title: "Hackathon Payfit",
        description: "Hackathon de 1 semaine pour Payfit en équipe de 6 avec plus de 80 participants.",
        src: "/projects/Hackathon payfit.pdf",
        type: "pdf",
        color: "#D8EBF6"
    },
    {
        id: 2,
        title: "BDD Eugenia School",
        description: "BDD avec cursor pour gamifier le recrutement de notre école.",
        src: "/projects/Loom BDD.mp4",
        type: "video",
        color: "#C7E8FD"
    },
    {
        id: 3,
        title: "Fairway",
        description: "Création fictive d'une application de golf",
        src: "/projects/FairWay-2.pdf",
        type: "pdf",
        color: "#B0E1FF"
    },
    {
        id: 4,
        title: "Projet Looker",
        description: "Dashboard analytique réalisé sur Looker",
        src: "/projects/Projet Looker collectif.pdf",
        type: "pdf",
        color: "#98D8FF"
    },
    {
        id: 5,
        title: "Projet de Statistiques descriptives",
        description: "Analyse Statistique & Régression Linéaire. Existe-t-il une relation linéaire entre le temps de révision et la note à l'examen?",
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
                const start = i * 0.2;

                return (
                    <Card
                        key={project.id}
                        {...project}
                        i={i}
                        progress={scrollYProgress}
                        range={[start, 1]}
                        onOpen={() => setSelectedMedia(project)}
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

function Card({ title, description, src, type, color, i, progress, range, onOpen }) {
    const scale = useTransform(progress, range, [1, 0.8]);
    const rotate = useTransform(progress, range, [0, -5]);

    return (
        <div className={styles.cardContainer}>
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
        </div>
    );
}

