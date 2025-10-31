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
        
        // Validate password if trying to change it
        if (newPassword && newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        if (newPassword && !currentPassword) {
            setError('Please enter your current password to change it.');
            return;
        }
        
        setIsSubmitting(true);
        
        // Mock submission - in real app, this would call your API
        console.log('Changing password:', {
            passwordChanged: !!newPassword
        });
        
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
            <form onSubmit={(e) => e.preventDefault()} className={styles.settingsForm}>
                <div className={styles.settingsSection}>
                    <h3>Change Password</h3>
                    <p className={styles.sectionDescription}>
                        Leave blank if you don't want to change your password.
                    </p>
                    
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
                            type="button"
                            onClick={handleSubmit}
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

