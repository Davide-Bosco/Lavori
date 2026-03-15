import { Persona, LoginStatus } from '../App';

interface PersonaSelectorProps {
  currentPersona: Persona | null;
  onPersonaChange: (persona: Persona) => void;
  loginStatus: LoginStatus;
}

export function PersonaSelector({ currentPersona, onPersonaChange, loginStatus }: PersonaSelectorProps) {
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

  // Determina se le personas sono cliccabili
  // - Con login (logged-in): SOLO la persona loggata è cliccabile (ma non cambiabile)
  // - Senza login (skipped): NESSUNA persona è cliccabile
  const isPersonaClickable = (personaId: Persona) => {
    if (loginStatus === 'logged-in') {
      // Con login, solo la persona corrente è "attiva" ma non cambiabile
      return false;
    }
    if (loginStatus === 'skipped') {
      // Senza login, nessuna persona è selezionabile
      return false;
    }
    // loginStatus === 'none' (non dovrebbe mai accadere dopo onboarding)
    return false;
  };

  return (
    <div className="mb-6 w-full max-w-md">
      <div className="grid grid-cols-3 gap-3">
        {personas.map((persona) => {
          const isActive = currentPersona === persona.id;
          const isClickable = isPersonaClickable(persona.id);
          const isDisabled = loginStatus === 'skipped' || (loginStatus === 'logged-in' && !isActive);

          return (
            <button
              key={persona.id}
              onClick={() => isClickable && onPersonaChange(persona.id)}
              disabled={isDisabled}
              className={`p-4 rounded-lg border-2 transition-all ${
                isActive
                  ? 'bg-white shadow-lg scale-105'
                  : isDisabled
                  ? 'bg-gray-100 opacity-50 cursor-not-allowed'
                  : 'bg-gray-50 hover:bg-white hover:shadow-md'
              }`}
              style={{
                borderColor: isActive ? persona.color : '#E8E8E8',
              }}
              aria-label={`${persona.name}, ${persona.title}${isActive ? ' - Attualmente selezionato' : ''}${isDisabled ? ' - Non disponibile' : ''}`}
            >
              <div className="text-center">
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{persona.emoji}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: isDisabled ? '#999' : '#000', marginBottom: '4px' }}>
                  {persona.name}
                </div>
                <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>
                  {persona.title}
                </div>
                {isActive && loginStatus === 'logged-in' && (
                  <div 
                    className="mt-2 px-2 py-1 rounded text-white"
                    style={{ fontSize: '10px', backgroundColor: persona.color }}
                  >
                    🔒 Loggato
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-3 p-3 bg-white rounded-lg shadow-sm text-center">
        {loginStatus === 'logged-in' && (
          <p style={{ fontSize: '12px', color: '#666' }}>
            🔒 Sei autenticato come <strong>{personas.find(p => p.id === currentPersona)?.name}</strong>
          </p>
        )}
        {loginStatus === 'skipped' && (
          <p style={{ fontSize: '12px', color: '#000', fontWeight: '600' }}>
            ⚠️ Stai usando l'app come ospite
          </p>
        )}
      </div>
    </div>
  );
}