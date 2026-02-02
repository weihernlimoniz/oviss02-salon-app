
import React, { useState, useEffect } from 'react';
import { User, Appointment, Notification, Page } from './types';
import Login from './pages/Login';
import Home from './pages/Home';
import AppointmentPage from './pages/Appointment';
import AboutUs from './pages/AboutUs';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';
import Header from './components/Header';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('oviss_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('oviss_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('oviss_user');
    setCurrentPage('home');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'appointment': return (
        <AppointmentPage 
          appointments={appointments} 
          onAdd={(a) => setAppointments([a, ...appointments])} 
          onUpdate={(ua) => setAppointments(appointments.map(a => a.id === ua.id ? ua : a))}
          onCancel={(id) => setAppointments(appointments.filter(a => a.id !== id))}
        />
      );
      case 'about': return <AboutUs />;
      case 'notifications': return <Notifications notifications={notifications} />;
      case 'profile': return (
        <Profile 
          user={user!} 
          appointments={appointments}
          onUpdate={setUser} 
          onLogout={handleLogout} 
        />
      );
      default: return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white w-full max-w-md mx-auto relative overflow-x-hidden border-x border-gray-100">
      <Header 
        notificationCount={notifications.length} 
        onNotificationClick={() => setCurrentPage('notifications')}
      />
      <main className="flex-1 w-full pb-24 overflow-y-auto">
        {renderPage()}
      </main>
      <BottomNav current={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
