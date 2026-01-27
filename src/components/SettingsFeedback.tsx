import { motion, AnimatePresence } from 'motion/react';
import { Type, Palette, Layout, HelpCircle, Globe, Clock, Check } from 'lucide-react';

interface SettingsFeedbackProps {
  setting: string;
  value: string;
  onClose: () => void;
}

export function SettingsFeedback({ setting, value, onClose }: SettingsFeedbackProps) {
  const icons = {
    fontSize: Type,
    colorMode: Palette,
    complexity: Layout,
    helpLevel: HelpCircle,
    language: Globe,
    timeout: Clock,
  };

  const Icon = icons[setting as keyof typeof icons] || Check;

  const animations = {
    fontSize: {
      initial: { scale: 0.5, opacity: 0 },
      animate: { scale: [0.5, 1.2, 1], opacity: 1 },
      exit: { scale: 0.5, opacity: 0 },
    },
    colorMode: {
      initial: { opacity: 0, rotate: -180 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: 180 },
    },
    complexity: {
      initial: { y: -50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 50, opacity: 0 },
    },
    helpLevel: {
      initial: { scale: 0, rotate: -90 },
      animate: { scale: 1, rotate: 0 },
      exit: { scale: 0, rotate: 90 },
    },
    language: {
      initial: { x: -100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 100, opacity: 0 },
    },
    timeout: {
      initial: { scale: 0, opacity: 0, rotate: 0 },
      animate: { scale: 1, opacity: 1, rotate: 360 },
      exit: { scale: 0, opacity: 0 },
    },
  };

  const animation = animations[setting as keyof typeof animations] || animations.fontSize;

  // Auto-close dopo 2 secondi
  setTimeout(() => {
    onClose();
  }, 2000);

  return (
    <motion.div
      className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#003366] text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3"
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      style={{
        minWidth: '200px',
      }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={24} color="#FFFFFF" />
      </motion.div>
      <div>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>Modificato</p>
        <p style={{ fontSize: '14px', fontWeight: '600' }}>{value}</p>
      </div>
    </motion.div>
  );
}