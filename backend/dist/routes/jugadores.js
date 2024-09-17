"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jugadorController_1 = require("../controllers/jugadorController"); // Asegúrate de que la ruta es correcta
const router = express_1.default.Router();
// Obtener todos los equipos
router.get('/', jugadorController_1.getAllJugadores);
// Obtener un equipo por ID
router.get('/:id', jugadorController_1.getJugadorById);
// Crear un nuevo equipo
router.post('/', jugadorController_1.createJugador);
// Actualizar un equipo
router.put('/:id', jugadorController_1.updateJugador);
// Eliminar un equipo
router.delete('/:id', jugadorController_1.deleteJugador);
exports.default = router;
