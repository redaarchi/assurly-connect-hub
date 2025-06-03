
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { apiService } from '@/services/apiService';
import { PersonalInfo } from '@/types/api';
import { Camera, Mail, Phone, MapPin, Calendar, User, Edit } from 'lucide-react';

const PersonalInfoCard: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const loadPersonalInfo = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getPersonalInfo();
      setPersonalInfo(response.data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les informations personnelles",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Format non supporté",
        description: "Veuillez sélectionner une image JPEG, PNG ou WebP",
        variant: "destructive",
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "Fichier trop volumineux",
        description: "L'image ne doit pas dépasser 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploadingImage(true);
      const response = await apiService.uploadProfileImage(file);
      setPersonalInfo(prev => prev ? {
        ...prev,
        profileImage: response.data.imageUrl
      } : null);
      toast({
        title: "Image mise à jour",
        description: "Votre photo de profil a été mise à jour avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'image",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl animate-fade-in">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="h-4 w-full max-w-xs" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!personalInfo) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Aucune information disponible</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <Avatar className="w-20 h-20 ring-4 ring-white shadow-lg">
                <AvatarImage 
                  src={personalInfo.profileImage} 
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`} 
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xl font-semibold">
                  {getInitials(personalInfo.firstName, personalInfo.lastName)}
                </AvatarFallback>
              </Avatar>
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="text-white" size={20} />
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploadingImage}
                />
              </label>
              {isUploadingImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-50 rounded-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {personalInfo.firstName} {personalInfo.lastName}
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                  Client
                </Badge>
              </CardTitle>
              <p className="text-gray-600 mt-1">Profil Client YAKEEN</p>
            </div>
          </div>
          
          <Button variant="outline" className="hover-scale" onClick={() => {
            toast({
              title: "Fonctionnalité à venir",
              description: "La modification du profil sera bientôt disponible",
            });
          }}>
            <Edit size={16} className="mr-2" />
            Modifier
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="text-blue-600" size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900 font-medium">{personalInfo.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="text-green-600" size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Téléphone</p>
                <p className="text-gray-900 font-medium">{personalInfo.phone}</p>
              </div>
            </div>

            {personalInfo.dateOfBirth && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-purple-600" size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date de naissance</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(personalInfo.dateOfBirth).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                <MapPin className="text-orange-600" size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Adresse</p>
                <div className="text-gray-900 font-medium">
                  <p>{personalInfo.address}</p>
                  <p>{personalInfo.postalCode} {personalInfo.city}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="text-indigo-600" size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">ID Client</p>
                <p className="text-gray-900 font-medium font-mono">{personalInfo.id}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
