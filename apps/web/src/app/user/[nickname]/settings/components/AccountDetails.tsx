'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import styles from '../settings.module.css';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { CameraIcon, PencilIcon, CheckIcon, XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import type { Area } from 'react-easy-crop';

interface UserSettingsPageProps {
    params: {
        nickname: string;
    };
}

export default function AccountDetails() {
    const [username, setUsername] = useState('john_doe'); // Mock current username
    const [editingUsername, setEditingUsername] = useState(false);
    const [tempUsername, setTempUsername] = useState('');
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    const [editingBio, setEditingBio] = useState(false);
    const [tempBio, setTempBio] = useState('');
    const bioTextareaRef = useRef<HTMLTextAreaElement>(null);
    const [profilePicture, setProfilePicture] = useState<string>('https://i.pravatar.cc/120');
    const [showCropModal, setShowCropModal] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>('');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    useEffect(() => {
        if (editingUsername && usernameInputRef.current) {
            usernameInputRef.current.focus();
        }
    }, [editingUsername]);

    useEffect(() => {
        if (editingBio && bioTextareaRef.current) {
            bioTextareaRef.current.focus();
        }
    }, [editingBio]);

    const handleEditUsername = () => {
        setTempUsername(username);
        setEditingUsername(true);
    };

    const handleSaveUsername = () => {
        if (tempUsername.trim()) {
            setUsername(tempUsername.trim());
        }
        setEditingUsername(false);
    };

    const handleCancelUsername = () => {
        setTempUsername('');
        setEditingUsername(false);
    };

    const handleEditBio = () => {
        setTempBio(bio);
        setEditingBio(true);
    };

    const handleSaveBio = () => {
        if (tempBio.trim().length <= 64) {
            setBio(tempBio.trim());
        }
        setEditingBio(false);
    };

    const handleCancelBio = () => {
        setTempBio('');
        setEditingBio(false);
    };

    const handleBioKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSaveBio();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            handleCancelBio();
        }
    };

    const handleBioBlur = () => {
        handleSaveBio();
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result as string);
                setShowCropModal(true);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
        },
        maxFiles: 1,
        noClick: !!imageSrc,
        noKeyboard: !!imageSrc
    });

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.src = url;
        });

    const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<string> => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('No 2d context');
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    return;
                }
                resolve(URL.createObjectURL(blob));
            }, 'image/jpeg');
        });
    };

    const handleSaveCrop = async () => {
        if (imageSrc && croppedAreaPixels) {
            try {
                const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
                setProfilePicture(croppedImageUrl);
                setShowCropModal(false);
                setImageSrc('');
                setCrop({ x: 0, y: 0 });
                setZoom(1);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleCancelCrop = () => {
        setShowCropModal(false);
        setImageSrc('');
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    };

    return (
        <div className={styles.tabContent}>
            <form onSubmit={(e) => e.preventDefault()} className={styles.settingsForm}>
                {/* Username Section */}
                <div className={styles.settingsSection}>
                    <h3>Username</h3>
                    <div className={styles.formGroup}>
                        {editingUsername ? (
                            <div className={styles.usernameEditContainer}>
                                <input
                                    ref={usernameInputRef}
                                    type="text"
                                    value={tempUsername}
                                    onChange={(e) => setTempUsername(e.target.value)}
                                    className={styles.input}
                                    placeholder="Enter your username"
                                />
                                <button
                                    type="button"
                                    onClick={handleSaveUsername}
                                    className={styles.iconButton}
                                    aria-label="Save username"
                                >
                                    <CheckIcon className={styles.icon} />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelUsername}
                                    className={styles.iconButton}
                                    aria-label="Cancel editing"
                                >
                                    <XMarkIcon className={styles.icon} />
                                </button>
                            </div>
                        ) : (
                            <div className={styles.usernameDisplayContainer}>
                                <span className={styles.usernameDisplay}>{username}</span>
                                <button
                                    type="button"
                                    onClick={handleEditUsername}
                                    className={styles.iconButton}
                                    aria-label="Edit username"
                                >
                                    <PencilIcon className={styles.icon} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Picture Section */}
                <div className={styles.settingsSection}>
                    <h3>Profile Picture</h3>
                    <div className={styles.profilePictureSection}>
                        <div className={styles.currentPicture}>
                            <img src={profilePicture} alt="Profile" />
                        </div>
                        <div {...getRootProps()} className={styles.uploadSectionInline}>
                            <input {...getInputProps()} />
                            <ArrowUpTrayIcon className={styles.uploadIconInline} />
                            <span className={styles.uploadLabelInline}>Upload new profile picture</span>
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                <div className={styles.settingsSection}>
                    <h3>Bio</h3>
                    <div className={styles.formGroup}>
                        {editingBio ? (
                            <div className={styles.bioEditInputWrapper}>
                                <textarea
                                    ref={bioTextareaRef}
                                    id="bio"
                                    value={tempBio}
                                    onChange={(e) => setTempBio(e.target.value)}
                                    onKeyDown={handleBioKeyDown}
                                    onBlur={handleBioBlur}
                                    className={styles.textarea}
                                    placeholder="Write a short bio..."
                                    rows={4}
                                    maxLength={64}
                                />
                                <div className={styles.charCounter}>
                                    {tempBio.length}/64
                                </div>
                            </div>
                        ) : (
                            <div className={styles.bioDisplayContainer}>
                                <span className={styles.bioDisplay}>{bio}</span>
                                <button
                                    type="button"
                                    onClick={handleEditBio}
                                    className={styles.iconButton}
                                    aria-label="Edit bio"
                                >
                                    <PencilIcon className={styles.icon} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </form>

            {/* Crop Modal */}
            {showCropModal && imageSrc && (
                <div 
                    className={styles.cropModalOverlay}
                    onClick={handleCancelCrop}
                >
                    <div 
                        className={styles.cropModal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.cropModalHeader}>
                            <h3>Crop Profile Picture</h3>
                            <button
                                type="button"
                                onClick={handleCancelCrop}
                                className={styles.closeButton}
                                aria-label="Close"
                            >
                                <XMarkIcon className={styles.icon} />
                            </button>
                        </div>
                        <div className={styles.cropContainer}>
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        <div className={styles.cropControls}>
                            <label className={styles.zoomLabel}>
                                Zoom:
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className={styles.zoomSlider}
                                />
                            </label>
                        </div>
                        <div className={styles.cropModalActions}>
                            <button
                                type="button"
                                onClick={handleCancelCrop}
                                className={styles.cancelCropButton}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveCrop}
                                className={styles.saveCropButton}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
