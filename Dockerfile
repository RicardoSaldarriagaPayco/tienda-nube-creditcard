# Etapa 1: Construcción del frontend
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración y dependencias del frontend
COPY frontend/package.json ./frontend/
COPY frontend/tsconfig.json ./frontend/

# Instalar dependencias del frontend
RUN cd frontend && npm install

# Copiar el código fuente del frontend y construir la aplicación
COPY frontend ./frontend
RUN cd frontend && npm run build

# Etapa 2: Configuración del api y del servidor web
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración y dependencias del api
COPY api/package.json ./api/
COPY api/tsconfig.json ./api/

# Instalar dependencias del backend
RUN cd api && npm install

# Copiar el código fuente del backend
COPY api ./api

# Compilar TypeScript en el backend
RUN cd api && npm run build

# Copiar archivos construidos del frontend al directorio estático del backend
COPY --from=builder /app/frontend/dist ./api/public

# Exponer el puerto de la aplicación
EXPOSE 3000

# Iniciar el servidor
CMD ["node", "api/dist/index.js"]
