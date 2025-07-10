

import { ShopProduct, Collection, Product, SubscriptionPlan, RentableItem, ParkingRate, MonetizationUseCase, BillItem, TicketType, PageStyle, DurationOption, AdminDashboardData, StripeProduct, StripePrice, StripeCustomer, StripeSubscription, StripeTransaction, PageSessionData, StripeCoupon, StripeTaxRate, CustomerPortalConfig, StripeShippingRate, SessionStatus, DigitalAsset, Donation, Voucher, UserRole, TenantUser, DailyTransactionMetrics } from './types';

export const APP_TITLE = "MonetizePro";

export const NAV_ITEMS: Array<{ id: MonetizationUseCase; label: string; icon: string }> = [
  { id: MonetizationUseCase.CATALOG, label: "Storefront", icon: "storefront" },
  { id: MonetizationUseCase.PRODUCT_SALE, label: "Shop", icon: "shopping_bag" },
  { id: MonetizationUseCase.SUBSCRIPTION_RENTAL, label: "Subscribe", icon: "autorenew" },
  { id: MonetizationUseCase.DONATION, label: "Donate", icon: "favorite" },
  { id: MonetizationUseCase.FUNDRAISING, label: "Fundraiser", icon: "volunteer_activism" },
  { id: MonetizationUseCase.MEMBERSHIP_ACCESS, label: "Membership", icon: "badge" },
  { id: MonetizationUseCase.VOUCHER, label: "Voucher", icon: "card_giftcard" },
  { id: MonetizationUseCase.TIMED_RENTAL, label: "Rent", icon: "timer" },
  { id: MonetizationUseCase.PARKING_SESSION, label: "Park", icon: "local_parking" },
  { id: MonetizationUseCase.RESTAURANT_BILL, label: "Pay Bill", icon: "restaurant" },
  { id: MonetizationUseCase.TIPS, label: "Leave Tip", icon: "payments" },
  { id: MonetizationUseCase.EVENT_TICKET_SALES, label: "Tickets", icon: "local_activity" },
  { id: MonetizationUseCase.APPOINTMENT_BOOKING, label: "Book Service", icon: "event" },
  { id: MonetizationUseCase.DIGITAL_CONTENT_ACCESS, label: "Digital Content", icon: "download" },
  { id: MonetizationUseCase.SIMPLE_INVOICE, label: "Invoice", icon: "receipt_long" },
  { id: MonetizationUseCase.PAYMENT_LINK, label: "Payment Link", icon: "link" },
];

export const LIMITS = {
  guest: {
    maxSingleTransaction: 10000, // $100 in cents
    maxDailyVolume: 50000, // $500 in cents
    maxDailyFrequency: 5,
  },
  payoneer_wise: {
    maxSingleTransaction: 100000, // $1000 in cents
    maxDailyVolume: 500000, // $5000 in cents
    maxDailyFrequency: 10,
  },
  stripe_connect: {
    maxSingleTransaction: Infinity,
    maxDailyVolume: Infinity,
    maxDailyFrequency: Infinity,
  },
};

// --- Page Styling ---
export const DEFAULT_PAGE_STYLE: PageStyle = {
  theme: 'light',
};

export interface ThemeDefinition {
  id: string;
  name: string;
  bgClass: string; 
  textClass: string; 
  cardBgClass: string; 
  buttonPrimaryClass: string; 
  buttonSecondaryClass: string;
  inputBgClass?: string; // Optional: For form input backgrounds
  inputTextClass?: string; // Optional: For form input text
  inputBorderClass?: string; // Optional: For form input borders
}

