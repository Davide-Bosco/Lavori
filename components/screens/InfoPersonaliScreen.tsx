import { motion } from 'motion/react';
import { ChevronLeft, User, Calendar, CreditCard, Mail, Phone } from 'lucide-react';
import { AppSettings, Persona } from '../../App';

interface InfoPersonaliScreenProps {
  settings: AppSettings;
  persona: Persona | null;
  onBack: () => void;
}

// Dati completi delle personas
const personaData = {
  maria: {
    nome: 'Maria',
    cognome: 'Rossi',
    dataNascita: '15/03/1951',
    tesseraSanitaria: 'RSSMRA51C55H501Z',
    email: 'maria.rossi@email.it',
    telefono: '+39 345 678 9012',
    codiceFiscale: 'RSSMRA51C55H501Z',
  },
  giorgio: {
    nome: 'Giorgio',
    cognome: 'Bianchi',
    dataNascita: '22/08/1948',
    tesseraSanitaria: 'BNCGRG48M22F205W',
    email: 'giorgio.b@email.it',
    telefono: '+39 347 123 4567',
    codiceFiscale: 'BNCGRG48M22F205W',
  },
  angela: {
    nome: 'Angela',
    cognome: 'Verdi',
    dataNascita: '10/11/1944',
    tesseraSanitaria: 'VRDNGL44S50L219X',
    email: 'angela.v@email.it',
    telefono: '+39 349 876 5432',
    codiceFiscale: 'VRDNGL44S50L219X',
  },
};

export function InfoPersonaliScreen({ settings, persona, onBack }: InfoPersonaliScreenProps) {
  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const cardBg = settings.colorMode === 'Dark' ? '#2a2a2a' :
                 settings.colorMode === 'High Contrast' ? '#000000' : '#F5F5F5';
  const borderColor = settings.colorMode === 'High Contrast' ? '#FFFF00' : 'transparent';

  const currentPersona = persona ? personaData[persona] : null;

  const infoFields = [
    { icon: User, label: 'Nome', value: currentPersona?.nome || '-' },
    { icon: User, label: 'Cognome', value: currentPersona?.cognome || '-' },
    { icon: Calendar, label: 'Data di Nascita', value: currentPersona?.dataNascita || '-' },
    { icon: CreditCard, label: 'Tessera Sanitaria', value: currentPersona?.tesseraSanitaria || '-' },
    { icon: CreditCard, label: 'Codice Fiscale', value: currentPersona?.codiceFiscale || '-' },
    { icon: Mail, label: 'Email', value: currentPersona?.email || '-' },
    { icon: Phone, label: 'Telefono', value: currentPersona?.telefono || '-' },
  ];

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: bgColor }}>
      {/* Header with back button */}
      <div 
        className="flex items-center gap-3 p-4 border-b"
        style={{ 
          borderColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#E5E7EB',
          backgroundColor: settings.colorMode === 'Dark' ? '#2a2a2a' : settings.colorMode === 'High Contrast' ? '#000' : '#FFF'
        }}
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center justify-center rounded-lg"
          style={{
            width: '44px',
            height: '44px',
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366',
            border: settings.colorMode === 'High Contrast' ? '2px solid #000' : 'none',
          }}
          aria-label="Torna al profilo"
        >
          <ChevronLeft size={24} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} />
        </motion.button>
        <h1 
          style={{ 
            fontSize: settings.fontSize === '14px' ? '18px' : settings.fontSize === '16px' ? '20px' : '24px',
            fontWeight: '600',
            color: textColor,
            margin: 0,
          }}
        >
          {settings.language === 'Plain Language' ? 'I Tuoi Dati' : 'Informazioni Personali'}
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Avatar and name */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div 
            className="inline-flex items-center justify-center bg-[#003366] rounded-full mb-4" 
            style={{ width: '96px', height: '96px' }}
          >
            <User size={48} color="#FFFFFF" />
          </div>
          <p style={{ fontSize: settings.fontSize === '14px' ? '18px' : '20px', fontWeight: '600', color: textColor }}>
            {currentPersona ? `${currentPersona.nome} ${currentPersona.cognome}` : 'Nessun utente selezionato'}
          </p>
          {!currentPersona && (
            <p style={{ 
              fontSize: settings.fontSize, 
              color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#666',
              marginTop: '8px',
              fontStyle: 'italic'
            }}>
              Effettua il login per visualizzare i dati personali
            </p>
          )}
        </motion.div>

        {/* Info fields */}
        {infoFields.map((field, index) => {
          const Icon = field.icon;
          return (
            <motion.div
              key={field.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-lg p-4"
              style={{
                backgroundColor: cardBg,
                border: settings.colorMode === 'High Contrast' ? '2px solid #FFFF00' : '1px solid #E5E7EB',
              }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p 
                    style={{ 
                      fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                      color: settings.colorMode === 'High Contrast' ? '#FFFF00' : settings.colorMode === 'Dark' ? '#9CA3AF' : '#6B7280',
                      margin: 0,
                      marginBottom: '4px',
                    }}
                  >
                    {field.label}
                  </p>
                  <p 
                    style={{ 
                      fontSize: settings.fontSize,
                      fontWeight: '550',
                      color: textColor,
                      margin: 0,
                      wordBreak: 'break-word',
                    }}
                  >
                    {field.value}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Note per accesso ospite */}
        {!currentPersona && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg p-4 mt-6"
            style={{
              backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#2a2a2a' : '#FEF3C7',
              border: settings.colorMode === 'High Contrast' ? '2px solid #FFFF00' : '1px solid #F59E0B',
            }}
          >
            <p 
              style={{ 
                fontSize: settings.fontSize,
                color: settings.colorMode === 'High Contrast' ? '#FFFF00' : settings.colorMode === 'Dark' ? '#F5F5F5' : '#92400E',
                margin: 0,
                textAlign: 'center',
              }}
            >
              ⚠️ Accesso ospite attivo. Le informazioni personali non sono disponibili.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
