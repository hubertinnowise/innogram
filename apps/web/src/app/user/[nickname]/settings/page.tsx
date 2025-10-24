import styles from './settings.module.css';

interface UserSettingsPageProps {
    params: {
        nickname: string;
    };
}

export default function UserSettingsPage({ params }: UserSettingsPageProps) {
    const { nickname } = params;
    
    return (
        <div className={styles.settingsContainer}>
            <h1>Settings for {nickname}</h1>
            <div className={styles.settingsContent}>
                <div className={styles.settingsSection}>
                    <h2>Account Settings</h2>
                    <p>Manage your account preferences and security.</p>
                </div>
            </div>
        </div>
    );
}