import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Phone, ShieldCheck, Truck, Ruler } from 'lucide-react';
import { storeInfo } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

export default function ProductDetail({ product, goBack, addToCart, products, selectProduct }) {
  const [quantity, setQuantity] = useState(1);
  const { language, t } = useLanguage();

  if (!product) return null;

  const totalPrice = product.price * quantity;

  const handleWhatsAppOrder = () => {
    let message = language === 'en'
      ? `*PRODUCT ORDER - ARIFIN FARM*\n\n` +
        `🪵 *Product:* ${product.name}\n` +
        `🏷️ *Wood Type:* ${product.woodType} (${product.grade})\n` +
        `📐 *Dimensions:* ${product.dimensions}\n` +
        `🔢 *Quantity:* ${quantity} ${product.unit}\n` +
        `💰 *Estimated Total:* *Rp ${totalPrice.toLocaleString('id-ID')}*\n\n` +
        `Please confirm stock availability and shipping costs. Thank you!`
      : `*PEMESANAN PRODUK - ARIFIN FARM*\n\n` +
        `🪵 *Produk:* ${product.name}\n` +
        `🏷️ *Jenis Kayu:* ${product.woodType} (${product.grade})\n` +
        `📐 *Dimensi:* ${product.dimensions}\n` +
        `🔢 *Jumlah:* ${quantity} ${product.unit}\n` +
        `💰 *Estimasi Total:* *Rp ${totalPrice.toLocaleString('id-ID')}*\n\n` +
        `Mohon konfirmasi ketersediaan stok dan biaya pengiriman. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${storeInfo.phone}?text=${encoded}`, '_blank');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Back Button */}
      <button
        onClick={goBack}
        className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-semibold text-sm cursor-pointer bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" /> {t('backToCatalog')}
      </button>

      {/* Main Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
        
        {/* Image */}
        <div className="space-y-4">
          <div className="relative h-96 sm:h-[450px] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-stone-900/90 text-amber-400 text-xs font-semibold px-3.5 py-1.5 rounded-xl backdrop-blur-sm shadow">
              {product.grade}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0" />
              <div>
                <p className="text-xs font-bold text-stone-900">Legal SVLK</p>
                <p className="text-[11px] text-stone-500">{language === 'en' ? '100% Official Wood' : '100% Kayu Resmi'}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex items-center gap-3">
              <Truck className="w-6 h-6 text-amber-700 shrink-0" />
              <div>
                <p className="text-xs font-bold text-stone-900">{language === 'en' ? 'Ready to Ship' : 'Siap Kirim'}</p>
                <p className="text-[11px] text-stone-500">{language === 'en' ? 'Own Fleet' : 'Armada Sendiri'}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex items-center gap-3">
              <Ruler className="w-6 h-6 text-amber-700 shrink-0" />
              <div>
                <p className="text-xs font-bold text-stone-900">{language === 'en' ? 'Precision' : 'Presisi'}</p>
                <p className="text-[11px] text-stone-500">{language === 'en' ? 'Accurate Size' : 'Ukuran Akurat'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info & Order Box */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full uppercase">
                {product.woodType}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {language === 'en' ? 'Stock Available:' : 'Stok Tersedia:'} <strong className="text-stone-900">{product.stock} {product.unit.split(' ')[0]}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              {product.name}
            </h1>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 space-y-1">
              <span className="text-xs text-stone-400 block">{t('price')}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-amber-950 font-serif">Rp {product.price.toLocaleString('id-ID')}</span>
                <span className="text-sm font-medium text-stone-500">/ {product.unit}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{t('dimensions')}</h3>
              <p className="text-sm font-semibold text-stone-800 bg-amber-50/50 p-3 rounded-xl border border-amber-200/40">
                📐 {product.dimensions}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{language === 'en' ? 'Description & Benefits' : 'Deskripsi & Keunggulan'}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Quantity & Action buttons */}
          <div className="space-y-4 pt-6 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">{t('quantity')} ({product.unit}):</span>
              <div className="flex items-center gap-3 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-stone-700 hover:bg-amber-800 hover:text-white transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-stone-900 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-stone-700 hover:bg-amber-800 hover:text-white transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-amber-950 text-amber-100 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-300 block">{t('totalPrice')}</span>
                <span className="text-xl font-bold font-serif text-white">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <span className="text-xs bg-amber-900 text-amber-200 px-3 py-1.5 rounded-xl font-semibold">
                {quantity} {product.unit}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => addToCart({ ...product, quantity })}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold py-4 rounded-2xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingCart className="w-5 h-5 text-amber-400" /> {t('addToCart')}
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-2xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <Phone className="w-5 h-5" /> {t('consultNow')}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-stone-200">
          <h2 className="text-2xl font-bold font-serif text-stone-900">
            {language === 'en' ? 'Related Products' : 'Produk Serupa Lainnya'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <div 
                key={p.id} 
                onClick={() => selectProduct(p)}
                className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition-all cursor-pointer space-y-3 group"
              >
                <div className="h-40 rounded-xl overflow-hidden bg-stone-100">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-bold text-stone-900 group-hover:text-amber-800 text-sm line-clamp-1">{p.name}</h3>
                <p className="text-amber-900 font-bold text-sm">Rp {p.price.toLocaleString('id-ID')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
