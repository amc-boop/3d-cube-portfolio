'use client';
import { useEffect, useRef } from 'react';

/**
 * CustomCode — Bloc pour intégrer du code HTML/scripts personnalisés.
 *
 * Utilisation (HTML brut) :
 *   <CustomCode html={`<script src="..."></script>`} />
 *
 * Utilisation (React children) :
 *   <CustomCode>
 *     <div>Mon contenu personnalisé</div>
 *   </CustomCode>
 */
export default function CustomCode({ html, children, style = {} }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!html || !ref.current) return;

        // Réexécute les <script> injectés en HTML brut (dangerouslySetInnerHTML ne les exécute pas)
        const scripts = ref.current.querySelectorAll('script');
        scripts.forEach((oldScript) => {
            const newScript = document.createElement('script');
            [...oldScript.attributes].forEach(attr =>
                newScript.setAttribute(attr.name, attr.value)
            );
            newScript.textContent = oldScript.textContent;
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }, [html]);

    if (html) {
        return (
            <div
                ref={ref}
                style={style}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    }

    return (
        <div style={style}>
            {children}
        </div>
    );
}
