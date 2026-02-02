
import React, { useState } from 'react';
import { User } from '../types';
import { Mail, Phone, ArrowRight, User as UserIcon, Check, ChevronLeft } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState<'input' | 'tac' | 'register'>('input');
  const [tac, setTac] = useState('');
  
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Female' as User['gender']
  });

  const handleRequestTac = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.trim().length > 3) setStep('tac');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (tac.length === 6) {
      setRegData(prev => ({
        ...prev,
        email: method === 'email' ? identifier : '',
        phone: method === 'phone' ? identifier : ''
      }));
      setStep('register');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.name) return;
    
    const newUser: User = {
      id: 'u' + Math.random().toString(36).substr(2, 5),
      name: regData.name,
      phone: regData.phone,
      email: regData.email,
      gender: regData.gender,
      creditBalance: 150.00
    };
    onLogin(newUser);
  };

  if (step === 'register') {
    return (
      <div className="min-h-screen bg-white w-full max-w-md mx-auto flex flex-col px-8 py-10 animate-fade-in overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Create Profile</h1>
          <p className="text-gray-500 text-sm">Experience hair artistry redefined. Let's get started.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6 w-full pb-10">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-400 px-1 tracking-widest">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <UserIcon size={18} />
              </div>
              <input
                type="text"
                required
                value={regData.name}
                onChange={e => setRegData({...regData, name: e.target.value})}
                placeholder="How should we call you?"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-gray-900 focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-400 px-1 tracking-widest">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={regData.email}
                onChange={e => setRegData({...regData, email: e.target.value})}
                placeholder="name@example.com"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-gray-900 focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-400 px-1 tracking-widest">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                required
                value={regData.phone}
                onChange={e => setRegData({...regData, phone: e.target.value})}
                placeholder="012-345 6789"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-gray-900 focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-400 px-1 tracking-widest">Gender Preference</label>
            <div className="flex gap-3">
              {(['Male', 'Female'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setRegData({...regData, gender: g})}
                  className={`flex-1 py-4 rounded-2xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    regData.gender === g 
                      ? 'bg-black text-white border-black shadow-lg shadow-black/20' 
                      : 'bg-gray-50 border-gray-100 text-gray-500'
                  }`}
                >
                  {regData.gender === g && <Check size={16} />}
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all">
              Join Oviss <Check size={20} />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full max-w-md mx-auto flex flex-col px-8 py-16 animate-fade-in">
      <div className="mb-16 text-center">
        <div className="w-20 h-20 bg-black rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl rotate-3">
          <span className="text-white font-serif font-bold text-4xl">O</span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Oviss Salon</h1>
        <p className="text-gray-400 font-medium tracking-wide text-sm uppercase">Premium Hair Artistry</p>
      </div>

      {step === 'input' ? (
        <form onSubmit={handleRequestTac} className="space-y-6 w-full">
          <div className="flex bg-gray-100 p-1 rounded-2xl mb-4">
            <button 
              type="button" 
              onClick={() => setMethod('phone')} 
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${method === 'phone' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
            >
              Phone
            </button>
            <button 
              type="button" 
              onClick={() => setMethod('email')} 
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${method === 'email' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
            >
              Email
            </button>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
              {method === 'phone' ? <Phone size={20} /> : <Mail size={20} />}
            </div>
            <input
              type={method === 'phone' ? 'tel' : 'email'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={method === 'phone' ? '0123456789' : 'name@example.com'}
              className="w-full bg-gray-50 border border-transparent rounded-2xl py-5 pl-12 pr-4 text-gray-900 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all shadow-sm"
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-black/10 active:scale-95 transition-all">
            Request TAC <ArrowRight size={20} />
          </button>
        </form>
      ) : (
        <div className="space-y-8 w-full text-center">
          <div className="flex justify-start">
            <button onClick={() => setStep('input')} className="flex items-center gap-1 text-gray-400 text-xs font-bold hover:text-black transition-colors uppercase tracking-widest">
              <ChevronLeft size={16} /> Back
            </button>
          </div>
          
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">Verification</h2>
            <p className="text-gray-500 text-sm mt-1">Check your {method} for the code.</p>
          </div>
          
          <form onSubmit={handleVerify} className="space-y-8">
            <input
              type="text"
              maxLength={6}
              value={tac}
              onChange={(e) => setTac(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-6 text-center text-4xl font-bold tracking-[0.4em] outline-none text-gray-900 focus:ring-2 focus:ring-black transition-all"
              required
              autoFocus
            />
            
            <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-bold shadow-xl active:scale-95 transition-all">
              Verify Identity
            </button>
          </form>
          
          <p className="text-xs text-gray-400 font-medium">
            Didn't get it? <button type="button" className="text-black font-bold underline ml-1">Resend Code</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
