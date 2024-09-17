"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db"); // Asegúrate de que la ruta sea correcta
const router = (0, express_1.Router)();
// Ruta de login de usuario
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validación de datos
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        // Consultamos el usuario por el nombre de usuario
        const [rows] = yield db_1.db.query('SELECT * FROM users WHERE username = ?', [username]);
        const users = rows;
        const user = users[0];
        // Si el usuario no existe, devolvemos un error
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        // Verificamos la contraseña
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        // Guardamos la sesión del usuario si el login es exitoso
        req.session.user = { id: user.id, username: user.username };
        return res.status(200).json({ message: 'Login successful' });
    }
    catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Error logging in', error });
    }
}));
// Ruta de registro de usuario
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validación de datos
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        // Verificamos si el usuario ya existe
        const [existingUser] = yield db_1.db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        // Encriptamos la contraseña antes de almacenarla
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Insertamos el nuevo usuario en la base de datos
        yield db_1.db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Error registering user', error });
    }
}));
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        return res.status(200).json({ message: 'Logout successful' });
    });
});
exports.default = router;
