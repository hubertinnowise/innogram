'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { HeartIcon, ChatBubbleLeftIcon, UserPlusIcon, AtSymbolIcon } from '@heroicons/react/24/solid';
import './notifications.css';

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
      timestamp: new Date('2025-11-06T10:30:00'),
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
      timestamp: new Date('2025-11-05T16:45:00'),
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
      timestamp: new Date('2025-11-04T14:20:00'),
      isRead: true,
      postId: undefined
    },
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
        return <HeartIcon className="notificationIconSvg notificationIconLike" />;
      case 'comment':
        return <ChatBubbleLeftIcon className="notificationIconSvg notificationIconComment" />;
      case 'follow':
        return <UserPlusIcon className="notificationIconSvg notificationIconFollow" />;
      case 'mention':
        return <AtSymbolIcon className="notificationIconSvg" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="notificationsContainer">
      <div className="notificationsWrapper">
        {/* Header */}
        <div className="notificationsHeader">
          <div className="notificationsHeaderInner">
            <h1>
              Notifications
            </h1>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="markAllReadButton"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="notificationsList">
          {notifications.length === 0 ? (
            <div className="emptyState">
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notificationItem ${
                  !notification.isRead ? 'notificationItemUnread' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notificationContent">
                  {!notification.isRead && (
                    <div className="unreadIndicator"></div>
                  )}
                  <div className="avatarContainer">
                    <img
                      src={notification.fromUser.profilePicture}
                      alt={notification.fromUser.username}
                      className="avatar"
                    />
                  </div>
                  <div className="notificationInfo">
                    <div className="notificationTextRow">
                      <p className="notificationText">
                        <span className="notificationUsername">
                          {notification.fromUser.username}
                        </span>{' '}
                        {notification.content}
                      </p>
                      <span className="notificationIcon">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <span className="notificationTime">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

