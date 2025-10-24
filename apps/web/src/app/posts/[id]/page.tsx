import styles from './post.module.css';
import Link from 'next/link';

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
        title: "Sample Post Title",
        content: "This is a sample post content. In a real application, this would be fetched from your database based on the post ID.",
        author: {
            nickname: "john_doe",
            name: "John Doe"
        },
        createdAt: "2025-01-21",
        likes: 42,
        comments: 8
    };
    
    return (
        <div className={styles.postContainer}>
            <div className={styles.postHeader}>
                <h1 className={styles.postTitle}>{post.title}</h1>
                <div className={styles.postMeta}>
                    <span className={styles.postDate}>{post.createdAt}</span>
                    <span className={styles.postStats}>
                        {post.likes} likes • {post.comments} comments
                    </span>
                </div>
            </div>
            
            <div className={styles.postContent}>
                <p>{post.content}</p>
            </div>
            
            <div className={styles.postAuthor}>
                <h3>Author</h3>
                <Link href={`/user/${post.author.nickname}`} className={styles.authorLink}>
                    {post.author.name} (@{post.author.nickname})
                </Link>
            </div>
            
            <div className={styles.postActions}>
                <button className={styles.actionButton}>Like</button>
                <button className={styles.actionButton}>Comment</button>
                <button className={styles.actionButton}>Share</button>
            </div>
        </div>
    );
}
