import { Stethoscope, Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings, Persona } from '../../App';
import { KeyboardEvent, useState } from 'react';
import { HelpIndicator } from '../HelpIndicator';
import { VisitaDetailsScreen } from './VisitaDetailsScreen';
import { NuovaVisitaScreen } from './NuovaVisitaScreen';

interface VisiteScreenProps {
  settings: AppSettings;
  persona: Persona | null;
  onNavigate: (screen: string) => void;
}

interface Visita {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  phone?: string;
  notes?: string;
}

export function VisiteScreen({ settings, persona }: VisiteScreenProps) {
  const [currentView, setCurrentView] = useState<'list' | 'details' | 'new'>('list');
  const [selectedVisita, setSelectedVisita] = useState<Visita | null>(null);
  const [visite, setVisite] = useState<Visita[]>([
    { 
      id: 1,
      doctor: 'Dr. Rossi', 
      specialty: 'Cardiologo', 
      date: '15 Gen', 
      time: '10:00', 
      location: 'Ospedale San Raffaele',
      address: 'Via Olgettina 60, Milano',
      phone: '02 26431',
      notes: 'Portare ECG precedente e lista farmaci'
    },
    { 
      id: 2,
      doctor: 'Dr.ssa Bianchi', 
      specialty: 'Medicina Generale', 
      date: '22 Gen', 
      time: '15:30', 
      location: 'Studio Medico Via Roma',
      address: 'Via Roma 123, Milano',
      phone: '02 1234567',
      notes: 'Portare tessera sanitaria'
    },
  ]);

  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const cardBg = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                 settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8';
  const cardText = settings.colorMode === 'High Contrast' ? '#000000' : textColor;
  const cardBorder = settings.colorMode === 'High Contrast' ? '3px solid #000000' : '2px solid #000';

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const handleVisitaClick = (visita: Visita) => {
    setSelectedVisita(visita);
    setCurrentView('details');
  };

  const handleNewVisita = () => {
    setCurrentView('new');
  };

  const handleBack = () => {
    setCurrentView('list');
    setSelectedVisita(null);
  };

  const handleSubmitNewVisita = (visitaData: any) => {
    const newVisita: Visita = {
      id: visite.length + 1,
      ...visitaData,
    };
    setVisite([...visite, newVisita]);
  };

  // Show details view
  if (currentView === 'details' && selectedVisita) {
    return (
      <VisitaDetailsScreen
        settings={settings}
        persona={persona}
        visita={selectedVisita}
        onBack={handleBack}
      />
    );
  }

  // Show new visita form
  if (currentView === 'new') {
    return (
      <NuovaVisitaScreen
        settings={settings}
        persona={persona}
        onBack={handleBack}
        onSubmit={handleSubmitNewVisita}
      />
    );
  }

  // Simple complexity - show only first appointment, large
  if (settings.complexity === 'Simple') {
    return (
      <div className="p-6 space-y-6" style={{ backgroundColor: bgColor }}>
        <HelpIndicator settings={settings} screen="visite" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg p-8 cursor-pointer"
          style={{
            backgroundColor: cardBg,
            border: cardBorder,
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
          onClick={() => handleVisitaClick(visite[0])}
          tabIndex={0}
          role="button"
          aria-label={`Apri dettagli visita con ${visite[0].doctor}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleVisitaClick(visite[0]);
            }
          }}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center justify-center bg-[#003366] rounded-lg" style={{ width: '96px', height: '96px' }}>
              <Stethoscope size={48} color="#FFFFFF" aria-hidden="true" />
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
          aria-label={settings.language === 'Plain Language' ? 'Prenota nuova visita' : 'Prenota Nuova Visita'}
          tabIndex={0}
          onClick={handleNewVisita}
          onKeyDown={(e) => handleKeyDown(e, handleNewVisita)}
        >
          <Calendar size={32} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} aria-hidden="true" />
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
      <HelpIndicator settings={settings} screen="visite" />

      {visite.map((visita, idx) => (
        <motion.div
          key={visita.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={settings.complexity === 'Full' ? { scale: 1.01 } : {}}
          role="article"
          tabIndex={0}
          aria-label={`Visita con ${visita.doctor}, ${visita.specialty}, ${visita.date} alle ${visita.time}`}
          className="rounded-lg cursor-pointer transition-shadow focus:shadow-lg"
          style={{
            backgroundColor: cardBg,
            border: cardBorder,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '16px',
          }}
          onClick={() => handleVisitaClick(visita)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleVisitaClick(visita);
            }
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex items-center justify-center bg-[#003366] rounded-lg"
              style={{ width: settings.complexity === 'Medium' ? '64px' : '48px', height: settings.complexity === 'Medium' ? '64px' : '48px' }}
              aria-hidden="true"
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
              <Clock size={16} color={settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666'} aria-hidden="true" />
              <span style={{ 
                fontSize: settings.fontSize === '14px' ? '12px' : '14px',
                color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666' 
              }}>
                {settings.language === 'Plain Language' ? `${visita.date} ore ${visita.time}` : `${visita.date} alle ${visita.time}`}
              </span>
            </div>
            {settings.complexity === 'Full' && (
              <div className="flex items-center gap-2">
                <MapPin size={16} color={settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666'} aria-hidden="true" />
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
              aria-label={`Dettagli visita con ${visita.doctor}`}
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                handleVisitaClick(visita);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleVisitaClick(visita);
                }
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
        aria-label={settings.language === 'Plain Language' ? 'Prenota nuova visita' : 'Prenota Nuova Visita'}
        tabIndex={0}
        onClick={handleNewVisita}
        onKeyDown={(e) => handleKeyDown(e, handleNewVisita)}
      >
        <Calendar size={20} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} aria-hidden="true" />
        {settings.language !== 'Icons Only' && (
          <span>{settings.language === 'Plain Language' ? 'Prenota' : 'Prenota Nuova Visita'}</span>
        )}
      </motion.button>
    </div>
  );
}
