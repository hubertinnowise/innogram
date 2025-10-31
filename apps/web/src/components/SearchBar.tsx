'use client';

import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import '../styles/global.css';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const searchWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchWrapperRef.current &&
                !searchWrapperRef.current.contains(event.target as Node)
            ) {
                handleClose();
            }
        };

        if (isSearchExpanded && !isClosing) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchExpanded, isClosing]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsSearchExpanded(false);
            setIsClosing(false);
        }, 300); // Match animation duration
    };

    const handleToggle = () => {
        if (isSearchExpanded) {
            handleClose();
        } else {
            setIsSearchExpanded(true);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search query:', searchQuery);
        // Add your search logic here
    };

    return (
        <div className="search-wrapper" ref={searchWrapperRef}>
            <button
                type="button"
                onClick={handleToggle}
                className="search-icon-button"
                aria-label="Search"
            >
                <MagnifyingGlassIcon className="search-icon" />
            </button>
            {(isSearchExpanded || isClosing) && (
                <form 
                    onSubmit={handleSearch} 
                    className={`expanded-search-form ${isClosing ? 'closing' : ''}`}
                >
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                        autoFocus={!isClosing}
                    />
                </form>
            )}
        </div>
    );
}

