import React from 'react';
import { BANNER_IMAGE, MOCK_SERVICES } from '../constants';
import { Scissors, Clock } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="pb-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="px-6 py-4">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-56 group">
          <img 
            src={BANNER_IMAGE} 
            alt="Promotion Banner" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
            <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Artistry Excellence</span>
            <h2 className="text-white text-3xl font-serif font-bold leading-tight">Elevate Your Style <br /> at Oviss Salon</h2>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="mt-10 px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-gray-900">Our Services</h3>
            <p className="text-gray-400 text-sm mt-1">Curated hair experiences</p>
          </div>
          <div className="p-3 bg-black rounded-2xl shadow-lg shadow-black/10">
            <Scissors size={20} className="text-white" />
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_SERVICES.map((service) => (
            <div 
              key={service.id}
              className="group flex items-center justify-between p-5 rounded-2xl border border-gray-100 bg-white hover:border-black transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-lg">
                  {service.name}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1 mt-1">
                  <Clock size={10} /> {service.duration} Mins
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400 font-medium">From</span>
                <span className="text-xl font-serif font-bold text-black">RM {service.price.toFixed(0)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <div className="mt-12 px-6 mb-12">
        <div className="bg-stone-50 rounded-[2.5rem] p-10 text-center border border-stone-100">
          <p className="font-serif italic text-gray-600 text-lg leading-relaxed">
            "Your hair is the crown you never take off. We make sure it shines."
          </p>
          <div className="w-12 h-1 bg-black/10 mx-auto mt-6 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;