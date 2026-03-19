import { Heart, Activity, Droplet, Wind, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings, Persona } from '../../App';
import { KeyboardEvent, useRef } from 'react';
import { useVerticalListNavigation } from '../../hooks/useArrowNavigation';
import { HelpIndicator } from '../HelpIndicator';
import { ScreenHeader } from '../ScreenHeader';

interface MisurazioniScreenProps {
  settings: AppSettings;
  persona: Persona | null;
  onBack: () => void;
}

interface Misurazione {
  type: 'pressure' | 'heart' | 'oxygen' | 'glucose';
  icon: any;
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'alert';
  date: string;
  time: string;
}

export function MisurazioniScreen({ settings, persona, onBack }: MisurazioniScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useVerticalListNavigation(containerRef);

  const misurazioni: Misurazione[] = [
    { type: 'pressure', icon: Activity, label: 'Pressione', value: '120/80', unit: 'mmHg', status: 'normal', date: '15 Mar', time: '09:30' },
    { type: 'heart', icon: Heart, label: 'Battito Cardiaco', value: '72', unit: 'bpm', status: 'normal', date: '15 Mar', time: '09:30' },
    { type: 'oxygen', icon: Wind, label: 'Saturazione', value: '98', unit: '%', status: 'normal', date: '15 Mar', time: '09:25' },
    { type: 'glucose', icon: Droplet, label: 'Glicemia', value: '95', unit: 'mg/dL', status: 'normal', date: '15 Mar', time: '08:00' },
  ];

  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const cardBg = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                 settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8';
  const cardText = settings.colorMode === 'High Contrast' ? '#000000' : textColor;
  const cardBorder = settings.colorMode === 'High Contrast' ? '3px solid #000000' : '2px solid #000';

  const getStatusColor = (status: string) => {
    if (settings.colorMode === 'High Contrast') return '#000';
    if (status === 'normal') return '#10b981';
    if (status === 'warning') return '#f59e0b';
    return '#ef4444';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
    }
  };

  // Simple complexity - show only latest pressure
  if (settings.complexity === 'Simple') {
    const mainMisurazione = misurazioni[0];
    const Icon = mainMisurazione.icon;

    return (
      <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
        {/* Header with Back Button */}
        <ScreenHeader
          settings={settings}
          onBack={onBack}
          title={settings.language === 'Plain Language' ? 'Salute' : 'Misurazioni'}
        />

        <div ref={containerRef} className="p-6 space-y-6">
          <HelpIndicator settings={settings} screen="home" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg p-8"
            style={{
              backgroundColor: cardBg,
              border: cardBorder,
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div 
                className="flex items-center justify-center rounded-lg" 
                style={{ 
                  width: '96px', 
                  height: '96px',
                  backgroundColor: getStatusColor(mainMisurazione.status)
                }}
              >
                <Icon size={48} color="#FFFFFF" aria-hidden="true" />
              </div>
              <div>
                <p style={{ 
                  fontSize: settings.fontSize === '14px' ? '18px' : settings.fontSize === '16px' ? '20px' : '22px',
                  fontWeight: '550', 
                  color: cardText,
                  marginBottom: '8px' 
                }}>
                  {settings.language === 'Plain Language' ? 'Pressione' : mainMisurazione.label}
                </p>
                <p style={{ 
                  fontSize: settings.fontSize === '14px' ? '24px' : settings.fontSize === '16px' ? '28px' : '32px',
                  fontWeight: '600',
                  color: cardText,
                  marginBottom: '4px'
                }}>
                  {mainMisurazione.value}
                </p>
                <p style={{ fontSize: settings.fontSize, color: cardText, opacity: 0.8 }}>
                  {settings.language === 'Plain Language' ? 'OK' : mainMisurazione.unit}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg flex items-center justify-center gap-3 transition-colors"
            style={{
              height: '72px',
              backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#218281',
              border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
              color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
            }}
            aria-label="Nuova misurazione"
            tabIndex={0}
          >
            <TrendingUp size={32} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} aria-hidden="true" />
            {settings.language !== 'Icons Only' && (
              <span style={{ fontSize: settings.fontSize, fontWeight: '550' }}>
                {settings.language === 'Plain Language' ? 'Misura' : 'Nuova Misurazione'}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  // Medium complexity - show all measurements with icons
  if (settings.complexity === 'Medium') {
    return (
      <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
        {/* Header with Back Button */}
        <ScreenHeader
          settings={settings}
          onBack={onBack}
          title={settings.language === 'Plain Language' ? 'Salute' : 'Misurazioni'}
        />

        <div ref={containerRef} className="p-4 space-y-4">
          <HelpIndicator settings={settings} screen="home" />

          {misurazioni.map((mis, idx) => {
            const Icon = mis.icon;
            return (
              <motion.div
                key={mis.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-lg p-6"
                style={{
                  backgroundColor: cardBg,
                  border: cardBorder,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                role="article"
                aria-label={`${mis.label}: ${mis.value} ${mis.unit}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center rounded-lg"
                    style={{
                      width: '72px',
                      height: '72px',
                      backgroundColor: getStatusColor(mis.status),
                    }}
                  >
                    <Icon size={36} color="#FFFFFF" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p style={{ 
                      fontSize: settings.fontSize, 
                      fontWeight: '550', 
                      color: cardText,
                      marginBottom: '4px' 
                    }}>
                      {settings.language === 'Plain Language' ? mis.label.split(' ')[0] : mis.label}
                    </p>
                    <p style={{ 
                      fontSize: settings.fontSize === '14px' ? '20px' : '24px',
                      fontWeight: '600',
                      color: cardText
                    }}>
                      {mis.value} <span style={{ fontSize: settings.fontSize, opacity: 0.7 }}>{mis.unit}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full mt-2 rounded-lg p-4 flex items-center justify-center gap-2 transition-colors"
            style={{
              backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#218281',
              border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
              color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
              fontSize: settings.fontSize,
            }}
            aria-label="Nuova misurazione"
            tabIndex={0}
          >
            <TrendingUp size={20} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} aria-hidden="true" />
            {settings.language !== 'Icons Only' && (
              <span>{settings.language === 'Plain Language' ? 'Misura Ora' : 'Nuova Misurazione'}</span>
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  // Full complexity - detailed view with history
  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
      <ScreenHeader
        settings={settings}
        onBack={onBack}
        title={settings.language === 'Plain Language' ? 'Salute' : 'Misurazioni'}
      />

      <div ref={containerRef} className="p-4 space-y-3">
        <HelpIndicator settings={settings} screen="home" />

        {misurazioni.map((mis, idx) => {
          const Icon = mis.icon;
          return (
            <motion.div
              key={mis.type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-lg"
              style={{
                backgroundColor: cardBg,
                border: cardBorder,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                padding: '16px',
              }}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              role="article"
              aria-label={`${mis.label}: ${mis.value} ${mis.unit}, misurata ${mis.date} alle ${mis.time}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: getStatusColor(mis.status),
                  }}
                >
                  <Icon size={24} color="#FFFFFF" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p style={{ 
                    fontSize: settings.fontSize,
                    fontWeight: '550',
                    color: cardText,
                    marginBottom: '2px'
                  }}>
                    {mis.label}
                  </p>
                  <p style={{ 
                    fontSize: settings.fontSize === '14px' ? '18px' : '20px',
                    fontWeight: '600',
                    color: cardText
                  }}>
                    {mis.value} <span style={{ fontSize: settings.fontSize === '14px' ? '12px' : '14px', opacity: 0.7 }}>{mis.unit}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-14">
                <Calendar size={14} color={settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666'} aria-hidden="true" />
                <span style={{ 
                  fontSize: settings.fontSize === '14px' ? '11px' : '12px',
                  color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666'
                }}>
                  {settings.language === 'Plain Language' ? `${mis.date} ore ${mis.time}` : `Ultima: ${mis.date} alle ${mis.time}`}
                </span>
              </div>

              {settings.language !== 'Icons Only' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-3 w-full py-2 rounded transition-colors"
                  style={{
                    backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#003366',
                    color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFF',
                    fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                  }}
                  aria-label={`Storico ${mis.label}`}
                  tabIndex={0}
                >
                  {settings.language === 'Plain Language' ? 'Storico' : 'Vedi Storico'}
                </motion.button>
              )}
            </motion.div>
          );
        })}

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full mt-2 rounded-lg p-4 flex items-center justify-center gap-2 transition-colors"
          style={{
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#218281',
            border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
            color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
            fontSize: settings.fontSize,
          }}
          aria-label="Nuova misurazione"
          tabIndex={0}
        >
          <TrendingUp size={20} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} aria-hidden="true" />
          {settings.language !== 'Icons Only' && (
            <span>{settings.language === 'Plain Language' ? 'Nuova Misura' : 'Aggiungi Misurazione'}</span>
          )}
        </motion.button>
      </div>
    </div>
  );
}