import { Stethoscope, Calendar, MapPin, Clock, Phone, FileText, User } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings, Persona } from '../../App';
import { ScreenHeader } from '../ScreenHeader';
import { HelpIndicator } from '../HelpIndicator';

interface VisitaDetailsScreenProps {
  settings: AppSettings;
  persona: Persona | null;
  visita: {
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    location: string;
    address?: string;
    phone?: string;
    notes?: string;
  };
  onBack: () => void;
}

export function VisitaDetailsScreen({ settings, persona, visita, onBack }: VisitaDetailsScreenProps) {
  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const cardBg = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                 settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8';
  const cardText = settings.colorMode === 'High Contrast' ? '#000000' : textColor;
  const cardBorder = settings.colorMode === 'High Contrast' ? '3px solid #000000' : '2px solid #000';

  const detailItems = [
    {
      icon: User,
      label: settings.language === 'Plain Language' ? 'Dottore' : 'Medico',
      value: visita.doctor,
      show: true,
    },
    {
      icon: Stethoscope,
      label: settings.language === 'Plain Language' ? 'Tipo' : 'Specialità',
      value: visita.specialty,
      show: settings.complexity !== 'Simple',
    },
    {
      icon: Calendar,
      label: settings.language === 'Plain Language' ? 'Giorno' : 'Data',
      value: visita.date,
      show: true,
    },
    {
      icon: Clock,
      label: settings.language === 'Plain Language' ? 'Ora' : 'Orario',
      value: visita.time,
      show: true,
    },
    {
      icon: MapPin,
      label: settings.language === 'Plain Language' ? 'Dove' : 'Luogo',
      value: visita.location,
      show: true,
    },
    {
      icon: MapPin,
      label: settings.language === 'Plain Language' ? 'Indirizzo' : 'Indirizzo Completo',
      value: visita.address || 'Via Roma 123, Milano',
      show: settings.complexity === 'Full',
    },
    {
      icon: Phone,
      label: settings.language === 'Plain Language' ? 'Telefono' : 'Numero di Telefono',
      value: visita.phone || '02 1234567',
      show: settings.complexity === 'Full',
    },
  ];

  // Simple complexity - minimal details
  if (settings.complexity === 'Simple') {
    return (
      <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
        <ScreenHeader
          settings={settings}
          onBack={onBack}
          title={settings.language === 'Plain Language' ? 'Visita' : 'Dettagli Visita'}
        />

        <div className="p-6 space-y-6">
          <HelpIndicator settings={settings} screen="visite" />

          {/* Doctor Card */}
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
                className="flex items-center justify-center bg-[#003366] rounded-lg" 
                style={{ width: '96px', height: '96px' }}
              >
                <Stethoscope size={48} color="#FFFFFF" aria-hidden="true" />
              </div>
              <div>
                <p style={{ 
                  fontSize: settings.fontSize === '14px' ? '20px' : settings.fontSize === '16px' ? '22px' : '24px',
                  fontWeight: '600', 
                  color: cardText,
                  marginBottom: '8px' 
                }}>
                  {visita.doctor}
                </p>
                <p style={{ 
                  fontSize: settings.fontSize === '14px' ? '16px' : settings.fontSize === '16px' ? '18px' : '20px',
                  color: cardText,
                  marginBottom: '16px'
                }}>
                  {visita.date} - {visita.time}
                </p>
                <p style={{ 
                  fontSize: settings.fontSize,
                  color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666'
                }}>
                  {visita.location}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Notes if available */}
          {visita.notes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg p-4"
              style={{
                backgroundColor: cardBg,
                border: cardBorder,
              }}
            >
              <div className="flex items-start gap-3">
                <FileText size={24} color={settings.colorMode === 'High Contrast' ? '#000' : '#003366'} aria-hidden="true" />
                <div>
                  <p style={{ 
                    fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                    fontWeight: '550',
                    color: cardText,
                    marginBottom: '4px'
                  }}>
                    {settings.language === 'Plain Language' ? 'Note' : 'Note Importanti'}
                  </p>
                  <p style={{ fontSize: settings.fontSize, color: cardText }}>
                    {visita.notes}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Medium & Full complexity - detailed view
  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
      <ScreenHeader
        settings={settings}
        onBack={onBack}
        title={settings.language === 'Plain Language' ? 'Visita' : 'Dettagli Visita'}
      />

      <div className="p-4 space-y-4">
        <HelpIndicator settings={settings} screen="visite" />

        {/* Main Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg p-6"
          style={{
            backgroundColor: cardBg,
            border: cardBorder,
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="flex items-center justify-center bg-[#003366] rounded-lg" 
              style={{ 
                width: settings.complexity === 'Medium' ? '72px' : '64px', 
                height: settings.complexity === 'Medium' ? '72px' : '64px' 
              }}
            >
              <Stethoscope size={settings.complexity === 'Medium' ? 36 : 32} color="#FFFFFF" aria-hidden="true" />
            </div>
            <div>
              <p style={{ 
                fontSize: settings.fontSize === '14px' ? '16px' : settings.fontSize === '16px' ? '18px' : '20px',
                fontWeight: '600', 
                color: cardText,
                marginBottom: '4px' 
              }}>
                {visita.doctor}
              </p>
              <p style={{ 
                fontSize: settings.fontSize,
                color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666'
              }}>
                {visita.specialty}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-3 mt-4">
            {detailItems.filter(item => item.show).map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded"
                  style={{
                    backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#1F2121' : '#F5F5F5',
                    border: settings.colorMode === 'High Contrast' ? '2px solid #FFFF00' : 'none',
                  }}
                >
                  <Icon 
                    size={20} 
                    color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366'} 
                    aria-hidden="true" 
                  />
                  <div className="flex-1">
                    {settings.language !== 'Icons Only' && (
                      <>
                        <p style={{ 
                          fontSize: settings.fontSize === '14px' ? '12px' : '13px',
                          color: settings.colorMode === 'High Contrast' ? '#FFFF00' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666',
                          marginBottom: '2px'
                        }}>
                          {item.label}
                        </p>
                        <p style={{ 
                          fontSize: settings.fontSize,
                          fontWeight: '550',
                          color: settings.colorMode === 'High Contrast' ? '#FFFF00' : textColor
                        }}>
                          {item.value}
                        </p>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Notes Section */}
        {visita.notes && settings.complexity === 'Full' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg p-4"
            style={{
              backgroundColor: cardBg,
              border: cardBorder,
            }}
          >
            <div className="flex items-start gap-3">
              <FileText size={24} color={settings.colorMode === 'High Contrast' ? '#000' : '#003366'} aria-hidden="true" />
              <div>
                <p style={{ 
                  fontSize: settings.fontSize,
                  fontWeight: '550',
                  color: cardText,
                  marginBottom: '8px'
                }}>
                  {settings.language === 'Plain Language' ? 'Note' : 'Note e Preparazione'}
                </p>
                <p style={{ 
                  fontSize: settings.fontSize === '14px' ? '13px' : settings.fontSize,
                  color: cardText,
                  lineHeight: '1.6'
                }}>
                  {visita.notes || 'Portare documenti precedenti e tessera sanitaria'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons for Full mode */}
        {settings.complexity === 'Full' && settings.language !== 'Icons Only' && (
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="flex-1 rounded-lg py-4 flex items-center justify-center gap-2"
              style={{
                backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366',
                border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
                color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
              }}
              aria-label="Chiama struttura"
            >
              <Phone size={20} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} aria-hidden="true" />
              <span style={{ fontSize: settings.fontSize, fontWeight: '550' }}>
                {settings.language === 'Plain Language' ? 'Chiama' : 'Chiama Struttura'}
              </span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="flex-1 rounded-lg py-4 flex items-center justify-center gap-2"
              style={{
                backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#E8E8E8',
                border: settings.colorMode === 'High Contrast' ? '3px solid #FFFF00' : '2px solid #000',
                color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#000',
              }}
              aria-label="Vedi sulla mappa"
            >
              <MapPin size={20} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366'} aria-hidden="true" />
              <span style={{ fontSize: settings.fontSize, fontWeight: '550' }}>
                {settings.language === 'Plain Language' ? 'Mappa' : 'Vedi Mappa'}
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
