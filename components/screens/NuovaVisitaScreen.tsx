import { Calendar, Clock, MapPin, User, Stethoscope, FileText, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings, Persona } from '../../App';
import { ScreenHeader } from '../ScreenHeader';
import { HelpIndicator } from '../HelpIndicator';
import { useState, KeyboardEvent } from 'react';

interface NuovaVisitaScreenProps {
  settings: AppSettings;
  persona: Persona | null;
  onBack: () => void;
  onSubmit: (visitaData: any) => void;
}

export function NuovaVisitaScreen({ settings, persona, onBack, onSubmit }: NuovaVisitaScreenProps) {
  const [formData, setFormData] = useState({
    specialty: '',
    doctor: '',
    date: '',
    time: '',
    location: '',
    notes: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const cardBg = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                 settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8';
  const cardText = settings.colorMode === 'High Contrast' ? '#000000' : textColor;
  const cardBorder = settings.colorMode === 'High Contrast' ? '3px solid #000000' : '2px solid #000';
  const inputBg = settings.colorMode === 'High Contrast' ? '#000' :
                  settings.colorMode === 'Dark' ? '#1F2121' : '#FFFFFF';
  const inputText = settings.colorMode === 'High Contrast' ? '#FFFF00' : textColor;
  const inputBorder = settings.colorMode === 'High Contrast' ? '3px solid #FFFF00' : '2px solid #000';

  const specialties = [
    'Cardiologo',
    'Medicina Generale', 
    'Ortopedico',
    'Oculista',
    'Diabetologo',
    'Neurologo',
  ];

  const locations = [
    'Ospedale San Raffaele',
    'Studio Medico Via Roma',
    'Poliambulatorio Centro',
    'Clinica San Giuseppe',
  ];

  const handleSubmit = () => {
    if (!formData.specialty || !formData.date || !formData.time) {
      return; // Basic validation
    }

    setShowSuccess(true);
    setTimeout(() => {
      onSubmit(formData);
      onBack();
    }, 2000);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // Success message
  if (showSuccess) {
    return (
      <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
        <ScreenHeader
          settings={settings}
          onBack={onBack}
          title={settings.language === 'Plain Language' ? 'Prenota' : 'Nuova Visita'}
        />
        <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center p-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center rounded-full mb-4"
              style={{
                width: '96px',
                height: '96px',
                backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#10b981',
              }}
            >
              <Check size={48} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} />
            </motion.div>
            <p style={{
              fontSize: settings.fontSize === '14px' ? '18px' : settings.fontSize === '16px' ? '20px' : '22px',
              fontWeight: '600',
              color: textColor,
            }}>
              {settings.language === 'Plain Language' ? 'Fatto!' : 'Visita Prenotata!'}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Simple complexity - minimal form
  if (settings.complexity === 'Simple') {
    return (
      <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
        <ScreenHeader
          settings={settings}
          onBack={onBack}
          title={settings.language === 'Plain Language' ? 'Prenota' : 'Nuova Visita'}
        />

        <div className="p-6 space-y-6">
          <HelpIndicator settings={settings} screen="visite" />

          {/* Specialty Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <label style={{ 
              fontSize: settings.fontSize,
              fontWeight: '550',
              color: textColor,
              display: 'block'
            }}>
              {settings.language === 'Plain Language' ? 'Tipo di visita' : 'Specialità'}
            </label>
            <div className="space-y-3">
              {specialties.slice(0, 3).map((spec, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, specialty: spec })}
                  className="w-full rounded-lg p-4 text-left transition-all"
                  style={{
                    backgroundColor: formData.specialty === spec ? '#003366' : cardBg,
                    border: formData.specialty === spec ? 'none' : cardBorder,
                    color: formData.specialty === spec ? '#FFF' : cardText,
                  }}
                  tabIndex={0}
                >
                  <div className="flex items-center gap-3">
                    <Stethoscope size={24} color={formData.specialty === spec ? '#FFF' : (settings.colorMode === 'High Contrast' ? '#000' : '#003366')} />
                    <span style={{ fontSize: settings.fontSize, fontWeight: '550' }}>
                      {settings.language === 'Plain Language' ? spec.split(' ')[0] : spec}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label style={{ 
              fontSize: settings.fontSize,
              fontWeight: '550',
              color: textColor,
              display: 'block',
              marginBottom: '8px'
            }}>
              {settings.language === 'Plain Language' ? 'Giorno' : 'Data'}
            </label>
            <div className="flex items-center gap-3 rounded-lg p-4" style={{
              backgroundColor: inputBg,
              border: inputBorder,
            }}>
              <Calendar size={24} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366'} />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="flex-1 bg-transparent outline-none"
                style={{
                  fontSize: settings.fontSize,
                  color: inputText,
                }}
                aria-label="Seleziona data"
              />
            </div>
          </motion.div>

          {/* Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label style={{ 
              fontSize: settings.fontSize,
              fontWeight: '550',
              color: textColor,
              display: 'block',
              marginBottom: '8px'
            }}>
              {settings.language === 'Plain Language' ? 'Ora' : 'Orario'}
            </label>
            <div className="flex items-center gap-3 rounded-lg p-4" style={{
              backgroundColor: inputBg,
              border: inputBorder,
            }}>
              <Clock size={24} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366'} />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="flex-1 bg-transparent outline-none"
                style={{
                  fontSize: settings.fontSize,
                  color: inputText,
                }}
                aria-label="Seleziona orario"
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
            className="w-full rounded-lg flex items-center justify-center gap-3"
            style={{
              height: '72px',
              backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366',
              border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
              color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
              opacity: (!formData.specialty || !formData.date || !formData.time) ? 0.5 : 1,
            }}
            disabled={!formData.specialty || !formData.date || !formData.time}
            aria-label="Conferma prenotazione"
            tabIndex={0}
          >
            <Check size={32} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} aria-hidden="true" />
            {settings.language !== 'Icons Only' && (
              <span style={{ fontSize: settings.fontSize, fontWeight: '550' }}>
                {settings.language === 'Plain Language' ? 'Prenota' : 'Conferma Prenotazione'}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  // Medium & Full complexity - complete form
  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
      <ScreenHeader
        settings={settings}
        onBack={onBack}
        title={settings.language === 'Plain Language' ? 'Prenota' : 'Nuova Visita'}
      />

      <div className="p-4 space-y-4">
        <HelpIndicator settings={settings} screen="visite" />

        {/* Specialty */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <label style={{ 
            fontSize: settings.fontSize === '14px' ? '13px' : settings.fontSize,
            fontWeight: '550',
            color: textColor,
            display: 'block'
          }}>
            {settings.language === 'Plain Language' ? 'Tipo' : 'Specialità *'}
          </label>
          <div className="flex items-center gap-3 rounded-lg p-3" style={{
            backgroundColor: inputBg,
            border: inputBorder,
          }}>
            <Stethoscope size={20} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366'} />
            <select
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className="flex-1 bg-transparent outline-none"
              style={{
                fontSize: settings.fontSize,
                color: inputText,
              }}
              aria-label="Seleziona specialità"
            >
              <option value="">{settings.language === 'Plain Language' ? 'Scegli...' : 'Seleziona specialità...'}</option>
              {specialties.map((spec, idx) => (
                <option key={idx} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Doctor - Full mode only */}
        {settings.complexity === 'Full' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="space-y-2"
          >
            <label style={{ 
              fontSize: settings.fontSize === '14px' ? '13px' : settings.fontSize,
              fontWeight: '550',
              color: textColor,
              display: 'block'
            }}>
              {settings.language === 'Plain Language' ? 'Dottore' : 'Medico (opzionale)'}
            </label>
            <div className="flex items-center gap-3 rounded-lg p-3" style={{
              backgroundColor: inputBg,
              border: inputBorder,
            }}>
              <User size={20} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366'} />
              <input
                type="text"
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                placeholder={settings.language === 'Plain Language' ? 'Nome dottore' : 'Nome del medico'}
                className="flex-1 bg-transparent outline-none"
                style={{
                  fontSize: settings.fontSize,
                  color: inputText,
                }}
                aria-label="Nome medico"
              />
            </div>
          </motion.div>
        )}

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: settings.complexity === 'Full' ? 0.1 : 0.05 }}
          className="space-y-2"
        >
          <label style={{ 
            fontSize: settings.fontSize === '14px' ? '13px' : settings.fontSize,
            fontWeight: '550',
            color: textColor,
            display: 'block'
          }}>
            {settings.language === 'Plain Language' ? 'Giorno' : 'Data *'}
          </label>
          <div className="flex items-center gap-3 rounded-lg p-3" style={{
            backgroundColor: inputBg,
            border: inputBorder,
          }}>
            <Calendar size={20} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366'} />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="flex-1 bg-transparent outline-none"
              style={{
                fontSize: settings.fontSize,
                color: inputText,
              }}
              aria-label="Seleziona data"
            />
          </div>
        </motion.div>

        {/* Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: settings.complexity === 'Full' ? 0.15 : 0.1 }}
          className="space-y-2"
        >
          <label style={{ 
            fontSize: settings.fontSize === '14px' ? '13px' : settings.fontSize,
            fontWeight: '550',
            color: textColor,
            display: 'block'
          }}>
            {settings.language === 'Plain Language' ? 'Ora' : 'Orario *'}
          </label>
          <div className="flex items-center gap-3 rounded-lg p-3" style={{
            backgroundColor: inputBg,
            border: inputBorder,
          }}>
            <Clock size={20} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366'} />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="flex-1 bg-transparent outline-none"
              style={{
                fontSize: settings.fontSize,
                color: inputText,
              }}
              aria-label="Seleziona orario"
            />
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: settings.complexity === 'Full' ? 0.2 : 0.15 }}
          className="space-y-2"
        >
          <label style={{ 
            fontSize: settings.fontSize === '14px' ? '13px' : settings.fontSize,
            fontWeight: '550',
            color: textColor,
            display: 'block'
          }}>
            {settings.language === 'Plain Language' ? 'Dove' : 'Luogo'}
          </label>
          <div className="flex items-center gap-3 rounded-lg p-3" style={{
            backgroundColor: inputBg,
            border: inputBorder,
          }}>
            <MapPin size={20} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366'} />
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="flex-1 bg-transparent outline-none"
              style={{
                fontSize: settings.fontSize,
                color: inputText,
              }}
              aria-label="Seleziona luogo"
            >
              <option value="">{settings.language === 'Plain Language' ? 'Scegli...' : 'Seleziona luogo...'}</option>
              {locations.map((loc, idx) => (
                <option key={idx} value={loc}>{settings.language === 'Plain Language' ? loc.split(' ').slice(0, 2).join(' ') : loc}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Notes - Full mode only */}
        {settings.complexity === 'Full' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-2"
          >
            <label style={{ 
              fontSize: settings.fontSize === '14px' ? '13px' : settings.fontSize,
              fontWeight: '550',
              color: textColor,
              display: 'block'
            }}>
              {settings.language === 'Plain Language' ? 'Note' : 'Note (opzionale)'}
            </label>
            <div className="flex items-start gap-3 rounded-lg p-3" style={{
              backgroundColor: inputBg,
              border: inputBorder,
            }}>
              <FileText size={20} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366'} style={{ marginTop: '4px' }} />
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={settings.language === 'Plain Language' ? 'Scrivi qui...' : 'Aggiungi note o richieste particolari...'}
                rows={3}
                className="flex-1 bg-transparent outline-none resize-none"
                style={{
                  fontSize: settings.fontSize,
                  color: inputText,
                }}
                aria-label="Note aggiuntive"
              />
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
          className="w-full rounded-lg flex items-center justify-center gap-3"
          style={{
            height: settings.complexity === 'Medium' ? '64px' : '56px',
            backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366',
            border: settings.colorMode === 'High Contrast' ? '3px solid #000' : 'none',
            color: settings.colorMode === 'High Contrast' ? '#000' : '#FFF',
            opacity: (!formData.specialty || !formData.date || !formData.time) ? 0.5 : 1,
            marginTop: '16px',
          }}
          disabled={!formData.specialty || !formData.date || !formData.time}
          aria-label="Conferma prenotazione"
          tabIndex={0}
        >
          <Check size={24} color={settings.colorMode === 'High Contrast' ? '#000' : '#FFF'} aria-hidden="true" />
          {settings.language !== 'Icons Only' && (
            <span style={{ fontSize: settings.fontSize, fontWeight: '550' }}>
              {settings.language === 'Plain Language' ? 'Prenota' : 'Conferma Prenotazione'}
            </span>
          )}
        </motion.button>

        {settings.complexity === 'Full' && settings.language !== 'Icons Only' && (
          <p style={{
            fontSize: settings.fontSize === '14px' ? '12px' : '13px',
            color: settings.colorMode === 'High Contrast' ? '#FFFF00' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666',
            textAlign: 'center',
            marginTop: '8px'
          }}>
            * {settings.language === 'Plain Language' ? 'Devi compilare' : 'Campi obbligatori'}
          </p>
        )}
      </div>
    </div>
  );
}
