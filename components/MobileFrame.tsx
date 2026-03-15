import { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
  title?: string;
  showNavBar?: boolean;
  activeNav?: string;
  onNavClick?: (nav: string) => void;
  headerBg?: string;
  contentBg?: string;
}

export function MobileFrame({
  children,
  title = '',
  showNavBar = true,
  activeNav = 'home',
  onNavClick,
  headerBg = '#003366',
  contentBg = '#FFFFFF',
}: MobileFrameProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'ricette', label: 'Ricette' },
    { id: 'visite', label: 'Visite' },
    { id: 'profilo', label: 'Profilo' },
    { id: 'sos', label: 'SOS' },
  ];

  return (
    <div
      className="relative border-2 border-gray-300 rounded-lg overflow-hidden"
      style={{ width: '375px', height: '667px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
    >
      {/* Header */}
      {title && (
        <div
          className="flex items-center justify-center"
          style={{
            height: '60px',
            backgroundColor: headerBg,
            color: '#FFFFFF',
          }}
        >
          <span style={{ fontSize: '24px', fontWeight: '600', fontFamily: '"Open Sans", Inter, sans-serif' }}>
            {title}
          </span>
        </div>
      )}

      {/* Content Area */}
      <div
        style={{
          height: showNavBar ? '547px' : '607px',
          backgroundColor: contentBg,
          overflowY: 'auto',
        }}
      >
        {children}
      </div>

      {/* Bottom Navigation */}
      {showNavBar && (
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-around"
          style={{
            height: '60px',
            backgroundColor: '#003366',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick?.(item.id)}
              className="flex flex-col items-center justify-center transition-opacity hover:opacity-80"
              style={{
                width: '75px',
                height: '60px',
                color: '#FFFFFF',
                opacity: activeNav === item.id ? 1 : 0.7,
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: '500', fontFamily: '"Open Sans", Inter, sans-serif' }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
