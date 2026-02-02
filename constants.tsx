
import { Service, Stylist, Outlet } from './types';

export const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'Signature Cut & Styling', price: 65.00, duration: 45 },
  { id: '2', name: 'Digital Perm', price: 320.00, duration: 180 },
  { id: '3', name: 'Keratin Smoothing', price: 450.00, duration: 120 },
  { id: '4', name: 'Balayage & Toning', price: 280.00, duration: 150 },
  { id: '5', name: 'Organic Scalp Therapy', price: 120.00, duration: 60 },
];

export const MOCK_STYLISTS: Stylist[] = [
  {
    id: 's1',
    name: 'Jonathan',
    title: 'Creative Director',
    bio: 'Precision cutting and master vision for modern styles.',
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200',
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  },
  {
    id: 's2',
    name: 'Alice',
    title: 'Senior Stylist',
    bio: 'Expert in chemical treatments and contemporary coloring.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    availableSlots: ['09:30', '10:30', '13:30', '14:30', '15:30']
  }
];

export const MOCK_OUTLETS: Outlet[] = [
  {
    id: 'o1',
    name: 'Oviss - Puchong HQ',
    address: '12-G, Boulevard Puchong, 47100 Selangor',
    contact: '012-345 6789',
    photo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'o2',
    name: 'Oviss - Melaka Raya',
    address: '88, Jalan Merdeka, 75000 Melaka',
    contact: '019-678 9012',
    photo: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800'
  }
];

export const BANNER_IMAGE = 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200';