export const THEMES: ThemeDefinition[] = [
  { 
    id: 'light', 
    name: 'Light Default', 
    bgClass: 'bg-slate-100', 
    textClass: 'text-slate-800', 
    cardBgClass: 'bg-white shadow-lg',
    buttonPrimaryClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    buttonSecondaryClass: 'bg-transparent text-slate-600 border border-slate-500 hover:bg-slate-100 hover:text-slate-700',
    inputBgClass: 'bg-slate-50',
    inputTextClass: 'text-slate-900',
    inputBorderClass: 'border-slate-300'
  },
  { 
    id: 'ocean_breeze', 
    name: 'Ocean Breeze', 
    bgClass: 'bg-gradient-to-br from-sky-100 via-cyan-100 to-teal-100', 
    textClass: 'text-sky-800', 
    cardBgClass: 'bg-white/80 backdrop-blur-md shadow-xl border border-sky-200/50',
    buttonPrimaryClass: 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-md',
    buttonSecondaryClass: 'bg-transparent text-cyan-600 border border-cyan-500 hover:bg-cyan-500/10',
    inputBgClass: 'bg-white/70',
    inputTextClass: 'text-sky-900',
    inputBorderClass: 'border-sky-300'
  },
  {
    id: 'sunset_glow',
    name: 'Sunset Glow',
    bgClass: 'bg-gradient-to-tr from-orange-200 via-red-200 to-pink-200',
    textClass: 'text-rose-900',
    cardBgClass: 'bg-orange-50/80 backdrop-blur-md shadow-xl border border-orange-200/50',
    buttonPrimaryClass: 'bg-red-500 hover:bg-red-600 text-white shadow-md',
    buttonSecondaryClass: 'bg-transparent text-red-600 border border-red-500 hover:bg-red-500/10',
    inputBgClass: 'bg-red-50/70',
    inputTextClass: 'text-rose-900',
    inputBorderClass: 'border-red-300'
  },
  {
    id: 'forest_canopy',
    name: 'Forest Canopy',
    bgClass: 'bg-gradient-to-b from-emerald-700 to-green-800',
    textClass: 'text-emerald-50',
    cardBgClass: 'bg-emerald-600/50 backdrop-blur-md shadow-2xl border border-emerald-500/50 text-emerald-100',
    buttonPrimaryClass: 'bg-lime-500 hover:bg-lime-600 text-green-900 font-semibold shadow-lg',
    buttonSecondaryClass: 'bg-transparent text-lime-300 border border-lime-400 hover:bg-lime-500/20 hover:text-green-700',
    inputBgClass: 'bg-emerald-800/80',
    inputTextClass: 'text-emerald-50 placeholder-emerald-300',
    inputBorderClass: 'border-emerald-600'
  },
  {
    id: 'midnight_tech',
    name: 'Midnight Tech',
    bgClass: 'bg-slate-950',
    textClass: 'text-sky-400',
    cardBgClass: 'bg-slate-800/60 backdrop-blur-lg shadow-2xl border border-sky-500/30 text-slate-200',
    buttonPrimaryClass: 'bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold shadow-lg shadow-sky-500/30',
    buttonSecondaryClass: 'bg-transparent text-sky-400 border border-sky-500 hover:bg-sky-500/10 hover:text-slate-900',
    inputBgClass: 'bg-slate-800/90',
    inputTextClass: 'text-sky-300 placeholder-sky-600',
    inputBorderClass: 'border-sky-700'
  },
  {
    id: 'vintage_paper',
    name: 'Vintage Paper',
    bgClass: 'bg-amber-100', // Could use a subtle texture image as bg if possible with Tailwind
    textClass: 'text-stone-700',
    cardBgClass: 'bg-amber-50/90 backdrop-blur-sm shadow-xl border border-amber-300/60',
    buttonPrimaryClass: 'bg-stone-600 hover:bg-stone-700 text-amber-50 shadow-md',
    buttonSecondaryClass: 'bg-transparent text-stone-600 border border-stone-500 hover:bg-stone-500/10',
    inputBgClass: 'bg-amber-50/80',
    inputTextClass: 'text-stone-800',
    inputBorderClass: 'border-amber-400'
  }
];


// --- Mock Data ---
export const MOCK_APPAREL_COLLECTION: Collection = {
    id: 'col-apparel-1',
    title: 'Apparel',
    description: 'All our wearable merchandise.',
    productIds: ['shop-prod-tshirt-1'],
};

export const MOCK_ACCESSORIES_COLLECTION: Collection = {
    id: 'col-accessories-1',
    title: 'Accessories',
    description: 'Mugs, stickers, and more.',
    productIds: ['shop-prod-mug-1', 'shop-prod-stickers-1'],
};

