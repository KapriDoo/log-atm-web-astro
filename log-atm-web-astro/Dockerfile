# Multi-stage build para Astro static site
# Etapa 1: Build con Node.js 22
# Nota: se usa Debian (glibc), no Alpine (musl), porque `workerd` —invocado por
# el adapter de Cloudflare con platformProxy durante `astro build`— solo
# distribuye binario glibc (@cloudflare/workerd-linux-64). En Alpine falla con ENOENT.
FROM node:22-slim AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (npm ci para build reproducible)
RUN npm ci

# Copiar todo el código fuente
COPY . .

# Build de producción (genera la carpeta dist/)
RUN npm run build

# Etapa 2: Build nginx con Brotli
FROM nginx:alpine AS nginx-builder

# Instalar dependencias para compilar
RUN apk add --no-cache gcc g++ make pcre-dev zlib-dev linux-headers openssl-dev git curl brotli-dev

# Obtener versión de nginx y descargar source
RUN NGINX_VERSION=$(nginx -v 2>&1 | sed 's/^nginx version: nginx\///') && \
    cd /tmp && \
    git clone https://github.com/google/ngx_brotli.git && \
    cd ngx_brotli && \
    git submodule update --init && \
    cd /tmp && \
    curl -L -o nginx-${NGINX_VERSION}.tar.gz http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz && \
    tar -xzf nginx-*.tar.gz && \
    cd nginx-${NGINX_VERSION} && \
    ./configure \
      --with-compat \
      --add-dynamic-module=../ngx_brotli && \
    make modules && \
    cp objs/ngx_http_brotli_filter_module.so objs/ngx_http_brotli_static_module.so /etc/nginx/modules/

# Etapa 3: Imagen final
FROM nginx:alpine

# Copiar módulos Brotli compilados
COPY --from=nginx-builder /etc/nginx/modules/ngx_http_brotli_*.so /etc/nginx/modules/

# Copiar los archivos estáticos generados.
# El adapter de Cloudflare divide el output en dist/client (estático) y
# dist/server (worker para rutas on-demand). nginx solo sirve lo estático,
# por lo que se copia dist/client como root del sitio.
COPY --from=builder /app/dist/client /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Healthcheck básico
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
