import { useState, useEffect } from 'react';
import {
  ArrowLeft, ExternalLink, Star, Truck, Shield,
  Filter, ChevronDown, TrendingDown, Package, AlertTriangle, CheckCircle2, Clock
} from 'lucide-react';

// ── سعر صرف الدينار التونسي (1 USD = ~3.09 TND تقريباً)
const USD_TO_TND = 3.09;

function toTND(usd: number) {
  return (usd * USD_TO_TND).toFixed(3);
}

interface Part {
  id: string;
  name: string;
  partNumber: string;
  brand: string;
  condition: 'OEM' | 'Aftermarket' | 'Remanufactured';
  rating: number;
  reviewCount: number;
  stores: StoreOffer[];
}

interface StoreOffer {
  storeName: string;
  storeId: string;
  price: number;
  currency: string;
  shipping: string;
  shippingCost: number;
  availability: 'In Stock' | 'Limited' | 'Ships in 2-3 days';
  url: string;
  logoColor: string;
  badge?: string;
  shipsToTunisia: boolean;       // هل يشحن لتونس؟
  tunisiaShippingDays?: string;  // مدة الشحن لتونس
  tunisiaShippingCost?: number;  // تكلفة الشحن لتونس بالدولار
}

function generateSearchUrl(store: string, query: string): string {
  const encoded = encodeURIComponent(query);
  const urls: Record<string, string> = {
    ebay: `https://www.ebay.com/sch/i.html?_nkw=${encoded}&_sacat=6030&LH_PrefLoc=2`,
    amazon: `https://www.amazon.com/s?k=${encoded}&i=automotive`,
    rockauto: `https://www.rockauto.com/en/catalog/`,
    autozone: `https://www.autozone.com/search?searchText=${encoded}`,
    aliexpress: `https://www.aliexpress.com/wholesale?SearchText=${encoded}&shipCountry=TN`,
    walmart: `https://www.walmart.com/search?q=${encoded}+auto+parts`,
  };
  return urls[store] || '#';
}

