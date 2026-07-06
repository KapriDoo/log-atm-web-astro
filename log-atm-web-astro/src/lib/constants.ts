/**
 * LOG ATM — Constantes centralizadas
 * Nunca duplicar estos valores en componentes. Siempre importar desde aquí.
 */

// Imports estáticos para astro:assets (build-time, Sharp). Ver ADR-0006.
// Cada import resuelve a un ImageMetadata; si un archivo no existe, el build falla.
import svcAduana from '../assets/images/services/svc-aduana.jpeg';
import svcAerea from '../assets/images/services/svc-aerea.jpeg';
import svcAlmacenaje from '../assets/images/services/svc-almacenaje.jpeg';
import svcAsesoria from '../assets/images/services/svc-asesoria.jpeg';
import svcCasillero from '../assets/images/services/svc-casillero.jpeg';
import svcConsultoria from '../assets/images/services/svc-consultoria.jpeg';
import svcCourier from '../assets/images/services/svc-courier.jpeg';
import svcDesconsolidado from '../assets/images/services/svc-desconsolidado.jpeg';
import svcMaritima from '../assets/images/services/svc-maritima.jpeg';
import svcMedioOriente from '../assets/images/services/svc-medio-oriente.jpeg';
import svcSeguros from '../assets/images/services/svc-seguros.jpeg';

import indAgro from '../assets/images/industries/ind-agro.jpeg';
import indChatarra from '../assets/images/industries/ind-chatarra.jpeg';
import indConstruccion from '../assets/images/industries/ind-construccion.jpeg';
import indEcommerce from '../assets/images/industries/ind-ecommerce.jpeg';
import indEfectos from '../assets/images/industries/ind-efectos.jpeg';
import indFarma from '../assets/images/industries/ind-farma.jpeg';
import indIluminarias from '../assets/images/industries/ind-iluminarias.jpeg';
import indMaquinaria from '../assets/images/industries/ind-maquinaria.jpeg';
import indMineria from '../assets/images/industries/ind-mineria.jpeg';
import indRetail from '../assets/images/industries/ind-retail.jpeg';
import indTextil from '../assets/images/industries/ind-textil.jpeg';
import indVehiculos from '../assets/images/industries/ind-vehiculos.jpeg';

import how01 from '../assets/images/process/how-01-ejecutivo.jpeg';
import how02 from '../assets/images/process/how-02-diagnostico.jpeg';
import how03 from '../assets/images/process/how-03-ruta.jpeg';
import how04 from '../assets/images/process/how-04-operacion.jpeg';

