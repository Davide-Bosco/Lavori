import { Check, AlertTriangle } from 'lucide-react';

export function AccessibilityCheckCiclo4() {
  const checklistItems = [
    {
      criterion: '1.4.4 Resize Text',
      description: 'Font scalabile da 14px a 24px senza perdita di contenuto o funzionalità',
      status: 'pass',
      implementation: 'Font sizes: 14px (Body), 16px (Body Large), 18px (Large), 24px (Heading 1). Sistema scalabile implementato.',
      level: 'AA',
    },
    {
      criterion: '1.4.3 Contrast Minimum',
      description: 'Rapporto di contrasto minimo 4.5:1 per testo normale, 3:1 per testo grande',
      status: 'pass',
      implementation: 'Navy Blue (#003366) su Bianco (#FFFFFF) = 15:1 (supera AAA). Tutti i testi superano 4.5:1.',
      level: 'AA',
    },
    {
      criterion: '2.5.5 Target Size',
      description: 'Elementi interattivi almeno 48x48px con spaziatura minima 8px',
      status: 'pass',
      implementation: 'Pulsanti standard: 48x48px. Pulsanti motor-adapted: 72-96px. Spacing: 8-24px.',
      level: 'AAA',
    },
    {
      criterion: '3.2.4 Consistent Identification',
      description: 'Componenti con stessa funzionalità hanno identificazione consistente',
      status: 'pass',
      implementation: 'Bottom navigation identica su tutte le 5 schermate. Icone e labels coerenti.',
      level: 'AA',
    },
    {
      criterion: '2.5.1 Pointer Gestures',
      description: 'Alternative disponibili per gesture multi-point o path-based',
      status: 'pass',
      implementation: 'Input vocale disponibile come alternativa. Nessun gesture complesso richiesto.',
      level: 'A',
    },
    {
      criterion: '3.1.5 Reading Level',
      description: 'Testo supplementare disponibile quando il contenuto richiede capacità di lettura avanzata',
      status: 'pass',
      implementation: 'Plain language mode disponibile. Evitato gergo medico. Linguaggio semplice di default.',
      level: 'AAA',
    },
    {
      criterion: '2.4.8 Location',
      description: 'Informazioni sulla posizione dell\'utente nella struttura del sito',
      status: 'todo',
      implementation: 'DA IMPLEMENTARE: Breadcrumbs per Persona C (Angela) nella versione cognitive-simple.',
      level: 'AAA',
    },
    {
      criterion: '3.3.2 Labels or Instructions',
      description: 'Etichette o istruzioni fornite quando il contenuto richiede input utente',
      status: 'todo',
      implementation: 'DA IMPLEMENTARE: Help contestuale completo su tutti i form. Attualmente solo parziale.',
      level: 'A',
    },
    {
      criterion: '1.4.12 Text Spacing',
      description: 'Nessuna perdita di contenuto con spacing aumentato',
      status: 'pass',
      implementation: 'Line height 1.5 per body text, 1.2 per headings. Sistema spacing flessibile.',
      level: 'AA',
    },
    {
      criterion: '2.4.4 Link Purpose',
      description: 'Lo scopo di ogni link determinabile dal testo del link',
      status: 'pass',
      implementation: 'Tutti i pulsanti e link hanno labels descrittive. No "Clicca qui" generici.',
      level: 'A',
    },
  ];

  const passCount = checklistItems.filter((item) => item.status === 'pass').length;
  const todoCount = checklistItems.filter((item) => item.status === 'todo').length;
  const percentage = Math.round((passCount / checklistItems.length) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-[#003366] mb-2">Ciclo 4: WCAG 2.1 Accessibility Check</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Verifica compliance WCAG 2.1 Level AA con checklist dettagliata
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-[#003366] text-white rounded-lg p-6">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>Conformità Totale</p>
            <p style={{ fontSize: '48px', fontWeight: '600', lineHeight: '1' }}>{percentage}%</p>
          </div>
          <div>
            <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>Criteri Superati</p>
            <p style={{ fontSize: '48px', fontWeight: '600', lineHeight: '1', color: '#4ade80' }}>{passCount}</p>
          </div>
          <div>
            <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>Da Completare</p>
            <p style={{ fontSize: '48px', fontWeight: '600', lineHeight: '1', color: '#fbbf24' }}>{todoCount}</p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-4">
        {checklistItems.map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              {/* Status Icon */}
              <div
                className={`flex items-center justify-center rounded-full ${
                  item.status === 'pass' ? 'bg-green-100' : 'bg-yellow-100'
                }`}
                style={{ width: '48px', height: '48px', flexShrink: 0 }}
              >
                {item.status === 'pass' ? (
                  <Check size={24} color="#16a34a" />
                ) : (
                  <AlertTriangle size={24} color="#eab308" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-[#003366]" style={{ fontSize: '16px', fontWeight: '550' }}>
                    {item.status === 'pass' ? '✓' : '⚠'} {item.criterion}
                  </h4>
                  <span
                    className="px-2 py-1 bg-[#003366] text-white rounded"
                    style={{ fontSize: '10px', fontWeight: '600' }}
                  >
                    Level {item.level}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                  {item.description}
                </p>

                <div
                  className={`p-3 rounded ${item.status === 'pass' ? 'bg-green-50' : 'bg-yellow-50'}`}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      color: item.status === 'pass' ? '#166534' : '#854d0e',
                      fontWeight: '500',
                    }}
                  >
                    {item.implementation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Notes */}
      <div className="bg-white rounded-lg p-6">
        <h4 className="text-[#003366] mb-4">Note Aggiuntive</h4>
        <div className="space-y-4">
          <div>
            <h5 className="mb-2" style={{ fontSize: '16px', fontWeight: '550', color: '#000' }}>
              Metodologia Testing
            </h5>
            <p style={{ fontSize: '14px', color: '#000', lineHeight: '1.5' }}>
              La verifica è stata condotta seguendo le linee guida WCAG 2.1. Ogni criterio è stato testato
              manualmente con particolare focus sulle 3 personas target. I criteri Level AA sono prioritari,
              mentre alcuni Level AAA sono stati implementati per migliorare l'accessibilità per anziani fragili.
            </p>
          </div>

          <div>
            <h5 className="mb-2" style={{ fontSize: '16px', fontWeight: '550', color: '#000' }}>
              Strumenti Utilizzati
            </h5>
            <ul className="space-y-2">
              <li style={{ fontSize: '14px', color: '#000' }}>
                • <strong>Contrast Checker:</strong> WebAIM per verifica rapporti di contrasto
              </li>
              <li style={{ fontSize: '14px', color: '#000' }}>
                • <strong>Screen Reader:</strong> Test con NVDA e VoiceOver
              </li>
              <li style={{ fontSize: '14px', color: '#000' }}>
                • <strong>Keyboard Navigation:</strong> Test completo navigazione da tastiera
              </li>
              <li style={{ fontSize: '14px', color: '#000' }}>
                • <strong>Zoom Test:</strong> Verifica fino a 200% zoom senza perdita funzionalità
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-2" style={{ fontSize: '16px', fontWeight: '550', color: '#000' }}>
              Prossimi Passi
            </h5>
            <ul className="space-y-2">
              <li style={{ fontSize: '14px', color: '#000' }}>
                1. Implementare breadcrumbs per migliorare orientamento (2.4.8)
              </li>
              <li style={{ fontSize: '14px', color: '#000' }}>
                2. Aggiungere help contestuale completo su tutti i form (3.3.2)
              </li>
              <li style={{ fontSize: '14px', color: '#000' }}>
                3. Testing utente con le 3 personas reali
              </li>
              <li style={{ fontSize: '14px', color: '#000' }}>
                4. Iterazione basata su feedback accessibilità
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
