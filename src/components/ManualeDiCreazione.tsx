import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DesignSystem } from './DesignSystem';
import { Personas } from './Personas';
import { WireframesCiclo1 } from './WireframesCiclo1';
import { PersonalizzazioneHotspots } from './PersonalizzazioneHotspots';
import { MockupCiclo2 } from './MockupCiclo2';
import { OnboardingContent } from './OnboardingContent';
import { InteractiveCiclo3 } from './InteractiveCiclo3';
import { AccessibilityCheckCiclo4 } from './AccessibilityCheckCiclo4';
import { PersonaOptimizationCiclo5 } from './PersonaOptimizationCiclo5';

type Section = 'architettura' | 'personas' | 'design' | 'wireframes' | 'hotspots' | 'mockup' | 'onboarding' | 'interactive' | 'accessibility' | 'optimization';

export function ManualeDiCreazione() {
  const [currentSection, setCurrentSection] = useState<Section>('architettura');

  const sections = [
    { id: 'architettura', title: '1. Architettura', icon: '🏗️', color: '#003366' },
    { id: 'personas', title: '2. Personas', icon: '👥', color: '#218281' },
    { id: 'design', title: '3. Design System', icon: '🎨', color: '#003366' },
    { id: 'wireframes', title: '4. Wireframes', icon: '📐', color: '#218281' },
    { id: 'hotspots', title: '5. Hotspots', icon: '⚙️', color: '#003366' },
    { id: 'mockup', title: '6. Mockup', icon: '🖼️', color: '#218281' },
    { id: 'onboarding', title: '7. Login & Onboarding', icon: '🚪', color: '#003366' },
    { id: 'interactive', title: '8. Interactive', icon: '⚡', color: '#218281' },
    { id: 'accessibility', title: '9. Accessibility', icon: '♿', color: '#003366' },
    { id: 'optimization', title: '10. Optimization', icon: '🎯', color: '#218281' },
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'architettura':
        return <ArchitetturaContent />;
      case 'personas':
        return <Personas />;
      case 'design':
        return <DesignSystem />;
      case 'wireframes':
        return <WireframesCiclo1 />;
      case 'hotspots':
        return <PersonalizzazioneHotspots />;
      case 'mockup':
        return <MockupCiclo2 />;
      case 'onboarding':
        return <OnboardingContent />;
      case 'interactive':
        return <InteractiveCiclo3 />;
      case 'accessibility':
        return <AccessibilityCheckCiclo4 />;
      case 'optimization':
        return <PersonaOptimizationCiclo5 />;
      default:
        return <ArchitetturaContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#003366] text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">📚 Manuale di Creazione</h1>
          <p className="text-lg opacity-90">App Sanità Digitale Accessibile per Anziani Fragili</p>
          <p className="text-sm opacity-75 mt-2">Seguendo WCAG 2.1 AA - Da Architettura a Prototipo Funzionante</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-2 py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id as Section)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-all ${
                  currentSection === section.id
                    ? 'bg-[#003366] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                <span className="font-medium text-sm">{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => {
              const currentIndex = sections.findIndex(s => s.id === currentSection);
              if (currentIndex > 0) {
                setCurrentSection(sections[currentIndex - 1].id as Section);
              }
            }}
            disabled={currentSection === 'architettura'}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ← Precedente
          </button>

          <div className="text-sm text-gray-600">
            Sezione {sections.findIndex(s => s.id === currentSection) + 1} di {sections.length}
          </div>

          <button
            onClick={() => {
              const currentIndex = sections.findIndex(s => s.id === currentSection);
              if (currentIndex < sections.length - 1) {
                setCurrentSection(sections[currentIndex + 1].id as Section);
              }
            }}
            disabled={currentSection === 'optimization'}
            className="flex items-center gap-2 px-6 py-3 bg-[#003366] text-white rounded-lg hover:bg-[#218281] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Successivo →
          </button>
        </div>
      </div>
    </div>
  );
}

