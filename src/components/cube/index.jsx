'use client';
import React, { useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import styles from './style.module.scss';
import { useSpring, useScroll, useTransform, motion as motionDom } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import Projets from '../projets';
import ScrollRevealText from '../scrollRevealText';
import Stack from '../stack';

/**
 * Composant principal avec Overlay et Canvas.
 */
export default function Index() {
    const container = useRef(null);
    const overlayRef = useRef(null);
    const [activeOverlay, setActiveOverlay] = useState(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const progress = useTransform(scrollYProgress, [0, 1], [0, 5])
    const smoothProgress = useSpring(progress, { damping: 20 });

    const closeOverlay = () => {
        setActiveOverlay(null);
        document.body.style.overflow = '';
    }

    const openOverlay = (type) => {
        setActiveOverlay(type);
        document.body.style.overflow = 'hidden';
    }

    const overlayContent = {
        about: {
            title: "Qui suis-je ?",
            description: `Étudiant à Eugenia School, je construis mon parcours autour de trois piliers : la technologie, l'innovation et l'entrepreneuriat.

Contrairement à une approche classique du commerce, je me focalise sur la maîtrise opérationnelle de l'IA et des nouveaux outils digitaux. Mon objectif est simple : allier la stratégie commerciale à la puissance technologique pour créer de la valeur.

Sportif et passionné par le dépassement de soi, je cherche à relever des défis concrets au sein d'entreprises innovantes, avant de lancer ma propre structure.

Je vous invite à consulter aussi mon profil linkedin pour en apprendre davantage sur moi. Me suivre, c'est voir mes compétences en action, pas seulement sur un CV.`
        },
        stack: { title: "Stack technique" }
    };

    // Fade-out de l'indicateur au scroll
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

    return (
        <div ref={container} className={styles.main}>
            <div className={styles.cube}>
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <OrbitControls enableZoom={false} enablePan={false} />
                    <ambientLight intensity={1} />
                    <directionalLight position={[2, 1, 1]} />
                    <Suspense fallback={null}>
                        <Cube progress={smoothProgress} setActiveOverlay={(type) => openOverlay(type)} />
                    </Suspense>
                </Canvas>

                {/* Indicateur de scroll - double chevron CSS */}
                <motionDom.div
                    className={styles.scrollIndicator}
                    style={{ opacity: scrollIndicatorOpacity }}
                >
                    <style>{`
                        @keyframes chevronBounce {
                            0%   { opacity: 0; transform: translateY(-4px); }
                            50%  { opacity: 1; transform: translateY(4px); }
                            100% { opacity: 0; transform: translateY(8px); }
                        }
                        .chev { 
                            display: block;
                            width: 36px;
                            height: 18px;
                            animation: chevronBounce 1.4s ease-in-out infinite;
                        }
                        .chev2 { animation-delay: 0.25s; }
                    `}</style>
                    <svg className="chev" viewBox="0 0 24 12" fill="none">
                        <path d="M2 2L12 10L22 2" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg className="chev chev2" viewBox="0 0 24 12" fill="none">
                        <path d="M2 2L12 10L22 2" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motionDom.div>
            </div>

            {activeOverlay && (
                <>
                    {/* Bouton fermer en dehors de l'overlay pour éviter le clipping */}
                    <button
                        onClick={closeOverlay}
                        style={{
                            position: 'fixed',
                            top: '30px',
                            right: '30px',
                            zIndex: 2000,
                            fontSize: '2rem',
                            cursor: 'pointer',
                            background: 'none',
                            border: '2px solid white',
                            color: 'white',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'black'; e.currentTarget.style.transform = 'rotate(90deg)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'rotate(0deg)'; }}
                    >✕</button>

                    <div
                        ref={overlayRef}
                        className={`${styles.overlay} ${activeOverlay === 'projects' ? styles.projectsOverlay : ''} ${activeOverlay === 'about' ? styles.aboutOverlay : ''} ${activeOverlay === 'stack' ? styles.stackOverlay : ''}`}
                    >
                        {activeOverlay === 'projects' ? (
                            <Projets scrollContainer={overlayRef} />
                        ) : activeOverlay === 'about' ? (
                            <div className={styles.content}>
                                <ScrollRevealText scrollContainer={overlayRef} />
                            </div>
                        ) : activeOverlay === 'stack' ? (
                            <Stack />
                        ) : (
                            <div className={styles.content}>
                                <h1>{overlayContent[activeOverlay]?.title}</h1>
                                <p>{overlayContent[activeOverlay]?.description}</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

/**
 * Cube avec support Image.
 */
function Cube({ progress, setActiveOverlay }) {
    const mesh = useRef(null);
    const activeFaces = [4, 2, 3];

    // Chargement des textures images
    const quiSuisJeTex = useTexture("/qui-suis-je.png");
    const projetsTex = useTexture("/mes-projets.png");
    const stackTex = useTexture("/ma-stack-technique.png");

    const handleFaceClick = (e) => {
        e.stopPropagation();
        const faceIndex = e.face.materialIndex;
        if (!activeFaces.includes(faceIndex)) return;
        if (faceIndex === 4) setActiveOverlay('about');
        else if (faceIndex === 2) setActiveOverlay('projects');
        else if (faceIndex === 3) setActiveOverlay('stack');
    };

    const handlePointerMove = (e) => {
        const faceIndex = e.face?.materialIndex;
        document.body.style.cursor = activeFaces.includes(faceIndex) ? 'pointer' : 'default';
    }

    const handlePointerOut = () => {
        document.body.style.cursor = 'default';
    }

    return (
        <motion.mesh
            ref={mesh}
            rotation-y={progress}
            rotation-x={progress}
            onClick={handleFaceClick}
            onPointerMove={handlePointerMove}
            onPointerOut={handlePointerOut}
        >
            <boxGeometry args={[2.5, 2.5, 2.5]} />

            {/* Faces avec couleurs blanches et matériaux pour les images */}
            <meshStandardMaterial color="#fff" attach="material-0" />
            <meshStandardMaterial color="#fff" attach="material-1" />

            <meshBasicMaterial map={projetsTex} attach="material-2" toneMapped={false} /> {/* Haut */}
            <meshBasicMaterial map={stackTex} attach="material-3" toneMapped={false} />   {/* Bas */}
            <meshBasicMaterial map={quiSuisJeTex} attach="material-4" toneMapped={false} /> {/* Avant */}

            <meshStandardMaterial color="#fff" attach="material-5" />

        </motion.mesh>
    )
}