import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import CartModal from './components/CartModal';
import AdminModal from './components/AdminModal';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Calculator from './pages/Calculator';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Articles from './pages/Articles';
import Contact from './pages/Contact';

import { initialProducts } from './data/initialData';
import { supabase, isSupabaseConfigured, productFromRow, productToRow, orderFromRow, orderToRow } from './lib/supabase';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home', 'catalog', 'detail', 'calculator', 'about', 'gallery', 'articles', 'contact'
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Produk: dari Supabase (fallback ke data awal bila belum dikonfigurasi / gagal)
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const loadProducts = async () => {
    if (!isSupabaseConfigured) return;
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (error) { console.error('Gagal memuat produk:', error.message); return; }
    if (data && data.length) setProducts(data.map(productFromRow));
  };

  const loadOrders = async () => {
    if (!isSupabaseConfigured) return;
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) { console.error('Gagal memuat pesanan:', error.message); return; }
    setOrders((data || []).map(orderFromRow));
  };

  useEffect(() => { loadProducts(); }, []);

  // Pantau status login admin; pesanan hanya bisa dibaca saat login
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.auth.getSession().then(({ data }) => setIsAdmin(Boolean(data.session)));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setIsAdmin(Boolean(session)));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdmin) loadOrders(); else setOrders([]);
  }, [isAdmin]);

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('tokoku_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tokoku_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart actions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`Berhasil menambahkan ${product.name} ke keranjang pesanan.`);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Admin actions (ditulis ke Supabase; RLS memastikan hanya admin login yang boleh)
  const addProduct = async (newProduct) => {
    const { error } = await supabase.from('products').insert(productToRow(newProduct));
    if (error) { alert('Gagal menyimpan produk: ' + error.message); return false; }
    await loadProducts();
    return true;
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini dari katalog?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) { alert('Gagal menghapus produk: ' + error.message); return; }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Pelanggan (anon) boleh membuat pesanan, tetapi tidak boleh membacanya
  const addOrder = async (newOrder) => {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.from('orders').insert(orderToRow(newOrder));
    if (error) console.error('Gagal menyimpan pesanan:', error.message);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (error) { alert('Gagal mengubah status: ' + error.message); return; }
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  // Product selection handler
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setActivePage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
        openAdmin={() => setIsAdminOpen(true)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <Home
            setActivePage={setActivePage}
            setSelectedCategory={setSelectedCategory}
            selectProduct={handleSelectProduct}
            addToCart={addToCart}
            products={products}
          />
        )}
        {activePage === 'catalog' && (
          <Catalog
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectProduct={handleSelectProduct}
            addToCart={addToCart}
          />
        )}
        {activePage === 'detail' && (
          <ProductDetail
            product={selectedProduct}
            goBack={() => setActivePage('catalog')}
            addToCart={addToCart}
            products={products}
            selectProduct={handleSelectProduct}
          />
        )}
        {activePage === 'calculator' && <Calculator />}
        {activePage === 'about' && <About />}
        {activePage === 'gallery' && <Gallery />}
        {activePage === 'articles' && <Articles />}
        {activePage === 'contact' && <Contact />}
      </main>

      <Footer
        setActivePage={setActivePage}
        setSelectedCategory={setSelectedCategory}
      />

      <WhatsAppFloat />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        clearCart={clearCart}
        addOrder={addOrder}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        addProduct={addProduct}
        deleteProduct={deleteProduct}
        orders={orders}
        updateOrderStatus={updateOrderStatus}
      />
    </div>
  );
}
