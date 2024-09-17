"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = __importDefault(require("mysql2/promise"));
const MySQLStore = require('express-mysql-session')(express_session_1.default);
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const equipos_1 = __importDefault(require("./routes/equipos"));
const jugadores_1 = __importDefault(require("./routes/jugadores"));
dotenv_1.default.config();
// Validación de variables de entorno
if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not defined in the .env file');
}
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    throw new Error('Database configuration variables are not fully defined in the .env file');
}
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Configuración de la conexión a la base de datos MySQL
const db = promise_1.default.createPool({
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
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Permitir solicitudes desde esta URL (frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Permitir envío de cookies o credenciales
}));
// Middleware para procesar JSON en las solicitudes
app.use(express_1.default.json());
// Configuración de la sesión con MySQL como almacén
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
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
app.use('/auth', auth_1.default);
app.use('/equipos', equipos_1.default);
app.use('/jugadores', jugadores_1.default);
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
