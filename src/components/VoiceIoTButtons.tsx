import { Mic, Bluetooth, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings } from '../App';

interface VoiceIoTButtonsProps {
  settings: AppSettings;
  onVoiceClick: () => void;
  onIoTClick: () => void;
  layout?: 'grid' | 'stacked';
}

/**
 * Voice and IoT buttons with FIXED typography and icon sizes.
 * These buttons do NOT respond to global font size changes.
 * They maintain consistent visual appearance regardless of settings.fontSize.
 */
export function VoiceIoTButtons({ settings, onVoiceClick, onIoTClick, layout = 'grid' }: VoiceIoTButtonsProps) {
  // FIXED sizes - never change with settings.fontSize
  const FIXED_FONT_SIZE = '16px';
  const FIXED_ICON_SIZE = 32;
  const FIXED_BUTTON_HEIGHT = 88;

  const getButtonStyles = (type: 'voice' | 'iot' | 'sos') => {
    let backgroundColor, borderColor;

    if (type === 'voice') {
      backgroundColor = settings.colorMode === 'High Contrast' ? '#FFFF00' : '#218281';
      borderColor = settings.colorMode === 'High Contrast' ? '#000' : '#1a6665';
    } else if (type === 'iot') {
      backgroundColor = settings.colorMode === 'High Contrast' ? '#FFFFFF' : '#003366';
      borderColor = settings.colorMode === 'High Contrast' ? '#000' : '#002244';
    } else {
      backgroundColor = settings.colorMode === 'High Contrast' ? '#FFFFFF' : '#DC2626';
      borderColor = settings.colorMode === 'High Contrast' ? '#000' : '#991B1B';
    }

    const color = settings.colorMode === 'High Contrast' ? '#000' : '#FFF';
    const borderWidth = settings.colorMode === 'High Contrast' ? '3px' : '2px';

    return {
      height: `${FIXED_BUTTON_HEIGHT}px`,
      backgroundColor,
      border: `${borderWidth} solid ${borderColor}`,
      color,
      boxShadow: settings.colorMode === 'High Contrast' 
        ? '0 4px 12px rgba(0,0,0,0.5)' 
        : '0 4px 12px rgba(0,0,0,0.3)',
    };
  };

  const iconColor = settings.colorMode === 'High Contrast' ? '#000' : '#FFF';

  // Determine if we should show SOS instead of IoT (Simple mode)
  const showSOS = settings.complexity === 'Simple';

  if (layout === 'stacked') {
    return (
      <div className="space-y-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onVoiceClick}
          className="w-full rounded-lg flex flex-col items-center justify-center gap-3 transition-colors"
          style={getButtonStyles('voice')}
        >
          <Mic size={FIXED_ICON_SIZE} color={iconColor} strokeWidth={2.5} />
          {settings.language !== 'Icons Only' && (
            <span style={{ fontSize: FIXED_FONT_SIZE, fontWeight: '600' }}>
              {settings.language === 'Plain Language' ? 'Parla' : 'Voice'}
            </span>
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onIoTClick}
          className="w-full rounded-lg flex flex-col items-center justify-center gap-3 transition-colors"
          style={getButtonStyles(showSOS ? 'sos' : 'iot')}
        >
          {showSOS ? (
            <Phone size={FIXED_ICON_SIZE} color={iconColor} strokeWidth={2.5} />
          ) : (
            <Bluetooth size={FIXED_ICON_SIZE} color={iconColor} strokeWidth={2.5} />
          )}
          {settings.language !== 'Icons Only' && (
            <span style={{ fontSize: FIXED_FONT_SIZE, fontWeight: '600' }}>
              {showSOS ? 'SOS' : 'IoT'}
            </span>
          )}
        </motion.button>
      </div>
    );
  }

  // Grid layout (default)
  return (
    <div className="grid grid-cols-2 gap-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onVoiceClick}
        className="rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all"
        style={getButtonStyles('voice')}
      >
        <Mic size={FIXED_ICON_SIZE} color={iconColor} strokeWidth={2.5} />
        {settings.language !== 'Icons Only' && (
          <span style={{ fontSize: FIXED_FONT_SIZE, fontWeight: '600' }}>
            {settings.language === 'Plain Language' ? 'Parla' : 'Voice'}
          </span>
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onIoTClick}
        className="rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all"
        style={getButtonStyles(showSOS ? 'sos' : 'iot')}
      >
        {showSOS ? (
          <Phone size={FIXED_ICON_SIZE} color={iconColor} strokeWidth={2.5} />
        ) : (
          <Bluetooth size={FIXED_ICON_SIZE} color={iconColor} strokeWidth={2.5} />
        )}
        {settings.language !== 'Icons Only' && (
          <span style={{ fontSize: FIXED_FONT_SIZE, fontWeight: '600' }}>
            {showSOS ? 'SOS' : 'IoT'}
          </span>
        )}
      </motion.button>
    </div>
  );
}
