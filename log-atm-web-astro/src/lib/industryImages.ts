/**
 * LOG ATM — Mapa de imágenes de industrias
 * Imports estáticos para Astro Assets (optimización build-time vía Sharp)
 * NOTA: Estos son placeholders. Reemplazar archivos en src/assets/industries/ por imágenes reales.
 */

import mineria from '../assets/industries/mineria.jpg';
import retail from '../assets/industries/retail.jpg';
import agroindustria from '../assets/industries/agroindustria.jpg';
import farmaceutica from '../assets/industries/farmaceutica.jpg';
import ecommerce from '../assets/industries/ecommerce.jpg';
import construccion from '../assets/industries/construccion.jpg';
import chatarraFerrosa from '../assets/industries/chatarra-ferrosa.jpg';
import iluminarias from '../assets/industries/iluminarias.jpg';
import vehiculosUsados from '../assets/industries/vehiculos-usados.jpg';
import efectosPersonales from '../assets/industries/efectos-personales.jpg';
import maquinaria from '../assets/industries/maquinaria.jpg';
import repuestosAutomotrices from '../assets/industries/repuestos-automotrices.jpg';
import textil from '../assets/industries/textil.jpg';
import proyectos from '../assets/industries/proyectos.jpg';

export const INDUSTRY_IMAGES: Record<string, ImageMetadata> = {
  mineria,
  retail,
  agroindustria,
  farmaceutica,
  ecommerce,
  construccion,
  'chatarra-ferrosa': chatarraFerrosa,
  iluminarias,
  'vehiculos-usados': vehiculosUsados,
  'efectos-personales': efectosPersonales,
  maquinaria,
  'repuestos-automotrices': repuestosAutomotrices,
  textil,
  proyectos,
};
