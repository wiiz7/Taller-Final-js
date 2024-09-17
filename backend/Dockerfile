# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Compilar el proyecto si es necesario
RUN npm run build

# Expone el puerto en el que correrá el servidor
EXPOSE 3001

# Comando por defecto para correr la aplicación
CMD ["npm", "run", "dev"]
