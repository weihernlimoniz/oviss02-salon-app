
import React, { useState, useMemo } from 'react';
import { Appointment, Outlet, Stylist, Service } from '../types';
import { MOCK_OUTLETS, MOCK_STYLISTS, MOCK_SERVICES } from '../constants';
import { ChevronRight, Calendar as CalendarIcon, MapPin, Scissors, User as UserIcon, X, Check, ChevronDown, AlertTriangle, Clock } from 'lucide-react';

interface AppointmentPageProps {
  appointments: Appointment[];
  onAdd: (appt: Appointment) => void;
  onUpdate: (appt: Appointment) => void;
  onCancel: (id: string) => void;
}

const AppointmentPage: React.FC<AppointmentPageProps> = ({ appointments, onAdd, onUpdate, onCancel }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [step, setStep] = useState<'outlet' | 'details'>('outlet');
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);

  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  const upcomingAppts = appointments.filter(a => a.status === 'upcoming');

  const resetBooking = () => {
    setIsBooking(false);
    setStep('outlet');
    setSelectedOutlet(null);
    setSelectedStylist(null);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedServiceIds([]);
  };

  const handleConfirm = () => {
    if (!selectedOutlet || !selectedDate || !selectedTime || selectedServiceIds.length === 0) return;
    const apptData: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'u1',
      outletId: selectedOutlet.id,
      stylistId: selectedStylist ? selectedStylist.id : 'no-preference',
      serviceIds: selectedServiceIds,
      date: selectedDate,
      time: selectedTime,
      status: 'upcoming'
    };
    onAdd(apptData);
    resetBooking();
  };

  const next7Days = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  }, []);

  const totalSelectedPrice = MOCK_SERVICES
    .filter(s => selectedServiceIds.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  if (isBooking) {
    return (
      <div className="min-h-screen bg-white pb-32 px-6 pt-6 relative w-full animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold">New Booking</h2>
          <button onClick={resetBooking} className="p-2 bg-gray-50 rounded-full text-gray-400"><X size={20} /></button>
        </div>

        {step === 'outlet' ? (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Select Location</h3>
            {MOCK_OUTLETS.map(outlet => (
              <button
                key={outlet.id}
                onClick={() => { setSelectedOutlet(outlet); setStep('details'); }}
                className="w-full p-6 rounded-2xl border border-gray-100 hover:border-black transition-all text-left bg-gray-50 flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-lg text-gray-900">{outlet.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{outlet.address}</div>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-black" />
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {/* Stylists */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Select Stylist</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {MOCK_STYLISTS.map(stylist => (
                  <button
                    key={stylist.id}
                    onClick={() => setSelectedStylist(stylist)}
                    className={`flex-shrink-0 w-24 flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${selectedStylist?.id === stylist.id ? 'border-black bg-black text-white shadow-xl' : 'border-gray-100 bg-gray-50'}`}
                  >
                    <img src={stylist.photo} className="w-14 h-14 rounded-full object-cover grayscale" />
                    <span className="text-[10px] font-bold text-center leading-tight">{stylist.name}</span>
                  </button>
                ))}
                <button
                  onClick={() => setSelectedStylist(null)}
                  className={`flex-shrink-0 w-24 flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${selectedStylist === null ? 'border-black bg-black text-white shadow-xl' : 'border-gray-100 bg-gray-50'}`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${selectedStylist === null ? 'bg-white/20' : 'bg-gray-200'}`}><UserIcon size={24} /></div>
                  <span className="text-[10px] font-bold text-center leading-tight">No Preference</span>
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Appointment Date</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {next7Days.map(date => {
                  const d = new Date(date);
                  const isSelected = selectedDate === date;
                  return (
                    <button key={date} onClick={() => setSelectedDate(date)} className={`flex-shrink-0 w-16 h-20 flex flex-col items-center justify-center rounded-2xl border transition-all ${isSelected ? 'border-black bg-black text-white shadow-lg scale-105' : 'border-gray-100 bg-gray-50'}`}>
                      <span className="text-[10px] uppercase opacity-70 mb-1">{d.toLocaleDateString('en', { weekday: 'short' })}</span>
                      <span className="text-xl font-bold">{d.getDate()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedDate && (
              <div className="animate-fade-in">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Preferred Time</h3>
                <div className="grid grid-cols-4 gap-2">
                  {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
                    <button key={time} onClick={() => setSelectedTime(time)} className={`py-3 rounded-xl border text-xs font-bold transition-all ${selectedTime === time ? 'border-black bg-black text-white' : 'border-gray-100 bg-gray-50'}`}>{time}</button>
                  ))}
                </div>
              </div>
            )}

            {selectedTime && (
              <div className="animate-fade-in pb-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Choose Services</h3>
                <div className="space-y-3">
                  {MOCK_SERVICES.map(service => {
                    const isSelected = selectedServiceIds.includes(service.id);
                    return (
                      <button 
                        key={service.id} 
                        onClick={() => setSelectedServiceIds(prev => prev.includes(service.id) ? prev.filter(id => id !== service.id) : [...prev, service.id])}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isSelected ? 'border-black bg-black text-white' : 'border-gray-100 bg-white'}`}
                      >
                        <div className="text-left">
                          <div className="font-bold text-sm">{service.name}</div>
                          <div className={`text-[10px] flex items-center gap-1 mt-1 ${isSelected ? 'text-white/60' : 'text-gray-400'}`}><Clock size={10} /> {service.duration} mins</div>
                        </div>
                        <div className="font-bold text-sm">RM{service.price.toFixed(0)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedServiceIds.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 z-[60] shadow-2xl">
                <div className="max-w-md mx-auto flex items-center justify-between gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase">Estimated Total</span>
                    <span className="text-2xl font-serif font-bold">RM{totalSelectedPrice.toFixed(0)}</span>
                  </div>
                  <button onClick={handleConfirm} className="flex-1 bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">Confirm <ChevronRight size={20} /></button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 w-full animate-fade-in">
      <div className="mb-10">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">My Bookings</h2>
        <p className="text-gray-500 text-sm">Manage your upcoming sessions</p>
      </div>

      <section className="mb-10">
        {upcomingAppts.length === 0 ? (
          <div className="bg-gray-50 rounded-[2rem] p-12 text-center border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-300"><CalendarIcon size={32} /></div>
            <p className="text-gray-400 font-medium text-sm">No scheduled bookings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppts.map(appt => {
              const outlet = MOCK_OUTLETS.find(o => o.id === appt.outletId);
              const services = MOCK_SERVICES.filter(s => appt.serviceIds.includes(s.id));
              return (
                <div key={appt.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Upcoming</div>
                    <button onClick={() => setCancelTarget(appt.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><X size={20} /></button>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-serif font-bold text-xl mb-1 truncate">{services.map(s => s.name).join(', ')}</h4>
                    <div className="flex items-center gap-2 text-gray-400 text-xs"><MapPin size={14} /> {outlet?.name}</div>
                  </div>
                  <div className="flex gap-6 pt-6 border-t border-gray-50">
                    <div className="flex flex-col"><span className="text-[10px] font-bold text-gray-300 uppercase">Date</span><span className="text-sm font-bold">{appt.date}</span></div>
                    <div className="flex flex-col"><span className="text-[10px] font-bold text-gray-300 uppercase">Time</span><span className="text-sm font-bold">{appt.time}</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <button onClick={() => setIsBooking(true)} className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all">
        <Scissors size={20} /> Schedule Now
      </button>

      {cancelTarget && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
          <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-sm animate-fade-in text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6"><AlertTriangle size={32} /></div>
            <h3 className="text-2xl font-serif font-bold mb-2">Cancel Booking?</h3>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">Are you sure you want to cancel your session? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelTarget(null)} className="flex-1 py-4 font-bold text-gray-400 bg-gray-50 rounded-2xl">Keep it</button>
              <button onClick={() => { onCancel(cancelTarget); setCancelTarget(null); }} className="flex-1 bg-red-500 text-white rounded-2xl py-4 font-bold">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
