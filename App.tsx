import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HomeScreen } from './components/screens/HomeScreen';
import { RicetteScreen } from './components/screens/RicetteScreen';
import { VisiteScreen } from './components/screens/VisiteScreen';
import { ProfiloScreen } from './components/screens/ProfiloScreen';
import { SOSScreen } from './components/screens/SOSScreen';
import { VoiceRecordingScreen } from './components/screens/VoiceRecordingScreen';
import { IoTScreen } from './components/screens/IoTScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { InfoPersonaliScreen } from './components/screens/InfoPersonaliScreen';
import { MisurazioniScreen } from './components/screens/MisurazioniScreen';
import { PromemoriScreen } from './components/screens/PromemoriScreen';
import { NotificheScreen } from './components/screens/NotificheScreen';
import { DocumentiScreen } from './components/screens/DocumentiScreen';
import { PrivacyScreen } from './components/screens/PrivacyScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { SettingsFeedback } from './components/SettingsFeedback';
import { KeyboardNavigationWrapper } from './components/KeyboardNavigationWrapper';
import { SkipLinks } from './components/SkipLinks';
import { ExitConfirmDialog } from './components/ExitConfirmDialog';
import { useExitConfirmOnBack } from './hooks/useExitConfirmOnBack';

export type Screen = 'home' | 'ricette' | 'visite' | 'profilo' | 'sos' | 'voice' | 'iot' | 'settings' | 'info-personali' | 'misurazioni' | 'promemoria' | 'notifiche' | 'documenti' | 'privacy';
export type Persona = 'maria' | 'giorgio' | 'angela';

export interface AppSettings {
  fontSize: '14px' | '16px' | '18px' | '24px';
  colorMode: 'Normal' | 'High Contrast' | 'Dark';
  complexity: 'Simple' | 'Medium' | 'Full';
  helpLevel: 'None' | 'Contextual' | 'Full' | 'Voice';
  language: 'Standard' | 'Plain Language' | 'Icons Only';
  timeout: '5min' | '15min' | '30min' | 'None';
}

