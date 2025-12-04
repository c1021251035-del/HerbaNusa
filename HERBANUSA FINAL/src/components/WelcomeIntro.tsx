import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Heart, Users, Sparkles, ShoppingBag, Star } from "lucide-react";

interface WelcomeIntroProps {
  onComplete: () => void;
}

export function WelcomeIntro({ onComplete }: WelcomeIntroProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 3) {
        setStep(step + 1);
      } else {
        onComplete();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  const slides = [
    {
      icon: Leaf,
      title: "HerbaNusa",
      subtitle: "Herbal Nusantara untuk Generasi Modern",
      description: "Menghubungkan kearifan lokal dengan gaya hidup sehat masa kini",
      gradient: "from-[#6B7F39] to-[#8FA64D]",
      image: "https://images.unsplash.com/photo-1681476193060-ebf1683bb56b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRvbmVzaWFuJTIwcmljZSUyMGZpZWxkJTIwZ3JlZW4lMjB0ZXJyYWNlc3xlbnwxfHx8fDE3NjQ2NjA2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      accentColor: "#6B7F39",
    },
    {
      icon: Users,
      title: "Langsung dari Petani",
      subtitle: "Produk Asli, Harga Adil",
      description: "Dukung petani lokal sambil mendapatkan herbal berkualitas tinggi",
      gradient: "from-[#C8553D] to-[#E07856]",
      image: "https://images.unsplash.com/photo-1761591494058-423647c5ed16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRvbmVzaWFuJTIwZmFybWVyJTIwaGFydmVzdGluZ3xlbnwxfHx8fDE3NjQ2NjA2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      accentColor: "#C8553D",
    },
    {
      icon: Heart,
      title: "Sehat Alami",
      subtitle: "Tanpa Pestisida, Organik 100%",
      description: "Herbal pilihan dengan kualitas terjamin untuk kesehatan optimal",
      gradient: "from-[#D4A574] to-[#E8C9A0]",
      image: "https://images.unsplash.com/photo-1712342163473-defcc24350ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBwbGFudHMlMjBnYXJkZW4lMjBuYXR1cmV8ZW58MXx8fHwxNzY0NjYwNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      accentColor: "#D4A574",
    },
    {
      icon: Sparkles,
      title: "Siap Mulai?",
      subtitle: "Jelajahi 34+ Herbal Indonesia",
      description: "Temukan ramuan terbaik untuk gaya hidup sehat Anda",
      gradient: "from-[#6B7F39] via-[#C8553D] to-[#D4A574]",
      image: "https://images.unsplash.com/photo-1681476193060-ebf1683bb56b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRvbmVzaWFuJTIwcmljZSUyMGZpZWxkJTIwZ3JlZW4lMjB0ZXJyYWNlc3xlbnwxfHx8fDE3NjQ2NjA2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      accentColor: "#6B7F39",
    },
  ];

  const currentSlide = slides[step];
  const Icon = currentSlide.icon;

  // Floating particles animation
  const particles = [...Array(12)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    duration: Math.random() * 3 + 3,
  }));

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8F3] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full flex flex-col relative"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "linear" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentSlide.image})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-b ${currentSlide.gradient} opacity-92`} />
            
            {/* Animated Gradient Overlay */}
            <motion.div
              animate={{
                background: [
                  `radial-gradient(circle at 20% 50%, ${currentSlide.accentColor}30 0%, transparent 50%)`,
                  `radial-gradient(circle at 80% 50%, ${currentSlide.accentColor}30 0%, transparent 50%)`,
                  `radial-gradient(circle at 20% 50%, ${currentSlide.accentColor}30 0%, transparent 50%)`,
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  x: `${particle.x}%`,
                  y: `${particle.y}%`,
                  opacity: 0,
                }}
                animate={{
                  y: [`${particle.y}%`, `${particle.y - 40}%`],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.id * 0.3,
                }}
                className="absolute bg-white rounded-full blur-sm"
                style={{
                  width: particle.size,
                  height: particle.size,
                }}
              />
            ))}
          </div>

          {/* Safe Area Container - Prevents content from touching edges */}
          <div className="relative h-full flex flex-col max-w-md mx-auto w-full">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-12 pb-6 px-6 flex justify-center"
            >
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/25 shadow-lg">
                <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                <span className="text-white text-xs">100% Organik Tersertifikasi</span>
              </div>
            </motion.div>

            {/* Main Content Area - Centered */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
              
              {/* Icon Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                  delay: 0.2,
                }}
                className="mb-6 relative"
              >
                {/* Outer Pulse Ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-6 bg-white/25 rounded-full blur-md"
                />
                
                {/* Inner Pulse Ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                  className="absolute -inset-4 bg-white/30 rounded-full blur-sm"
                />
                
                {/* Icon Container */}
                <div className="relative bg-white/20 backdrop-blur-lg p-6 rounded-[28px] border-2 border-white/40 shadow-2xl">
                  <motion.div
                    animate={{ 
                      rotate: [0, 3, -3, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon className="w-16 h-16 text-white" strokeWidth={1.8} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Content with Perfect Spacing */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-3 max-w-sm"
              >
                {/* Main Title */}
                <motion.div
                  animate={{ scale: [1, 1.01, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <h1 className="text-white drop-shadow-2xl text-4xl leading-tight">
                    {currentSlide.title}
                  </h1>
                </motion.div>
                
                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl text-white/95 drop-shadow-lg leading-snug px-2"
                >
                  {currentSlide.subtitle}
                </motion.p>
                
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-white/80 drop-shadow-md leading-relaxed px-4 pt-1"
                >
                  {currentSlide.description}
                </motion.p>
              </motion.div>

              {/* Stats Display for Last Slide */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-8 flex items-center justify-center gap-8"
                >
                  <div className="text-center">
                    <div className="text-white mb-0.5 text-3xl">34+</div>
                    <div className="text-white/75 text-xs">Produk Herbal</div>
                  </div>
                  
                  <div className="w-px h-12 bg-white/25" />
                  
                  <div className="text-center">
                    <div className="text-white mb-0.5 text-3xl">8</div>
                    <div className="text-white/75 text-xs">Kategori</div>
                  </div>
                  
                  <div className="w-px h-12 bg-white/25" />
                  
                  <div className="text-center">
                    <div className="text-white mb-0.5 text-3xl">100%</div>
                    <div className="text-white/75 text-xs">Organik</div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom Controls - Fixed spacing from bottom */}
            <div className="pb-8 pt-6 px-6">
              {/* Progress Dots */}
              <div className="flex justify-center gap-2.5 mb-5">
                {slides.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: index === step ? 1 : 0.8,
                      opacity: index === step ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`h-2 rounded-full transition-all duration-400 ${
                      index === step
                        ? "w-8 bg-white shadow-lg shadow-white/40"
                        : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              {step === 3 ? (
                <motion.button
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  onClick={onComplete}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-white text-[#6B7F39] py-3.5 rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2.5"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-[15px]">Mulai Belanja Sekarang</span>
                </motion.button>
              ) : (
                <motion.button
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={onComplete}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-white/15 backdrop-blur-lg text-white py-3.5 rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300 text-[15px]"
                >
                  Lewati Intro
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Auto Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <motion.div
          key={step}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
          className="h-full bg-white shadow-md shadow-white/30"
        />
      </div>
    </div>
  );
}
