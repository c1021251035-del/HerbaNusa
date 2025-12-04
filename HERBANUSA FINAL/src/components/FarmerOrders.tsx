import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { mockOrders } from './mockData';
import { Order } from '../App';
import { toast } from 'sonner@2.0.3';

interface FarmerOrdersProps {
  onNavigate: (page: string) => void;
}

export function FarmerOrders({ onNavigate }: FarmerOrdersProps) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    const statusMessages: Record<Order['status'], string> = {
      new: 'Pesanan baru',
      accepted: 'Pesanan diterima',
      preparing: 'Pesanan sedang disiapkan',
      shipped: 'Pesanan dikirim',
      completed: 'Pesanan selesai',
    };
    
    toast.success(statusMessages[newStatus]);
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig: Record<Order['status'], { label: string; className: string; icon: any }> = {
      new: { label: 'Baru', className: 'bg-orange-500 text-white', icon: Package },
      accepted: { label: 'Diterima', className: 'bg-blue-500 text-white', icon: CheckCircle },
      preparing: { label: 'Diproses', className: 'bg-purple-500 text-white', icon: Clock },
      shipped: { label: 'Dikirim', className: 'bg-emerald-500 text-white', icon: CheckCircle },
      completed: { label: 'Selesai', className: 'bg-stone-500 text-white', icon: CheckCircle },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const filteredOrders = (filterStatus?: Order['status']) => {
    if (!filterStatus) return orders;
    return orders.filter(order => order.status === filterStatus);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-stone-600">ID Pesanan</p>
          <p className="text-emerald-900">{order.id}</p>
        </div>
        {getStatusBadge(order.status)}
      </div>

      <Separator className="my-3" />

      <div className="space-y-2 mb-3">
        <div>
          <p className="text-sm text-stone-600">Produk</p>
          <p className="text-emerald-900">{order.productName}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-stone-600">Jumlah</p>
            <p className="text-emerald-900">{order.quantity} unit</p>
          </div>
          <div>
            <p className="text-sm text-stone-600">Total</p>
            <p className="text-orange-600">
              Rp {order.total.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-stone-600">Pembeli</p>
          <p className="text-emerald-900">{order.customerName}</p>
        </div>
        <div>
          <p className="text-sm text-stone-600">Alamat Pengiriman</p>
          <p className="text-stone-700 text-sm">{order.customerAddress}</p>
        </div>
        <div>
          <p className="text-sm text-stone-600">Tanggal Pesanan</p>
          <p className="text-stone-700 text-sm">{order.date}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 mt-4">
        {order.status === 'new' && (
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => handleUpdateStatus(order.id, 'accepted')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-1"
            >
              <Check className="w-4 h-4" strokeWidth={2.5} />
              Terima
            </Button>
            <Button variant="outline" className="border-stone-300 flex items-center justify-center gap-1">
              <X className="w-4 h-4" strokeWidth={2.5} />
              Tolak
            </Button>
          </div>
        )}
        {order.status === 'accepted' && (
          <Button
            onClick={() => handleUpdateStatus(order.id, 'preparing')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Package className="w-4 h-4 mr-2" />
            Siapkan Pesanan
          </Button>
        )}
        {order.status === 'preparing' && (
          <Button
            onClick={() => handleUpdateStatus(order.id, 'shipped')}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Kirim Pesanan
          </Button>
        )}
      </div>
    </div>
  );

  const newOrdersCount = filteredOrders('new').length;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white sticky top-0 z-50 shadow-md">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => onNavigate('farmer-dashboard')} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1>Kelola Pesanan</h1>
            <p className="text-xs opacity-90">{orders.length} total pesanan</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="new" className="w-full">
        <div className="bg-white border-b border-stone-200 sticky top-[72px] z-40">
          <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-transparent">
            <TabsTrigger value="new" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900">
              Baru
              {newOrdersCount > 0 && (
                <Badge className="ml-2 bg-orange-500 text-white">{newOrdersCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="processing" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900">
              Proses
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="new" className="p-4 space-y-3 mt-0">
          {filteredOrders('new').length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-stone-300 mb-4" />
              <p className="text-stone-600">Tidak ada pesanan baru</p>
            </div>
          ) : (
            filteredOrders('new').map(order => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>

        <TabsContent value="processing" className="p-4 space-y-3 mt-0">
          {filteredOrders('accepted').concat(filteredOrders('preparing')).length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-stone-300 mb-4" />
              <p className="text-stone-600">Tidak ada pesanan yang sedang diproses</p>
            </div>
          ) : (
            filteredOrders('accepted')
              .concat(filteredOrders('preparing'))
              .map(order => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>
      </Tabs>

      {/* Bottom Padding */}
      <div className="h-6"></div>
    </div>
  );
}