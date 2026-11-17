import React from 'react';
import { TreePine, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { storeInfo, initialCategories } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ setActivePage, setSelectedCategory }) {
  const { t, getTranslatedCategories } = useLanguage();
  const translatedCategories = getTranslatedCategories(initialCategories);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setActivePage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-800 flex items-center justify-center text-white">
                <TreePine className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold font-serif text-white tracking-wider">
                ARIFIN <span className="text-amber-500">FARM</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              {t('footerDesc')}
            </p>
            <div className="pt-2">
              <a 
                href={`https://wa.me/${storeInfo.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow"
              >
                <Phone className="w-4 h-4" /> {t('contactWhatsApp')}
              </a>
            </div>
          </div>

          {/* Col 2: Kategori Kayu */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-l-4 border-amber-600 pl-3">
              {t('woodCategories')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {translatedCategories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-2 text-stone-400 text-left cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600" /> {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigasi Cepat */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-l-4 border-amber-600 pl-3">
              {t('mainMenu')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: t('nav.home') },
                { id: 'catalog', label: t('nav.catalog') },
                { id: 'calculator', label: t('nav.calculator') },
                { id: 'about', label: t('nav.about') },
                { id: 'gallery', label: t('nav.gallery') },
                { id: 'articles', label: t('nav.articles') },
                { id: 'contact', label: t('nav.contact') },
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => {
                      setActivePage(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors flex items-center gap-2 text-stone-400 cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600" /> {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Kontak & Alamat */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-l-4 border-amber-600 pl-3">
              {t('contactOperational')}
            </h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{storeInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <span>{storeInfo.whatsappDisplay}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${storeInfo.email}&su=Inkuiri%20Resmi%20Arifin%20Farm`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  {storeInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{t('hours')}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer / Notice Box */}
        <div className="mb-8 p-4 rounded-xl bg-amber-950/40 border border-amber-800/40 text-stone-300 text-sm text-center leading-relaxed">
          Website ini dibuat untuk memberi gambaran Anda tentang produk kami. Disarankan untuk menghubungi kontak yang tersedia untuk memesan lebih lanjut dengan spesifikasi yang lebih detail.
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-900 text-center text-xs text-stone-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} ARIFIN FARM. {t('allRightsReserved')}</p>
          <div className="flex gap-6">
            <span className="hover:text-stone-400 cursor-pointer">{t('privacyPolicy')}</span>
            <span className="hover:text-stone-400 cursor-pointer">{t('termsConditions')}</span>
            <span className="hover:text-stone-400 cursor-pointer">{t('svlkLegality')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
