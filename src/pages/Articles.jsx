import React, { useState } from 'react';
import { Clock, ArrowRight, X } from 'lucide-react';
import { initialArticles } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

export default function Articles() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase bg-amber-100 px-3 py-1 rounded-full">
          {language === 'en' ? 'Education & Tips' : 'Edukasi & Tips'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">{t('articlesTitle')}</h1>
        <p className="text-stone-600 text-sm">
          {t('articlesSubtitle')}
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {initialArticles.map((art) => (
          <div key={art.id} className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="relative h-52 overflow-hidden bg-stone-100">
                <img 
                  src={art.image} 
                  alt={art.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-stone-900/80 text-amber-400 text-xs font-semibold px-3 py-1 rounded-lg backdrop-blur-sm">
                  {art.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span>📅 {art.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {art.readTime}</span>
                </div>
                <h3 
                  onClick={() => setSelectedArticle(art)}
                  className="font-bold text-stone-900 hover:text-amber-800 cursor-pointer text-lg font-serif leading-snug"
                >
                  {art.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">{art.excerpt}</p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-100 pt-4">
              <button
                onClick={() => setSelectedArticle(art)}
                className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 font-semibold text-xs cursor-pointer"
              >
                {t('readMore')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white text-stone-900 w-full max-w-3xl max-h-[90vh] rounded-3xl flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full uppercase">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">{selectedArticle.title}</h2>
              <div className="flex items-center gap-4 text-xs text-stone-500">
                <span>📅 {selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-80 object-cover rounded-2xl" />
              <div className="prose text-stone-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p className="font-semibold text-stone-900">{selectedArticle.excerpt}</p>
                <p>{selectedArticle.content}</p>
                <p>
                  {language === 'en'
                    ? 'For more in-depth consultation regarding wood type selection or wood pellets for your architectural or furniture specifications, please contact the Arifin Farm expert team via WhatsApp.'
                    : 'Untuk konsultasi lebih mendalam mengenai pemilihan jenis kayu atau wood pellet yang paling tepat untuk spesifikasi arsitektur atau mebel Anda, silakan hubungi tim ahli Arifin Farm via WhatsApp.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
