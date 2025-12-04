import { ArrowLeft, Search, Heart, Bookmark, Clock, TrendingUp, Grid2x2, Flame, ChefHat, Play, Share2, Timer, Award, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface RecipeInspirationProps {
  onNavigate: (page: string) => void;
}

const recipes = [
  {
    id: '1',
    title: 'Golden Turmeric Latte',
    image: 'https://images.unsplash.com/photo-1758221052535-8119e3a816b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBicmV3aW5nfGVufDF8fHx8MTc2MDkzOTkyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    time: '10 menit',
    difficulty: 'Mudah',
    category: 'Minuman',
    likes: 245,
    saves: 89,
    ingredients: ['Kunyit bubuk', 'Susu almond', 'Madu', 'Kayu manis'],
    benefits: 'Boost imunitas & anti-inflamasi',
    trending: true,
    video: true,
  },
  {
    id: '2',
    title: 'Smoothie Bowl Kelor',
    image: 'https://images.unsplash.com/photo-1662302039400-0f2090ddc993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc21vb3RoaWUlMjByZWNpcGV8ZW58MXx8fHwxNzYwOTM5OTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    time: '15 menit',
    difficulty: 'Mudah',
    category: 'Sarapan',
    likes: 312,
    saves: 156,
    ingredients: ['Daun kelor', 'Pisang', 'Yogurt', 'Granola'],
    benefits: 'Energi sepanjang hari',
    trending: true,
    video: false,
  },
  {
    id: '3',
    title: 'Wedang Jahe Tradisional',
    image: 'https://images.unsplash.com/photo-1630247019300-e8a9498b831b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGhlcmJhbCUyMGRyaW5rfGVufDF8fHx8MTc2MDkzOTkyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    time: '20 menit',
    difficulty: 'Mudah',
    category: 'Minuman',
    likes: 189,
    saves: 67,
    ingredients: ['Jahe merah', 'Serai', 'Gula aren', 'Jeruk nipis'],
    benefits: 'Hangatkan tubuh & tingkatkan stamina',
    trending: false,
    video: true,
  },
  {
    id: '4',
    title: 'Detox Water Pegagan',
    image: 'https://images.unsplash.com/photo-1758221052535-8119e3a816b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBicmV3aW5nfGVufDF8fHx8MTc2MDkzOTkyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    time: '5 menit',
    difficulty: 'Sangat Mudah',
    category: 'Minuman',
    likes: 156,
    saves: 92,
    ingredients: ['Pegagan kering', 'Lemon', 'Mint', 'Air kelapa'],
    benefits: 'Detox & jernih pikiran',
    trending: false,
    video: false,
  },
  {
    id: '5',
    title: 'Jamu Kunyit Asam',
    image: 'https://images.unsplash.com/photo-1630247019300-e8a9498b831b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGhlcmJhbCUyMGRyaW5rfGVufDF8fHx8MTc2MDkzOTkyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    time: '25 menit',
    difficulty: 'Sedang',
    category: 'Jamu',
    likes: 278,
    saves: 134,
    ingredients: ['Kunyit', 'Asam jawa', 'Gula merah', 'Garam'],
    benefits: 'Melancarkan haid & detox',
    trending: true,
    video: true,
  },
  {
    id: '6',
    title: 'Salad Sambung Nyawa',
    image: 'https://images.unsplash.com/photo-1662302039400-0f2090ddc993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc21vb3RoaWUlMjByZWNpcGV8ZW58MXx8fHwxNzYwOTM5OTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    time: '12 menit',
    difficulty: 'Mudah',
    category: 'Makanan',
    likes: 198,
    saves: 76,
    ingredients: ['Sambung nyawa', 'Cherry tomato', 'Alpukat', 'Balsamic'],
    benefits: 'Turunkan kolesterol',
    trending: false,
    video: false,
  },
];

export function RecipeInspiration({ onNavigate }: RecipeInspirationProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedRecipes, setSavedRecipes] = useState<Set<string>>(new Set());
  const [likedRecipes, setLikedRecipes] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    const newSaved = new Set(savedRecipes);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedRecipes(newSaved);
  };

  const toggleLike = (id: string) => {
    const newLiked = new Set(likedRecipes);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedRecipes(newLiked);
  };

  const filteredRecipes = selectedCategory === 'all' 
    ? recipes 
    : recipes.filter(r => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF0E6] to-white pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#D4A574] to-[#F0C674] text-white sticky top-0 z-40 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => onNavigate('home')} className="p-1">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="flex items-center gap-2">
                <ChefHat className="w-6 h-6" />
                Resep & Inspirasi
              </h1>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['all', 'Minuman', 'Sarapan', 'Jamu', 'Makanan'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-white text-[#C8553D] shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {cat === 'all' && <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />}
                {cat === 'all' ? 'Semua' : cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Trending banner */}
      <div className="px-4 py-4 bg-gradient-to-r from-[#F5F1E8] to-[#FAF0E6] border-y border-[#D4C5B0]">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-5 h-5 text-[#C8553D]" strokeWidth={2} />
          <p className="text-[#6B7F39]">Trending Minggu Ini</p>
        </div>
        <p className="text-sm text-[#8B5A3C]">
          Golden Turmeric Latte & Smoothie Bowl Kelor lagi hits banget!
        </p>
      </div>

      {/* Recipes Grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <ImageWithFallback
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay badges */}
                  <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                    {recipe.trending && (
                      <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0 flex items-center gap-1">
                        <Flame className="w-3 h-3" strokeWidth={2.5} />
                        Trending
                      </Badge>
                    )}
                    <div className="flex-1" />
                    {recipe.video && (
                      <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                      </div>
                    )}
                  </div>

                  {/* Quick info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <div className="flex items-center gap-2 text-white text-xs mb-1">
                      <Clock className="w-3 h-3" />
                      <span>{recipe.time}</span>
                      <span>•</span>
                      <Flame className="w-3 h-3" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="mb-2 text-stone-800 line-clamp-2 leading-snug">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Heart className="w-3 h-3 text-emerald-700 fill-emerald-700" strokeWidth={2} />
                    <p className="text-xs text-emerald-700 line-clamp-1">
                      {recipe.benefits}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <motion.button
                      onClick={() => toggleLike(recipe.id)}
                      className="flex items-center gap-1 hover:text-pink-600 transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedRecipes.has(recipe.id) ? 'fill-pink-500 text-pink-500' : ''
                        }`}
                      />
                      <span>{recipe.likes + (likedRecipes.has(recipe.id) ? 1 : 0)}</span>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => toggleSave(recipe.id)}
                      className="p-1.5 hover:bg-amber-100 rounded-full transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          savedRecipes.has(recipe.id) ? 'fill-amber-600 text-amber-600' : 'text-stone-600'
                        }`}
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            Lihat Lebih Banyak Resep
          </Button>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 shadow-lg">
        <p className="text-xs text-center text-stone-600 mb-2">
          Punya resep herbal favoritmu?
        </p>
        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <Share2 className="w-4 h-4 mr-2" />
          Bagikan Resepmu
        </Button>
      </div>
    </div>
  );
}