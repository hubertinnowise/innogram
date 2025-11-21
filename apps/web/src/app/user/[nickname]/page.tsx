import './user.css';
import Link from 'next/link';
import { LinkIcon, CalendarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface UserPageProps {
    params: {
        nickname: string;
    };
}

export default function UserPage({ params }: UserPageProps) {
    const { nickname } = params;
    const settingsPath = `/user/${nickname}/settings`;
    
    const samplePosts = [
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300&fit=crop'
    ];
    
    return (
        <div className="user-page">
            <div className="user-header"> 
                <div className="user-avatar">
                    <img src="https://i.pravatar.cc/40" alt="User Avatar" />
                </div>

                <div className="user-details">
                    <h2>Username</h2>
                    <div className="user-stats">
                        <p>Posts: 7</p>
                        <Link
                            href={`/user/${nickname}/connections?view=followers` as any}
                            className="user-stat-link"
                        >
                            Followers: 100
                        </Link>
                        <Link
                            href={`/user/${nickname}/connections?view=followees` as any}
                            className="user-stat-link"
                        >
                            Following: 100
                        </Link>
                    </div>
                </div>

                <Link href={settingsPath as any} className="settings-link">
                    <Cog6ToothIcon className="settings-icon" />
                </Link>
            </div>

            <div className="user-info">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                <p className="joined-info">
                    <CalendarIcon className="calendar-icon" />
                    Joined: 01-01-2025
                </p>
                <p>
                    <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="website-link">
                        <LinkIcon className="link-icon" />
                        samplewebsite.com
                    </a>
                </p>
            </div>
            <div className="user-actions">
                <button>Follow</button>
                <button>Message</button>
            </div>

            <div className="user-posts">    
                <div className="posts-grid">
                    {samplePosts.map((imageUrl, index) => (
                        <img 
                            key={index} 
                            src={imageUrl} 
                            alt={`Post ${index + 1}`} 
                            className="post-image" 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
