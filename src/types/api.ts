
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PersonalInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  profileImage?: string;
  dateOfBirth?: string;
  city: string;
  postalCode: string;
}

export interface PaymentCard {
  id: string;
  lastFourDigits: string;
  cardType: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  stripeCardId: string;
}

export interface ElectronicSignature {
  id: string;
  signatureData: string;
  createdAt: string;
  isActive: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'payment' | 'renewal';
  isRead: boolean;
  createdAt: string;
  targetTags?: string[];
}

export interface Contract {
  id: string;
  type: string;
  status: 'pending' | 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  premium: number;
  isSigned: boolean;
  signatureId?: string;
}

export interface DashboardStats {
  activeContracts: number;
  pendingPayments: number;
  unreadNotifications: number;
  nextRenewal?: string;
}
