'use client';

const paragraphs = [
    "Étudiant à Eugenia School, je construis mon parcours autour de trois piliers : la technologie, l'innovation et l'entrepreneuriat.",
    "Contrairement à une approche classique du commerce, je me focalise sur la maîtrise opérationnelle de l'IA et des nouveaux outils digitaux. Mon objectif est simple : allier la stratégie commerciale à la puissance technologique pour créer de la valeur.",
    "Sportif et passionné par le dépassement de soi, je cherche à relever des défis concrets au sein d'entreprises innovantes, avant de lancer ma propre structure.",
    "Je vous invite à consulter aussi mon profil LinkedIn pour en apprendre davantage sur moi. Me suivre, c'est voir mes compétences en action, pas seulement les lire."
];

export default function ScrollRevealText() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%',
            minHeight: '100%',
        }}>
            {/* Colonne gauche : image sticky (40%) */}
            <div style={{
                flex: '0 0 40%',
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflow: 'hidden',
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
                    gap: '14vh',
                    paddingTop: '12vh',
                    paddingBottom: '30vh',
                    paddingLeft: '8%',
                    paddingRight: '8%',
                    boxSizing: 'border-box',
                    width: '100%',
                }}>
                    {paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} style={{
                            margin: 0,
                            lineHeight: 1.9,
                            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                            fontWeight: 400,
                            color: 'white',
                            textAlign: 'left',
                            width: '100%',
                            maxWidth: 'none'
                        }}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
