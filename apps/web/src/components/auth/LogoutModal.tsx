'use client';

import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import styles from './LogoutModal.module.css';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

export function LogoutModal({ isOpen, onClose, onLogout }: LogoutModalProps) {
    if (!isOpen) return null;

    const handleLogout = () => {
        onLogout();
        onClose();
    };

    return (
        <>
            <div className={styles.modalHeader}>
                <div className={styles.headerContent}>
                    <h2>Logout</h2>
                </div>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
            </div>
            
            <div className={styles.modalBody}>
                <p className={styles.message}>
                    Are you sure you want to logout? You'll need to sign in again to access your account.
                </p>
            </div>
            
            <div className={styles.modalFooter}>
                <button 
                    onClick={handleLogout}
                    className={styles.logoutButton}
                >
                    Logout
                </button>
                <button 
                    onClick={onClose}
                    className={styles.cancelButton}
                >
                    No, take me back
                </button>
            </div>
        </>
    );
}
