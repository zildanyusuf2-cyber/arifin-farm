import React, { useState } from 'react';
import { Search, ArrowUpDown, ShoppingCart, Eye } from 'lucide-react';
import { initialCategories } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

export default function Catalog({ products, selectedCategory, setSelectedCategory, selectProduct, addToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high'
  const { language, t, getTranslatedCategories, getTranslatedProducts } = useLanguage();

  const translatedCategories = getTranslatedCategories(initialCategories);
  const translatedProducts = getTranslatedProducts(products);

  // Filter products
  const filteredProducts = translatedProducts.filter((p) => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.woodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.id - a.id; // popular / default
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase bg-amber-100 px-3 py-1 rounded-full">
          {language === 'en' ? 'Complete Catalog' : 'Katalog Lengkap'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">
          {language === 'en' ? 'Timber & Construction Material Selection' : 'Pilihan Kayu & Material Konstruksi'}
        </h1>
        <p className="text-stone-600 text-sm">
          {language === 'en'
            ? 'All our wood products are quality guaranteed, available in various sizes and grades ready to ship to your location.'
            : 'Semua produk kayu kami terjamin kualitasnya, tersedia dalam berbagai ukuran dan grade siap kirim ke lokasi Anda.'
          }
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-12 pr-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <ArrowUpDown className="w-4 h-4 text-stone-500" />
            <span className="text-xs text-stone-500 font-medium">{language === 'en' ? 'Sort by:' : 'Urutkan:'}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 font-medium focus:outline-none focus:border-amber-600"
            >
              <option value="popular">{language === 'en' ? 'Most Relevant / Latest' : 'Paling Sesuai / Terbaru'}</option>
              <option value="price-low">{language === 'en' ? 'Lowest Price' : 'Harga Terendah'}</option>
              <option value="price-high">{language === 'en' ? 'Highest Price' : 'Harga Tertinggi'}</option>
            </select>
          </div>

        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === ''
                ? 'bg-amber-800 text-white shadow'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {t('allCategories')}
          </button>
          {translatedCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-800 text-white shadow'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="py-24 text-center space-y-4 bg-white rounded-2xl border border-stone-200">
          <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">{language === 'en' ? 'Product Not Found' : 'Produk Tidak Ditemukan'}</h3>
          <p className="text-sm text-stone-500 max-w-sm mx-auto">
            {language === 'en' 
              ? 'No wood products match the keyword or category you selected. Try another keyword.'
              : 'Tidak ada produk kayu yang cocok dengan kata kunci atau kategori yang Anda pilih. Coba kata kunci lain.'
            }
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory(''); }}
            className="bg-amber-800 text-white px-6 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
          >
            {language === 'en' ? 'Reset Filter' : 'Reset Filter'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="relative h-60 overflow-hidden bg-stone-100">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-stone-900/80 text-amber-400 text-xs font-semibold px-3 py-1 rounded-lg backdrop-blur-sm">
                    {p.grade}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 text-stone-800 text-xs font-semibold px-2.5 py-1 rounded-lg shadow">
                    {language === 'en' ? 'Stock:' : 'Stok:'} {p.stock}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">{p.woodType}</span>
                  <h3 
                    onClick={() => selectProduct(p)}
                    className="font-bold text-stone-900 hover:text-amber-800 cursor-pointer text-lg leading-snug"
                  >
                    {p.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{p.description}</p>
                  <p className="text-xs font-medium text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                    📐 {p.dimensions}
                  </p>
                </div>
              </div>
              
              <div className="p-6 pt-0 border-t border-stone-100 flex flex-col gap-4">
                <div className="flex items-baseline justify-between pt-4">
                  <div>
                    <span className="text-xs text-stone-400 block">{language === 'en' ? 'Unit Price' : 'Harga Satuan'}</span>
                    <span className="text-lg font-bold text-amber-950 font-serif">Rp {p.price.toLocaleString('id-ID')}</span>
                  </div>
                  <span className="text-xs text-stone-500 font-medium">/ {p.unit}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => selectProduct(p)}
                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" /> {t('details')}
                  </button>
                  <button
                    onClick={() => addToCart(p)}
                    className="w-full bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold py-3 rounded-xl transition-colors cursor-pointer shadow flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> {t('addToCart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
