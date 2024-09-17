import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import mysql from 'mysql2';
const MySQLStore = require('express-mysql-session')(session); // Cambia la importación

import authRoutes from '../routes/auth'; // Ajusta según tu estructura

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de la base de datos
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'session_db'
});

// Configuración de express-session con almacenamiento en MySQL
const sessionStore = new MySQLStore({}, db.promise()); // Usa el pool con `.promise()` para asegurar compatibilidad

app.use(express.json());

// Configuración de las sesiones
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 día
}));

// Rutas de autenticación
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
