'use client';

import { useState } from 'react';
import styles from './LoginModal.module.css';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (email: string, password: string) => void;
    onSwitchToRegister: () => void;
}

export default function LoginModal({ 
    isOpen, 
    onClose, 
    onLogin, 
    onSwitchToRegister 
}: LoginModalProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
        setEmail('');
        setPassword('');
    };

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.modalHeader}>
                <h2>Login</h2>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
            </div>
            
            <div className={styles.modalBody}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.formInput}
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.formInput}
                            required
                        />
                    </div>
                    
                    <button type="submit" className={styles.submitButton}>
                        Login
                    </button>
                </form>
            </div>
            
            <div className={styles.modalFooter}>
                <p>Don't have an account?</p>
                <button 
                    type="button" 
                    onClick={onSwitchToRegister}
                    className={styles.linkText}
                >
                    Register here
                </button>
            </div>
        </>
    );
}
