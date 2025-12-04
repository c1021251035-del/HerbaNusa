import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Calendar, CheckCircle, Truck, Package, Sprout, Camera, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';

interface ProductTraceabilityProps {
  product: any;
  onClose: () => void;
}

const traceabilityStories = [
  {
    id: 1,
    type: 'video',
    title: 'Salam dari Pak Budi',
    icon: Play,
    media: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBoYXJ2ZXN0aW5nJTIwb3JnYW5pY3xlbnwxfHx8fDE3NjA5Mzk5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Perkenalan langsung dari petani',
    timestamp: '2 hari lalu',
    isVideo: true,
  },
  {
    id: 2,
    type: 'location',
    title: 'Lokasi Kebun',
    icon: MapPin,
    media: 'https://images.unsplash.com/photo-1724568835094-44437e96db5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwdGVycmFjZXMlMjBpbmRvbmVzaWF8ZW58MXx8fHwxNzYwOTM5OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Desa Sumberejo, Yogyakarta',
    location: {
      lat: -7.7956,
      lng: 110.3695,
      address: 'Desa Sumberejo, Kec. Berbah, Sleman',
    },
    isVideo: false,
  },
  {
    id: 3,
    type: 'harvest',
    title: 'Masa Panen',
    icon: Sprout,
    media: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBoYXJ2ZXN0aW5nJTIwb3JnYW5pY3xlbnwxfHx8fDE3NjA5Mzk5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Dipanen 15 Oktober 2025',
    details: [
      'Usia tanaman: 8 bulan',
      'Kondisi: Optimal',
      'Cuaca: Cerah',
    ],
    isVideo: false,
  },
  {
    id: 4,
    type: 'processing',
    title: 'Proses Pengeringan',
    icon: Package,
    media: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBoYXJ2ZXN0aW5nJTIwb3JnYW5pY3xlbnwxfHx8fDE3NjA5Mzk5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Dikeringkan secara tradisional',
    details: [
      'Metode: Sun-dried',
      'Durasi: 3-4 hari',
      'Suhu: 25-30°C',
    ],
    isVideo: false,
  },
  {
    id: 5,
    type: 'certification',
    title: 'Sertifikasi Organik',
    icon: CheckCircle,
    media: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBoYXJ2ZXN0aW5nJTIwb3JnYW5pY3xlbnwxfHx8fDE3NjA5Mzk5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Bersertifikat organik resmi',
    certifications: [
      { name: 'Organik Indonesia', code: 'ID-BIO-XXX' },
      { name: 'HACCP', code: 'HCCP-2024' },
    ],
    isVideo: false,
  },
];

export function ProductTraceability({ product, onClose }: ProductTraceabilityProps) {
  const [currentStory, setCurrentStory] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (currentStory < traceabilityStories.length - 1) {
      setCurrentStory(currentStory + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1);
      setProgress(0);
    }
  };

  const story = traceabilityStories[currentStory];
  const StoryIcon = story.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 z-20 flex gap-1.5 p-3 pt-safe">
        {traceabilityStories.map((_, index) => (
          <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{
                width: index < currentStory ? '100%' : index === currentStory ? `${progress}%` : 0,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-8 pb-4 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-3 mt-3">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/90 flex-shrink-0">
            <ImageWithFallback
              src={product.farmer.photo}
              alt={product.farmer.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white truncate">{product.farmer.name}</p>
            <p className="text-xs text-white/70">{story.timestamp || 'Baru saja'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Navigation areas */}
      <div className="absolute inset-0 z-10 flex">
        <button onClick={handlePrevious} className="flex-1" disabled={currentStory === 0} />
        <button onClick={handleNext} className="flex-1" />
      </div>

      {/* Story content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStory}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full relative"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src={story.media}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end px-5 pb-32 pt-28">
            {/* Story icon & title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-3"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-full">
                <StoryIcon className="w-4 h-4 text-white" />
                <span className="text-white text-sm">{story.title}</span>
              </div>
            </motion.div>

            {/* Story description */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <h2 className="text-white text-xl leading-tight mb-3">{story.description}</h2>

              {/* Type-specific content */}
              {story.type === 'location' && story.location && (
                <div className="bg-white/15 backdrop-blur-lg rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm leading-snug">{story.location.address}</p>
                      <p className="text-white/60 text-xs mt-1">
                        {story.location.lat}, {story.location.lng}
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors">
                    Buka di Maps
                  </button>
                </div>
              )}

              {story.details && (
                <div className="bg-white/15 backdrop-blur-lg rounded-xl p-3.5 space-y-2">
                  {story.details.map((detail, index) => (
                    <p key={index} className="text-white text-sm leading-relaxed">
                      • {detail}
                    </p>
                  ))}
                </div>
              )}

              {story.certifications && (
                <div className="bg-white/15 backdrop-blur-lg rounded-xl p-3.5 space-y-3">
                  {story.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">{cert.name}</p>
                        <p className="text-white/60 text-xs mt-0.5">{cert.code}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {story.isVideo && (
                <div className="flex items-center justify-center mt-2">
                  <button className="w-14 h-14 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/35 transition-colors">
                    <Play className="w-7 h-7 text-white fill-white ml-0.5" />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Navigation hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-6 mt-6 text-white/50 text-xs"
            >
              {currentStory > 0 && (
                <div className="flex items-center gap-1">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Tap kiri</span>
                </div>
              )}
              {currentStory < traceabilityStories.length - 1 && (
                <div className="flex items-center gap-1">
                  <span>Tap kanan</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom product info */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-5 pt-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-3.5 flex items-center gap-3 border border-white/10">
          <div className="w-14 h-14 rounded-lg overflow-hidden border-2 border-white/20 flex-shrink-0">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm truncate mb-0.5">{product.name}</p>
            <p className="text-[#D4A574]">Rp {product.price.toLocaleString('id-ID')}</p>
          </div>
          <Badge className="bg-[#6B7F39] text-white border-0 flex-shrink-0 px-2.5 py-1">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}