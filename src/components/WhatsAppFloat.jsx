import React from 'react';
import { PhoneCall } from 'lucide-react';
import { storeInfo } from '../data/initialData';

export default function WhatsAppFloat() {
  const handleClick = () => {
    const text = encodeURIComponent("Halo Admin Arifin Farm, saya ingin bertanya mengenai ketersediaan dan harga produk.");
    window.open(`https://wa.me/${storeInfo.phone}?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group cursor-pointer border-2 border-white/20"
      title="Konsultasi via WhatsApp"
    >
      <PhoneCall className="w-7 h-7 animate-bounce" />
      <span className="absolute right-full mr-3 bg-stone-900 text-white text-xs font-medium px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat WhatsApp Admin
      </span>
    </button>
  );
}
