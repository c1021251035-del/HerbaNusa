import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Play,
  MapPin,
  Sprout,
  Package,
  CheckCircle,
  Camera,
  Video,
  Upload,
  ChevronRight,
  ChevronLeft,
  Eye,
  Lightbulb,
  Save,
  Plus,
  X,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface FarmerProductTraceabilityProps {
  productId: string;
  productName: string;
  onNavigate: (page: string) => void;
}

interface TraceabilityData {
  // Step 1: Perkenalan
  introVideo: string;
  introPhoto: string;
  introMessage: string;

  // Step 2: Lokasi
  locationAddress: string;
  locationLat: string;
  locationLng: string;
  locationPhoto: string;

  // Step 3: Masa Panen
  harvestDate: string;
  plantAge: string;
  plantCondition: string;
  weatherCondition: string;
  harvestPhoto: string;

  // Step 4: Proses Pengeringan
  dryingMethod: string;
  dryingDuration: string;
  dryingTemperature: string;
  processingPhoto: string;

  // Step 5: Sertifikasi
  certifications: Array<{
    name: string;
    code: string;
  }>;
  certificationPhoto: string;
}

const initialData: TraceabilityData = {
  introVideo: '',
  introPhoto: '',
  introMessage: '',
  locationAddress: '',
  locationLat: '',
  locationLng: '',
  locationPhoto: '',
  harvestDate: '',
  plantAge: '',
  plantCondition: '',
  weatherCondition: '',
  harvestPhoto: '',
  dryingMethod: '',
  dryingDuration: '',
  dryingTemperature: '',
  processingPhoto: '',
  certifications: [{ name: '', code: '' }],
  certificationPhoto: '',
};

