
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Check, Pen, RotateCcw, Shield } from 'lucide-react';

interface ElectronicSignatureProps {
  document: any;
  onSignatureComplete: (signatureData: any) => void;
  onCancel: () => void;
}

const ElectronicSignature: React.FC<ElectronicSignatureProps> = ({
  document,
  onSignatureComplete,
  onCancel
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [step, setStep] = useState<'verify' | 'sign' | 'complete'>('verify');
  const { toast } = useToast();

  const sendVerificationCode = () => {
    // Simuler l'envoi d'un code SMS
    toast({
      title: "Code de vérification envoyé",
      description: "Un code à 6 chiffres a été envoyé à votre téléphone",
    });
    // Code de test : 123456
  };

  const verifyCode = () => {
    if (verificationCode === '123456') {
      setCodeVerified(true);
      setStep('sign');
      toast({
        title: "Code vérifié",
        description: "Vous pouvez maintenant procéder à la signature",
      });
    } else {
      toast({
        title: "Code incorrect",
        description: "Veuillez vérifier le code saisi",
        variant: "destructive",
      });
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const completeSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureData = canvas.toDataURL();
    const signatureInfo = {
      signature: signatureData,
      timestamp: new Date().toISOString(),
      documentId: document?.id,
      verified: true
    };

    onSignatureComplete(signatureInfo);
    setStep('complete');
    
    toast({
      title: "Signature enregistrée",
      description: "Votre contrat a été signé avec succès",
    });
  };

  if (step === 'verify') {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Vérification d'identité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Pour votre sécurité, nous devons vérifier votre identité avant la signature électronique.
          </p>
          
          <Button onClick={sendVerificationCode} className="w-full">
            Envoyer un code de vérification par SMS
          </Button>
          
          <div>
            <Label htmlFor="code">Code de vérification</Label>
            <Input
              id="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Entrez le code à 6 chiffres"
              maxLength={6}
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={verifyCode} disabled={verificationCode.length !== 6}>
              Vérifier
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Annuler
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'complete') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center p-8">
          <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Signature complétée</h3>
          <p className="text-gray-600 mb-4">
            Votre contrat a été signé électroniquement avec succès.
          </p>
          <Button onClick={() => onSignatureComplete(null)}>
            Continuer vers le paiement
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pen className="h-5 w-5" />
          Signature électronique
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Document à signer :</h4>
          <p className="text-sm text-gray-600">
            Contrat d'assurance {document?.type || 'Auto'} - Ref: {document?.id || 'CONT-001'}
          </p>
        </div>

        <div>
          <Label>Votre signature :</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              className="w-full h-48 border border-gray-200 rounded cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={clearSignature}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Effacer
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <p>
            En signant ce document, vous acceptez les termes et conditions du contrat.
            Cette signature électronique a la même valeur juridique qu'une signature manuscrite.
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={completeSignature} className="flex-1">
            Valider la signature
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ElectronicSignature;
