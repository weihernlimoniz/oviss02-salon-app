
import React from 'react';
import { MOCK_OUTLETS, MOCK_STYLISTS } from '../constants';
import { Phone, MapPin, Instagram, Facebook } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="pb-8 w-full">
      <div className="relative h-64 overflow-hidden">
        <img src={MOCK_OUTLETS[0].photo} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-white text-3xl font-serif font-bold mb-2 tracking-tight">Oviss Salon</h2>
          <p className="text-white/80 max-w-xs text-sm">Elevating the art of hair since inception.</p>
        </div>
      </div>

      <section className="px-6 py-8 space-y-6 w-full">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Our Locations</h3>
        <div className="space-y-4">
          {MOCK_OUTLETS.map(outlet => (
            <div key={outlet.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm w-full">
              <h4 className="font-serif font-bold text-xl text-gray-900 mb-4">{outlet.name}</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white rounded-full flex-shrink-0 flex items-center justify-center text-gray-400 shadow-sm"><MapPin size={16} /></div>
                  <p className="text-sm text-gray-600 leading-snug">{outlet.address}</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white rounded-full flex-shrink-0 flex items-center justify-center text-gray-400 shadow-sm"><Phone size={16} /></div>
                  <p className="text-sm text-gray-900 font-bold">{outlet.contact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-8 w-full">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Our Stylists</h3>
        <div className="grid grid-cols-1 gap-8 w-full">
          {MOCK_STYLISTS.map(stylist => (
            <div key={stylist.id} className="flex gap-6 group w-full">
              <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden ring-4 ring-gray-50">
                <img src={stylist.photo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-serif font-bold text-lg text-gray-900">{stylist.name}</span>
                <span className="text-[10px] font-bold text-white bg-black px-2 py-0.5 rounded w-fit mb-2 uppercase tracking-tight">
                  {stylist.title}
                </span>
                {stylist.bio && <p className="text-xs text-gray-500 leading-relaxed italic line-clamp-2">{stylist.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
