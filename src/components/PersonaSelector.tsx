import { Persona } from '../App';

interface PersonaSelectorProps {
  currentPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

export function PersonaSelector({ currentPersona, onPersonaChange }: PersonaSelectorProps) {
  const personas = [
    {
      id: 'maria' as Persona,
      name: 'Maria',
      emoji: '👩‍🦳',
      title: '75 anni',
      description: 'Active Senior - Presbiopia',
      color: '#003366',
    },
    {
      id: 'giorgio' as Persona,
      name: 'Giorgio',
      emoji: '👴',
      title: '78 anni',
      description: 'Motor Impairment - Tremore leggero',
      color: '#218281',
    },
    {
      id: 'angela' as Persona,
      name: 'Angela',
      emoji: '👵',
      title: '82 anni',
      description: 'Cognitive Frail - MCI lieve',
      color: '#000000',
    },
  ];

  return (
    <div className="mb-6 w-full max-w-md">
      <h3 className="text-center mb-4" style={{ fontSize: '18px', fontWeight: '600', color: '#003366' }}>
        Seleziona Persona
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => onPersonaChange(persona.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentPersona === persona.id
                ? 'bg-white shadow-lg scale-105'
                : 'bg-gray-50 hover:bg-white hover:shadow-md'
            }`}
            style={{
              borderColor: currentPersona === persona.id ? persona.color : '#E8E8E8',
            }}
          >
            <div className="text-center">
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{persona.emoji}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#000', marginBottom: '4px' }}>
                {persona.name}
              </div>
              <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>
                {persona.title}
              </div>
              {currentPersona === persona.id && (
                <div 
                  className="mt-2 px-2 py-1 rounded text-white"
                  style={{ fontSize: '10px', backgroundColor: persona.color }}
                >
                  Attivo
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-3 p-3 bg-white rounded-lg shadow-sm text-center">
        <p style={{ fontSize: '12px', color: '#666' }}>
          {personas.find(p => p.id === currentPersona)?.description}
        </p>
      </div>
    </div>
  );
}