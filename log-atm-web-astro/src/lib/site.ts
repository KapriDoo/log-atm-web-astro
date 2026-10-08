/**
 * LOG ATM — Identidad del sitio: fuente única de nombre, URL, contacto, dirección,
 * coordenadas y redes. Sin imports, para que la carguen por igual `astro.config.mjs`,
 * el worker de correo, los endpoints y las páginas. El slogan no vive aquí: su fuente
 * es `meta.tagline` del i18n.
 */

export const SITE = {
  name: 'LOG ATM',
  url: 'https://www.logatm.com',
  phone: '+56982708492',
  phoneDisplay: '+56 9 8270 8492',
  email: 'contacto@logatm.com',
  address: {
    street: 'Av. Pdte Kennedy 5600, Of. 507',
    locality: 'Vitacura',
    city: 'Santiago',
    region: 'Región Metropolitana',
    country: 'Chile',
    countryCode: 'CL',
  },
  geo: {
    latitude: -33.4081,
    longitude: -70.5756,
  },
  social: {
    facebook: 'https://facebook.com/logatm',
    twitter: 'https://twitter.com/logatm',
    instagram: 'https://instagram.com/logatm',
  },
} as const;

// Texto prellenado del enlace de WhatsApp.
const WHATSAPP_TEXT = 'Hola, me interesa cotizar';

/** Enlace de WhatsApp derivado del teléfono (solo dígitos) con el texto prellenado. */
export const WHATSAPP_URL = `https://wa.me/${SITE.phone.replace(/\D/g, '')}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

/** Cuenta de X/Twitter de los meta `twitter:site` y `twitter:creator`, derivada de su URL: `@logatm`. */
export const TWITTER_HANDLE = `@${new URL(SITE.social.twitter).pathname.slice(1)}`;

const { street, locality, city, country } = SITE.address;

/** Línea de dirección del pie de página y de contacto: `calle, localidad, ciudad, país`. */
export const ADDRESS_LINE = `${street}, ${locality}, ${city}, ${country}`;

/** Variante HTML de la dirección para los correos: calle y, debajo, `localidad · ciudad · país`. */
export const ADDRESS_EMAIL_HTML = `${street}<br>${locality} &middot; ${city} &middot; ${country}`;
