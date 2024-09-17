# Usa una imagen base de Node.js
FROM node:20 AS build

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Compila la aplicación
RUN npm run build

# Usa Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos compilados desde el build anterior
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
