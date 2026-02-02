
export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender?: 'Male' | 'Female' | 'Other';
  profilePic?: string;
  creditBalance: number;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  bio?: string;
  photo: string;
  availableSlots: string[];
}

export interface Outlet {
  id: string;
  name: string;
  address: string;
  contact: string;
  photo: string;
}

export interface Appointment {
  id: string;
  userId: string;
  outletId: string;
  stylistId: string;
  serviceIds: string[];
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'reminder' | 'marketing';
  timestamp: Date;
}

export type Page = 'home' | 'appointment' | 'notifications' | 'about' | 'profile';
