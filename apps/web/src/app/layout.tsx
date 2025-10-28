'use client';

import { ReactNode, useState, useEffect } from 'react';

import { Button } from '@/ui-shared/components/button/button';
import { LoginModal, RegisterModal, LogoutModal } from '../components/auth';

import '../styles/global.css';
import '../styles/page.css';
import Link from 'next/link';

import { CameraIcon, PlusCircleIcon, ArrowRightEndOnRectangleIcon, ChatBubbleBottomCenterTextIcon, InboxIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function RootLayout({ children }: { children: ReactNode }) {
    const [activeModal, setActiveModal] = useState<'login' | 'register' | 'logout' | null>(null);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [userNickname, setUserNickname] = useState<string | null>(null);
    
    const handleLogin = (email: string, password: string) => {
        console.log('Login attempt:', { email, password });
        // For demo purposes, set a mock user nickname
        setUserNickname('john_doe');
        setActiveModal(null);
    };
    
    const handleRegister = (name: string, email: string, password: string, confirmPassword: string) => {
        console.log('Register attempt:', { name, email, password, confirmPassword });
        // Add your register logic here
        setActiveModal(null);
    };
    
    const openRegisterModal = () => {
        setActiveModal('register');
    };
    
    const openLoginModal = () => {
        setActiveModal('login');
    };
    
    const handleLogout = () => {
        // Custom logout logic here
        setUserNickname(null);
        setActiveModal(null);
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
                    <Link href="/" className="logo-link">
                        <CameraIcon className="size-12" />
                        <p>Innogram</p>
                    </Link>
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
                        
                        {userNickname ? (
                            <div className="flex items-center gap-4">
                                <Link href={`/user/${userNickname}/chats` as any} className="flex items-center gap-2">
                                    <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                                </Link>
                                <Link href={`/user/${userNickname}/notifications` as any} className="flex items-center gap-2">
                                    <InboxIcon className="h-5 w-5" />
                                </Link>
                                <Link href="/posts/new" className="flex items-center gap-2">
                                    <PlusCircleIcon className="h-5 w-5" />
                                </Link>
                                <Link href={`/user/${userNickname}` as any} className="flex items-center">
                                    <img 
                                        src="https://i.pravatar.cc/40" 
                                        alt="profile-picture" 
                                        className="h-6 w-6 rounded-full object-cover"
                                    />
                                </Link>
                                <Button 
                                    onClick={() => setActiveModal('logout')}
                                    className="logout-button"
                                >
                                    <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
                                </Button>
                            </div>
                        ) : (
                        <Button 
                            onClick={() => setActiveModal('login')}
                            className="login-button"
                        >
                            Login
                        </Button>
                        )}
                    </div>
                </header>
                <main>{children}</main> 
                <footer>© 2025 Innogram</footer>
                
                {activeModal && (
                    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            {activeModal === 'login' && (
                                <LoginModal 
                                    isOpen={true}
                                    onClose={() => setActiveModal(null)}
                                    onLogin={handleLogin}
                                    onSwitchToRegister={openRegisterModal}
                                />
                            )}
                            
                            {activeModal === 'register' && (
                                <RegisterModal 
                                    isOpen={true}
                                    onClose={() => setActiveModal(null)}
                                    onRegister={handleRegister}
                                    onSwitchToLogin={openLoginModal}
                                />
                            )}
                            
                            {activeModal === 'logout' && (
                                <LogoutModal 
                                    isOpen={true}
                                    onClose={() => setActiveModal(null)}
                                    onLogout={handleLogout}
                                />
                            )}
                        </div>
                    </div>
                )}
            </body>
        </html>
    );
}
