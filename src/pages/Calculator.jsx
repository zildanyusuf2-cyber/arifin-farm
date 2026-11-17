import React, { useState } from 'react';
import { Calculator as CalcIcon, Phone } from 'lucide-react';
import { storeInfo } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

export default function Calculator() {
  const [thickness, setThickness] = useState(5); // cm
  const [width, setWidth] = useState(10); // cm
  const [length, setLength] = useState(4); // meter
  const [quantity, setQuantity] = useState(10); // pcs
  const [pricePerM3, setPricePerM3] = useState(7500000); // Rp per m³
  const { language, t } = useLanguage();

  // Formula Kubikasi (m³) = (Tebal cm * Lebar cm * Panjang m * Jumlah Pcs) / 10.000
  const totalVolumeM3 = (thickness * width * length * quantity) / 10000;
  const estimatedTotalPrice = totalVolumeM3 * pricePerM3;

  const handleWhatsAppConsult = () => {
    let msg = language === 'en'
      ? `*TIMBER REQUIREMENT CALCULATION CONSULT - ARIFIN FARM*\n\n` +
        `📐 *Dimensions:* Thickness ${thickness} cm x Width ${width} cm x Length ${length} m\n` +
        `🔢 *Quantity:* ${quantity} Pcs\n` +
        `📦 *Estimated Cubic:* ${totalVolumeM3.toFixed(4)} m³\n` +
        `💰 *Estimated Cost:* Rp ${Math.round(estimatedTotalPrice).toLocaleString('id-ID')}\n\n` +
        `Please confirm availability and best price offer. Thank you!`
      : `*KONSULTASI PERHITUNGAN KEBUTUHAN KAYU - ARIFIN FARM*\n\n` +
        `📐 *Dimensi:* Tebal ${thickness} cm x Lebar ${width} cm x Panjang ${length} m\n` +
        `🔢 *Jumlah Batang:* ${quantity} Pcs\n` +
        `📦 *Estimasi Kubikasi:* ${totalVolumeM3.toFixed(4)} m³\n` +
        `💰 *Estimasi Biaya:* Rp ${Math.round(estimatedTotalPrice).toLocaleString('id-ID')}\n\n` +
        `Mohon bantuan konfirmasi ketersediaan dan penawaran harga terbaik. Terima kasih!`;

    window.open(`https://wa.me/${storeInfo.phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase bg-amber-100 px-3 py-1 rounded-full">
          {language === 'en' ? 'Project Tool' : 'Alat Bantu Proyek'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">{t('calcTitle')}</h1>
        <p className="text-stone-600 text-sm">
          {t('calcSubtitle')}
        </p>
      </div>

      {/* Calculator Card */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Input Form */}
        <div className="space-y-6">
          <h3 className="text-base font-bold text-stone-950 font-serif flex items-center gap-2 border-b border-stone-100 pb-3">
            <CalcIcon className="w-5 h-5 text-amber-700" /> {language === 'en' ? 'Enter Wood Specifications' : 'Masukkan Spesifikasi Kayu'}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">{t('thickness')}</label>
              <input
                type="number"
                min="1"
                value={thickness}
                onChange={(e) => setThickness(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">{t('width')}</label>
              <input
                type="number"
                min="1"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">{t('length')}</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">{t('pcsCount')}</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">{language === 'en' ? 'Estimated Price per m³ (Rp)' : 'Estimasi Harga per m³ (Rp)'}</label>
              <input
                type="number"
                step="500000"
                value={pricePerM3}
                onChange={(e) => setPricePerM3(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Results Box */}
        <div className="bg-stone-900 text-stone-100 p-8 rounded-2xl flex flex-col justify-between space-y-6 shadow-xl">
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-serif text-white border-b border-stone-800 pb-3">
              {t('calculateResult')}
            </h3>

            <div className="space-y-4">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 block mb-1">{t('totalVolume')}</span>
                <p className="text-2xl font-black text-amber-400 font-serif">{totalVolumeM3.toFixed(4)} m³</p>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 block mb-1">{t('estimatedCost')}</span>
                <p className="text-2xl font-black text-white font-serif">Rp {Math.round(estimatedTotalPrice).toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleWhatsAppConsult}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            <Phone className="w-5 h-5" /> {t('consultThisCalculation')}
          </button>
        </div>

      </div>

    </div>
  );
}
