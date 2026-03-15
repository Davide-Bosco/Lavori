import { FileText, Download, Eye, Calendar, User, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings, Persona } from '../../App';
import { KeyboardEvent, useRef } from 'react';
import { useVerticalListNavigation } from '../../hooks/useArrowNavigation';
import { HelpIndicator } from '../HelpIndicator';
import { ScreenHeader } from '../ScreenHeader';

interface DocumentiScreenProps {
  settings: AppSettings;
  persona: Persona | null;
  onBack: () => void;
}

interface Documento {
  id: number;
  type: 'exam' | 'prescription' | 'report' | 'visit';
  icon: any;
  title: string;
  description: string;
  date: string;
  doctor?: string;
  size?: string;
}

export function DocumentiScreen({ settings, persona, onBack }: DocumentiScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useVerticalListNavigation(containerRef);

  const documenti: Documento[] = [
    { id: 1, type: 'exam', icon: FileText, title: 'Esami del Sangue', description: 'Emocromo completo', date: '10 Mar 2026', doctor: 'Dr.ssa Bianchi', size: '2.3 MB' },
    { id: 2, type: 'report', icon: FileText, title: 'Referto Cardiologico', description: 'ECG e Ecocardiogramma', date: '05 Mar 2026', doctor: 'Dr. Rossi', size: '1.8 MB' },
    { id: 3, type: 'prescription', icon: FileText, title: 'Ricetta Farmaci', description: 'Ramipril, Aspirina', date: '01 Mar 2026', doctor: 'Dr.ssa Bianchi', size: '450 KB' },
    { id: 4, type: 'visit', icon: FileText, title: 'Visita Medica', description: 'Controllo di routine', date: '20 Feb 2026', doctor: 'Dr.ssa Bianchi', size: '890 KB' },
  ];

  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const cardBg = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                 settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8';
  const cardText = settings.colorMode === 'High Contrast' ? '#000000' : textColor;
  const cardBorder = settings.colorMode === 'High Contrast' ? '3px solid #000000' : '2px solid #000';

  const handleDownload = (doc: Documento) => {
    alert(`Download: ${doc.title}\n\n(In un'app reale, questo scaricherebbe il file)`);
  };

  const handleView = (doc: Documento) => {
    alert(`Visualizza: ${doc.title}\n\n(In un'app reale, questo aprirebbe il documento)`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const getTypeColor = (type: string) => {
    if (settings.colorMode === 'High Contrast') return '#000';
    switch (type) {
      case 'exam': return '#10b981';
      case 'prescription': return '#6366f1';
      case 'report': return '#f59e0b';
      case 'visit': return '#003366';
      default: return '#6b7280';
    }
  };

  // Simple complexity - show only latest document
  if (settings.complexity === 'Simple') {
    const latestDoc = documenti[0];
    const Icon = latestDoc.icon;

    return (
      <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
        <ScreenHeader
          settings={settings}
          onBack={onBack}
          title={settings.language === 'Plain Language' ? 'Documenti' : 'Documenti'}
        />

        <div ref={containerRef} className="p-6 space-y-6">
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
                  backgroundColor: getTypeColor(latestDoc.type)
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
                  {settings.language === 'Plain Language' ? latestDoc.title.split(' ')[0] : latestDoc.title}
                </p>
                <p style={{ 
                  fontSize: settings.fontSize,
                  color: cardText,
                  marginBottom: '8px'
                }}>
                  {latestDoc.description}
                </p>
                <p style={{ 
                  fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                  color: settings.colorMode === 'High Contrast' ? '#000' : '#6b7280'
                }}>
                  {latestDoc.date}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => handleView(latestDoc)}
            className="w-full rounded-lg flex items-center justify-center gap-3 transition-colors"
            style={{
              height: '72px',
              backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366',
              border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
              color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
            }}
            aria-label="Visualizza documento"
            tabIndex={0}
          >
            <Eye size={32} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} aria-hidden="true" />
            {settings.language !== 'Icons Only' && (
              <span style={{ fontSize: settings.fontSize, fontWeight: '550' }}>
                {settings.language === 'Plain Language' ? 'Apri' : 'Visualizza'}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  // Medium & Full complexity
  return (
    <div ref={containerRef} className="p-4 space-y-4" style={{ backgroundColor: bgColor }}>
      <ScreenHeader
        settings={settings}
        title="Documenti"
        onBack={onBack}
      />

      <HelpIndicator settings={settings} screen="profilo" />

      {documenti.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <FileText size={48} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#6b7280'} />
            <p style={{ fontSize: settings.fontSize, color: textColor, marginTop: '12px' }}>
              {settings.language === 'Plain Language' ? 'Nessun documento' : 'Nessun documento disponibile'}
            </p>
          </div>
        </div>
      ) : (
        documenti.map((doc, idx) => {
          const Icon = doc.icon;
          return (
            <motion.div
              key={doc.id}
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
              aria-label={`${doc.title}, ${doc.date}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    width: settings.complexity === 'Medium' ? '64px' : '48px',
                    height: settings.complexity === 'Medium' ? '64px' : '48px',
                    backgroundColor: getTypeColor(doc.type),
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
                    {settings.language === 'Plain Language' ? doc.title.split(' ').slice(0, 2).join(' ') : doc.title}
                  </p>
                  {settings.language !== 'Icons Only' && (
                    <p style={{ 
                      fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                      color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666',
                      marginBottom: '4px'
                    }}>
                      {doc.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar size={14} color={settings.colorMode === 'High Contrast' ? '#000' : '#6b7280'} aria-hidden="true" />
                    <span style={{ 
                      fontSize: settings.fontSize === '14px' ? '11px' : '12px',
                      color: settings.colorMode === 'High Contrast' ? '#000' : '#6b7280'
                    }}>
                      {doc.date}
                    </span>
                  </div>
                  {settings.complexity === 'Full' && doc.doctor && settings.language !== 'Icons Only' && (
                    <p style={{ 
                      fontSize: settings.fontSize === '14px' ? '11px' : '12px',
                      color: settings.colorMode === 'High Contrast' ? '#000' : '#6b7280',
                      marginTop: '4px'
                    }}>
                      {settings.language === 'Plain Language' ? doc.doctor.split(' ')[0] : doc.doctor}
                    </p>
                  )}
                </div>
              </div>

              <div className={`flex gap-2 ${settings.language === 'Icons Only' ? 'justify-center' : ''}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleView(doc)}
                  onKeyDown={(e) => handleKeyDown(e, () => handleView(doc))}
                  className="flex-1 py-2 rounded transition-colors flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: settings.colorMode === 'High Contrast' ? '#000' : '#003366',
                    color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFF',
                    fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                  }}
                  aria-label={`Visualizza ${doc.title}`}
                  tabIndex={0}
                >
                  <Eye size={16} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFF'} aria-hidden="true" />
                  {settings.language !== 'Icons Only' && (
                    <span>{settings.language === 'Plain Language' ? 'Apri' : 'Visualizza'}</span>
                  )}
                </motion.button>

                {settings.complexity === 'Full' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDownload(doc)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleDownload(doc))}
                    className="flex-1 py-2 rounded transition-colors flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#218281',
                      color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
                      fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                    }}
                    aria-label={`Scarica ${doc.title}`}
                    tabIndex={0}
                  >
                    <Download size={16} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} aria-hidden="true" />
                    {settings.language !== 'Icons Only' && (
                      <span>{settings.language === 'Plain Language' ? 'Scarica' : 'Download'}</span>
                    )}
                  </motion.button>
                )}
              </div>

              {settings.complexity === 'Full' && doc.size && settings.language !== 'Icons Only' && (
                <p style={{ 
                  fontSize: settings.fontSize === '14px' ? '10px' : '11px',
                  color: settings.colorMode === 'High Contrast' ? '#000' : '#6b7280',
                  marginTop: '8px',
                  textAlign: 'center'
                }}>
                  {doc.size}
                </p>
              )}
            </motion.div>
          );
        })
      )}
    </div>
  );
}