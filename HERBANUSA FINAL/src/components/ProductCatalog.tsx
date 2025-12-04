import { ArrowLeft, SlidersHorizontal, Search, MapPin, Star, ShoppingCart, Package, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Slider } from './ui/slider';
import { mockProducts } from './mockData';

interface ProductCatalogProps {
  onNavigate: (page: string) => void;
  onProductClick: (product: any) => void;
  category: string;
  cartItemCount: number;
}

export function ProductCatalog({ onNavigate, onProductClick, category, cartItemCount }: ProductCatalogProps) {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  const locations = ['all', 'Jakarta', 'Yogyakarta', 'Bandung', 'Surabaya', 'Malang'];
  
  const categoryNames: Record<string, string> = {
    all: 'Semua Produk',
    immunity: 'Untuk Imunitas',
    digestion: 'Untuk Pencernaan',
    energy: 'Untuk Stamina',
    beauty: 'Untuk Kecantikan',
    relaxation: 'Untuk Relaksasi',
    respiratory: 'Untuk Pernapasan',
    pain_relief: 'Pereda Nyeri',
    diabetes: 'Untuk Diabetes',
  };

  const filteredProducts = mockProducts.filter(product => {
    if (category !== 'all' && product.category !== category) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedLocation !== 'all' && !product.farmer.location.includes(selectedLocation)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F3] to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#6B7F39] to-[#7C8F4F] text-white sticky top-0 z-50 shadow-lg">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg leading-tight">{categoryNames[category] || 'Katalog Produk'}</h1>
            <p className="text-xs opacity-90">{filteredProducts.length} produk tersedia</p>
          </div>
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
        </div>
      </header>

      {/* Filter & Sort Bar */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex-1 border-emerald-300">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filter Produk</SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              {/* Price Range */}
              <div>
                <label className="block mb-3">Kisaran Harga</label>
                <Slider
                  min={0}
                  max={100000}
                  step={5000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-stone-600">
                  <span>Rp {priceRange[0].toLocaleString('id-ID')}</span>
                  <span>Rp {priceRange[1].toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block mb-3">Lokasi Petani</label>
                <div className="grid grid-cols-2 gap-2">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedLocation === loc
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                          : 'bg-white border-stone-200 text-stone-700'
                      }`}
                    >
                      {loc === 'all' ? 'Semua Lokasi' : loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block mb-3">Urutkan</label>
                <div className="space-y-2">
                  {[
                    { id: 'popular', label: 'Paling Populer' },
                    { id: 'price-low', label: 'Harga Terendah' },
                    { id: 'price-high', label: 'Harga Tertinggi' },
                    { id: 'rating', label: 'Rating Tertinggi' },
                  ].map((sort) => (
                    <button
                      key={sort.id}
                      onClick={() => setSortBy(sort.id)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-left ${
                        sortBy === sort.id
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                          : 'bg-white border-stone-200 text-stone-700'
                      }`}
                    >
                      {sort.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Button
          variant="outline"
          className="px-4 border-emerald-300"
          onClick={() => {
            setPriceRange([0, 100000]);
            setSelectedLocation('all');
            setSortBy('popular');
          }}
        >
          Reset
        </Button>
      </div>

      {/* Products Grid */}
      <div className="p-4 pb-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-stone-300 mb-4" />
            <p className="text-stone-600">Tidak ada produk yang sesuai filter</p>
            <Button
              onClick={() => {
                setPriceRange([0, 100000]);
                setSelectedLocation('all');
              }}
              className="mt-4 bg-emerald-700"
            >
              Reset Filter
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => onProductClick(product)}
                  className="w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all text-left"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay badges */}
                    <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                      {product.rating >= 4.5 && (
                        <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                          Populer
                        </Badge>
                      )}
                      <div className="flex-1" />
                      <Badge className="bg-emerald-700/90 backdrop-blur-sm text-white flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" strokeWidth={2} />
                        {product.rating}
                      </Badge>
                    </div>

                    {/* Quick info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <div className="flex items-center gap-2 text-white text-xs">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{product.farmer.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="mb-2 text-stone-800 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#C8553D]">
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-emerald-700">
                        <Package className="w-3 h-3" strokeWidth={2} />
                        <span>Stok: {product.stock}</span>
                      </div>
                      <span className="text-stone-500">{product.farmer.name}</span>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Padding */}
      <div className="h-6"></div>
    </div>
  );
}