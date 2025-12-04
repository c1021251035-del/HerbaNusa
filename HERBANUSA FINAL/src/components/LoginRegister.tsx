import { ArrowLeft, Leaf, ShoppingBag, Sprout } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { UserRole } from '../App';
import { toast } from 'sonner@2.0.3';

interface LoginRegisterProps {
  onLogin: (role: UserRole) => void;
}

export function LoginRegister({ onLogin }: LoginRegisterProps) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [selectedRole, setSelectedRole] = useState<'customer' | 'farmer'>('customer');

  const handleSendOTP = () => {
    if (!phone) {
      toast.error('Harap masukkan nomor telepon');
      return;
    }
    toast.success('Kode OTP telah dikirim ke nomor Anda');
    setStep('otp');
  };

  const handleVerifyOTP = () => {
    if (!otp) {
      toast.error('Harap masukkan kode OTP');
      return;
    }
    toast.success('Login berhasil!');
    onLogin(selectedRole);
  };

  const handleGoogleLogin = () => {
    toast.success('Login dengan Google berhasil!');
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-emerald-800">
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-3 text-white">
        <div className="flex items-center gap-2 flex-1">
          <Leaf className="w-8 h-8" />
          <div>
            <h1 className="text-xl">HerbaNusa</h1>
            <p className="text-xs opacity-90">Herbal Asli Nusantara</p>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl max-w-md mx-auto overflow-hidden">
          <div className="p-6">
            <h2 className="text-center mb-2 text-emerald-900">
              {step === 'phone' ? 'Masuk / Daftar' : 'Verifikasi OTP'}
            </h2>
            <p className="text-center text-stone-600 mb-6">
              {step === 'phone' 
                ? 'Pilih peran Anda dan masuk dengan nomor telepon' 
                : `Kode OTP telah dikirim ke ${phone}`
              }
            </p>

            {step === 'phone' && (
              <>
                {/* Role Selection */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setSelectedRole('customer')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedRole === 'customer'
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'bg-white border-stone-200'
                    }`}
                  >
                    <ShoppingBag className={`w-8 h-8 mx-auto mb-2 ${
                      selectedRole === 'customer' ? 'text-emerald-700' : 'text-stone-400'
                    }`} />
                    <p className={selectedRole === 'customer' ? 'text-emerald-900' : 'text-stone-600'}>
                      Pembeli
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedRole('farmer')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedRole === 'farmer'
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'bg-white border-stone-200'
                    }`}
                  >
                    <Sprout className={`w-8 h-8 mx-auto mb-2 ${
                      selectedRole === 'farmer' ? 'text-emerald-700' : 'text-stone-400'
                    }`} />
                    <p className={selectedRole === 'farmer' ? 'text-emerald-900' : 'text-stone-600'}>
                      Petani
                    </p>
                  </button>
                </div>

                {/* Phone Input */}
                <div className="mb-4">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08xx-xxxx-xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleSendOTP}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-6 mb-4"
                >
                  Kirim Kode OTP
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-stone-500">atau</span>
                  </div>
                </div>

                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full border-2 border-stone-300 py-6"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Masuk dengan Google
                </Button>
              </>
            )}

            {step === 'otp' && (
              <>
                <div className="mb-6">
                  <Label htmlFor="otp">Kode OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Masukkan 6 digit kode OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                  />
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-6 mb-4"
                >
                  Verifikasi & Masuk
                </Button>

                <Button
                  onClick={() => setStep('phone')}
                  variant="ghost"
                  className="w-full"
                >
                  Ubah Nomor Telepon
                </Button>

                <div className="text-center mt-4">
                  <button
                    onClick={handleSendOTP}
                    className="text-sm text-emerald-700"
                  >
                    Kirim ulang kode OTP
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-emerald-50 px-6 py-4 border-t border-emerald-100 flex items-center justify-center gap-2">
            {selectedRole === 'customer' ? (
              <>
                <ShoppingBag className="w-4 h-4 text-emerald-700" strokeWidth={2} />
                <p className="text-sm text-emerald-900">
                  Belanja produk herbal langsung dari petani
                </p>
              </>
            ) : (
              <>
                <Sprout className="w-4 h-4 text-emerald-700" strokeWidth={2} />
                <p className="text-sm text-emerald-900">
                  Jual produk herbal Anda ke seluruh Indonesia
                </p>
              </>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center text-white mt-6 text-sm opacity-90">
          <p>Dengan masuk, Anda menyetujui</p>
          <p>Syarat & Ketentuan dan Kebijakan Privasi</p>
        </div>
      </div>
    </div>
  );
}