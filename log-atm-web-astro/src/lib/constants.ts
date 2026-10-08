/**
 * LOG ATM — Datos no textuales del sitio (ids, imágenes, íconos, tamaños, enlaces y colores).
 * Nunca duplicar estos valores en componentes. Siempre importar desde aquí.
 * El texto visible sale del i18n y la identidad del sitio, de `./site`.
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

// Strip de stats dentro del hero (hero-b.jsx). La etiqueta de cada cifra sale de home.hero.stripStats.
export const HERO_STRIP_STATS = [
  { num: '20+' },
  { num: '1:1' },
] as const;

// Servicios — 11 cards en bento grid con foto, ícono y tamaño. Título, descripción y tag salen de servicios.list.
// size: feature (col-span-6, alto) | wide (col-span-6) | std (col-span-4) | mini (col-span-3)
export const SERVICES = [
  {
    n: '01',
    img: svcAerea,
    icon: 'lucide:plane',
    size: 'feature',
    isCta: false,
    href: null as string | null,
  },
  {
    n: '02',
    img: svcMaritima,
    icon: 'lucide:ship',
    size: 'wide',
    isCta: false,
    href: null as string | null,
  },
  {
    n: '03',
    img: svcAduana,
    icon: 'lucide:file-check',
    size: 'std',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '04',
    img: svcAlmacenaje,
    icon: 'lucide:warehouse',
    size: 'std',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '05',
    img: svcConsultoria,
    icon: 'lucide:compass',
    size: 'std',
    isCta: true,
    href: '/cotizar',
  },
  {
    n: '06',
    img: svcCourier,
    icon: 'lucide:package',
    size: 'wide',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '07',
    img: svcSeguros,
    icon: 'lucide:shield',
    size: 'std',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '08',
    img: svcDesconsolidado,
    icon: 'lucide:container',
    size: 'std',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '09',
    img: svcCasillero,
    icon: 'lucide:mailbox',
    size: 'mini',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '10',
    img: svcAsesoria,
    icon: 'lucide:handshake',
    size: 'mini',
    isCta: false,
    href: '/servicios',
  },
  {
    n: '11',
    img: svcMedioOriente,
    icon: 'lucide:globe',
    size: 'wide',
    isCta: true,
    href: '/servicios',
  },
] as const;

// Variantes de la imagen de card de servicio, compartidas por el bento del inicio y de /servicios
// (services.css). `sizes` sigue el ancho pintado de la foto (16:9 con object-fit: cover), que en
// cards más altas que 16:9 supera el ancho de la card: std ~400px y mini ~360px sobre 640px;
// feature 645px (min-height 360px) en 641–1024px y ~785px (2 filas) sobre 1024px. Hasta 640px
// (1 columna) se usa el ancho de la card (90vw) para que el móvil DPR 3 entre en el presupuesto
// de 2 MB del inicio. `widths` cubre hasta ~2× el ancho máximo pintado, con tope en el original.
export const SERVICE_CARD_IMAGE_WIDTHS = [400, 600, 800, 1200, 1376];
export const SERVICE_CARD_IMAGE_SIZES = {
  feature: '(max-width: 640px) 90vw, (max-width: 1024px) 645px, 785px',
  wide: '(max-width: 640px) 90vw, (max-width: 1280px) 46vw, 592px',
  std: '(max-width: 640px) 90vw, 400px',
  mini: '(max-width: 640px) 90vw, (max-width: 1024px) 46vw, 360px',
} as const;

// Razones para elegir LOG ATM — con métrica destacada (paridad target image). El texto sale de home.why.items.
export const WHY_ITEMS = [
  {
    icon: 'lucide:user',
    metric: '1:1',
  },
  {
    icon: 'lucide:map-pin',
    metric: '24/7',
  },
  {
    icon: 'lucide:compass',
    metric: '4',
  },
] as const;

// Industrias atendidas (12 con foto en home — paridad handoff data.jsx). Nombre y bajada salen de industrias.names.
// Los colores son datos de contenido por industria (acento de cada card), no tokens de diseño.
export const INDUSTRIES = [
  { icon: 'lucide:pickaxe',       color: '#658fc3', img: indMineria },
  { icon: 'lucide:shopping-bag',  color: '#3EB978', img: indRetail },
  { icon: 'lucide:wheat',         color: '#2D9B6F', img: indAgro },
  { icon: 'lucide:pill',          color: '#4A7BB5', img: indFarma },
  { icon: 'lucide:shopping-cart', color: '#339965', img: indEcommerce },
  { icon: 'lucide:hard-hat',      color: '#3b6497', img: indConstruccion },
  { icon: 'lucide:hammer',        color: '#7a7a7a', img: indChatarra },
  { icon: 'lucide:lightbulb',     color: '#cc7614', img: indIluminarias },
  { icon: 'lucide:car',           color: '#e84c3d', img: indVehiculos },
  { icon: 'lucide:briefcase',     color: '#9b59b6', img: indEfectos },
  { icon: 'lucide:settings',      color: '#34495e', img: indMaquinaria },
  { icon: 'lucide:scissors',      color: '#e91e63', img: indTextil },
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

// Valores (en /nosotros). El texto sale de nosotros.values.items.
export const VALUES = [
  { icon: 'lucide:user-round-check' },
  { icon: 'lucide:compass' },
  { icon: 'lucide:shield-check' },
  { icon: 'lucide:sparkles' },
] as const;

// Cómo trabajamos (en /nosotros). El texto sale de nosotros.how.items.
export const HOW_WE_WORK = [
  { step: '01', icon: 'lucide:user-round-check', img: how01 },
  { step: '02', icon: 'lucide:file-check',       img: how02 },
  { step: '03', icon: 'lucide:compass',          img: how03 },
  { step: '04', icon: 'lucide:package',          img: how04 },
] as const;

// Cotización (multi-step en /cotizar). Nombre y descripción de cada modalidad salen de cotizar.modes.
export const QUOTE_MODES = [
  { k: 'sea',     icon: 'lucide:ship' },
  { k: 'air',     icon: 'lucide:plane' },
  { k: 'courier', icon: 'lucide:package' },
  { k: 'multi',   icon: 'lucide:compass' },
] as const;

// Orígenes del wizard (topónimos). La opción final «Otro» la agrega cotizar.astro con etiqueta del i18n.
export const QUOTE_ORIGINS = [
  'Shanghai, CN', 'Shenzhen, CN', 'Hong Kong, HK',
  'Miami, US', 'Los Angeles, US',
  'Rotterdam, NL', 'Hamburg, DE',
  'Dubai, AE', 'Jeddah, SA',
] as const;

export const QUOTE_DESTS = [
  'Santiago, CL', 'San Antonio, CL', 'Valparaíso, CL',
  'Iquique, CL', 'Antofagasta, CL', 'Punta Arenas, CL',
] as const;

// Pasos del wizard: etiqueta y nombre salen de cotizar.steps.
export const QUOTE_STEPS = [
  { n: '01' },
  { n: '02' },
  { n: '03' },
  { n: '04' },
] as const;

// Año actual para copyright
export const CURRENT_YEAR = new Date().getFullYear();
