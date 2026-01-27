import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ManualeDiCreazione } from './components/ManualeDiCreazione';
import { HomeScreen } from './components/screens/HomeScreen';
import { RicetteScreen } from './components/screens/RicetteScreen';
import { VisiteScreen } from './components/screens/VisiteScreen';
import { ProfiloScreen } from './components/screens/ProfiloScreen';
import { SOSScreen } from './components/screens/SOSScreen';
import { VoiceRecordingScreen } from './components/screens/VoiceRecordingScreen';
import { IoTScreen } from './components/screens/IoTScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { PersonaSelector } from './components/PersonaSelector';
import { SettingsFeedback } from './components/SettingsFeedback';

export type Screen = 'home' | 'ricette' | 'visite' | 'profilo' | 'sos' | 'voice' | 'iot' | 'settings';
export type Persona = 'maria' | 'giorgio' | 'angela';

export interface AppSettings {
  fontSize: '14px' | '16px' | '18px' | '24px';
  colorMode: 'Normal' | 'High Contrast' | 'Dark';
  complexity: 'Simple' | 'Medium' | 'Full';
  helpLevel: 'None' | 'Contextual' | 'Full' | 'Voice';
  language: 'Standard' | 'Plain Language' | 'Icons Only';
  timeout: '5min' | '15min' | '30min' | 'None';
}

export default function App() {
  const [viewMode, setViewMode] = useState<'manuale' | 'app'>('manuale');
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [currentPersona, setCurrentPersona] = useState<Persona>('maria');
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

  // Applica automaticamente le impostazioni della persona selezionata
  const applyPersonaSettings = (persona: Persona) => {
    setCurrentPersona(persona);
    
    // TUTTE le personas partono con le STESSE impostazioni di default
    // Solo l'utente può cambiare le impostazioni manualmente
    setSettings({
      fontSize: '16px',
      colorMode: 'Normal',
      complexity: 'Full',
      helpLevel: 'Contextual',
      language: 'Standard',
      timeout: '30min',
    });
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

  const handleOnboardingComplete = (persona: Persona, onboardingSettings: AppSettings) => {
    setCurrentPersona(persona);
    setSettings(onboardingSettings);
    setShowOnboarding(false);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setShowOnboarding(true);
    setCurrentScreen('home');
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
        return <SettingsScreen settings={settings} onSettingsChange={handleSettingsChange} onBack={() => setCurrentScreen('home')} />;
      default:
        return <HomeScreen {...screenProps} />;
    }
  };

  const showNavigation = !['voice', 'iot', 'settings'].includes(currentScreen);
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

  // Mostra Manuale di Creazione
  if (viewMode === 'manuale') {
    return (
      <div>
        <ManualeDiCreazione />
        {/* Toggle button */}
        <button
          onClick={() => setViewMode('app')}
          className="fixed top-4 right-4 bg-[#003366] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#218281] transition-all z-50 flex items-center gap-2"
        >
          <span>📱</span>
          <span>Visualizza App Funzionante</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Toggle button */}
      <button
        onClick={() => setViewMode('manuale')}
        className="fixed top-4 right-4 bg-[#003366] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#218281] transition-all z-50 flex items-center gap-2"
      >
        <span>📚</span>
        <span>Visualizza Manuale</span>
      </button>

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
        <>
          {/* Persona Selector */}
          <PersonaSelector 
            currentPersona={currentPersona} 
            onPersonaChange={applyPersonaSettings}
          />

          {/* Mobile App Container */}
          <div 
            className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
            style={{ 
              width: '100%', 
              maxWidth: '375px',
              height: '667px',
            }}
          >
            {/* Header */}
            {headerTitle && (
              <div
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
            <div 
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
            </div>

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
              👆 Seleziona una persona • Vai su ⚙️ Impostazioni per personalizzare l'interfaccia
            </p>
            <button
              onClick={() => setShowOnboarding(true)}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              🔄 Rivedi la guida iniziale
            </button>
          </div>
        </>
      )}

      {/* Settings Feedback */}
      {settingFeedback.show && (
        <SettingsFeedback
          setting={settingFeedback.setting}
          value={settingFeedback.value}
          onClose={() => setSettingFeedback({ setting: '', value: '', show: false })}
        />
      )}
    </div>
  );
}