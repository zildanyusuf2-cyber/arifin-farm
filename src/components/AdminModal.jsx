import React, { useState, useEffect } from 'react';
import { X, Shield, Package, ShoppingCart, Plus, Trash2, CheckCircle, Clock, DollarSign, LogOut } from 'lucide-react';
import { initialCategories } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function AdminModal({ isOpen, onClose, products, addProduct, deleteProduct, orders, updateOrderStatus }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const { language, t } = useLanguage();

  // Form add product state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('jati');
  const [newProdWoodType, setNewProdWoodType] = useState('Kayu Jati');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdUnit, setNewProdUnit] = useState('m³ (Meter Kubik)');
  const [newProdGrade, setNewProdGrade] = useState('Grade A');
  const [newProdStock, setNewProdStock] = useState('');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdDim, setNewProdDim] = useState('');

  // Sesi login diambil dari Supabase Auth (bukan password di kode)
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.auth.getSession().then(({ data }) => setIsLoggedIn(Boolean(data.session)));
  }, []);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      alert('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: username, password });
    if (error) {
      alert(language === 'en' ? 'Incorrect email or password.' : 'Email atau password salah.');
    } else {
      setPassword('');
      setIsLoggedIn(true);
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) {
      alert(language === 'en' ? 'Product Name and Price are required.' : 'Nama dan Harga produk wajib diisi.');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: newProdName,
      category: newProdCategory,
      woodType: newProdWoodType,
      price: Number(newProdPrice),
      unit: newProdUnit,
      grade: newProdGrade,
      stock: Number(newProdStock) || 10,
      image: newProdImage || 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&q=80&w=800',
      description: newProdDesc || 'Produk berkualitas tinggi dari Arifin Farm.',
      dimensions: newProdDim || 'Standar industri',
    };

    const ok = await addProduct(newProduct);
    if (!ok) return;
    alert(language === 'en' ? 'Product successfully added to catalog!' : 'Produk berhasil ditambahkan ke katalog!');
    // Reset form
    setNewProdName('');
    setNewProdPrice('');
    setNewProdStock('');
    setNewProdImage('');
    setNewProdDesc('');
    setNewProdDim('');
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-stone-900 text-stone-100 w-full max-w-5xl h-[90vh] rounded-2xl flex flex-col shadow-2xl border border-stone-800 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-800/30 text-amber-500 border border-amber-700/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white m-0">{t('adminTitle')}</h2>
              <p className="text-xs text-stone-400">
                {language === 'en' ? 'Manage product catalog, stock, and customer orders' : 'Kelola katalog produk, stok, dan pesanan pelanggan'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {!isLoggedIn ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <form onSubmit={handleLogin} className="w-full max-w-md bg-stone-950 p-8 rounded-2xl border border-stone-800 space-y-5 shadow-xl">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-amber-800/30 border border-amber-700/30 text-amber-500 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white font-serif">
                  {language === 'en' ? 'Administrator Login' : 'Login Administrator'}
                </h3>
                <p className="text-xs text-stone-400">
                  {language === 'en' ? 'Enter admin account to access dashboard' : 'Masukkan akun admin untuk mengakses dashboard'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="email admin"
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3.5 rounded-xl transition-colors cursor-pointer shadow-lg text-sm"
              >
                {language === 'en' ? 'Login Dashboard' : 'Login Dashboard'}
              </button>

            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Admin Nav Tabs & Logout */}
            <div className="bg-stone-950 px-6 py-3 border-b border-stone-800 flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                    activeTab === 'products'
                      ? 'bg-amber-800 text-white shadow'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <Package className="w-4 h-4" /> {t('productManagement')} ({products.length})
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-amber-800 text-white shadow'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" /> {language === 'en' ? 'Customer Orders' : 'Pesanan Pelanggan'} ({orders.length})
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold bg-stone-900 px-3 py-2 rounded-xl border border-stone-800 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Products Management Tab */}
              {activeTab === 'products' ? (
                <div className="space-y-8">
                  
                  {/* Add Product Form */}
                  <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-4">
                    <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
                      <Plus className="w-5 h-5 text-amber-500" /> {t('addProduct')}
                    </h3>

                    <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-stone-400 mb-1">{t('productName')}</label>
                        <input
                          type="text"
                          required
                          value={newProdName}
                          onChange={(e) => setNewProdName(e.target.value)}
                          placeholder="Cth: Papan Jati Perhutani"
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">{t('category')}</label>
                        <select
                          value={newProdCategory}
                          onChange={(e) => {
                            setNewProdCategory(e.target.value);
                            const catObj = initialCategories.find(c => c.id === e.target.value);
                            if (catObj) setNewProdWoodType(catObj.name);
                          }}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          {initialCategories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">{t('price')} (Rp)</label>
                        <input
                          type="number"
                          required
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(e.target.value)}
                          placeholder="10000000"
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">{language === 'en' ? 'Stock' : 'Stok'}</label>
                        <input
                          type="number"
                          value={newProdStock}
                          onChange={(e) => setNewProdStock(e.target.value)}
                          placeholder="15"
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">{language === 'en' ? 'Grade / Quality' : 'Grade / Kualitas'}</label>
                        <input
                          type="text"
                          value={newProdGrade}
                          onChange={(e) => setNewProdGrade(e.target.value)}
                          placeholder="Grade A"
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-400 mb-1">{language === 'en' ? 'Image URL' : 'URL Gambar'}</label>
                        <input
                          type="url"
                          value={newProdImage}
                          onChange={(e) => setNewProdImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-xs text-stone-400 mb-1">{language === 'en' ? 'Dimensions & Description' : 'Dimensi & Deskripsi'}</label>
                        <input
                          type="text"
                          value={newProdDim}
                          onChange={(e) => setNewProdDim(e.target.value)}
                          placeholder="Tebal 5cm x Lebar 10cm x Panjang 4 Meter"
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white mb-2"
                        />
                        <textarea
                          rows={2}
                          value={newProdDesc}
                          onChange={(e) => setNewProdDesc(e.target.value)}
                          placeholder="Deskripsi produk..."
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white resize-none"
                        ></textarea>
                      </div>

                      <div className="md:col-span-3">
                        <button
                          type="submit"
                          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow"
                        >
                          {t('save')} Produk Baru
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Products Table */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                      {language === 'en' ? 'Product Catalog List' : 'Daftar Katalog Produk'}
                    </h3>
                    <div className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-900 text-stone-400 border-b border-stone-800">
                          <tr>
                            <th className="p-3">Produk</th>
                            <th className="p-3">Kategori</th>
                            <th className="p-3">Harga</th>
                            <th className="p-3">Stok</th>
                            <th className="p-3 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800/60">
                          {products.map((p) => (
                            <tr key={p.id} className="hover:bg-stone-900/50">
                              <td className="p-3 flex items-center gap-3">
                                <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-stone-800" />
                                <div>
                                  <p className="font-bold text-white">{p.name}</p>
                                  <p className="text-[10px] text-stone-400">{p.grade}</p>
                                </div>
                              </td>
                              <td className="p-3 text-amber-400 font-medium uppercase">{p.category}</td>
                              <td className="p-3 font-semibold text-white">Rp {p.price.toLocaleString('id-ID')}</td>
                              <td className="p-3 font-semibold text-stone-300">{p.stock}</td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => deleteProduct(p.id)}
                                  className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 hover:text-white cursor-pointer transition-colors"
                                  title={t('delete')}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              ) : (
                /* Orders Management Tab */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-1">
                      <span className="text-xs text-stone-400">Total Transaksi Masuk</span>
                      <p className="text-2xl font-black font-serif text-white">{orders.length} Pesanan</p>
                    </div>
                    <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-1">
                      <span className="text-xs text-stone-400">Estimasi Total Pendapatan</span>
                      <p className="text-2xl font-black font-serif text-amber-400">Rp {totalRevenue.toLocaleString('id-ID')}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Riwayat Pesanan Pelanggan</h3>
                    {orders.length === 0 ? (
                      <div className="bg-stone-950 p-16 rounded-2xl border border-stone-800 text-center text-stone-500">
                        Belum ada pesanan yang masuk melalui keranjang WhatsApp.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-stone-800 pb-3">
                              <div>
                                <span className="text-xs font-bold text-amber-500">{order.id}</span>
                                <span className="text-xs text-stone-400 ml-3">📅 {order.date}</span>
                              </div>
                              <span className="px-3 py-1 bg-amber-900/40 text-amber-300 text-xs font-semibold rounded-full border border-amber-700/30">
                                {order.status}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                              <div>
                                <p className="text-stone-400">Pemesan:</p>
                                <p className="font-bold text-white text-sm">{order.customerName} ({order.customerPhone})</p>
                              </div>
                              <div>
                                <p className="text-stone-400">Alamat Pengiriman:</p>
                                <p className="font-semibold text-stone-200">{order.customerAddress}</p>
                              </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-stone-800/60">
                              <p className="text-xs font-semibold text-stone-400">Daftar Item:</p>
                              <div className="space-y-1">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between text-xs text-stone-300">
                                    <span>{idx + 1}. {item.name} x {item.quantity} {item.unit}</span>
                                    <span className="font-semibold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-stone-800">
                              <span className="text-xs text-stone-400 font-semibold">Total Pembayaran:</span>
                              <span className="text-base font-bold text-amber-400 font-serif">Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
