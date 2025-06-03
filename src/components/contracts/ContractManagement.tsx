import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Download, Edit, FileText, Calendar, CreditCard } from 'lucide-react';

interface Contract {
  id: string;
  type: 'auto' | 'habitation' | 'sante' | 'vie';
  status: 'active' | 'expired' | 'pending' | 'cancelled';
  startDate: Date;
  endDate: Date;
  premium: number;
  details: Record<string, string>;
  documents: string[];
}

const ContractManagement: React.FC = () => {
  const [contracts] = useState<Contract[]>([
    {
      id: 'CONT-001',
      type: 'auto',
      status: 'active',
      startDate: new Date(2024, 0, 15),
      endDate: new Date(2025, 0, 15),
      premium: 89.50,
      details: {
        vehicle: 'Peugeot 308',
        coverage: 'Tous risques'
      },
      documents: ['contrat.pdf', 'attestation.pdf']
    },
    {
      id: 'CONT-002',
      type: 'habitation',
      status: 'active',
      startDate: new Date(2023, 11, 1),
      endDate: new Date(2024, 11, 1),
      premium: 156.80,
      details: {
        address: '123 Rue de la Paix, Paris',
        surface: '75m²'
      },
      documents: ['contrat-habitation.pdf', 'inventaire.pdf']
    }
  ]);

  const [modificationRequest, setModificationRequest] = useState({
    contractId: '',
    type: '',
    description: '',
    justification: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'auto': return '🚗';
      case 'habitation': return '🏠';
      case 'sante': return '💊';
      case 'vie': return '🛡️';
      default: return '📄';
    }
  };

  const requestModification = () => {
    console.log('Demande de modification:', modificationRequest);
    setModificationRequest({
      contractId: '',
      type: '',
      description: '',
      justification: ''
    });
  };

  const downloadDocument = (document: string) => {
    console.log('Téléchargement:', document);
    // Ici, on déclencherait le téléchargement du document
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mes Contrats</h2>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Nouveau contrat
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contracts.map((contract) => (
          <Card key={contract.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getTypeIcon(contract.type)}</span>
                  <div>
                    <CardTitle className="text-lg">
                      Contrat {contract.type}
                    </CardTitle>
                    <p className="text-sm text-gray-600">#{contract.id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(contract.status)}>
                  {contract.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Début :</span>
                  <p>{contract.startDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium">Fin :</span>
                  <p>{contract.endDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium">Prime mensuelle :</span>
                  <p className="text-green-600 font-medium">{contract.premium}€</p>
                </div>
                <div>
                  <span className="font-medium">Prochaine échéance :</span>
                  <p className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Détails du contrat :</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  {Object.entries(contract.details).map(([key, value]) => (
                    <p key={key}>
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')} :</span> {value}
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Documents :</h4>
                <div className="flex flex-wrap gap-2">
                  {contract.documents.map((doc, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => downloadDocument(doc)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {doc}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Demande de modification</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Type de modification</label>
                        <Input
                          value={modificationRequest.type}
                          onChange={(e) => setModificationRequest(prev => ({ ...prev, type: e.target.value }))}
                          placeholder="Ex: Changement d'adresse, ajout de garantie..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea
                          value={modificationRequest.description}
                          onChange={(e) => setModificationRequest(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Décrivez en détail la modification souhaitée"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Justification</label>
                        <Textarea
                          value={modificationRequest.justification}
                          onChange={(e) => setModificationRequest(prev => ({ ...prev, justification: e.target.value }))}
                          placeholder="Expliquez pourquoi cette modification est nécessaire"
                          rows={2}
                        />
                      </div>
                      <Button onClick={requestModification} className="w-full">
                        Envoyer la demande
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm" className="flex-1">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContractManagement;
