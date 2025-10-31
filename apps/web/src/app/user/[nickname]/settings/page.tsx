'use client';

import { useState } from 'react';
import styles from './settings.module.css';
import AccountDetails from './components/AccountDetails';
import PersonalInformation from './components/PersonalInformation';
import Security from './components/Security';
import BlockedUsers from './components/BlockedUsers';
import DeleteAccount from './components/DeleteAccount';

interface UserSettingsPageProps {
    params: {
        nickname: string;
    };
}

type TabType = 'account' | 'personal' | 'security' | 'blockedUsers' | 'deleteAccount';

export default function UserSettingsPage({ params }: UserSettingsPageProps) {
    const { nickname } = params;
    const [activeTab, setActiveTab] = useState<TabType>('account');

    const tabs = [
        { id: 'account' as TabType, label: 'Account Details' },
        { id: 'personal' as TabType, label: 'Personal Information' },
        { id: 'security' as TabType, label: 'Security' },
        { id: 'blockedUsers' as TabType, label: 'Blocked Users' },
        { id: 'deleteAccount' as TabType, label: 'Delete your account' }
    ];

    return (
        <div className={styles.settingsContainer}>
            <h2>Settings</h2>
            
            <div className={styles.settingsLayout}>
                <div className={styles.tabsSidebar}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className={styles.contentArea}>
                    {activeTab === 'account' && <AccountDetails />}
                    {activeTab === 'personal' && <PersonalInformation />}
                    {activeTab === 'security' && <Security />}
                    {activeTab === 'blockedUsers' && <BlockedUsers />}
                    {activeTab === 'deleteAccount' && <DeleteAccount />}
                </div>
            </div>
        </div>
    );
}
