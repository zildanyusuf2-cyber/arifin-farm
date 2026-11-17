import React, { useState } from 'react';
import { TreePine, ShoppingCart, Shield, Menu, X, PhoneCall, Globe } from 'lucide-react';
import { storeInfo } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ activePage, setActivePage, cartCount, openCart, openAdmin, selectedCategory, setSelectedCategory }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'catalog', label: t('nav.catalog') },
    { id: 'calculator', label: t('nav.calculator') },
    { id: 'about', label: t('nav.about') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'articles', label: t('nav.articles') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    if (id === 'catalog' && selectedCategory) {
      setSelectedCategory('');
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(language === 'en' 
      ? "Hello Arifin Farm Admin, I would like to consult regarding timber requirements." 
      : "Halo Admin Arifin Farm, saya ingin berkonsultasi mengenai kebutuhan kayu."
    );
    window.open(`https://wa.me/${storeInfo.phone}?text=${text}`, '_blank');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 shadow-lg border-b border-amber-900/30">
      {/* Top bar */}
      <div className="bg-amber-950 text-amber-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>📍 {t('address')}</span>
            <span className="hidden md:inline">🕒 {t('hours')}</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="hover:text-white flex items-center gap-1.5 bg-amber-900/60 px-2 py-0.5 rounded text-amber-100 font-semibold cursor-pointer border border-amber-700/50"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'id' ? '🇬🇧 EN' : '🇮🇩 ID'}</span>
            </button>
            <button 
              onClick={openAdmin}
              className="hover:text-white flex items-center gap-1 text-amber-300 font-medium cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" /> {t('adminDashboard')}
            </button>
            <a 
              href={`https://wa.me/${storeInfo.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5" /> {storeInfo.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-amber-600/40">
              <TreePine className="w-7 h-7 text-amber-100" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-wider text-amber-50 font-serif m-0">
                CV ARIFIN <span className="text-amber-500">FARM</span>
              </h1>
              <p className="text-[10px] text-stone-400 tracking-wider">{t('subtitle')}</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activePage === item.id
                    ? 'bg-amber-800 text-white shadow'
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 transition-colors border border-stone-700 cursor-pointer flex items-center gap-2"
              title={t('cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-semibold">{t('cart')}</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={handleWhatsAppChat}
              className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-t border-stone-800 px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          <div className="flex justify-between items-center py-2 px-3 bg-stone-800 rounded-xl mb-2">
            <span className="text-xs text-stone-300 font-medium">Bahasa / Language:</span>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-amber-900 text-amber-100 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'id' ? 'English (EN)' : 'Bahasa Indonesia (ID)'}</span>
            </button>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                activePage === item.id
                  ? 'bg-amber-800 text-white'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAdmin();
              }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-amber-400 bg-stone-800 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" /> {t('adminDashboard')}
            </button>
            <button
              onClick={handleWhatsAppChat}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl text-center font-semibold flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-5 h-5" /> {t('whatsappConsult')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
