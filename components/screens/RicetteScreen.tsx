import { Pill, Download, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings, Persona } from '../../App';
import { CardItem } from '../CardItem';
import { KeyboardEvent, useRef } from 'react';
import { useVerticalListNavigation } from '../../hooks/useArrowNavigation';
import { HelpIndicator } from '../HelpIndicator';

interface RicetteScreenProps {
  settings: AppSettings;
  persona: Persona | null;
  onNavigate: (screen: string) => void;
}

export function RicetteScreen({ settings, persona }: RicetteScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enable vertical arrow navigation (ArrowUp/ArrowDown)
  useVerticalListNavigation(containerRef);

  const ricette = [
    { name: 'Aspirina 100mg', validity: 'Valida fino al 31 Gen', qty: '1 compressa al giorno' },
    { name: 'Ramipril 5mg', validity: 'Valida fino al 28 Feb', qty: '1 compressa al mattino' },
    { name: 'Atorvastatina 20mg', validity: 'Valida fino al 15 Mar', qty: '1 compressa alla sera' },
  ];

  const bgColor = settings.colorMode === 'Dark' ? '#1F2121' : 
                  settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const cardBg = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                 settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8';
  const cardText = settings.colorMode === 'High Contrast' ? '#000000' : textColor;
  const cardBorder = settings.colorMode === 'High Contrast' ? '3px solid #000000' : '1px solid #000';

  const handleDownload = (ricettaName: string) => {
    // Mock download - In production would trigger actual download
    // Download simulation for prototype
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // Simplified view based on complexity
  if (settings.complexity === 'Simple') {
    return (
      <div className="p-6 space-y-6" style={{ backgroundColor: bgColor }}>
        {/* Help indicator - UNIFIED */}
        <HelpIndicator settings={settings} screen="ricette" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg p-8"
          style={{ 
            backgroundColor: cardBg,
            border: cardBorder,
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)' 
          }}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center justify-center bg-[#003366] rounded-lg" style={{ width: '96px', height: '96px' }}>
              <Pill size={48} color="#FFFFFF" />
            </div>
            <div>
              <p style={{ fontSize: settings.fontSize === '14px' ? '16px' : settings.fontSize === '16px' ? '18px' : '20px', fontWeight: '550', color: cardText, marginBottom: '8px' }}>
                {ricette[0].name}
              </p>
              <p style={{ fontSize: settings.fontSize, color: cardText, lineHeight: '1.5' }}>
                {settings.language === 'Plain Language' ? '1 al giorno' : ricette[0].qty}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <p style={{ fontSize: settings.fontSize, color: textColor }}>
            {settings.language === 'Plain Language' ? 'Hai altre 2 medicine' : 'Hai altre 2 ricette disponibili'}
          </p>
        </div>
      </div>
    );
  }

  // Medium complexity
  if (settings.complexity === 'Medium') {
    return (
      <div className="p-4 space-y-4" style={{ backgroundColor: bgColor }}>
        {/* Help indicator - UNIFIED */}
        <HelpIndicator settings={settings} screen="ricette" />

        {ricette.map((ricetta, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-lg p-6"
            style={{ 
              backgroundColor: cardBg,
              border: cardBorder,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center bg-[#003366] rounded-lg" style={{ width: '72px', height: '72px' }}>
                <Pill size={32} color="#FFFFFF" />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: settings.fontSize, fontWeight: '550', color: cardText, marginBottom: '4px' }}>
                  {ricetta.name}
                </p>
                <p style={{ fontSize: settings.fontSize === '14px' ? '14px' : '16px', color: settings.colorMode === 'High Contrast' ? '#000' : '#666' }}>
                  {settings.language === 'Plain Language' ? ricetta.qty.split(' ').slice(0, 3).join(' ') : ricetta.qty}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} color={settings.colorMode === 'High Contrast' ? '#000' : '#666'} />
              <span style={{ fontSize: settings.fontSize === '14px' ? '12px' : '14px', color: settings.colorMode === 'High Contrast' ? '#000' : '#666' }}>
                {ricetta.validity}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Full complexity
  return (
    <div ref={containerRef} className="p-4 space-y-3" style={{ backgroundColor: bgColor }}>
      {/* Help indicator - UNIFIED */}
      <HelpIndicator settings={settings} screen="ricette" />

      {ricette.map((ricetta, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ scale: 1.01 }}
          className="rounded-lg cursor-pointer transition-shadow"
          style={{
            backgroundColor: cardBg,
            border: cardBorder,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '16px',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex items-center justify-center bg-[#003366] rounded-lg"
              style={{ width: '48px', height: '48px' }}
            >
              <Pill size={24} color="#FFFFFF" />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: settings.fontSize, fontWeight: '550', color: cardText, marginBottom: '4px' }}>
                {ricetta.name}
              </p>
              <p style={{ fontSize: settings.fontSize === '14px' ? '11px' : settings.fontSize === '16px' ? '12px' : '14px', color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666' }}>
                {settings.language === 'Plain Language' ? ricetta.qty.split(' ').slice(0, 3).join(' ') : ricetta.qty}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={14} color={settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666'} />
              <span style={{ fontSize: settings.fontSize === '14px' ? '11px' : '12px', color: settings.colorMode === 'High Contrast' ? '#000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666' }}>
                {ricetta.validity}
              </span>
            </div>
            {settings.language !== 'Icons Only' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 px-3 py-1 bg-[#003366] hover:bg-[#004488] text-white rounded transition-colors"
                style={{ fontSize: settings.fontSize === '14px' ? '11px' : '12px' }}
                onKeyDown={(e) => handleKeyDown(e, () => handleDownload(ricetta.name))}
              >
                <Download size={14} />
                {settings.language === 'Plain Language' ? 'Salva' : 'Scarica'}
              </motion.button>
            )}
            {settings.language === 'Icons Only' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-3 py-1 bg-[#003366] hover:bg-[#004488] text-white rounded transition-colors"
                style={{ width: '36px', height: '28px' }}
                onKeyDown={(e) => handleKeyDown(e, () => handleDownload(ricetta.name))}
              >
                <Download size={16} />
              </motion.button>
            )}
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 p-4 rounded-lg text-center"
        style={{
          backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : settings.colorMode === 'Dark' ? '#2a2a2a' : '#f0f9ff',
          border: settings.colorMode === 'High Contrast' ? '2px solid #000' : '1px dashed #003366',
        }}
      >
        <p style={{ fontSize: settings.fontSize, color: settings.colorMode === 'High Contrast' ? '#000' : textColor }}>
          {settings.language === 'Plain Language' ? '💡 Rinnova le medicine che scadono presto' : '💡 Ricordati di rinnovare le ricette in scadenza'}
        </p>
      </motion.div>
    </div>
  );
}