import { useState } from "react";
import { WelcomeIntro } from "./components/WelcomeIntro";
import { Homepage } from "./components/Homepage";
import { ProductCatalog } from "./components/ProductCatalog";
import { ProductDetail } from "./components/ProductDetail";
import { ShoppingCart } from "./components/ShoppingCart";
import { Checkout } from "./components/Checkout";
import { LoginRegister } from "./components/LoginRegister";
import { FarmerDashboard } from "./components/FarmerDashboard";
import { FarmerOrders } from "./components/FarmerOrders";
import { FarmerProducts } from "./components/FarmerProducts";
import { RecipeInspiration } from "./components/RecipeInspiration";

export type UserRole = "customer" | "farmer" | null;

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  farmer: {
    name: string;
    location: string;
    photo: string;
  };
  description: string;
  benefits: string[];
  usage: string;
  rating: number;
  reviews: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  productName: string;
  quantity: number;
  total: number;
  customerName: string;
  customerAddress: string;
  status:
    | "new"
    | "accepted"
    | "preparing"
    | "shipped"
    | "completed";
  date: string;
}

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentPage, setCurrentPage] =
    useState<string>("home");
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("all");

  const addToCart = (product: Product) => {
    const existingItem = cart.find(
      (item) => item.id === product.id,
    );
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (
    productId: string,
    quantity: number,
  ) => {
    if (quantity === 0) {
      setCart(cart.filter((item) => item.id !== productId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === "farmer") {
      setCurrentPage("farmer-dashboard");
    } else {
      setCurrentPage("home");
    }
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("product-detail");
  };

  const navigateToCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage("catalog");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Homepage
            onNavigate={setCurrentPage}
            onProductClick={navigateToProduct}
            onCategoryClick={navigateToCategory}
            cartItemCount={cart.reduce(
              (sum, item) => sum + item.quantity,
              0,
            )}
          />
        );
      case "catalog":
        return (
          <ProductCatalog
            onNavigate={setCurrentPage}
            onProductClick={navigateToProduct}
            category={selectedCategory}
            cartItemCount={cart.reduce(
              (sum, item) => sum + item.quantity,
              0,
            )}
          />
        );
      case "product-detail":
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onNavigate={setCurrentPage}
            onAddToCart={addToCart}
            cartItemCount={cart.reduce(
              (sum, item) => sum + item.quantity,
              0,
            )}
          />
        ) : null;
      case "cart":
        return (
          <ShoppingCart
            cart={cart}
            onNavigate={setCurrentPage}
            onUpdateQuantity={updateCartQuantity}
          />
        );
      case "checkout":
        return (
          <Checkout
            cart={cart}
            onNavigate={setCurrentPage}
            onCompleteOrder={() => {
              setCart([]);
              setCurrentPage("home");
            }}
          />
        );
      case "login":
        return <LoginRegister onLogin={handleLogin} />;
      case "farmer-dashboard":
        return <FarmerDashboard onNavigate={setCurrentPage} />;
      case "farmer-orders":
        return <FarmerOrders onNavigate={setCurrentPage} />;
      case "farmer-products":
        return <FarmerProducts onNavigate={setCurrentPage} />;
      case "recipes":
        return (
          <RecipeInspiration onNavigate={setCurrentPage} />
        );
      default:
        return (
          <Homepage
            onNavigate={setCurrentPage}
            onProductClick={navigateToProduct}
            onCategoryClick={navigateToCategory}
            cartItemCount={cart.reduce(
              (sum, item) => sum + item.quantity,
              0,
            )}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {showWelcome ? (
        <WelcomeIntro onComplete={() => setShowWelcome(false)} />
      ) : (
        renderPage()
      )}
    </div>
  );
}

export default App;