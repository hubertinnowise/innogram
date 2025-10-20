'use client';

import { ReactNode, useState, useEffect } from 'react';

import { Toaster } from '@/ui-shared/components/toaster';
import { Button } from '@/ui-shared/components/button/button';

import '../styles/global.css';
import Link from 'next/link';

import { CameraIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function RootLayout({ children }: { children: ReactNode }) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password });
        // Add your login logic here
        setIsLoginModalOpen(false);
        setEmail('');
        setPassword('');
    };
    
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register attempt:', { name, email, password, confirmPassword });
        // Add your register logic here
        setIsRegisterModalOpen(false);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };
    
    const openRegisterModal = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    };
    
    const openLoginModal = () => {
        setIsRegisterModalOpen(false);
        setIsLoginModalOpen(true);
    };
    
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search query:', searchQuery);
        // Add your search logic here
    };
    
    return (
        <html>
            <body>
                <header>
                    <div>
                        <CameraIcon className="size-12" />
                        <p>Innogram</p>
                    </div>
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-container">
                            <MagnifyingGlassIcon className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </form>
                    <div>
                        <Link href="/">Home</Link>
                        <Link href="/about">About</Link>
                        <Button 
                            onClick={() => setIsLoginModalOpen(true)}
                            className="login-button"
                        >
                            Login
                        </Button>
                    </div>
                </header>
                <main>{children}</main> 
                <footer>© 2025 Innogram</footer>
                <div className="absolute bottom-10 right-10">
                    <Toaster />
                </div>
                
                {isLoginModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsLoginModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Login</h2>
                                <button 
                                    className="close-button"
                                    onClick={() => setIsLoginModalOpen(false)}
                                >
                                    <XMarkIcon className="size-6" />
                                </button>
                            </div>
                            <form onSubmit={handleLogin} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <Button type="submit" className="submit-button">
                                    Login
                                </Button>
                            </form>
                            <div className="modal-footer">
                                <p>Don't have an account? <span className="link-text" onClick={openRegisterModal}>Register here</span></p>
                            </div>
                        </div>
                    </div>
                )}
                
                {isRegisterModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsRegisterModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Register</h2>
                                <button 
                                    className="close-button"
                                    onClick={() => setIsRegisterModalOpen(false)}
                                >
                                    <XMarkIcon className="size-6" />
                                </button>
                            </div>
                            <form onSubmit={handleRegister} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="register-name">Name</label>
                                    <input
                                        type="text"
                                        id="register-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="register-email">Email</label>
                                    <input
                                        type="email"
                                        id="register-email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="register-password">Password</label>
                                    <input
                                        type="password"
                                        id="register-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <Button type="submit" className="submit-button">
                                    Register
                                </Button>
                            </form>
                            <div className="modal-footer">
                                <p>Already have an account? <span className="link-text" onClick={openLoginModal}>Login here</span></p>
                            </div>
                        </div>
                    </div>
                )}
            </body>
        </html>
    );
}
