import { Pill, Clock, CheckCircle2, Bell, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings, Persona } from '../../App';
import { KeyboardEvent, useRef, useState } from 'react';
import { useVerticalListNavigation } from '../../hooks/useArrowNavigation';
import { HelpIndicator } from '../HelpIndicator';
import { ScreenHeader } from '../ScreenHeader';

interface PromemoriScreenProps {
  settings: AppSettings;
  persona: Persona | null;
  onBack: () => void;
}

interface Promemoria {
  id: number;
  type: 'medication' | 'appointment' | 'measurement';
  icon: any;
  title: string;
  description: string;
  time: string;
  completed: boolean;
  priority: 'high' | 'normal';
}

export function PromemoriScreen({ settings, persona, onBack }: PromemoriScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useVerticalListNavigation(containerRef);

  const [promemoria, setPromemoria] = useState<Promemoria[]>([
    { id: 1, type: 'medication', icon: Pill, title: 'Pastiglia Pressione', description: 'Ramipril 5mg', time: '14:00', completed: false, priority: 'high' },
    { id: 2, type: 'appointment', icon: Calendar, title: 'Visita Cardiologo', description: 'Dr. Rossi - Ore 10:00', time: 'Domani', completed: false, priority: 'normal' },
    { id: 3, type: 'measurement', icon: Bell, title: 'Misura Pressione', description: 'Controllo giornaliero', time: '18:00', completed: false, priority: 'normal' },
    { id: 4, type: 'medication', icon: Pill, title: 'Aspirina', description: 'Cardioaspirina 100mg', time: '20:00', completed: false, priority: 'normal' },
  ]);

  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const cardBg = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                 settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8';
  const cardText = settings.colorMode === 'High Contrast' ? '#000000' : textColor;
  const cardBorder = settings.colorMode === 'High Contrast' ? '3px solid #000000' : '2px solid #000';

  const toggleComplete = (id: number) => {
    setPromemoria(promemoria.map(p => 
      p.id === id ? { ...p, completed: !p.completed } : p
    ));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const activePromemoria = promemoria.filter(p => !p.completed);
  const completedPromemoria = promemoria.filter(p => p.completed);

  // Simple complexity - show only next reminder
  if (settings.complexity === 'Simple') {
    const nextReminder = activePromemoria[0];
    if (!nextReminder) {
      return (
        <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
          <ScreenHeader
            settings={settings}
            onBack={onBack}
            title={settings.language === 'Plain Language' ? 'Ricorda' : 'Promemoria'}
          />
          <div className="p-6 flex items-center justify-center" style={{ minHeight: '400px' }}>
            <div className="text-center">
              <CheckCircle2 size={64} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#10b981'} />
              <p style={{ fontSize: settings.fontSize, color: textColor, marginTop: '16px' }}>
                {settings.language === 'Plain Language' ? 'Tutto fatto!' : 'Nessun promemoria attivo'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    const Icon = nextReminder.icon;

    return (
      <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
        <ScreenHeader
          settings={settings}
          onBack={onBack}
          title={settings.language === 'Plain Language' ? 'Ricorda' : 'Promemoria'}
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
                  backgroundColor: nextReminder.priority === 'high' ? '#dc2626' : '#003366'
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
                  {settings.language === 'Plain Language' ? nextReminder.title.split(' ')[0] : nextReminder.title}
                </p>
                <p style={{ 
                  fontSize: settings.fontSize,
                  color: cardText,
                  marginBottom: '12px'
                }}>
                  {settings.language === 'Plain Language' ? `Ore ${nextReminder.time}` : nextReminder.description}
                </p>
                <p style={{ 
                  fontSize: settings.fontSize === '14px' ? '16px' : '18px',
                  fontWeight: '600',
                  color: nextReminder.priority === 'high' ? '#dc2626' : cardText
                }}>
                  {nextReminder.time}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleComplete(nextReminder.id)}
            className="w-full rounded-lg flex items-center justify-center gap-3 transition-colors"
            style={{
              height: '72px',
              backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#10b981',
              border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
              color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
            }}
            aria-label="Segna come completato"
            tabIndex={0}
          >
            <CheckCircle2 size={32} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} aria-hidden="true" />
            {settings.language !== 'Icons Only' && (
              <span style={{ fontSize: settings.fontSize, fontWeight: '550' }}>
                {settings.language === 'Plain Language' ? 'Fatto' : 'Completato'}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  // Medium & Full complexity
  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
      <ScreenHeader
        settings={settings}
        onBack={onBack}
        title={settings.language === 'Plain Language' ? 'Ricorda' : 'Promemoria'}
      />

      <div ref={containerRef} className="p-4 space-y-4">
        <HelpIndicator settings={settings} screen="home" />

        {activePromemoria.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <CheckCircle2 size={48} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#10b981'} />
              <p style={{ fontSize: settings.fontSize, color: textColor, marginTop: '12px' }}>
                {settings.language === 'Plain Language' ? 'Tutto fatto!' : 'Nessun promemoria attivo'}
              </p>
            </div>
          </div>
        ) : (
          activePromemoria.map((prom, idx) => {
            const Icon = prom.icon;
            return (
              <motion.div
                key={prom.id}
                initial={{ opacity: 0, y: 20 }}
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
                role="article"
                aria-label={`${prom.title}, ore ${prom.time}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex items-center justify-center rounded-lg"
                    style={{
                      width: settings.complexity === 'Medium' ? '64px' : '48px',
                      height: settings.complexity === 'Medium' ? '64px' : '48px',
                      backgroundColor: prom.priority === 'high' ? '#dc2626' : '#003366',
                    }}
                  >
                    <Icon size={settings.complexity === 'Medium' ? 28 : 24} color="#FFFFFF" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p style={{ 
                      fontSize: settings.fontSize, 
                      fontWeight: '550', 
                      color: cardText,
                      marginBottom: '4px' 
                    }}>
                      {settings.language === 'Plain Language' ? prom.title.split(' ').slice(0, 2).join(' ') : prom.title}
                    </p>
                    {settings.complexity === 'Full' && settings.language !== 'Icons Only' && (
                      <p style={{ 
                        fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                        color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666'
                      }}>
                        {prom.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Clock size={16} color={prom.priority === 'high' ? '#dc2626' : (settings.colorMode === 'High Contrast' ? '#000' : '#003366')} aria-hidden="true" />
                      <span style={{ 
                        fontSize: settings.fontSize,
                        fontWeight: '600',
                        color: prom.priority === 'high' ? '#dc2626' : cardText
                      }}>
                        {prom.time}
                      </span>
                    </div>
                  </div>
                </div>

                {settings.language !== 'Icons Only' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleComplete(prom.id)}
                    onKeyDown={(e) => handleKeyDown(e, () => toggleComplete(prom.id))}
                    className="w-full py-2 rounded transition-colors flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#10b981',
                      color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFF',
                      fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                    }}
                    aria-label={`Completa promemoria: ${prom.title}`}
                    tabIndex={0}
                  >
                    <CheckCircle2 size={16} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFF'} aria-hidden="true" />
                    {settings.language === 'Plain Language' ? 'Fatto' : 'Segna Completato'}
                  </motion.button>
                )}
              </motion.div>
            );
          })
        )}

        {settings.complexity === 'Full' && completedPromemoria.length > 0 && (
          <>
            <p style={{ 
              fontSize: settings.fontSize === '14px' ? '12px' : '14px',
              color: textColor,
              fontWeight: '550',
              marginTop: '24px',
              marginBottom: '8px'
            }}>
              {settings.language === 'Plain Language' ? 'Fatti' : 'Completati'}
            </p>
            {completedPromemoria.map((prom, idx) => {
              const Icon = prom.icon;
              return (
                <motion.div
                  key={prom.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="rounded-lg"
                  style={{
                    backgroundColor: cardBg,
                    border: `2px dashed ${settings.colorMode === 'High Contrast' ? '#000' : '#666'}`,
                    padding: '12px',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={24} color="#10b981" aria-hidden="true" />
                    <p style={{ 
                      fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                      color: cardText,
                      textDecoration: 'line-through'
                    }}>
                      {prom.title}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}