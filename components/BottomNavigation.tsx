import { Home, Pill, Stethoscope, User, Phone } from 'lucide-react';
import { Screen } from '../App';
import { useRef } from 'react';
import { useBottomNavArrowNavigation } from '../hooks/useArrowNavigation';

interface BottomNavigationProps {
  activeScreen: Exclude<Screen, 'voice' | 'iot' | 'settings'>;
  onNavigate: (screen: Screen) => void;
  colorMode: 'Normal' | 'High Contrast' | 'Dark';
}

export function BottomNavigation({ activeScreen, onNavigate, colorMode }: BottomNavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  
  // Enable horizontal arrow navigation (ArrowLeft/ArrowRight)
  useBottomNavArrowNavigation(navRef);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ricette', label: 'Ricette', icon: Pill },
    { id: 'visite', label: 'Visite', icon: Stethoscope },
    { id: 'profilo', label: 'Profilo', icon: User },
    { id: 'sos', label: 'SOS', icon: Phone },
  ];

  const bgColor = colorMode === 'High Contrast' ? '#000000' : 
                  colorMode === 'Dark' ? '#1F2121' : '#003366';
  
  const activeColor = colorMode === 'High Contrast' ? '#FFFF00' : '#FFFFFF';
  const inactiveOpacity = colorMode === 'High Contrast' ? 0.5 : 0.7;

  return (
    <nav
      ref={navRef}
      id="bottom-navigation"
      role="navigation"
      aria-label="Navigazione principale"
      className="absolute bottom-0 left-0 right-0 flex items-center justify-around"
      style={{
        height: '60px',
        backgroundColor: bgColor,
        borderTop: colorMode === 'High Contrast' ? '3px solid #FFFF00' : 'none',
      }}
    >
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Screen)}
            className="flex flex-col items-center justify-center transition-opacity hover:opacity-100 focus:opacity-100"
            style={{
              width: '75px',
              height: '60px',
              color: isActive ? activeColor : '#FFFFFF',
              opacity: isActive ? 1 : inactiveOpacity,
            }}
            aria-label={`${item.label}${isActive ? ' - Pagina corrente' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            tabIndex={0}
            accessKey={`${index + 1}`}
          >
            <Icon size={20} aria-hidden="true" />
            <span style={{ fontSize: '12px', fontWeight: isActive ? '600' : '500', marginTop: '4px' }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}