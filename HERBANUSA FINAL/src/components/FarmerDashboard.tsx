import { Package, ShoppingCart, TrendingUp, Settings, Leaf, Plus, LogOut, Lightbulb, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface FarmerDashboardProps {
  onNavigate: (page: string) => void;
}

export function FarmerDashboard({ onNavigate }: FarmerDashboardProps) {
  const stats = {
    newOrders: 2,
    totalProducts: 5,
    monthlyRevenue: 1250000,
    pendingOrders: 3,
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-8 h-8" />
            <div>
              <h1 className="text-xl">Dashboard Petani</h1>
              <p className="text-xs opacity-90">Pak Budi Santoso</p>
            </div>
          </div>
          <button className="p-2" aria-label="Pengaturan">
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-xs opacity-90 mb-1">Pesanan Baru</p>
            <p className="text-2xl">{stats.newOrders}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-xs opacity-90 mb-1">Total Produk</p>
            <p className="text-2xl">{stats.totalProducts}</p>
          </div>
        </div>
      </header>

      {/* Revenue Card */}
      <div className="px-4 py-6">
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 border-0 shadow-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm opacity-90">Pendapatan Bulan Ini</p>
              <h2 className="text-3xl mt-1">
                Rp {stats.monthlyRevenue.toLocaleString('id-ID')}
              </h2>
            </div>
            <TrendingUp className="w-8 h-8" />
          </div>
          <p className="text-xs opacity-90 mt-3">
            ↑ 12% dari bulan lalu
          </p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-6">
        <h3 className="mb-4">Menu Utama</h3>
        <div className="space-y-3">
          {/* New Orders Alert */}
          {stats.newOrders > 0 && (
            <button
              onClick={() => onNavigate('farmer-orders')}
              className="w-full bg-orange-50 border-2 border-orange-300 rounded-xl p-4 flex items-center gap-4 hover:bg-orange-100 transition-all active:scale-98"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-orange-900 mb-1">Pesanan Masuk</p>
                <p className="text-sm text-orange-700">
                  {stats.newOrders} pesanan baru menunggu konfirmasi
                </p>
              </div>
              <Badge className="bg-orange-500 text-white">
                {stats.newOrders}
              </Badge>
            </button>
          )}

          {/* Manage Orders */}
          <button
            onClick={() => onNavigate('farmer-orders')}
            className="w-full bg-white border-2 border-stone-200 rounded-xl p-4 flex items-center gap-4 hover:border-emerald-300 transition-all active:scale-98"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-emerald-700" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-emerald-900 mb-1">Kelola Pesanan</p>
              <p className="text-sm text-stone-600">
                {stats.pendingOrders} pesanan sedang diproses
              </p>
            </div>
          </button>

          {/* Manage Products */}
          <button
            onClick={() => onNavigate('farmer-products')}
            className="w-full bg-white border-2 border-stone-200 rounded-xl p-4 flex items-center gap-4 hover:border-emerald-300 transition-all active:scale-98"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Leaf className="w-6 h-6 text-emerald-700" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-emerald-900 mb-1">Produk Saya</p>
              <p className="text-sm text-stone-600">
                Lihat dan kelola {stats.totalProducts} produk
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Add Product Button */}
      <div className="px-4 pb-6">
        <Button
          onClick={() => onNavigate('farmer-products')}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-6"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah Produk Baru
        </Button>
      </div>

      {/* Special Feature Highlight */}
      <div className="px-4 pb-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl flex items-center justify-center flex-shrink-0">
            <Camera className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h4 className="text-amber-900 mb-2">Ceritakan Jejak Panen Anda!</h4>
            <p className="text-sm text-stone-700 mb-3">
              Bagikan cerita di balik produk Anda ke pelanggan. Tingkatkan kepercayaan & penjualan!
            </p>
            <Button 
              onClick={() => onNavigate('farmer-products')}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0"
            >
              <Camera className="w-4 h-4 mr-2" />
              Atur Jejak Panen
            </Button>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="px-4 pb-6">
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-emerald-700" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h4 className="text-emerald-900 mb-2">Butuh Bantuan?</h4>
            <p className="text-sm text-stone-700 mb-3">
              Pelajari cara mengelola toko dan meningkatkan penjualan
            </p>
            <Button variant="outline" className="w-full border-emerald-300 text-emerald-700">
              Panduan Petani
            </Button>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 pb-8">
        <button
          onClick={() => onNavigate('home')}
          className="w-full flex items-center justify-center gap-2 text-stone-600 py-4"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </div>
  );
}