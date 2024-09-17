import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
const MySQLStore = require('express-mysql-session')(session);
import cors from 'cors';
import authRoutes from './routes/auth';
import equiposRoutes from './routes/equipos';
import jugadorRoutes from './routes/jugadores';

dotenv.config();

// Validación de variables de entorno
if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not defined in the .env file');
}

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new Error('Database configuration variables are not fully defined in the .env file');
}

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'galactico'
});

db.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

const sessionStore = new MySQLStore({}, db);

// Configuración de CORS (Permitir solicitudes desde el frontend en localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Permitir solicitudes desde esta URL (frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  credentials: true // Permitir envío de cookies o credenciales
}));

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Configuración de la sesión con MySQL como almacén
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 día de duración de la cookie
}));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido al backend de Galácticos');
});

// Rutas de autenticación
app.use('/auth', authRoutes);
app.use('/equipos', equiposRoutes);
app.use('/jugadores', jugadorRoutes);



// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
