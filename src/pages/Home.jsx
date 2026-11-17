import React from 'react';
import { ArrowRight, Calculator, TreePine } from 'lucide-react';
import { initialCategories } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

export default function Home({ setActivePage, setSelectedCategory, selectProduct, addToCart, products }) {
  const { language, t, getTranslatedCategories, getTranslatedProducts } = useLanguage();
  const translatedCategories = getTranslatedCategories(initialCategories);
  const translatedProducts = getTranslatedProducts(products);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setActivePage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredProducts = translatedProducts.slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&q=80&w=1600" 
            alt="Gudang Kayu" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-800/40 border border-amber-600/40 px-4 py-1.5 rounded-full text-amber-300 text-xs font-semibold backdrop-blur-sm">
              <TreePine className="w-4 h-4" /> CV ARIFIN FARM — {t('subtitle')}
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-serif text-white leading-tight">
              {t('heroTitle')}
            </h1>
            
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => { setActivePage('catalog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-4 rounded-xl shadow-xl flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer text-base"
              >
                {t('exploreCatalog')} <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => { setActivePage('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold px-6 py-4 rounded-xl shadow flex items-center gap-2 transition-colors cursor-pointer text-base"
              >
                <Calculator className="w-5 h-5 text-amber-500" /> {t('nav.calculator')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-stone-900 text-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-amber-900/30">
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black font-serif text-amber-500">20+</p>
            <p className="text-xs sm:text-sm text-stone-400">{language === 'en' ? 'Years of Experience' : 'Tahun Pengalaman'}</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black font-serif text-amber-500">5.000+</p>
            <p className="text-xs sm:text-sm text-stone-400">{language === 'en' ? 'Projects Supplied' : 'Proyek Tersuplai'}</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black font-serif text-amber-500">100%</p>
            <p className="text-xs sm:text-sm text-stone-400">{language === 'en' ? 'Legal Certified Timber' : 'Kayu Legal SVLK'}</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-black font-serif text-amber-500">15+</p>
            <p className="text-xs sm:text-sm text-stone-400">{language === 'en' ? 'Main Wood Types' : 'Jenis Kayu Utama'}</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase bg-amber-100 px-3 py-1 rounded-full">
            {language === 'en' ? 'Selected Categories' : 'Kategori Pilihan'}
          </span>
          <h2 className="text-3xl font-bold font-serif text-stone-900">
            {language === 'en' ? 'Explore Our Timber Categories' : 'Jelajahi Kategori Kayu Kami'}
          </h2>
          <p className="text-stone-600 text-sm">
            {language === 'en' 
              ? 'Discover various high-quality wood material types for your building construction and furniture craftsmanship needs.' 
              : 'Temukan berbagai jenis material kayu berkualitas tinggi sesuai kebutuhan konstruksi bangunan maupun kerajinan mebel Anda.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {translatedCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-600/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:bg-amber-800 group-hover:text-white transition-colors">
                  <TreePine className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-800">
                <span>{language === 'en' ? 'View Products' : 'Lihat Produk'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-2">
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase bg-amber-100 px-3 py-1 rounded-full">
              {language === 'en' ? 'Featured Catalog' : 'Katalog Unggulan'}
            </span>
            <h2 className="text-3xl font-bold font-serif text-stone-900">{t('featuredProductsTitle')}</h2>
          </div>
          <button
            onClick={() => { setActivePage('catalog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 font-semibold text-sm cursor-pointer"
          >
            {t('viewAllProducts')} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-stone-900/80 text-amber-400 text-[11px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    {p.grade}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">{p.woodType}</span>
                  <h3 
                    onClick={() => selectProduct(p)}
                    className="font-bold text-stone-900 hover:text-amber-800 cursor-pointer line-clamp-1 text-base transition-colors"
                  >
                    {p.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2">{p.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[10px] text-stone-400 block">{t('price')}</span>
                  <span className="text-sm font-bold text-amber-900">
                    Rp {p.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(p)}
                  className="bg-amber-800 hover:bg-amber-900 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow transition-colors cursor-pointer"
                >
                  {t('addToCart')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-amber-400 font-semibold text-xs tracking-widest uppercase bg-amber-950 px-3 py-1 rounded-full border border-amber-800/40">
              {language === 'en' ? 'Our Advantages' : 'Keunggulan Kami'}
            </span>
            <h2 className="text-3xl font-bold font-serif text-white">{t('featuresTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-800/60 p-8 rounded-2xl border border-stone-700 space-y-4">
              <div className="w-14 h-14 rounded-xl bg-amber-800/30 text-amber-400 flex items-center justify-center border border-amber-600/30">
                <TreePine className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('feature1Title')}</h3>
              <p className="text-sm text-stone-300 leading-relaxed">{t('feature1Desc')}</p>
            </div>

            <div className="bg-stone-800/60 p-8 rounded-2xl border border-stone-700 space-y-4">
              <div className="w-14 h-14 rounded-xl bg-amber-800/30 text-amber-400 flex items-center justify-center border border-amber-600/30">
                <Calculator className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('feature2Title')}</h3>
              <p className="text-sm text-stone-300 leading-relaxed">{t('feature2Desc')}</p>
            </div>

            <div className="bg-stone-800/60 p-8 rounded-2xl border border-stone-700 space-y-4">
              <div className="w-14 h-14 rounded-xl bg-amber-800/30 text-amber-400 flex items-center justify-center border border-amber-600/30">
                <ArrowRight className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('feature3Title')}</h3>
              <p className="text-sm text-stone-300 leading-relaxed">{t('feature3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