export const MOCK_TSHIRT_PRODUCT: ShopProduct = {
    id: 'shop-prod-tshirt-1',
    title: 'MonetizePro T-Shirt',
    description: "The official MonetizePro T-Shirt. High-quality, 100% combed cotton for a super soft feel. Show your support for the future of monetization! We've designed this shirt to be comfortable, durable, and stylish—perfect for everyday wear, whether you're coding, attending a conference, or just relaxing.",
    options: ["Color", "Size"],
    collectionIds: [MOCK_APPAREL_COLLECTION.id],
    tags: ["bestseller", "unisex"],
    metafields: {
        "specifications": [
            { "label": "Material", "value": "100% Combed Cotton" },
            { "label": "Fit", "value": "Regular Fit, Unisex Sizing" },
            { "label": "Print Method", "value": "Direct-to-Garment (DTG)" },
            { "label": "Care Instructions", "value": "Machine wash cold, tumble dry low" }
        ],
        "shipping_info": "Ships within 3-5 business days from our warehouse. Standard domestic and international rates apply. You can see the final shipping cost at checkout."
    },
    media: [
        { type: 'image', url: 'https://picsum.photos/seed/tshirt-main/800/800', alt: 'Main T-Shirt View' },
        { type: 'image', url: 'https://picsum.photos/seed/tshirt-detail-1/800/800', alt: 'T-Shirt Detail 1' },
        { type: 'image', url: 'https://picsum.photos/seed/tshirt-detail-2/800/800', alt: 'T-Shirt Detail 2' },
        { type: 'image', url: 'https://picsum.photos/seed/tshirt-lifestyle/800/800', alt: 'T-Shirt Lifestyle' },
    ],
    variants: [
        { id: 'v1', sku: 'MP-TS-BLK-M', title: "Black / M", price: 2800, inventory_quantity: 10, inventory_policy: 'deny', options: { "Color": "Black", "Size": "M" }, media: [{type: 'image', url: 'https://picsum.photos/seed/tshirt-black/800/800', alt: 'Black T-Shirt'}, {type: 'image', url: 'https://picsum.photos/seed/tshirt-black-2/800/800', alt: 'Black T-Shirt Detail'}] },
        { id: 'v2', sku: 'MP-TS-BLK-L', title: "Black / L", price: 2800, inventory_quantity: 5, inventory_policy: 'deny', options: { "Color": "Black", "Size": "L" }, media: [{type: 'image', url: 'https://picsum.photos/seed/tshirt-black/800/800', alt: 'Black T-Shirt'}, {type: 'image', url: 'https://picsum.photos/seed/tshirt-black-2/800/800', alt: 'Black T-Shirt Detail'}] },
        { id: 'v3', sku: 'MP-TS-BLK-XL', title: "Black / XL", price: 2800, inventory_quantity: 0, inventory_policy: 'deny', options: { "Color": "Black", "Size": "XL" }, media: [{type: 'image', url: 'https://picsum.photos/seed/tshirt-black/800/800', alt: 'Black T-Shirt'}] },
        { id: 'v4', sku: 'MP-TS-WHT-M', title: "White / M", price: 2800, inventory_quantity: 12, inventory_policy: 'deny', options: { "Color": "White", "Size": "M" }, media: [{type: 'image', url: 'https://picsum.photos/seed/tshirt-white/800/800', alt: 'White T-Shirt'}] },
        { id: 'v5', sku: 'MP-TS-WHT-L', title: "White / L", price: 2800, inventory_quantity: 8, inventory_policy: 'deny', options: { "Color": "White", "Size": "L" }, media: [{type: 'image', url: 'https://picsum.photos/seed/tshirt-white/800/800', alt: 'White T-Shirt'}] },
        { id: 'v6', sku: 'MP-TS-RED-L', title: "Red / L", price: 2500, compareAtPrice: 3000, inventory_quantity: 3, inventory_policy: 'deny', options: { "Color": "Red", "Size": "L" }, media: [{type: 'image', url: 'https://picsum.photos/seed/tshirt-red/800/800', alt: 'Red T-Shirt'}] },
    ]
};

export const MOCK_MUG_PRODUCT: ShopProduct = {
    id: 'shop-prod-mug-1',
    title: 'MonetizePro Mug',
    description: 'Start your day with a reminder to monetize. This sturdy ceramic mug is perfect for coffee, tea, or hot chocolate. Dishwasher and microwave safe.',
    options: [],
    collectionIds: [MOCK_ACCESSORIES_COLLECTION.id],
    tags: ["office", "gift"],
    media: [{ type: 'image', url: 'https://picsum.photos/seed/mug-main/800/800', alt: 'MonetizePro Mug' }],
    variants: [{
        id: 'v7', sku: 'MP-MUG-WHT', title: "White Mug", price: 1500, inventory_quantity: 50, inventory_policy: 'deny', options: {}
    }]
};

export const MOCK_STICKERS_PRODUCT: ShopProduct = {
    id: 'shop-prod-stickers-1',
    title: 'Sticker Pack',
    description: 'A pack of three high-quality, vinyl stickers featuring the MonetizePro logo and related designs. Perfect for your laptop or water bottle.',
    options: [],
    collectionIds: [MOCK_ACCESSORIES_COLLECTION.id],
    tags: ["swag"],
    media: [{ type: 'image', url: 'https://picsum.photos/seed/stickers-main/800/800', alt: 'Sticker Pack' }],
    variants: [{
        id: 'v8', sku: 'MP-STICK-3PK', title: "3-Pack", price: 800, inventory_quantity: 100, inventory_policy: 'deny', options: {}
    }]
};

export const MOCK_EBOOK_PRODUCT: ShopProduct = {
    id: 'shop-prod-ebook-1',
    title: 'The Ultimate Guide to React',
    description: 'A comprehensive guide covering hooks, state management, and advanced patterns. Instant PDF download.',
    options: [], media: [{ type: 'image', url: 'https://picsum.photos/seed/ebook/600/400', alt: 'Ebook cover' }],
    variants: [{ id: 'v-ebook-1', sku: 'EBOOK-PDF', title: 'PDF', price: 1999, inventory_quantity: 9999, inventory_policy: 'continue', options: {} }]
};
  
