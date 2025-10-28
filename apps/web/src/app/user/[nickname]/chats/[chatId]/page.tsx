'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface User {
  id: string;
  username: string;
  profilePicture?: string;
}

export default function UserChatPage() {
  const params = useParams();
  const userNickname = params.nickname as string;
  const chatId = params.chatId as string;
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'current-user',
      receiverId: userNickname,
      content: 'Hey! How are you doing?',
      timestamp: new Date('2024-01-15T10:30:00'),
      isRead: true
    },
    {
      id: '2',
      senderId: userNickname,
      receiverId: 'current-user',
      content: 'I\'m doing great! Thanks for asking. How about you?',
      timestamp: new Date('2024-01-15T10:32:00'),
      isRead: true
    },
    {
      id: '3',
      senderId: 'current-user',
      receiverId: userNickname,
      content: 'Pretty good! Just working on some new features for the app.',
      timestamp: new Date('2024-01-15T10:35:00'),
      isRead: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [otherUser] = useState<User>({
    id: userNickname,
    username: userNickname,
    profilePicture: 'https://i.pravatar.cc/40'
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      receiverId: userNickname,
      content: newMessage,
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <img 
              src={otherUser.profilePicture} 
              alt={otherUser.username}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {otherUser.username}
              </h1>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.senderId === 'current-user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.senderId === 'current-user' 
                    ? 'text-blue-100' 
                    : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
