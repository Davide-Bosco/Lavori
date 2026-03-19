import { Calendar, Pill, Stethoscope, Mic, Bluetooth, Settings, Home, User, Phone } from 'lucide-react';

export default function GiorgioOptimized() {
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
        <div className="p-4 space-y-6">
          {/* 3 Cards - Larger */}
          {[
            { Icon: Calendar, title: 'Prossima Visita', desc: 'Dr. Rossi - 15 Gen, 10:00' },
            { Icon: Pill, title: 'Ricette Attive', desc: '3 farmaci disponibili' },
            { Icon: Stethoscope, title: 'Misurazioni', desc: 'Ultima: Pressione 120/80' }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#e8e8e8] rounded-lg p-5 border border-black shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-[#036] w-[72px] h-[72px] rounded-lg flex items-center justify-center">
                  <item.Icon size={36} color="#FFFFFF" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-black text-base">{item.title}</p>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Voice + IoT Buttons - Larger */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#218281] rounded-lg p-6 text-center text-white border-2 border-[#1a6665] shadow-lg flex flex-col items-center justify-center gap-3">
              <Mic size={40} color="#FFFFFF" />
              <p className="text-base font-semibold">Voice</p>
            </div>
            <div className="bg-[#036] rounded-lg p-6 text-center text-white border-2 border-[#024] shadow-lg flex flex-col items-center justify-center gap-3">
              <Bluetooth size={40} color="#FFFFFF" />
              <p className="text-base font-semibold">IoT</p>
            </div>
          </div>
          
          {/* Settings Button */}
          <button className="w-full bg-[#d1d5db] rounded-lg p-3 flex items-center justify-center gap-2">
            <Settings size={22} color="#000000" />
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
