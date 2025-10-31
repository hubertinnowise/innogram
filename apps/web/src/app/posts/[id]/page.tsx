import styles from './post.module.css';
import Link from 'next/link';
import { HeartIcon, ChatBubbleLeftIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface PostPageProps {
    params: {
        id: string;
    };
}

export default function PostPage({ params }: PostPageProps) {
    const { id } = params;
    
    // Mock post data - in real app, this would come from API
    const post = {
        id: id,
        authorId: 'user-1',
        avatarUrl: 'https://i.pravatar.cc/40?img=1',
        content: 'Just had an amazing sunset at the beach!',
        media: [
            {
                id: 'media-1',
                type: 'IMAGE',
                url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
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
    };
    
    return (
        <div className={styles.postContainer}>
            <div className={styles.postHeader}>
                <div className={styles.authorInfo}>
                    <img 
                        src={post.avatarUrl} 
                        alt="Author avatar" 
                        className={styles.authorAvatar}
                    />
                    <Link href={`/user/${post.authorId}`} className={styles.authorLink}>
                        <span className={styles.author}>{post.authorId}</span>
                    </Link>
                </div>
                <div className={styles.postMeta}>
                    <CalendarIcon className={styles.icon} />
                    <span className={styles.postDate}>{post.createdAt.toLocaleDateString()}</span>
                </div>
            </div>
            
            {post.media.length > 0 && (
                <div className={styles.postMedia}>
                    {post.media.map((media) => (
                        <img 
                            key={media.id} 
                            src={media.url} 
                            alt="Post media" 
                            className={styles.postImage}
                        />
                    ))}
                </div>
            )}
            
            <div className={styles.postInfo}>
                <div className={styles.postStats}>
                    <div className={styles.statItem}>
                        <HeartIcon className={styles.icon} />
                        <span>{post.likesCount}</span>
                    </div>
                    <div className={styles.statItem}>
                        <ChatBubbleLeftIcon className={styles.icon} />
                        <span>{post.commentsCount}</span>
                    </div>
                </div>
                <p className={styles.postContent}>{post.content}</p>
            </div>
            
            <div className={styles.postActions}>
                <button className={styles.actionButton}>Like</button>
                <button className={styles.actionButton}>Comment</button>
                <button className={styles.actionButton}>Share</button>
            </div>
        </div>
    );
}
