'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

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
        timestamp: new Date('2024-01-15T14:30:00'),
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
        timestamp: new Date('2024-01-15T13:45:00'),
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
        timestamp: new Date('2024-01-15T12:20:00'),
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
        timestamp: new Date('2024-01-15T11:15:00'),
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
        timestamp: new Date('2024-01-15T10:30:00'),
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              Messages
            </h1>
            {totalUnreadCount > 0 && (
              <div className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                {totalUnreadCount}
              </div>
            )}
          </div>
        </div>

        {/* Chats List */}
        <div className="divide-y divide-gray-200">
          {chats.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No conversations yet</p>
              <p className="text-sm mt-1">Start a conversation with someone!</p>
            </div>
          ) : (
            chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/user/${userNickname}/chats/${chat.userId}` as any}
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={chat.profilePicture}
                      alt={chat.username}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {chat.username}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {formatTime(chat.lastMessage.timestamp)}
                        </span>
                        {chat.unreadCount > 0 && (
                          <div className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                            {chat.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm mt-1 truncate ${
                      chat.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'
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

