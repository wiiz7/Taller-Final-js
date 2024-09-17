"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const mysql2_1 = __importDefault(require("mysql2"));
const MySQLStore = require('express-mysql-session')(express_session_1.default); // Cambia la importación
const auth_1 = __importDefault(require("../routes/auth")); // Ajusta según tu estructura
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Configuración de la base de datos
const db = mysql2_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'session_db'
});
// Configuración de express-session con almacenamiento en MySQL
const sessionStore = new MySQLStore({}, db.promise()); // Usa el pool con `.promise()` para asegurar compatibilidad
app.use(express_1.default.json());
// Configuración de las sesiones
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 día
}));
// Rutas de autenticación
app.use('/auth', auth_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
