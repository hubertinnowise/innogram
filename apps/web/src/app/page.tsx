import '../styles/page.css';

import { HeartIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default function RootPage() {
    let posts = [
        {
            id: '1',
            authorId: 'user-1',
            avatarUrl: 'https://i.pravatar.cc/40?img=1',
            content: 'Just had an amazing sunset at the beach!',
            media: [
                {
                    id: 'media-1',
                    type: 'IMAGE',
                    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
                    position: 0,
                    width: 1920,
                    height: 1080
                }
            ],
            likesCount: 42,
            commentsCount: 8,
            createdAt: new Date('2024-01-15T10:30:00Z'),
            updatedAt: new Date('2024-01-15T10:30:00Z'),
            category: 'photography'
        },
        {
            id: '2',
            authorId: 'user-2',
            avatarUrl: 'https://i.pravatar.cc/40?img=2',
            content: 'Working on a new project today. The code is finally coming together! 💻',
            media: [
                {
                    id: 'media-3',
                    type: 'IMAGE',
                    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500',
                    position: 0,
                    width: 1920,
                    height: 1080
                }
            ],
            likesCount: 15,
            commentsCount: 3,
            createdAt: new Date('2024-01-14T16:45:00Z'),
            updatedAt: new Date('2024-01-14T16:45:00Z'),
            category: 'coding'
        },
        {
            id: '3',
            authorId: 'user-3',
            avatarUrl: 'https://i.pravatar.cc/40?img=3',
            content: 'Delicious homemade pasta for dinner tonight 🍝',
            media: [
                {
                    id: 'media-2',
                    type: 'IMAGE',
                    url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500',
                    position: 0,
                    width: 800,
                    height: 600
                }
            ],
            likesCount: 28,
            commentsCount: 12,
            createdAt: new Date('2024-01-13T19:20:00Z'),
            updatedAt: new Date('2024-01-13T19:20:00Z'),
            category: 'food'
        }
    ]
    
    return (
        <div className="root-page">
            <div className="posts-list">
                {posts.map((post) => (
                    <div key={post.id} className="post-item">
                        <div className="post-header">
                            <div className="author-info">
                                <img 
                                    src={post.avatarUrl} 
                                    alt="Author avatar" 
                                    className="author-avatar"
                                />
                                <span className="author">{post.authorId}</span>
                            </div>
                        </div>
                        <div className="post-content">
                            {post.media.length > 0 && (
                                <div className="post-media">
                                    {post.media.map((media) => (
                                        <img 
                                            key={media.id} 
                                            src={media.url} 
                                            alt="Post media" 
                                            className="post-image"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="post-stats">
                            <HeartIcon className="size-6" /><span style={{ marginLeft: '4px' }}>{post.likesCount}</span>
                            <ChatBubbleLeftIcon className="size-6" style={{ marginLeft: '4px' }} /><span style={{ marginLeft: '4px' }}>{post.commentsCount}</span>
                            <CalendarIcon className="size-6" style={{ marginLeft: 'auto' }} /><span style={{ marginLeft: '4px' }}>{post.createdAt.toLocaleDateString()}</span>
                        </div>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
