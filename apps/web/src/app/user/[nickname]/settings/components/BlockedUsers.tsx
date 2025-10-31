'use client';

import styles from '../settings.module.css';

export default function BlockedUsers() {
    return (
        <div className={styles.tabContent}>
            <form onSubmit={(e) => e.preventDefault()} className={styles.settingsForm}>
                <div className={styles.settingsSection}>
                    <h3>Blocked Users</h3>
                    <p className={styles.sectionDescription}>
                        Users you have blocked will appear here.
                    </p>
                    {/* Empty for now - will display list of blocked users in the future */}
                </div>
            </form>
        </div>
    );
}

