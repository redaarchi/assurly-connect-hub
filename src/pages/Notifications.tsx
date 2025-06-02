
import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { useAuth } from '@/contexts/AuthContext';

const Notifications = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Veuillez vous connecter pour accéder aux notifications</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <NotificationCenter />
        </main>
      </div>
    </div>
  );
};

export default Notifications;
