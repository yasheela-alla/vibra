
import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  avatar?: string;
  timestamp: Date;
  color: string;
}

// Generate 10 random dummy messages
const generateDummyMessages = (): ChatMessage[] => {
  const usernames = ['GamerPro99', 'StreamLover', 'NinjaFan', 'ValorantGod', 'EPICgamer', 'TwitchPrime', 'VibraFan', 'LoL_Master', 'ReactDev', 'CSSWizard'];
  const messages = [
    'Hello everyone!',
    'This stream is amazing!',
    'LMAO 😂',
    'Let\'s go!',
    'GG',
    'F in the chat',
    'When is the next stream?',
    'First time here, loving it!',
    'Can we get a POG in the chat?',
    'What\'s your setup?',
    'Great play!',
    'I can\'t believe that just happened!',
    'You\'re insane!',
    'That\'s crazy skill',
    'How long have you been streaming?'
  ];
  const colors = ['#ff4d4d', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4d4dff', '#9900ff', '#ff00ff'];
  
  return Array.from({ length: 10 }, (_, i) => {
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      id: `msg-${i}`,
      username: randomUsername,
      message: randomMessage,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)),
      color: randomColor
    };
  }).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const StreamChat = () => {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<ChatMessage[]>(generateDummyMessages);
  const [newMessage, setNewMessage] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newChatMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      username: 'VibraUser',
      message: newMessage,
      timestamp: new Date(),
      color: '#8344FF'
    };
    
    setMessages(prev => [...prev, newChatMessage]);
    setNewMessage('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  if (isMobile && collapsed) {
    return (
      <Button
        variant="secondary"
        className="fixed bottom-20 right-4 z-40 rounded-full"
        onClick={() => setCollapsed(false)}
      >
        <ChevronUp className="mr-2 h-4 w-4" />
        Show Chat
      </Button>
    );
  }
  
  return (
    <Card className={`border-0 rounded-lg ${isMobile ? 'fixed bottom-16 left-0 right-0 z-40 rounded-b-none' : 'h-full'}`}>
      <CardHeader className="py-3 px-4 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Stream Chat</CardTitle>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCollapsed(true)}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0 overflow-hidden">
        <div 
          ref={chatContainerRef}
          className="flex flex-col space-y-2 p-4 h-[calc(100vh-16rem)] md:h-[calc(70vh-9rem)] overflow-y-auto"
        >
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-2">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={msg.avatar} alt={msg.username} />
                <AvatarFallback style={{ backgroundColor: msg.color }} className="text-white">
                  {msg.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate" style={{ color: msg.color }}>
                    {msg.username}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <p className="text-sm break-words">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-3 border-t">
        <div className="flex items-center w-full gap-2">
          <Input
            placeholder="Send a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={newMessage.trim() === ''}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StreamChat;
