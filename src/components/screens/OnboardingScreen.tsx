import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, Type, Palette, Layout, HelpCircle, Globe, Lock, User, Eye, EyeOff } from 'lucide-react';
import { AppSettings, Persona } from '../../App';

interface OnboardingScreenProps {
  onComplete: (persona: Persona, settings: AppSettings) => void;
  initialStep?: number;
}

export function OnboardingScreen({ onComplete, initialStep = 1 }: OnboardingScreenProps) {
  const [step, setStep] = useState(initialStep);
  const [selectedPersona, setSelectedPersona] = useState<Persona>('maria');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [previewSettings, setPreviewSettings] = useState<AppSettings>({
    fontSize: '16px',
    colorMode: 'Normal',
    complexity: 'Full',
    helpLevel: 'Contextual',
    language: 'Standard',
    timeout: '30min',
  });

  const totalSteps = 4;

  // Credenziali per le 3 personas
  const personas = [
    { 
      id: 'maria' as Persona, 
      name: 'Maria', 
      emoji: '👩‍🦳', 
      age: '75 anni',
      username: 'maria',
      password: 'maria123',
    },
    { 
      id: 'giorgio' as Persona, 
      name: 'Giorgio', 
      emoji: '👴', 
      age: '78 anni',
      username: 'giorgio',
      password: 'giorgio123',
    },
    { 
      id: 'angela' as Persona, 
      name: 'Angela', 
      emoji: '👵', 
      age: '82 anni',
      username: 'angela',
      password: 'angela123',
    },
  ];

  const handleLogin = () => {
    setLoginError('');
    
    // Verifica credenziali
    const persona = personas.find(
      p => p.username === username.toLowerCase() && p.password === password
    );

    if (persona) {
      setSelectedPersona(persona.id);
      setStep(3); // Vai direttamente allo step 3 dopo login
    } else {
      setLoginError('❌ Nome utente o password errati');
    }
  };

  const handleNext = () => {
    if (step === 2) {
      handleLogin();
    } else if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(selectedPersona, previewSettings);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSkip = () => {
    onComplete(selectedPersona, previewSettings);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step === 2) {
      handleLogin();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center justify-center h-full p-6"
          >
            <div className="text-6xl mb-6">👋</div>
            <h1 className="text-2xl font-bold text-[#003366] mb-4 text-center">
              Benvenuto nella tua<br/>App Salute
            </h1>
            <p className="text-lg text-gray-600 text-center mb-8 leading-relaxed">
              Configuriamo l'app insieme<br/>per renderla più comoda per te
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                💡 Bastano solo 3 passaggi veloci
              </p>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col h-full p-6 justify-center"
          >
            <div className="text-5xl mb-6 text-center">🔐</div>
            <h2 className="text-2xl font-bold text-[#003366] mb-2 text-center">
              Accedi
            </h2>
            <p className="text-sm text-gray-600 text-center mb-8">
              Inserisci le tue credenziali
            </p>
            
            {/* Form di Login */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="relative">
                <User size={20} className="absolute left-3 top-4 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="Nome utente"
                  className="w-full p-4 pl-10 text-base rounded-lg border-2 border-gray-300 focus:border-[#003366] focus:outline-none"
                />
              </div>
              
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="Password"
                  className="w-full p-4 pl-10 pr-10 text-base rounded-lg border-2 border-gray-300 focus:border-[#003366] focus:outline-none"
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 p-3 rounded"
                >
                  <p className="text-sm text-red-700">
                    {loginError}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Info Credenziali */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-sm text-blue-900 font-semibold mb-2">
                💡 Credenziali di esempio:
              </p>
              <div className="space-y-1 text-xs text-blue-800">
                {personas.map((p) => (
                  <p key={p.id}>
                    <span className="font-mono bg-white px-2 py-1 rounded">{p.username}</span>
                    {' / '}
                    <span className="font-mono bg-white px-2 py-1 rounded">{p.password}</span>
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col h-full p-6"
          >
            <h2 className="text-xl font-bold text-[#003366] mb-2 text-center">
              Come vuoi vedere il testo?
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Scegli la dimensione che preferisci
            </p>
            
            <div className="flex-1 flex flex-col gap-4 justify-center">
              {[
                { size: '14px' as const, label: 'Normale', desc: 'Testo standard' },
                { size: '16px' as const, label: 'Grande', desc: 'Consigliato ✨' },
                { size: '18px' as const, label: 'Molto Grande', desc: 'Più leggibile' },
              ].map((option) => (
                <motion.button
                  key={option.size}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPreviewSettings({ ...previewSettings, fontSize: option.size })}
                  className={`p-5 rounded-xl border-2 transition-all ${
                    previewSettings.fontSize === option.size
                      ? 'bg-[#003366] text-white shadow-lg'
                      : 'bg-white border-gray-300 hover:border-[#003366]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p style={{ fontSize: option.size, fontWeight: '600', marginBottom: '4px' }}>
                        {option.label}
                      </p>
                      <p className={`text-xs ${previewSettings.fontSize === option.size ? 'text-blue-200' : 'text-gray-500'}`}>
                        {option.desc}
                      </p>
                    </div>
                    {previewSettings.fontSize === option.size && (
                      <Check size={24} color="#FFFFFF" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <p style={{ fontSize: previewSettings.fontSize, color: '#1e40af' }}>
                📖 Questo è un esempio di testo con la dimensione selezionata
              </p>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col h-full p-6"
          >
            <h2 className="text-xl font-bold text-[#003366] mb-2 text-center">
              Quante informazioni vuoi vedere?
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Scegli il livello di dettaglio
            </p>
            
            <div className="flex-1 flex flex-col gap-4 justify-center">
              {[
                { level: 'Simple' as const, icon: '🔲', label: 'Semplice', desc: 'Solo le cose importanti' },
                { level: 'Medium' as const, icon: '🔳', label: 'Medio', desc: 'Un buon equilibrio' },
                { level: 'Full' as const, icon: '📊', label: 'Completo', desc: 'Tutti i dettagli' },
              ].map((option) => (
                <motion.button
                  key={option.level}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPreviewSettings({ ...previewSettings, complexity: option.level })}
                  className={`p-5 rounded-xl border-2 transition-all ${
                    previewSettings.complexity === option.level
                      ? 'bg-[#003366] text-white shadow-lg'
                      : 'bg-white border-gray-300 hover:border-[#003366]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{option.icon}</div>
                    <div className="text-left flex-1">
                      <p className="text-lg font-bold">{option.label}</p>
                      <p className={`text-sm ${previewSettings.complexity === option.level ? 'text-blue-200' : 'text-gray-500'}`}>
                        {option.desc}
                      </p>
                    </div>
                    {previewSettings.complexity === option.level && (
                      <Check size={24} color="#FFFFFF" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-3 rounded">
              <p className="text-sm text-green-900">
                ✅ Potrai cambiare queste impostazioni in qualsiasi momento
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Progress Bar */}
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Passo {step} di {totalSteps}</span>
          <button 
            onClick={handleSkip}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Salta →
          </button>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <motion.div
            className="bg-[#003366] h-2 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-3">
          {step > 1 && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleBack}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ChevronLeft size={20} />
              Indietro
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="flex-1 bg-[#003366] hover:bg-[#004488] text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            style={{ fontSize: '16px' }}
          >
            {step === totalSteps ? (
              <>
                <Check size={20} />
                Inizia
              </>
            ) : (
              <>
                Avanti
                <ChevronRight size={20} />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}