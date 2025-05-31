
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'client' | 'agent' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Contract {
  id: string;
  clientId: string;
  agentId?: string;
  type: 'auto' | 'health' | 'home' | 'life';
  status: 'pending' | 'active' | 'expired' | 'cancelled';
  premium: number;
  startDate: string;
  endDate: string;
  details: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Claim {
  id: string;
  contractId: string;
  clientId: string;
  agentId?: string;
  type: string;
  description: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'closed';
  amount: number;
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  contractId: string;
  clientId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  dueDate: string;
  paidDate?: string;
  method?: string;
  recurring: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}
