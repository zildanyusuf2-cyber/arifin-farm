import React from 'react';
import { initialGallery } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

export default function Gallery() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase bg-amber-100 px-3 py-1 rounded-full">
          {language === 'en' ? 'Field Documentation' : 'Dokumentasi Lapangan'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">{t('galleryTitle')}</h1>
        <p className="text-stone-600 text-sm">
          {t('gallerySubtitle')}
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialGallery.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="relative h-72 overflow-hidden bg-stone-100">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-stone-900/80 text-amber-400 text-xs font-semibold px-3 py-1 rounded-xl backdrop-blur-sm">
                {item.category}
              </span>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-bold text-stone-900 text-base font-serif">{item.title}</h3>
              <p className="text-xs text-stone-500">
                {language === 'en' ? 'Official Arifin Farm operational facility.' : 'Fasilitas operasional resmi Arifin Farm.'}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
