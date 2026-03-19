export function Personas() {
  const personas = [
    {
      name: 'Maria',
      title: 'Active Senior',
      age: '70 anni',
      image: '👩‍🦳',
      condition: 'Presbiopia',
      digitalSkill: 'Competenza Digitale Moderata',
      barriers: [
        'Difficoltà lettura font piccoli (<14px)',
        'Affaticamento visivo con contrasti bassi',
        'Necessità di ingrandimento testi',
        'Difficoltà con icone senza etichette',
      ],
      wcagRequirements: [
        '1.4.4 Resize Text: Font scalabile 14-24px',
        '1.4.3 Contrast: Minimo 4.5:1 ratio',
        '1.4.12 Text Spacing: Line height 1.5',
        '2.4.4 Link Purpose: Etichette chiare',
      ],
      features: [
        'Modalità font 16px default',
        'Alto contrasto opzionale',
        'Zoom interfaccia fino 200%',
        'Icone + testo sempre',
      ],
    },
    {
      name: 'Giorgio',
      title: 'Motor Impairment',
      age: '78 anni',
      image: '👴',
      condition: 'Tremore/Deficit Motorio',
      digitalSkill: 'Uso smartphone con difficoltà',
      barriers: [
        'Tremore rende difficile toccare target piccoli',
        'Difficoltà con gesture complessi (swipe, pinch)',
        'Errori frequenti di selezione',
        'Fatica fisica nell\'uso prolungato',
      ],
      wcagRequirements: [
        '2.5.5 Target Size: Pulsanti ≥48x48px, ideale 72px',
        '2.5.1 Pointer Gestures: Alternative a gesture complessi',
        '2.5.2 Pointer Cancellation: Undo disponibile',
        '2.1.1 Keyboard: Input vocale alternativo',
      ],
      features: [
        'Pulsanti 72-96px',
        'Spaziatura 24px tra elementi',
        'Input vocale prominente',
        'Conferme per azioni importanti',
      ],
    },
    {
      name: 'Angela',
      title: 'Cognitive Frail',
      age: '82 anni',
      image: '👵',
      condition: 'MCI (Mild Cognitive Impairment)',
      digitalSkill: 'Bassa - Carico cognitivo alto',
      barriers: [
        'Sovraccarico cognitivo con troppe opzioni',
        'Difficoltà navigazione complessa',
        'Disorientamento senza feedback chiaro',
        'Memoria a breve termine limitata',
      ],
      wcagRequirements: [
        '3.2.4 Consistent Identification: UI coerente',
        '3.3.2 Labels: Help contestuale',
        '2.4.8 Location: Breadcrumbs chiare',
        '3.1.5 Reading Level: Linguaggio semplice',
      ],
      features: [
        'Interfaccia ultra-semplificata',
        'Max 2-3 opzioni per schermata',
        'Breadcrumb espliciti',
        'Plain language (no gergo medico)',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-[#003366] mb-2">3 Personas Target</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Anziani fragili con barriere specifiche documentate secondo WCAG 2.1
        </p>
      </div>

      {personas.map((persona, idx) => (
        <div key={persona.name} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div
              className="flex items-center justify-center rounded-full bg-[#E8E8E8]"
              style={{ width: '120px', height: '120px', fontSize: '64px' }}
            >
              {persona.image}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="mb-4">
                <h4 className="text-[#003366] mb-1">
                  Persona {String.fromCharCode(65 + idx)}: {persona.title} - {persona.name}
                </h4>
                <div className="flex gap-4 text-gray-600">
                  <span style={{ fontSize: '14px' }}>{persona.age}</span>
                  <span style={{ fontSize: '14px' }}>•</span>
                  <span style={{ fontSize: '14px' }}>{persona.condition}</span>
                  <span style={{ fontSize: '14px' }}>•</span>
                  <span style={{ fontSize: '14px' }}>{persona.digitalSkill}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Barriers */}
                <div>
                  <h5 className="mb-3" style={{ fontSize: '16px', fontWeight: '550', color: '#000' }}>
                    Barriere Identificate
                  </h5>
                  <ul className="space-y-2">
                    {persona.barriers.map((barrier, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-600" style={{ fontSize: '14px' }}>
                          ⚠
                        </span>
                        <span style={{ fontSize: '14px', color: '#000' }}>{barrier}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WCAG Requirements */}
                <div>
                  <h5 className="mb-3" style={{ fontSize: '16px', fontWeight: '550', color: '#000' }}>
                    Requisiti WCAG
                  </h5>
                  <ul className="space-y-2">
                    {persona.wcagRequirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600" style={{ fontSize: '14px' }}>
                          ✓
                        </span>
                        <span style={{ fontSize: '14px', color: '#000' }}>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Features */}
              <div className="mt-4 p-4 bg-[#E8E8E8] rounded-lg">
                <h5 className="mb-2" style={{ fontSize: '14px', fontWeight: '550', color: '#000' }}>
                  Features Personalizzate
                </h5>
                <div className="flex flex-wrap gap-2">
                  {persona.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#003366] text-white rounded-full"
                      style={{ fontSize: '12px' }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-lg p-6">
        <h4 className="text-[#003366] mb-4">Metodologia</h4>
        <p style={{ fontSize: '14px', color: '#000', lineHeight: '1.5', marginBottom: '12px' }}>
          Le 3 personas rappresentano tipologie reali di anziani fragili con barriere distinte:
        </p>
        <ul className="space-y-2">
          <li style={{ fontSize: '14px', color: '#000' }}>
            <strong>Maria:</strong> Barriere visive (presbiopia) - Focus su contrasto e scalabilità
          </li>
          <li style={{ fontSize: '14px', color: '#000' }}>
            <strong>Giorgio:</strong> Barriere motorie (tremore) - Focus su target size e input vocale
          </li>
          <li style={{ fontSize: '14px', color: '#000' }}>
            <strong>Angela:</strong> Barriere cognitive (MCI) - Focus su semplicità e orientamento
          </li>
        </ul>
      </div>
    </div>
  );
}