export const MOCK_MUSIC_ALBUM_PRODUCT: ShopProduct = {
    id: 'shop-prod-album-1',
    title: 'Echoes of Tomorrow',
    description: 'The brand new 12-track album. Includes high-quality MP3 files.',
    options: [], media: [{ type: 'image', url: 'https://picsum.photos/seed/albumcover/600/600', alt: 'Album cover' }],
    variants: [{ id: 'v-album-1', sku: 'ALBUM-DIGI', title: 'Digital Album', price: 999, inventory_quantity: 9999, inventory_policy: 'continue', options: {} }]
};
  
export const MOCK_ART_PRINT_PRODUCT: ShopProduct = {
    id: 'shop-prod-artprint-1',
    title: 'Limited Print: "Genesis"',
    description: 'A 24"x36" giclée print on archival paper, signed and numbered. Limited to 50 editions.',
    options: [], media: [{ type: 'image', url: 'https://picsum.photos/seed/artprint/600/800', alt: 'Art print' }],
    variants: [{ id: 'v-art-1', sku: 'ART-GENESIS', title: 'Signed Print', price: 15000, inventory_quantity: 50, inventory_policy: 'deny', options: {} }]
};
  
export const MOCK_ONLINE_COURSE_PRODUCT: ShopProduct = {
    id: 'shop-prod-course-1',
    title: 'Mastering Modern JavaScript',
    description: 'Lifetime access to our complete video course, including 10 modules, quizzes, and project files.',
    options: [], media: [{ type: 'image', url: 'https://picsum.photos/seed/jscourse/800/450', alt: 'Course banner' }],
    variants: [{ id: 'v-course-1', sku: 'COURSE-JS', title: 'Lifetime Access', price: 24900, inventory_quantity: 9999, inventory_policy: 'continue', options: {} }]
};

export const MOCK_GADGET_PRODUCT: ShopProduct = {
    id: 'shop-prod-gadget-1',
    title: 'Nova Smartwatch (Pre-Order)',
    description: 'Be the first to get the Nova Smartwatch. Features a 1.8" OLED display, 7-day battery life, and advanced health tracking. Ships in Q4.',
    options: ["Color"], media: [{ type: 'image', url: 'https://picsum.photos/seed/smartwatch/600/600', alt: 'Nova Smartwatch' }],
    variants: [
        { id: 'v-gadget-1', sku: 'NOVA-BLK', title: 'Midnight Black', price: 19900, inventory_quantity: 500, inventory_policy: 'deny', options: { "Color": "Midnight Black" } },
        { id: 'v-gadget-2', sku: 'NOVA-SLV', title: 'Starlight Silver', price: 19900, inventory_quantity: 500, inventory_policy: 'deny', options: { "Color": "Starlight Silver" } },
        { id: 'v-gadget-3', sku: 'NOVA-BLU', title: 'Ocean Blue', price: 19900, inventory_quantity: 250, inventory_policy: 'deny', options: { "Color": "Ocean Blue" } },
    ]
};

export const MOCK_PRODUCT: Product = {
  id: 'prod_1',
  name: 'Eco Water Bottle',
  description: 'Stay hydrated with our stylish and durable eco-friendly water bottle. Made from recycled materials, BPA-free.',
  price: 25.99,
  currency: 'USD',
  imageUrl: 'https://picsum.photos/seed/bottle/600/400',
};

export const MOCK_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'sub_basic',
    name: 'Basic',
    price: 9.99,
    billingCycle: 'monthly',
    currency: 'USD',
    features: ['Access to 10 items/month', 'Standard support', 'Community forum'],
  },
  {
    id: 'sub_premium',
    name: 'Premium',
    price: 19.99,
    billingCycle: 'monthly',
    currency: 'USD',
    features: ['Unlimited items', 'Priority support', 'Exclusive content', 'Early access'],
  },
  {
    id: 'sub_annual',
    name: 'Annual Pro',
    price: 199.99,
    billingCycle: 'yearly',
    currency: 'USD',
    features: ['All Premium features', '2 months free', 'Dedicated account manager'],
  },
];

export const MOCK_RENTABLE_ITEMS: RentableItem[] = [
  {
    id: 'rent_bike',
    name: 'City Bicycle',
    ratePerHour: 5.00,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/bike/600/400',
  },
  {
    id: 'rent_scooter',
    name: 'Electric Scooter',
    ratePerHour: 8.50,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/scooter/600/400',
  },
  {
    id: 'rent_kayak',
    name: 'Kayak (Single)',
    ratePerHour: 15.00,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/kayak/600/400',
  },
];

export const MOCK_PARKING_RATES: ParkingRate[] = [
    { id: 'park_1h', duration: "1 Hour", price: 3.00, hours: 1 },
    { id: 'park_3h', duration: "3 Hours", price: 8.00, hours: 3 },
    { id: 'park_allday', duration: "All Day (8 Hours)", price: 20.00, hours: 8 },
];

