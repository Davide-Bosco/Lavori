import { useState } from 'react';
import { MobileFrame } from './MobileFrame';
import { Calendar, Pill, Stethoscope, User, Phone, Mic, Bluetooth, Check } from 'lucide-react';

type Screen = 'home' | 'ricette' | 'visite' | 'profilo' | 'sos' | 'voice' | 'iot-search' | 'iot-connect' | 'iot-success';

export function InteractiveCiclo3() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isRecording, setIsRecording] = useState(false);

  const handleNavClick = (nav: string) => {
    setCurrentScreen(nav as Screen);
  };

  const handleVoiceClick = () => {
    setCurrentScreen('voice');
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setCurrentScreen('home');
    }, 3000);
  };

  const handleIoTClick = () => {
    setCurrentScreen('iot-search');
    setTimeout(() => setCurrentScreen('iot-connect'), 2000);
  };

  const handleIoTConnect = () => {
    setCurrentScreen('iot-success');
    setTimeout(() => setCurrentScreen('home'), 2000);
  };

  // Home Screen
  const renderHomeScreen = () => (
    <div className="p-4 space-y-3">
      <div
        className="bg-[#E8E8E8] rounded-lg p-4 border border-black"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-[#003366] rounded-lg" style={{ width: '48px', height: '48px' }}>
            <Calendar size={24} color="#FFFFFF" />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: '14px', fontWeight: '550', color: '#000' }}>Prossima Visita</p>
            <p style={{ fontSize: '12px', color: '#666' }}>Dr. Rossi - 15 Gen, 10:00</p>
          </div>
        </div>
      </div>

      <div
        className="bg-[#E8E8E8] rounded-lg p-4 border border-black"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-[#003366] rounded-lg" style={{ width: '48px', height: '48px' }}>
            <Pill size={24} color="#FFFFFF" />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: '14px', fontWeight: '550', color: '#000' }}>Ricette Attive</p>
            <p style={{ fontSize: '12px', color: '#666' }}>3 farmaci disponibili</p>
          </div>
        </div>
      </div>

      <div
        className="bg-[#E8E8E8] rounded-lg p-4 border border-black"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-[#003366] rounded-lg" style={{ width: '48px', height: '48px' }}>
            <Stethoscope size={24} color="#FFFFFF" />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: '14px', fontWeight: '550', color: '#000' }}>Misurazioni</p>
            <p style={{ fontSize: '12px', color: '#666' }}>Ultima: Pressione 120/80</p>
          </div>
        </div>
      </div>

      {/* Voice Input Button */}
      <button
        onClick={handleVoiceClick}
        className="w-full bg-[#218281] hover:bg-[#1a6665] text-white rounded-lg p-4 flex items-center justify-center gap-3 transition-colors"
        style={{ height: '72px', marginTop: '16px' }}
      >
        <Mic size={32} color="#FFFFFF" />
        <span style={{ fontSize: '16px', fontWeight: '550' }}>Input Vocale</span>
      </button>

      {/* IoT Pairing Button */}
      <button
        onClick={handleIoTClick}
        className="w-full bg-[#003366] hover:bg-[#004488] text-white rounded-lg p-4 flex items-center justify-center gap-3 transition-colors"
        style={{ height: '72px' }}
      >
        <Bluetooth size={32} color="#FFFFFF" />
        <span style={{ fontSize: '16px', fontWeight: '550' }}>Connetti Dispositivo IoT</span>
      </button>
    </div>
  );

  // Ricette Screen
  const renderRicetteScreen = () => (
    <div className="p-4 space-y-3">
      {['Aspirina 100mg', 'Ramipril 5mg', 'Atorvastatina 20mg'].map((name, idx) => (
        <div key={idx} className="bg-[#E8E8E8] rounded-lg p-4 border border-black" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center bg-[#003366] rounded-lg" style={{ width: '48px', height: '48px' }}>
              <Pill size={24} color="#FFFFFF" />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: '14px', fontWeight: '550', color: '#000' }}>{name}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>Valida fino al {idx === 0 ? '31 Gen' : idx === 1 ? '28 Feb' : '15 Mar'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Visite Screen
  const renderVisiteScreen = () => (
    <div className="p-4 space-y-3">
      {[
        { name: 'Dr. Rossi - Cardiologo', date: '15 Gen, 10:00' },
        { name: 'Dr.ssa Bianchi - Medicina Generale', date: '22 Gen, 15:30' },
        { name: 'Prenota Nuova Visita', date: 'Cerca specialista' },
      ].map((visita, idx) => (
        <div key={idx} className="bg-[#E8E8E8] rounded-lg p-4 border border-black" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center bg-[#003366] rounded-lg" style={{ width: '48px', height: '48px' }}>
              <Stethoscope size={24} color="#FFFFFF" />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: '14px', fontWeight: '550', color: '#000' }}>{visita.name}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>{visita.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Profilo Screen
  const renderProfiloScreen = () => (
    <div className="p-4 space-y-3">
      {[
        { name: 'Info Personali', desc: 'Nome, Data nascita, Tessera sanitaria' },
        { name: 'Impostazioni', desc: 'Notifiche, Privacy, Accessibilità' },
        { name: 'Documenti', desc: 'Referti, Esami, Cartella clinica' },
      ].map((item, idx) => (
        <div key={idx} className="bg-[#E8E8E8] rounded-lg p-4 border border-black" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center bg-[#003366] rounded-lg" style={{ width: '48px', height: '48px' }}>
              <User size={24} color="#FFFFFF" />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: '14px', fontWeight: '550', color: '#000' }}>{item.name}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // SOS Screen
  const renderSOSScreen = () => (
    <div className="p-4 space-y-3">
      {[
        { name: 'Emergenza 118', desc: 'Chiama subito' },
        { name: 'Medico di Base', desc: 'Dr.ssa Bianchi - 02 1234567' },
        { name: 'Farmacia di Turno', desc: 'Via Roma 15 - Aperta' },
      ].map((contact, idx) => (
        <div key={idx} className="bg-[#E8E8E8] rounded-lg p-4 border border-black" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center bg-[#003366] rounded-lg" style={{ width: '48px', height: '48px' }}>
              <Phone size={24} color="#FFFFFF" />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: '14px', fontWeight: '550', color: '#000' }}>{contact.name}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>{contact.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Voice Recording Screen
  const renderVoiceScreen = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div
        className={`rounded-full bg-[#218281] flex items-center justify-center mb-6 ${
          isRecording ? 'animate-pulse' : ''
        }`}
        style={{ width: '96px', height: '96px' }}
      >
        <Mic size={48} color="#FFFFFF" />
      </div>
      <p style={{ fontSize: '24px', fontWeight: '600', color: '#000', textAlign: 'center' }}>
        Ascoltando...
      </p>
      <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginTop: '8px' }}>
        Parla ora per dare un comando vocale
      </p>
    </div>
  );

  // IoT Search Screen
  const renderIoTSearchScreen = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="animate-spin rounded-full border-4 border-[#003366] border-t-transparent mb-6" style={{ width: '96px', height: '96px' }} />
      <p style={{ fontSize: '24px', fontWeight: '600', color: '#000', textAlign: 'center' }}>
        Cercando dispositivi...
      </p>
      <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginTop: '8px' }}>
        Assicurati che il Bluetooth sia attivo
      </p>
    </div>
  );

  // IoT Connect Screen
  const renderIoTConnectScreen = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="rounded-full bg-[#003366] flex items-center justify-center mb-6" style={{ width: '96px', height: '96px' }}>
        <Bluetooth size={48} color="#FFFFFF" />
      </div>
      <p style={{ fontSize: '24px', fontWeight: '600', color: '#000', textAlign: 'center', marginBottom: '16px' }}>
        Bilancia Bluetooth trovata
      </p>
      <button
        onClick={handleIoTConnect}
        className="bg-[#218281] hover:bg-[#1a6665] text-white rounded-lg px-8 py-4 transition-colors"
        style={{ fontSize: '16px', fontWeight: '550' }}
      >
        Connetti
      </button>
    </div>
  );

  // IoT Success Screen
  const renderIoTSuccessScreen = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="rounded-full bg-green-500 flex items-center justify-center mb-6" style={{ width: '96px', height: '96px' }}>
        <Check size={48} color="#FFFFFF" />
      </div>
      <p style={{ fontSize: '24px', fontWeight: '600', color: '#000', textAlign: 'center' }}>
        Sincronizzazione OK
      </p>
      <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginTop: '8px' }}>
        Dispositivo connesso con successo
      </p>
    </div>
  );

  const renderContent = () => {
    switch (currentScreen) {
      case 'home':
        return renderHomeScreen();
      case 'ricette':
        return renderRicetteScreen();
      case 'visite':
        return renderVisiteScreen();
      case 'profilo':
        return renderProfiloScreen();
      case 'sos':
        return renderSOSScreen();
      case 'voice':
        return renderVoiceScreen();
      case 'iot-search':
        return renderIoTSearchScreen();
      case 'iot-connect':
        return renderIoTConnectScreen();
      case 'iot-success':
        return renderIoTSuccessScreen();
      default:
        return renderHomeScreen();
    }
  };

  const isMainScreen = ['home', 'ricette', 'visite', 'profilo', 'sos'].includes(currentScreen);

  return (
    <div>
      <div className="mb-6 bg-white rounded-lg p-6">
        <h3 className="text-[#003366] mb-2">Ciclo 3: Interactive Prototype</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Prototipo interattivo con navigazione funzionante, input vocale e pairing IoT
        </p>
      </div>

      <div className="flex justify-center">
        <MobileFrame
          title={currentScreen === 'home' ? 'Home' : 
                 currentScreen === 'ricette' ? 'Ricette' :
                 currentScreen === 'visite' ? 'Visite' :
                 currentScreen === 'profilo' ? 'Profilo' :
                 currentScreen === 'sos' ? 'SOS' : ''}
          showNavBar={isMainScreen}
          activeNav={currentScreen}
          onNavClick={handleNavClick}
        >
          {renderContent()}
        </MobileFrame>
      </div>

      <div className="mt-8 bg-white rounded-lg p-6">
        <h4 className="text-[#003366] mb-4">Funzionalità Interattive</h4>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="mb-3" style={{ fontSize: '16px', fontWeight: '550', color: '#000' }}>
              Navigazione
            </h5>
            <ul className="space-y-2">
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Bottom navigation funzionante (5 schermate)</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ On click → Navigate to</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Stato attivo visibile</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Transizioni smooth</li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3" style={{ fontSize: '16px', fontWeight: '550', color: '#000' }}>
              Flow Speciali
            </h5>
            <ul className="space-y-2">
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Input vocale → Schermata ascolto (3s)</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ IoT Pairing: Cerca → Trova → Connetti → Success</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Feedback visivo (spinner, pulse)</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Auto-return alla home</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
