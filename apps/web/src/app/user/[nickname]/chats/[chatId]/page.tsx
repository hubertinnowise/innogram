'use client';

import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import './chat.css';

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [otherUser] = useState<User>({
    id: userNickname,
    username: userNickname,
    profilePicture: 'https://i.pravatar.cc/40'
  });
  
  const [lastActive] = useState<Date>(new Date('2025-11-06T14:30:00'));
  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = () => {
    if (messagesAreaRef.current && messagesEndRef.current) {
      messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(target) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji);
  };

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

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Active now';
    if (diffInMinutes < 60) return `Active ${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `Active ${Math.floor(diffInMinutes / 60)}h ago`;
    return `Active ${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="chatContainer">
      <div className="chatWrapper">
        {/* Header */}
        <div className="singleChatHeader">
          <div className="singleChatHeaderInner">
            <img 
              src={otherUser.profilePicture} 
              alt={otherUser.username}
              className="singleChatHeaderAvatar"
            />
            <div className="singleChatHeaderInfo">
              <h1>
                {otherUser.username}
              </h1>
              <p className="lastActive">
                {formatLastActive(lastActive)}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="messagesArea" ref={messagesAreaRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`messageWrapper ${
                message.senderId === 'current-user' ? 'messageWrapperSent' : 'messageWrapperReceived'
              }`}
            >
              {message.senderId !== 'current-user' && (
                <img 
                  src={otherUser.profilePicture} 
                  alt={otherUser.username}
                  className="messageAvatar"
                />
              )}
              <div
                className={`messageBubble ${
                  message.senderId === 'current-user'
                    ? 'messageBubbleSent'
                    : 'messageBubbleReceived'
                }`}
              >
                <p className="messageContent">{message.content}</p>
                <p className={`messageTime ${
                  message.senderId === 'current-user' 
                    ? 'messageTimeSent' 
                    : 'messageTimeReceived'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="messageInputArea">
          <div className="emojiPickerContainer" ref={emojiPickerRef}>
            {showEmojiPicker && (
              <div className="emojiPickerWrapper">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="messageForm">
            <button
              type="button"
              ref={emojiButtonRef}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="emojiButton"
            >
              <FaceSmileIcon className="emojiIcon" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="messageInput"
            />
            <button
              type="submit"
              className="sendButton"
            >
              <PaperAirplaneIcon className="sendIcon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
