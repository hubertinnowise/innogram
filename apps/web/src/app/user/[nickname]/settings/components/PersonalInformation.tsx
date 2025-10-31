'use client';

import { useState } from 'react';
import styles from '../settings.module.css';

export default function PersonalInformation() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    
    // Mock data - in real app, these would come from user profile
    const firstName = 'John';
    const lastName = 'Doe';

    return (
        <div className={styles.tabContent}>
            <form onSubmit={(e) => e.preventDefault()} className={styles.settingsForm}>
                <div className={styles.settingsSection}>
                    <h3>Credentials</h3>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>First Name</label>
                        <div className={styles.readOnlyField}>{firstName}</div>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Last Name</label>
                        <div className={styles.readOnlyField}>{lastName}</div>
                    </div>
                </div>

                <div className={styles.settingsSection}>
                    <h3>Contact</h3>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phoneNumber" className={styles.label}>
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={styles.input}
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>
                </div>

                <div className={styles.formActions}>
                    <button
                        type="submit"
                        className={styles.submitButton}
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

