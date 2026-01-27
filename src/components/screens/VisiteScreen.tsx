import { Stethoscope, Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings, Persona } from '../../App';

interface VisiteScreenProps {
  settings: AppSettings;
  persona: Persona;
  onNavigate: (screen: string) => void;
}

export function VisiteScreen({ settings, persona }: VisiteScreenProps) {
  const visite = [
    { doctor: 'Dr. Rossi', specialty: 'Cardiologo', date: '15 Gen', time: '10:00', location: 'Ospedale San Raffaele' },
    { doctor: 'Dr.ssa Bianchi', specialty: 'Medicina Generale', date: '22 Gen', time: '15:30', location: 'Studio Medico Via Roma' },
  ];

  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const cardBg = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                 settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8';
  const cardText = settings.colorMode === 'High Contrast' ? '#000000' : textColor;
  const cardBorder = settings.colorMode === 'High Contrast' ? '3px solid #000000' : '1px solid #000';

  // Simple complexity - show only first appointment, large
  if (settings.complexity === 'Simple') {
    return (
      <div className="p-6 space-y-6" style={{ backgroundColor: bgColor }}>
        {settings.helpLevel === 'Full' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg p-3"
            style={{
              backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#dbeafe',
              border: settings.colorMode === 'High Contrast' ? '2px solid #000' : '2px solid #2563eb',
            }}
          >
            <p style={{ fontSize: settings.fontSize, fontWeight: '550', color: settings.colorMode === 'High Contrast' ? '#000' : '#1e40af', textAlign: 'center' }}>
              {settings.language === 'Plain Language' ? '📍 I tuoi appuntamenti' : '💡 Prossimo appuntamento'}
            </p>
          </motion.div>
        )}

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
            <div className="flex items-center justify-center bg-[#003366] rounded-lg" style={{ width: '96px', height: '96px' }}>
              <Stethoscope size={48} color="#FFFFFF" />
            </div>
            <div>
              <p style={{ 
                fontSize: settings.fontSize === '14px' ? '18px' : settings.fontSize === '16px' ? '20px' : '22px',
                fontWeight: '550', 
                color: cardText,
                marginBottom: '8px' 
              }}>
                {visite[0].doctor}
              </p>
              <p style={{ fontSize: settings.fontSize, color: cardText, lineHeight: '1.5' }}>
                {settings.language === 'Plain Language' ? `${visite[0].date} ore ${visite[0].time}` : `${visite[0].date} alle ${visite[0].time}`}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-lg flex items-center justify-center gap-3 transition-colors"
          style={{
            height: '72px',
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366',
            border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
            color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
          }}
        >
          <Calendar size={32} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} />
          {settings.language !== 'Icons Only' && (
            <span style={{ fontSize: settings.fontSize, fontWeight: '550' }}>
              {settings.language === 'Plain Language' ? 'Nuova visita' : 'Prenota Nuova'}
            </span>
          )}
        </motion.button>
      </div>
    );
  }

  // Medium & Full complexity - show all visits
  return (
    <div className="p-4 space-y-4" style={{ backgroundColor: bgColor }}>
      {settings.helpLevel === 'Voice' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-teal-50 border-l-4 border-teal-500 p-3 rounded"
        >
          <p style={{ fontSize: settings.fontSize, fontWeight: '550', color: '#0f766e' }}>
            🎤 {settings.language === 'Plain Language' ? 'Di\' "Mostra visite"' : 'Usa comandi vocali'}
          </p>
        </motion.div>
      )}

      {visite.map((visita, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={settings.complexity === 'Full' ? { scale: 1.01 } : {}}
          className="rounded-lg cursor-pointer transition-shadow"
          style={{
            backgroundColor: cardBg,
            border: cardBorder,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '16px',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex items-center justify-center bg-[#003366] rounded-lg"
              style={{ width: settings.complexity === 'Medium' ? '64px' : '48px', height: settings.complexity === 'Medium' ? '64px' : '48px' }}
            >
              <Stethoscope size={settings.complexity === 'Medium' ? 28 : 24} color="#FFFFFF" />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: settings.fontSize, fontWeight: '550', color: cardText, marginBottom: '4px' }}>
                {visita.doctor}
              </p>
              <p style={{ 
                fontSize: settings.fontSize === '14px' ? '12px' : settings.fontSize === '16px' ? '14px' : '16px',
                color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666' 
              }}>
                {settings.language === 'Plain Language' ? visita.specialty.split(' ')[0] : visita.specialty}
              </p>
            </div>
          </div>

          <div className={settings.complexity === 'Full' ? 'space-y-2 ml-14' : 'space-y-2'}>
            <div className="flex items-center gap-2">
              <Clock size={16} color={settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666'} />
              <span style={{ 
                fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666' 
              }}>
                {settings.language === 'Plain Language' ? `${visita.date} ore ${visita.time}` : `${visita.date} alle ${visita.time}`}
              </span>
            </div>
            {settings.complexity === 'Full' && (
              <div className="flex items-center gap-2">
                <MapPin size={16} color={settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666'} />
                <span style={{ 
                  fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                  color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666' 
                }}>
                  {settings.language === 'Plain Language' ? visita.location.split(' ').slice(0, 2).join(' ') : visita.location}
                </span>
              </div>
            )}
          </div>

          {settings.complexity === 'Full' && settings.language !== 'Icons Only' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 w-full py-2 rounded transition-colors"
              style={{
                backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#003366',
                color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFF',
                fontSize: settings.fontSize === '14px' ? '12px' : '14px',
              }}
            >
              {settings.language === 'Plain Language' ? 'Info' : 'Dettagli Visita'}
            </motion.button>
          )}
        </motion.div>
      ))}

      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 rounded-lg p-4 flex items-center justify-center gap-2 transition-colors"
        style={{
          backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#218281',
          border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
          color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
          fontSize: settings.fontSize,
        }}
      >
        <Calendar size={20} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} />
        {settings.language !== 'Icons Only' && (
          <span>{settings.language === 'Plain Language' ? 'Prenota' : 'Prenota Nuova Visita'}</span>
        )}
      </motion.button>
    </div>
  );
}
