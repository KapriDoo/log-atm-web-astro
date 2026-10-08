/**
 * robots.txt prerenderizado: se emite como archivo estático en `dist/client` y la
 * línea `Sitemap:` se arma desde la URL de la identidad del sitio (fuente única del host).
 */
import type { APIRoute } from 'astro';
import { SITE } from '../lib/site';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