function buildPartsData(query: string): Part[] {
  const q = query || 'Brake Pads';
  return [
    {
      id: '1',
      name: `${q} — Premium Set`,
      partNumber: 'BP-2024-PRO',
      brand: 'Bosch',
      condition: 'OEM',
      rating: 4.8,
      reviewCount: 2341,
      stores: [
        {
          storeName: 'Amazon',
          storeId: 'amazon',
          price: 34.99,
          currency: 'USD',
          shipping: 'Free Prime shipping',
          shippingCost: 0,
          availability: 'In Stock',
          url: generateSearchUrl('amazon', q),
          logoColor: '#FF9900',
          badge: 'Best Price',
          shipsToTunisia: false,
          tunisiaShippingDays: undefined,
        },
        {
          storeName: 'eBay',
          storeId: 'ebay',
          price: 38.50,
          currency: 'USD',
          shipping: 'Free shipping',
          shippingCost: 0,
          availability: 'In Stock',
          url: generateSearchUrl('ebay', q),
          logoColor: '#E53238',
          shipsToTunisia: true,
          tunisiaShippingDays: '7–14 يوم',
          tunisiaShippingCost: 12,
        },
        {
          storeName: 'RockAuto',
          storeId: 'rockauto',
          price: 29.79,
          currency: 'USD',
          shipping: '+$6.99 shipping',
          shippingCost: 6.99,
          availability: 'In Stock',
          url: generateSearchUrl('rockauto', q),
          logoColor: '#CC0000',
          badge: 'Cheapest Total',
          shipsToTunisia: true,
          tunisiaShippingDays: '10–20 يوم',
          tunisiaShippingCost: 18,
        },
        {
          storeName: 'AliExpress',
          storeId: 'aliexpress',
          price: 21.99,
          currency: 'USD',
          shipping: 'Free ePacket',
          shippingCost: 0,
          availability: 'Ships in 2-3 days',
          url: generateSearchUrl('aliexpress', q),
          logoColor: '#FF6A00',
          shipsToTunisia: true,
          tunisiaShippingDays: '15–25 يوم',
          tunisiaShippingCost: 0,
        },
      ],
    },
    {
      id: '2',
      name: `${q} — Value Series`,
      partNumber: 'VP-1820-ECO',
      brand: 'ACDelco',
      condition: 'Aftermarket',
      rating: 4.5,
      reviewCount: 897,
      stores: [
        {
          storeName: 'AliExpress',
          storeId: 'aliexpress',
          price: 14.99,
          currency: 'USD',
          shipping: 'Free ePacket shipping',
          shippingCost: 0,
          availability: 'Ships in 2-3 days',
          url: generateSearchUrl('aliexpress', q),
          logoColor: '#FF6A00',
          badge: 'Lowest Price',
          shipsToTunisia: true,
          tunisiaShippingDays: '15–25 يوم',
          tunisiaShippingCost: 0,
        },
        {
          storeName: 'eBay',
          storeId: 'ebay',
          price: 18.99,
          currency: 'USD',
          shipping: '+$4.99 shipping',
          shippingCost: 4.99,
          availability: 'In Stock',
          url: generateSearchUrl('ebay', q),
          logoColor: '#E53238',
          shipsToTunisia: true,
          tunisiaShippingDays: '7–14 يوم',
          tunisiaShippingCost: 10,
        },
        {
          storeName: 'Walmart',
          storeId: 'walmart',
          price: 21.50,
          currency: 'USD',
          shipping: 'Free 2-day shipping',
          shippingCost: 0,
          availability: 'Limited',
          url: generateSearchUrl('walmart', q),
          logoColor: '#0071CE',
          shipsToTunisia: false,
        },
      ],
    },
    {
      id: '3',
      name: `${q} — Professional Grade`,
      partNumber: 'PG-9940-XHD',
      brand: 'Brembo',
      condition: 'OEM',
      rating: 4.9,
      reviewCount: 4102,
      stores: [
        {
          storeName: 'eBay',
          storeId: 'ebay',
          price: 84.00,
          currency: 'USD',
          shipping: '+$7.99 shipping',
          shippingCost: 7.99,
          availability: 'In Stock',
          url: generateSearchUrl('ebay', q),
          logoColor: '#E53238',
          badge: 'Top Rated',
          shipsToTunisia: true,
          tunisiaShippingDays: '7–14 يوم',
          tunisiaShippingCost: 20,
        },
        {
          storeName: 'AliExpress',
          storeId: 'aliexpress',
          price: 71.00,
          currency: 'USD',
          shipping: 'Free shipping',
          shippingCost: 0,
          availability: 'In Stock',
          url: generateSearchUrl('aliexpress', q),
          logoColor: '#FF6A00',
          shipsToTunisia: true,
          tunisiaShippingDays: '15–30 يوم',
          tunisiaShippingCost: 0,
        },
        {
          storeName: 'RockAuto',
          storeId: 'rockauto',
          price: 76.49,
          currency: 'USD',
          shipping: '+$9.99 shipping',
          shippingCost: 9.99,
          availability: 'In Stock',
          url: generateSearchUrl('rockauto', q),
          logoColor: '#CC0000',
          shipsToTunisia: true,
          tunisiaShippingDays: '10–20 يوم',
          tunisiaShippingCost: 22,
        },
        {
          storeName: 'Amazon',
          storeId: 'amazon',
          price: 89.99,
          currency: 'USD',
          shipping: 'Free Prime shipping',
          shippingCost: 0,
          availability: 'In Stock',
          url: generateSearchUrl('amazon', q),
          logoColor: '#FF9900',
          shipsToTunisia: false,
        },
      ],
    },
  ];
}

const conditionColors: Record<string, string> = {
  OEM: '#22c55e',
  Aftermarket: '#3b82f6',
  Remanufactured: '#f59e0b',
};

// ── أيقونة حالة الشحن لتونس
function TunisiaShippingBadge({ store }: { store: StoreOffer }) {
  if (!store.shipsToTunisia) {
    return (
      <div
        className="flex items-center gap-1.5 mt-2 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
        style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}
      >
        <AlertTriangle size={11} />
        لا يشحن لتونس 🇹🇳
      </div>
    );
  }
  return (
    <div
      className="flex items-center gap-1.5 mt-2 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
      style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}
    >
      <CheckCircle2 size={11} />
      يشحن لتونس 🇹🇳
      {store.tunisiaShippingCost === 0
        ? ' · شحن مجاني'
        : ` · +${toTND(store.tunisiaShippingCost!)} د.ت`}
    </div>
  );
}

interface SearchResultsProps {
  query: string;
  onBack: () => void;
}

