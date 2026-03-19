import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import type { AppSettings } from '../App';

interface ExitConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  settings: AppSettings;
}

export function ExitConfirmDialog({ isOpen, onConfirm, onCancel, settings }: ExitConfirmDialogProps) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management - focus sul pulsante Annulla quando si apre
  useEffect(() => {
    if (isOpen && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, [isOpen]);

  // Gestione tasti Escape ed Enter
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        // Se il focus è sul pulsante conferma, conferma. Altrimenti annulla (default safe)
        if (document.activeElement === confirmButtonRef.current) {
          onConfirm();
        } else {
          onCancel();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onConfirm, onCancel]);

  // Color scheme based on settings
  const bgColor = settings.colorMode === 'High Contrast' ? '#000000' :
                  settings.colorMode === 'Dark' ? '#1F2121' : '#FFFFFF';
  const textColor = settings.colorMode === 'High Contrast' ? '#FFFF00' :
                    settings.colorMode === 'Dark' ? '#FFFFFF' : '#000000';
  const borderColor = settings.colorMode === 'High Contrast' ? '#FFFF00' : '#003366';
  const overlayBg = settings.colorMode === 'High Contrast' ? 'rgba(0, 0, 0, 0.95)' :
                    settings.colorMode === 'Dark' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.5)';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: overlayBg }}
            onClick={onCancel}
            aria-hidden="true"
          >
            {/* Dialog */}
            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="exit-dialog-title"
              aria-describedby="exit-dialog-description"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-xs rounded-lg shadow-2xl p-5"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                border: `2px solid ${borderColor}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <div className="flex justify-center mb-3">
                <div
                  className="rounded-full p-2.5"
                  style={{
                    backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' :
                                   settings.colorMode === 'Dark' ? '#FFA726' : '#FFA726',
                  }}
                >
                  <AlertTriangle
                    size={28}
                    style={{
                      color: settings.colorMode === 'High Contrast' ? '#000000' : '#FFFFFF',
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Title */}
              <h2
                id="exit-dialog-title"
                className="text-center mb-2"
                style={{
                  fontSize: settings.fontSize === '14px' ? '17px' :
                           settings.fontSize === '16px' ? '19px' :
                           settings.fontSize === '18px' ? '21px' : '25px',
                  fontWeight: '600',
                  fontFamily: '"Open Sans", Inter, sans-serif',
                }}
              >
                Uscire dall'app?
              </h2>

              {/* Description */}
              <p
                id="exit-dialog-description"
                className="text-center mb-5"
                style={{
                  fontSize: settings.fontSize === '14px' ? '14px' : 
                           settings.fontSize === '16px' ? '15px' :
                           settings.fontSize === '18px' ? '17px' : '19px',
                  color: settings.colorMode === 'High Contrast' ? '#FFFF00' :
                         settings.colorMode === 'Dark' ? '#CCCCCC' : '#666666',
                  fontFamily: '"Open Sans", Inter, sans-serif',
                  lineHeight: '1.4',
                }}
              >
                Sei sicuro di voler uscire dall'app?
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                {/* Pulsante Annulla (primario - azione sicura) */}
                <button
                  ref={cancelButtonRef}
                  onClick={onCancel}
                  className="flex-1 rounded-lg transition-all duration-200"
                  style={{
                    padding: settings.fontSize === '24px' ? '16px 24px' : 
                            settings.fontSize === '18px' ? '13px 18px' : '12px 16px',
                    fontSize: settings.fontSize === '14px' ? '15px' :
                             settings.fontSize === '16px' ? '16px' :
                             settings.fontSize === '18px' ? '17px' : '19px',
                  fontWeight: '600',
                  fontFamily: '"Open Sans", Inter, sans-serif',
                  backgroundColor: settings.colorMode === 'High Contrast' ? '#FFFF00' :
                                 settings.colorMode === 'Dark' ? '#003366' : '#003366',
                  color: settings.colorMode === 'High Contrast' ? '#000000' :
                         settings.colorMode === 'Dark' ? '#FFFFFF' : '#FFFFFF',
                  border: settings.colorMode === 'High Contrast' ? '3px solid #FFFF00' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (settings.colorMode === 'High Contrast') {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#000000';
                  } else if (settings.colorMode === 'Dark') {
                    e.currentTarget.style.backgroundColor = '#004080';
                  } else {
                    e.currentTarget.style.backgroundColor = '#004080';
                  }
                }}
                onMouseLeave={(e) => {
                  if (settings.colorMode === 'High Contrast') {
                    e.currentTarget.style.backgroundColor = '#FFFF00';
                    e.currentTarget.style.color = '#000000';
                  } else if (settings.colorMode === 'Dark') {
                    e.currentTarget.style.backgroundColor = '#003366';
                  } else {
                    e.currentTarget.style.backgroundColor = '#003366';
                  }
                }}
                aria-label="Annulla e rimani nell'app"
              >
                Rimani
              </button>

                {/* Pulsante Esci (secondario - azione pericolosa) */}
                <button
                  ref={confirmButtonRef}
                  onClick={onConfirm}
                  className="flex-1 rounded-lg transition-all duration-200"
                  style={{
                    padding: settings.fontSize === '24px' ? '16px 24px' : 
                            settings.fontSize === '18px' ? '13px 18px' : '12px 16px',
                    fontSize: settings.fontSize === '14px' ? '15px' :
                             settings.fontSize === '16px' ? '16px' :
                             settings.fontSize === '18px' ? '17px' : '19px',
                  fontWeight: '600',
                  fontFamily: '"Open Sans", Inter, sans-serif',
                  backgroundColor: settings.colorMode === 'High Contrast' ? '#000000' :
                                 settings.colorMode === 'Dark' ? '#D32F2F' : '#FFFFFF',
                  color: settings.colorMode === 'High Contrast' ? '#FFFF00' :
                         settings.colorMode === 'Dark' ? '#FFFFFF' : '#D32F2F',
                  border: `2px solid ${settings.colorMode === 'High Contrast' ? '#FFFF00' : '#D32F2F'}`,
                }}
                onMouseEnter={(e) => {
                  if (settings.colorMode === 'High Contrast') {
                    e.currentTarget.style.backgroundColor = '#FFFF00';
                    e.currentTarget.style.color = '#000000';
                  } else if (settings.colorMode === 'Dark') {
                    e.currentTarget.style.backgroundColor = '#F44336';
                  } else {
                    e.currentTarget.style.backgroundColor = '#D32F2F';
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (settings.colorMode === 'High Contrast') {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.color = '#FFFF00';
                  } else if (settings.colorMode === 'Dark') {
                    e.currentTarget.style.backgroundColor = '#D32F2F';
                  } else {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#D32F2F';
                  }
                }}
                aria-label="Conferma e esci dall'app"
              >
                  Esci
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
