import { ArrowLeft, Star, ShoppingCart, User, QrCode, Play, Camera, CheckCircle, MapPin, Shield } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '../App';
import { toast } from 'sonner@2.0.3';
import { ProductTraceability } from './ProductTraceability';

interface ProductDetailProps {
  product: Product;
  onNavigate: (page: string) => void;
  onAddToCart: (product: Product) => void;
  cartItemCount: number;
}

// Mock user gallery data
const userGallery = [
  { id: 1, image: 'https://images.unsplash.com/photo-1758221052535-8119e3a816b7?w=400', username: '@sarah_healthy' },
  { id: 2, image: 'https://images.unsplash.com/photo-1662302039400-0f2090ddc993?w=400', username: '@wellness_diary' },
  { id: 3, image: 'https://images.unsplash.com/photo-1630247019300-e8a9498b831b?w=400', username: '@jamu_lovers' },
  { id: 4, image: 'https://images.unsplash.com/photo-1758221052535-8119e3a816b7?w=400', username: '@herbal_life' },
];

export function ProductDetail({ product, onNavigate, onAddToCart, cartItemCount }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [showTraceability, setShowTraceability] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    
    // Satisfying animation feedback
    toast.success(`${product.name} ditambahkan ke keranjang`, {
      description: `${quantity} item`,
    });
  };

  if (showTraceability) {
    return <ProductTraceability product={product} onClose={() => setShowTraceability(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#6B7F39] to-[#7C8F4F] text-white sticky top-0 z-50 shadow-md">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => onNavigate('catalog')} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="flex-1">Detail Produk</h1>
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

      {/* Product Image */}
      <div className="aspect-[4/3] bg-[#F5F1E8] relative">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-4 right-4 bg-[#6B7F39] text-white px-3 py-1.5">
          <Star className="w-4 h-4 inline mr-1 fill-current" />
          {product.rating} ({product.reviews} ulasan)
        </Badge>
        
        {/* Traceability QR Button */}
        <motion.button
          onClick={() => setShowTraceability(true)}
          className="absolute bottom-4 right-4 bg-gradient-to-br from-[#C8553D] to-[#E07856] rounded-2xl px-5 py-3.5 shadow-2xl border-2 border-white flex items-center gap-2.5"
          whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(200, 85, 61, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: [
              "0 10px 30px -10px rgba(200, 85, 61, 0.6)",
              "0 15px 40px -10px rgba(200, 85, 61, 0.8)",
              "0 10px 30px -10px rgba(200, 85, 61, 0.6)"
            ] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5">
            <QrCode className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <p className="text-sm text-white">Lacak Jejak Panen</p>
            <p className="text-xs text-white/90">Scan untuk info lengkap</p>
          </div>
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="bg-white px-4 py-4">
        <h2 className="mb-2">{product.name}</h2>
        <p className="text-2xl text-[#C8553D] mb-3">
          Rp {product.price.toLocaleString('id-ID')}
        </p>
        <p className="text-sm text-stone-600">
          Stok tersedia: <span className="text-[#6B7F39]">{product.stock} unit</span>
        </p>
      </div>

      <Separator />

      {/* Farmer Profile - Enhanced with video */}
      <div className="bg-white px-4 py-4">
        <p className="mb-3 text-stone-600">Dijual oleh</p>
        <div className="bg-gradient-to-br from-[#F5F1E8] to-[#EBE3D5] rounded-2xl p-4 border-2 border-[#D4C5B0]">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <Avatar className="w-16 h-16 border-3 border-white shadow-md">
                <AvatarImage src={product.farmer.photo} alt={product.farmer.name} />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              {/* Video indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#6B7F39] rounded-full flex items-center justify-center border-2 border-white">
                <Play className="w-3 h-3 text-white fill-white ml-0.5" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[#6B7F39]">{product.farmer.name}</p>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#8B5A3C]" strokeWidth={2} />
                <p className="text-sm text-stone-600">{product.farmer.location}</p>
              </div>
            </div>
            <Badge className="bg-[#6B7F39] text-white flex items-center gap-1">
              <Shield className="w-3 h-3" strokeWidth={2.5} />
              Verified
            </Badge>
          </div>
          
          {/* Video perkenalan placeholder */}
          <motion.button
            className="w-full bg-white/60 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 hover:bg-white/80 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 bg-[#6B7F39] rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
            <div className="text-left flex-1">
              <p className="text-sm text-[#6B7F39]">Salam dari petani</p>
              <p className="text-xs text-stone-600">Video perkenalan 15 detik</p>
            </div>
          </motion.button>
        </div>
      </div>

      <Separator />

      {/* User Gallery - Social Proof */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="mb-1">Galeri Pengguna</h3>
            <p className="text-xs text-stone-600">{userGallery.length * 23} orang sudah mencoba!</p>
          </div>
          <Button variant="ghost" className="text-[#6B7F39] text-sm p-0">
            Lihat Semua →
          </Button>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {userGallery.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative aspect-square rounded-xl overflow-hidden bg-[#F5F1E8] border-2 border-[#D4C5B0]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <ImageWithFallback
                src={item.image}
                alt={item.username}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-2">
                <p className="text-white text-[10px] truncate">{item.username}</p>
              </div>
              {/* Camera icon on last item */}
              {index === userGallery.length - 1 && (
                <div className="absolute inset-0 bg-[#6B7F39]/90 flex flex-col items-center justify-center gap-1">
                  <Camera className="w-6 h-6 text-white" />
                  <p className="text-white text-[10px]">+{23 * userGallery.length - 4}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.button
          className="w-full mt-3 py-2.5 border-2 border-dashed border-[#D4C5B0] rounded-xl text-[#6B7F39] text-sm hover:bg-[#F5F1E8] transition-colors flex items-center justify-center gap-2"
          whileTap={{ scale: 0.98 }}
        >
          <Camera className="w-4 h-4" strokeWidth={2} />
          Upload Fotomu & Dapatkan Poin
        </motion.button>
      </div>

      <Separator />

      {/* Description */}
      <div className="bg-white px-4 py-4">
        <h3 className="mb-2">Deskripsi Produk</h3>
        <p className="text-stone-700 leading-relaxed">{product.description}</p>
      </div>

      <Separator />

      {/* Benefits */}
      <div className="bg-white px-4 py-4">
        <h3 className="mb-3">Manfaat</h3>
        <div className="bg-[#FAF0E6] border-2 border-[#D4C5B0] rounded-xl p-4 space-y-2">
          {product.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CheckCircle className="w-4 h-4 text-[#6B7F39] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
              <p className="text-stone-700 flex-1">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Usage */}
      <div className="bg-white px-4 py-4">
        <h3 className="mb-3">Cara Penggunaan</h3>
        <div className="bg-[#FAF0E6] border-2 border-[#D4C5B0] rounded-xl p-4">
          <p className="text-stone-700 leading-relaxed">{product.usage}</p>
        </div>
      </div>

      {/* Reviews Preview */}
      <div className="bg-white px-4 py-4 mt-2">
        <div className="flex items-center justify-between mb-3">
          <h3>Ulasan Pembeli</h3>
          <Button variant="ghost" className="text-[#6B7F39] text-sm p-0">
            Lihat Semua →
          </Button>
        </div>
        <div className="space-y-3">
          <div className="bg-[#FAF8F3] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-[#F5F1E8] text-[#6B7F39]">R</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">Ibu Rina</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-stone-700">
              Produk sangat berkualitas, langsung dari petani. Packing rapi dan pengiriman cepat!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Spacing for Fixed Bottom Bar */}
      <div className="h-24"></div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#D4C5B0] px-4 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2 border-2 border-[#D4C5B0] rounded-lg">
            <motion.button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-xl"
              aria-label="Kurangi jumlah"
              whileTap={{ scale: 0.9 }}
            >
              −
            </motion.button>
            <span className="px-3 min-w-[40px] text-center">{quantity}</span>
            <motion.button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="px-3 py-2 text-xl"
              aria-label="Tambah jumlah"
              whileTap={{ scale: 0.9 }}
            >
              +
            </motion.button>
          </div>

          {/* Add to Cart Button */}
          <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-[#C8553D] to-[#E07856] hover:from-[#B04838] hover:to-[#D06847] text-white py-6"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Tambah ke Keranjang
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}