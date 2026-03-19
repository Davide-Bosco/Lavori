import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings } from '../App';

interface ScreenHeaderProps {
  title: string;
  settings: AppSettings;
  onBack: () => void;
}

export function ScreenHeader({ title, settings, onBack }: ScreenHeaderProps) {
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';

  return (
    <div 
      className="flex items-center gap-3 p-4"
      style={{
        backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8',
        borderBottom: `2px solid ${settings.colorMode === 'High Contrast' ? '#000' : '#000'}`,
      }}
    >
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="rounded-lg p-2"
        style={{
          backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#003366',
        }}
        aria-label={settings.language === 'Plain Language' ? 'Indietro' : 'Torna Indietro'}
        tabIndex={0}
      >
        <ArrowLeft size={24} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFF'} />
      </motion.button>
      {settings.language !== 'Icons Only' && (
        <h1 style={{
          fontSize: settings.fontSize === '14px' ? '18px' : settings.fontSize === '16px' ? '20px' : '24px',
          fontWeight: '600',
          color: settings.colorMode === 'High Contrast' ? '#000' : textColor,
        }}>
          {title}
        </h1>
      )}
    </div>
  );
}