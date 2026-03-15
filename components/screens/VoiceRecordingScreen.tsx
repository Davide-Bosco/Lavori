import { useState, useEffect } from 'react';
import { Mic, Volume2 } from 'lucide-react';

interface VoiceRecordingScreenProps {
  onComplete: () => void;
}

export function VoiceRecordingScreen({ onComplete }: VoiceRecordingScreenProps) {
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    // ESC key support
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Simulate voice recognition
    const timer1 = setTimeout(() => {
      setTranscript('Quando è la mia prossima visita?');
    }, 1500);

    const timer2 = setTimeout(() => {
      setIsListening(false);
    }, 2500);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-b from-[#218281] to-[#1a6665]">
      {/* Animated Microphone */}
      <div
        className={`rounded-full bg-white flex items-center justify-center mb-8 ${
          isListening ? 'animate-pulse' : ''
        }`}
        style={{ 
          width: '120px', 
          height: '120px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}
      >
        <Mic size={60} color="#218281" />
      </div>

      {/* Status Text */}
      <p 
        className="text-white text-center mb-4"
        style={{ fontSize: '28px', fontWeight: '600' }}
      >
        {isListening ? 'Ascoltando...' : 'Elaborazione...'}
      </p>

      {/* Visual Feedback */}
      {isListening && (
        <div className="flex gap-2 mb-6">
          <div className="w-2 h-8 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-10 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          <div className="w-2 h-14 bg-white rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
          <div className="w-2 h-8 bg-white rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
        </div>
      )}

      {/* Transcript */}
      {transcript && (
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-xs">
          <div className="flex items-start gap-2">
            <Volume2 size={20} color="#FFFFFF" className="flex-shrink-0 mt-1" />
            <p className="text-white" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              "{transcript}"
            </p>
          </div>
        </div>
      )}

      {/* Help Text */}
      <p 
        className="text-white/80 text-center mt-8"
        style={{ fontSize: '14px' }}
      >
        {isListening 
          ? 'Parla ora per dare un comando vocale'
          : 'Sto cercando la risposta...'
        }
      </p>
    </div>
  );
}