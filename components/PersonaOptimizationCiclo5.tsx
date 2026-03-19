import MariaOptimized from './MariaOptimized';
import GiorgioOptimized from './GiorgioOptimized';
import AngelaOptimized from './AngelaOptimized';

export function PersonaOptimizationCiclo5() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-[#003366] mb-2">Ciclo 5: Persona Optimization</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          3 varianti ottimizzate per le barriere specifiche di ogni persona
        </p>
      </div>

      <div className="flex flex-wrap gap-8 justify-center">
        {/* Persona A: Maria */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-[#003366] text-white rounded-lg px-6 py-3 text-center">
            <h4 style={{ fontSize: '16px', fontWeight: '550' }}>Persona A: Maria</h4>
            <p style={{ fontSize: '12px', opacity: 0.9 }}>Active Senior - Presbiopia</p>
          </div>
          <MariaOptimized />
          <div className="bg-white rounded-lg p-4 shadow-sm" style={{ width: '375px' }}>
            <h5 className="mb-2" style={{ fontSize: '14px', fontWeight: '550', color: '#000' }}>
              Ottimizzazioni
            </h5>
            <ul className="space-y-1">
              <li style={{ fontSize: '12px', color: '#000' }}>• Font: 16px (aumentato da 14px)</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Contrasto: 15:1 (High Contrast ready)</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• 5 card visibili (interfaccia completa)</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Icone 48x48px + testo sempre presenti</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Voice + IoT buttons (funzionalità avanzate)</li>
            </ul>
          </div>
        </div>

        {/* Persona B: Giorgio */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-[#218281] text-white rounded-lg px-6 py-3 text-center">
            <h4 style={{ fontSize: '16px', fontWeight: '550' }}>Persona B: Giorgio</h4>
            <p style={{ fontSize: '12px', opacity: 0.9 }}>Motor Impairment - Tremore</p>
          </div>
          <GiorgioOptimized />
          <div className="bg-white rounded-lg p-4 shadow-sm" style={{ width: '375px' }}>
            <h5 className="mb-2" style={{ fontSize: '14px', fontWeight: '550', color: '#000' }}>
              Ottimizzazioni
            </h5>
            <ul className="space-y-1">
              <li style={{ fontSize: '12px', color: '#000' }}>• Icone: 72x72px (+50% vs Maria)</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Spaziatura: 24px (doppia)</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Max 3 card (ridotto carico)</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Voice button: 40px icon prominente</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Font: 18px per leggibilità</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Bordi 2px per maggiore contrasto</li>
            </ul>
          </div>
        </div>

        {/* Persona C: Angela */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-black text-white rounded-lg px-6 py-3 text-center">
            <h4 style={{ fontSize: '16px', fontWeight: '550' }}>Persona C: Angela</h4>
            <p style={{ fontSize: '12px', opacity: 0.9 }}>Cognitive Frail - MCI</p>
          </div>
          <AngelaOptimized />
          <div className="bg-white rounded-lg p-4 shadow-sm" style={{ width: '375px' }}>
            <h5 className="mb-2" style={{ fontSize: '14px', fontWeight: '550', color: '#000' }}>
              Ottimizzazioni
            </h5>
            <ul className="space-y-1">
              <li style={{ fontSize: '12px', color: '#000' }}>• Ultra-semplificata: 1 card principale</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Icona: 96x96px (doppia vs standard)</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Card: 240px altezza (massima visibilità)</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Font: 22px titolo, 18px testo</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• SOS rosso #DC2626 (emergenza prioritaria)</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Voice + SOS stacked (no grid)</li>
              <li style={{ fontSize: '12px', color: '#000' }}>• Bordi 2px neri (contrasto 21:1)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-lg p-6">
        <h4 className="text-[#003366] mb-4">Tabella Comparativa Ottimizzazioni</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#003366] text-white">
                <th className="border border-gray-300 p-3 text-left" style={{ fontSize: '14px' }}>
                  Parametro
                </th>
                <th className="border border-gray-300 p-3 text-center" style={{ fontSize: '14px' }}>
                  Maria (A)
                </th>
                <th className="border border-gray-300 p-3 text-center" style={{ fontSize: '14px' }}>
                  Giorgio (B)
                </th>
                <th className="border border-gray-300 p-3 text-center" style={{ fontSize: '14px' }}>
                  Angela (C)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { param: 'Font Size Titolo', a: '14px', b: '16px', c: '20px' },
                { param: 'Dimensione Icone', a: '48x48px', b: '72x72px', c: '96x96px' },
                { param: 'Spacing Card', a: '16px', b: '24px', c: '24px' },
                { param: 'Cards Visibili', a: '5', b: '3', c: '1' },
                { param: 'Complessità', a: 'Full', b: 'Medium', c: 'Simple' },
                { param: 'Bottom Nav', a: 'Sì (5 item)', b: 'Sì (5 item)', c: 'Sì (5 item)' },
                { param: 'Pulsanti Ausiliari', a: 'Voice + IoT', b: 'Voice + IoT', c: 'Voice + SOS' },
                { param: 'Colore Emergenza', a: 'Navy', b: 'Navy', c: 'Rosso #DC2626' },
                { param: 'Bordo Contrasto', a: '1px nero', b: '1px-2px nero', c: '2px nero' },
                { param: 'Altezza Card', a: '~80px', b: '~90px', c: '240px' },
              ].map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 p-3" style={{ fontSize: '14px', fontWeight: '550' }}>
                    {row.param}
                  </td>
                  <td className="border border-gray-300 p-3 text-center" style={{ fontSize: '14px' }}>
                    {row.a}
                  </td>
                  <td className="border border-gray-300 p-3 text-center" style={{ fontSize: '14px' }}>
                    {row.b}
                  </td>
                  <td className="border border-gray-300 p-3 text-center" style={{ fontSize: '14px' }}>
                    {row.c}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-lg p-6">
        <h4 className="text-[#003366] mb-4">Key Insights</h4>
        <div className="grid grid-cols-3 gap-6">
          <div className="border-l-4 border-[#003366] pl-4">
            <h5 className="mb-2" style={{ fontSize: '16px', fontWeight: '550', color: '#003366' }}>
              Barriere Visive (Maria)
            </h5>
            <p style={{ fontSize: '14px', color: '#000', lineHeight: '1.5' }}>
              Maria necessita principalmente di font scalabile (16px+) e alto contrasto (15:1). L'interfaccia completa 
              è gestibile con le giuste dimensioni. <strong>5 Quick Actions</strong> con icone 48x48px + Voice/IoT.
            </p>
          </div>
          <div className="border-l-4 border-[#218281] pl-4">
            <h5 className="mb-2" style={{ fontSize: '16px', fontWeight: '550', color: '#218281' }}>
              Barriere Motorie (Giorgio)
            </h5>
            <p style={{ fontSize: '14px', color: '#000', lineHeight: '1.5' }}>
              Giorgio richiede <strong>target XXL</strong> (72px+) e spaziatura generosa (24px). Ridotte a <strong>3 card</strong> 
              per evitare tap accidentali. Voice input prominente con icone 40px.
            </p>
          </div>
          <div className="border-l-4 border-black pl-4">
            <h5 className="mb-2" style={{ fontSize: '16px', fontWeight: '550', color: '#000' }}>
              Barriere Cognitive (Angela)
            </h5>
            <p style={{ fontSize: '14px', color: '#000', lineHeight: '1.5' }}>
              Angela necessita <strong>drastica semplificazione</strong>: 1 card gigante (240px), icona 96x96px, 
              <strong>SOS rosso</strong> sempre visibile. No sovraccarico cognitivo = solo azione principale.
            </p>
          </div>
        </div>
      </div>

      {/* WCAG Compliance Summary */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-500">
        <h4 className="text-[#003366] mb-4 text-center text-xl">✅ WCAG 2.1 AA Compliance</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-[#036] mb-2">Maria</h5>
            <ul className="text-sm space-y-1">
              <li>✓ 1.4.3 Contrast 7:1</li>
              <li>✓ 2.5.5 Target 48px</li>
              <li>✓ 1.4.4 Resize 200%</li>
              <li>✓ 1.4.11 Non-text Contrast</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-[#218281] mb-2">Giorgio</h5>
            <ul className="text-sm space-y-1">
              <li>✓ 2.5.5 Target 72px (AAA)</li>
              <li>✓ 2.5.1 Pointer Gestures</li>
              <li>✓ 2.4.7 Focus Visible 2px</li>
              <li>✓ 2.5.4 Motion Actuation</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-black mb-2">Angela</h5>
            <ul className="text-sm space-y-1">
              <li>✓ 2.4.4 Link Purpose (1 azione)</li>
              <li>✓ 1.4.11 Contrast 21:1</li>
              <li>✓ 3.2.4 Consistent ID</li>
              <li>✓ 2.5.5 Target 343x247px</li>
              <li>✓ 1.4.1 Use of Color (SOS)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
