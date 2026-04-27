/**
 * LOG ATM — Constantes centralizadas
 * Nunca duplicar estos valores en componentes. Siempre importar desde aquí.
 */

export const SITE = {
  name: 'LOG ATM',
  url: 'https://logatm.com',
  tagline: 'Logística a tu medida',
  phone: '+56942162739',
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

// Navegación principal
export const NAV_LINKS = [
  { href: '/servicios/carga-aerea', label: 'Carga Aérea' },
  { href: '/servicios/carga-maritima', label: 'Carga Marítima' },
  { href: '#servicios-aduanas', label: 'Aduana' },
  { href: '#servicios-almacenaje', label: 'Almacenaje' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
] as const;

// Links del footer — Servicios
export const FOOTER_SERVICES = [
  { href: '#servicios-carga-aerea', label: 'Carga Aérea' },
  { href: '#servicios-carga-maritima', label: 'Carga Marítima' },
  { href: '#servicios-aduanas', label: 'Aduana y Documentación' },
  { href: '#servicios-almacenaje', label: 'Almacenaje y Distribución' },
  { href: '#cotizar', label: 'Consultoría Logística' },
] as const;

// Links del footer — Empresa
export const FOOTER_COMPANY = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#industrias', label: 'Industrias' },
  { href: '#rutas', label: 'Rutas y Cobertura' },
  { href: '#recursos', label: 'Recursos y Blog' },
  { href: '#contacto', label: 'Contacto' },
] as const;

// Stats de la banda de confianza
export const STATS = [
  { value: '15+', label: 'Años de experiencia', icon: 'lucide:award', anim: 'award' },
  { value: '80+', label: 'Países conectados', icon: 'lucide:globe', anim: 'globe' },
  { value: '5.000+', label: 'Envíos por año', icon: 'lucide:package', anim: 'package' },
  { value: '98%', label: 'Satisfacción', icon: 'lucide:sparkles', anim: 'sparkles' },
] as const;

// Servicios ofrecidos
export const SERVICES = [
  {
    n: '01',
    icon: 'lucide:plane-takeoff',
    title: 'Carga Aérea',
    desc: 'Envíos urgentes, courier internacional y chárter aéreo con cobertura global y tiempos optimizados.',
    href: '#servicios-carga-aerea',
    accent: false,
  },
  {
    n: '02',
    icon: 'lucide:ship',
    title: 'Carga Marítima',
    desc: 'FCL y LCL a los principales puertos del mundo. Consolidamos tu carga para reducir costos.',
    href: '#servicios-carga-maritima',
    accent: false,
  },
  {
    n: '03',
    icon: 'lucide:file-check',
    title: 'Aduana y Documentación',
    desc: 'Gestión integral de trámites aduaneros, DUS, certificados de origen y clasificación arancelaria.',
    href: '#servicios-aduanas',
    accent: true,
  },
  {
    n: '04',
    icon: 'lucide:warehouse',
    title: 'Almacenaje',
    desc: 'Bodegaje seguro, fulfillment y distribución última milla con gestión de inventario en tiempo real.',
    href: '#servicios-almacenaje',
    accent: false,
  },
  {
    n: '05',
    icon: 'lucide:compass',
    title: 'Consultoría Logística',
    desc: 'Diseñamos tu supply chain a medida. Reducimos costos y plazos con soluciones personalizadas.',
    href: '#cotizar',
    accent: true,
  },
] as const;

// Razones para elegir LOG ATM
export const WHY_ITEMS = [
  {
    icon: 'lucide:user-round-check',
    title: 'Ejecutivo dedicado',
    desc: 'Una persona que conoce tu negocio y anticipa tus necesidades.',
    anim: '',
  },
  {
    icon: 'lucide:globe-2',
    title: 'Red en 80+ países',
    desc: 'Alianzas verificadas para garantizar tus plazos de entrega.',
    anim: '',
  },
  {
    icon: 'lucide:map-pin',
    title: 'Rastreo en tiempo real',
    desc: 'Visualiza el estado de tu carga en cada etapa del proceso.',
    anim: 'pin-pulse',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Expertise en aduana Chile',
    desc: 'Operadores certificados por el Servicio Nacional de Aduanas.',
    anim: '',
  },
] as const;

// Industrias atendidas
export const INDUSTRIES = [
  { icon: 'lucide:pickaxe', name: 'Minería', sub: 'Cobre, litio, equipamiento pesado', color: '#658fc3' },
  { icon: 'lucide:shopping-bag', name: 'Retail', sub: 'Moda, consumo masivo, temporada', color: '#ed8c1d' },
  { icon: 'lucide:wheat', name: 'Agroindustria', sub: 'Fruta fresca, vinos, granos', color: '#2D9B6F' },
  { icon: 'lucide:pill', name: 'Farmacéutica', sub: 'Cadena de frío, reactivos', color: '#4A7BB5' },
  { icon: 'lucide:shopping-cart', name: 'E-commerce', sub: 'Cross-border, fulfillment', color: '#cc7614' },
  { icon: 'lucide:hard-hat', name: 'Construcción', sub: 'Maquinaria, materiales', color: '#3b6497' },
] as const;

// Año actual para copyright
export const CURRENT_YEAR = new Date().getFullYear();