export const MOCK_RESTAURANT_BILL_ITEMS: BillItem[] = [
  { id: 'item_burger', name: 'Classic Burger', price: 12.50, quantity: 1 },
  { id: 'item_fries', name: 'Large Fries', price: 4.00, quantity: 1 },
  { id: 'item_soda', name: 'Soda (Refill)', price: 2.50, quantity: 2 },
  { id: 'item_salad', name: 'Garden Salad', price: 8.00, quantity: 1 },
];

export const PREDEFINED_TIP_PERCENTAGES = [0.10, 0.15, 0.20];
export const DEFAULT_TAX_RATE = 0.08; // 8%

export const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export const PREDEFINED_DONATION_AMOUNTS = [10, 25, 50, 100];
export const PREDEFINED_TIP_AMOUNTS = [1, 2, 5, 10]; // Generic tip amounts

export const MOCK_EVENT_TICKET_TYPES: TicketType[] = [
  { id: 'tix_ga', name: 'General Admission', price: 25, description: 'Standard entry to the event.' },
  { id: 'tix_vip', name: 'VIP Pass', price: 75, description: 'Includes priority entry and a complimentary drink.' },
];

export const MOCK_DURATION_OPTIONS: DurationOption[] = [
    { id: 'opt_30min', label: '30 Minute Session', price: 50, description: 'A quick consultation.'},
    { id: 'opt_60min', label: '60 Minute Session', price: 90, description: 'Standard consultation length.'},
    { id: 'opt_90min', label: '90 Minute Intensive', price: 120, description: 'In-depth discussion and planning.'},
];


export const MOCK_CUSTOMER_PORTAL_DATA = {
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
  },
  subscriptions: [
    { id: 'sub_1', planName: 'Pro Tier', status: 'active' as const, amount: 79.00, currency: 'USD', nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: 'sub_2', planName: 'Basic Tier', status: 'canceled' as const, amount: 29.00, currency: 'USD', nextBillingDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
  ],
  paymentHistory: [
    { id: 'pi_1', date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], description: 'Pro Tier Subscription', amount: 79.00, currency: 'USD', status: 'succeeded' as const },
    { id: 'pi_2', date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], description: 'Pro Tier Subscription', amount: 79.00, currency: 'USD', status: 'succeeded' as const },
    { id: 'pi_3', date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], description: 'Pro Tier Subscription', amount: 79.00, currency: 'USD', status: 'succeeded' as const },
  ]
};

export const SIMULATED_USERS = [
  { name: 'Alice (Creator)', subdomain: 'alice-makes-art' },
  { name: 'Bob (Bike Shop)', subdomain: 'bobs-bikes' },
  { name: 'Charlie (Charity)', subdomain: 'charlies-charity' },
];

// --- Customer Portal Default Config ---
export const DEFAULT_CUSTOMER_PORTAL_CONFIG: CustomerPortalConfig = {
    tenantId: '',
    portalTitle: "My Account",
    welcomeMessage: "Welcome! Here you can manage your subscriptions and view your payment history.",
    theme: 'light',
    showPaymentHistory: true,
    allowSubscriptionCancellation: true,
    allowPaymentMethodUpdate: true,
    supportContactInfo: "For support, please email support@example.com",
};


