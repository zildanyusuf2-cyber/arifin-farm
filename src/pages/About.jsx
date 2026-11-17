import React from 'react';
import { CheckCircle, TreePine } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase bg-amber-100 px-3 py-1 rounded-full">
          {language === 'en' ? 'About Company' : 'Tentang Perusahaan'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-stone-900 leading-tight">
          {language === 'en' ? 'ARIFIN FARM: Your Trusted Construction & Furniture Partner' : 'ARIFIN FARM: Mitra Terpercaya Konstruksi & Mebel Anda'}
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          {language === 'en' 
            ? 'Established for over 20 years, Arifin Farm has served thousands of customers ranging from housing contractors, architects, furniture craftsmen, to private homeowners across Indonesia.'
            : 'Berdiri sejak lebih dari 20 tahun lalu, Arifin Farm telah melayani ribuan pelanggan mulai dari kontraktor perumahan, arsitek, pengrajin mebel, hingga pemilik rumah pribadi di seluruh Indonesia.'
          }
        </p>
      </div>

      {/* Main Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-amber-800 font-semibold text-sm">
            <TreePine className="w-5 h-5" /> {language === 'en' ? 'History & Quality Commitment' : 'Sejarah & Komitmen Mutu'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            {language === 'en' ? 'Over 20 Years of Dedication in the Timber Industry' : 'Dedikasi Selama Lebih dari 20 Tahun di Industri Kayu'}
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            {language === 'en'
              ? 'We started our journey as a small local supplier in Central Java and have now grown into one of the most complete and trusted timber distributors. Our advantage lies in meticulous selection of legal mature wood (SVLK certified) and the use of modern kiln-dry drying machines to prevent wood warping or shrinking.'
              : 'Kami memulai perjalanan sebagai supplier lokal kecil di Jawa Tengah dan kini berkembang menjadi salah satu distributor kayu lengkap dan terpercaya. Keunggulan kami terletak pada ketelitian pemilihan kayu tua yang legal (bersertifikat SVLK) serta penggunaan mesin pengering oven (kiln dry) modern untuk mencegah kayu melengkung atau susut.'
            }
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-1">
              <p className="text-2xl font-black text-amber-800 font-serif">20+ {language === 'en' ? 'Years' : 'Tahun'}</p>
              <p className="text-xs text-stone-500 font-medium">{language === 'en' ? 'Industry Experience' : 'Pengalaman Industri'}</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-1">
              <p className="text-2xl font-black text-amber-800 font-serif">5.000+</p>
              <p className="text-xs text-stone-500 font-medium">{language === 'en' ? 'Projects Supplied' : 'Proyek Tersuplai'}</p>
            </div>
          </div>
        </div>

        <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl border border-stone-200">
          <img 
            src="https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&q=80&w=1000" 
            alt="Gudang Arifin Farm" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Visi Misi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="text-xl font-bold font-serif text-stone-900">{language === 'en' ? 'Our Vision' : 'Visi Kami'}</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            {language === 'en'
              ? 'To become the number one timber material supplier and distributor in Indonesia known for quality authenticity, SVLK timber legality, sizing precision, and professional service.'
              : 'Menjadi supplier dan distributor material kayu nomor satu di Indonesia yang dikenal karena keaslian kualitas, legalitas kayu SVLK, ketepatan ukuran, dan pelayanan profesional.'
            }
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="text-xl font-bold font-serif text-stone-900">{language === 'en' ? 'Our Mission' : 'Misi Kami'}</h3>
          <ul className="space-y-2 text-sm text-stone-600">
            {language === 'en' ? (
              <>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" /> Provide the most complete range of construction and furniture woods.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" /> Ensure all products are defect-free and kiln-dry standardized.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" /> Provide transparent consultation for every customer need.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" /> Deliver fast and on-time delivery services to project sites.</li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" /> Menyediakan ragam kayu konstruksi dan mebel terlengkap.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" /> Menjamin seluruh produk bebas dari cacat dan berstandar kiln dry.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" /> Memberikan konsultasi transparan bagi setiap kebutuhan pelanggan.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" /> Menghadirkan layanan pengiriman cepat dan tepat waktu ke lokasi proyek.</li>
              </>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
}
