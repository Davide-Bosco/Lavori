import { Calendar, Mic, Phone, Settings, Home, Pill, Stethoscope, User } from 'lucide-react';

export default function AngelaOptimized() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[667px] items-start overflow-clip rounded-[10px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-[375px]">
      {/* Header */}
      <div className="bg-[#036] h-[60px] relative shrink-0 w-full">
        <p className="absolute font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[33px] left-[155.67px] text-[22px] text-nowrap text-white top-[13.5px]">
          Home
        </p>
      </div>
      
      {/* Content */}
      <div className="bg-white h-[547px] relative shrink-0 w-full overflow-auto">
        <div className="p-6 space-y-6">
          {/* 1 Large Card */}
          <div className="bg-[#e8e8e8] rounded-lg p-8 border-2 border-black shadow-lg min-h-[240px] flex flex-col items-center justify-center">
            <div className="bg-[#036] w-24 h-24 rounded-lg flex items-center justify-center mb-4">
              <Calendar size={56} color="#FFFFFF" />
            </div>
            <p className="font-bold text-black text-xl text-center mb-2">Prossima Visita</p>
            <p className="text-gray-900 text-base text-center">Dr. Rossi - 15 Gen, 10:00</p>
          </div>
          
          {/* Voice + SOS Buttons - Stacked */}
          <div className="space-y-4">
            <div className="bg-[#218281] rounded-lg p-5 text-center text-white border-2 border-[#1a6665] shadow-lg h-20 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <Mic size={32} color="#FFFFFF" />
                <p className="text-lg font-semibold">Voice</p>
              </div>
            </div>
            <div className="bg-[#dc2626] rounded-lg p-5 text-center text-white border-2 border-[#991b1b] shadow-lg h-20 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <Phone size={32} color="#FFFFFF" />
                <p className="text-lg font-semibold">SOS</p>
              </div>
            </div>
          </div>
          
          {/* Settings Button */}
          <button className="w-full bg-[#d1d5db] rounded-lg p-4 flex items-center justify-center gap-2">
            <Settings size={24} color="#000000" />
            <span className="font-normal text-black text-base">Impostazioni</span>
          </button>
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="bg-[#036] h-[60px] w-full flex items-center justify-around px-2">
        {[
          { Icon: Home, label: 'Home', active: true },
          { Icon: Pill, label: 'Ricette', active: false },
          { Icon: Stethoscope, label: 'Visite', active: false },
          { Icon: User, label: 'Profilo', active: false },
          { Icon: Phone, label: 'SOS', active: false }
        ].map((item, idx) => (
          <div key={idx} className={`flex flex-col items-center gap-1 ${item.active ? 'opacity-100' : 'opacity-70'}`}>
            <item.Icon size={20} color="#FFFFFF" />
            <span className="text-white text-[10px]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
