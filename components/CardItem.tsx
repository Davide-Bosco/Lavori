import { LucideIcon } from 'lucide-react';
import { AppSettings } from '../App';
import { KeyboardEvent } from 'react';

interface CardItemProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick: () => void;
  settings: AppSettings;
  size?: 'normal' | 'large';
}

// Fixed icon sizes - independent of text scaling
const getCardIconSize = (fontSize: string, isLarge: boolean) => {
  if (isLarge) {
    // Large cards (Medium complexity)
    if (fontSize === '24px') return 40;
    if (fontSize === '18px') return 36;
    return 32; // 14px and 16px
  }
  
  // Normal cards (Full complexity)
  if (fontSize === '24px') return 28;
  if (fontSize === '18px') return 26;
  return 24; // 14px and 16px
};

export function CardItem({ icon: Icon, title, subtitle, onClick, settings, size = 'normal' }: CardItemProps) {
  const isLarge = size === 'large';
  const iconSize = isLarge ? 72 : 48;
  const iconInnerSize = getCardIconSize(settings.fontSize, isLarge);
  
  const titleSize = settings.fontSize === '14px' ? '14px' :
                   settings.fontSize === '16px' ? '16px' : '18px';
  const subtitleSize = settings.fontSize === '14px' ? '12px' :
                      settings.fontSize === '16px' ? '14px' : '16px';

  const bgColor = settings.colorMode === 'High Contrast' ? '#FFFFFF' :
                  settings.colorMode === 'Dark' ? '#2a2a2a' : '#E8E8E8';
  
  const borderColor = settings.colorMode === 'High Contrast' ? '#000000' : '#000000';
  const borderWidth = settings.colorMode === 'High Contrast' ? '3' : '1';
  const textColor = settings.colorMode === 'High Contrast' ? '#000000' :
                    settings.colorMode === 'Dark' ? '#F5F5F5' : '#000';
  const subtitleColor = settings.colorMode === 'High Contrast' ? '#000000' :
                        settings.colorMode === 'Dark' ? '#D0D0D0' : '#666';

  const iconBgColor = settings.colorMode === 'High Contrast' ? '#000000' : '#003366';

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${title}: ${subtitle}`}
      className="rounded-lg cursor-pointer transition-all hover:shadow-lg focus:shadow-lg"
      style={{
        backgroundColor: bgColor,
        border: `${borderWidth}px solid ${borderColor}`,
        boxShadow: settings.colorMode === 'High Contrast' ? '0 4px 8px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
        padding: isLarge ? '24px' : '16px',
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex items-center justify-center rounded-lg flex-shrink-0"
          style={{ 
            width: `${iconSize}px`, 
            height: `${iconSize}px`,
            backgroundColor: iconBgColor,
            border: settings.colorMode === 'High Contrast' ? '2px solid #000000' : 'none'
          }}
          aria-hidden="true"
        >
          <Icon size={iconInnerSize} color={settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFFFFF'} />
        </div>
        <div className="flex-1">
          <p style={{ fontSize: titleSize, fontWeight: '600', color: textColor, marginBottom: '4px' }}>
            {title}
          </p>
          <p style={{ fontSize: subtitleSize, color: subtitleColor, fontWeight: settings.colorMode === 'High Contrast' ? '550' : '400' }}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}