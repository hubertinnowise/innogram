'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import './chats.css';

interface Chat {
  id: string;
  userId: string;
  username: string;
  profilePicture?: string;
  lastMessage: {
    content: string;
    timestamp: Date;
    isRead: boolean;
  };
  unreadCount: number;
  isOnline: boolean;
}

export default function UserChatsPage() {
  const params = useParams();
  const userNickname = params.nickname as string;
  
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      userId: 'alice_smith',
      username: 'alice_smith',
      profilePicture: 'https://i.pravatar.cc/40?img=1',
      lastMessage: {
        content: 'Hey! How are you doing?',
        timestamp: new Date('2025-11-06T10:30:00'),
        isRead: true
      },
      unreadCount: 0,
      isOnline: true
    },
    {
      id: '2',
      userId: 'bob_wilson',
      username: 'bob_wilson',
      profilePicture: 'https://i.pravatar.cc/40?img=2',
      lastMessage: {
        content: 'Thanks for the help earlier!',
        timestamp: new Date('2025-11-05T16:45:00'),
        isRead: false
      },
      unreadCount: 2,
      isOnline: false
    },
    {
      id: '3',
      userId: 'charlie_brown',
      username: 'charlie_brown',
      profilePicture: 'https://i.pravatar.cc/40?img=3',
      lastMessage: {
        content: 'See you tomorrow!',
        timestamp: new Date('2025-11-04T14:20:00'),
        isRead: true
      },
      unreadCount: 0,
      isOnline: true
    },
    {
      id: '4',
      userId: 'diana_prince',
      username: 'diana_prince',
      profilePicture: 'https://i.pravatar.cc/40?img=4',
      lastMessage: {
        content: 'That was an amazing photo!',
        timestamp: new Date('2025-11-03T11:15:00'),
        isRead: true
      },
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '5',
      userId: 'eve_adams',
      username: 'eve_adams',
      profilePicture: 'https://i.pravatar.cc/40?img=5',
      lastMessage: {
        content: 'Can you send me that link again?',
        timestamp: new Date('2025-10-30T09:30:00'),
        isRead: false
      },
      unreadCount: 1,
      isOnline: true
    }
  ]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const totalUnreadCount = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  return (
    <div className="chatsContainer">
      <div className="chatsWrapper">
        {/* Header */}
        <div className="chatsHeader">
          <div className="chatsHeaderInner">
            <h1>
              Messages
            </h1>
          </div>
        </div>

        {/* Chats List */}
        <div className="chatsList">
          {chats.length === 0 ? (
            <div className="emptyState">
              <p>No conversations yet</p>
              <p className="emptyStateText">Start a conversation with someone!</p>
            </div>
          ) : (
            chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/user/${userNickname}/chats/${chat.userId}` as any}
                className={`chatLink ${chat.unreadCount > 0 ? 'chatLinkUnread' : ''}`}
              >
                <div className="chatItem">
                  {chat.unreadCount > 0 && (
                    <div className="unreadBadge">
                      {chat.unreadCount}
                    </div>
                  )}
                  <div className="avatarContainer">
                    <img
                      src={chat.profilePicture}
                      alt={chat.username}
                      className="avatar"
                    />
                    {chat.isOnline && (
                      <div className="onlineIndicator"></div>
                    )}
                  </div>
                  <div className="chatInfo">
                    <div className="chatHeader">
                      <h3 className="username">
                        {chat.username}
                      </h3>
                      <span className="timeText">
                        {formatTime(chat.lastMessage.timestamp)}
                      </span>
                    </div>
                    <p className={`messageContent ${
                      chat.unreadCount > 0 ? 'messageContentUnread' : 'messageContentRead'
                    }`}>
                      {chat.lastMessage.content}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

