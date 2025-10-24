'use client';

import { useState } from 'react';
import styles from './new-post.module.css';
import Link from 'next/link';

export default function NewPostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Mock submission - in real app, this would call your API
        console.log('Creating post:', { title, content });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Reset form
        setTitle('');
        setContent('');
        setIsSubmitting(false);
        
        // In real app, redirect to the new post
        alert('Post created successfully!');
    };

    return (
        <div className={styles.newPostContainer}>
            <div className={styles.header}>
                <h1>Create New Post</h1>
                <Link href="/" className={styles.backLink}>
                    ← Back to Home
                </Link>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.postForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>
                        Post Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                        placeholder="What's your post about?"
                        required
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label htmlFor="content" className={styles.label}>
                        Post Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={styles.textarea}
                        placeholder="Share your thoughts..."
                        rows={8}
                        required
                    />
                </div>
                
                <div className={styles.formActions}>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={() => {
                            setTitle('');
                            setContent('');
                        }}
                    >
                        Clear
                    </button>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}


