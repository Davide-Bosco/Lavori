import { useState } from 'react';

export function PersonalizzazioneHotspots() {
  const [settings, setSettings] = useState({
    fontSize: '14px',
    colorMode: 'Normal',
    complexity: 'Full',
    helpLevel: 'Contextual',
    language: 'Standard',
    timeout: '30min',
  });

  const hotspots = [
    {
      id: 'fontSize',
      title: 'Font Size',
      options: ['14px', '16px', '18px', '24px'],
      description: 'Dimensione carattere per migliore leggibilità',
    },
    {
      id: 'colorMode',
      title: 'Color Mode',
      options: ['Normal', 'High Contrast', 'Dark'],
      description: 'Modalità colore per presbiopia e ipovisione',
    },
    {
      id: 'complexity',
      title: 'Interface Complexity',
      options: ['Simple', 'Medium', 'Full'],
      description: 'Livello complessità interfaccia',
    },
    {
      id: 'helpLevel',
      title: 'Help Level',
      options: ['None', 'Contextual', 'Full', 'Voice'],
      description: 'Livello assistenza contestuale',
    },
    {
      id: 'language',
      title: 'Language',
      options: ['Standard', 'Plain Language', 'Icons Only'],
      description: 'Livello linguaggio semplificato',
    },
    {
      id: 'timeout',
      title: 'Session Timeout',
      options: ['5min', '15min', '30min', 'None'],
      description: 'Timeout sessione per anziani con ridotta velocità',
    },
  ];

  const handleSettingChange = (id: string, value: string) => {
    setSettings((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-[#003366] mb-2">Personalizzazione Hotspots</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          6 toggle per adattare l'interfaccia alle esigenze individuali delle personas
        </p>
      </div>

      {/* Current Configuration Preview */}
      <div className="bg-[#003366] text-white rounded-lg p-6">
        <h4 className="mb-4" style={{ fontSize: '20px', fontWeight: '550' }}>
          Configurazione Corrente
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="bg-white/10 rounded p-3">
              <span style={{ fontSize: '12px', opacity: 0.8 }}>
                {hotspots.find((h) => h.id === key)?.title}
              </span>
              <p style={{ fontSize: '16px', fontWeight: '550', marginTop: '4px' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hotspots Grid */}
      <div className="grid grid-cols-2 gap-6">
        {hotspots.map((hotspot) => (
          <div key={hotspot.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="mb-4">
              <h4 className="text-[#003366] mb-1">{hotspot.title}</h4>
              <p style={{ fontSize: '12px', color: '#666' }}>{hotspot.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {hotspot.options.map((option) => {
                const isActive = settings[hotspot.id as keyof typeof settings] === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleSettingChange(hotspot.id, option)}
                    className={`px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-[#003366] text-white'
                        : 'bg-[#E8E8E8] text-black hover:bg-[#218281] hover:text-white'
                    }`}
                    style={{
                      fontSize: '14px',
                      fontWeight: isActive ? '550' : '400',
                      border: isActive ? '2px solid #218281' : '1px solid #ccc',
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Active indicator */}
            <div className="mt-3 flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  settings[hotspot.id as keyof typeof settings] ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
              <span style={{ fontSize: '12px', color: '#666' }}>
                Attivo: {settings[hotspot.id as keyof typeof settings]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Persona Mapping */}
      <div className="bg-white rounded-lg p-6">
        <h4 className="text-[#003366] mb-4">Configurazioni Raccomandate per Personas</h4>
        <div className="grid grid-cols-3 gap-4">
          {/* Maria */}
          <div className="border-2 border-[#003366] rounded-lg p-4">
            <h5 className="mb-3" style={{ fontSize: '16px', fontWeight: '550', color: '#003366' }}>
              Persona A: Maria
            </h5>
            <ul className="space-y-2">
              <li style={{ fontSize: '14px', color: '#000' }}>• Font Size: <strong>16px</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Color: <strong>High Contrast</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Complexity: <strong>Full</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Help: <strong>Contextual</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Language: <strong>Standard</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Timeout: <strong>30min</strong></li>
            </ul>
          </div>

          {/* Giorgio */}
          <div className="border-2 border-[#218281] rounded-lg p-4">
            <h5 className="mb-3" style={{ fontSize: '16px', fontWeight: '550', color: '#218281' }}>
              Persona B: Giorgio
            </h5>
            <ul className="space-y-2">
              <li style={{ fontSize: '14px', color: '#000' }}>• Font Size: <strong>18px</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Color: <strong>Normal</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Complexity: <strong>Medium</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Help: <strong>Voice</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Language: <strong>Standard</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Timeout: <strong>None</strong></li>
            </ul>
          </div>

          {/* Angela */}
          <div className="border-2 border-[#FFFF00] rounded-lg p-4 bg-[#FFFF00]/10">
            <h5 className="mb-3" style={{ fontSize: '16px', fontWeight: '550', color: '#000' }}>
              Persona C: Angela
            </h5>
            <ul className="space-y-2">
              <li style={{ fontSize: '14px', color: '#000' }}>• Font Size: <strong>18px</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Color: <strong>Normal</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Complexity: <strong>Simple</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Help: <strong>Full</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Language: <strong>Plain Language</strong></li>
              <li style={{ fontSize: '14px', color: '#000' }}>• Timeout: <strong>None</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
