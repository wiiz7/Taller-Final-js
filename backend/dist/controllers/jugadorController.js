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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJugador = exports.updateJugador = exports.createJugador = exports.getJugadorById = exports.getAllJugadores = void 0;
const db_1 = require("../config/db"); // Asegúrate de que la conexión a la base de datos esté bien configurada
// Obtener todos los jugadores
const getAllJugadores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.db.query('SELECT * FROM jugadores');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching jugadores' });
    }
});
exports.getAllJugadores = getAllJugadores;
// Obtener un jugador por ID
const getJugadorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [rows] = yield db_1.db.query('SELECT * FROM jugadores WHERE id = ?', [id]);
        const jugador = rows;
        if (!jugador) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        res.json(jugador);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching jugador' });
    }
});
exports.getJugadorById = getJugadorById;
// Crear un nuevo jugador
const createJugador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, posicion, equipo_id, fecha_nacimiento } = req.body;
    if (!nombre || !fecha_nacimiento) {
        return res.status(400).json({ message: 'Nombre y fecha de nacimiento son requeridos' });
    }
    try {
        const [result] = yield db_1.db.query('INSERT INTO jugadores (nombre, posicion, equipo_id, fecha_nacimiento) VALUES (?, ?, ?, ?)', [nombre, posicion, equipo_id, fecha_nacimiento]);
        res.status(201).json({ message: 'Jugador creado con éxito', id: result.insertId });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creando jugador' });
    }
});
exports.createJugador = createJugador;
// Actualizar un jugador
const updateJugador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, posicion, equipo_id, fecha_nacimiento } = req.body;
    try {
        const [result] = yield db_1.db.query('UPDATE jugadores SET nombre = ?, posicion = ?, equipo_id = ?, fecha_nacimiento = ? WHERE id = ?', [nombre, posicion, equipo_id, fecha_nacimiento, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        res.json({ message: 'Jugador actualizado con éxito' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error actualizando jugador' });
    }
});
exports.updateJugador = updateJugador;
// Eliminar un jugador
const deleteJugador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield db_1.db.query('DELETE FROM jugadores WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        res.json({ message: 'Jugador eliminado con éxito' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error eliminando jugador' });
    }
});
exports.deleteJugador = deleteJugador;
