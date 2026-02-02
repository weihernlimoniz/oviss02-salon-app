import React, { useState } from 'react';
import { User } from '../types';
import { Mail, Phone, ArrowRight, User as UserIcon, Check } from 'lucide-react';

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
    if (identifier.trim().length > 3) {
      setStep('tac');
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we accept any 6-digit TAC
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
    const mockUser: User = {
      id: 'u' + Math.random().toString(36).substr(2, 5),
      name: regData.name || 'Valued Customer',
      phone: regData.phone,
      email: regData.email,
      gender: regData.gender,
      creditBalance: 150.00
    };
    onLogin(mockUser);
  };

  if (step === 'register') {
    return (
      <div className="min-h-screen bg-white w-full max-w-md mx-auto flex flex-col px-8 py-10 animate-in fade-in slide-in-from-bottom duration-500 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-500 text-sm">We just need a few more details to set up your profile.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6 w-full pb-10">
          {/* Name Field */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 block px-1 tracking-widest">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <UserIcon size={18} />
              </div>
              <input
                type="text"
                required
                value={regData.name}
                onChange={e => setRegData({...regData, name: e.target.value})}
                placeholder="Enter your name"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-gray-900 focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>

          {/* Email Field - Pre-filled if used for login */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 block px-1 tracking-widest">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={regData.email}
                onChange={e => setRegData({...regData, email: e.target.value})}
                placeholder="email@example.com"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-gray-900 focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>

          {/* Phone Field - Pre-filled if used for login */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 block px-1 tracking-widest">Phone Number</label>
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

          {/* Gender Selection */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 block px-1 tracking-widest">Gender</label>
            <div className="flex gap-3">
              {(['Male', 'Female'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setRegData({...regData, gender: g})}
                  className={`flex-1 py-4 rounded-2xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    regData.gender === g 
                      ? 'bg-black text-white border-black shadow-lg shadow-black/10' 
                      : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {regData.gender === g && <Check size={16} />}
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-2xl shadow-black/20 active:scale-95 transition-all"
            >
              Register Now <Check size={20} />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full max-w-md mx-auto flex flex-col px-8 py-12">
      <div className="mb-12 text-center">
        <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
          <span className="text-white font-serif font-bold text-3xl">O</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Oviss Salon</h1>
        <p className="text-gray-500">Premium Hair Artistry</p>
      </div>

      {step === 'input' ? (
        <form onSubmit={handleRequestTac} className="space-y-6 w-full">
          <div className="flex bg-gray-50 p-1 rounded-2xl mb-4 border border-gray-100">
            <button 
              type="button" 
              onClick={() => setMethod('phone')} 
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${method === 'phone' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
            >
              Phone
            </button>
            <button 
              type="button" 
              onClick={() => setMethod('email')} 
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${method === 'email' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
            >
              Email
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              {method === 'phone' ? <Phone size={20} /> : <Mail size={20} />}
            </div>
            <input
              type={method === 'phone' ? 'tel' : 'email'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={method === 'phone' ? '0123456789' : 'name@example.com'}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 pl-12 pr-4 text-gray-900 focus:ring-2 focus:ring-black outline-none transition-all shadow-sm"
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
            Get TAC <ArrowRight size={20} />
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerify} className="space-y-8 w-full text-center animate-in fade-in slide-in-from-right duration-300">
          <div>
            <p className="text-gray-500 mb-2">Enter the 6-digit code sent to</p>
            <p className="font-bold text-black text-lg">{identifier}</p>
          </div>
          
          <input
            type="text"
            maxLength={6}
            value={tac}
            onChange={(e) => setTac(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-6 text-center text-4xl font-bold tracking-[0.4em] outline-none text-gray-900 shadow-inner"
            required
            autoFocus
          />
          
          <div className="space-y-3">
            <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-bold shadow-xl active:scale-95 transition-all">
              Verify & Continue
            </button>
            <button 
              type="button" 
              onClick={() => setStep('input')} 
              className="w-full text-gray-400 text-sm font-bold py-2 hover:text-black transition-colors"
            >
              Change Details
            </button>
          </div>
          
          <p className="text-xs text-gray-400">
            Didn't receive the code? <button type="button" className="text-black font-bold underline ml-1">Resend</button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;