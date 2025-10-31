'use client';

import styles from '../settings.module.css';

export default function DeleteAccount() {
    return (
        <div className={styles.tabContent}>
            <form onSubmit={(e) => e.preventDefault()} className={styles.settingsForm}>
                <div className={styles.settingsSection}>
                    <h3>Delete Your Account</h3>
                    <p className={styles.sectionDescription}>
                        This section will allow you to delete your account.
                    </p>
                    {/* Empty for now */}
                </div>
            </form>
        </div>
    );
}

