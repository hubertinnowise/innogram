'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { PlusIcon, Cross2Icon } from '@radix-ui/react-icons';
import './new-post.css';

interface ImagePreview {
    file: File;
    preview: string;
}

export default function NewPostPage() {
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<ImagePreview[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages = acceptedFiles
            .slice(0, 8 - images.length)
            .map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
        setImages(prev => [...prev, ...newImages]);
        setError(''); // Clear error when images are added
    }, [images.length]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
        },
        maxFiles: 8 - images.length,
        disabled: images.length >= 8
    });

    const removeImage = (index: number) => {
        setImages(prev => {
            const newImages = [...prev];
            URL.revokeObjectURL(newImages[index].preview);
            newImages.splice(index, 1);
            return newImages;
        });
    };

    // Cleanup preview URLs on unmount
    useEffect(() => {
        return () => {
            images.forEach(img => URL.revokeObjectURL(img.preview));
        };
    }, [images]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        // Validate that at least one image is added
        if (images.length === 0) {
            setError('Please add at least one image to create a post.');
            return;
        }
        
        setIsSubmitting(true);
        
        // Mock submission - in real app, this would call your API
        console.log('Adding post:', { description, images });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Clean up preview URLs
        images.forEach(img => URL.revokeObjectURL(img.preview));
        
        // Reset form
        setDescription('');
        setImages([]);
        setIsSubmitting(false);
        
        // In real app, redirect to the new post
        alert('Post added successfully!');
    };

    return (
        <div className="newPostContainer">
            <div className="newPostWrapper">
                <div className="header">
                    <div className="headerInner">
                        <h2>Add New Post</h2>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="postForm">
                <div className="formGroup">
                    <label className="label">Images</label>
                    {images.length > 0 && (
                        <div className="imagesGrid">
                            {images.map((image, index) => (
                                <div key={index} className="imagePreview">
                                    <img src={image.preview} alt={`Preview ${index + 1}`} />
                                    <button
                                        type="button"
                                        className="removeImageButton"
                                        onClick={() => removeImage(index)}
                                        aria-label="Remove image"
                                    >
                                        <Cross2Icon />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {images.length < 8 && (
                        <div
                            {...getRootProps()}
                            className={`uploadPanel ${isDragActive ? 'dragActive' : ''}`}
                        >
                            <input {...getInputProps()} />
                            <PlusIcon className="plusIcon" />
                            <p className="uploadText">
                                {isDragActive
                                    ? 'Drop images here...'
                                    : 'Click or drag images here'}
                            </p>
                            <p className="uploadSubtext">
                                {images.length}/8 images
                            </p>
                        </div>
                    )}
                    {error && (
                        <div className="errorMessage">
                            {error}
                        </div>
                    )}
                </div>

                <div className="formGroup">
                    <label htmlFor="description" className="label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea"
                        placeholder="What's this post about?"
                        rows={8}
                        maxLength={500}
                        required
                    />
                    <div className="charCounter">
                        {description.length}/500
                    </div>
                </div>
                
                <div className="formActions">
                    <button
                        type="submit"
                        className="submitButton"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Post'}
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
}