export const SITE = {
  name: 'LOG ATM',
  url: 'https://logatm.com',
  tagline: 'Logística a tu medida',
  phone: '+56982708492',
  phoneDisplay: '+56 9 8270 8492',
  email: 'contacto@logatm.com',
  address: 'Av. Pdte Kennedy 5600, Of. 507, Vitacura, Santiago, Chile',
  whatsappUrl: 'https://wa.me/56982708492?text=Hola%2C%20me%20interesa%20cotizar',
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

// Strip de stats dentro del hero — etiquetas cortas del handoff (hero-b.jsx)
export const HERO_STRIP_STATS = [
  { num: '20+', label: 'Años de experiencia del equipo' },
  { num: '1:1', label: 'Ejecutivo dedicado' },
] as const;

// Servicios — 11 cards en bento grid con foto, tag y tamaño
// size: feature (col-span-6, alto) | wide (col-span-6) | std (col-span-4) | mini (col-span-3)
export const SERVICES = [
  {
    n: '01',
    title: 'Carga Aérea',
    img: svcAerea,
    desc: 'Express, courier internacional y chárter aéreo con tiempos garantizados.',
    tag: 'Express · 48h',
    icon: 'lucide:plane',
    size: 'feature',
    isCta: false,
    href: null as string | null,
  },
  {
    n: '02',
    title: 'Carga Marítima',
    img: svcMaritima,
    desc: 'FCL y LCL a 80+ puertos. Consolidamos para reducir costos.',
    tag: 'FCL · LCL',
    icon: 'lucide:ship',
    size: 'wide',
    isCta: false,
    href: null as string | null,
  },
  {
    n: '03',
    title: 'Aduana y Documentación',
    img: svcAduana,
    desc: 'DUS, certificados de origen y clasificación arancelaria.',
    tag: 'OEA Chile',
    icon: 'lucide:file-check',
    size: 'std',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '04',
    title: 'Almacenaje',
    img: svcAlmacenaje,
    desc: 'Bodegaje, fulfillment y última milla con inventario en tiempo real.',
    tag: '24/7',
    icon: 'lucide:warehouse',
    size: 'std',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '05',
    title: 'Consultoría Logística',
    img: svcConsultoria,
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
    img: svcCourier,
    desc: 'Envíos exprés puerta a puerta con cobertura global.',
    tag: 'D2D',
    icon: 'lucide:package',
    size: 'wide',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '07',
    title: 'Seguros de Carga',
    img: svcSeguros,
    desc: 'Cobertura integral durante todo el trayecto.',
    tag: 'Global',
    icon: 'lucide:shield',
    size: 'std',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '08',
    title: 'Desconsolidado',
    img: svcDesconsolidado,
    desc: 'Recepción, fraccionamiento y distribución desde puerto.',
    tag: 'LCL',
    icon: 'lucide:container',
    size: 'std',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '09',
    title: 'Casillero USA',
    img: svcCasillero,
    desc: 'Dirección propia en EE.UU. para compras online.',
    tag: 'Miami',
    icon: 'lucide:mailbox',
    size: 'mini',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '10',
    title: 'Compras Internacionales',
    img: svcAsesoria,
    desc: 'Asesoría completa: proveedores, pagos y logística.',
    tag: 'Asesoría',
    icon: 'lucide:handshake',
    size: 'mini',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '11',
    title: 'Ruta Medio Oriente',
    img: svcMedioOriente,
    desc: 'Conexión especializada con socios locales de confianza.',
    tag: 'DXB · JED',
    icon: 'lucide:globe',
    size: 'wide',
    isCta: true,
    href: '/servicios',
  },
] as const;

// Razones para elegir LOG ATM — con métrica destacada (paridad target image)
export const WHY_ITEMS = [
  {
    icon: 'lucide:user',
    title: 'Ejecutivo dedicado',
    desc: 'Una persona que conoce tu negocio y anticipa tus necesidades.',
    metric: '1:1',
    sub: 'cuenta',
  },
  {
    icon: 'lucide:map-pin',
    title: 'Atención 24/7',
    desc: 'Soporte directo con tu ejecutivo cuando lo necesites.',
    metric: '24/7',
    sub: 'soporte',
  },
  {
    icon: 'lucide:compass',
    title: 'Multimodal real',
    desc: 'Aéreo, marítimo, terrestre y courier bajo un mismo equipo.',
    metric: '4',
    sub: 'modalidades',
  },
] as const;

// Industrias atendidas (12 con foto en home — paridad handoff data.jsx)
export const INDUSTRIES = [
  { icon: 'lucide:pickaxe',       name: 'Minería',            sub: 'Cobre, litio, maquinaria',     color: '#658fc3', img: indMineria },
  { icon: 'lucide:shopping-bag',  name: 'Retail',             sub: 'Moda, consumo, temporada',     color: '#3EB978', img: indRetail },
  { icon: 'lucide:wheat',         name: 'Agroindustria',      sub: 'Fruta, vinos, granos',         color: '#2D9B6F', img: indAgro },
  { icon: 'lucide:pill',          name: 'Farmacéutica',       sub: 'Cadena de frío, reactivos',    color: '#4A7BB5', img: indFarma },
  { icon: 'lucide:shopping-cart', name: 'E-commerce',         sub: 'Cross-border, fulfillment',    color: '#339965', img: indEcommerce },
  { icon: 'lucide:hard-hat',      name: 'Construcción',       sub: 'Maquinaria, materiales',       color: '#3b6497', img: indConstruccion },
  { icon: 'lucide:hammer',        name: 'Chatarra Ferrosa',   sub: 'Reciclaje y exportación',      color: '#7a7a7a', img: indChatarra },
  { icon: 'lucide:lightbulb',     name: 'Iluminarias',        sub: 'LED e industrial',             color: '#cc7614', img: indIluminarias },
  { icon: 'lucide:car',           name: 'Vehículos Usados',   sub: 'Importación y trámites',       color: '#e84c3d', img: indVehiculos },
  { icon: 'lucide:briefcase',     name: 'Efectos Personales', sub: 'Mudanzas internacionales',     color: '#9b59b6', img: indEfectos },
  { icon: 'lucide:settings',      name: 'Maquinaria',         sub: 'Industrial y agrícola',        color: '#34495e', img: indMaquinaria },
  { icon: 'lucide:scissors',      name: 'Textil',             sub: 'Prendas, telas, accesorios',   color: '#e91e63', img: indTextil },
] as const;

// Rutas marítimas/aéreas mostradas en el panel translúcido del hero
export const LIVE_ROUTES = [
  { from: 'Shanghai',  to: 'San Antonio', mode: 'sea', eta: '12d', status: 'transit' },
  { from: 'Miami',     to: 'Santiago',    mode: 'air', eta: '36h', status: 'transit' },
  { from: 'Rotterdam', to: 'Valparaíso',  mode: 'sea', eta: '21d', status: 'port' },
  { from: 'Manzanillo', to: 'Valparaíso', mode: 'sea', eta: '18d', status: 'transit' },
] as const;

// Opciones del formulario "Cotización rápida · 30 seg" del CtaFinal (handoff sections.jsx)
export const QUICK_QUOTE_MODES = [
  'Marítimo · FCL',
  'Marítimo · LCL',
  'Aéreo',
  'Courier',
] as const;
export const QUICK_QUOTE_ORIGINS = [
  'Shanghai, CN',
  'Miami, US',
  'Rotterdam, NL',
  'Dubai, AE',
] as const;
export const QUICK_QUOTE_DESTINATIONS = [
  'Santiago, CL',
  'San Antonio, CL',
  'Iquique, CL',
] as const;
export const QUICK_QUOTE_VOLUMES = [
  '1 CBM o menos',
  '1 – 15 CBM',
  "1 contenedor 20'",
  "1 contenedor 40'",
] as const;

// ──────────────────────────────────────────────────────────
// Datos de sub-páginas (handoff design_handoff_pages)
// ──────────────────────────────────────────────────────────

// Valores (en /nosotros)
export const VALUES = [
  { icon: 'lucide:user-round-check', title: 'Cercanía operativa', desc: 'No somos un proveedor: somos tu equipo logístico extendido.' },
  { icon: 'lucide:compass',          title: 'A tu medida',         desc: 'Cada cuenta tiene una operación diseñada para su realidad.' },
  { icon: 'lucide:shield-check',     title: 'Transparencia total', desc: 'Tarifas claras, sin sorpresas. Si algo falla, lo decimos primero.' },
  { icon: 'lucide:sparkles',         title: 'Mejora continua',     desc: 'KPIs medibles y revisión trimestral con cada cliente.' },
] as const;

// Cómo trabajamos (en /nosotros)
export const HOW_WE_WORK = [
  { step: '01', icon: 'lucide:user-round-check', img: how01,  title: 'Ejecutivo dedicado',     desc: 'Una persona asignada a tu cuenta que conoce tu operación, productos y tiempos. Punto único de contacto, sin call centers.' },
  { step: '02', icon: 'lucide:file-check',       img: how02, title: 'Diagnóstico operativo',  desc: 'Mapeamos tu cadena actual: orígenes, destinos, volúmenes, tiempos críticos y dolores. Detectamos sobrecostos y cuellos de botella.' },
  { step: '03', icon: 'lucide:compass',          img: how03,        title: 'Diseño de ruta a medida', desc: 'Proponemos modos, navieras, aerolíneas y agentes según costo, tiempo y riesgo. Negociamos tarifas y dejamos todo documentado.' },
  { step: '04', icon: 'lucide:package',          img: how04,   title: 'Operación y reporte',    desc: 'Ejecutamos cada embarque con visibilidad completa, alertas proactivas ante desvíos y reporte semanal de carga en tránsito.' },
] as const;

// Cotización (multi-step en /cotizar)
export const QUOTE_MODES = [
  { k: 'sea',     name: 'Marítimo',   desc: 'FCL/LCL, 80+ puertos. Best ratio costo/plazo.', icon: 'lucide:ship' },
  { k: 'air',     name: 'Aéreo',      desc: 'Express 48h–7d. Ideal para urgencias y alto valor.', icon: 'lucide:plane' },
  { k: 'courier', name: 'Courier',    desc: 'Door-to-door internacional. Hasta 70kg.', icon: 'lucide:package' },
  { k: 'multi',   name: 'Multimodal', desc: 'Combinación aéreo + marítimo + terrestre.', icon: 'lucide:compass' },
] as const;

export const QUOTE_ORIGINS = [
  'Shanghai, CN', 'Shenzhen, CN', 'Hong Kong, HK',
  'Miami, US', 'Los Angeles, US',
  'Rotterdam, NL', 'Hamburg, DE',
  'Dubai, AE', 'Jeddah, SA',
  'Otro',
] as const;

export const QUOTE_DESTS = [
  'Santiago, CL', 'San Antonio, CL', 'Valparaíso, CL',
  'Iquique, CL', 'Antofagasta, CL', 'Punta Arenas, CL',
] as const;

export const QUOTE_STEPS = [
  { n: '01', label: 'Servicio',  name: 'Modalidad' },
  { n: '02', label: 'Ruta',      name: 'Origen → Destino' },
  { n: '03', label: 'Carga',     name: 'Tipo y volumen' },
  { n: '04', label: 'Contacto',  name: 'Tus datos' },
] as const;

// Año actual para copyright
export const CURRENT_YEAR = new Date().getFullYear();
