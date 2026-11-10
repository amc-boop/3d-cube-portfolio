import * as THREE from 'three';

const SIZE = 1024;
const INSET = 36;
const ease = (t) => 1 - Math.pow(1 - t, 4);

// Version "texte blanc" de l'image : le fond devient transparent, le texte sombre devient blanc.
function buildWhiteMask(img) {
    const c = document.createElement('canvas');
    c.width = c.height = SIZE;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, SIZE, SIZE);
    const data = ctx.getImageData(0, 0, SIZE, SIZE);
    const px = data.data;
    // Fond échantillonné loin du bord (le coin de l'image a un liseré sombre)
    const o = (40 * SIZE + 40) * 4;
    const bg = (px[o] + px[o + 1] + px[o + 2]) / 3 || 240;
    for (let i = 0; i < px.length; i += 4) {
        const lum = (px[i] + px[i + 1] + px[i + 2]) / 3;
        px[i] = px[i + 1] = px[i + 2] = 255;
        px[i + 3] = Math.max(0, Math.min(255, ((bg - lum) / bg) * 255));
    }
    ctx.putImageData(data, 0, 0);
    return c;
}

function sampleBg(img) {
    const c = document.createElement('canvas');
    c.width = c.height = 1;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 40, 40, 1, 1, 0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${r},${g},${b})`;
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h);
}

function drawArrow(ctx, cx, cy, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.lineCap = ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 28, cy);
    ctx.lineTo(cx + 28, cy);
    ctx.moveTo(cx + 8, cy - 20);
    ctx.lineTo(cx + 28, cy);
    ctx.lineTo(cx + 8, cy + 20);
    ctx.stroke();
}

/**
 * Texture canvas qui reproduit l'effet FlowButton sur toute la face.
 * `draw(t)` : t ∈ [0,1] (0 = repos, 1 = survol).
 */
export function createFlowFace(sourceTexture) {
    const img = sourceTexture.image;
    const mask = buildWhiteMask(img);
    const bgColor = sampleBg(img);

    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;

    const draw = (raw) => {
        const t = ease(raw);
        // Au survol, le rectangle arrondi s'étend jusqu'aux bords de la face (plus de marge claire)
        const inset = INSET * (1 - t);
        const inner = SIZE - inset * 2;
        const radius = 260 - (260 - 60) * t;
        const shift = 60 * t;

        ctx.clearRect(0, 0, SIZE, SIZE);
        ctx.drawImage(img, 0, 0, SIZE, SIZE);
        // Masque le liseré sombre présent sur les bords de l'image
        ctx.strokeStyle = bgColor;
        ctx.lineWidth = 24;
        ctx.strokeRect(0, 0, SIZE, SIZE);

        // Cercle noir qui s'étend, découpé par le rectangle arrondi
        if (t > 0.001) {
            ctx.save();
            roundRect(ctx, inset, inset, inner, inner, radius);
            ctx.clip();
            ctx.fillStyle = '#111';
            ctx.beginPath();
            ctx.arc(SIZE / 2, SIZE / 2, 20 + t * SIZE * 0.8, 0, Math.PI * 2);
            ctx.fill();
            // Texte blanc décalé dans la zone noire
            ctx.drawImage(mask, shift, 0, SIZE, SIZE);
            ctx.restore();
        }

        // Flèches : celle de gauche entre, celle de droite sort
        const leftX = -80 + (INSET + 150 + 80) * t;
        const rightX = SIZE - INSET - 150 + (INSET + 150 + 80) * t;
        if (t > 0.001) {
        drawArrow(ctx, leftX, SIZE / 2, t > 0.5 ? '#fff' : '#111');
        drawArrow(ctx, rightX, SIZE / 2, t > 0.5 ? '#fff' : '#111');
        }

        texture.needsUpdate = true;
    };

    draw(0);
    return { texture, draw };
}
