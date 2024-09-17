import express from 'express';
import {
  getAllJugadores,
  getJugadorById,
  createJugador,
  updateJugador,
  deleteJugador
} from '../controllers/jugadorController'; // Asegúrate de que la ruta es correcta

const router = express.Router();

// Obtener todos los equipos
router.get('/', getAllJugadores);

// Obtener un equipo por ID
router.get('/:id', getJugadorById);

// Crear un nuevo equipo
router.post('/', createJugador);

// Actualizar un equipo
router.put('/:id', updateJugador);

// Eliminar un equipo
router.delete('/:id', deleteJugador);

export default router;