export const generateMockDataForTenant = (tenantId: string): AdminDashboardData => {
  const products: StripeProduct[] = [
    { id: 'prod_sw_01', tenantId, active: true, name: 'Pro Software', description: 'Our flagship professional software suite.', images: ['https://picsum.photos/seed/software/200/200'], metadata: { version: '2.5' } },
    { id: 'prod_coffee_01', tenantId, active: true, name: 'Artisan Coffee Beans', description: 'Curated single-origin coffee beans, delivered fresh.', images: ['https://picsum.photos/seed/coffee/200/200'], metadata: { origin: 'Ethiopia' } },
    { id: 'prod_ebook_01', tenantId, active: true, name: 'The Ultimate Guide to X', description: 'A comprehensive ebook.', images: ['https://picsum.photos/seed/ebook/200/200'], metadata: { pages: '250' } },
    { id: 'prod_service_01', tenantId, active: false, name: 'Legacy Consultation', description: 'A deprecated service offering.', images: [], metadata: {} },
  ];

  const prices: StripePrice[] = [
    { id: 'price_sw_monthly', tenantId, product: 'prod_sw_01', active: true, unit_amount: 7900, currency: 'usd', type: 'recurring' as const, recurring: { interval: 'month' as const, interval_count: 1 } },
    { id: 'price_sw_yearly', tenantId, product: 'prod_sw_01', active: true, unit_amount: 79000, currency: 'usd', type: 'recurring' as const, recurring: { interval: 'year' as const, interval_count: 1 } },
    { id: 'price_coffee_monthly', tenantId, product: 'prod_coffee_01', active: true, unit_amount: 2500, currency: 'usd', type: 'recurring' as const, recurring: { interval: 'month' as const, interval_count: 1 } },
    { id: 'price_ebook_onetime', tenantId, product: 'prod_ebook_01', active: true, unit_amount: 1999, currency: 'usd', type: 'one_time' as const },
    { id: 'price_legacy_inactive', tenantId, product: 'prod_service_01', active: false, unit_amount: 50000, currency: 'usd', type: 'one_time' as const },
  ];

  const coupons: StripeCoupon[] = [
    { id: 'SUMMER25', tenantId, name: 'Summer Sale 25% Off', percent_off: 25, valid: true },
    { id: 'WELCOME10', tenantId, name: 'Welcome Discount $10', amount_off: 1000, currency: 'usd', valid: true },
    { id: 'EXPIRED', tenantId, name: 'Expired Coupon', percent_off: 50, valid: false },
  ];

  const taxRates: StripeTaxRate[] = [
    { id: 'txr_ca_sales', tenantId, active: true, display_name: 'CA Sales Tax', inclusive: false, percentage: 9.25, country: 'US', state: 'CA', jurisdiction: 'US - CA' },
    { id: 'txr_de_vat', tenantId, active: true, display_name: 'DE VAT', inclusive: true, percentage: 19.0, country: 'DE', jurisdiction: 'DE' },
    { id: 'txr_inactive', tenantId, active: false, display_name: 'Old Tax', inclusive: false, percentage: 5.0, country: 'US' },
  ];

  const shippingRates: StripeShippingRate[] = [
    { id: 'shr_standard', tenantId, active: true, display_name: 'Standard Shipping', type: 'fixed_amount', fixed_amount: { amount: 500, currency: 'usd' }, delivery_estimate: { minimum: { unit: 'day', value: 5 }, maximum: { unit: 'day', value: 7 } } },
    { id: 'shr_express', tenantId, active: true, display_name: 'Express Shipping', type: 'fixed_amount', fixed_amount: { amount: 2000, currency: 'usd' }, delivery_estimate: { minimum: { unit: 'day', value: 1 }, maximum: { unit: 'day', value: 2 } } }
  ];

  const customers: StripeCustomer[] = [
    { id: 'cus_alice', tenantId, name: 'Alice Johnson', email: 'alice.j@example.com', phone: '555-0101', created: Math.floor(Date.now() / 1000) - 86400 * 30 },
    { id: 'cus_bob', tenantId, name: 'Bob Williams', email: 'bob.w@example.com', phone: '555-0102', created: Math.floor(Date.now() / 1000) - 86400 * 60 },
    { id: 'cus_charlie', tenantId, name: 'Charlie Davis', email: 'charlie.d@example.com', phone: '555-0103', created: Math.floor(Date.now() / 1000) - 86400 * 5 },
    { id: 'cus_diana', tenantId, name: 'Diana Miller', email: 'diana.m@example.com', phone: '555-0104', created: Math.floor(Date.now() / 1000) - 86400 * 2 },
  ];

  const subscriptions: StripeSubscription[] = [
    { id: 'sub_alice_sw', tenantId, customer: 'cus_alice', status: 'active' as const, items: [{ price: 'price_sw_yearly' }], created: Math.floor(Date.now() / 1000) - 86400 * 25, current_period_start: Math.floor(Date.now() / 1000) - 86400 * 25, current_period_end: Math.floor(Date.now() / 1000) + 86400 * (365 - 25) },
    { id: 'sub_bob_coffee', tenantId, customer: 'cus_bob', status: 'active' as const, items: [{ price: 'price_coffee_monthly' }], created: Math.floor(Date.now() / 1000) - 86400 * 50, current_period_start: Math.floor(Date.now() / 1000) - 86400 * 20, current_period_end: Math.floor(Date.now() / 1000) + 86400 * 10 },
    { id: 'sub_charlie_sw', tenantId, customer: 'cus_charlie', status: 'canceled' as const, items: [{ price: 'price_sw_monthly' }], created: Math.floor(Date.now() / 1000) - 86400 * 90, current_period_start: Math.floor(Date.now() / 1000) - 86400 * 60, current_period_end: Math.floor(Date.now() / 1000) - 86400 * 30 },
  ];

  const transactions: StripeTransaction[] = [
    { id: 'txn_diana_ebook', tenantId, customer: 'cus_diana', amount: 1999, currency: 'usd', status: 'succeeded' as const, description: 'The Ultimate Guide to X', created: Math.floor(Date.now() / 1000) - 86400 * 2, pageId: 'ps-ebook', productId: 'prod_ebook_01' },
    { id: 'txn_bob_coffee_1', tenantId, customer: 'cus_bob', amount: 2500, currency: 'usd', status: 'succeeded' as const, description: 'Artisan Coffee Beans', created: Math.floor(Date.now() / 1000) - 86400 * 50, pageId: 'sub-coffee-box', productId: 'prod_coffee_01' },
    { id: 'txn_bob_coffee_2', tenantId, customer: 'cus_bob', amount: 2500, currency: 'usd', status: 'succeeded' as const, description: 'Artisan Coffee Beans', created: Math.floor(Date.now() / 1000) - 86400 * 20, pageId: 'sub-coffee-box', productId: 'prod_coffee_01' },
    { id: 'txn_alice_sw', tenantId, customer: 'cus_alice', amount: 79000, currency: 'usd', status: 'succeeded' as const, description: 'Pro Software', created: Math.floor(Date.now() / 1000) - 86400 * 25, pageId: 'sub-software', productId: 'prod_sw_01' },
    { id: 'txn_guest_donation', tenantId, customer: null, amount: 5000, currency: 'usd', status: 'succeeded' as const, description: 'Grow Our Community Garden', created: Math.floor(Date.now() / 1000) - 86400 * 1, pageId: 'fr-community-garden' },
    { id: 'txn_charlie_failed', tenantId, customer: 'cus_charlie', amount: 7900, currency: 'usd', status: 'failed' as const, description: 'Pro Software', created: Math.floor(Date.now() / 1000) - 86400 * 30, pageId: 'sub-software', productId: 'prod_sw_01' },
    { id: 'txn_ebook_sale', tenantId, customer: 'cus_diana', amount: 1500, currency: 'usd', status: 'succeeded' as const, description: 'Digital Content: React Ebook', created: Math.floor(Date.now() / 1000) - 86400 * 3, pageId: 'dca-photo-pack', productId: 'prod_ebook_01' },
  ];
  
  const digitalAssets: DigitalAsset[] = [
    { id: 'da_ebook_react', tenantId, name: 'React Ebook PDF', description: 'The Ultimate Guide to React in PDF format.', fileName: 'ultimate-react-guide.pdf', fileUrl: '#', fileType: 'PDF', fileSize: 4500 },
    { id: 'da_icon_pack', tenantId, name: 'Minimalist Icon Pack', description: 'A pack of 100 SVG icons for designers.', fileName: 'icon-pack-minimal.zip', fileUrl: '#', fileType: 'ZIP', fileSize: 1200 },
    { id: 'da_music_track', tenantId, name: 'Lofi Chill Track', description: 'A royalty-free music track.', fileName: 'lofi-chill.mp3', fileUrl: '#', fileType: 'MP3', fileSize: 8000 },
  ];

  const donations: Donation[] = [
    { id: 'don_1', tenantId, pageId: 'fr-community-garden', donorName: 'Alice J.', amount: 50, timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: 'don_2', tenantId, pageId: 'fr-community-garden', donorName: 'Bob K.', amount: 100, timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString() },
    { id: 'don_3', tenantId, pageId: 'fr-community-garden', donorName: 'Charlie P.', amount: 25, timestamp: new Date(Date.now() - 86400000 * 1).toISOString() },
    { id: 'don_4', tenantId, pageId: 'fr-community-garden', donorName: 'Anonymous', amount: 75, timestamp: new Date(Date.now() - 86400000 * 0.5).toISOString() },
  ];

  const vouchers: Voucher[] = [
    { id: 'vouch_1', tenantId, code: 'GIFT-DEMO-123', initialAmount: 2500, remainingAmount: 2500, currency: 'usd', status: 'active', createdAt: new Date().toISOString(), createdFromPageId: 'voucher-standard' },
  ];

  const users: TenantUser[] = [
    { id: 'user_1', email: 'owner@example.com', role: UserRole.Admin, status: 'Accepted' },
    { id: 'user_2', email: 'editor@example.com', role: UserRole.Editor, status: 'Accepted' },
    { id: 'user_3', email: 'viewer@example.com', role: UserRole.Viewer, status: 'Pending' },
  ];

  const dailyMetrics: DailyTransactionMetrics[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const dailyRevenue = transactions
        .filter(t => t.status === 'succeeded' && new Date(t.created * 1000).toISOString().startsWith(dateString))
        .reduce((sum, t) => sum + t.amount, 0) / 100;
        
      dailyMetrics.push({
          date: dateString,
          revenue: Math.random() * 50 + dailyRevenue,
          transactions: Math.floor(Math.random() * 3) + (dailyRevenue > 0 ? 1 : 0),
      });
  }


  return {
    summaryStats: {
      totalRevenue: transactions.filter(t => t.status === 'succeeded').reduce((sum, t) => sum + t.amount, 0) / 100,
      activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
      totalCustomers: customers.length,
      totalTransactions: transactions.length,
    },
    pages: [
      { id: 'fr-community-garden', tenantId, name: 'Community Garden', useCase: MonetizationUseCase.FUNDRAISING, revenue: 50, transactions: 1, createdAt: '2023-01-15', status: 'published' },
      { id: 'sub-software', tenantId, name: 'Software Access', useCase: MonetizationUseCase.SUBSCRIPTION_RENTAL, revenue: 790, transactions: 1, createdAt: '2023-02-01', status: 'published' },
      { id: 'park-city-center', tenantId, name: 'City Center Parking', useCase: MonetizationUseCase.PARKING_SESSION, revenue: 0, transactions: 0, createdAt: '2023-03-10', status: 'draft' },
      { id: 'ps-ebook', tenantId, name: 'Digital Ebook', useCase: MonetizationUseCase.PRODUCT_SALE, revenue: 19.99, transactions: 1, createdAt: '2023-03-20', status: 'published' },
      { id: 'dca-photo-pack', tenantId, name: 'Nature Photo Pack', useCase: MonetizationUseCase.DIGITAL_CONTENT_ACCESS, revenue: 15, transactions: 1, createdAt: '2023-04-01', status: 'published' },
      { id: 'ps-tshirt', tenantId, name: 'Merch T-Shirt', useCase: MonetizationUseCase.PRODUCT_SALE, revenue: 0, transactions: 0, createdAt: '2023-05-01', status: 'draft' },
    ],
    products,
    prices,
    shopProducts: [MOCK_TSHIRT_PRODUCT, MOCK_MUG_PRODUCT, MOCK_STICKERS_PRODUCT, MOCK_EBOOK_PRODUCT, MOCK_MUSIC_ALBUM_PRODUCT, MOCK_ART_PRINT_PRODUCT, MOCK_ONLINE_COURSE_PRODUCT, MOCK_GADGET_PRODUCT],
    collections: [MOCK_APPAREL_COLLECTION, MOCK_ACCESSORIES_COLLECTION],
    coupons,
    taxRates,
    shippingRates,
    customers,
    subscriptions,
    transactions,
    sessions: [],
    dailyMetrics,
    emailTemplates: [
      { id: 'email_welcome', tenantId, name: 'Welcome Email (Tickets)', subject: 'Your Ticket for {{page_name}}', body: 'Hi {{customer_name}},\\n\\nThanks for your purchase! Here is your session link: {{session_link}}', triggerPageId: 'event-music-fest', triggerSessionStatus: SessionStatus.PAID, isEnabled: true },
      { id: 'email_parking_active', tenantId, name: 'Parking Started', subject: 'Your parking session for {{page_name}} has started', body: 'Your parking session is now active. You paid {{total_amount}}.', triggerPageId: 'park-city-center', triggerSessionStatus: SessionStatus.ACTIVE, isEnabled: true }
    ],
    digitalAssets,
    donations,
    vouchers,
    users,
  };
};

