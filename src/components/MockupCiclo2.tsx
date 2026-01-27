import { MobileFrame } from './MobileFrame';
import { Calendar, Pill, Stethoscope, User, Phone } from 'lucide-react';

export function MockupCiclo2() {
  const screens = [
    {
      id: 'home',
      title: 'Home',
      icon: Calendar,
      cards: [
        { title: 'Prossima Visita', subtitle: 'Dr. Rossi - 15 Gen, 10:00', icon: Calendar },
        { title: 'Ricette Attive', subtitle: '3 farmaci disponibili', icon: Pill },
        { title: 'Misurazioni', subtitle: 'Ultima: Pressione 120/80', icon: Stethoscope },
        { title: 'Promemoria', subtitle: 'Prendi la pastiglia delle 14:00', icon: Calendar },
      ],
    },
    {
      id: 'ricette',
      title: 'Ricette',
      icon: Pill,
      cards: [
        { title: 'Aspirina 100mg', subtitle: 'Valida fino al 31 Gen', icon: Pill },
        { title: 'Ramipril 5mg', subtitle: 'Valida fino al 28 Feb', icon: Pill },
        { title: 'Atorvastatina 20mg', subtitle: 'Valida fino al 15 Mar', icon: Pill },
      ],
    },
    {
      id: 'visite',
      title: 'Visite',
      icon: Stethoscope,
      cards: [
        { title: 'Dr. Rossi - Cardiologo', subtitle: '15 Gen, 10:00', icon: Stethoscope },
        { title: 'Dr.ssa Bianchi - Medicina Generale', subtitle: '22 Gen, 15:30', icon: Stethoscope },
        { title: 'Prenota Nuova Visita', subtitle: 'Cerca specialista', icon: Calendar },
      ],
    },
    {
      id: 'profilo',
      title: 'Profilo',
      icon: User,
      cards: [
        { title: 'Info Personali', subtitle: 'Nome, Data nascita, Tessera sanitaria', icon: User },
        { title: 'Impostazioni', subtitle: 'Notifiche, Privacy, Accessibilità', icon: User },
        { title: 'Documenti', subtitle: 'Referti, Esami, Cartella clinica', icon: Calendar },
      ],
    },
    {
      id: 'sos',
      title: 'SOS',
      icon: Phone,
      cards: [
        { title: 'Emergenza 118', subtitle: 'Chiama subito', icon: Phone },
        { title: 'Medico di Base', subtitle: 'Dr.ssa Bianchi - 02 1234567', icon: Phone },
        { title: 'Farmacia di Turno', subtitle: 'Via Roma 15 - Aperta', icon: Phone },
      ],
    },
  ];

  return (
    <div>
      <div className="mb-6 bg-white rounded-lg p-6">
        <h3 className="text-[#003366] mb-2">Ciclo 2: Mockup Mid-Fidelity</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Aggiunge colori Navy Blue, tipografia Open Sans, ombre soft, e icone
        </p>
      </div>

      <div className="flex flex-wrap gap-6">
        {screens.map((screen) => {
          const IconComponent = screen.icon;
          return (
            <div key={screen.id} className="flex flex-col items-center gap-3">
              <MobileFrame title={screen.title} activeNav={screen.id}>
                <div className="p-4 space-y-3">
                  {screen.cards.map((card, idx) => {
                    const CardIcon = card.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-[#E8E8E8] rounded-lg p-4 border border-black transition-shadow hover:shadow-md"
                        style={{
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="flex items-center justify-center bg-[#003366] rounded-lg"
                            style={{ width: '48px', height: '48px' }}
                          >
                            <CardIcon size={24} color="#FFFFFF" />
                          </div>
                          <div className="flex-1">
                            <p style={{ fontSize: '14px', fontWeight: '550', color: '#000', marginBottom: '4px' }}>
                              {card.title}
                            </p>
                            <p style={{ fontSize: '12px', color: '#666' }}>{card.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </MobileFrame>
              <span style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
                {screen.title} Screen
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-lg p-6">
        <h4 className="text-[#003366] mb-4">Miglioramenti vs Ciclo 1</h4>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="mb-3" style={{ fontSize: '16px', fontWeight: '550', color: '#000' }}>
              Aggiunte Visive
            </h5>
            <ul className="space-y-2">
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Colori: Navy Blue (#003366) header e bottom bar</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Tipografia: Open Sans con gerarchia definita</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Ombre: box-shadow soft sulle card</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Icone: Lucide React per ogni card</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Card: Background grigio #E8E8E8</li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3" style={{ fontSize: '16px', fontWeight: '550', color: '#000' }}>
              Mantenuto da Ciclo 1
            </h5>
            <ul className="space-y-2">
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Layout: Identica struttura 375x667px</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Header: 60px altezza</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Bottom nav: 60px, 5 voci</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Spacing: 16px padding, 12px gap</li>
              <li style={{ fontSize: '14px', color: '#000' }}>✓ Coerenza: Layout uguale su tutte le schermate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
