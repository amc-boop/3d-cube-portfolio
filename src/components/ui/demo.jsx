'use client';
import { FlowButton } from './flow-button';

export default function FlowButtonDemo() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', padding: 16 }}>
            <FlowButton text="Flow Button" />
        </div>
    );
}
