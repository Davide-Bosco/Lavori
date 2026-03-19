import { Bell, Check, X, Info, AlertCircle, Calendar, FileText, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppSettings, Persona } from '../../App';
import { KeyboardEvent, useRef, useState } from 'react';
import { useVerticalListNavigation } from '../../hooks/useArrowNavigation';
import { HelpIndicator } from '../HelpIndicator';
import { ScreenHeader } from '../ScreenHeader';

interface NotificheScreenProps {
  settings: AppSettings;
  persona: Persona | null;
  onBack: () => void;
}

interface Notifica {
  id: number;
  type: 'message' | 'alert' | 'appointment' | 'document';
  icon: any;
  title: string;
  description: string;
  time: string;
  priority: 'high' | 'normal' | 'low';
  read: boolean;
}

export function NotificheScreen({ settings, persona, onBack }: NotificheScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useVerticalListNavigation(containerRef);

  const [notifiche, setNotifiche] = useState<Notifica[]>([
    { id: 1, type: 'alert', icon: AlertCircle, title: 'Promemoria Pastiglia', description: 'È ora di prendere la pastiglia delle 14:00', time: '10 min fa', priority: 'high', read: false },
    { id: 2, type: 'appointment', icon: Calendar, title: 'Visita Domani', description: 'Cardiologo Dr. Rossi ore 10:00', time: '2 ore fa', priority: 'normal', read: false },
    { id: 3, type: 'document', icon: FileText, title: 'Nuovo Referto', description: 'Esami del sangue disponibili', time: 'Ieri', priority: 'normal', read: true },
    { id: 4, type: 'message', icon: MessageSquare, title: 'Messaggio Medico', description: 'Risposta del Dr. Rossi alla tua domanda', time: '2 giorni fa', priority: 'low', read: true },
  ]);

  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const cardBg = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                 settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8';
  const cardText = settings.colorMode === 'High Contrast' ? '#000000' : textColor;
  const cardBorder = settings.colorMode === 'High Contrast' ? '3px solid #000000' : '2px solid #000';

  const markAsRead = (id: number) => {
    setNotifiche(notifiche.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotifica = (id: number) => {
    setNotifiche(notifiche.filter(n => n.id !== id));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const getPriorityColor = (priority: string) => {
    if (settings.colorMode === 'High Contrast') return '#000';
    if (priority === 'high') return '#dc2626';
    if (priority === 'normal') return '#003366';
    return '#6b7280';
  };

  const unreadNotifiche = notifiche.filter(n => !n.read);
  const readNotifiche = notifiche.filter(n => n.read);

  // Simple complexity - show only unread count and latest
  if (settings.complexity === 'Simple') {
    const latestNotifica = unreadNotifiche[0];
    
    if (!latestNotifica) {
      return (
        <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
          <ScreenHeader
            settings={settings}
            onBack={onBack}
            title={settings.language === 'Plain Language' ? 'Avvisi' : 'Notifiche'}
          />
          <div className="p-6 flex items-center justify-center" style={{ minHeight: '400px' }}>
            <div className="text-center">
              <Bell size={64} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#6b7280'} />
              <p style={{ fontSize: settings.fontSize, color: textColor, marginTop: '16px' }}>
                {settings.language === 'Plain Language' ? 'Nessun avviso' : 'Nessuna notifica'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    const Icon = latestNotifica.icon;

    return (
      <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
        <ScreenHeader
          settings={settings}
          onBack={onBack}
          title={settings.language === 'Plain Language' ? 'Avvisi' : 'Notifiche'}
        />

        <div ref={containerRef} className="p-6 space-y-6">
          <HelpIndicator settings={settings} screen="profilo" />

          {unreadNotifiche.length > 1 && (
            <div 
              className="rounded-lg p-4 text-center"
              style={{
                backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#dbeafe',
                border: settings.colorMode === 'High Contrast' ? '2px solid #000' : 'none',
              }}
            >
              <p style={{ 
                fontSize: settings.fontSize,
                fontWeight: '600',
                color: settings.colorMode === 'High Contrast' ? '#000' : '#003366'
              }}>
                {settings.language === 'Plain Language' ? `${unreadNotifiche.length} avvisi` : `${unreadNotifiche.length} nuove notifiche`}
              </p>
            </div>
          )}

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
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div 
                  className="flex items-center justify-center rounded-lg flex-shrink-0" 
                  style={{ 
                    width: '72px', 
                    height: '72px',
                    backgroundColor: getPriorityColor(latestNotifica.priority)
                  }}
                >
                  <Icon size={36} color="#FFFFFF" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p style={{ 
                    fontSize: settings.fontSize === '14px' ? '16px' : '18px',
                    fontWeight: '550', 
                    color: cardText,
                    marginBottom: '8px' 
                  }}>
                    {settings.language === 'Plain Language' ? latestNotifica.title.split(' ')[0] : latestNotifica.title}
                  </p>
                  <p style={{ 
                    fontSize: settings.fontSize,
                    color: cardText,
                    marginBottom: '8px'
                  }}>
                    {settings.language === 'Plain Language' ? latestNotifica.description.split(' ').slice(0, 4).join(' ') : latestNotifica.description}
                  </p>
                  <p style={{ 
                    fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                    color: settings.colorMode === 'High Contrast' ? '#000' : '#6b7280'
                  }}>
                    {latestNotifica.time}
                  </p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => markAsRead(latestNotifica.id)}
                className="w-full rounded-lg py-3 transition-colors"
                style={{
                  backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#003366',
                  border: settings.colorMode === 'High Contrast' ? '2px solid #FFFF00' : 'none',
                  color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFF',
                  fontSize: settings.fontSize,
                  fontWeight: '550',
                }}
                aria-label="Segna come letto"
                tabIndex={0}
              >
                {settings.language === 'Plain Language' ? 'Letto' : 'Segna come Letto'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Medium & Full complexity
  return (
    <div ref={containerRef} className="p-4 space-y-4" style={{ backgroundColor: bgColor }}>
      <ScreenHeader
        title={settings.language === 'Plain Language' ? 'Notifiche' : 'Notifiche'}
        onBack={onBack}
        settings={settings}
      />
      <HelpIndicator settings={settings} screen="profilo" />

      {unreadNotifiche.length === 0 && readNotifiche.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Bell size={48} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#6b7280'} />
            <p style={{ fontSize: settings.fontSize, color: textColor, marginTop: '12px' }}>
              {settings.language === 'Plain Language' ? 'Nessun avviso' : 'Nessuna notifica'}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Unread notifications */}
          {unreadNotifiche.length > 0 && (
            <>
              {settings.complexity === 'Full' && settings.language !== 'Icons Only' && (
                <p style={{ 
                  fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                  color: textColor,
                  fontWeight: '550',
                  marginBottom: '8px'
                }}>
                  {settings.language === 'Plain Language' ? 'Da leggere' : `Non lette (${unreadNotifiche.length})`}
                </p>
              )}
              <AnimatePresence>
                {unreadNotifiche.map((notifica, idx) => {
                  const Icon = notifica.icon;
                  return (
                    <motion.div
                      key={notifica.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: idx * 0.05 }}
                      className="rounded-lg relative"
                      style={{
                        backgroundColor: cardBg,
                        border: cardBorder,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        padding: '16px',
                      }}
                      tabIndex={0}
                      role="article"
                      aria-label={`${notifica.title}, ${notifica.time}`}
                    >
                      {/* Unread indicator */}
                      <div
                        className="absolute top-3 left-3 rounded-full"
                        style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: getPriorityColor(notifica.priority),
                        }}
                        aria-label="Non letta"
                      />

                      <div className="flex items-start gap-3 ml-3">
                        <div
                          className="flex items-center justify-center rounded-lg flex-shrink-0"
                          style={{
                            width: settings.complexity === 'Medium' ? '56px' : '48px',
                            height: settings.complexity === 'Medium' ? '56px' : '48px',
                            backgroundColor: getPriorityColor(notifica.priority),
                          }}
                        >
                          <Icon size={settings.complexity === 'Medium' ? 24 : 20} color="#FFFFFF" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <p style={{ 
                            fontSize: settings.fontSize, 
                            fontWeight: '550', 
                            color: cardText,
                            marginBottom: '4px' 
                          }}>
                            {settings.language === 'Plain Language' ? notifica.title.split(' ').slice(0, 2).join(' ') : notifica.title}
                          </p>
                          {settings.language !== 'Icons Only' && (
                            <p style={{ 
                              fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                              color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666',
                              marginBottom: '4px'
                            }}>
                              {settings.language === 'Plain Language' ? notifica.description.split(' ').slice(0, 5).join(' ') + '...' : notifica.description}
                            </p>
                          )}
                          <p style={{ 
                            fontSize: settings.fontSize === '14px' ? '11px' : '12px',
                            color: settings.colorMode === 'High Contrast' ? '#000' : '#6b7280'
                          }}>
                            {notifica.time}
                          </p>
                        </div>

                        {settings.complexity === 'Full' && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteNotifica(notifica.id)}
                            onKeyDown={(e) => handleKeyDown(e, () => deleteNotifica(notifica.id))}
                            className="rounded-full p-1"
                            style={{
                              backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#ef4444',
                            }}
                            aria-label="Elimina notifica"
                            tabIndex={0}
                          >
                            <X size={16} color="#FFFFFF" />
                          </motion.button>
                        )}
                      </div>

                      {settings.language !== 'Icons Only' && (
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => markAsRead(notifica.id)}
                          onKeyDown={(e) => handleKeyDown(e, () => markAsRead(notifica.id))}
                          className="w-full mt-3 py-2 rounded transition-colors"
                          style={{
                            backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#003366',
                            color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFF',
                            fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                          }}
                          aria-label={`Segna come letta: ${notifica.title}`}
                          tabIndex={0}
                        >
                          {settings.language === 'Plain Language' ? 'Letto' : 'Segna come Letto'}
                        </motion.button>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </>
          )}

          {/* Read notifications - only in Full complexity */}
          {settings.complexity === 'Full' && readNotifiche.length > 0 && (
            <>
              <p style={{ 
                fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                color: textColor,
                fontWeight: '550',
                marginTop: '24px',
                marginBottom: '8px'
              }}>
                {settings.language === 'Plain Language' ? 'Già lette' : `Lette (${readNotifiche.length})`}
              </p>
              {readNotifiche.map((notifica) => {
                const Icon = notifica.icon;
                return (
                  <motion.div
                    key={notifica.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="rounded-lg relative"
                    style={{
                      backgroundColor: cardBg,
                      border: `2px dashed ${settings.colorMode === 'High Contrast' ? '#000' : '#6b7280'}`,
                      padding: '12px',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} color={settings.colorMode === 'High Contrast' ? '#000' : '#6b7280'} aria-hidden="true" />
                      <div className="flex-1">
                        <p style={{ 
                          fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                          color: cardText,
                        }}>
                          {notifica.title}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteNotifica(notifica.id)}
                        onKeyDown={(e) => handleKeyDown(e, () => deleteNotifica(notifica.id))}
                        className="rounded-full p-1"
                        style={{
                          backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#ef4444',
                        }}
                        aria-label="Elimina notifica"
                        tabIndex={0}
                      >
                        <X size={14} color="#FFFFFF" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}