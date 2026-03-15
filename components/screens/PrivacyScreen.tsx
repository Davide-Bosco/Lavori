import { Shield, Lock, Eye, EyeOff, Trash2, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings, Persona } from '../../App';
import { KeyboardEvent, useRef, useState } from 'react';
import { useVerticalListNavigation } from '../../hooks/useArrowNavigation';
import { HelpIndicator } from '../HelpIndicator';
import { ScreenHeader } from '../ScreenHeader';

interface PrivacyScreenProps {
  settings: AppSettings;
  persona: Persona | null;
  onBack: () => void;
}

interface PrivacySetting {
  id: string;
  icon: any;
  title: string;
  description: string;
  enabled: boolean;
  type: 'toggle' | 'action';
}

export function PrivacyScreen({ settings, persona, onBack }: PrivacyScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useVerticalListNavigation(containerRef);

  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
    { id: 'data-sharing', icon: Lock, title: 'Condivisione Dati', description: 'Condividi dati sanitari con il medico', enabled: true, type: 'toggle' },
    { id: 'analytics', icon: Eye, title: 'Analisi Utilizzo', description: 'Aiutaci a migliorare l\'app', enabled: false, type: 'toggle' },
    { id: 'biometric', icon: Lock, title: 'Blocco Biometrico', description: 'Usa impronta digitale per accedere', enabled: true, type: 'toggle' },
    { id: 'export-data', icon: Download, title: 'Esporta Dati', description: 'Scarica tutti i tuoi dati', enabled: true, type: 'action' },
    { id: 'delete-account', icon: Trash2, title: 'Elimina Account', description: 'Rimuovi permanentemente i tuoi dati', enabled: true, type: 'action' },
  ]);

  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const cardBg = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                 settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8';
  const cardText = settings.colorMode === 'High Contrast' ? '#000000' : textColor;
  const cardBorder = settings.colorMode === 'High Contrast' ? '3px solid #000000' : '2px solid #000';

  const toggleSetting = (id: string) => {
    setPrivacySettings(privacySettings.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const handleAction = (id: string, title: string) => {
    if (id === 'delete-account') {
      alert(`${title}\n\nQuesta azione richiede conferma aggiuntiva.\n(In un'app reale, verrebbe mostrata una schermata di conferma)`);
    } else {
      alert(`${title}\n\n(In un'app reale, verrebbe eseguita l'azione)`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // Simple complexity - show only security status
  if (settings.complexity === 'Simple') {
    const securityEnabled = privacySettings.filter(s => s.type === 'toggle' && s.enabled).length;
    const totalSecurity = privacySettings.filter(s => s.type === 'toggle').length;

    return (
      <div ref={containerRef} className="p-6 space-y-6" style={{ backgroundColor: bgColor }}>
        <HelpIndicator settings={settings} screen="profilo" />

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
                backgroundColor: securityEnabled === totalSecurity ? '#10b981' : '#f59e0b'
              }}
            >
              <Shield size={48} color="#FFFFFF" aria-hidden="true" />
            </div>
            <div>
              <p style={{ 
                fontSize: settings.fontSize === '14px' ? '18px' : settings.fontSize === '16px' ? '20px' : '22px',
                fontWeight: '550', 
                color: cardText,
                marginBottom: '8px' 
              }}>
                {settings.language === 'Plain Language' ? 'Privacy' : 'Sicurezza e Privacy'}
              </p>
              <p style={{ 
                fontSize: settings.fontSize,
                color: cardText,
                marginBottom: '8px'
              }}>
                {settings.language === 'Plain Language' ? 
                  (securityEnabled === totalSecurity ? 'Tutto protetto' : 'Controlla impostazioni') :
                  `${securityEnabled} su ${totalSecurity} protezioni attive`
                }
              </p>
              <div 
                className="rounded-full mt-4"
                style={{
                  height: '12px',
                  backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#4b5563' : '#d1d5db',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(securityEnabled / totalSecurity) * 100}%`,
                    backgroundColor: securityEnabled === totalSecurity ? '#10b981' : '#f59e0b',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-lg p-4"
          style={{
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#dbeafe',
            border: settings.colorMode === 'High Contrast' ? '2px solid #000' : 'none',
          }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} color={settings.colorMode === 'High Contrast' ? '#000' : '#003366'} aria-hidden="true" />
            <p style={{ 
              fontSize: settings.fontSize === '14px' ? '12px' : '14px',
              color: settings.colorMode === 'High Contrast' ? '#000' : '#003366',
              lineHeight: '1.5'
            }}>
              {settings.language === 'Plain Language' ? 
                'I tuoi dati sono protetti' :
                'I tuoi dati sanitari sono protetti secondo le normative GDPR'
              }
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Medium & Full complexity
  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
      <ScreenHeader 
        settings={settings}
        title={settings.language === 'Plain Language' ? 'Privacy' : 'Privacy'} 
        onBack={onBack} 
      />

      <div ref={containerRef} className="p-4 space-y-4">
        <HelpIndicator settings={settings} screen="profilo" />

        {/* Security status banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg p-4"
          style={{
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#dcfce7',
            border: settings.colorMode === 'High Contrast' ? '2px solid #000' : '1px solid #10b981',
          }}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 size={24} color={settings.colorMode === 'High Contrast' ? '#000' : '#10b981'} aria-hidden="true" />
            <div className="flex-1">
              <p style={{ 
                fontSize: settings.fontSize,
                fontWeight: '550',
                color: settings.colorMode === 'High Contrast' ? '#000' : '#10b981'
              }}>
                {settings.language === 'Plain Language' ? 'Dati Protetti' : 'I tuoi dati sono protetti'}
              </p>
              {settings.complexity === 'Full' && settings.language !== 'Icons Only' && (
                <p style={{ 
                  fontSize: settings.fontSize === '14px' ? '11px' : '12px',
                  color: settings.colorMode === 'High Contrast' ? '#000' : '#059669',
                  marginTop: '4px'
                }}>
                  Conformità GDPR • Crittografia end-to-end
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Privacy settings */}
        {privacySettings.map((setting, idx) => {
          const Icon = setting.icon;
          const isToggle = setting.type === 'toggle';
          const isDestructive = setting.id === 'delete-account';

          return (
            <motion.div
              key={setting.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-lg"
              style={{
                backgroundColor: cardBg,
                border: cardBorder,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                padding: '16px',
              }}
              tabIndex={0}
              role="article"
              aria-label={`${setting.title}, ${setting.enabled ? 'attivo' : 'disattivo'}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    width: settings.complexity === 'Medium' ? '56px' : '48px',
                    height: settings.complexity === 'Medium' ? '56px' : '48px',
                    backgroundColor: isDestructive ? '#dc2626' : (isToggle && setting.enabled ? '#10b981' : '#6b7280'),
                  }}
                >
                  {isToggle && setting.id === 'analytics' && !setting.enabled ? (
                    <EyeOff size={settings.complexity === 'Medium' ? 24 : 20} color="#FFFFFF" aria-hidden="true" />
                  ) : (
                    <Icon size={settings.complexity === 'Medium' ? 24 : 20} color="#FFFFFF" aria-hidden="true" />
                  )}
                </div>
                <div className="flex-1">
                  <p style={{ 
                    fontSize: settings.fontSize, 
                    fontWeight: '550', 
                    color: cardText,
                    marginBottom: '4px' 
                  }}>
                    {settings.language === 'Plain Language' ? setting.title.split(' ')[0] : setting.title}
                  </p>
                  {settings.language !== 'Icons Only' && (
                    <p style={{ 
                      fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                      color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666'
                    }}>
                      {settings.language === 'Plain Language' ? setting.description.split(' ').slice(0, 3).join(' ') : setting.description}
                    </p>
                  )}
                </div>

                {isToggle && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSetting(setting.id)}
                    onKeyDown={(e) => handleKeyDown(e, () => toggleSetting(setting.id))}
                    className="rounded-full transition-colors"
                    style={{
                      width: settings.complexity === 'Medium' ? '52px' : '48px',
                      height: settings.complexity === 'Medium' ? '28px' : '24px',
                      backgroundColor: setting.enabled ? 
                        (settings.colorMode === 'High Contrast' ? '#000' : '#10b981') : 
                        (settings.colorMode === 'High Contrast' ? '#666' : '#d1d5db'),
                      position: 'relative',
                      border: settings.colorMode === 'High Contrast' ? '2px solid #000' : 'none',
                    }}
                    aria-label={`${setting.enabled ? 'Disattiva' : 'Attiva'} ${setting.title}`}
                    tabIndex={0}
                  >
                    <motion.div
                      animate={{ x: setting.enabled ? (settings.complexity === 'Medium' ? 26 : 24) : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      style={{
                        width: settings.complexity === 'Medium' ? '22px' : '18px',
                        height: settings.complexity === 'Medium' ? '22px' : '18px',
                        borderRadius: '50%',
                        backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFFFFF',
                        position: 'absolute',
                        top: '1px',
                      }}
                    />
                  </motion.button>
                )}
              </div>

              {!isToggle && settings.language !== 'Icons Only' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction(setting.id, setting.title)}
                  onKeyDown={(e) => handleKeyDown(e, () => handleAction(setting.id, setting.title))}
                  className="w-full mt-3 py-2 rounded transition-colors"
                  style={{
                    backgroundColor: isDestructive ? 
                      (settings.colorMode === 'High Contrast' ? '#000' : '#dc2626') :
                      (settings.colorMode === 'High Contrast' ? '#000' : '#003366'),
                    color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFF',
                    fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                  }}
                  aria-label={setting.title}
                  tabIndex={0}
                >
                  {settings.language === 'Plain Language' ? 
                    (isDestructive ? 'Elimina' : 'Scarica') : 
                    setting.title
                  }
                </motion.button>
              )}
            </motion.div>
          );
        })}

        {/* GDPR info - Full complexity only */}
        {settings.complexity === 'Full' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg p-3"
            style={{
              backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : settings.colorMode === 'Dark' ? '#2a2a2a' : '#f0f9ff',
              border: settings.colorMode === 'High Contrast' ? '2px solid #000' : '1px dashed #003366',
            }}
          >
            <p style={{ 
              fontSize: settings.fontSize === '14px' ? '11px' : '12px',
              color: settings.colorMode === 'High Contrast' ? '#000' : textColor,
              lineHeight: '1.6'
            }}>
              {settings.language === 'Plain Language' ? 
                'I tuoi dati sanitari sono protetti secondo le leggi europee sulla privacy (GDPR).' :
                'I tuoi dati sanitari sono protetti secondo il Regolamento Generale sulla Protezione dei Dati (GDPR). Hai il diritto di accedere, modificare ed eliminare i tuoi dati in qualsiasi momento.'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}