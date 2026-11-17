import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Kunci "anon" memang boleh publik; keamanan diatur oleh Row Level Security (supabase/schema.sql).
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;

// ---- Konversi baris database (snake_case) <-> objek aplikasi (camelCase) ----
export const productFromRow = (r) => ({
  id: r.id,
  name: r.name,
  category: r.category,
  woodType: r.wood_type,
  price: Number(r.price),
  unit: r.unit,
  grade: r.grade,
  stock: r.stock,
  image: r.image,
  description: r.description,
  dimensions: r.dimensions,
});

export const productToRow = (p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  wood_type: p.woodType,
  price: p.price,
  unit: p.unit,
  grade: p.grade,
  stock: p.stock,
  image: p.image,
  description: p.description,
  dimensions: p.dimensions,
});

export const orderFromRow = (r) => ({
  id: r.id,
  date: r.date_label,
  customerName: r.customer_name,
  customerPhone: r.customer_phone,
  customerAddress: r.customer_address,
  notes: r.notes,
  items: r.items,
  totalPrice: Number(r.total_price),
  status: r.status,
});

export const orderToRow = (o) => ({
  id: o.id,
  date_label: o.date,
  customer_name: o.customerName,
  customer_phone: o.customerPhone,
  customer_address: o.customerAddress,
  notes: o.notes || '',
  items: o.items,
  total_price: o.totalPrice,
  status: o.status,
});
