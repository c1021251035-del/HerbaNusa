import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Zap, Brain, ArrowRight, X, Waves, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OnboardingQuizProps {
  onComplete: (recommendations: any[]) => void;
  onSkip: () => void;
}

const quizQuestions = [
  {
    id: 1,
    question: 'Bagaimana rutinitas harianmu?',
    options: [
      { id: 'active', label: 'Super aktif & penuh energi', icon: Zap, type: 'energy' },
      { id: 'creative', label: 'Kreatif & fokus kerja', icon: Brain, type: 'focus' },
      { id: 'chill', label: 'Santai & butuh ketenangan', icon: Heart, type: 'relaxation' },
    ],
  },
  {
    id: 2,
    question: 'Apa prioritas kesehatanmu saat ini?',
    options: [
      { id: 'immunity', label: 'Jaga imunitas maksimal', icon: Shield, type: 'immunity' },
      { id: 'energy', label: 'Boost stamina & vitalitas', icon: Zap, type: 'energy' },
      { id: 'digestion', label: 'Pencernaan sehat', icon: Waves, type: 'digestion' },
    ],
  },
  {
    id: 3,
    question: 'Kapan kamu paling suka konsumsi herbal?',
    options: [
      { id: 'morning', label: 'Pagi - untuk memulai hari', icon: Sparkles, time: 'morning' },
      { id: 'afternoon', label: 'Siang - saat butuh boost', icon: Zap, time: 'afternoon' },
      { id: 'evening', label: 'Malam - untuk relaksasi', icon: Heart, time: 'evening' },
    ],
  },
];

const recommendations = {
  energy: [
    { category: 'energy', personality: 'Si Penuh Energi', tagline: 'Kamu butuh stamina ekstra!' },
  ],
  focus: [
    { category: 'immunity', personality: 'Si Kreatif', tagline: 'Jaga fokus & imunitasmu!' },
  ],
  relaxation: [
    { category: 'digestion', personality: 'Si Paling Zen', tagline: 'Santai tapi tetap sehat!' },
  ],
};

export function OnboardingQuiz({ onComplete, onSkip }: OnboardingQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleAnswer = (optionId: string) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setIsCompleting(true);
      setTimeout(() => {
        // Determine personality based on answers
        let personality = 'energy';
        if (newAnswers.includes('creative')) personality = 'focus';
        if (newAnswers.includes('chill')) personality = 'relaxation';
        
        onComplete(recommendations[personality as keyof typeof recommendations]);
      }, 1500);
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#F5F1E8] via-white to-[#FAF0E6] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#D4A574]/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#7C8F4F]/30 rounded-full blur-3xl opacity-40" />
      
      {/* Header */}
      <div className="relative z-10 px-6 pt-8">
        <button
          onClick={onSkip}
          className="absolute top-8 right-6 p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-stone-600" />
        </button>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#6B7F39] to-[#7C8F4F]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-center text-sm text-stone-600 mt-2">
            Pertanyaan {currentQuestion + 1} dari {quizQuestions.length}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pt-12 pb-20 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {!isCompleting ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon decoration */}
              <motion.div
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#6B7F39] to-[#7C8F4F] rounded-3xl flex items-center justify-center shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.6 }}
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-center mb-8 text-stone-800">
                {quizQuestions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {quizQuestions[currentQuestion].options.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      className="w-full p-5 bg-white border-2 border-[#D4C5B0] rounded-2xl hover:border-[#7C8F4F] hover:bg-[#F5F1E8] transition-all text-left group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F5F1E8] rounded-xl flex items-center justify-center group-hover:bg-[#D4A574]/20 transition-colors">
                          <Icon className="w-6 h-6 text-[#6B7F39]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-stone-800">{option.label}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-[#7C8F4F] transition-colors" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="completing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#6B7F39] to-[#7C8F4F] rounded-full flex items-center justify-center"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' },
                }}
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-stone-800 mb-2">Meracik rekomendasi...</h2>
              <p className="text-stone-600">Sebentar ya, lagi cari yang cocok buat kamu!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative leaves */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 Q 30 40 50 70 Q 70 40 50 10' fill='%236B7F39'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '50px',
        }}
        animate={{
          backgroundPositionX: ['0px', '100px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}