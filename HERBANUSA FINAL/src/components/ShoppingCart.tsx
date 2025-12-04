import { ArrowLeft, Trash2, ShoppingBag, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CartItem } from '../App';

interface ShoppingCartProps {
  cart: CartItem[];
  onNavigate: (page: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export function ShoppingCart({ cart, onNavigate, onUpdateQuantity }: ShoppingCartProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = cart.length > 0 ? 15000 : 0;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white sticky top-0 z-50 shadow-md">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1>Keranjang Belanja</h1>
            <p className="text-xs opacity-90">{cart.length} produk</p>
          </div>
        </div>
      </header>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <ShoppingBag className="w-24 h-24 text-stone-300 mb-4" />
          <h2 className="mb-2 text-stone-700">Keranjang Kosong</h2>
          <p className="text-stone-600 text-center mb-6">
            Belum ada produk di keranjang Anda
          </p>
          <Button
            onClick={() => onNavigate('catalog')}
            className="bg-emerald-700"
          >
            Mulai Belanja
          </Button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="p-4 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-3 shadow-sm border border-stone-200">
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-emerald-900 line-clamp-2 mb-1">{item.name}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#8B5A3C]" strokeWidth={2} />
                      <p className="text-xs text-stone-600">{item.farmer.location}</p>
                    </div>
                    <p className="text-orange-600">
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
                
                <Separator className="my-3" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 border-2 border-stone-300 rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-lg"
                      aria-label="Kurangi jumlah"
                    >
                      −
                    </button>
                    <span className="px-3 min-w-[30px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                      className="px-3 py-1 text-lg"
                      aria-label="Tambah jumlah"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <p className="text-emerald-900">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </p>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 0)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Hapus dari keranjang"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Spacing for Fixed Bottom Bar */}
          <div className="h-64"></div>

          {/* Fixed Bottom Summary */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-stone-200 shadow-lg">
            <div className="px-4 py-4">
              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-stone-700">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span>Ongkos Kirim</span>
                  <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-orange-600">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => onNavigate('checkout')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6"
              >
                Lanjut ke Pembayaran
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}