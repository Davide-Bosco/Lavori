import { Phone, Ambulance, Pill, Users, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings, Persona } from '../../App';

interface SOSScreenProps {
  settings: AppSettings;
  persona: Persona;
}

export function SOSScreen({ settings, persona }: SOSScreenProps) {
  const contacts = [
    { name: 'Emergenza 118', subtitle: 'Chiama subito', phone: '118', type: 'emergency', icon: Ambulance },
    { name: 'Medico di Base', subtitle: 'Dr.ssa Bianchi', phone: '02 1234567', type: 'doctor', icon: Phone },
    { name: 'Farmacia di Turno', subtitle: 'Via Roma 15 - Aperta', phone: '02 7654321', type: 'pharmacy', icon: Pill },
    { name: 'Contatto Familiare', subtitle: 'Figlia - Anna', phone: '333 1234567', type: 'family', icon: Users },
  ];

  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';

  const handleCall = (phone: string, name: string) => {
    alert(`Chiamata a ${name}: ${phone}\n\n(In un'app reale, questo aprirebbe il dialer)`);
  };

  // Simple complexity - show only emergency and doctor
  if (settings.complexity === 'Simple') {
    return (
      <div className="p-6 space-y-6" style={{ backgroundColor: bgColor }}>
        {settings.helpLevel === 'Full' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg p-3"
            style={{
              backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#fecaca',
              border: settings.colorMode === 'High Contrast' ? '2px solid #000' : '2px solid #dc2626',
            }}
          >
            <p style={{ fontSize: settings.fontSize, fontWeight: '550', color: settings.colorMode === 'High Contrast' ? '#000' : '#dc2626', textAlign: 'center' }}>
              {settings.language === 'Plain Language' ? '🚨 Per aiuto' : '🚨 Solo per emergenze'}
            </p>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCall('118', 'Emergenza 118')}
          className="w-full rounded-lg p-8 transition-colors"
          style={{
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#dc2626',
            border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
            color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
            boxShadow: '0 4px 12px rgba(220,38,38,0.3)',
          }}
        >
          <div className="flex flex-col items-center gap-4">
            <Ambulance size={64} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFFFFF'} />
            <div className="text-center">
              <p style={{ fontSize: settings.fontSize === '14px' ? '20px' : '24px', fontWeight: '600', marginBottom: '8px' }}>
                {settings.language === 'Plain Language' ? 'Emergenza' : 'Emergenza 118'}
              </p>
              <p style={{ fontSize: settings.fontSize }}>
                {settings.language === 'Plain Language' ? 'Tocca qui' : 'Tocca per chiamare'}
              </p>
            </div>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCall('02 1234567', 'Medico di Base')}
          className="w-full rounded-lg flex items-center justify-center gap-4 transition-colors"
          style={{
            height: '96px',
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFFFF' : '#003366',
            border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
            color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
          }}
        >
          <Phone size={40} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} />
          {settings.language !== 'Icons Only' && (
            <span style={{ fontSize: settings.fontSize, fontWeight: '550' }}>
              {settings.language === 'Plain Language' ? 'Dottore' : 'Chiama il Dottore'}
            </span>
          )}
        </motion.button>
      </div>
    );
  }

  // Medium complexity - show all contacts with medium size
  if (settings.complexity === 'Medium') {
    return (
      <div className="p-4 space-y-4" style={{ backgroundColor: bgColor }}>
        {settings.helpLevel === 'Voice' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-teal-50 border-l-4 border-teal-500 p-3 rounded"
          >
            <p style={{ fontSize: settings.fontSize, fontWeight: '550', color: '#0f766e' }}>
              🎤 {settings.language === 'Plain Language' ? 'Di\' "Chiama dottore"' : 'Usa comandi vocali per chiamare'}
            </p>
          </motion.div>
        )}

        {contacts.map((contact, idx) => {
          const Icon = contact.icon;
          const isEmergency = contact.type === 'emergency';

          return (
            <motion.button
              key={contact.phone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCall(contact.phone, contact.name)}
              className="w-full rounded-lg p-6 transition-colors text-white"
              style={{
                backgroundColor: settings.colorMode === 'High Contrast' 
                  ? (isEmergency ? '#FFFF00' : '#FFFFFF')
                  : (isEmergency ? '#dc2626' : '#003366'),
                border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
                color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
                boxShadow: isEmergency ? '0 4px 12px rgba(220,38,38,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: '72px',
                    height: '72px',
                    backgroundColor: settings.colorMode === 'High Contrast' 
                      ? '#000'
                      : (isEmergency ? '#991b1b' : '#001f3f'),
                  }}
                >
                  <Icon size={36} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFFFFF'} />
                </div>
                <div className="flex-1 text-left">
                  <p style={{ fontSize: settings.fontSize, fontWeight: '550', marginBottom: '4px' }}>
                    {settings.language === 'Plain Language' && contact.name === 'Emergenza 118' ? 'Emergenza' : 
                     settings.language === 'Plain Language' && contact.name === 'Medico di Base' ? 'Dottore' :
                     settings.language === 'Plain Language' && contact.name === 'Farmacia di Turno' ? 'Farmacia' :
                     settings.language === 'Plain Language' && contact.name === 'Contatto Familiare' ? 'Famiglia' :
                     contact.name}
                  </p>
                  {settings.language !== 'Icons Only' && (
                    <p style={{ fontSize: settings.fontSize === '14px' ? '14px' : '16px', opacity: 0.9 }}>
                      {contact.phone}
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    );
  }

  // Full complexity - detailed view
  return (
    <div className="p-4 space-y-3" style={{ backgroundColor: bgColor }}>
      {settings.helpLevel === 'Full' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-l-4 p-3 rounded mb-3"
          style={{
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#fecaca',
            borderLeft: settings.colorMode === 'High Contrast' ? '4px solid #000' : '4px solid #dc2626',
          }}
        >
          <p style={{ 
            fontSize: settings.fontSize === '14px' ? '12px' : '14px',
            color: settings.colorMode === 'High Contrast' ? '#000' : '#dc2626',
            fontWeight: '550' 
          }}>
            ⚠️ {settings.language === 'Plain Language' ? 'Solo per aiuto vero' : 'Usa solo in caso di vera emergenza'}
          </p>
        </motion.div>
      )}

      {contacts.map((contact, idx) => {
        const Icon = contact.icon;
        const isEmergency = contact.type === 'emergency';

        return (
          <motion.div
            key={contact.phone}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-lg"
            style={{
              backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8',
              border: `2px solid ${settings.colorMode === 'High Contrast' ? '#000' : isEmergency ? '#dc2626' : '#000'}`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              padding: '16px',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: isEmergency ? '#dc2626' : '#003366',
                }}
              >
                <Icon size={24} color="#FFFFFF" />
              </div>
              <div className="flex-1">
                <p style={{ 
                  fontSize: settings.fontSize,
                  fontWeight: '550',
                  color: settings.colorMode === 'High Contrast' ? '#000' : textColor,
                  marginBottom: '4px' 
                }}>
                  {settings.language === 'Plain Language' && contact.name === 'Emergenza 118' ? 'Emergenza' : 
                   settings.language === 'Plain Language' && contact.name === 'Medico di Base' ? 'Dottore' :
                   settings.language === 'Plain Language' && contact.name === 'Farmacia di Turno' ? 'Farmacia' :
                   settings.language === 'Plain Language' && contact.name === 'Contatto Familiare' ? 'Famiglia' :
                   contact.name}
                </p>
                {settings.language !== 'Icons Only' && (
                  <p style={{ 
                    fontSize: settings.fontSize === '14px' ? '11px' : '12px',
                    color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666' 
                  }}>
                    {settings.language === 'Plain Language' ? contact.subtitle.split(' ')[0] : contact.subtitle}
                  </p>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCall(contact.phone, contact.name)}
              className="w-full py-2 rounded transition-colors text-white"
              style={{
                backgroundColor: isEmergency ? '#dc2626' : '#003366',
                fontSize: settings.fontSize,
                fontWeight: '550',
              }}
            >
              {settings.language === 'Icons Only' ? '📞' : `📞 ${settings.language === 'Plain Language' ? 'Chiama' : 'Chiama ' + contact.phone}`}
            </motion.button>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 p-3 rounded-lg flex items-start gap-2"
        style={{
          backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : settings.colorMode === 'Dark' ? '#2a2a2a' : '#f0f9ff',
          border: settings.colorMode === 'High Contrast' ? '2px solid #000' : '1px dashed #003366',
        }}
      >
        <MapPin size={16} color={settings.colorMode === 'High Contrast' ? '#000' : '#003366'} style={{ marginTop: '2px' }} />
        <p style={{ 
          fontSize: settings.fontSize === '14px' ? '11px' : '12px',
          color: settings.colorMode === 'High Contrast' ? '#000' : textColor 
        }}>
          {settings.language === 'Plain Language' ? 'La tua posizione sarà condivisa' : 'La tua posizione verrà condivisa automaticamente in caso di emergenza'}
        </p>
      </motion.div>
    </div>
  );
}
