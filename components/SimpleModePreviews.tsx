import { AppSettings } from '../App';

interface SimpleModePreviewsProps {
  settings: AppSettings;
}

export function SimpleModePreviews({ settings }: SimpleModePreviewsProps) {
  // Forza settings in Simple mode
  const simpleSettings: AppSettings = {
    ...settings,
    complexity: 'Simple',
  };

  return (
    <div className="space-y-8">
      {/* Home Screen Simple */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-xl font-bold text-[#003366] mb-4">Home Screen - Modalità Simple</h4>
        <div className="flex justify-center">
          <div 
            className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-300"
            style={{ width: '375px', height: '667px' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-center"
              style={{
                height: '60px',
                backgroundColor: '#003366',
                color: '#FFFFFF',
              }}
            >
              <span style={{ fontSize: '22px', fontWeight: '600' }}>Home</span>
            </div>

            {/* Content */}
            <div style={{ height: '547px', overflowY: 'auto', padding: '24px' }}>
              <div className="mb-6">
                <h2 style={{ fontSize: '20px', fontWeight: '550', color: '#003366', marginBottom: '8px' }}>
                  Benvenuto, Angela
                </h2>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  Giovedì 19 Dicembre 2024
                </p>
              </div>

              {/* Solo 1 azione principale in Simple mode */}
              <div className="space-y-4">
                <div 
                  className="bg-[#E8E8E8] rounded-lg p-6 border border-black cursor-pointer hover:shadow-lg transition-shadow"
                  style={{ minHeight: '180px' }}
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div style={{ fontSize: '64px' }}>💊</div>
                    <div>
                      <p style={{ fontSize: '20px', fontWeight: '550', color: '#000', marginBottom: '8px' }}>
                        Prossima Medicina
                      </p>
                      <p style={{ fontSize: '16px', color: '#666' }}>
                        Aspirina 100mg
                      </p>
                      <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                        Alle 09:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Helper text sempre visibile */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
                    💡 Tocca la card per vedere i dettagli
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div
              className="flex items-center justify-around border-t border-gray-200"
              style={{ height: '60px', backgroundColor: '#FFFFFF' }}
            >
              {['🏠 Home', '💊 Ricette', '📅 Visite', '👤 Profilo', '🚨 SOS'].map((item, idx) => (
                <button
                  key={idx}
                  className="flex flex-col items-center justify-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    color: idx === 0 ? '#003366' : '#9CA3AF',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.split(' ')[0]}</span>
                  <span style={{ fontSize: '8px', fontWeight: idx === 0 ? '600' : '400', marginTop: '2px' }}>
                    {item.split(' ')[1]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4 text-center">
          In modalità <strong>Simple</strong>, la Home mostra solo <strong>1 azione principale</strong> (la prossima medicina da prendere)
        </p>
      </div>

      {/* Ricette Screen Simple */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-xl font-bold text-[#003366] mb-4">Ricette Screen - Modalità Simple</h4>
        <div className="flex justify-center">
          <div 
            className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-300"
            style={{ width: '375px', height: '667px' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-center"
              style={{
                height: '60px',
                backgroundColor: '#003366',
                color: '#FFFFFF',
              }}
            >
              <span style={{ fontSize: '22px', fontWeight: '600' }}>Ricette</span>
            </div>

            {/* Content */}
            <div style={{ height: '547px', overflowY: 'auto', padding: '24px' }}>
              <div className="mb-6">
                <h2 style={{ fontSize: '20px', fontWeight: '550', color: '#003366', marginBottom: '8px' }}>
                  Prossima da Prendere
                </h2>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  Oggi alle 09:00
                </p>
              </div>

              {/* Solo la prossima ricetta in Simple mode */}
              <div className="space-y-4">
                <div 
                  className="bg-[#E8E8E8] rounded-lg p-6 border border-black"
                  style={{ minHeight: '200px' }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div style={{ fontSize: '48px' }}>💊</div>
                    <div className="flex-1">
                      <h3 style={{ fontSize: '20px', fontWeight: '550', color: '#000', marginBottom: '8px' }}>
                        Aspirina 100mg
                      </h3>
                      <p style={{ fontSize: '16px', color: '#666', marginBottom: '4px' }}>
                        1 compressa al giorno
                      </p>
                      <p style={{ fontSize: '14px', color: '#666' }}>
                        Prendi al mattino
                      </p>
                    </div>
                  </div>

                  <button
                    className="w-full bg-[#003366] text-white rounded-lg"
                    style={{ height: '56px', fontSize: '16px', fontWeight: '500' }}
                  >
                    ✓ Preso
                  </button>
                </div>

                {/* Helper text */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
                    💡 Premi "Preso" dopo aver preso la medicina
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div
              className="flex items-center justify-around border-t border-gray-200"
              style={{ height: '60px', backgroundColor: '#FFFFFF' }}
            >
              {['🏠 Home', '💊 Ricette', '📅 Visite', '👤 Profilo', '🚨 SOS'].map((item, idx) => (
                <button
                  key={idx}
                  className="flex flex-col items-center justify-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    color: idx === 1 ? '#003366' : '#9CA3AF',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.split(' ')[0]}</span>
                  <span style={{ fontSize: '8px', fontWeight: idx === 1 ? '600' : '400', marginTop: '2px' }}>
                    {item.split(' ')[1]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4 text-center">
          In modalità <strong>Simple</strong>, Ricette mostra solo <strong>la prossima medicina da prendere</strong> con un grande pulsante "Preso"
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-xl font-bold text-[#003366] mb-4">Confronto: Full vs Simple</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-3 font-semibold text-gray-900">Schermata</th>
                <th className="text-left p-3 font-semibold text-gray-900">Full Complexity</th>
                <th className="text-left p-3 font-semibold text-gray-900">Simple Complexity</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Home</td>
                <td className="p-3">4 quick actions (grid 2x2)</td>
                <td className="p-3 text-green-700 font-semibold">1 azione principale</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Ricette</td>
                <td className="p-3">Lista completa ricette attive</td>
                <td className="p-3 text-green-700 font-semibold">Solo prossima da prendere</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Visite</td>
                <td className="p-3">Prossime + Storico</td>
                <td className="p-3 text-green-700 font-semibold">Solo prossima visita</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Profilo</td>
                <td className="p-3">Dati + Impostazioni + Esci</td>
                <td className="p-3 text-green-700 font-semibold">Solo Impostazioni + Esci</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">SOS</td>
                <td className="p-3">Pulsante + Contatti rapidi</td>
                <td className="p-3 text-green-700 font-semibold">Solo pulsante emergenza</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rationale */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-500">
        <h4 className="text-xl font-bold text-gray-900 mb-4">💡 Rationale: Perché Simple Mode?</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-purple-600 text-xl">👵</span>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Angela (MCI - Mild Cognitive Impairment)</p>
              <p className="text-sm text-gray-700">
                <strong>Barriera:</strong> Sovraccarico cognitivo con troppe opzioni<br />
                <strong>Soluzione:</strong> Max 1-2 elementi per schermata, focus su azione immediata
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-green-600 text-xl">✓</span>
            <div>
              <p className="font-semibold text-gray-900 mb-1">WCAG 3.2.4 - Consistent Identification</p>
              <p className="text-sm text-gray-700">
                Ridurre la complessità mantiene la UI coerente e prevedibile
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-blue-600 text-xl">🎯</span>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Obiettivo</p>
              <p className="text-sm text-gray-700">
                Eliminare distrazioni e mostrare solo <strong>l'azione più importante</strong> che l'utente deve compiere
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
