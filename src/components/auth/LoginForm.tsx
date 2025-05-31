
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans votre espace personnel",
      });
      navigate('/');
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await resetPassword(resetEmail);
    
    if (success) {
      toast({
        title: "Email envoyé",
        description: "Un lien de réinitialisation a été envoyé à votre adresse email",
      });
      setShowResetForm(false);
      setResetEmail('');
    } else {
      toast({
        title: "Erreur",
        description: "Aucun compte trouvé avec cette adresse email",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  if (showResetForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Réinitialiser le mot de passe</CardTitle>
            <CardDescription>
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <Label htmlFor="resetEmail">Email</Label>
                <Input
                  id="resetEmail"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Envoi..." : "Envoyer"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowResetForm(false)}
                  className="flex-1"
                >
                  Retour
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Connexion</CardTitle>
          <CardDescription className="text-center">
            Accédez à votre espace personnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={() => setShowResetForm(true)}
              className="text-sm"
            >
              Mot de passe oublié ?
            </Button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
            <p className="font-semibold mb-2">Comptes de démonstration :</p>
            <div className="space-y-1 text-xs">
              <p><strong>Client:</strong> client@demo.com</p>
              <p><strong>Agent:</strong> agent@demo.com</p>
              <p><strong>Admin:</strong> admin@demo.com</p>
              <p className="text-gray-600 mt-2">Mot de passe : demo123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
