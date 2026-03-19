import { Calendar, Pill, Stethoscope, Phone, Mic, Bluetooth, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings, Persona, Screen } from '../../App';
import { CardItem } from '../CardItem';
import { VoiceIoTButtons } from '../VoiceIoTButtons';
import { HelpIndicator } from '../HelpIndicator';

interface HomeScreenProps {
  settings: AppSettings;
  persona: Persona | null;
  onVoiceClick: () => void;
  onIoTClick: () => void;
  onSettingsClick: () => void;
  onNavigate: (screen: Screen) => void;
}

// Fixed icon sizes for non-Voice/IoT elements
const getIconSize = (fontSize: string, type: 'settings' | 'card-main') => {
  if (type === 'settings') {
    // Settings button
    if (fontSize === '24px') return 24;
    if (fontSize === '18px') return 22;
    return 20; // 14px and 16px
  }
  
  if (type === 'card-main') {
    // Main card in Simple mode
    if (fontSize === '24px') return 56;
    if (fontSize === '18px') return 52;
    return 48; // 14px and 16px
  }
  
  return 32;
};

export function HomeScreen({ settings, persona, onVoiceClick, onIoTClick, onSettingsClick, onNavigate }: HomeScreenProps) {
  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';

  const handleDisabledFeature = () => {
    alert('Schermata non ancora abilitata, funzionalità limitate');
  };

  // Simple complexity - minimal cards, large elements
  if (settings.complexity === 'Simple') {
    return (
      <div className="p-6 space-y-6" style={{ backgroundColor: bgColor }}>
        {/* Help indicator - UNIFIED */}
        <HelpIndicator settings={settings} screen="home" />

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-lg p-8 cursor-pointer"
          style={{
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8',
            border: settings.colorMode === 'High Contrast' ? '3px solid #000' : '2px solid #000',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
          onClick={() => onNavigate('visite')}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center justify-center bg-[#003366] rounded-lg" style={{ width: '96px', height: '96px' }}>
              <Calendar size={getIconSize(settings.fontSize, 'card-main')} color="#FFFFFF" />
            </div>
            <div>
              <p style={{ 
                fontSize: settings.fontSize === '14px' ? '18px' : settings.fontSize === '16px' ? '20px' : '22px',
                fontWeight: '550', 
                color: settings.colorMode === 'High Contrast' ? '#000' : textColor,
                marginBottom: '8px' 
              }}>
                {settings.language === 'Plain Language' ? 'Visita oggi' : 'Prossima Visita'}
              </p>
              <p style={{ fontSize: settings.fontSize, color: settings.colorMode === 'High Contrast' ? '#000' : textColor, lineHeight: '1.5' }}>
                Dr. Rossi {settings.language === 'Plain Language' ? 'ore 10' : '- 15 Gen, 10:00'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Large action buttons */}
        <VoiceIoTButtons
          onVoiceClick={onVoiceClick}
          onIoTClick={onIoTClick}
          settings={settings}
          layout="stacked"
        />

        <button
          onClick={onSettingsClick}
          className="w-full rounded-lg p-3 flex items-center justify-center gap-2 transition-colors"
          style={{
            backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#d1d5db',
            border: settings.colorMode === 'High Contrast' ? '2px solid #FFFF00' : 'none',
            color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#000',
          }}
          aria-label={settings.language === 'Plain Language' ? 'Apri Opzioni' : 'Apri Impostazioni'}
          tabIndex={0}
        >
          <Settings size={getIconSize(settings.fontSize, 'settings')} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#000'} aria-hidden="true" />
          {settings.language !== 'Icons Only' && (
            <span style={{ fontSize: settings.fontSize, fontWeight: '500' }}>
              {settings.language === 'Plain Language' ? 'Opzioni' : 'Impostazioni'}
            </span>
          )}
        </button>
      </div>
    );
  }

  // Medium complexity - 3-4 cards
  if (settings.complexity === 'Medium') {
    return (
      <div className="p-4 space-y-4" style={{ backgroundColor: bgColor }}>
        {/* Help indicator - UNIFIED */}
        <HelpIndicator settings={settings} screen="home" />

        <CardItem
          icon={Calendar}
          title={settings.language === 'Plain Language' ? 'Visite' : 'Prossima Visita'}
          subtitle={settings.language === 'Plain Language' ? 'Dr. Rossi oggi' : 'Dr. Rossi - 15 Gen, 10:00'}
          onClick={() => onNavigate('visite')}
          settings={settings}
        />

        <CardItem
          icon={Pill}
          title={settings.language === 'Plain Language' ? 'Medicine' : 'Ricette Attive'}
          subtitle={settings.language === 'Plain Language' ? '3 medicine' : '3 farmaci disponibili'}
          onClick={() => onNavigate('ricette')}
          settings={settings}
        />

        <CardItem
          icon={Stethoscope}
          title={settings.language === 'Plain Language' ? 'Salute' : 'Misurazioni'}
          subtitle={settings.language === 'Plain Language' ? 'Pressione OK' : 'Ultima: Pressione 120/80'}
          onClick={() => onNavigate('misurazioni')}
          settings={settings}
        />

        <VoiceIoTButtons
          onVoiceClick={onVoiceClick}
          onIoTClick={onIoTClick}
          settings={settings}
        />

        <button
          onClick={onSettingsClick}
          className="w-full rounded-lg p-3 flex items-center justify-center gap-2 transition-colors"
          style={{
            backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#d1d5db',
            border: settings.colorMode === 'High Contrast' ? '2px solid #FFFF00' : 'none',
            color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#000',
          }}
        >
          <Settings size={getIconSize(settings.fontSize, 'settings')} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#000'} />
          {settings.language !== 'Icons Only' && (
            <span style={{ fontSize: settings.fontSize, fontWeight: '500' }}>
              {settings.language === 'Plain Language' ? 'Opzioni' : 'Impostazioni'}
            </span>
          )}
        </button>
      </div>
    );
  }

  // Full complexity - all features
  return (
    <div className="p-4 space-y-3" style={{ backgroundColor: bgColor }}>
      {/* Help indicator - UNIFIED */}
      <HelpIndicator settings={settings} screen="home" />

      <CardItem
        icon={Calendar}
        title={settings.language === 'Plain Language' ? 'Visite' : 'Prossima Visita'}
        subtitle={settings.language === 'Plain Language' ? 'Dr. Rossi oggi 10:00' : 'Dr. Rossi - 15 Gen, 10:00'}
        onClick={() => onNavigate('visite')}
        settings={settings}
      />

      <CardItem
        icon={Pill}
        title={settings.language === 'Plain Language' ? 'Medicine' : 'Ricette Attive'}
        subtitle={settings.language === 'Plain Language' ? '3 medicine pronte' : '3 farmaci disponibili'}
        onClick={() => onNavigate('ricette')}
        settings={settings}
      />

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
      >
        <CardItem
          icon={Stethoscope}
          title={settings.language === 'Plain Language' ? 'Salute' : 'Misurazioni'}
          subtitle={settings.language === 'Plain Language' ? 'Pressione OK' : 'Ultima: Pressione 120/80'}
          onClick={() => onNavigate('misurazioni')}
          settings={settings}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
      >
        <CardItem
          icon={Calendar}
          title={settings.language === 'Plain Language' ? 'Ricorda' : 'Promemoria'}
          subtitle={settings.language === 'Plain Language' ? 'Pastiglia ore 14' : 'Prendi la pastiglia delle 14:00'}
          onClick={() => onNavigate('promemoria')}
          settings={settings}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
      >
        <CardItem
          icon={Phone}
          title={settings.language === 'Plain Language' ? 'Telefoni' : 'Contatti'}
          subtitle={settings.language === 'Plain Language' ? 'Medico e famiglia' : 'Medico, Farmacia, Famiglia'}
          onClick={() => onNavigate('sos')}
          settings={settings}
        />
      </motion.div>

      <VoiceIoTButtons
        onVoiceClick={onVoiceClick}
        onIoTClick={onIoTClick}
        settings={settings}
      />

      <button
        onClick={onSettingsClick}
        className="w-full rounded-lg p-3 flex items-center justify-center gap-2 transition-colors mt-2"
        style={{
          backgroundColor: settings.colorMode === 'High Contrast' ? '#000000' : '#d1d5db',
          border: settings.colorMode === 'High Contrast' ? '2px solid #FFFF00' : 'none',
          color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#000000',
        }}
      >
        <Settings size={getIconSize(settings.fontSize, 'settings')} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#000000'} />
        {settings.language !== 'Icons Only' && (
          <span style={{ fontSize: settings.fontSize, fontWeight: '500' }}>
            {settings.language === 'Plain Language' ? 'Opzioni' : 'Impostazioni'}
          </span>
        )}
      </button>
    </div>
  );
}