export default function SearchResults({ query, onBack }: SearchResultsProps) {
  const [parts, setParts] = useState<Part[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'stores'>('price');
  const [filterCondition, setFilterCondition] = useState<string>('All');
  const [tunisiaOnly, setTunisiaOnly] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'TND'>('TND');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setParts(buildPartsData(query));
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, [query]);

  const formatPrice = (usd: number) =>
    currency === 'TND'
      ? `${toTND(usd)} د.ت`
      : `$${usd.toFixed(2)}`;

  const filtered = parts.filter(
    (p) => filterCondition === 'All' || p.condition === filterCondition
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price') {
      const minA = Math.min(...a.stores.map((s) => s.price));
      const minB = Math.min(...b.stores.map((s) => s.price));
      return minA - minB;
    }
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.stores.length - a.stores.length;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a', fontFamily: "'Outfit', sans-serif" }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-50 px-6 py-4 flex items-center gap-4 border-b"
        style={{ backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white"
          style={{ color: '#888' }}
        >
          <ArrowLeft size={16} />
          رجوع
        </button>
        <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />

        {/* Currency toggle */}
        <div className="flex items-center gap-1 rounded-lg p-1" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
          {(['TND', 'USD'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className="px-3 py-1 rounded-md text-xs font-bold transition-all duration-200"
              style={{
                backgroundColor: currency === c ? '#ff461e' : 'transparent',
                color: currency === c ? '#000' : '#666',
              }}
            >
              {c === 'TND' ? '🇹🇳 د.ت' : '$ USD'}
            </button>
          ))}
        </div>

        <span className="text-sm font-semibold" style={{ color: '#ff461e' }}>
          {sorted.length} نتيجة لـ "{query}"
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* سعر الصرف */}
        <div
          className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl text-sm"
          style={{ backgroundColor: 'rgba(255,70,30,0.06)', border: '1px solid rgba(255,70,30,0.15)' }}
        >
          <span style={{ color: '#ff461e' }}>🇹🇳</span>
          <span style={{ color: '#aaa' }}>سعر الصرف المستخدم:</span>
          <span className="font-bold" style={{ color: '#fff' }}>1 USD = {USD_TO_TND} دينار تونسي</span>
          <span className="text-xs ml-auto" style={{ color: '#555' }}>يتم التحديث دورياً</span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-2 text-sm" style={{ color: '#666' }}>
            <Filter size={14} />
          </div>

          {['All', 'OEM', 'Aftermarket', 'Remanufactured'].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCondition(c)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200"
              style={{
                backgroundColor: filterCondition === c ? '#ff461e' : 'rgba(255,255,255,0.06)',
                color: filterCondition === c ? '#000' : '#888',
                border: `1px solid ${filterCondition === c ? '#ff461e' : 'rgba(255,255,255,0.1)'}`,
              }}
            >
              {c}
            </button>
          ))}

          {/* فلتر تونس فقط */}
          <button
            onClick={() => setTunisiaOnly(!tunisiaOnly)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              backgroundColor: tunisiaOnly ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
              color: tunisiaOnly ? '#22c55e' : '#888',
              border: `1px solid ${tunisiaOnly ? '#22c55e' : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            🇹🇳 يشحن لتونس فقط
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs px-3 py-1.5 rounded-md outline-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#ccc', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <option value="price">أقل سعر</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="stores">أكثر متاجر</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl p-6 animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="h-5 w-48 rounded mb-3" style={{ backgroundColor: '#1a1a1a' }} />
                <div className="h-3 w-32 rounded mb-6" style={{ backgroundColor: '#1a1a1a' }} />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-32 rounded-lg" style={{ backgroundColor: '#1a1a1a' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && (
          <div className="space-y-6">
            {sorted.map((part) => {
              // فلترة المتاجر حسب الشحن لتونس
              const visibleStores = tunisiaOnly
                ? part.stores.filter((s) => s.shipsToTunisia)
                : part.stores;

              if (visibleStores.length === 0) return null;

              const bestPrice = Math.min(...visibleStores.map((s) => s.price));
              const worstPrice = Math.max(...visibleStores.map((s) => s.price));
              const saving = worstPrice - bestPrice;
              const tunisiaStoresCount = part.stores.filter((s) => s.shipsToTunisia).length;

              return (
                <div
                  key={part.id}
                  className="rounded-xl overflow-hidden"
                  style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {/* Part header */}
                  <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${conditionColors[part.condition]}18`, color: conditionColors[part.condition] }}
                          >
                            {part.condition}
                          </span>
                          <span className="text-xs" style={{ color: '#555' }}>#{part.partNumber}</span>
                          {/* شارة تونس */}
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                            style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}
                          >
                            🇹🇳 {tunisiaStoresCount}/{part.stores.length} يشحنون لتونس
                          </span>
                        </div>
                        <h3 className="text-white font-semibold text-lg leading-tight">{part.name}</h3>
                        <p className="text-sm mt-0.5" style={{ color: '#888' }}>
                          {part.brand} &nbsp;·&nbsp;
                          <span style={{ color: '#fbbf24' }}>{'★'.repeat(Math.round(part.rating))}</span>
                          <span className="ml-1 text-xs" style={{ color: '#555' }}>{part.rating} ({part.reviewCount.toLocaleString()} تقييم)</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: '#ff461e' }}>
                          {formatPrice(bestPrice)}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: '#555' }}>
                          {currency === 'TND' ? `≈ $${bestPrice.toFixed(2)}` : `≈ ${toTND(bestPrice)} د.ت`}
                        </div>
                        {saving > 0 && (
                          <div className="text-xs mt-1 flex items-center gap-1 justify-end" style={{ color: '#22c55e' }}>
                            <TrendingDown size={12} />
                            وفّر حتى {formatPrice(saving)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Store offers */}
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {visibleStores.map((store) => {
                      const totalTND = store.shipsToTunisia
                        ? toTND(store.price + (store.tunisiaShippingCost || 0))
                        : null;

                      return (
                        <a
                          key={store.storeId + store.price}
                          href={store.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block rounded-lg p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl relative"
                          style={{
                            backgroundColor: store.shipsToTunisia ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.04)',
                            border: store.badge
                              ? `1px solid ${store.logoColor}40`
                              : store.shipsToTunisia
                              ? '1px solid rgba(34,197,94,0.15)'
                              : '1px solid rgba(255,255,255,0.07)',
                            opacity: !store.shipsToTunisia && tunisiaOnly ? 0.4 : 1,
                          }}
                        >
                          {/* Badge */}
                          {store.badge && (
                            <div
                              className="absolute -top-2.5 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: store.logoColor, color: '#fff' }}
                            >
                              {store.badge}
                            </div>
                          )}

                          {/* Store name */}
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold" style={{ color: store.logoColor }}>
                              {store.storeName}
                            </span>
                            <ExternalLink
                              size={13}
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              style={{ color: store.logoColor }}
                            />
                          </div>

                          {/* Price in selected currency */}
                          <div className="text-xl font-bold text-white">
                            {formatPrice(store.price)}
                          </div>
                          <div className="text-[11px] mb-2" style={{ color: '#444' }}>
                            {currency === 'TND' ? `$${store.price.toFixed(2)}` : `${toTND(store.price)} د.ت`}
                          </div>

                          {/* Shipping */}
                          <div className="flex items-center gap-1.5 text-xs" style={{ color: store.shippingCost === 0 ? '#22c55e' : '#888' }}>
                            <Truck size={11} />
                            {store.shipping}
                          </div>

                          {/* Availability */}
                          <div
                            className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1"
                            style={{ color: store.availability === 'In Stock' ? '#22c55e' : store.availability === 'Limited' ? '#f59e0b' : '#888' }}
                          >
                            {store.availability === 'In Stock' && <CheckCircle2 size={10} />}
                            {store.availability === 'Limited' && <Package size={10} />}
                            {store.availability === 'Ships in 2-3 days' && <Clock size={10} />}
                            {store.availability === 'In Stock' ? 'متوفر' : store.availability === 'Limited' ? 'كمية محدودة' : 'يشحن خلال 2–3 أيام'}
                          </div>

                          {/* Tunisia shipping badge */}
                          <TunisiaShippingBadge store={store} />

                          {/* Tunisia shipping time */}
                          {store.shipsToTunisia && store.tunisiaShippingDays && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-[11px]" style={{ color: '#666' }}>
                              <Clock size={10} />
                              وصول تونس: {store.tunisiaShippingDays}
                            </div>
                          )}

                          {/* Total cost for Tunisia */}
                          {store.shipsToTunisia && totalTND && (
                            <div
                              className="mt-2 px-2 py-1 rounded-md text-[11px] font-bold"
                              style={{ backgroundColor: 'rgba(255,70,30,0.08)', color: '#ff461e' }}
                            >
                              الإجمالي لتونس: {currency === 'TND' ? `${totalTND} د.ت` : `$${(store.price + (store.tunisiaShippingCost || 0)).toFixed(2)}`}
                            </div>
                          )}

                          {/* CTA */}
                          <div
                            className="mt-3 text-center py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-200 group-hover:opacity-90"
                            style={{ backgroundColor: store.logoColor + '22', color: store.logoColor, border: `1px solid ${store.logoColor}44` }}
                          >
                            اشتري من {store.storeName} →
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  {/* Trust row */}
                  <div className="px-6 pb-4 flex items-center gap-5 flex-wrap">
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: '#444' }}>
                      <Shield size={12} style={{ color: '#22c55e' }} />
                      قوائم موثّقة
                    </div>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: '#444' }}>
                      <Star size={12} style={{ color: '#fbbf24' }} />
                      {part.stores.length} متاجر مقارنة
                    </div>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: '#22c55e' }}>
                      🇹🇳 {tunisiaStoresCount} يشحنون لتونس
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="mt-10 text-center text-xs" style={{ color: '#333' }}>
          الأسعار تقريبية. سعر الصرف: 1 USD = {USD_TO_TND} د.ت · يتم تأكيد السعر النهائي عند الدفع.
        </p>
      </div>
    </div>
  );
}
