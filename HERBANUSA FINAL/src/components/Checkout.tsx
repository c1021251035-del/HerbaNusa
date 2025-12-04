import { ArrowLeft, MapPin, Truck, Wallet, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { CartItem } from '../App';
import { toast } from 'sonner@2.0.3';

interface CheckoutProps {
  cart: CartItem[];
  onNavigate: (page: string) => void;
  onCompleteOrder: () => void;
}

export function Checkout({ cart, onNavigate, onCompleteOrder }: CheckoutProps) {
  const [step, setStep] = useState<'address' | 'shipping' | 'payment' | 'success'>('address');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    shipping: 'regular',
    payment: 'cod',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = formData.shipping === 'express' ? 25000 : 15000;
  const total = subtotal + shippingCost;

  const handleSubmit = () => {
    if (step === 'address') {
      if (!formData.name || !formData.phone || !formData.address || !formData.city) {
        toast.error('Harap lengkapi semua data alamat');
        return;
      }
      setStep('shipping');
    } else if (step === 'shipping') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('success');
      setTimeout(() => {
        toast.success('Pesanan berhasil dibuat!');
        onCompleteOrder();
      }, 2000);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-700" />
          </div>
          <h2 className="mb-2 text-emerald-900">Pesanan Berhasil!</h2>
          <p className="text-stone-600 mb-6">
            Terima kasih telah berbelanja di HerbaNusa. Pesanan Anda sedang diproses oleh petani.
          </p>
          <p className="text-sm text-stone-500 mb-8">
            Mengarahkan ke halaman utama...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white sticky top-0 z-50 shadow-md">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => {
              if (step === 'address') {
                onNavigate('cart');
              } else if (step === 'shipping') {
                setStep('address');
              } else if (step === 'payment') {
                setStep('shipping');
              }
            }}
            className="p-1"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Checkout</h1>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white px-4 py-4 border-b border-stone-200">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === 'address' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-700'
            }`}>
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs">Alamat</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            step !== 'address' ? 'bg-emerald-700' : 'bg-stone-200'
          }`}></div>
          <div className="flex flex-col items-center gap-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === 'shipping' || step === 'payment' ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-500'
            }`}>
              <Truck className="w-5 h-5" />
            </div>
            <span className="text-xs">Pengiriman</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            step === 'payment' ? 'bg-emerald-700' : 'bg-stone-200'
          }`}></div>
          <div className="flex flex-col items-center gap-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === 'payment' ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-500'
            }`}>
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-xs">Pembayaran</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 space-y-4">
        {step === 'address' && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
            <h3 className="mb-4">Alamat Pengiriman</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Lengkap *</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Nomor Telepon *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="08xx-xxxx-xxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="address">Alamat Lengkap *</Label>
                <Textarea
                  id="address"
                  placeholder="Jalan, nomor rumah, RT/RW"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">Kota *</Label>
                  <Input
                    id="city"
                    placeholder="Kota"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Kode Pos</Label>
                  <Input
                    id="postalCode"
                    placeholder="12345"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'shipping' && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
            <h3 className="mb-4">Pilih Pengiriman</h3>
            <RadioGroup value={formData.shipping} onValueChange={(value) => setFormData({ ...formData, shipping: value })}>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.shipping === 'regular' ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200'
                }`}>
                  <RadioGroupItem value="regular" id="regular" />
                  <div className="flex-1">
                    <p className="text-emerald-900">Reguler (3-5 hari)</p>
                    <p className="text-sm text-stone-600">Estimasi tiba 3-5 hari kerja</p>
                  </div>
                  <p className="text-emerald-700">Rp 15.000</p>
                </label>

                <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.shipping === 'express' ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200'
                }`}>
                  <RadioGroupItem value="express" id="express" />
                  <div className="flex-1">
                    <p className="text-emerald-900">Express (1-2 hari)</p>
                    <p className="text-sm text-stone-600">Estimasi tiba 1-2 hari kerja</p>
                  </div>
                  <p className="text-emerald-700">Rp 25.000</p>
                </label>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === 'payment' && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
            <h3 className="mb-4">Metode Pembayaran</h3>
            <RadioGroup value={formData.payment} onValueChange={(value) => setFormData({ ...formData, payment: value })}>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.payment === 'cod' ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200'
                }`}>
                  <RadioGroupItem value="cod" id="cod" />
                  <div className="flex-1">
                    <p className="text-emerald-900">Bayar di Tempat (COD)</p>
                    <p className="text-sm text-stone-600">Bayar saat produk sampai</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.payment === 'transfer' ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200'
                }`}>
                  <RadioGroupItem value="transfer" id="transfer" />
                  <div className="flex-1">
                    <p className="text-emerald-900">Transfer Bank</p>
                    <p className="text-sm text-stone-600">BCA, Mandiri, BNI</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.payment === 'ewallet' ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200'
                }`}>
                  <RadioGroupItem value="ewallet" id="ewallet" />
                  <div className="flex-1">
                    <p className="text-emerald-900">E-Wallet</p>
                    <p className="text-sm text-stone-600">GoPay, OVO, Dana</p>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
          <h3 className="mb-3">Ringkasan Pesanan</h3>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-stone-700">
                  {item.name} x{item.quantity}
                </span>
                <span className="text-stone-900">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex justify-between text-sm">
              <span className="text-stone-700">Subtotal</span>
              <span className="text-stone-900">Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-700">Ongkos Kirim</span>
              <span className="text-stone-900">Rp {shippingCost.toLocaleString('id-ID')}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <span>Total</span>
              <span className="text-orange-600">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-24"></div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-stone-200 px-4 py-4 shadow-lg">
        <Button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6"
        >
          {step === 'address' && 'Lanjut ke Pengiriman'}
          {step === 'shipping' && 'Lanjut ke Pembayaran'}
          {step === 'payment' && 'Buat Pesanan'}
        </Button>
      </div>
    </div>
  );
}
