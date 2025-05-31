
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  CreditCard, 
  AlertTriangle, 
  Users, 
  Settings,
  BarChart3,
  Shield,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  path: string;
  icon: React.ReactNode;
  label: string;
  roles: string[];
}

const sidebarItems: SidebarItem[] = [
  { path: '/', icon: <Home className="h-5 w-5" />, label: 'Tableau de bord', roles: ['client', 'agent', 'admin'] },
  { path: '/contracts', icon: <FileText className="h-5 w-5" />, label: 'Contrats', roles: ['client', 'agent', 'admin'] },
  { path: '/payments', icon: <CreditCard className="h-5 w-5" />, label: 'Paiements', roles: ['client', 'agent', 'admin'] },
  { path: '/claims', icon: <AlertTriangle className="h-5 w-5" />, label: 'Sinistres', roles: ['client', 'agent', 'admin'] },
  { path: '/users', icon: <Users className="h-5 w-5" />, label: 'Utilisateurs', roles: ['admin'] },
  { path: '/reports', icon: <BarChart3 className="h-5 w-5" />, label: 'Rapports', roles: ['agent', 'admin'] },
  { path: '/insurance-types', icon: <Shield className="h-5 w-5" />, label: 'Types d\'assurance', roles: ['admin'] },
  { path: '/messages', icon: <MessageSquare className="h-5 w-5" />, label: 'Messages', roles: ['client', 'agent'] },
  { path: '/settings', icon: <Settings className="h-5 w-5" />, label: 'Paramètres', roles: ['client', 'agent', 'admin'] },
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const filteredItems = sidebarItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full">
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
              location.pathname === item.path
                ? "bg-blue-100 text-blue-700 font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
