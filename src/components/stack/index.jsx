'use client';
import React from 'react';
import Folder from './Folder';
import styles from './style.module.scss';

const STACK_DATA = [
    {
        category: 'Langages & Code',
        tools: [
            { type: 'image', src: '/stack/Python_(programming_language)-Logo.wine.png' },
            { type: 'image', src: '/stack/SQL.png.webp' }
        ],
    },
    {
        category: 'Frameworks & Outils Dev',
        tools: [
            { type: 'image', src: '/stack/Vercel-Logo.jpg' },
            { type: 'image', src: '/stack/github.png' },
            { type: 'image', src: '/stack/cursor-antigravity-vscode-.png' }
        ],
    },
    {
        category: 'IA & Automatisation',
        tools: ['Claude, Gemini, Perplexity...', 'Dust', 'Make'],
    },
    {
        category: 'Data & Analyse',
        tools: ['Google Sheets', 'Looker Studio'],
    },
    {
        category: 'No-code & Design',
        tools: ['Webflow', 'Antigravity / Cursor', 'Notion / Airtable'],
    },
];

export default function Stack() {
    return (
        <div className={styles.stackPage}>
            <h1 className={styles.stackTitle}>Ma Stack Technique</h1>
            <p className={styles.stackSubtitle}>Survolez un dossier pour découvrir les outils</p>

            <div className={styles.grid}>
                {STACK_DATA.map((item, index) => (
                    <Folder
                        key={item.category}
                        color="#1a3a6b"
                        size={2}
                        label={index === 0 ? 'Code' : index === 1 ? <span style={{textAlign:'center',lineHeight:1.3}}>Frameworks<br/>& Outils Dev</span> : ''}
                        items={item.tools.map((tool, i) => {
                            if (typeof tool === 'object' && tool.type === 'image') {
                                return (
                                    <div key={i} isTransparent={true} style={{
                                        background: 'transparent',
                                        width: '100%',
                                        height: '45px',
                                        padding: '4px',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <img
                                            src={tool.src}
                                            alt="logo"
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>
                                );
                            }
                            return (
                                <div key={i} style={{
                                    background: 'white',
                                    color: 'black',
                                    fontFamily: 'inherit',
                                    fontWeight: '600',
                                    fontSize: '11px',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    whiteSpace: 'nowrap',
                                    textAlign: 'center',
                                }}>
                                    {tool}
                                </div>
                            );
                        })}
                    />
                ))}
            </div>
        </div>
    );
}
