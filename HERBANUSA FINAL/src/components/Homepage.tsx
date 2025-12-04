import { ShoppingCart, Leaf, Search, User, Play, Sparkles, TrendingUp, ChefHat, Shield, Waves, Zap, UserRound, CheckCircle, Truck, Heart, MapPin, Star, Eye, ChevronRight, BookOpen, Users, Wind, Activity, Droplets, HeartPulse } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockProducts } from './mockData';
import { OnboardingQuiz } from './OnboardingQuiz';

interface HomepageProps {
  onNavigate: (page: string) => void;
  onProductClick: (product: any) => void;
  onCategoryClick: (category: string) => void;
  cartItemCount: number;
}

// Mock video reels data
const videoReels = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    title: 'Panen Kunyit Organik',
    duration: '0:30',
    views: '12K',
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1630247019300-e8a9498b831b?w=400',
    title: 'Cara Buat Jamu',
    duration: '0:45',
    views: '8.5K',
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1662302039400-0f2090ddc993?w=400',
    title: 'Tips Minum Herbal',
    duration: '0:25',
    views: '15K',
  },
];

export function Homepage({ onNavigate, onProductClick, onCategoryClick, cartItemCount }: HomepageProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  
  const categories = [
    { id: 'immunity', name: 'Untuk Imunitas', icon: Shield, color: 'from-[#6B7F39] to-[#7C8F4F]', bgColor: 'bg-[#6B7F39]/10' },
    { id: 'digestion', name: 'Untuk Pencernaan', icon: Waves, color: 'from-[#7C8F4F] to-[#8B9B5F]', bgColor: 'bg-[#7C8F4F]/10' },
    { id: 'energy', name: 'Untuk Stamina', icon: Zap, color: 'from-[#D4A574] to-[#F0C674]', bgColor: 'bg-[#D4A574]/10' },
    { id: 'beauty', name: 'Untuk Kecantikan', icon: UserRound, color: 'from-[#E07856] to-[#F0A574]', bgColor: 'bg-[#E07856]/10' },
    { id: 'relaxation', name: 'Untuk Relaksasi', icon: Heart, color: 'from-[#A8B77C] to-[#C5D9A4]', bgColor: 'bg-[#A8B77C]/10' },
    { id: 'respiratory', name: 'Untuk Pernapasan', icon: Wind, color: 'from-[#7CB8B0] to-[#9DD4C8]', bgColor: 'bg-[#7CB8B0]/10' },
    { id: 'pain_relief', name: 'Pereda Nyeri', icon: Activity, color: 'from-[#C85D5D] to-[#E88787]', bgColor: 'bg-[#C85D5D]/10' },
    { id: 'diabetes', name: 'Untuk Diabetes', icon: Droplets, color: 'from-[#8E7AB5] to-[#B0A0D4]', bgColor: 'bg-[#8E7AB5]/10' },
  ];

  const featuredProducts = mockProducts.slice(0, 4);

  const handleQuizComplete = (recommendations: any[]) => {
    setShowQuiz(false);
    // Navigate to recommended products
    if (recommendations && recommendations[0]) {
      onCategoryClick(recommendations[0].category);
    }
  };

  if (showQuiz) {
    return <OnboardingQuiz onComplete={handleQuizComplete} onSkip={() => setShowQuiz(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#6B7F39] to-[#7C8F4F] text-white sticky top-0 z-50 shadow-md">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Leaf className="w-8 h-8" />
              </motion.div>
              <div>
                <h1 className="text-xl">HerbaNusa</h1>
                <p className="text-xs opacity-90">Herbal Asli Nusantara</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('cart')}
                className="relative p-2"
                aria-label="Keranjang Belanja"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-[#C8553D] text-white px-1.5 min-w-[20px] h-5 flex items-center justify-center">
                    {cartItemCount}
                  </Badge>
                )}
              </button>
              <div className="h-8 w-px bg-white/30"></div>
              <button
                onClick={() => onNavigate('login')}
                className="p-2"
                aria-label="Login"
              >
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7F39]" />
            <Input
              placeholder="Cari produk herbal..."
              className="pl-10 bg-white border-0"
              onClick={() => onNavigate('catalog')}
            />
          </div>
        </div>
      </header>

      {/* Quiz Banner - Fun & Interactive */}
      <motion.div
        className="bg-gradient-to-r from-[#8B5A3C] via-[#C8553D] to-[#D4A574] text-white mx-4 my-4 rounded-2xl p-5 cursor-pointer shadow-lg"
        onClick={() => setShowQuiz(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          <div className="flex-1">
            <h3 className="mb-1">Temukan Herbalmu!</h3>
            <p className="text-sm opacity-90">Quiz singkat untuk rekomendasi personal</p>
          </div>
          <ChevronRight className="w-6 h-6" />
        </div>
      </motion.div>

      {/* Video Reels Section */}
      <section className="px-4 py-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="flex items-center gap-2">
            <Play className="w-5 h-5 text-[#6B7F39]" />
            Konten Populer
          </h3>
          <Badge className="bg-gradient-to-r from-[#C8553D] to-[#D4A574] text-white border-0">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </Badge>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {videoReels.map((reel, index) => (
            <motion.button
              key={reel.id}
              className="flex-shrink-0 w-32 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="aspect-[9/16] rounded-2xl overflow-hidden relative bg-[#EBE3D5] border-2 border-[#D4C5B0] group-hover:border-[#7C8F4F] transition-colors">
                <ImageWithFallback
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
                
                {/* Info */}
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs mb-1 line-clamp-2">{reel.title}</p>
                  <div className="flex items-center justify-between text-white/80 text-[10px]">
                    <span>{reel.duration}</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{reel.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-6 bg-white border-t border-[#EBE3D5]">
        <div className="mb-4">
          <h3 className="inline-block text-stone-900 bg-gradient-to-r from-[#6B7F39]/10 to-[#7C8F4F]/10 px-3 py-1.5 rounded-lg border-l-4 border-[#6B7F39]">
            Kategori Produk
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className="bg-white border-2 border-[#D4C5B0] rounded-2xl p-5 hover:border-[#7C8F4F] hover:shadow-lg transition-all active:scale-95 overflow-hidden relative flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 hover:opacity-5 transition-opacity`}></div>
                
                {/* Icon container with gradient background */}
                <div className="relative mb-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-md`}>
                    <IconComponent className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                
                {/* Text with better contrast and centered */}
                <p className="relative text-sm text-stone-800 font-semibold text-center">
                  {category.name}
                </p>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="inline-block text-stone-900 bg-gradient-to-r from-[#C8553D]/10 to-[#E07856]/10 px-3 py-1.5 rounded-lg border-l-4 border-[#C8553D]">
              Produk Unggulan
            </h3>
          </div>
          <Button
            variant="ghost"
            onClick={() => onNavigate('catalog')}
            className="text-[#6B7F39] hover:text-[#7C8F4F]"
          >
            Lihat Semua
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map((product, index) => (
            <motion.button
              key={product.id}
              onClick={() => onProductClick(product)}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#EBE3D5] hover:shadow-md transition-all active:scale-95 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] relative bg-[#F5F1E8]">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-[#6B7F39] text-white flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" strokeWidth={2} />
                  {product.rating}
                </Badge>
              </div>
              <div className="p-3">
                <p className="mb-1 text-[#6B7F39] line-clamp-2">{product.name}</p>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8B5A3C]" strokeWidth={2} />
                  <p className="text-xs text-stone-600">{product.farmer.location}</p>
                </div>
                <p className="text-[#C8553D]">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Recipe CTA */}
      <motion.div
        className="mx-4 my-6 bg-gradient-to-br from-[#D4A574] to-[#F0C674] rounded-2xl p-5 text-white cursor-pointer shadow-lg"
        onClick={() => onNavigate('recipes')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <ChefHat className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1">Resep & Inspirasi</h3>
            <p className="text-sm opacity-90">100+ resep herbal untuk kesehatan</p>
          </div>
          <ChevronRight className="w-6 h-6" />
        </div>
      </motion.div>

      {/* Trust Badges */}
      <section className="px-4 py-6 bg-white">
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            className="bg-white border-2 border-[#D4C5B0] rounded-2xl p-4 hover:border-[#6B7F39] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -3 }}
          >
            <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-[#6B7F39] to-[#7C8F4F] rounded-xl flex items-center justify-center shadow-md">
              <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <p className="text-xs text-stone-800 leading-relaxed">
              Produk Terverifikasi
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white border-2 border-[#D4C5B0] rounded-2xl p-4 hover:border-[#D4A574] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -3 }}
          >
            <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-[#D4A574] to-[#F0C674] rounded-xl flex items-center justify-center shadow-md">
              <Truck className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <p className="text-xs text-stone-800 leading-relaxed">
              Pengiriman Aman
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white border-2 border-[#D4C5B0] rounded-2xl p-4 hover:border-[#C8553D] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -3 }}
          >
            <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-[#C8553D] to-[#E07856] rounded-xl flex items-center justify-center shadow-md">
              <Heart className="w-6 h-6 text-white fill-white" strokeWidth={2.5} />
            </div>
            <p className="text-xs text-stone-800 leading-relaxed">
              Langsung dari Petani
            </p>
          </motion.div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="px-4 py-6 bg-[#F5F1E8]">
        <h3 className="mb-3">Pelajari Lebih Lanjut</h3>
        <div className="space-y-3">
          <motion.div
            className="bg-white rounded-xl p-4 border border-[#D4C5B0] flex items-start gap-3"
            whileHover={{ x: 5 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B7F39] to-[#7C8F4F] flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h4 className="mb-1">Panduan Herbal</h4>
              <p className="text-sm text-stone-600">
                Pelajari manfaat dan cara penggunaan tanaman obat tradisional
              </p>
            </div>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl p-4 border border-[#D4C5B0] flex items-start gap-3"
            whileHover={{ x: 5 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A574] to-[#F0C674] flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h4 className="mb-1">Kenali Petani Kami</h4>
              <p className="text-sm text-stone-600">
                Cerita dari para petani herbal di seluruh Indonesia
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Padding */}
      <div className="h-6"></div>
    </div>
  );
}