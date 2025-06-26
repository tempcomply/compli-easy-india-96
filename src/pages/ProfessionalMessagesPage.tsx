
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Paperclip, Search, Filter, User, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

interface ChatMessage {
  id: string;
  sender: 'professional' | 'client';
  message: string;
  timestamp: string;
  attachments?: string[];
}

interface ClientChat {
  id: string;
  clientName: string;
  serviceName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'completed' | 'pending';
  avatar?: string;
}

const dummyChats: ClientChat[] = [
  {
    id: '1',
    clientName: 'Rajesh Sharma',
    serviceName: 'GST Registration',
    lastMessage: 'Please provide the documents for GST registration',
    lastMessageTime: '2024-03-20 14:30',
    unreadCount: 2,
    status: 'active',
  },
  {
    id: '2',
    clientName: 'Priya Industries',
    serviceName: 'Income Tax Filing',
    lastMessage: 'ITR filing completed successfully',
    lastMessageTime: '2024-03-19 16:45',
    unreadCount: 0,
    status: 'completed',
  },
  {
    id: '3',
    clientName: 'Tech Solutions Ltd',
    serviceName: 'TDS Compliance',
    lastMessage: 'Need clarification on TDS rates',
    lastMessageTime: '2024-03-18 11:20',
    unreadCount: 1,
    status: 'pending',
  },
];

const dummyMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'client',
    message: 'Hello, I need help with GST registration for my new business.',
    timestamp: '2024-03-20 10:00',
  },
  {
    id: '2',
    sender: 'professional',
    message: 'Sure! I can help you with that. Please provide your business details and PAN card.',
    timestamp: '2024-03-20 10:15',
  },
  {
    id: '3',
    sender: 'client',
    message: 'I have attached the required documents.',
    timestamp: '2024-03-20 14:30',
    attachments: ['PAN_Card.pdf', 'Address_Proof.pdf'],
  },
];

const ProfessionalMessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = dummyChats.filter(chat =>
    chat.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChatData = dummyChats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <MessageSquare className="h-8 w-8" />
              Client Messages
            </h1>
            <p className="text-muted-foreground">
              Communicate with your clients about their services and compliance needs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <Badge variant="outline">{filteredChats.length}</Badge>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-[500px] overflow-y-auto">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 cursor-pointer hover:bg-muted/50 border-l-2 ${
                      selectedChat === chat.id ? 'bg-muted border-l-primary' : 'border-l-transparent'
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>
                          {chat.clientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm truncate">{chat.clientName}</h4>
                          <div className="flex items-center gap-1">
                            {chat.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                {chat.unreadCount}
                              </Badge>
                            )}
                            <Clock className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${getStatusColor(chat.status)} text-xs`}>
                            {chat.serviceName}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {chat.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(chat.lastMessageTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2">
            {selectedChatData ? (
              <>
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChatData.avatar} />
                      <AvatarFallback>
                        {selectedChatData.clientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedChatData.clientName}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(selectedChatData.status)} text-xs`}>
                          {selectedChatData.serviceName}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {selectedChatData.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex flex-col h-[400px]">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 p-4">
                    {dummyMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'professional' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === 'professional'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          {message.attachments && (
                            <div className="mt-2 space-y-1">
                              {message.attachments.map((attachment, index) => (
                                <div key={index} className="text-xs flex items-center gap-1">
                                  <Paperclip className="h-3 w-3" />
                                  {attachment}
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t pt-4">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 resize-none"
                        rows={2}
                      />
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleSendMessage} size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a client conversation to start messaging
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfessionalMessagesPage;
