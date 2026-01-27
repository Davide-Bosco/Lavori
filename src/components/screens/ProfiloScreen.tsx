import { User, FileText, Bell, Shield, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings, Persona } from '../../App';
import { CardItem } from '../CardItem';

interface ProfiloScreenProps {
  settings: AppSettings;
  persona: Persona;
  onSettingsClick: () => void;
  onLogout?: () => void;
}

export function ProfiloScreen({ settings, persona, onSettingsClick, onLogout }: ProfiloScreenProps) {
  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';

  // Persona names and ages
  const personaData = {
    maria: { name: 'Maria Rossi', age: 75, email: 'maria.rossi@email.it' },
    giorgio: { name: 'Giorgio Bianchi', age: 78, email: 'giorgio.b@email.it' },
    angela: { name: 'Angela Verdi', age: 82, email: 'angela.v@email.it' },
  };

  const currentPersona = personaData[persona];

  // Simple complexity
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
              {settings.language === 'Plain Language' ? '📍 Il tuo profilo' : '💡 Le tue informazioni'}
            </p>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div 
            className="inline-flex items-center justify-center bg-[#003366] rounded-full mb-4" 
            style={{ width: '96px', height: '96px' }}
          >
            <User size={48} color="#FFFFFF" />
          </div>
          <p style={{ fontSize: settings.fontSize === '14px' ? '18px' : '20px', fontWeight: '550', color: textColor }}>
            {currentPersona.name}
          </p>
          <p style={{ fontSize: settings.fontSize, color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#666', marginTop: '8px' }}>
            {currentPersona.age} {settings.language === 'Plain Language' ? 'anni' : 'anni'}
          </p>
        </motion.div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSettingsClick}
          className="w-full rounded-lg flex items-center justify-center gap-3 transition-colors"
          style={{
            height: '72px',
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366',
            border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
            color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
          }}
        >
          <User size={32} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} />
          {settings.language !== 'Icons Only' && (
            <span style={{ fontSize: settings.fontSize, fontWeight: '550' }}>
              {settings.language === 'Plain Language' ? 'Opzioni' : 'Impostazioni'}
            </span>
          )}
        </motion.button>
      </div>
    );
  }

  // Medium complexity
  if (settings.complexity === 'Medium') {
    return (
      <div className="p-4 space-y-6" style={{ backgroundColor: bgColor }}>
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
          <p style={{ fontSize: settings.fontSize, fontWeight: '550', color: textColor }}>
            {currentPersona.name}
          </p>
          <p style={{ fontSize: settings.fontSize === '14px' ? '14px' : '16px', color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#666', marginTop: '4px' }}>
            {currentPersona.age} anni
          </p>
        </motion.div>

        <CardItem
          icon={User}
          title={settings.language === 'Plain Language' ? 'Info' : 'Info Personali'}
          subtitle={settings.language === 'Plain Language' ? 'I tuoi dati' : 'Nome, Data nascita'}
          onClick={onSettingsClick}
          settings={settings}
        />

        <CardItem
          icon={FileText}
          title={settings.language === 'Plain Language' ? 'Documenti' : 'Documenti'}
          subtitle={settings.language === 'Plain Language' ? 'Esami e referti' : 'Referti e Esami'}
          onClick={() => {}}
          settings={settings}
        />

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full rounded-lg flex items-center justify-center gap-3 transition-colors"
          style={{
            height: '64px',
            backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#d1d5db',
            border: settings.colorMode === 'High Contrast' ? '2px solid #FFFF00' : 'none',
            color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#000',
          }}
        >
          <LogOut size={24} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#000'} />
          {settings.language !== 'Icons Only' && (
            <span style={{ fontSize: settings.fontSize, fontWeight: '550' }}>
              {settings.language === 'Plain Language' ? 'Esci' : 'Esci'}
            </span>
          )}
        </motion.button>
      </div>
    );
  }

  // Full complexity
  return (
    <div className="p-4 space-y-4" style={{ backgroundColor: bgColor }}>
      {settings.helpLevel === 'Full' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-l-4 p-3 rounded"
          style={{
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#dbeafe',
            borderLeft: settings.colorMode === 'High Contrast' ? '4px solid #000' : '4px solid #2563eb',
          }}
        >
          <p style={{ 
            fontSize: settings.fontSize === '14px' ? '12px' : '14px',
            color: settings.colorMode === 'High Contrast' ? '#000' : '#1e40af',
            fontWeight: '550' 
          }}>
            💡 {settings.language === 'Plain Language' ? 'Gestisci i tuoi dati' : 'Gestisci il tuo profilo e le impostazioni'}
          </p>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-4"
      >
        <div 
          className="inline-flex items-center justify-center bg-[#003366] rounded-full mb-3" 
          style={{ width: '80px', height: '80px' }}
        >
          <User size={40} color="#FFFFFF" />
        </div>
        <p style={{ fontSize: settings.fontSize, fontWeight: '550', color: textColor }}>
          {currentPersona.name}
        </p>
        <p style={{ 
          fontSize: settings.fontSize === '14px' ? '11px' : '12px',
          color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#666',
          marginTop: '4px' 
        }}>
          {settings.language === 'Plain Language' ? currentPersona.email.split('@')[0] : currentPersona.email}
        </p>
      </motion.div>

      <CardItem
        icon={User}
        title={settings.language === 'Plain Language' ? 'Info' : 'Info Personali'}
        subtitle={settings.language === 'Plain Language' ? 'I tuoi dati' : 'Nome, Data nascita, Tessera sanitaria'}
        onClick={onSettingsClick}
        settings={settings}
      />

      <CardItem
        icon={Bell}
        title={settings.language === 'Plain Language' ? 'Avvisi' : 'Notifiche'}
        subtitle={settings.language === 'Plain Language' ? 'Ricordati' : 'Gestisci promemoria e avvisi'}
        onClick={() => {}}
        settings={settings}
      />

      <CardItem
        icon={FileText}
        title={settings.language === 'Plain Language' ? 'Documenti' : 'Documenti'}
        subtitle={settings.language === 'Plain Language' ? 'Esami' : 'Referti, Esami, Cartella clinica'}
        onClick={() => {}}
        settings={settings}
      />

      <CardItem
        icon={Shield}
        title={settings.language === 'Plain Language' ? 'Privacy' : 'Privacy e Sicurezza'}
        subtitle={settings.language === 'Plain Language' ? 'I tuoi dati' : 'Gestisci i tuoi dati'}
        onClick={() => {}}
        settings={settings}
      />

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onLogout}
        className="w-full mt-4 rounded-lg p-3 flex items-center justify-center gap-2 transition-colors"
        style={{
          backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#dc2626',
          border: settings.colorMode === 'High Contrast' ? '2px solid #FFFF00' : 'none',
          color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFF',
          fontSize: settings.fontSize,
        }}
      >
        <LogOut size={20} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFF'} />
        {settings.language !== 'Icons Only' && (
          <span>{settings.language === 'Plain Language' ? 'Esci' : 'Esci dall\'App'}</span>
        )}
      </motion.button>
    </div>
  );
}