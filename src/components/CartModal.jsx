import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, CheckCircle2, Phone } from 'lucide-react';
import { storeInfo } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

export default function CartModal({ isOpen, onClose, cart, updateQuantity, removeItem, clearCart, addOrder }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [successSent, setSuccessSent] = useState(false);
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutWA = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert(language === 'en' ? 'Please complete Name, WhatsApp Number, and Shipping Address.' : 'Mohon lengkapi Nama, Nomor WhatsApp, dan Alamat Pengiriman.');
      return;
    }

    // Save order to admin dashboard
    const newOrder = {
      id: 'TRX-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      customerName,
      customerPhone,
      customerAddress,
      notes,
      items: cart,
      totalPrice,
      status: 'Pending'
    };
    addOrder(newOrder);

    // Build WhatsApp message
    let message = language === 'en'
      ? `*NEW ORDER - ARIFIN FARM*\n\n` +
        `👤 *Name:* ${customerName}\n` +
        `📞 *WhatsApp No.:* ${customerPhone}\n` +
        `📍 *Address:* ${customerAddress}\n` +
        (notes ? `📝 *Notes:* ${notes}\n\n` : '\n') +
        `📦 *Order Items:*\n`
      : `*PESANAN BARU - ARIFIN FARM*\n\n` +
        `👤 *Nama:* ${customerName}\n` +
        `📞 *No. WhatsApp:* ${customerPhone}\n` +
        `📍 *Alamat:* ${customerAddress}\n` +
        (notes ? `📝 *Catatan:* ${notes}\n\n` : '\n') +
        `📦 *Daftar Pesanan:*\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.quantity} ${item.unit}) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });
    
    message += language === 'en'
      ? `\n💰 *Estimated Total:* *Rp ${totalPrice.toLocaleString('id-ID')}*\n\n` +
        `Please confirm availability and shipping costs. Thank you!`
      : `\n💰 *Total Estimasi:* *Rp ${totalPrice.toLocaleString('id-ID')}*\n\n` +
        `Mohon konfirmasi ketersediaan dan total biaya pengiriman. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${storeInfo.phone}?text=${encoded}`, '_blank');

    setSuccessSent(true);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="bg-stone-900 text-stone-100 w-full max-w-lg h-full flex flex-col shadow-2xl border-l border-stone-800">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-800/30 text-amber-500 border border-amber-700/30">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white m-0">{t('cartTitle')}</h2>
              <p className="text-xs text-stone-400">
                {cart.length} {language === 'en' ? 'product types selected' : 'jenis produk dipilih'}
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {successSent ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-20 h-20 bg-green-600/20 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white font-serif">
                {language === 'en' ? 'Order Sent Successfully!' : 'Pesanan Berhasil Dikirim!'}
              </h3>
              <p className="text-stone-400 max-w-sm mx-auto text-sm">
                {language === 'en'
                  ? 'Your order has been recorded in our system and forwarded to Arifin Farm WhatsApp Admin. Admin will contact you soon to confirm delivery.'
                  : 'Detail pesanan telah tercatat di sistem kami dan diteruskan ke WhatsApp Admin Arifin Farm. Admin akan segera menghubungi Anda untuk konfirmasi pengiriman.'
                }
              </p>
              <button
                onClick={() => { setSuccessSent(false); onClose(); }}
                className="mt-4 bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer shadow"
              >
                {language === 'en' ? 'Continue Shopping' : 'Kembali Belanja'}
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-stone-800 text-stone-600 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-stone-300">{t('cartEmpty')}</h3>
              <p className="text-sm text-stone-500 max-w-xs mx-auto">
                {language === 'en' ? 'No wood products added yet. Please explore our product catalog.' : 'Belum ada produk kayu yang ditambahkan. Silakan jelajahi katalog produk kami.'}
              </p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                  {language === 'en' ? 'Order Items' : 'Daftar Produk'}
                </h3>
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-stone-800/60 border border-stone-800 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg shrink-0 border border-stone-700" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-white truncate">{item.name}</h4>
                      <p className="text-xs text-amber-400 font-medium">Rp {item.price.toLocaleString('id-ID')} / {item.unit}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded bg-stone-700 text-white flex items-center justify-center font-bold text-xs hover:bg-stone-600 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded bg-stone-700 text-white flex items-center justify-center font-bold text-xs hover:bg-stone-600 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-stone-400 hover:text-red-400 cursor-pointer transition-colors"
                      title={language === 'en' ? 'Remove' : 'Hapus'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckoutWA} className="space-y-4 pt-4 border-t border-stone-800">
                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">{t('checkout')}</h3>
                
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">{t('customerName')}</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={language === 'en' ? 'Full Name' : 'Nama Lengkap'}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">{t('customerPhone')}</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="08123456789"
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">{t('shippingAddress')}</label>
                  <textarea
                    required
                    rows={2}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder={language === 'en' ? 'Complete delivery address & city' : 'Alamat lengkap & kota tujuan pengiriman'}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-600 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">{t('notes')}</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={language === 'en' ? 'e.g. Request specific wood cut' : 'mis. Request potongan khusus / ekspedisi tertentu'}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="pt-4 border-t border-stone-800 space-y-3">
                  <div className="flex justify-between items-center text-base font-bold text-white">
                    <span>{t('total')}:</span>
                    <span className="text-amber-400 font-serif text-xl">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2 text-sm"
                  >
                    <Phone className="w-5 h-5" /> {t('confirmOrderWhatsApp')}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
