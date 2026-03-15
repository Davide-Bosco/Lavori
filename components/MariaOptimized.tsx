import { Calendar, Pill, Stethoscope, Clock, Phone, Mic, Bluetooth, Settings, Home, User } from 'lucide-react';

export default function MariaOptimized() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[667px] items-start overflow-clip rounded-[10px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-[375px]">
      {/* Header */}
      <div className="bg-[#036] h-[60px] relative shrink-0 w-full">
        <p className="absolute font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[30px] left-[158.58px] text-[20px] text-nowrap text-white top-[14px]">
          Home
        </p>
      </div>
      
      {/* Content */}
      <div className="bg-white h-[547px] relative shrink-0 w-full overflow-auto">
        <div className="p-4 space-y-4">
          {/* 5 Cards */}
          {[
            { Icon: Calendar, title: 'Prossima Visita', desc: 'Dr. Rossi - 15 Gen, 10:00' },
            { Icon: Pill, title: 'Ricette Attive', desc: '3 farmaci disponibili' },
            { Icon: Stethoscope, title: 'Misurazioni', desc: 'Ultima: Pressione 120/80' },
            { Icon: Clock, title: 'Promemoria', desc: 'Prendi la pastiglia delle 14:00' },
            { Icon: Phone, title: 'Contatti', desc: 'Medico, Farmacia, Famiglia' }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#e8e8e8] rounded-lg p-4 border border-black shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-[#036] w-12 h-12 rounded-lg flex items-center justify-center">
                  <item.Icon size={24} color="#FFFFFF" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-black text-sm">{item.title}</p>
                  <p className="text-gray-600 text-xs">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Voice + IoT Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#218281] rounded-lg p-4 text-center text-white flex flex-col items-center justify-center gap-2">
              <Mic size={28} color="#FFFFFF" />
              <p className="text-sm font-semibold">Voice</p>
            </div>
            <div className="bg-[#036] rounded-lg p-4 text-center text-white flex flex-col items-center justify-center gap-2">
              <Bluetooth size={28} color="#FFFFFF" />
              <p className="text-sm font-semibold">IoT</p>
            </div>
          </div>
          
          {/* Settings Button */}
          <button className="w-full bg-[#d1d5db] rounded-lg p-3 flex items-center justify-center gap-2">
            <Settings size={20} color="#000000" />
            <span className="font-normal text-black">Impostazioni</span>
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
