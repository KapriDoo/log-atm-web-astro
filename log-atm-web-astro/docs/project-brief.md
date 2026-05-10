# Project Brief — LOG ATM

> Contexto completo del proyecto: identidad de marca, estrategia de contenido, y requisitos del sitio web.
> Si necesitas tokens de diseño o componentes visuales, consulta `DESIGN.md` en la raíz del proyecto.

---

## Identidad de marca

| Campo | Valor |
|---|---|
| Empresa | LOG ATM |
| Tagline | "LOGÍSTICA A TU MEDIDA" |
| CEO | Maria Paz Rivera Zapata |
| Teléfono | +569 421 62739 |
| Dirección | Av. Pdte Kennedy 5600, Of. 507, Vitacura, Santiago, Chile |
| Email corporativo | mpazrivera@logatm.com |
| Redes sociales | Facebook, Twitter/X, Instagram |
| Color principal | ~#4A7BB5 (azul plano único) |
| Logo fuente | `/mnt/c/Users/cipri/Downloads/logatmlogo.png` |
| Logo destino | `src/assets/logo.svg` (convertir con potrace) |
| Firma email | `/mnt/c/Users/cipri/Downloads/logatmgmail.png` |

**Descripción del logo**: Ancla marítima (fondo) + grúa portuaria (superpuesta) + letras "ATM LOG" — diseño flat monocolor azul. Simboliza puentes entre marítimo e industrial.

---

## Contenido base del sitio

### Servicios a ofrecer (5 pilares)
1. **Carga Aérea** — envíos urgentes, courier internacional, chárter aéreo.
2. **Carga Marítima** — FCL (contenedor completo), LCL (carga consolidada), rutas globales.
3. **Aduana y Documentación** — gestión de trámites, DUS, certificados de origen.
4. **Almacenaje y Distribución** — bodegaje, fulfillment, última milla.
5. **Consultoría Logística** — diseño de supply chain a medida.

### Tono de comunicación
- Profesional pero cercano (latinoamericano, no corporativo frío).
- Énfasis en "a tu medida" = soluciones personalizadas vs. multinacionales genéricas.
- Primer mensaje: confianza y expertise. Segundo mensaje: cercanía y accesibilidad.

### CTAs principales del sitio
- "Cotiza ahora" (primario)
- "Rastrea tu carga" (secundario)
- "Habla con un ejecutivo" (WhatsApp/formulario)

### Industrias target
Minería, retail, agro, farmacia, e-commerce cross-border, construcción.

### Stats/datos a destacar (a confirmar con cliente)
- Años de experiencia en Chile
- Rutas operativas (número de países/puertos)
- Envíos gestionados
- Clientes satisfechos

### Certificaciones/acreditaciones a mostrar
A definir con cliente. Referencias del sector: IATA, FIATA, BASC, ISO 9001, Aduana Chile (OEA).

---

## Conversión logo PNG → SVG

No existe skill para esto. Usar `potrace` npm (v2.1.8, disponible):

```js
// scripts/png-to-svg.mjs — ejecutar una sola vez
import potrace from 'potrace';
import sharp from 'sharp';
// sharp convierte PNG → escala de grises → BMP
// potrace traza el bitmap al path SVG
// Parámetros: threshold:128, color:'#4A7BB5', background:'transparent'
```

Resultado en `src/assets/logo.svg`.

---

## Referencias

- **Dirección de diseño**: "Corporativo confiable con calidez humana".
- **Referencias visuales**: lifecare.org.au (favorita), the3key.com, abtc.com.
- **Referencias de contenido**: tripathlogistics.com, astralgloballogistics.com.
