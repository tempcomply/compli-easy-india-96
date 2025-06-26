
import React, { useState } from 'react';
import { MessageCircle, X, Send, Minimize2, Paperclip, Plus, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

interface TeamMember {
  id: string;
  name: string;
  role: 'ca' | 'cs' | 'lawyer' | 'compliance_manager';
  avatar?: string;
  isOnline: boolean;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'professional';
  timestamp: Date;
  senderName: string;
  attachments?: FileAttachment[];
}

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface Chat {
  id: string;
  title: string;
  serviceType: string;
  teamMember: TeamMember;
  messages: ChatMessage[];
  unreadCount: number;
  lastActivity: Date;
}

const complianceManager: TeamMember = {
  id: '1',
  name: 'Compliance Manager',
  role: 'compliance_manager',
  isOnline: true
};

const dummyChats: Chat[] = [
  {
    id: '1',
    title: 'GST Filing - March 2024',
    serviceType: 'GST Compliance',
    teamMember: { id: '2', name: 'CA Sharma', role: 'ca', isOnline: true },
    unreadCount: 2,
    lastActivity: new Date(Date.now() - 3600000),
    messages: [
      {
        id: '1',
        text: 'Hi! I need help with GST filing for March 2024.',
        sender: 'user',
        timestamp: new Date(Date.now() - 7200000),
        senderName: 'You'
      },
      {
        id: '2',
        text: 'Hello! I\'ll help you with the GST filing. Please share your sales invoices for March.',
        sender: 'professional',
        timestamp: new Date(Date.now() - 3600000),
        senderName: 'CA Sharma'
      }
    ]
  },
  {
    id: '2',
    title: 'Company Registration',
    serviceType: 'Legal Service',
    teamMember: { id: '3', name: 'Advocate Kumar', role: 'lawyer', isOnline: true },
    unreadCount: 0,
    lastActivity: new Date(Date.now() - 86400000),
    messages: [
      {
        id: '1',
        text: 'I want to register a new company. What documents do I need?',
        sender: 'user',
        timestamp: new Date(Date.now() - 86400000),
        senderName: 'You'
      }
    ]
  }
];

const FloatingCommunication = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'chat'>('list');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>(dummyChats);
  const [newMessage, setNewMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const totalUnreadCount = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
        senderName: 'You',
        attachments: attachedFiles.length > 0 ? attachedFiles.map(file => ({
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file)
        })) : undefined
      };

      setChats(chats.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, messages: [...chat.messages, newMsg], lastActivity: new Date() }
          : chat
      ));
      
      setNewMessage('');
      setAttachedFiles([]);
    }
  };

  const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachedFiles([...attachedFiles, ...files]);
  };

  const removeAttachedFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const handleCreateNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'General Inquiry',
      serviceType: 'General Support',
      teamMember: complianceManager,
      messages: [],
      unreadCount: 0,
      lastActivity: new Date()
    };
    setChats([newChat, ...chats]);
    setSelectedChat(newChat);
    setCurrentView('chat');
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setCurrentView('chat');
    setChats(chats.map(c => c.id === chat.id ? { ...c, unreadCount: 0 } : c));
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setCurrentView('list');
    setSelectedChat(null);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleOpen}
            className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
            {totalUnreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {totalUnreadCount}
              </Badge>
            )}
          </Button>
        </div>
      )}

      {/* Communication Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[600px]">
          <Card className="shadow-xl border-0 bg-background h-full flex flex-col">
            <CardHeader className="pb-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {currentView === 'list' && 'Messages'}
                  {currentView === 'chat' && selectedChat?.title}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMinimize}
                    className="h-8 w-8 p-0"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {!isMinimized && (
              <CardContent className="p-0 flex flex-col flex-1 overflow-hidden">
                {/* Chat List View */}
                {currentView === 'list' && (
                  <div className="flex flex-col h-full">
                    <ScrollArea className="flex-1 px-4">
                      <div className="space-y-2">
                        {chats.map((chat) => (
                          <div
                            key={chat.id}
                            onClick={() => handleChatSelect(chat)}
                            className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="font-medium text-sm truncate">{chat.title}</div>
                              {chat.unreadCount > 0 && (
                                <Badge variant="destructive" className="text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                  {chat.unreadCount}
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mb-1">{chat.serviceType}</div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${chat.teamMember.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
                                <span className="text-xs text-muted-foreground">{chat.teamMember.name}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {chat.lastActivity.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    {/* New Chat Button - Bottom Left */}
                    <div className="p-4 border-t">
                      <Button
                        onClick={handleCreateNewChat}
                        className="w-full"
                        size="sm"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        New Chat
                      </Button>
                    </div>
                  </div>
                )}

                {/* Chat View */}
                {currentView === 'chat' && selectedChat && (
                  <div className="flex flex-col h-full">
                    <div className="px-4 pb-2 border-b">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentView('list')}
                        className="h-8 mb-2"
                      >
                        ← Back to Messages
                      </Button>
                    </div>
                    
                    <ScrollArea className="flex-1 px-4">
                      <div className="space-y-3 py-4">
                        {selectedChat.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                                message.sender === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              <div className="font-medium text-xs mb-1 opacity-70">
                                {message.senderName}
                              </div>
                              <div>{message.text}</div>
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {message.attachments.map((file) => (
                                    <div key={file.id} className="flex items-center gap-2 p-1 bg-background/20 rounded text-xs">
                                      <File className="h-3 w-3" />
                                      <span className="truncate">{file.name}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="text-xs opacity-60 mt-1">
                                {message.timestamp.toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="p-4 border-t space-y-2">
                      {attachedFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {attachedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs">
                              <File className="h-3 w-3" />
                              <span className="truncate max-w-20">{file.name}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAttachedFile(index)}
                                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Textarea
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="min-h-[40px] max-h-[80px] resize-none pr-10"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                          />
                          <label className="absolute right-2 top-2 cursor-pointer">
                            <input
                              type="file"
                              multiple
                              onChange={handleFileAttach}
                              className="hidden"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                            />
                            <Paperclip className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                          </label>
                        </div>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          size="sm"
                          className="self-end"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Press Enter to send, Shift+Enter for new line
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default FloatingCommunication;
