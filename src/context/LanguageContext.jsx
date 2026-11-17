import React, { createContext, useContext, useState } from 'react';
import { storeInfo } from '../data/initialData';

const enCategoriesMap = {
  jati: { name: 'Teak Wood', description: 'High-quality teak wood, strong, durable, and termite resistant for luxury furniture & construction.' },
  mahoni: { name: 'Mahogany Wood', description: 'Smooth kiln-dry mahogany wood, easy to carve, ideal for furniture & interior.' },
  meranti: { name: 'Meranti Wood', description: 'Red & white meranti wood for roof trusses, door/window frames, and building construction.' },
  kamper: { name: 'Camphor Wood', description: 'Super Samarinda camphor wood, distinct aroma, highly strong for frames & doors.' },
  bengkirai: { name: 'Bengkirai Wood', description: 'Heavy hardwood for outdoor decking, bridges, and heavy construction.' },
  pinus: { name: 'Pine Wood', description: 'Smooth pine/Dutch teak wood, attractive grain for minimalist interior & crafts.' },
  konstruksi: { name: 'Beams, Rafters & Battens', description: 'Standard material for roof truss construction, formwork, and building structures.' },
  papan: { name: 'Boards & Plywood', description: 'Wood boards of various sizes and quality multiple/plywood.' },
  'wood-pellet': { name: 'Wood Pellet', description: 'High-quality wood pellets for eco-friendly biomass fuel, heating, and industrial boilers.' },
};

const enProductsMap = {
  1: {
    name: 'Grade A Perhutani Teak Wood Beam',
    woodType: 'Teak Wood',
    unit: 'm³ (Cubic Meter)',
    grade: 'Grade A (Mature & Kiln Dried)',
    description: 'Selected Perhutani teak wood aged over 40 years. Kiln-dried with low moisture content, stable, resistant to warping and shrinking. Perfect for luxury frames, main doors, and high-grade carved furniture.',
    dimensions: 'Thickness 6cm x Width 12cm x Length 4 Meters'
  },
  2: {
    name: 'Kiln Dry Mahogany Wood Board',
    woodType: 'Mahogany Wood',
    unit: 'm³ (Cubic Meter)',
    grade: 'Grade A (Kiln Dry)',
    description: 'Selected mahogany boards that have undergone kiln drying process. Smooth pore texture, easy to paint with duco or natural polish. Best choice for tables, cabinets, and kitchen sets.',
    dimensions: 'Thickness 3cm x Width 20cm x Length 3 Meters'
  },
  3: {
    name: 'Construction Red Meranti Wood',
    woodType: 'Meranti Wood',
    unit: 'm³ (Cubic Meter)',
    grade: 'Building Standard',
    description: 'Authentic red meranti wood from Kalimantan. Strong, straight, and highly durable against building structural loads. Highly recommended for roof trusses, rafters, and door frames.',
    dimensions: 'Thickness 5cm x Width 10cm x Length 4 Meters'
  },
  4: {
    name: 'Samarinda Camphor Wood Frames & Beams',
    woodType: 'Camphor Wood',
    unit: 'm³ (Cubic Meter)',
    grade: 'Super Samarinda',
    description: 'Samarinda camphor wood with dense grain and a distinct insect-repellent aroma. Highly stable for manufacturing panel doors, windows, and frames for commercial buildings or elite residences.',
    dimensions: 'Thickness 6cm x Width 15cm x Length 3 Meters'
  },
  5: {
    name: 'Outdoor Decking Bengkirai Wood',
    woodType: 'Bengkirai Wood',
    unit: 'm³ (Cubic Meter)',
    grade: 'Heavy Duty Outdoor',
    description: 'Hardwood from Kalimantan resistant to extreme weather, heat, and rain. Ideal for swimming pool decking, garden fences, wooden bridges, and pergolas.',
    dimensions: 'Thickness 2.5cm x Width 10cm x Length 3 Meters'
  },
  6: {
    name: 'Pine Wood / Dutch Teak Board',
    woodType: 'Pine Wood',
    unit: 'm³ (Cubic Meter)',
    grade: 'Clear Face',
    description: 'Selected pine wood without dead knots (clear), bright color with aesthetic natural grain. Favorite for industrial style furniture, Scandinavian, and minimalist wall shelves.',
    dimensions: 'Thickness 2cm x Width 15cm x Length 2 Meters'
  },
  7: {
    name: 'Meranti Rafter / Kaso Wood (5x7)',
    woodType: 'Meranti / Kruing Wood',
    unit: 'Piece (4 Meters)',
    grade: 'Roof Construction',
    description: 'Hardwood kaso or rafter for building roof framing structures for houses and buildings. Straight cut, precise, and sturdy to support roof tiles.',
    dimensions: 'Size 5 x 7 cm x Length 4 Meters'
  },
  8: {
    name: 'Roof Batten Wood (2x3 / 3x4)',
    woodType: 'Local Hardwood',
    unit: 'Piece (4 Meters)',
    grade: 'Roof Construction',
    description: 'Wooden battens as foundation for ceramic tiles, concrete, or metal roof installation. Strong and durable.',
    dimensions: 'Size 3 x 4 cm x Length 4 Meters'
  },
  9: {
    name: '18mm Meranti Plywood',
    woodType: 'Multiplek / Plywood',
    unit: 'Sheet (122 x 244 cm)',
    grade: 'Commercial Grade A',
    description: '18mm thick plywood with meranti face layer. Very strong as base material for kitchen sets, wardrobes, TV backdrops, and partitions.',
    dimensions: 'Thickness 18 mm x Width 122 cm x Length 244 cm'
  },
  10: {
    name: 'Premium Biomass Wood Pellet',
    woodType: 'Wood Pellet',
    unit: 'Ton (1000 kg)',
    grade: 'Premium Industrial Grade',
    description: 'High-quality wood pellets for eco-friendly biomass fuel, industrial boilers, and heating. High calorific value, low ash content, and clean.',
    dimensions: 'Diameter 6mm - 8mm (25kg Bag / Bulk)'
  },
  11: {
    name: 'Wood Pellet 25 Kg Packaging (Eco-Friendly Fuel)',
    woodType: 'Wood Pellet',
    unit: 'Bag (25 kg)',
    grade: 'Export Quality Standard',
    description: 'Ready-to-use wood pellets in 25 kg bag packaging. Highly efficient for restaurants, space heaters, biomass stoves, and mid-scale industries. Clean, minimal smoke, and high heat.',
    dimensions: 'Diameter 8mm x Length 10-30mm (25 kg Packaging)'
  }
};