export function FarmerProductTraceability({
  productId,
  productName,
  onNavigate,
}: FarmerProductTraceabilityProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TraceabilityData>(initialData);
  const [showPreview, setShowPreview] = useState(false);

  const steps = [
    {
      id: 'intro',
      title: 'Perkenalan',
      icon: Video,
      description: 'Sapa pelanggan Anda',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'location',
      title: 'Lokasi Kebun',
      icon: MapPin,
      description: 'Tunjukkan asal produk',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'harvest',
      title: 'Masa Panen',
      icon: Sprout,
      description: 'Detail proses panen',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'processing',
      title: 'Proses Pengolahan',
      icon: Package,
      description: 'Cara mengolah produk',
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'certification',
      title: 'Sertifikasi',
      icon: CheckCircle,
      description: 'Bukti kualitas produk',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    // Simulate save to database
    toast.success('Info jejak panen berhasil disimpan!', {
      description: 'Pelanggan sekarang bisa melihat cerita di balik produk Anda',
    });
    setTimeout(() => {
      onNavigate('farmer-products');
    }, 1500);
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...formData.certifications, { name: '', code: '' }],
    });
  };

  const updateCertification = (index: number, field: 'name' | 'code', value: string) => {
    const newCerts = [...formData.certifications];
    newCerts[index][field] = value;
    setFormData({ ...formData, certifications: newCerts });
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'intro':
        return (
          <motion.div
            key="intro"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-purple-900">Sapa Pelanggan Anda</h3>
                  <p className="text-sm text-purple-700">Buat koneksi personal</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                <p className="text-sm text-purple-900">
                  💡 <span className="opacity-90">Pelanggan suka melihat wajah petani yang menanam produk mereka!</span>
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="introPhoto">Foto Anda *</Label>
              <div className="mt-2 border-2 border-dashed border-stone-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Upload className="w-8 h-8 text-stone-400 flex-shrink-0" />
                  <p className="text-sm text-stone-600">Upload atau tempel link foto</p>
                </div>
                <Input
                  id="introPhoto"
                  placeholder="https://... atau upload foto"
                  value={formData.introPhoto}
                  onChange={(e) => setFormData({ ...formData, introPhoto: e.target.value })}
                />
                <p className="text-xs text-stone-500 mt-2">Senyum Anda akan membuat pelanggan senang! 😊</p>
              </div>
            </div>

            <div>
              <Label htmlFor="introVideo">Video Perkenalan (Opsional)</Label>
              <div className="mt-2 border-2 border-dashed border-stone-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Play className="w-8 h-8 text-stone-400 flex-shrink-0" />
                  <p className="text-sm text-stone-600">Link video YouTube atau upload</p>
                </div>
                <Input
                  id="introVideo"
                  placeholder="https://... link video YouTube atau upload"
                  value={formData.introVideo}
                  onChange={(e) => setFormData({ ...formData, introVideo: e.target.value })}
                />
                <p className="text-xs text-stone-500 mt-2">Video singkat 15-30 detik paling efektif</p>
              </div>
            </div>

            <div>
              <Label htmlFor="introMessage">Pesan untuk Pelanggan *</Label>
              <Textarea
                id="introMessage"
                placeholder="Contoh: 'Halo! Saya Pak Budi, petani kunyit dari Yogyakarta. Saya menanam kunyit organik dengan cinta untuk kesehatan keluarga Indonesia.'"
                value={formData.introMessage}
                onChange={(e) => setFormData({ ...formData, introMessage: e.target.value })}
                rows={4}
                className="mt-2"
              />
              <p className="text-xs text-stone-500 mt-1">Ceritakan sedikit tentang Anda dan produk Anda</p>
            </div>
          </motion.div>
        );

      case 'location':
        return (
          <motion.div
            key="location"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-blue-900">Lokasi Kebun Anda</h3>
                  <p className="text-sm text-blue-700">Tunjukkan dari mana produk berasal</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  🌍 <span className="opacity-90">Pelanggan senang tahu produk ditanam di mana!</span>
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="locationPhoto">Foto Kebun *</Label>
              <div className="mt-2 border-2 border-dashed border-stone-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Camera className="w-8 h-8 text-stone-400 flex-shrink-0" />
                  <p className="text-sm text-stone-600">Upload foto pemandangan kebun</p>
                </div>
                <Input
                  id="locationPhoto"
                  placeholder="https://... foto pemandangan kebun"
                  value={formData.locationPhoto}
                  onChange={(e) => setFormData({ ...formData, locationPhoto: e.target.value })}
                />
                <p className="text-xs text-stone-500 mt-2">Foto kebun yang hijau & luas akan menarik perhatian</p>
              </div>
            </div>

            <div>
              <Label htmlFor="locationAddress">Alamat Kebun *</Label>
              <Input
                id="locationAddress"
                placeholder="Contoh: Desa Sumberejo, Kec. Berbah, Sleman, Yogyakarta"
                value={formData.locationAddress}
                onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="locationLat">Latitude (Opsional)</Label>
                <Input
                  id="locationLat"
                  placeholder="-7.7956"
                  value={formData.locationLat}
                  onChange={(e) => setFormData({ ...formData, locationLat: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="locationLng">Longitude (Opsional)</Label>
                <Input
                  id="locationLng"
                  placeholder="110.3695"
                  value={formData.locationLng}
                  onChange={(e) => setFormData({ ...formData, locationLng: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>
            <p className="text-xs text-stone-500">
              💡 Tips: Buka Google Maps, klik lokasi kebun, salin koordinatnya
            </p>
          </motion.div>
        );

      case 'harvest':
        return (
          <motion.div
            key="harvest"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-green-900">Masa Panen</h3>
                  <p className="text-sm text-green-700">Detail proses panen produk</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                <p className="text-sm text-green-900">
                  🌱 <span className="opacity-90">Ceritakan momen spesial saat panen!</span>
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="harvestPhoto">Foto Saat Panen *</Label>
              <div className="mt-2 border-2 border-dashed border-stone-300 rounded-xl p-4 hover:border-green-400 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Camera className="w-8 h-8 text-stone-400 flex-shrink-0" />
                  <p className="text-sm text-stone-600">Upload foto hasil panen</p>
                </div>
                <Input
                  id="harvestPhoto"
                  placeholder="https://... foto hasil panen"
                  value={formData.harvestPhoto}
                  onChange={(e) => setFormData({ ...formData, harvestPhoto: e.target.value })}
                />
                <p className="text-xs text-stone-500 mt-2">Foto Anda sedang memetik tanaman akan sangat menarik!</p>
              </div>
            </div>

            <div>
              <Label htmlFor="harvestDate">Tanggal Panen *</Label>
              <Input
                id="harvestDate"
                type="date"
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plantAge">Usia Tanaman</Label>
                <Input
                  id="plantAge"
                  placeholder="Contoh: 8 bulan"
                  value={formData.plantAge}
                  onChange={(e) => setFormData({ ...formData, plantAge: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="plantCondition">Kondisi Tanaman</Label>
                <Input
                  id="plantCondition"
                  placeholder="Contoh: Optimal"
                  value={formData.plantCondition}
                  onChange={(e) => setFormData({ ...formData, plantCondition: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="weatherCondition">Cuaca Saat Panen</Label>
              <Input
                id="weatherCondition"
                placeholder="Contoh: Cerah, tidak hujan"
                value={formData.weatherCondition}
                onChange={(e) => setFormData({ ...formData, weatherCondition: e.target.value })}
                className="mt-2"
              />
              <p className="text-xs text-stone-500 mt-1">Cuaca cerah saat panen adalah kualitas terbaik!</p>
            </div>
          </motion.div>
        );

      case 'processing':
        return (
          <motion.div
            key="processing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-amber-900">Proses Pengolahan</h3>
                  <p className="text-sm text-amber-700">Cara Anda mengolah produk</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                <p className="text-sm text-amber-900">
                  ⚙️ <span className="opacity-90">Pelanggan ingin tahu produk diproses dengan cara terbaik!</span>
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="processingPhoto">Foto Proses *</Label>
              <div className="mt-2 border-2 border-dashed border-stone-300 rounded-xl p-4 hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Camera className="w-8 h-8 text-stone-400 flex-shrink-0" />
                  <p className="text-sm text-stone-600">Upload foto proses pengeringan</p>
                </div>
                <Input
                  id="processingPhoto"
                  placeholder="https://... foto saat proses pengeringan"
                  value={formData.processingPhoto}
                  onChange={(e) => setFormData({ ...formData, processingPhoto: e.target.value })}
                />
                <p className="text-xs text-stone-500 mt-2">Tunjukkan proses pengeringan/pengolahan yang bersih</p>
              </div>
            </div>

            <div>
              <Label htmlFor="dryingMethod">Metode Pengeringan *</Label>
              <Input
                id="dryingMethod"
                placeholder="Contoh: Sun-dried (dijemur matahari)"
                value={formData.dryingMethod}
                onChange={(e) => setFormData({ ...formData, dryingMethod: e.target.value })}
                className="mt-2"
              />
              <p className="text-xs text-stone-500 mt-1">Metode tradisional sering lebih diminati!</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dryingDuration">Durasi Pengeringan</Label>
                <Input
                  id="dryingDuration"
                  placeholder="Contoh: 3-4 hari"
                  value={formData.dryingDuration}
                  onChange={(e) => setFormData({ ...formData, dryingDuration: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="dryingTemperature">Suhu</Label>
                <Input
                  id="dryingTemperature"
                  placeholder="Contoh: 25-30°C"
                  value={formData.dryingTemperature}
                  onChange={(e) => setFormData({ ...formData, dryingTemperature: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>
          </motion.div>
        );

      case 'certification':
        return (
          <motion.div
            key="certification"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-emerald-900">Sertifikasi</h3>
                  <p className="text-sm text-emerald-700">Bukti kualitas produk Anda</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                <p className="text-sm text-emerald-900">
                  ✅ <span className="opacity-90">Sertifikat meningkatkan kepercayaan pelanggan!</span>
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="certificationPhoto">Foto Sertifikat (Opsional)</Label>
              <div className="mt-2 border-2 border-dashed border-stone-300 rounded-xl p-4 hover:border-emerald-400 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Camera className="w-8 h-8 text-stone-400 flex-shrink-0" />
                  <p className="text-sm text-stone-600">Upload foto sertifikat</p>
                </div>
                <Input
                  id="certificationPhoto"
                  placeholder="https://... foto sertifikat"
                  value={formData.certificationPhoto}
                  onChange={(e) => setFormData({ ...formData, certificationPhoto: e.target.value })}
                />
                <p className="text-xs text-stone-500 mt-2">Upload foto sertifikat organik, HACCP, dll</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Daftar Sertifikasi</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCertification}
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Tambah
                </Button>
              </div>

              {formData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border-2 border-stone-200 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-emerald-100 text-emerald-700 border-0">
                      Sertifikat #{index + 1}
                    </Badge>
                    {formData.certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Hapus
                      </button>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`cert-name-${index}`}>Nama Sertifikat</Label>
                    <Input
                      id={`cert-name-${index}`}
                      placeholder="Contoh: Organik Indonesia"
                      value={cert.name}
                      onChange={(e) => updateCertification(index, 'name', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`cert-code-${index}`}>Kode/Nomor Sertifikat</Label>
                    <Input
                      id={`cert-code-${index}`}
                      placeholder="Contoh: ID-BIO-123"
                      value={cert.code}
                      onChange={(e) => updateCertification(index, 'code', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </motion.div>
              ))}

              {formData.certifications.length === 0 && (
                <div className="text-center py-8 bg-stone-50 rounded-xl border-2 border-dashed border-stone-300">
                  <CheckCircle className="w-12 h-12 mx-auto text-stone-400 mb-2" />
                  <p className="text-stone-600 mb-2">Belum ada sertifikasi</p>
                  <p className="text-sm text-stone-500">Klik tombol "Tambah" untuk menambahkan</p>
                </div>
              )}
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-900 mb-1">Tidak punya sertifikat?</p>
                  <p className="text-sm text-amber-800">
                    Tidak masalah! Cerita dan transparensi Anda tetap berharga bagi pelanggan.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-stone-50">
        {/* Preview Header */}
        <header className="bg-[#6B7F39] text-white sticky top-0 z-50 shadow-md">
          <div className="px-4 py-4 flex items-center gap-3">
            <button onClick={() => setShowPreview(false)} className="p-1">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1>Preview Jejak Panen</h1>
              <p className="text-xs opacity-90">Seperti yang dilihat pelanggan</p>
            </div>
            <Eye className="w-6 h-6" />
          </div>
        </header>

        {/* Preview Content - Simplified version */}
        <div className="p-4 space-y-4">
          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative">
              {formData.introPhoto && (
                <ImageWithFallback
                  src={formData.introPhoto}
                  alt="Intro"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-4 text-white w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="w-5 h-5" />
                    <span>Perkenalan Petani</span>
                  </div>
                  <p className="text-sm opacity-90 line-clamp-2">{formData.introMessage || 'Belum ada pesan'}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 relative">
              {formData.locationPhoto && (
                <ImageWithFallback
                  src={formData.locationPhoto}
                  alt="Location"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-4 text-white w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span>Lokasi Kebun</span>
                  </div>
                  <p className="text-sm opacity-90">{formData.locationAddress || 'Belum ada alamat'}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-green-500 to-emerald-500 relative">
              {formData.harvestPhoto && (
                <ImageWithFallback
                  src={formData.harvestPhoto}
                  alt="Harvest"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-4 text-white w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Sprout className="w-5 h-5" />
                    <span>Masa Panen</span>
                  </div>
                  <p className="text-sm opacity-90">{formData.harvestDate || 'Belum ada tanggal'}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-amber-500 to-orange-500 relative">
              {formData.processingPhoto && (
                <ImageWithFallback
                  src={formData.processingPhoto}
                  alt="Processing"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-4 text-white w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5" />
                    <span>Proses Pengolahan</span>
                  </div>
                  <p className="text-sm opacity-90">{formData.dryingMethod || 'Belum ada metode'}</p>
                </div>
              </div>
            </div>
          </Card>

          {formData.certifications.some(c => c.name || c.code) && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-emerald-900">Sertifikasi</h3>
              </div>
              <div className="space-y-2">
                {formData.certifications.map((cert, index) => (
                  cert.name && (
                    <div key={index} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <div>
                        <p className="text-emerald-900">{cert.name}</p>
                        {cert.code && <p className="text-sm text-emerald-700">{cert.code}</p>}
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                  )
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="p-4 pb-8">
          <Button
            onClick={() => setShowPreview(false)}
            className="w-full bg-[#6B7F39] hover:bg-[#5a6b30] text-white py-6"
          >
            Kembali ke Edit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Header */}
      <header className="bg-[#6B7F39] text-white sticky top-0 z-50 shadow-md">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => onNavigate('farmer-products')} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1>Jejak Panen</h1>
            <p className="text-xs opacity-90">{productName}</p>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-stone-200 px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-gradient-to-br ' + step.color + ' text-white shadow-lg'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-stone-200 text-stone-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                  </div>
                  <p
                    className={`text-xs mt-1 text-center ${
                      isActive ? 'text-stone-900' : 'text-stone-500'
                    }`}
                  >
                    {step.title}
                  </p>
                </motion.div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded-full transition-all ${
                      isCompleted ? 'bg-emerald-500' : 'bg-stone-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-xs text-stone-600">
            Langkah {currentStep + 1} dari {steps.length}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 space-y-3">
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex-1 border-stone-300 py-6"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Sebelumnya
            </Button>
          )}

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="flex-1 bg-[#6B7F39] hover:bg-[#5a6b30] text-white py-6"
            >
              Selanjutnya
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-6 shadow-lg"
            >
              <Save className="w-5 h-5 mr-2" />
              Simpan Jejak Panen
            </Button>
          )}
        </div>

        <Button
          variant="outline"
          onClick={() => setShowPreview(true)}
          className="w-full border-[#6B7F39] text-[#6B7F39] py-4"
        >
          <Eye className="w-5 h-5 mr-2" />
          Preview Tampilan
        </Button>
      </div>

      {/* Bottom padding to prevent content being hidden by fixed buttons */}
      <div className="h-40" />
    </div>
  );
}
