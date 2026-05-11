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
  { href: '/servicios', label: 'Servicios' },
  { href: '/industrias', label: 'Industrias' },
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
  { value: '20+', label: 'Años de experiencia', icon: 'lucide:award', anim: 'award' },
  { value: '70+', label: 'Países conectados', icon: 'lucide:globe', anim: 'globe' },
  { value: '98%', label: 'Satisfacción', icon: 'lucide:sparkles', anim: 'sparkles' },
  { value: '', label: 'Atendemos de manera personalizada', icon: 'lucide:user-check', anim: 'heart' },
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
  {
    n: '06',
    icon: 'lucide:package-check',
    title: 'Courier internacional',
    desc: 'Envíos exprés puerta a puerta con seguimiento internacional y entregas ágiles a cualquier destino.',
    href: '#servicios-courier',
    accent: false,
  },
  {
    n: '07',
    icon: 'lucide:shield-check',
    title: 'Seguros de Carga',
    desc: 'Protección integral para tu mercancía durante todo el trayecto, con coberturas flexibles y respaldo global.',
    href: '#servicios-seguros',
    accent: true,
  },
  {
    n: '08',
    icon: 'lucide:container',
    title: 'Desconsolidado',
    desc: 'Recepción, fraccionamiento y distribución de carga consolidada desde los principales puertos.',
    href: '#servicios-desconsolidado',
    accent: false,
  },
  {
    n: '09',
    icon: 'lucide:mail',
    title: 'Servicio de Casillero USA',
    desc: 'Dirección propia en Estados Unidos para recibir compras online y traerlas a Chile de forma rápida y segura.',
    href: '#servicios-casillero',
    accent: true,
  },
  {
    n: '10',
    icon: 'lucide:handshake',
    title: 'Asesoria en Compras Internacionales',
    desc: 'Te guiamos en el proceso de compra en el extranjero: proveedores, pagos, logística y entrega final.',
    href: '#servicios-asesoria',
    accent: false,
  },
  {
    n: '11',
    icon: 'lucide:globe-2',
    title: 'Te conectamos con el Medio Oriente',
    desc: 'Rutas especializadas hacia y desde el Medio Oriente con socios locales de confianza.',
    href: '#servicios-medio-oriente',
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
// NOTA: Los colores son datos de contenido (cada industria tiene su identidad
// visual distintiva), no tokens del sistema de diseño. Se mantienen aquí
// porque pertenecen al dominio de datos, no al dominio de estilos.
// Se aplican vía CSS custom property --ind-color en runtime.
export const INDUSTRIES = [
  { icon: 'lucide:pickaxe', name: 'Minería', sub: 'Cobre, litio, equipamiento pesado', color: '#658fc3', image: 'mineria', alt: 'Operación minera a cielo abierto con maquinaria pesada' },
  { icon: 'lucide:shopping-bag', name: 'Retail', sub: 'Moda, consumo masivo, temporada', color: '#3EB978', image: 'retail', alt: 'Tienda retail con estantes de productos' },
  { icon: 'lucide:wheat', name: 'Agroindustria', sub: 'Fruta fresca, vinos, granos', color: '#2D9B6F', image: 'agroindustria', alt: 'Campo agrícola con cosecha de frutas frescas' },
  { icon: 'lucide:pill', name: 'Farmacéutica', sub: 'Cadena de frío, reactivos', color: '#4A7BB5', image: 'farmaceutica', alt: 'Laboratorio farmacéutico con cadena de frío' },
  { icon: 'lucide:shopping-cart', name: 'E-commerce', sub: 'Cross-border, fulfillment', color: '#339965', image: 'ecommerce', alt: 'Centro de distribución de e-commerce con paquetes' },
  { icon: 'lucide:hard-hat', name: 'Construcción', sub: 'Maquinaria, materiales', color: '#3b6497', image: 'construccion', alt: 'Obra de construcción con maquinaria pesada' },
  { icon: 'lucide:hammer', name: 'Chatarra Ferrosa', sub: 'Reciclaje, exportación de metales', color: '#7a7a7a', image: 'chatarra-ferrosa', alt: 'Reciclaje de chatarra ferrosa y metales' },
  { icon: 'lucide:lightbulb', name: 'Iluminarias', sub: 'Equipos de iluminación LED e industrial', color: '#f5c842', image: 'iluminarias', alt: 'Sistemas de iluminación LED industrial' },
  { icon: 'lucide:car', name: 'Vehiculos Usados', sub: 'Importación y trámites de vehículos', color: '#e84c3d', image: 'vehiculos-usados', alt: 'Vehículos usados en patio de importación' },
  { icon: 'lucide:briefcase', name: 'Efectos Personales', sub: 'Mudanzas internacionales y traslados', color: '#9b59b6', image: 'efectos-personales', alt: 'Mudanza internacional con cajas de efectos personales' },
  { icon: 'lucide:settings', name: 'Maquinaria', sub: 'Equipos industriales y agrícolas', color: '#34495e', image: 'maquinaria', alt: 'Maquinaria industrial y equipos agrícolas' },
  { icon: 'lucide:wrench', name: 'Repuestos Automotrices y de maquinaria Pesada', sub: 'Piezas y componentes de reposición', color: '#d35400', image: 'repuestos-automotrices', alt: 'Repuestos automotrices y componentes de maquinaria pesada' },
  { icon: 'lucide:scissors', name: 'Textil', sub: 'Prendas, telas y accesorios de moda', color: '#e91e63', image: 'textil', alt: 'Fábrica textil con telas y prendas de moda' },
  { icon: 'lucide:layout', name: 'Proyectos', sub: 'Logística de proyectos especiales y carga sobredimensionada', color: '#16a085', image: 'proyectos', alt: 'Logística de proyectos con carga sobredimensionada' },
] as const;

// Año actual para copyright
export const CURRENT_YEAR = new Date().getFullYear();