function ArchitetturaContent() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-[#003366] mb-4">1. Architettura dell'App</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          L'architettura definisce <strong>cosa costruire</strong> prima di decidere come costruirlo. 
          Partire dall'architettura garantisce che ogni decisione successiva sia guidata da requisiti chiari e misurabili.
        </p>
      </div>

      {/* Vision */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 shadow-sm border-l-4 border-[#003366]">
        <h3 className="text-2xl font-bold text-[#003366] mb-4">🎯 Vision Statement</h3>
        <blockquote className="text-xl italic text-gray-800 leading-relaxed">
          "Creare un'app di sanità digitale che ogni anziano possa usare autonomamente, 
          indipendentemente dalle proprie barriere fisiche o cognitive, attraverso personalizzazione 
          totale e design accessibile."
        </blockquote>
      </div>

      {/* Obiettivi Misurabili */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-[#003366] mb-6">📊 Obiettivi Misurabili</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { metric: 'WCAG 2.1 AA', value: '100%', desc: 'Conformità completa' },
            { metric: 'Contrasto', value: '15:1', desc: 'WCAG AAA (Navy/Bianco)' },
            { metric: 'Target Size', value: '72px', desc: 'Medio pulsanti (160% oltre minimo)' },
            { metric: 'Font Scalabile', value: '14-24px', desc: '4 livelli (171% max)' },
            { metric: 'Personalizzazione', value: '6 settings', desc: '3456 combinazioni possibili' },
            { metric: 'Personas', value: '3', desc: 'Barriere visive/motorie/cognitive' },
          ].map((obj) => (
            <div key={obj.metric} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-[#003366]">{obj.value}</span>
                <span className="text-sm text-gray-600">{obj.metric}</span>
              </div>
              <p className="text-sm text-gray-700">{obj.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Requisiti Funzionali */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-[#003366] mb-6">⚙️ Requisiti Funzionali</h3>
        <div className="space-y-4">
          {[
            { id: 'RF1', title: 'Gestione Ricette Mediche', desc: 'Visualizzazione, rinnovo, storico prescrizioni' },
            { id: 'RF2', title: 'Calendario Visite', desc: 'Prossime visite, storico, promemoria' },
            { id: 'RF3', title: 'Profilo Utente', desc: 'Dati anagrafici, avatar, logout sicuro' },
            { id: 'RF4', title: 'Emergenza SOS', desc: 'Pulsante 200x200px, conferma obbligatoria, contatti rapidi' },
            { id: 'RF5', title: 'Input Vocale', desc: 'Registrazione comandi, trascrizione automatica' },
            { id: 'RF6', title: 'Pairing IoT', desc: 'Connessione dispositivi medicali (pressione, saturimetro)' },
            { id: 'RF7', title: 'Configurazione Accessibilità', desc: '6 impostazioni indipendenti (font, colore, complessità, help, lingua, timeout)' },
            { id: 'RF8', title: 'Onboarding Guidato', desc: 'Login + tutorial interattivo 5 step' },
            { id: 'RF9', title: 'Feedback Visivo', desc: 'Toast animato su ogni cambio, transizioni smooth <300ms' },
          ].map((req) => (
            <div key={req.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#218281]">
              <div className="flex-shrink-0 w-16 h-16 bg-[#003366] text-white rounded-lg flex items-center justify-center font-bold">
                {req.id}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">{req.title}</h4>
                <p className="text-sm text-gray-700">{req.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stack Tecnologico */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-[#003366] mb-6">🛠️ Stack Tecnologico</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-bold text-[#003366] mb-2">Core Framework</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>React 18 + TypeScript</strong></p>
              <p className="text-xs text-gray-600">Component-based, type safety, ecosystem maturo</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-bold text-[#003366] mb-2">Styling</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Tailwind CSS v4</strong></p>
              <p className="text-xs text-gray-600">Utility-first, customizzabile, performance ottimale</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-bold text-[#003366] mb-2">Animazioni</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Motion (Framer Motion)</strong></p>
              <p className="text-xs text-gray-600">Animazioni accessibili, API semplice, 60fps</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-[#003366] mb-2">Icons</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Emoji + Lucide React</strong></p>
              <p className="text-xs text-gray-600">Universalmente riconoscibili, zero caricamento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Flussi Utente */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-[#003366] mb-6">🔄 Flussi Utente Principali</h3>
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h4 className="font-bold text-[#003366] mb-3">1️⃣ Primo Avvio (Onboarding)</h4>
            <div className="flex items-center gap-2 text-sm text-gray-700 overflow-x-auto pb-2">
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Login</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Validazione</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Tutorial 5 Step</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Configurazione</span>
              <span>→</span>
              <span className="px-3 py-1 bg-[#003366] text-white rounded-full whitespace-nowrap">Home</span>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
            <h4 className="font-bold text-[#003366] mb-3">2️⃣ Navigazione Standard</h4>
            <div className="flex items-center gap-2 text-sm text-gray-700 overflow-x-auto pb-2">
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Tap Nav Item</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Transizione (200ms)</span>
              <span>→</span>
              <span className="px-3 py-1 bg-[#003366] text-white rounded-full whitespace-nowrap">Nuova Schermata</span>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <h4 className="font-bold text-[#003366] mb-3">3️⃣ Modifica Impostazioni</h4>
            <div className="flex items-center gap-2 text-sm text-gray-700 overflow-x-auto pb-2">
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Profilo</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">⚙️ Impostazioni</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Modifica</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Toast Feedback</span>
              <span>→</span>
              <span className="px-3 py-1 bg-[#003366] text-white rounded-full whitespace-nowrap">Applica</span>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
            <h4 className="font-bold text-[#003366] mb-3">4️⃣ Emergenza SOS</h4>
            <div className="flex items-center gap-2 text-sm text-gray-700 overflow-x-auto pb-2">
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Tap 🚨 (200x200px)</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Dialog Conferma</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Chiama 118</span>
              <span>→</span>
              <span className="px-3 py-1 bg-[#003366] text-white rounded-full whitespace-nowrap">Feedback</span>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200">
            <h4 className="font-bold text-[#003366] mb-3">5️⃣ Logout</h4>
            <div className="flex items-center gap-2 text-sm text-gray-700 overflow-x-auto pb-2">
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Profilo</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">🚪 Esci</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Conferma</span>
              <span>→</span>
              <span className="px-3 py-1 bg-white rounded-full whitespace-nowrap">Reset Settings</span>
              <span>→</span>
              <span className="px-3 py-1 bg-[#003366] text-white rounded-full whitespace-nowrap">Onboarding</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metriche di Successo */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-[#003366] mb-6">✅ Metriche di Successo</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-800 mb-4">Accessibilità</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>WCAG 2.1 AA: 100%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Lighthouse Score: ≥ 95/100</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Contrasto medio: 15:1</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Target size medio: 72px</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-4">Usabilità</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Onboarding: &lt; 2 minuti</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Errori/sessione: &lt; 0.5</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Task success: ≥ 90%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>SUS Score: ≥ 75</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-800 mb-4">Performance</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                <span>FCP: &lt; 1.5s</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                <span>TTI: &lt; 2s</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                <span>Animations: 60fps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                <span>Bundle: &lt; 500KB</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-[#003366] to-[#218281] rounded-lg p-8 text-white shadow-lg">
        <h3 className="text-2xl font-bold mb-4">🚀 Prossimo Passo</h3>
        <p className="text-lg mb-6 opacity-90">
          Ora che abbiamo definito l'architettura, passiamo alle <strong>Personas</strong> per capire 
          chi sono gli utenti e quali barriere affrontano.
        </p>
        <p className="text-sm opacity-75">
          Le personas guideranno ogni decisione di design che prenderemo nelle sezioni successive.
        </p>
      </div>
    </div>
  );
}