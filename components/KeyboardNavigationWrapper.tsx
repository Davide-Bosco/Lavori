import { ReactNode, useRef, useEffect } from 'react';
import { useKeyboardNavigation, useKeyboardShortcuts } from '../hooks/useKeyboardNavigation';
import { Screen } from '../App';

interface KeyboardNavigationWrapperProps {
  children: ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onSettingsOpen: () => void;
  showNavigation: boolean;
}

/**
 * Wrapper component that provides keyboard navigation for the entire app
 * Implements WCAG 2.1 AA compliant keyboard shortcuts and focus management
 */
export function KeyboardNavigationWrapper({
  children,
  currentScreen,
  onNavigate,
  onSettingsOpen,
  showNavigation,
}: KeyboardNavigationWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Define keyboard shortcuts
  const shortcuts = {
    // Navigation shortcuts (Alt + number)
    'Alt+1': () => showNavigation && onNavigate('home'),
    'Alt+2': () => showNavigation && onNavigate('ricette'),
    'Alt+3': () => showNavigation && onNavigate('visite'),
    'Alt+4': () => showNavigation && onNavigate('profilo'),
    'Alt+5': () => showNavigation && onNavigate('sos'),
    
    // Settings shortcut
    'Alt+s': () => onSettingsOpen(),
    'Alt+S': () => onSettingsOpen(),
    
    // Help shortcut (show keyboard shortcuts)
    'Alt+h': () => {
      // This will be handled by the skip links component
      const helpButton = document.getElementById('keyboard-help-trigger');
      if (helpButton) {
        helpButton.click();
      }
    },
    'Alt+H': () => {
      const helpButton = document.getElementById('keyboard-help-trigger');
      if (helpButton) {
        helpButton.click();
      }
    },
  };

  // Enable keyboard shortcuts
  useKeyboardShortcuts(shortcuts, true);

  // Enable keyboard navigation
  useKeyboardNavigation(containerRef, {
    enabled: true,
    trapFocus: !showNavigation, // Trap focus in modal screens (voice, iot, settings)
  });

  return (
    <div ref={containerRef} className="keyboard-navigation-root">
      {children}
    </div>
  );
}