export const generateEmptyDataForTenant = (tenantId: string): AdminDashboardData => ({
  summaryStats: {
    totalRevenue: 0,
    activeSubscriptions: 0,
    totalCustomers: 0,
    totalTransactions: 0,
  },
  pages: [],
  products: [],
  shopProducts: [MOCK_TSHIRT_PRODUCT, MOCK_MUG_PRODUCT, MOCK_STICKERS_PRODUCT],
  collections: [MOCK_APPAREL_COLLECTION, MOCK_ACCESSORIES_COLLECTION],
  prices: [],
  coupons: [],
  taxRates: [],
  shippingRates: [],
  customers: [],
  subscriptions: [],
  transactions: [],
  sessions: [],
  dailyMetrics: [],
  emailTemplates: [],
  digitalAssets: [],
  donations: [],
  vouchers: [],
  users: [],
});

// --- FAKE DATA GENERATOR ---
const generateRandomId = (prefix = 'rand') => `${prefix}_${Math.random().toString(36).substring(2, 10)}`;

const fakeProductNames = ['Eco-Friendly Water Bottle', 'Handcrafted Leather Wallet', 'Smart Home Hub', 'Gourmet Coffee Blend', 'Digital Art Print Pack'];
const fakeCustomerNames = ['Liam Smith', 'Olivia Johnson', 'Noah Williams', 'Emma Brown', 'Oliver Jones'];

export const generateFakeDataForEntityType = (entityType: string, currentData?: AdminDashboardData) => {
  switch (entityType) {
    case 'products':
      return {
        active: true,
        name: fakeProductNames[Math.floor(Math.random() * fakeProductNames.length)],
        description: 'A high-quality, excellent product for your everyday needs.',
        images: [`https://picsum.photos/seed/${generateRandomId()}/200/200`],
      };
    case 'prices':
      return {
        product: currentData?.products[0]?.id || '', // Link to first product if available
        active: true,
        unit_amount: Math.floor(Math.random() * 5000) + 1000, // 10.00 to 60.00
        currency: 'usd',
        type: 'one_time',
      };
    case 'customers':
      const name = fakeCustomerNames[Math.floor(Math.random() * fakeCustomerNames.length)];
      return {
        name: name,
        email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
      };
    case 'digitalAssets':
      return {
        name: 'My New Asset',
        description: 'A valuable digital download.',
        fileName: 'asset.zip',
        fileUrl: 'https://example.com/download/asset.zip',
        fileType: 'ZIP',
        fileSize: 1024,
      };
    // Add cases for subscriptions and transactions if needed, though they are more complex
    default:
      return {};
  }
};