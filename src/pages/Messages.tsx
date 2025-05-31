
import React, { useState } from 'react';
import { Send, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const Messages = () => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');

  const mockMessages = [
    {
      id: 1,
      sender: 'Agent Martin',
      message: 'Votre contrat a été approuvé. Vous pouvez maintenant procéder au paiement.',
      timestamp: '2024-01-25 14:30',
      isFromUser: false
    },
    {
      id: 2,
      sender: 'Vous',
      message: 'Merci pour l\'information. Quand dois-je effectuer le premier paiement ?',
      timestamp: '2024-01-25 14:35',
      isFromUser: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="animate-fade-in max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Messagerie
              </h1>
              <p className="text-gray-600">
                Communiquez avec vos agents et clients
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Conversations List */}
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Agent Martin</h4>
                          <p className="text-sm text-gray-600">Contrat automobile</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Conversation avec Agent Martin</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
                      {mockMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isFromUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.isFromUser ? 'bg-blue-500 text-white' : 'bg-white border'}`}>
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.isFromUser ? 'text-blue-100' : 'text-gray-500'}`}>
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Tapez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={2}
                        className="flex-1"
                      />
                      <Button className="hover-scale">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
