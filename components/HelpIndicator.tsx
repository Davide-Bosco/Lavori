import { motion } from 'motion/react';
import { AppSettings } from '../App';
import { HelpCircle, Lightbulb, Mic, MessageCircle } from 'lucide-react';

interface HelpIndicatorProps {
  settings: AppSettings;
  screen: 'home' | 'ricette' | 'visite' | 'profilo' | 'sos';
}

// Messaggi di aiuto uniformi per ogni schermata e livello
const helpMessages = {
  home: {
    None: null,
    Contextual: 'Tocca le card per aprire le sezioni',
    Full: '💡 Questa è la schermata principale. Tocca le card per aprire Ricette, Visite, Profilo o SOS. Usa i pulsanti in basso per controllo vocale o dispositivi IoT.',
    Voice: '🎤 Dì "Apri ricette", "Mostra visite", "Vai al profilo" o "Chiama aiuto"',
  },
  ricette: {
    None: null,
    Contextual: 'Scorri per vedere tutte le ricette attive',
    Full: '💡 Qui trovi tutte le tue medicine. Ogni card mostra il nome del farmaco, il dosaggio e quando prenderlo.',
    Voice: '🎤 Dì "Quando prendo [nome farmaco]" per informazioni sul dosaggio',
  },
  visite: {
    None: null,
    Contextual: 'Prossimi appuntamenti programmati',
    Full: '💡 Visualizza tutti gli appuntamenti medici. Ogni card mostra medico, data, ora e luogo.',
    Voice: '🎤 Dì "Quando ho la prossima visita" per dettagli sull\'appuntamento',
  },
  profilo: {
    None: null,
    Contextual: 'I tuoi dati personali e clinici',
    Full: '💡 Il tuo profilo contiene dati personali, storia clinica, allergie, gruppo sanguigno e contatti di emergenza. Tocca "Impostazioni" per personalizzare l\'app.',
    Voice: '🎤 Dì "Quali sono le mie allergie" o "Mostra il mio profilo"',
  },
  sos: {
    None: null,
    Contextual: 'Numeri di emergenza rapidi',
    Full: '🆘 Usa questi pulsanti in caso di emergenza.',
    Voice: '🎤 Dì "Chiama emergenza", "Chiama dottore" o "Chiama famiglia"',
  },
};

export function HelpIndicator({ settings, screen }: HelpIndicatorProps) {
  const message = helpMessages[screen][settings.helpLevel];

  // Non mostrare niente se helpLevel è None o il messaggio non esiste
  if (!message) {
    return null;
  }

  const isVoice = settings.helpLevel === 'Voice';
  const isFull = settings.helpLevel === 'Full';
  const isContextual = settings.helpLevel === 'Contextual';

  // Colori uniformi per ogni livello di aiuto
  const getColors = () => {
    if (settings.colorMode === 'High Contrast') {
      return {
        bg: '#FFFF00',
        border: '#000000',
        text: '#000000',
      };
    }

    if (settings.colorMode === 'Dark') {
      return {
        bg: '#2a2a2a',
        border: isVoice ? '#14b8a6' : isFull ? '#2563eb' : '#f59e0b',
        text: '#F5F5F5',
      };
    }

    // Normal mode
    return {
      bg: isVoice ? '#f0fdfa' : isFull ? '#dbeafe' : '#fef3c7',
      border: isVoice ? '#14b8a6' : isFull ? '#2563eb' : '#f59e0b',
      text: isVoice ? '#0f766e' : isFull ? '#1e40af' : '#92400e',
    };
  };

  const colors = getColors();

  // Icona uniforme per ogni livello
  const Icon = isVoice ? Mic : isFull ? Lightbulb : MessageCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-lg p-3 flex items-start gap-3"
      style={{
        backgroundColor: colors.bg,
        border: `2px solid ${colors.border}`,
      }}
      role="status"
      aria-live="polite"
      aria-label={`Suggerimento di aiuto: ${message}`}
    >
      <Icon
        size={20}
        color={colors.text}
        style={{ flexShrink: 0, marginTop: '2px' }}
        aria-hidden="true"
      />
      <p
        style={{
          fontSize: settings.fontSize,
          fontWeight: isFull ? '550' : '400',
          color: colors.text,
          lineHeight: '1.5',
          margin: 0,
        }}
      >
        {message}
      </p>
    </motion.div>
  );
}