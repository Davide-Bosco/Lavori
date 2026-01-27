import { MobileFrame } from './MobileFrame';

export function WireframesCiclo1() {
  const screens = [
    {
      id: 'home',
      title: 'Home',
      cards: ['Prossima Visita', 'Ricette Attive', 'Misurazioni', 'Promemoria', 'Contatti'],
    },
    {
      id: 'ricette',
      title: 'Ricette',
      cards: ['Ricetta 1', 'Ricetta 2', 'Ricetta 3', 'Ricetta 4'],
    },
    {
      id: 'visite',
      title: 'Visite',
      cards: ['Visita 1', 'Visita 2', 'Visita 3', 'Prenota Nuova'],
    },
    {
      id: 'profilo',
      title: 'Profilo',
      cards: ['Info Personali', 'Impostazioni', 'Documenti', 'Privacy'],
    },
    {
      id: 'sos',
      title: 'SOS',
      cards: ['Emergenza 118', 'Medico di Base', 'Farmacia', 'Contatto Familiare'],
    },
  ];

  return (
    <div>
      <div className="mb-6 bg-white rounded-lg p-6">
        <h3 className="text-[#003366] mb-2">Ciclo 1: Wireframes Low-Fidelity</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Layout mobile 375x667px • Bianco/Nero • Struttura senza colori né immagini
        </p>
      </div>

      <div className="flex flex-wrap gap-6">
        {screens.map((screen) => (
          <div key={screen.id} className="flex flex-col items-center gap-3">
            <MobileFrame title={screen.title} activeNav={screen.id} headerBg="#000000" contentBg="#FFFFFF">
              <div className="p-4 space-y-3">
                {screen.cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border-2 border-gray-400"
                    style={{
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '14px', color: '#000', fontWeight: '400' }}>
                      {card}
                    </span>
                  </div>
                ))}
              </div>
            </MobileFrame>
            <span style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
              {screen.title} Screen
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg p-6">
        <h4 className="text-[#003366] mb-4">Caratteristiche Layout</h4>
        <ul className="space-y-2">
          <li style={{ fontSize: '14px', color: '#000' }}>• Header area: 60px altezza</li>
          <li style={{ fontSize: '14px', color: '#000' }}>• Content area: 547px (667 - 60 header - 60 nav)</li>
          <li style={{ fontSize: '14px', color: '#000' }}>• Bottom navigation: 60px altezza, Navy Blue, 5 voci</li>
          <li style={{ fontSize: '14px', color: '#000' }}>• Card spacing: 12px tra elementi</li>
          <li style={{ fontSize: '14px', color: '#000' }}>• Padding laterale: 16px</li>
        </ul>
      </div>
    </div>
  );
}
