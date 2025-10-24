import styles from './user.module.css';
import Link from 'next/link';

interface UserPageProps {
    params: {
        nickname: string;
    };
}

export default function UserPage({ params }: UserPageProps) {
    const { nickname } = params;
    
    return (
        <div className={styles.userProfile}>
            <h1>User Profile: {nickname}</h1>
            <div className={styles.profileContent}>
                <p>Welcome to {nickname}'s profile!</p>
                
                <div className={styles.samplePosts}>
                    <h3>Recent Posts</h3>
                    <div className={styles.postList}>
                        <Link href="/posts/1" className={styles.postLink}>
                            Sample Post 1
                        </Link>
                        <Link href="/posts/2" className={styles.postLink}>
                            Sample Post 2
                        </Link>
                        <Link href="/posts/3" className={styles.postLink}>
                            Sample Post 3
                        </Link>
                    </div>
                </div>
                
                <div className={styles.profileActions}>
                    <Link href="/posts/new" className={styles.createPostLink}>
                        Create Post
                    </Link>
                    <Link href={`/user/${nickname}/settings` as any} className={styles.settingsLink}>
                        Settings
                    </Link>
                </div>
                {/* Add more profile content here */}
            </div>
        </div>
    );
}
