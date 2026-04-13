'use client';
import React from 'react';
import Folder from './Folder';
import styles from './style.module.scss';

const STACK_DATA = [
  {
    category: 'Langages & Code',
    tools: ['Python', 'SQL'],
  },
  {
    category: 'Frameworks & Outils Dev',
    tools: ['Next.js / React', 'Supabase', 'Git / GitHub / Vercel'],
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
                {STACK_DATA.map((item) => (
                    <Folder
                        key={item.category}
                        color="#1a3a6b"
                        size={1.5}
                        items={item.tools.map((tool, i) => (
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
                          ))}
                    />
                ))}
            </div>
        </div>
    );
}
