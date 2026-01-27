import { useState, useEffect } from 'react';
import { Bluetooth, Check, Loader2 } from 'lucide-react';

interface IoTScreenProps {
  onComplete: () => void;
}

type IoTState = 'searching' | 'found' | 'connecting' | 'connected';

export function IoTScreen({ onComplete }: IoTScreenProps) {
  const [state, setState] = useState<IoTState>('searching');

  useEffect(() => {
    const timer1 = setTimeout(() => setState('found'), 2000);
    const timer2 = setTimeout(() => setState('connecting'), 4000);
    const timer3 = setTimeout(() => setState('connected'), 5500);
    const timer4 = setTimeout(() => onComplete(), 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  const handleConnect = () => {
    setState('connecting');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-b from-[#003366] to-[#001f3f]">
      {/* Icon */}
      <div
        className={`rounded-full flex items-center justify-center mb-8 ${
          state === 'searching' || state === 'connecting' ? 'bg-white/20' : 
          state === 'connected' ? 'bg-green-500' : 'bg-[#003366]'
        }`}
        style={{ 
          width: '120px', 
          height: '120px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          transition: 'all 0.5s ease'
        }}
      >
        {state === 'searching' && <Loader2 size={60} color="#FFFFFF" className="animate-spin" />}
        {state === 'found' && <Bluetooth size={60} color="#FFFFFF" />}
        {state === 'connecting' && <Loader2 size={60} color="#FFFFFF" className="animate-spin" />}
        {state === 'connected' && <Check size={60} color="#FFFFFF" />}
      </div>

      {/* Title */}
      <p 
        className="text-white text-center mb-4"
        style={{ fontSize: '28px', fontWeight: '600' }}
      >
        {state === 'searching' && 'Cercando dispositivi...'}
        {state === 'found' && 'Dispositivo trovato!'}
        {state === 'connecting' && 'Connessione...'}
        {state === 'connected' && 'Connesso!'}
      </p>

      {/* Device Card */}
      {(state === 'found' || state === 'connecting' || state === 'connected') && (
        <div 
          className="bg-white rounded-lg p-6 mb-6 w-full max-w-xs"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-[#003366] rounded-lg flex items-center justify-center">
              <Bluetooth size={24} color="#FFFFFF" />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: '16px', fontWeight: '550', color: '#000' }}>
                Bilancia Bluetooth
              </p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Smart Scale Pro
              </p>
            </div>
          </div>

          {state === 'connecting' && (
            <div className="flex items-center gap-2 text-[#218281]">
              <Loader2 size={16} className="animate-spin" />
              <span style={{ fontSize: '14px' }}>Connessione in corso...</span>
            </div>
          )}

          {state === 'connected' && (
            <div className="flex items-center gap-2 text-green-600">
              <Check size={16} />
              <span style={{ fontSize: '14px', fontWeight: '550' }}>Connesso con successo</span>
            </div>
          )}
        </div>
      )}

      {/* Action Button */}
      {state === 'found' && (
        <button
          onClick={handleConnect}
          className="bg-[#218281] hover:bg-[#1a6665] text-white rounded-lg px-8 py-4 transition-colors"
          style={{ fontSize: '18px', fontWeight: '550' }}
        >
          Connetti Dispositivo
        </button>
      )}

      {/* Status Messages */}
      <div className="mt-6 space-y-2 text-center">
        {state === 'searching' && (
          <p className="text-white/80" style={{ fontSize: '14px' }}>
            Assicurati che il Bluetooth sia attivo
          </p>
        )}
        {state === 'connected' && (
          <>
            <p className="text-white/80" style={{ fontSize: '14px' }}>
              Il dispositivo sincronizzerà i dati automaticamente
            </p>
            <p className="text-white/60" style={{ fontSize: '12px', marginTop: '8px' }}>
              Ritorno alla home...
            </p>
          </>
        )}
      </div>

      {/* Progress Dots */}
      <div className="mt-8 flex gap-2">
        <div className={`w-2 h-2 rounded-full ${state !== 'searching' ? 'bg-green-400' : 'bg-white/40'}`} />
        <div className={`w-2 h-2 rounded-full ${state === 'connecting' || state === 'connected' ? 'bg-green-400' : 'bg-white/40'}`} />
        <div className={`w-2 h-2 rounded-full ${state === 'connected' ? 'bg-green-400' : 'bg-white/40'}`} />
      </div>
    </div>
  );
}
