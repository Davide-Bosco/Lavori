import { ArrowLeft, Type, Palette, Layout, HelpCircle, Globe, Clock } from 'lucide-react';
import { AppSettings } from '../../App';

interface SettingsScreenProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  onBack: () => void;
}

export function SettingsScreen({ settings, onSettingsChange, onBack }: SettingsScreenProps) {
  const settingsConfig = [
    {
      id: 'fontSize',
      title: 'Dimensione Testo',
      description: 'Regola la dimensione del carattere',
      icon: Type,
      options: ['14px', '16px', '18px', '24px'] as const,
    },
    {
      id: 'colorMode',
      title: 'Modalità Colore',
      description: 'Scegli il contrasto dei colori',
      icon: Palette,
      options: ['Normal', 'High Contrast', 'Dark'] as const,
    },
    {
      id: 'complexity',
      title: 'Complessità Interfaccia',
      description: 'Livello di dettaglio',
      icon: Layout,
      options: ['Simple', 'Medium', 'Full'] as const,
    },
    {
      id: 'helpLevel',
      title: 'Livello Aiuto',
      description: 'Assistenza disponibile',
      icon: HelpCircle,
      options: ['None', 'Contextual', 'Full', 'Voice'] as const,
    },
    {
      id: 'language',
      title: 'Linguaggio',
      description: 'Stile di comunicazione',
      icon: Globe,
      options: ['Standard', 'Plain Language', 'Icons Only'] as const,
    },
    {
      id: 'timeout',
      title: 'Timeout Sessione',
      description: 'Tempo prima di disconnessione',
      icon: Clock,
      options: ['5min', '15min', '30min', 'None'] as const,
    },
  ];

  const handleSettingChange = (key: keyof AppSettings, value: string) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const bgColor = settings.colorMode === 'High Contrast' ? '#000000' :
                  settings.colorMode === 'Dark' ? '#1F2121' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const headerBg = settings.colorMode === 'High Contrast' ? '#000000' : '#003366';
  const headerText = settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFFFFF';
  const headerBorder = settings.colorMode === 'High Contrast' ? '3px solid #FFFF00' : 'none';

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: bgColor }}>
      {/* Header */}
      <div 
        className="sticky top-0 z-10 p-4 flex items-center gap-3" 
        style={{ 
          backgroundColor: headerBg, 
          color: headerText, 
          borderBottom: headerBorder 
        }}
      >
        <button
          onClick={onBack}
          className="p-2 rounded-lg transition-colors"
          style={{ 
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : 'rgba(255,255,255,0.1)'
          }}
          aria-label="Torna indietro"
        >
          <ArrowLeft size={24} color={settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF'} />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Impostazioni Accessibilità</h2>
      </div>

      {/* Current Configuration Summary */}
      <div 
        className="p-4" 
        style={{ 
          backgroundColor: settings.colorMode === 'High Contrast' ? '#000000' : '#003366',
          color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFFFFF',
          borderBottom: settings.colorMode === 'High Contrast' ? '3px solid #FFFF00' : 'none'
        }}
      >
        <p style={{ fontSize: '14px', marginBottom: '12px', opacity: 0.9 }}>
          Configurazione Corrente
        </p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(settings).map(([key, value]) => (
            <div 
              key={key} 
              className="rounded p-2"
              style={{ 
                backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : 'rgba(255,255,255,0.1)',
                color: settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF'
              }}
            >
              <span style={{ fontSize: '10px', opacity: 0.8 }}>
                {settingsConfig.find(s => s.id === key)?.title || key}
              </span>
              <p style={{ fontSize: '12px', fontWeight: '550', marginTop: '2px' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings List */}
      <div className="p-4 space-y-6">
        {settingsConfig.map((setting) => {
          const Icon = setting.icon;
          const currentValue = settings[setting.id as keyof AppSettings];

          return (
            <div key={setting.id} className="space-y-3">
              {/* Setting Header */}
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center bg-[#003366] rounded-lg flex-shrink-0"
                  style={{ width: '40px', height: '40px' }}
                >
                  <Icon size={20} color="#FFFFFF" />
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: settings.fontSize, fontWeight: '550', color: textColor }}>
                    {setting.title}
                  </p>
                  <p style={{ fontSize: '12px', color: settings.colorMode === 'Dark' ? '#D0D0D0' : '#666' }}>
                    {setting.description}
                  </p>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-2 ml-14">
                {setting.options.map((option) => {
                  const isActive = currentValue === option;
                  return (
                    <button
                      key={option}
                      onClick={() => handleSettingChange(setting.id as keyof AppSettings, option)}
                      className="px-3 py-2 rounded-lg transition-all"
                      style={{
                        fontSize: '12px',
                        fontWeight: isActive ? '550' : '400',
                        minHeight: '48px',
                        backgroundColor: isActive 
                          ? (settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366')
                          : (settings.colorMode === 'High Contrast' ? '#FFFFFF' : 
                             settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8'),
                        color: isActive 
                          ? (settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF')
                          : (settings.colorMode === 'High Contrast' ? '#000000' :
                             settings.colorMode === 'Dark' ? '#FFFFFF' : '#000000'),
                        border: settings.colorMode === 'High Contrast' 
                          ? (isActive ? '3px solid #000000' : '2px solid #000000')
                          : (isActive ? '2px solid #218281' : '1px solid transparent'),
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div 
                className="ml-14 h-px" 
                style={{ 
                  backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#d1d5db' 
                }} 
              />
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div 
        className="p-4 mx-4 mb-4 rounded"
        style={{
          backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#eff6ff',
          borderLeft: `4px solid ${settings.colorMode === 'High Contrast' ? '#000000' : '#003366'}`,
          color: settings.colorMode === 'High Contrast' ? '#000000' : '#000000'
        }}
      >
        <p style={{ fontSize: '14px', color: settings.colorMode === 'High Contrast' ? '#000000' : '#003366', fontWeight: '550', marginBottom: '4px' }}>
          💡 Suggerimento
        </p>
        <p style={{ fontSize: '12px', color: '#000', lineHeight: '1.5' }}>
          Le impostazioni vengono applicate immediatamente. Puoi cambiare persona dal menu principale per vedere configurazioni ottimizzate.
        </p>
      </div>

      {/* WCAG Compliance Badge */}
      <div 
        className="p-4 mx-4 mb-6 rounded text-center"
        style={{
          backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFFFF' : '#f0fdf4',
          border: `1px solid ${settings.colorMode === 'High Contrast' ? '#000000' : '#bbf7d0'}`,
        }}
      >
        <p style={{ fontSize: '16px', fontWeight: '600', color: settings.colorMode === 'High Contrast' ? '#000000' : '#16a34a', marginBottom: '4px' }}>
          ✓ WCAG 2.1 Level AA
        </p>
        <p style={{ fontSize: '12px', color: '#000' }}>
          Conforme agli standard di accessibilità
        </p>
      </div>
    </div>
  );
}