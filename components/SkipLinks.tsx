import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppSettings } from '../App';

interface SkipLinksProps {
  settings: AppSettings;
  showNavigation: boolean;
}

/**
 * Skip links component for keyboard navigation
 * Provides quick access to main content areas
 * WCAG 2.1 AA compliant
 */
export function SkipLinks({ settings, showNavigation }: SkipLinksProps) {
  const [showHelp, setShowHelp] = useState(false);

  const handleSkip = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const bgColor = settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366';
  const textColor = settings.colorMode === 'High Contrast' ? '#000000' : settings.colorMode === 'Dark' ? '#F5F5F5' : '#000000';
  const borderColor = settings.colorMode === 'High Contrast' ? '#000000' : '#218281';
  const cardBg = settings.colorMode === 'High Contrast' ? '#FFFF00' : settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8';
  const accentColor = settings.colorMode === 'High Contrast' ? '#000000' : '#003366';
  const mutedColor = settings.colorMode === 'High Contrast' ? '#000000' : settings.colorMode === 'Dark' ? '#D0D0D0' : '#666';

  return (
    <>
      {/* Skip Links - visible on keyboard focus */}
      <div className="skip-links" style={{ position: 'absolute', top: 0, left: 0, zIndex: 9999 }}>
        <a
          href="#main-content"
          onClick={(e) => {
            e.preventDefault();
            handleSkip('main-content');
          }}
          className="skip-link"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '8px',
            padding: '12px 16px',
            backgroundColor: bgColor,
            color: textColor,
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: settings.fontSize,
            fontWeight: '600',
            border: `2px solid ${borderColor}`,
            zIndex: 9999,
          }}
        >
          Salta al contenuto principale
        </a>

        {showNavigation && (
          <a
            href="#bottom-navigation"
            onClick={(e) => {
              e.preventDefault();
              handleSkip('bottom-navigation');
            }}
            className="skip-link"
            style={{
              position: 'absolute',
              left: '-9999px',
              top: '56px',
              padding: '12px 16px',
              backgroundColor: bgColor,
              color: textColor,
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: settings.fontSize,
              fontWeight: '600',
              border: `2px solid ${borderColor}`,
              zIndex: 9999,
            }}
          >
            Salta alla navigazione
          </a>
        )}

        <button
          id="keyboard-help-trigger"
          onClick={() => setShowHelp(!showHelp)}
          className="skip-link"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '104px',
            padding: '12px 16px',
            backgroundColor: bgColor,
            color: textColor,
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: settings.fontSize,
            fontWeight: '600',
            border: `2px solid ${borderColor}`,
            cursor: 'pointer',
            zIndex: 9999,
          }}
        >
          {showHelp ? 'Nascondi' : 'Mostra'} scorciatoie tastiera (Alt+H)
        </button>
      </div>

      {/* Keyboard Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[10000]"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="rounded-lg p-6 max-w-md w-full mx-4"
              style={{
                backgroundColor: settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF',
                border: settings.colorMode === 'High Contrast' ? '3px solid #FFFF00' : 'none',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366',
                }}
              >
                ⌨️ Scorciatoie da Tastiera
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 style={{ fontSize: settings.fontSize === '14px' ? '16px' : '18px', fontWeight: '550', color: textColor, marginBottom: '12px' }}>
                    ⌨️ Scorciatoie Globali
                  </h3>
                  <div className="space-y-2">
                    {[
                      { keys: 'Alt + 1', desc: 'Vai a Home' },
                      { keys: 'Alt + 2', desc: 'Vai a Ricette' },
                      { keys: 'Alt + 3', desc: 'Vai a Visite' },
                      { keys: 'Alt + 4', desc: 'Vai a Profilo' },
                      { keys: 'Alt + 5', desc: 'Vai a SOS' },
                      { keys: 'Alt + S', desc: 'Apri Impostazioni' },
                      { keys: 'Alt + H', desc: 'Mostra questa guida' },
                    ].map((shortcut, idx) => (
                      <div key={idx} className="flex items-center justify-between" style={{ padding: '8px', backgroundColor: cardBg, borderRadius: '6px' }}>
                        <code style={{ fontSize: settings.fontSize === '14px' ? '12px' : '14px', fontFamily: 'monospace', color: accentColor, fontWeight: '600' }}>
                          {shortcut.keys}
                        </code>
                        <span style={{ fontSize: settings.fontSize === '14px' ? '12px' : '14px', color: mutedColor }}>
                          {shortcut.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: settings.fontSize === '14px' ? '16px' : '18px', fontWeight: '550', color: textColor, marginBottom: '12px' }}>
                    ⬆️⬇️ Navigazione con Frecce
                  </h3>
                  <div className="space-y-2">
                    {[
                      { keys: '← →', desc: 'Menu inferiore - cambia tab' },
                      { keys: '↑ ↓', desc: 'Liste verticali - naviga card' },
                      { keys: 'Tab', desc: 'Navigazione sequenziale' },
                      { keys: 'Enter/Space', desc: 'Attiva elemento selezionato' },
                      { keys: 'Esc', desc: 'Chiudi modal o torna indietro' },
                    ].map((shortcut, idx) => (
                      <div key={idx} className="flex items-center justify-between" style={{ padding: '8px', backgroundColor: cardBg, borderRadius: '6px' }}>
                        <code style={{ fontSize: settings.fontSize === '14px' ? '12px' : '14px', fontFamily: 'monospace', color: accentColor, fontWeight: '600' }}>
                          {shortcut.keys}
                        </code>
                        <span style={{ fontSize: settings.fontSize === '14px' ? '12px' : '14px', color: mutedColor }}>
                          {shortcut.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: settings.fontSize === '14px' ? '16px' : '18px', fontWeight: '550', color: textColor, marginBottom: '12px' }}>
                    🎯 Skip Links
                  </h3>
                  <p style={{ fontSize: settings.fontSize === '14px' ? '12px' : '14px', color: mutedColor, lineHeight: '1.6' }}>
                    Premi <code style={{ color: accentColor, fontFamily: 'monospace' }}>Tab</code> all'apertura della pagina per vedere i link di navigazione rapida.
                  </p>
                </div>

                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: cardBg, border: `1px dashed ${borderColor}` }}>
                  <p style={{ fontSize: settings.fontSize === '14px' ? '11px' : '12px', color: mutedColor, textAlign: 'center' }}>
                    💡 Tutte le funzioni sono accessibili da tastiera secondo le specifiche WCAG 2.1 AA
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowHelp(false)}
                className="w-full mt-6 py-3 rounded-lg transition-colors"
                style={{
                  backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366',
                  color: settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF',
                  fontSize: settings.fontSize,
                  fontWeight: '600',
                  border: settings.colorMode === 'High Contrast' ? '2px solid #000000' : 'none',
                }}
              >
                Chiudi (Esc)
              </button>

              <p
                style={{
                  fontSize: '12px',
                  textAlign: 'center',
                  marginTop: '12px',
                  color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#666',
                }}
              >
                ✓ WCAG 2.1 Level AA Compliant
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global styles for skip links */}
      <style>{`
        .skip-link:focus {
          left: 8px !important;
          outline: 3px solid ${borderColor};
          outline-offset: 2px;
        }
        
        /* Enhanced focus styles for all interactive elements */
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible,
        [tabindex]:focus-visible {
          outline: 3px solid ${settings.colorMode === 'High Contrast' ? '#FFFF00' : '#218281'};
          outline-offset: 2px;
          position: relative;
          z-index: 10;
        }
        
        /* Remove default focus outline to replace with custom */
        *:focus {
          outline: none;
        }
        
        *:focus-visible {
          outline: 3px solid ${settings.colorMode === 'High Contrast' ? '#FFFF00' : '#218281'};
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}

interface ShortcutItemProps {
  keys: string;
  description: string;
  settings: AppSettings;
}

function ShortcutItem({ keys, description, settings }: ShortcutItemProps) {
  return (
    <div className="flex items-start gap-3">
      <kbd
        className="px-2 py-1 rounded text-center flex-shrink-0"
        style={{
          backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#E8E8E8',
          color: settings.colorMode === 'High Contrast' ? '#000000' : '#003366',
          fontSize: '12px',
          fontWeight: '600',
          fontFamily: 'monospace',
          border: `1px solid ${settings.colorMode === 'High Contrast' ? '#000000' : '#ccc'}`,
          minWidth: '80px',
        }}
      >
        {keys}
      </kbd>
      <p
        style={{
          fontSize: '14px',
          color: settings.colorMode === 'High Contrast' ? '#FFFF00' : '#000',
          lineHeight: '1.5',
        }}
      >
        {description}
      </p>
    </div>
  );
}