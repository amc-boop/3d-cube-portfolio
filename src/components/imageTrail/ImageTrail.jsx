'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ImageTrail.css';

const lerp = (a, b, n) => (1 - n) * a + n * b;

const getMouseDistance = (p1, p2) => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
};

export default function ImageTrail({ images = [], variant = 1 }) {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const cacheMouseRef = useRef({ x: 0, y: 0 });
  const zIndexRef = useRef(1);
  const imgIndexRef = useRef(0);
  const activeImagesRef = useRef([]);
  const threshold = 80;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const imgs = imagesRef.current;

    const activateImage = (img, x, y) => {
      const containerRect = container.getBoundingClientRect();
      const relX = x - containerRect.left;
      const relY = y - containerRect.top;

      gsap.killTweensOf(img);

      const z = zIndexRef.current++;
      img.style.zIndex = z;
      img.style.left = `${relX}px`;
      img.style.top = `${relY}px`;

      if (variant === 1) {
        const rotation = gsap.utils.random(-20, 20);
        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.6, xPercent: -50, yPercent: -50, rotation },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out',
            onComplete: () => {
              gsap.to(img, {
                opacity: 0,
                scale: 0.8,
                duration: 0.6,
                delay: 0.4,
                ease: 'power2.in',
              });
            },
          }
        );
      } else if (variant === 2) {
        const rotation = gsap.utils.random(-12, 12);
        gsap.fromTo(
          img,
          { opacity: 0, yPercent: -50, xPercent: -50, scale: 0.8, rotation },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: 'back.out(1.5)',
            onComplete: () => {
              gsap.to(img, {
                opacity: 0,
                yPercent: 20,
                duration: 0.5,
                delay: 0.3,
                ease: 'power1.in',
              });
            },
          }
        );
      } else if (variant === 3) {
        const rotation = gsap.utils.random(-15, 15);
        gsap.fromTo(
          img,
          {
            opacity: 0,
            scale: 0.5,
            xPercent: -50,
            yPercent: -50,
            rotation: rotation - 10,
            filter: 'blur(8px)',
          },
          {
            opacity: 0.9,
            scale: 1,
            rotation,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'expo.out',
            onComplete: () => {
              gsap.to(img, {
                opacity: 0,
                scale: 1.1,
                filter: 'blur(4px)',
                duration: 0.7,
                delay: 0.5,
                ease: 'power2.inOut',
              });
            },
          }
        );
      } else if (variant === 4) {
        gsap.fromTo(
          img,
          { opacity: 0, xPercent: -50, yPercent: -120, scale: 1.2 },
          {
            opacity: 1,
            yPercent: -50,
            scale: 1,
            duration: 0.45,
            ease: 'power4.out',
            onComplete: () => {
              gsap.to(img, {
                opacity: 0,
                yPercent: 20,
                duration: 0.5,
                delay: 0.35,
                ease: 'power2.in',
              });
            },
          }
        );
      }
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const dist = getMouseDistance(mouseRef.current, lastMouseRef.current);
      if (dist < threshold) return;

      lastMouseRef.current = { ...mouseRef.current };

      const img = imgs[imgIndexRef.current % imgs.length];
      imgIndexRef.current++;

      activateImage(img, e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [variant]);

  return (
    <div ref={containerRef} className="image-trail-container">
      {images.map((src, i) => (
        <img
          key={i}
          ref={(el) => {
            if (el) imagesRef.current[i] = el;
          }}
          src={src}
          alt=""
          draggable={false}
        />
      ))}
    </div>
  );
}
