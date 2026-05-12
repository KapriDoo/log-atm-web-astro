/**
 * LOG ATM — Constantes centralizadas
 * Nunca duplicar estos valores en componentes. Siempre importar desde aquí.
 */

export const SITE = {
  name: 'LOG ATM',
  url: 'https://logatm.com',
  tagline: 'Logística a tu medida',
  phone: '+56942162739',
  phoneDisplay: '+56 9 4216 2739',
  email: 'mpazrivera@logatm.com',
  address: 'Av. Pdte Kennedy 5600, Of. 507, Vitacura, Santiago, Chile',
  whatsappUrl: 'https://wa.me/56942162739?text=Hola%2C%20me%20interesa%20cotizar',
  social: {
    facebook: 'https://facebook.com/logatm',
    twitter: 'https://twitter.com/logatm',
    instagram: 'https://instagram.com/logatm',
  },
} as const;

export const SEO = {
  defaultTitle: `${SITE.name} — ${SITE.tagline}`,
  defaultDescription:
    'Logística aérea y marítima a tu medida. Carga internacional, aduana, almacenaje y consultoría desde Vitacura, Santiago, Chile.',
  defaultImage: `${SITE.url}/og-default.svg`,
  locale: 'es_CL',
  twitterHandle: '@logatm',
} as const;

// Navegación principal — anclas hacia secciones del home + CTA
export const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#industrias', label: 'Industrias' },
  { href: '#why', label: 'Por qué LOG ATM' },
  { href: '#contacto', label: 'Contacto' },
] as const;

// Links del footer — Servicios (sub-páginas reales)
export const FOOTER_SERVICES = [
  { href: '/servicios/carga-aerea', label: 'Carga Aérea' },
  { href: '/servicios/carga-maritima', label: 'Carga Marítima' },
  { href: '#servicios', label: 'Aduana y Documentación' },
  { href: '#servicios', label: 'Almacenaje' },
  { href: '#contacto', label: 'Consultoría Logística' },
] as const;

// Links del footer — Empresa
export const FOOTER_COMPANY = [
  { href: '/nosotros', label: 'Nosotros' },
  { href: '#industrias', label: 'Industrias' },
  { href: '#why', label: 'Por qué elegirnos' },
  { href: '/cotizar', label: 'Cotizar' },
  { href: '/contacto', label: 'Contacto' },
] as const;

// Stats del hero strip y stats band
export const STATS = [
  { value: '20+', label: 'Años de operación', icon: 'lucide:award' },
  { value: '70+', label: 'Países conectados', icon: 'lucide:globe' },
  { value: '98%', label: 'Satisfacción', icon: 'lucide:sparkles' },
  { value: '1:1', label: 'Ejecutivo dedicado', icon: 'lucide:user-check' },
] as const;

// Servicios — 11 cards en bento grid con foto, tag y tamaño
// size: feature (col-span-6, alto) | wide (col-span-6) | std (col-span-4) | mini (col-span-3)
export const SERVICES = [
  {
    n: '01',
    title: 'Carga Aérea',
    img: '/images/services/svc-aerea.jpeg',
    desc: 'Express, courier internacional y chárter aéreo con tiempos garantizados.',
    tag: 'Express · 48h',
    icon: 'lucide:plane-takeoff',
    size: 'feature',
    isCta: false,
    href: '/servicios/carga-aerea',
  },
  {
    n: '02',
    title: 'Carga Marítima',
    img: '/images/services/svc-maritima.jpeg',
    desc: 'FCL y LCL a 80+ puertos. Consolidamos para reducir costos.',
    tag: 'FCL · LCL',
    icon: 'lucide:ship',
    size: 'wide',
    isCta: false,
    href: '/servicios/carga-maritima',
  },
  {
    n: '03',
    title: 'Aduana y Documentación',
    img: '/images/services/svc-aduana.jpeg',
    desc: 'DUS, certificados de origen y clasificación arancelaria.',
    tag: 'OEA Chile',
    icon: 'lucide:file-check',
    size: 'std',
    isCta: false,
    href: '#servicios',
  },
  {
    n: '04',
    title: 'Almacenaje',
    img: '/images/services/svc-almacenaje.jpeg',
    desc: 'Bodegaje, fulfillment y última milla con inventario en tiempo real.',
    tag: '24/7',
    icon: 'lucide:warehouse',
    size: 'std',
    isCta: false,
    href: '#servicios',
  },
  {
    n: '05',
    title: 'Consultoría Logística',
    img: '/images/services/svc-consultoria.jpeg',
    desc: 'Supply chain a medida que reduce costos y plazos.',
    tag: 'A tu medida',
    icon: 'lucide:compass',
    size: 'std',
    isCta: true,
    href: '/cotizar',
  },
  {
    n: '06',
    title: 'Courier Internacional',
    img: '/images/services/svc-courier.jpeg',
    desc: 'Envíos exprés puerta a puerta con cobertura global.',
    tag: 'D2D',
    icon: 'lucide:package',
    size: 'wide',
    isCta: false,
    href: '#servicios',
  },
  {
    n: '07',
    title: 'Seguros de Carga',
    img: '/images/services/svc-seguros.jpeg',
    desc: 'Cobertura integral durante todo el trayecto.',
    tag: 'Global',
    icon: 'lucide:shield-check',
    size: 'std',
    isCta: false,
    href: '#servicios',
  },
  {
    n: '08',
    title: 'Desconsolidado',
    img: '/images/services/svc-desconsolidado.jpeg',
    desc: 'Recepción, fraccionamiento y distribución desde puerto.',
    tag: 'LCL',
    icon: 'lucide:container',
    size: 'std',
    isCta: false,
    href: '#servicios',
  },
  {
    n: '09',
    title: 'Casillero USA',
    img: '/images/services/svc-casillero.jpeg',
    desc: 'Dirección propia en EE.UU. para compras online.',
    tag: 'Miami',
    icon: 'lucide:mail',
    size: 'mini',
    isCta: false,
    href: '#servicios',
  },
  {
    n: '10',
    title: 'Compras Internacionales',
    img: '/images/services/svc-asesoria.jpeg',
    desc: 'Asesoría completa: proveedores, pagos y logística.',
    tag: 'Asesoría',
    icon: 'lucide:handshake',
    size: 'mini',
    isCta: false,
    href: '#servicios',
  },
  {
    n: '11',
    title: 'Ruta Medio Oriente',
    img: '/images/services/svc-medio-oriente.jpeg',
    desc: 'Conexión especializada con socios locales de confianza.',
    tag: 'DXB · JED',
    icon: 'lucide:globe-2',
    size: 'wide',
    isCta: true,
    href: '#servicios',
  },
] as const;

