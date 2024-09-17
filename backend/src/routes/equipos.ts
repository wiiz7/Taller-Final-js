import { Router } from 'express';
import { getAllEquipos, getEquipoById, createEquipo, updateEquipo, deleteEquipo } from '../controllers/equiposController';

const router = Router();

router.get('/', getAllEquipos);
router.get('/:id', getEquipoById);
router.post('/', createEquipo);
router.put('/:id', updateEquipo);
router.delete('/:id', deleteEquipo);

export default router;

