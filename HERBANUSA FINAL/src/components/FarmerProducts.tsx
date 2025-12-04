import { ArrowLeft, Plus, Edit, Trash2, Eye, Package, Star, Lightbulb, Camera, Leaf } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockProducts } from './mockData';
import { Product } from '../App';
import { toast } from 'sonner@2.0.3';
import { FarmerProductTraceability } from './FarmerProductTraceability';

interface FarmerProductsProps {
  onNavigate: (page: string) => void;
}

export function FarmerProducts({ onNavigate }: FarmerProductsProps) {
  const [products, setProducts] = useState<Product[]>(mockProducts.slice(0, 5));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProductForTrace, setSelectedProductForTrace] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      toast.error('Harap lengkapi semua data produk');
      return;
    }

    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formData.name,
              price: parseInt(formData.price),
              stock: parseInt(formData.stock),
              description: formData.description,
            }
          : p
      ));
      toast.success('Produk berhasil diperbarui');
    } else {
      const newProduct: Product = {
        id: `new-${Date.now()}`,
        name: formData.name,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        description: formData.description,
        image: formData.imageUrl || 'https://images.unsplash.com/photo-1725507030040-43ca39002d7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        category: 'immunity',
        farmer: {
          name: 'Pak Budi Santoso',
          location: 'Yogyakarta',
          photo: 'https://images.unsplash.com/photo-1602511706963-02ecf61637b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100',
        },
        benefits: ['Manfaat produk'],
        usage: 'Cara penggunaan produk',
        rating: 0,
        reviews: 0,
      };
      setProducts([...products, newProduct]);
      toast.success('Produk baru berhasil ditambahkan');
    }

    setFormData({ name: '', price: '', stock: '', description: '', imageUrl: '' });
    setEditingProduct(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      imageUrl: product.image,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast.success('Produk berhasil dihapus');
  };

  const ProductForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="productName">Nama Produk *</Label>
        <Input
          id="productName"
          placeholder="Contoh: Kunyit Bubuk Organik"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="price">Harga (Rp) *</Label>
          <Input
            id="price"
            type="number"
            placeholder="35000"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="stock">Stok *</Label>
          <Input
            id="stock"
            type="number"
            placeholder="50"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Deskripsi Singkat</Label>
        <Textarea
          id="description"
          placeholder="Jelaskan produk Anda..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="imageUrl">URL Foto Produk (opsional)</Label>
        <Input
          id="imageUrl"
          placeholder="https://..."
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />
        <p className="text-xs text-stone-500 mt-1">
          Tips: Gunakan foto berkualitas tinggi untuk menarik pembeli
        </p>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-6"
      >
        {editingProduct ? 'Perbarui Produk' : 'Tambah Produk'}
      </Button>
    </div>
  );

  // Show Product Traceability screen if a product is selected
  if (selectedProductForTrace) {
    return (
      <FarmerProductTraceability
        productId={selectedProductForTrace.id}
        productName={selectedProductForTrace.name}
        onNavigate={(page) => {
          if (page === 'farmer-products') {
            setSelectedProductForTrace(null);
          } else {
            onNavigate(page);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white sticky top-0 z-50 shadow-md">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => onNavigate('farmer-dashboard')} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1>Produk Saya</h1>
            <p className="text-xs opacity-90">{products.length} produk</p>
          </div>
        </div>
      </header>

      {/* Add Product Button */}
      <div className="p-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-6"
              onClick={() => {
                setEditingProduct(null);
                setFormData({ name: '', price: '', stock: '', description: '', imageUrl: '' });
              }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Tambah Produk Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </DialogTitle>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Products List */}
      <div className="px-4 pb-6 space-y-3">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Leaf className="w-16 h-16 mx-auto text-stone-300 mb-4" />
            <p className="text-stone-600 mb-2">Belum ada produk</p>
            <p className="text-sm text-stone-500 mb-6">
              Mulai jualan dengan menambahkan produk pertama Anda
            </p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200"
            >
              <div className="flex gap-3 p-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-emerald-900 line-clamp-2 mb-1">{product.name}</p>
                  <p className="text-orange-600 mb-2">
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Stok: {product.stock}
                    </Badge>
                    {product.reviews > 0 && (
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {product.rating} ({product.reviews})
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex border-t border-stone-200">
                <button
                  onClick={() => setSelectedProductForTrace(product)}
                  className="flex-1 flex items-center justify-center gap-1 py-3 text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  <span className="text-xs">Jejak Panen</span>
                </button>
                <div className="w-px bg-stone-200"></div>
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 flex items-center justify-center gap-1 py-3 text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span className="text-xs">Edit</span>
                </button>
                <div className="w-px bg-stone-200"></div>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-xs">Hapus</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Help Tips */}
      <div className="px-4 pb-8">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-200 rounded-xl flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-amber-700" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h4 className="text-amber-900 mb-2">Tips Penjualan</h4>
            <ul className="text-sm text-stone-700 space-y-1">
              <li>• Gunakan foto produk yang jelas dan menarik</li>
              <li>• Tulis deskripsi lengkap tentang manfaat produk</li>
              <li>• Update stok secara berkala</li>
              <li>• Respon pesanan dengan cepat</li>
              <li>• <span className="text-amber-700">Isi "Jejak Panen" untuk meningkatkan kepercayaan!</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}