// Razones para elegir LOG ATM — con métrica destacada
export const WHY_ITEMS = [
  {
    icon: 'lucide:user-round-check',
    title: 'Ejecutivo dedicado',
    desc: 'Una persona que conoce tu negocio y anticipa tus necesidades.',
    metric: '1:1',
    sub: 'cuenta',
  },
  {
    icon: 'lucide:globe-2',
    title: 'Red en 70+ países',
    desc: 'Alianzas verificadas para garantizar plazos de entrega.',
    metric: '70+',
    sub: 'países',
  },
  {
    icon: 'lucide:clock',
    title: 'Atención 24/7',
    desc: 'Soporte directo con tu ejecutivo cuando lo necesites.',
    metric: '24/7',
    sub: 'soporte',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Expertise en aduana Chile',
    desc: 'Operadores certificados por Aduanas (OEA).',
    metric: 'OEA',
    sub: 'certificación',
  },
] as const;

// Industrias atendidas (12 con foto en home; el catálogo completo puede crecer en /industrias)
export const INDUSTRIES = [
  { icon: 'lucide:pickaxe',       name: 'Minería',            sub: 'Cobre, litio, maquinaria pesada',   color: '#658fc3', img: '/images/industries/ind-mineria.jpeg' },
  { icon: 'lucide:shopping-bag',  name: 'Retail',             sub: 'Moda, consumo, temporada',          color: '#3EB978', img: '/images/industries/ind-retail.jpeg' },
  { icon: 'lucide:wheat',         name: 'Agroindustria',      sub: 'Fruta fresca, vinos, granos',       color: '#2D9B6F', img: '/images/industries/ind-agro.jpeg' },
  { icon: 'lucide:pill',          name: 'Farmacéutica',       sub: 'Cadena de frío, reactivos',         color: '#4A7BB5', img: '/images/industries/ind-farma.jpeg' },
  { icon: 'lucide:shopping-cart', name: 'E-commerce',         sub: 'Cross-border, fulfillment',         color: '#339965', img: '/images/industries/ind-ecommerce.jpeg' },
  { icon: 'lucide:hard-hat',      name: 'Construcción',       sub: 'Maquinaria, materiales',            color: '#3b6497', img: '/images/industries/ind-construccion.jpeg' },
  { icon: 'lucide:hammer',        name: 'Chatarra Ferrosa',   sub: 'Reciclaje y exportación',           color: '#7a7a7a', img: '/images/industries/ind-chatarra.jpeg' },
  { icon: 'lucide:lightbulb',     name: 'Iluminarias',        sub: 'LED e industrial',                  color: '#cc7614', img: '/images/industries/ind-iluminarias.jpeg' },
  { icon: 'lucide:car',           name: 'Vehículos Usados',   sub: 'Importación y trámites',            color: '#e84c3d', img: '/images/industries/ind-vehiculos.jpeg' },
  { icon: 'lucide:briefcase',     name: 'Efectos Personales', sub: 'Mudanzas internacionales',          color: '#9b59b6', img: '/images/industries/ind-efectos.jpeg' },
  { icon: 'lucide:settings',      name: 'Maquinaria',         sub: 'Industrial y agrícola',             color: '#34495e', img: '/images/industries/ind-maquinaria.jpeg' },
  { icon: 'lucide:scissors',      name: 'Textil',             sub: 'Prendas, telas, accesorios',        color: '#e91e63', img: '/images/industries/ind-textil.jpeg' },
] as const;

// Rutas marítimas/aéreas mostradas en el panel translúcido del hero
export const LIVE_ROUTES = [
  { from: 'Shanghai',  to: 'San Antonio', mode: 'sea', eta: '12d', status: 'transit' },
  { from: 'Miami',     to: 'Santiago',    mode: 'air', eta: '36h', status: 'transit' },
  { from: 'Rotterdam', to: 'Valparaíso',  mode: 'sea', eta: '21d', status: 'port' },
  { from: 'Hong Kong', to: 'Iquique',     mode: 'sea', eta: '18d', status: 'transit' },
] as const;

// Año actual para copyright
export const CURRENT_YEAR = new Date().getFullYear();