export type LoginStatus = 'logged-in' | 'skipped' | 'none';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home'); // Track screen before Settings
  const [currentPersona, setCurrentPersona] = useState<Persona | null>(null);
  const [loginStatus, setLoginStatus] = useState<LoginStatus>('none');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [settings, setSettings] = useState<AppSettings>({
    fontSize: '16px',
    colorMode: 'Normal',
    complexity: 'Full',
    helpLevel: 'Contextual',
    language: 'Standard',
    timeout: '30min',
  });
  const [settingFeedback, setSettingFeedback] = useState<{ setting: string; value: string; show: boolean }>({
    setting: '',
    value: '',
    show: false,
  });
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Callback per gestire la conferma di uscita quando si preme il pulsante indietro
  const handleExitConfirm = useCallback(() => {
    setShowExitDialog(true);
    return false; // Blocca l'uscita finché non viene confermata nel dialog
  }, []);

  // Schermate principali dell'app + sottopagine di configurazione
  const screensWithExitConfirm: Screen[] = ['home', 'ricette', 'visite', 'profilo', 'sos', 'settings', 'info-personali'];
  const shouldShowExitConfirm = screensWithExitConfirm.includes(currentScreen);

  // Hook per intercettare il pulsante indietro su TUTTE le schermate principali e sottopagine
  // NON si attiva solo su schermate modali temporanee (voice, iot) 
  // perché lì il back deve tornare alla schermata precedente
  useExitConfirmOnBack(
    !showOnboarding && shouldShowExitConfirm,
    handleExitConfirm
  );

  // Intercetta il ricaricamento della pagina (F5, Ctrl+R, etc.)
  useEffect(() => {
    // Solo se non siamo nell'onboarding e siamo in una schermata con conferma di uscita
    if (!showOnboarding && shouldShowExitConfirm) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        // Previene il ricaricamento immediato
        event.preventDefault();
        // Chrome richiede returnValue da impostare
        event.returnValue = '';
        // Mostra il dialog di conferma nativo del browser
        return '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [showOnboarding, shouldShowExitConfirm]);

  // Gestione della conferma/annullamento dal dialog custom
  const handleExitConfirmed = () => {
    setShowExitDialog(false);
    
    // Resetta l'app e torna all'onboarding iniziale
    setShowOnboarding(true);
    setCurrentScreen('home');
    setCurrentPersona(null);
    setLoginStatus('none');
  };

  const handleExitCancelled = () => {
    setShowExitDialog(false);
    // L'hook ha già ripristinato lo stato nella history
  };

  const handleNavClick = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleVoiceClick = () => {
    setCurrentScreen('voice');
    setTimeout(() => setCurrentScreen('home'), 3000);
  };

  const handleIoTClick = () => {
    // In modalità Simple, il pulsante SOS apre la pagina SOS invece dell'IoT
    if (settings.complexity === 'Simple') {
      setCurrentScreen('sos');
    } else {
      setCurrentScreen('iot');
    }
  };

  const handleSettingsClick = () => {
    // Salva la schermata corrente prima di aprire Settings
    setPreviousScreen(currentScreen);
    setCurrentScreen('settings');
  };

  const handleSettingsChange = (newSettings: AppSettings) => {
    // Trova quale impostazione è cambiata
    const changedKey = (Object.keys(newSettings) as Array<keyof AppSettings>).find(
      key => newSettings[key] !== settings[key]
    );
    
    if (changedKey) {
      setSettingFeedback({
        setting: changedKey,
        value: newSettings[changedKey],
        show: true,
      });
    }
    
    setSettings(newSettings);
  };

  const handleOnboardingComplete = (persona: Persona | null, onboardingSettings: AppSettings, status: LoginStatus) => {
    setCurrentPersona(persona);
    setSettings(onboardingSettings);
    setLoginStatus(status);
    setShowOnboarding(false);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setShowOnboarding(true);
    setCurrentScreen('home');
    setLoginStatus('none');
    // Reset settings to default
    setSettings({
      fontSize: '16px',
      colorMode: 'Normal',
      complexity: 'Full',
      helpLevel: 'Contextual',
      language: 'Standard',
      timeout: '30min',
    });
  };

  const renderScreen = () => {
    const screenProps = {
      settings,
      persona: currentPersona,
      onVoiceClick: handleVoiceClick,
      onIoTClick: handleIoTClick,
      onSettingsClick: handleSettingsClick,
      onNavigate: handleNavClick,
      onLogout: handleLogout,
    };

    switch (currentScreen) {
      case 'home':
        return <HomeScreen {...screenProps} />;
      case 'ricette':
        return <RicetteScreen {...screenProps} />;
      case 'visite':
        return <VisiteScreen {...screenProps} />;
      case 'profilo':
        return <ProfiloScreen {...screenProps} />;
      case 'sos':
        return <SOSScreen {...screenProps} />;
      case 'voice':
        return <VoiceRecordingScreen onComplete={() => setCurrentScreen('home')} />;
      case 'iot':
        return <IoTScreen onComplete={() => setCurrentScreen('home')} />;
      case 'settings':
        return <SettingsScreen settings={settings} onSettingsChange={handleSettingsChange} onBack={() => setCurrentScreen(previousScreen)} />;
      case 'info-personali':
        return <InfoPersonaliScreen settings={settings} persona={currentPersona} onBack={() => setCurrentScreen('profilo')} />;
      case 'misurazioni':
        return <MisurazioniScreen settings={settings} persona={currentPersona} onBack={() => setCurrentScreen('home')} />;
      case 'promemoria':
        return <PromemoriScreen settings={settings} persona={currentPersona} onBack={() => setCurrentScreen('home')} />;
      case 'notifiche':
        return <NotificheScreen settings={settings} persona={currentPersona} onBack={() => setCurrentScreen('profilo')} />;
      case 'documenti':
        return <DocumentiScreen settings={settings} persona={currentPersona} onBack={() => setCurrentScreen('profilo')} />;
      case 'privacy':
        return <PrivacyScreen settings={settings} persona={currentPersona} onBack={() => setCurrentScreen('profilo')} />;
      default:
        return <HomeScreen {...screenProps} />;
    }
  };

  const showNavigation = !['voice', 'iot', 'settings', 'info-personali', 'misurazioni', 'promemoria', 'notifiche', 'documenti', 'privacy'].includes(currentScreen);
  const headerTitle = currentScreen === 'home' ? 'Home' :
                      currentScreen === 'ricette' ? 'Ricette' :
                      currentScreen === 'visite' ? 'Visite' :
                      currentScreen === 'profilo' ? 'Profilo' :
                      currentScreen === 'sos' ? 'SOS' : '';

  // Header background color based on color mode
  const headerBgColor = settings.colorMode === 'High Contrast' ? '#000000' : 
                        settings.colorMode === 'Dark' ? '#1F2121' : '#003366';
  const headerTextColor = settings.colorMode === 'High Contrast' ? '#FFFF00' : '#FFFFFF';
  const headerBorderBottom = settings.colorMode === 'High Contrast' ? '3px solid #FFFF00' : 'none';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Mostra onboarding se è il primo avvio */}
      {showOnboarding ? (
        <div className="w-full max-w-md">
          <div 
            className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
            style={{ 
              width: '100%', 
              maxWidth: '375px',
              height: '667px',
            }}
          >
            <OnboardingScreen onComplete={handleOnboardingComplete} />
          </div>
          
          {/* Info sotto l'onboarding */}
          <div className="mt-6 text-center">
            <p style={{ fontSize: '14px', color: '#666' }}>
              🎉 Primo avvio - Configuriamo insieme l'app
            </p>
          </div>
        </div>
      ) : (
        <KeyboardNavigationWrapper
          currentScreen={currentScreen}
          onNavigate={handleNavClick}
          onSettingsOpen={handleSettingsClick}
          showNavigation={showNavigation}
        >
          {/* Mobile App Container */}
          <div 
            className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
            style={{ 
              width: '100%', 
              maxWidth: '375px',
              height: '667px',
            }}
          >
            {/* Skip Links for keyboard navigation */}
            <SkipLinks settings={settings} showNavigation={showNavigation} />

            {/* Header */}
            {headerTitle && (
              <div
                role="banner"
                className="flex items-center justify-center"
                style={{
                  height: '60px',
                  backgroundColor: headerBgColor,
                  color: headerTextColor,
                  borderBottom: headerBorderBottom,
                }}
              >
                <span 
                  style={{ 
                    fontSize: settings.fontSize === '14px' ? '20px' : 
                             settings.fontSize === '16px' ? '22px' : '24px',
                    fontWeight: '600',
                    fontFamily: '"Open Sans", Inter, sans-serif'
                  }}
                >
                  {headerTitle}
                </span>
              </div>
            )}

            {/* Content Area */}
            <main 
              id="main-content"
              role="main"
              tabIndex={-1}
              style={{
                height: showNavigation ? '547px' : '607px',
                overflowY: 'auto',
                backgroundColor: settings.colorMode === 'High Contrast' ? '#000000' :
                               settings.colorMode === 'Dark' ? '#1F2121' : '#FFFFFF',
              }}
            >
              <AnimatePresence>
                {renderScreen()}
              </AnimatePresence>
            </main>

            {/* Bottom Navigation */}
            {showNavigation && (
              <BottomNavigation
                activeScreen={currentScreen as Exclude<Screen, 'voice' | 'iot' | 'settings'>}
                onNavigate={handleNavClick}
                colorMode={settings.colorMode}
              />
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 max-w-md text-center space-y-2">
            <p style={{ fontSize: '14px', color: '#666' }}>
              Vai su ⚙️ Impostazioni per personalizzare l'interfaccia
            </p>
         
          </div>
        </KeyboardNavigationWrapper>
      )}

      {/* Settings Feedback */}
      {settingFeedback.show && (
        <SettingsFeedback
          setting={settingFeedback.setting}
          value={settingFeedback.value}
          onClose={() => setSettingFeedback({ setting: '', value: '', show: false })}
        />
      )}

      {/* Exit Confirmation Dialog */}
      <ExitConfirmDialog
        isOpen={showExitDialog}
        onConfirm={handleExitConfirmed}
        onCancel={handleExitCancelled}
        settings={settings}
      />
    </div>
  );
}