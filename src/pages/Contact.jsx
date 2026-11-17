import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { storeInfo } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { language, t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(language === 'en'
      ? `*MESSAGE FROM WEBSITE - ARIFIN FARM*\n\n👤 *Name:* ${name}\n📞 *Contact:* ${phone}\n💬 *Message:* ${message}`
      : `*PESAN DARI WEBSITE - ARIFIN FARM*\n\n👤 *Nama:* ${name}\n📞 *Kontak:* ${phone}\n💬 *Pesan:* ${message}`
    );
    window.open(`https://wa.me/${storeInfo.phone}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase bg-amber-100 px-3 py-1 rounded-full">
          {language === 'en' ? 'Contact Us' : 'Hubungi Kami'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">{t('contactTitle')}</h1>
        <p className="text-stone-600 text-sm">
          {t('contactSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold font-serif text-stone-900">
              {language === 'en' ? 'Contact Information & Location' : 'Informasi Kontak & Lokasi'}
            </h3>
            
            <ul className="space-y-4 text-sm text-stone-600">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-stone-900 block mb-0.5">{language === 'en' ? 'Main Warehouse Address:' : 'Alamat Gudang Utama:'}</strong>
                  <span>{storeInfo.address}</span>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-stone-900 block mb-0.5">{language === 'en' ? 'WhatsApp / Phone Number:' : 'Nomor WhatsApp / Telp:'}</strong>
                  <span>{storeInfo.whatsappDisplay}</span>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-stone-900 block mb-0.5">{language === 'en' ? 'Official Email (Gmail):' : 'Email Resmi (Gmail):'}</strong>
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${storeInfo.email}&su=Inkuiri%20Resmi%20Arifin%20Farm`} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline font-medium">
                    {storeInfo.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-stone-900 block mb-0.5">{language === 'en' ? 'Store Operating Hours:' : 'Jam Operasional Toko:'}</strong>
                  <span>{t('hours')}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm h-64">
            <iframe 
              title="Google Maps Arifin Farm"
              src={storeInfo.mapEmbed} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between">
          {submitted ? (
            <div className="py-20 text-center space-y-4 my-auto">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900">{language === 'en' ? 'Message Sent!' : 'Pesan Terkirim!'}</h3>
              <p className="text-sm text-stone-600 max-w-sm mx-auto">
                {t('sendSuccess')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-amber-800 text-white px-6 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
              >
                {language === 'en' ? 'Send Another Message' : 'Kirim Pesan Lain'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-stone-900">{t('sendMessage')}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">{t('yourName')}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'en' ? 'e.g. Budi Santoso' : 'mis. Budi Santoso'}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">{t('customerPhone')}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08123456789"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">{t('yourMessage')}</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={language === 'en' ? 'Write your needs or questions here...' : 'Tuliskan kebutuhan atau pertanyaan Anda di sini...'}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-medium resize-none"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-800 hover:bg-amber-900 text-white font-semibold py-4 rounded-xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4" /> {t('sendMessage')} via WhatsApp
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
