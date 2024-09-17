import { Request, Response } from 'express';
import { db } from '../config/db'; // Asegúrate de que la conexión a la base de datos esté bien configurada
import { ResultSetHeader } from 'mysql2';

// Obtener todos los equipos
export const getAllEquipos = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM equipos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching equipos' });
  }
};

// Obtener un equipo por ID
export const getEquipoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM equipos WHERE id = ?', [id]);
    const equipo = rows;

    if (!equipo) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching equipo' });
  }
};

// Crear un nuevo equipo
export const createEquipo = async (req: Request, res: Response) => {
  const { nombre, estadio, ciudad } = req.body;

  if (!nombre || !estadio || !ciudad) {
    return res.status(400).json({ message: 'Nombre, estadio y ciudad son requeridos' });
  }

  try {
    const [result] = await db.query<ResultSetHeader>('INSERT INTO equipos (nombre, estadio, ciudad) VALUES (?, ?, ?)', [
      nombre,
      estadio,
      ciudad,
    ]);
    
    res.status(201).json({ message: 'Equipo creado con éxito', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creando equipo' });
  }
};

// Actualizar un equipo
export const updateEquipo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, estadio, ciudad } = req.body;

  try {
    const [result] = await db.query<ResultSetHeader>('UPDATE equipos SET nombre = ?, estadio = ?, ciudad = ? WHERE id = ?', [
      nombre,
      estadio,
      ciudad,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    res.json({ message: 'Equipo actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando equipo' });
  }
};

// Eliminar un equipo
export const deleteEquipo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result] = await db.query<ResultSetHeader>('DELETE FROM equipos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    res.json({ message: 'Equipo eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando equipo' });
  }
};
