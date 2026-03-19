import { OnboardingScreen } from './screens/OnboardingScreen';
import { AppSettings } from '../App';

export function OnboardingContent() {
  const demoSettings: AppSettings = {
    fontSize: '18px',
    colorMode: 'Normal',
    complexity: 'Full',
    helpLevel: 'Contextual',
    language: 'Standard',
    timeout: '30min',
  };

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-[#003366] mb-4">7. Login & Personalizzazione</h3>
        <p className="text-base text-gray-700 leading-relaxed mb-4">
          Il sistema implementa un <strong>flusso di onboarding guidato in 4 step</strong> che permette agli utenti 
          di configurare l'app secondo le proprie esigenze al primo avvio.
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          Questa sezione è <strong>critica per l'accessibilità</strong> perché consente a ciascuna persona di 
          adattare l'interfaccia alle proprie barriere specifiche (visive, motorie, cognitive).
        </p>
      </div>

      {/* Step 1: Welcome */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-xl font-bold text-[#003366] mb-4">Step 1: Benvenuto</h4>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Contenuto</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Titolo:</strong> "Benvenuto in Salute+"</li>
              <li>• <strong>Sottotitolo:</strong> "Configuriamo insieme l'app"</li>
              <li>• <strong>Emoji:</strong> 👋 (grande, visibile)</li>
              <li>• <strong>Testo descrittivo:</strong> Spiega che il setup richiede 4 passaggi</li>
              <li>• <strong>CTA:</strong> Pulsante "Inizia" prominente</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Obiettivo</h5>
            <p className="text-sm text-gray-700 mb-3">
              Creare un <strong>ingresso rassicurante</strong> e spiegare cosa aspettarsi. 
              Gli utenti anziani apprezzano sapere in anticipo quanti passaggi ci saranno.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <p className="text-xs text-blue-900">
                <strong>WCAG 3.3.2 - Labels or Instructions:</strong> Fornire istruzioni chiare 
                prima di iniziare il processo di input.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Login */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-xl font-bold text-[#003366] mb-4">Step 2: Login (Accedi)</h4>
        
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div 
              className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-300"
              style={{ width: '375px', height: '667px' }}
            >
              {/* Header con progress */}
              <div className="bg-[#f3f4f6] px-4 pt-4 pb-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-[#364153]">Passo 2 di 4</p>
                  <p className="text-sm text-[#155dfc]">Salta →</p>
                </div>
                <div className="bg-[#d1d5dc] h-2 rounded-full">
                  <div className="bg-[#003366] h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Icon */}
                <div className="text-center mb-6">
                  <span className="text-5xl">🔐</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-[#003366] text-center mb-2">Accedi</h2>
                <p className="text-sm text-[#4a5565] text-center mb-8">Inserisci le tue credenziali</p>

                {/* Form */}
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Nome utente"
                      className="w-full h-[56px] px-4 pl-12 border-2 border-[#d1d5dc] rounded-lg text-base"
                      style={{ fontSize: '16px' }}
                    />
                    <svg className="absolute left-3 top-4 w-5 h-5 text-[#6A7282]" fill="none" viewBox="0 0 20 20">
                      <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.67" />
                      <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.67" />
                    </svg>
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full h-[56px] px-4 pl-12 pr-12 border-2 border-[#d1d5dc] rounded-lg text-base"
                      style={{ fontSize: '16px' }}
                    />
                    <svg className="absolute left-3 top-4 w-5 h-5 text-[#6A7282]" fill="none" viewBox="0 0 20 20">
                      <rect x="3" y="9" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.67" />
                      <path d="M7 9V6a3 3 0 116 0v3" stroke="currentColor" strokeWidth="1.67" />
                    </svg>
                    <svg className="absolute right-3 top-4 w-5 h-5 text-[#6A7282]" fill="none" viewBox="0 0 20 20">
                      <path d="M2.5 10s3-5 7.5-5 7.5 5 7.5 5-3 5-7.5 5S2.5 10 2.5 10z" stroke="currentColor" strokeWidth="1.67" />
                      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.67" />
                    </svg>
                  </div>
                </div>

                {/* Credentials info box */}
                <div className="bg-[#eff6ff] border-l-4 border-[#2b7fff] rounded-lg p-4">
                  <p className="text-sm font-semibold text-[#1c398e] mb-3">💡 Credenziali di esempio:</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <code className="bg-white px-2 py-1 rounded text-[#193cb8]">maria</code>
                      <span className="text-[#193cb8]">/</span>
                      <code className="bg-white px-2 py-1 rounded text-[#193cb8]">maria123</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-white px-2 py-1 rounded text-[#193cb8]">giorgio</code>
                      <span className="text-[#193cb8]">/</span>
                      <code className="bg-white px-2 py-1 rounded text-[#193cb8]">giorgio123</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-white px-2 py-1 rounded text-[#193cb8]">angela</code>
                      <span className="text-[#193cb8]">/</span>
                      <code className="bg-white px-2 py-1 rounded text-[#193cb8]">angela123</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] p-4">
                <div className="flex gap-3">
                  <button className="flex-1 h-14 bg-[#e5e7eb] text-[#1e2939] rounded-lg font-semibold">
                    Indietro
                  </button>
                  <button className="flex-1 h-14 bg-[#003366] text-white rounded-lg font-semibold">
                    Avanti
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Schermata di login con credenziali di esempio per le 3 personas
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Caratteristiche</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Campi grandi:</strong> 56px di altezza (target motorio)</li>
              <li>• <strong>Icone:</strong> Visive + semantiche (lucchetto, utente, occhio)</li>
              <li>• <strong>Placeholder:</strong> Testo descrittivo chiaro</li>
              <li>• <strong>Credenziali demo:</strong> Box blu con username/password di esempio</li>
              <li>• <strong>Toggle password:</strong> Icona occhio per mostrare/nascondere</li>
              <li>• <strong>Progressione:</strong> Barra di avanzamento 50% (2 di 4)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">WCAG Compliance</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✅ <strong>1.3.5 - Identify Input Purpose:</strong> Type="text" e "password"</li>
              <li>✅ <strong>1.4.11 - Non-text Contrast:</strong> Border 2px, contrasto 3:1</li>
              <li>✅ <strong>2.5.5 - Target Size:</strong> 56px altezza (oltre 44px minimo)</li>
              <li>✅ <strong>3.3.2 - Labels:</strong> Placeholder + icone descrittive</li>
              <li>✅ <strong>3.3.8 - Accessible Authentication:</strong> Credenziali visibili come demo</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step 3: Font Size */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-xl font-bold text-[#003366] mb-4">Step 3: Dimensione Testo</h4>
        
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div 
              className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-300"
              style={{ width: '375px', height: '667px' }}
            >
              {/* Header */}
              <div className="bg-[#f3f4f6] px-4 pt-4 pb-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-[#364153]">Passo 3 di 4</p>
                  <p className="text-sm text-[#155dfc]">Salta →</p>
                </div>
                <div className="bg-[#d1d5dc] h-2 rounded-full">
                  <div className="bg-[#003366] h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#003366] text-center mb-2">Come vuoi vedere il testo?</h2>
                <p className="text-sm text-[#4a5565] text-center mb-8">Scegli la dimensione che preferisci</p>

                {/* Options */}
                <div className="space-y-4 mb-6">
                  {/* Normale */}
                  <button className="w-full bg-white border-2 border-[#d1d5dc] rounded-xl p-5 text-left">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Normale</p>
                    <p className="text-xs text-[#6a7282]">Testo standard</p>
                  </button>

                  {/* Grande - Selected */}
                  <button className="w-full bg-[#003366] border-2 border-[#003366] rounded-xl p-5 text-left relative shadow-lg">
                    <p className="font-semibold text-base text-white mb-1">Grande</p>
                    <p className="text-xs text-[#bedbff]">Consigliato ✨</p>
                    <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Molto Grande */}
                  <button className="w-full bg-white border-2 border-[#d1d5dc] rounded-xl p-5 text-left">
                    <p className="font-semibold text-lg text-gray-900 mb-1">Molto Grande</p>
                    <p className="text-xs text-[#6a7282]">Più leggibile</p>
                  </button>
                </div>

                {/* Preview */}
                <div className="bg-[#eff6ff] border-l-4 border-[#2b7fff] rounded p-4">
                  <p className="text-base text-[#1e40af]">
                    📖 Questo è un esempio di testo con la dimensione selezionata
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] p-4">
                <div className="flex gap-3">
                  <button className="flex-1 h-14 bg-[#e5e7eb] text-[#1e2939] rounded-lg font-semibold">
                    Indietro
                  </button>
                  <button className="flex-1 h-14 bg-[#003366] text-white rounded-lg font-semibold">
                    Avanti
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Selezione dimensione font con preview in tempo reale
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">3 Opzioni</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Normale (14px):</strong> Per utenti senza problemi visivi</li>
              <li>• <strong>Grande (18px):</strong> Consigliato ✨ per presbiopia (Maria)</li>
              <li>• <strong>Molto Grande (24px):</strong> Per ipovisione severa</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Design Pattern</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Selezione visiva:</strong> Opzione attiva = Navy Blue</li>
              <li>• <strong>Preview live:</strong> Box blu mostra il testo alla dimensione scelta</li>
              <li>• <strong>Checkmark:</strong> Icona ✓ indica selezione corrente</li>
              <li>• <strong>"Consigliato":</strong> Badge per guidare la scelta</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step 4: Complexity */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-xl font-bold text-[#003366] mb-4">Step 4: Complessità Interfaccia</h4>
        
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div 
              className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-300"
              style={{ width: '375px', height: '667px' }}
            >
              {/* Header */}
              <div className="bg-[#f3f4f6] px-4 pt-4 pb-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-[#364153]">Passo 4 di 4</p>
                  <p className="text-sm text-[#155dfc]">Salta →</p>
                </div>
                <div className="bg-[#d1d5dc] h-2 rounded-full">
                  <div className="bg-[#003366] h-2 rounded-full w-full"></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#003366] text-center mb-2">
                  Quante informazioni vuoi vedere?
                </h2>
                <p className="text-sm text-[#4a5565] text-center mb-8">Scegli il livello di dettaglio</p>

                {/* Options */}
                <div className="space-y-4 mb-6">
                  {/* Semplice */}
                  <button className="w-full bg-white border-2 border-[#d1d5dc] rounded-xl p-5 text-left flex items-center gap-4">
                    <span className="text-3xl">🔲</span>
                    <div>
                      <p className="font-bold text-lg text-gray-900 mb-1">Semplice</p>
                      <p className="text-sm text-[#6a7282]">Solo le cose importanti</p>
                    </div>
                  </button>

                  {/* Medio */}
                  <button className="w-full bg-white border-2 border-[#d1d5dc] rounded-xl p-5 text-left flex items-center gap-4">
                    <span className="text-3xl">🔳</span>
                    <div>
                      <p className="font-bold text-lg text-gray-900 mb-1">Medio</p>
                      <p className="text-sm text-[#6a7282]">Un buon equilibrio</p>
                    </div>
                  </button>

                  {/* Completo - Selected */}
                  <button className="w-full bg-[#003366] border-2 border-[#003366] rounded-xl p-5 text-left flex items-center gap-4 relative shadow-lg">
                    <span className="text-3xl">📊</span>
                    <div className="flex-1">
                      <p className="font-bold text-lg text-white mb-1">Completo</p>
                      <p className="text-sm text-[#bedbff]">Tutti i dettagli</p>
                    </div>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {/* Info */}
                <div className="bg-[#f0fdf4] border-l-4 border-[#00c950] rounded p-4">
                  <p className="text-sm text-[#0d542b]">
                    ✅ Potrai cambiare queste impostazioni in qualsiasi momento
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] p-4">
                <div className="flex gap-3">
                  <button className="flex-1 h-14 bg-[#e5e7eb] text-[#1e2939] rounded-lg font-semibold">
                    Indietro
                  </button>
                  <button className="flex-1 h-14 bg-[#003366] text-white rounded-lg font-semibold">
                    Inizia
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Selezione complessità interfaccia - step finale con pulsante "Inizia"
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">3 Livelli</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Semplice:</strong> 1-2 card per schermata (Angela - MCI)</li>
              <li>• <strong>Medio:</strong> 3 card principali (Giorgio - Tremore)</li>
              <li>• <strong>Completo:</strong> 4-5 card (Maria - Active Senior)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Impatto UX</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Simple:</strong> Home mostra solo prossima azione</li>
              <li>• <strong>Medium:</strong> Balance tra info e semplicità</li>
              <li>• <strong>Full:</strong> Dashboard completo con quick actions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-xl font-bold text-[#003366] mb-4">Riepilogo: Flusso Onboarding</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#003366] text-white">
                <th className="border border-gray-300 p-3 text-left">Step</th>
                <th className="border border-gray-300 p-3 text-left">Titolo</th>
                <th className="border border-gray-300 p-3 text-left">Opzioni</th>
                <th className="border border-gray-300 p-3 text-left">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3 font-semibold">1</td>
                <td className="border border-gray-300 p-3">Benvenuto</td>
                <td className="border border-gray-300 p-3">-</td>
                <td className="border border-gray-300 p-3">-</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-semibold">2</td>
                <td className="border border-gray-300 p-3">Login</td>
                <td className="border border-gray-300 p-3">maria, giorgio, angela</td>
                <td className="border border-gray-300 p-3">maria</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3 font-semibold">3</td>
                <td className="border border-gray-300 p-3">Dimensione Testo</td>
                <td className="border border-gray-300 p-3">Normale (14px), Grande (18px), Molto Grande (24px)</td>
                <td className="border border-gray-300 p-3">Grande (18px) ✨</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-semibold">4</td>
                <td className="border border-gray-300 p-3">Complessità</td>
                <td className="border border-gray-300 p-3">Semplice, Medio, Completo</td>
                <td className="border border-gray-300 p-3">Completo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* WCAG Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
        <h4 className="text-xl font-bold text-gray-900 mb-4">✅ WCAG 2.1 AA Compliance</h4>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Criteri Rispettati</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✅ 1.3.5 - Identify Input Purpose</li>
              <li>✅ 1.4.11 - Non-text Contrast (3:1)</li>
              <li>✅ 2.5.5 - Target Size (56px)</li>
              <li>✅ 3.2.3 - Consistent Navigation</li>
              <li>✅ 3.3.2 - Labels or Instructions</li>
              <li>✅ 3.3.8 - Accessible Authentication</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Innovazioni</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>🎯 <strong>Credenziali visibili:</strong> Riduce carico cognitivo</li>
              <li>🎯 <strong>Preview live:</strong> Feedback immediato delle scelte</li>
              <li>🎯 <strong>Progress bar:</strong> Orientamento chiaro (X di 4)</li>
              <li>🎯 <strong>Opzione "Salta":</strong> Rispetta autonomia utente</li>
              <li>🎯 <strong>Rassicurazione:</strong> "Potrai cambiare in qualsiasi momento"</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Implementation */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-xl font-bold text-[#003366] mb-4">Implementazione Tecnica</h4>
        <div className="bg-gray-50 rounded p-4 mb-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Componente:</strong> <code className="bg-gray-200 px-2 py-1 rounded">/components/screens/OnboardingScreen.tsx</code>
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>State Management:</strong> useState per gestire step corrente e settings temporanei
          </p>
          <p className="text-sm text-gray-700">
            <strong>Callback:</strong> onComplete(persona, settings) per salvare le preferenze nell'App
          </p>
        </div>
        
        <h5 className="font-semibold text-gray-900 mb-3">Flusso Dati</h5>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="bg-[#003366] text-white px-4 py-2 rounded">OnboardingScreen</div>
          <span>→</span>
          <div className="bg-[#218281] text-white px-4 py-2 rounded">App.tsx (state)</div>
          <span>→</span>
          <div className="bg-[#003366] text-white px-4 py-2 rounded">All Screens</div>
        </div>
      </div>
    </div>
  );
}
