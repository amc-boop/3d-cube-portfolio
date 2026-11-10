'use client';
import { ArrowRight } from 'lucide-react';
import styles from './flow-button.module.scss';

export function FlowButton({ text = 'Modern Button', onClick }) {
    return (
        <button type="button" className={styles.button} onClick={onClick}>
            <ArrowRight className={`${styles.arrow} ${styles.arrowLeft}`} />
            <span className={styles.text}>{text}</span>
            <span className={styles.circle} />
            <ArrowRight className={`${styles.arrow} ${styles.arrowRight}`} />
        </button>
    );
}