const translations = {
  id: {
    address: storeInfo.address,
    hours: storeInfo.hours,
    adminDashboard: 'Dashboard Admin',
    phoneDisplay: storeInfo.whatsappDisplay,
    subtitle: 'SUPPLIER KAYU & PERTANIAN TERPERCAYA',
    nav: {
      home: 'Beranda',
      catalog: 'Katalog Produk',
      calculator: 'Kalkulator Kayu',
      about: 'Tentang Kami',
      gallery: 'Galeri',
      articles: 'Artikel & Edukasi',
      contact: 'Kontak'
    },
    cart: 'Keranjang',
    whatsappConsult: 'Konsultasi WhatsApp',
    
    // Home Page
    heroBadge: 'Pusat Kayu & Produk Pertanian Berkualitas',
    heroTitle: 'Solusi Terbaik Kebutuhan Kayu & Pertanian Anda',
    heroSubtitle: 'Menyediakan berbagai jenis kayu keras berkualitas tinggi (Jati, Mahoni, Meranti, Kamper, Bengkirai) dan produk pertanian/biomassa terpercaya langsung dari produsen.',
    exploreCatalog: 'Jelajahi Katalog',
    consultExpert: 'Konsultasi Ahli',
    featuresTitle: 'Mengapa Memilih CV Arifin Farm?',
    feature1Title: 'Kayu Berkualitas Tinggi',
    feature1Desc: 'Kayu pilihan berlegalitas, kering oven, dan tahan lama untuk konstruksi serta mebel.',
    feature2Title: 'Harga Kompetitif',
    feature2Desc: 'Langsung dari tangan pertama dengan harga terbaik untuk grosir maupun eceran.',
    feature3Title: 'Pengiriman Aman & Cepat',
    feature3Desc: 'Armada pengiriman siap mengirim pesanan Anda dengan aman sampai tujuan.',
    featuredProductsTitle: 'Produk Unggulan',
    viewAllProducts: 'Lihat Semua Produk',
    
    // Catalog Page
    searchPlaceholder: 'Cari jenis kayu atau produk pertanian...',
    allCategories: 'Semua Kategori',
    stockAvailable: 'Stok tersedia',
    unit: 'Satuan',
    grade: 'Grade',
    details: 'Detail',
    addToCart: '+ Keranjang',
    noProductsFound: 'Tidak ada produk yang ditemukan.',

    // Product Detail
    backToCatalog: '← Kembali ke Katalog',
    specifications: 'Spesifikasi Produk',
    woodType: 'Jenis Kayu',
    dimensions: 'Dimensi',
    price: 'Harga',
    totalPrice: 'Total Harga',
    quantity: 'Jumlah',
    consultNow: 'Pesan / Konsultasi via WhatsApp',

    // Calculator Page
    calcTitle: 'Kalkulator Kebutuhan Kayu',
    calcSubtitle: 'Hitung estimasi kebutuhan meter kubik (m³) dan perkiraan biaya untuk proyek bangunan atau mebel Anda.',
    selectWoodType: 'Pilih Jenis Kayu',
    thickness: 'Tebal (cm)',
    width: 'Lebar (cm)',
    length: 'Panjang (Meter)',
    pcsCount: 'Jumlah Batang / Pcs',
    calculateResult: 'Hasil Perhitungan Estimasi',
    volumePerPcs: 'Volume per Batang',
    totalVolume: 'Total Volume (m³)',
    estimatedCost: 'Estimasi Total Biaya',
    consultThisCalculation: 'Konsultasikan Hasil Perhitungan ini via WhatsApp',

    // About Page
    aboutTitle: 'Tentang CV Arifin Farm',
    aboutSubtitle: 'Mitra terpercaya dalam penyediaan kayu berkualitas tinggi dan produk pertanian berkelanjutan.',
    historyTitle: 'Sejarah & Perjalanan Kami',
    historyDesc1: 'Berawal dari kecintaan terhadap hasil bumi nusantara dan industri pengolahan kayu di Jepara, CV Arifin Farm didirikan dengan komitmen untuk menyediakan produk kayu legal, berkualitas tinggi, serta ramah lingkungan.',
    historyDesc2: 'Seiring berjalannya waktu, kami berkembang menjadi supplier terkemuka yang melayani kebutuhan mebel, konstruksi bangunan perumahan hingga komersial, serta ekspor biomassa wood pellet.',
    visionMission: 'Visi & Misi Kami',
    visionTitle: 'Visi',
    visionDesc: 'Menjadi supplier kayu dan hasil bumi terdepan yang mengutamakan kualitas, legalitas, serta kepuasan pelanggan di tingkat nasional maupun internasional.',
    missionTitle: 'Misi',
    mission1: 'Menyediakan produk kayu pilihan yang legal, kering oven, dan berdaya tahan tinggi.',
    mission2: 'Memberikan pelayanan profesional dan konsultasi teknis terbaik bagi setiap pelanggan.',
    mission3: 'Mendukung praktik kehutanan berkelanjutan dan ramah lingkungan.',

    // Gallery Page
    galleryTitle: 'Galeri Produk & Proyek',
    gallerySubtitle: 'Dokumentasi kualitas kayu, gudang penyimpanan, dan hasil proyek pelanggan kami.',

    // Articles Page
    articlesTitle: 'Artikel & Edukasi Kayu',
    articlesSubtitle: 'Tips merawat kayu, panduan memilih material bangunan, dan wawasan industri.',
    readMore: 'Baca Selengkapnya',

    // Contact Page
    contactTitle: 'Hubungi Kami',
    contactSubtitle: 'Konsultasikan kebutuhan kayu atau produk pertanian Anda dengan tim ahli kami.',
    sendMessage: 'Kirim Pesan',
    yourName: 'Nama Lengkap',
    yourEmail: 'Email',
    yourMessage: 'Pesan / Kebutuhan Anda',
    sendSuccess: 'Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.',

    // Cart Modal
    cartTitle: 'Keranjang Belanja',
    cartEmpty: 'Keranjang belanja Anda masih kosong.',
    checkout: 'Checkout Pesanan',
    total: 'Total',
    customerName: 'Nama Lengkap',
    customerPhone: 'No. WhatsApp',
    shippingAddress: 'Alamat Pengiriman',
    notes: 'Catatan Tambahan',
    confirmOrderWhatsApp: 'Konfirmasi Pesanan via WhatsApp',
    close: 'Tutup',

    // Admin Modal
    adminTitle: 'Dashboard Admin CV Arifin Farm',
    productManagement: 'Manajemen Produk',
    addProduct: 'Tambah Produk Baru',
    productName: 'Nama Produk',
    category: 'Kategori',
    action: 'Aksi',
    edit: 'Edit',
    delete: 'Hapus',
    save: 'Simpan',
    cancel: 'Batal',

    // Footer
    footerDesc: 'Supplier dan distributor kayu konstruksi, rangka atap, kusen, papan, serta bahan mebel berkualitas tinggi. Melayani eceran maupun proyek skala besar ke seluruh wilayah.',
    contactWhatsApp: 'Hubungi WhatsApp',
    woodCategories: 'Kategori Kayu',
    mainMenu: 'Menu Utama',
    contactOperational: 'Kontak & Operasional',
    allRightsReserved: 'Seluruh Hak Cipta Dilindungi.',
    privacyPolicy: 'Kebijakan Privasi',
    termsConditions: 'Syarat & Ketentuan',
    svlkLegality: 'Legalitas Kayu SVLK'
  },
  en: {
    address: storeInfo.address,
    hours: 'Open Every Day',
    adminDashboard: 'Admin Dashboard',
    phoneDisplay: storeInfo.whatsappDisplay,
    subtitle: 'TRUSTED TIMBER & AGRICULTURE SUPPLIER',
    nav: {
      home: 'Home',
      catalog: 'Product Catalog',
      calculator: 'Timber Calculator',
      about: 'About Us',
      gallery: 'Gallery',
      articles: 'Articles & Education',
      contact: 'Contact'
    },
    cart: 'Cart',
    whatsappConsult: 'WhatsApp Consult',
    
    // Home Page
    heroBadge: 'Quality Timber & Agricultural Products Center',
    heroTitle: 'The Best Solution for Your Timber & Agricultural Needs',
    heroSubtitle: 'Providing high-quality hardwood (Teak, Mahogany, Meranti, Camphor, Bengkirai) and trusted agricultural/biomass products directly from the producer.',
    exploreCatalog: 'Explore Catalog',
    consultExpert: 'Expert Consultation',
    featuresTitle: 'Why Choose CV Arifin Farm?',
    feature1Title: 'High Quality Timber',
    feature1Desc: 'Legal, kiln-dried, and durable selected wood for construction and furniture.',
    feature2Title: 'Competitive Pricing',
    feature2Desc: 'Directly from first hand with the best prices for wholesale and retail.',
    feature3Title: 'Safe & Fast Delivery',
    feature3Desc: 'Delivery fleet ready to deliver your order safely to your destination.',
    featuredProductsTitle: 'Featured Products',
    viewAllProducts: 'View All Products',
    
    // Catalog Page
    searchPlaceholder: 'Search timber type or agricultural product...',
    allCategories: 'All Categories',
    stockAvailable: 'Stock available',
    unit: 'Unit',
    grade: 'Grade',
    details: 'Details',
    addToCart: '+ Cart',
    noProductsFound: 'No products found.',

    // Product Detail
    backToCatalog: '← Back to Catalog',
    specifications: 'Product Specifications',
    woodType: 'Wood Type',
    dimensions: 'Dimensions',
    price: 'Price',
    totalPrice: 'Total Price',
    quantity: 'Quantity',
    consultNow: 'Order / Consult via WhatsApp',

    // Calculator Page
    calcTitle: 'Timber Requirement Calculator',
    calcSubtitle: 'Calculate estimated cubic meter (m³) requirements and cost estimates for your building or furniture project.',
    selectWoodType: 'Select Wood Type',
    thickness: 'Thickness (cm)',
    width: 'Width (cm)',
    length: 'Length (Meters)',
    pcsCount: 'Number of Pieces / Pcs',
    calculateResult: 'Estimation Calculation Result',
    volumePerPcs: 'Volume per Piece',
    totalVolume: 'Total Volume (m³)',
    estimatedCost: 'Estimated Total Cost',
    consultThisCalculation: 'Consult this calculation result via WhatsApp',

    // About Page
    aboutTitle: 'About CV Arifin Farm',
    aboutSubtitle: 'Your trusted partner in supplying high-quality timber and sustainable agricultural products.',
    historyTitle: 'Our History & Journey',
    historyDesc1: 'Originating from a passion for the archipelago’s natural produce and the wood processing industry in Jepara, CV Arifin Farm was founded with a commitment to providing legal, high-quality, and eco-friendly wood products.',
    historyDesc2: 'Over time, we have grown into a leading supplier serving furniture, residential and commercial construction needs, as well as wood pellet biomass exports.',
    visionMission: 'Our Vision & Mission',
    visionTitle: 'Vision',
    visionDesc: 'To become the leading timber and agricultural supplier prioritizing quality, legality, and customer satisfaction nationally and internationally.',
    missionTitle: 'Mission',
    mission1: 'Provide selected legal wood products that are kiln-dried and highly durable.',
    mission2: 'Deliver professional service and the best technical consultation for every customer.',
    mission3: 'Support sustainable and eco-friendly forestry practices.',

    // Gallery Page
    galleryTitle: 'Product & Project Gallery',
    gallerySubtitle: 'Documentation of wood quality, storage warehouses, and our customer project results.',

    // Articles Page
    articlesTitle: 'Timber Articles & Education',
    articlesSubtitle: 'Tips for wood care, building material selection guides, and industry insights.',
    readMore: 'Read More',

    // Contact Page
    contactTitle: 'Contact Us',
    contactSubtitle: 'Consult your timber or agricultural product needs with our expert team.',
    sendMessage: 'Send Message',
    yourName: 'Full Name',
    yourEmail: 'Email',
    yourMessage: 'Message / Your Needs',
    sendSuccess: 'Message sent successfully! Our team will contact you soon.',

    // Cart Modal
    cartTitle: 'Shopping Cart',
    cartEmpty: 'Your shopping cart is still empty.',
    checkout: 'Checkout Order',
    total: 'Total',
    customerName: 'Full Name',
    customerPhone: 'WhatsApp Number',
    shippingAddress: 'Shipping Address',
    notes: 'Additional Notes',
    confirmOrderWhatsApp: 'Confirm Order via WhatsApp',
    close: 'Close',

    // Admin Modal
    adminTitle: 'CV Arifin Farm Admin Dashboard',
    productManagement: 'Product Management',
    addProduct: 'Add New Product',
    productName: 'Product Name',
    category: 'Category',
    action: 'Action',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',

    // Footer
    footerDesc: 'Supplier and distributor of construction timber, roof trusses, door/window frames, boards, and high-quality furniture materials. Serving retail and large-scale projects nationwide.',
    contactWhatsApp: 'WhatsApp Contact',
    woodCategories: 'Timber Categories',
    mainMenu: 'Main Menu',
    contactOperational: 'Contact & Operational',
    allRightsReserved: 'All Rights Reserved.',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Terms & Conditions',
    svlkLegality: 'SVLK Timber Legality'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('id'); // 'id' or 'en'

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const getTranslatedCategories = (categories) => {
    if (language !== 'en') return categories;
    return categories.map((cat) => {
      const translated = enCategoriesMap[cat.id];
      return translated ? { ...cat, ...translated } : cat;
    });
  };

  const getTranslatedProducts = (productsList) => {
    if (language !== 'en') return productsList;
    return productsList.map((p) => {
      const translated = enProductsMap[p.id];
      return translated ? { ...p, ...translated } : p;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getTranslatedCategories, getTranslatedProducts }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
