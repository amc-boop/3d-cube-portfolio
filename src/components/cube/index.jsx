'use client';
import React, { useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import styles from './style.module.scss';
import { useSpring, useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';

/**
 * Composant principal avec Overlay et Canvas.
 */
export default function Index() {
    const container = useRef(null);
    const [activeOverlay, setActiveOverlay] = useState(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const progress = useTransform(scrollYProgress, [0, 1], [0, 5])
    const smoothProgress = useSpring(progress, { damping: 20 });

    const closeOverlay = () => setActiveOverlay(null);

    const overlayContent = {
        about: { title: "À propos de moi", description: "Découvrez mon univers créatif et technique." },
        projects: { title: "Mes projets", description: "Exploration de mes dernières réalisations interactives." },
        stack: { title: "Stack technique", description: "Les outils que je maîtrise pour construire le web." }
    };

    return (
        <div ref={container} className={styles.main}>
            <div className={styles.cube}>
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <OrbitControls enableZoom={false} enablePan={false} />
                    <ambientLight intensity={1} />
                    <directionalLight position={[2, 1, 1]} />
                    {/* On utilise Suspense pour le chargement asynchrone des médias */}
                    <Suspense fallback={null}>
                        <Cube progress={smoothProgress} setActiveOverlay={setActiveOverlay} />
                    </Suspense>
                </Canvas>
            </div>

            {activeOverlay && (
                <div className={styles.overlay}>
                    <button className={styles.closeButton} onClick={closeOverlay}>✕</button>
                    <div className={styles.content}>
                        <h1>{overlayContent[activeOverlay].title}</h1>
                        <p>{overlayContent[activeOverlay].description}</p>
                    </div>
                </div>
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