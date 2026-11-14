'use client';
import React, { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { createFlowFace } from './flowFace';
import styles from './style.module.scss';
import { useSpring, useScroll, useTransform, motion as motionDom } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import Projets from '../projets';
import ScrollRevealText from '../scrollRevealText';
import Stack from '../stack';
import ImageTrail from '../imageTrail/ImageTrail';

const TRAIL_IMAGES = [
  '/cube/97d341f5-4321-4454-bd02-90120ced799b.JPG',
  '/cube/IMG_0810.jpg',
  '/cube/IMG_2543.JPG',
  '/cube/IMG_4998.jpg',
  '/cube/IMG_6364.jpg',
  '/cube/IMG_9682.jpg',
  '/cube/IMG_9708.jpg',
  '/cube/IMG_9818.jpg',
];

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
                <ImageTrail images={TRAIL_IMAGES} variant={3} />
                <header className={styles.intro}>
                    <h1>Alexandre Mc Namara</h1>
                    <p>Business &amp; IA</p>
                </header>
                <p className={styles.hint}>Clique sur une face du cube</p>
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
                            width: 64px;
                            height: 32px;
                            animation: chevronBounce 1.4s ease-in-out infinite;
                        }
                        .chev2 { animation-delay: 0.25s; }
                    `}</style>
                    <svg className="chev" viewBox="0 0 24 12" fill="none">
                        <path d="M2 2L12 10L22 2" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg className="chev chev2" viewBox="0 0 24 12" fill="none">
                        <path d="M2 2L12 10L22 2" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                            // Fond clair sur les pages claires : le bouton reste lisible quand il passe sur la photo ou le texte (mobile)
                            background: activeOverlay === 'about' || activeOverlay === 'projects' ? 'rgba(248, 249, 250, 0.85)' : 'none',
                            border: `2px solid ${activeOverlay === 'about' || activeOverlay === 'projects' ? '#2D3748' : 'white'}`,
                            color: activeOverlay === 'about' || activeOverlay === 'projects' ? '#2D3748' : 'white',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => { const isDark = activeOverlay === 'about' || activeOverlay === 'projects'; e.currentTarget.style.background = '#2D3748'; e.currentTarget.style.color = isDark ? 'white' : 'black'; e.currentTarget.style.transform = 'rotate(90deg)'; }}
                        onMouseLeave={e => { const isDark = activeOverlay === 'about' || activeOverlay === 'projects'; e.currentTarget.style.background = isDark ? 'rgba(248, 249, 250, 0.85)' : 'none'; e.currentTarget.style.color = isDark ? '#2D3748' : 'white'; e.currentTarget.style.transform = 'rotate(0deg)'; }}
                    >✕</button>

                    <div
                        ref={overlayRef}
                        className={`${styles.overlay} ${activeOverlay === 'projects' ? styles.projectsOverlay : ''} ${activeOverlay === 'about' ? styles.aboutOverlay : ''} ${activeOverlay === 'stack' ? styles.stackOverlay : ''}`}
                    >
                        {activeOverlay === 'projects' ? (
                            <Projets scrollContainer={overlayRef} />
                        ) : activeOverlay === 'about' ? (
                            <ScrollRevealText scrollContainer={overlayRef} />
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
 * Cube : chaque face cliquable reproduit l'effet FlowButton au survol.
 */
function Cube({ progress, setActiveOverlay }) {
    const mesh = useRef(null);
    const hovered = useRef(null);

    const rotY = useTransform(progress, v => v + 0.45);
    // Inclinaison qui oscille entre le dessus et le dessous du cube sans jamais
    // dépasser 90° : la face « Qui suis-je ? » ne se retrouve plus à l'envers.
    const rotX = useTransform(progress, v => 0.35 + Math.sin(v * (2 * Math.PI / 5)) * 1.0);

    // Chargement des textures images
    const quiSuisJeTex = useTexture("/qui-suis-je.png");
    const projetsTex = useTexture("/mes-projets.png");
    const stackTex = useTexture("/ma-stack-technique.png");

    // index de matériau -> { texture, draw, t, overlay }
    // Chaque contenu occupe deux faces opposées : deux faces voisines ne sont jamais identiques.
    const faces = useMemo(() => {
        const make = (tex, overlay, rotation = 0) => {
            const face = { ...createFlowFace(tex), t: 0, overlay };
            // L'image « Ma stack technique » est en orientation paysage : on la redresse sur les côtés.
            face.texture.center.set(0.5, 0.5);
            face.texture.rotation = rotation;
            return face;
        };
        return {
            0: make(stackTex, 'stack', Math.PI / 2),       // Droite
            1: make(stackTex, 'stack', Math.PI / 2),       // Gauche
            2: make(projetsTex, 'projects'),  // Haut
            3: make(projetsTex, 'projects'),  // Bas
            4: make(quiSuisJeTex, 'about'),   // Avant
            5: make(quiSuisJeTex, 'about'),   // Arrière
        };
    }, [projetsTex, stackTex, quiSuisJeTex]);

    useFrame((_, delta) => {
        Object.entries(faces).forEach(([index, face]) => {
            const target = hovered.current === Number(index) ? 1 : 0;
            if (face.t === target) return;
            const step = delta / 0.8;
            face.t = target > face.t ? Math.min(target, face.t + step) : Math.max(target, face.t - step);
            face.draw(face.t);
        });
    });

    const handleFaceClick = (e) => {
        e.stopPropagation();
        const face = faces[e.face?.materialIndex];
        if (face) setActiveOverlay(face.overlay);
    };

    const handlePointerMove = (e) => {
        const faceIndex = e.face?.materialIndex;
        const isActive = faceIndex in faces;
        hovered.current = isActive ? faceIndex : null;
        document.body.style.cursor = isActive ? 'pointer' : 'default';
    }

    const handlePointerOut = () => {
        hovered.current = null;
        document.body.style.cursor = 'default';
    }

    return (
        <motion.mesh
            ref={mesh}
            rotation-y={rotY}
            rotation-x={rotX}
            onClick={handleFaceClick}
            onPointerMove={handlePointerMove}
            onPointerOut={handlePointerOut}
        >
            <boxGeometry args={[2.5, 2.5, 2.5]} />

            {Object.entries(faces).map(([index, face]) => (
                <meshBasicMaterial key={index} map={face.texture} attach={`material-${index}`} toneMapped={false} />
            ))}
        </motion.mesh>
    )
}
