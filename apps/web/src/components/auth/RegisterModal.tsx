'use client';

import { useState } from 'react';
import styles from './RegisterModal.module.css';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegister: (name: string, email: string, password: string, confirmPassword: string) => void;
    onSwitchToLogin: () => void;
}

export default function RegisterModal({ 
    isOpen, 
    onClose, 
    onRegister, 
    onSwitchToLogin 
}: RegisterModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister(name, email, password, confirmPassword);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.modalHeader}>
                <h2>Register</h2>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
            </div>
            
            <div className={styles.modalBody}>
                <form onSubmit={handleSubmit} className={styles.registerForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.formInput}
                            required
                        />
                    </div>
                    
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
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={styles.formInput}
                            required
                        />
                    </div>
                    
                    <button type="submit" className={styles.submitButton}>
                        Register
                    </button>
                </form>
            </div>
            
            <div className={styles.modalFooter}>
                <p>Already have an account?</p>
                <button 
                    type="button" 
                    onClick={onSwitchToLogin}
                    className={styles.linkText}
                >
                    Login here
                </button>
            </div>
        </>
    );
}
