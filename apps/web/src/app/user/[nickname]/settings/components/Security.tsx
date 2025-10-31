'use client';

import { useState } from 'react';
import styles from '../settings.module.css';

export default function Security() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        // Validate all fields are filled
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
        
        // Validate new password matches confirm password
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }
        
        // TODO: Validate current password against actual password (to be added later)
        
        setIsSubmitting(true);
        
        // Mock submission - in real app, this would call your API
        console.log('Changing password');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitting(false);
        setSuccess('Password changed successfully!');
        
        // Clear password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className={styles.tabContent}>
            <form onSubmit={handleSubmit} className={styles.settingsForm}>
                <div className={styles.settingsSection}>
                    <h3>Change Password</h3>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="currentPassword" className={styles.label}>
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className={styles.input}
                            placeholder="Enter current password"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="newPassword" className={styles.label}>
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={styles.input}
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword" className={styles.label}>
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={styles.input}
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className={styles.successMessage}>
                            {success}
                        </div>
                    )}

                    <div className={styles.formActions}>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Changing...' : 'Change Password'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

