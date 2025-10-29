'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  fromUser: {
    username: string;
    profilePicture?: string;
  };
  content: string;
  timestamp: Date;
  isRead: boolean;
  postId?: string;
}

export default function UserNotificationsPage() {
  const params = useParams();
  const userNickname = params.nickname as string;
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      fromUser: {
        username: 'alice_smith',
        profilePicture: 'https://i.pravatar.cc/40?img=1'
      },
      content: 'liked your post',
      timestamp: new Date('2024-01-15T14:30:00'),
      isRead: false,
      postId: 'post123'
    },
    {
      id: '2',
      type: 'comment',
      fromUser: {
        username: 'bob_wilson',
        profilePicture: 'https://i.pravatar.cc/40?img=2'
      },
      content: 'commented on your post: "Great shot!"',
      timestamp: new Date('2024-01-15T13:45:00'),
      isRead: false,
      postId: 'post456'
    },
    {
      id: '3',
      type: 'follow',
      fromUser: {
        username: 'charlie_brown',
        profilePicture: 'https://i.pravatar.cc/40?img=3'
      },
      content: 'started following you',
      timestamp: new Date('2024-01-15T12:20:00'),
      isRead: true,
      postId: undefined
    },
    {
      id: '4',
      type: 'mention',
      fromUser: {
        username: 'diana_prince',
        profilePicture: 'https://i.pravatar.cc/40?img=4'
      },
      content: 'mentioned you in a post',
      timestamp: new Date('2024-01-15T11:15:00'),
      isRead: true,
      postId: 'post789'
    }
  ]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return '❤️';
      case 'comment':
        return '💬';
      case 'follow':
        return '👤';
      case 'mention':
        return '📝';
      default:
        return '🔔';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-200">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <img
                      src={notification.fromUser.profilePicture}
                      alt={notification.fromUser.username}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">
                          {notification.fromUser.username}
                        </span>{' '}
                        {notification.content}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

