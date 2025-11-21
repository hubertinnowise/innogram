'use client';

import './connections.css';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type ConnectionType = 'followers' | 'followees';

interface UserConnection {
    id: string;
    fullName: string;
    nickname: string;
    avatarUrl: string;
    bioSnippet: string;
    isFollowing: boolean;
    followsYou?: boolean;
}

interface ConnectionsPageProps {
    params: {
        nickname: string;
    };
    searchParams?: {
        view?: string;
    };
}

const MOCK_CONNECTIONS: Record<ConnectionType, UserConnection[]> = {
    followers: [
        {
            id: '1',
            fullName: 'Ayla Navarro',
            nickname: 'ayla',
            avatarUrl: 'https://i.pravatar.cc/150?img=3',
            bioSnippet: 'Product designer, coffee lover, Berlin.',
            isFollowing: false,
            followsYou: true,
        },
        {
            id: '2',
            fullName: 'Mateo García',
            nickname: 'mateo',
            avatarUrl: 'https://i.pravatar.cc/150?img=5',
            bioSnippet: 'Building delightful mobile apps at Onyx.',
            isFollowing: true,
            followsYou: true,
        },
        {
            id: '3',
            fullName: 'Priya Kapoor',
            nickname: 'priyak',
            avatarUrl: 'https://i.pravatar.cc/150?img=8',
            bioSnippet: 'Community builder. DM me for collabs.',
            isFollowing: false,
            followsYou: false,
        },
    ],
    followees: [
        {
            id: '4',
            fullName: 'Liam Chen',
            nickname: 'liamchen',
            avatarUrl: 'https://i.pravatar.cc/150?img=10',
            bioSnippet: 'Open source advocate and weekend photographer.',
            isFollowing: true,
            followsYou: true,
        },
        {
            id: '5',
            fullName: 'Sofia Alves',
            nickname: 'sofi',
            avatarUrl: 'https://i.pravatar.cc/150?img=12',
            bioSnippet: 'Writes about AI & product thinking.',
            isFollowing: true,
            followsYou: false,
        },
        {
            id: '6',
            fullName: 'Jonas Müller',
            nickname: 'jonasm',
            avatarUrl: 'https://i.pravatar.cc/150?img=16',
            bioSnippet: 'Founder @Northwind. Running dad.',
            isFollowing: true,
            followsYou: false,
        },
    ],
};

const TABS: { key: ConnectionType; label: string }[] = [
    { key: 'followers', label: 'Followers' },
    { key: 'followees', label: 'Following' },
];

export default function ConnectionsPage({ params, searchParams }: ConnectionsPageProps) {
    const initialTab = useMemo<ConnectionType>(() => {
        return searchParams?.view === 'followees' ? 'followees' : 'followers';
    }, [searchParams?.view]);
    const [activeTab, setActiveTab] = useState<ConnectionType>(initialTab);
    const [followStatuses, setFollowStatuses] = useState<Record<string, boolean>>(() => {
        const initialStatuses: Record<string, boolean> = {};
        Object.values(MOCK_CONNECTIONS).forEach((connections) => {
            connections.forEach((connection) => {
                initialStatuses[connection.id] = connection.isFollowing;
            });
        });
        return initialStatuses;
    });

    const handleFollowToggle = (connectionId: string) => {
        setFollowStatuses((prev) => ({
            ...prev,
            [connectionId]: !prev[connectionId],
        }));
    };

    const visibleConnections = MOCK_CONNECTIONS[activeTab];

    return (
        <div className="connections-page">
            <div className="connections-heading" role="heading" aria-level={2}>
                Connections of{' '}
                <Link href={`/user/${params.nickname}` as any} className="connections-link">
                    @{params.nickname}
                </Link>
            </div>

            <nav className="connections-tabs" role="tablist" aria-label="Connection type">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.key}
                        className={`connections-tab ${activeTab === tab.key ? 'is-active' : ''}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        <span>{tab.label}</span>
                        <span className="connections-tab-count">{MOCK_CONNECTIONS[tab.key].length}</span>
                    </button>
                ))}
            </nav>

            <section className="connections-list" aria-live="polite">
                {visibleConnections.length === 0 ? (
                    <p className="connections-empty">
                        No {activeTab === 'followers' ? 'followers' : 'followees'} to show yet.
                    </p>
                ) : (
                    visibleConnections.map((connection) => {
                        const profileHref = `/user/${connection.nickname}`;
                        const isFollowing = followStatuses[connection.id];

                        return (
                            <div key={connection.id} className="connections-user">
                                <Link
                                    href={profileHref as any}
                                    className="connections-user-main"
                                    role="button"
                                    aria-label={`View ${connection.fullName}'s profile`}
                                >
                                    <img
                                        src={connection.avatarUrl}
                                        alt={`${connection.fullName} avatar`}
                                        className="connections-avatar"
                                    />

                                    <div className="connections-user-details">
                                        <div className="connections-user-heading">
                                            <span className="connections-user-name">{connection.fullName}</span>
                                            <span className="connections-user-handle">@{connection.nickname}</span>
                                            {connection.followsYou ? (
                                                <span className="connections-user-follow-state">Follows you</span>
                                            ) : null}
                                        </div>
                                        <p className="connections-user-bio">{connection.bioSnippet}</p>
                                    </div>
                                </Link>

                                <button
                                    type="button"
                                    className="connections-user-action"
                                    onClick={() => handleFollowToggle(connection.id)}
                                    aria-pressed={isFollowing}
                                >
                                    {isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                        );
                    })
                )}
            </section>
        </div>
    );
}

