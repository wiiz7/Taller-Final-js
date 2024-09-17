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
exports.deleteEquipo = exports.updateEquipo = exports.createEquipo = exports.getEquipoById = exports.getAllEquipos = void 0;
const db_1 = require("../config/db"); // Asegúrate de que la conexión a la base de datos esté bien configurada
// Obtener todos los equipos
const getAllEquipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.db.query('SELECT * FROM equipos');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching equipos' });
    }
});
exports.getAllEquipos = getAllEquipos;
// Obtener un equipo por ID
const getEquipoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [rows] = yield db_1.db.query('SELECT * FROM equipos WHERE id = ?', [id]);
        const equipo = rows;
        if (!equipo) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json(equipo);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching equipo' });
    }
});
exports.getEquipoById = getEquipoById;
// Crear un nuevo equipo
const createEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, estadio, ciudad } = req.body;
    if (!nombre || !estadio || !ciudad) {
        return res.status(400).json({ message: 'Nombre, estadio y ciudad son requeridos' });
    }
    try {
        const [result] = yield db_1.db.query('INSERT INTO equipos (nombre, estadio, ciudad) VALUES (?, ?, ?)', [
            nombre,
            estadio,
            ciudad,
        ]);
        res.status(201).json({ message: 'Equipo creado con éxito', id: result.insertId });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creando equipo' });
    }
});
exports.createEquipo = createEquipo;
// Actualizar un equipo
const updateEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, estadio, ciudad } = req.body;
    try {
        const [result] = yield db_1.db.query('UPDATE equipos SET nombre = ?, estadio = ?, ciudad = ? WHERE id = ?', [
            nombre,
            estadio,
            ciudad,
            id,
        ]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json({ message: 'Equipo actualizado con éxito' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error actualizando equipo' });
    }
});
exports.updateEquipo = updateEquipo;
// Eliminar un equipo
const deleteEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield db_1.db.query('DELETE FROM equipos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json({ message: 'Equipo eliminado con éxito' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error eliminando equipo' });
    }
});
exports.deleteEquipo = deleteEquipo;
