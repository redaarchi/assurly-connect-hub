
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, HelpCircle, Ticket, Send } from 'lucide-react';

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  messages: Array<{
    id: string;
    content: string;
    sender: 'user' | 'support';
    timestamp: Date;
  }>;
  createdAt: Date;
}

const SupportModule: React.FC = () => {
  const [tickets] = useState<SupportTicket[]>([
    {
      id: 'TICK-001',
      subject: 'Question sur mon contrat auto',
      status: 'open',
      priority: 'medium',
      messages: [
        {
          id: '1',
          content: 'Bonjour, j\'ai une question concernant la franchise de mon contrat auto.',
          sender: 'user',
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          id: '2',
          content: 'Bonjour, nous allons examiner votre contrat et revenir vers vous rapidement.',
          sender: 'support',
          timestamp: new Date(Date.now() - 1800000)
        }
      ],
      createdAt: new Date(Date.now() - 86400000)
    }
  ]);

  const [newTicket, setNewTicket] = useState({ subject: '', message: '' });
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const faqItems = [
    {
      question: 'Comment modifier mon contrat ?',
      answer: 'Vous pouvez demander une modification via votre espace client ou en contactant votre agent.'
    },
    {
      question: 'Quand dois-je renouveler mon contrat ?',
      answer: 'Votre contrat se renouvelle automatiquement. Vous recevrez une notification 30 jours avant l\'échéance.'
    },
    {
      question: 'Comment déclarer un sinistre ?',
      answer: 'Utilisez le formulaire de déclaration dans la section "Sinistres" de votre espace client.'
    },
    {
      question: 'Puis-je payer en plusieurs fois ?',
      answer: 'Oui, des options de paiement échelonné sont disponibles lors de la souscription.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const createTicket = () => {
    if (!newTicket.subject || !newTicket.message) return;
    
    // Ici on créerait un nouveau ticket
    console.log('Nouveau ticket:', newTicket);
    setNewTicket({ subject: '', message: '' });
  };

  const sendMessage = (ticketId: string) => {
    if (!newMessage.trim()) return;
    
    // Ici on enverrait le message
    console.log('Nouveau message pour', ticketId, ':', newMessage);
    setNewMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Centre d'aide et support</h1>
      
      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="tickets" className="flex items-center gap-2">
            <Ticket className="h-4 w-4" />
            Mes tickets
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Chat support
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Questions fréquemment posées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Créer un nouveau ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sujet</label>
                  <Input
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Décrivez brièvement votre problème"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={newTicket.message}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Décrivez votre problème en détail"
                    rows={4}
                  />
                </div>
                <Button onClick={createTicket} className="w-full">
                  Créer le ticket
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mes tickets de support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{ticket.subject}</h4>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">#{ticket.id}</p>
                      
                      {selectedTicket === ticket.id && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                            {ticket.messages.map((message) => (
                              <div
                                key={message.id}
                                className={`p-2 rounded ${
                                  message.sender === 'user' ? 'bg-blue-50 ml-4' : 'bg-gray-50 mr-4'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {message.timestamp.toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              placeholder="Tapez votre message..."
                              onKeyPress={(e) => e.key === 'Enter' && sendMessage(ticket.id)}
                            />
                            <Button size="sm" onClick={() => sendMessage(ticket.id)}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Chat en direct avec le support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Chat support temporairement indisponible</h3>
                <p className="text-gray-600 mb-4">
                  Nos agents sont actuellement occupés. Vous pouvez créer un ticket de support
                  ou utiliser notre assistant IA.
                </p>
                <Button variant="outline">
                  Créer un ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportModule;
