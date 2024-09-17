import { Request, Response } from 'express';
import { db } from '../config/db'; // Asegúrate de que la conexión a la base de datos esté bien configurada
import { ResultSetHeader } from 'mysql2';

// Obtener todos los jugadores
export const getAllJugadores = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM jugadores');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching jugadores' });
  }
};

// Obtener un jugador por ID
export const getJugadorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM jugadores WHERE id = ?', [id]);
    const jugador = rows;

    if (!jugador) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }

    res.json(jugador);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching jugador' });
  }
};

// Crear un nuevo jugador
export const createJugador = async (req: Request, res: Response) => {
  const { nombre, posicion, equipo_id, fecha_nacimiento } = req.body;

  if (!nombre || !fecha_nacimiento) {
    return res.status(400).json({ message: 'Nombre y fecha de nacimiento son requeridos' });
  }

  try {
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO jugadores (nombre, posicion, equipo_id, fecha_nacimiento) VALUES (?, ?, ?, ?)',
      [nombre, posicion, equipo_id, fecha_nacimiento]
    );
    
    res.status(201).json({ message: 'Jugador creado con éxito', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creando jugador' });
  }
};

// Actualizar un jugador
export const updateJugador = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, posicion, equipo_id, fecha_nacimiento } = req.body;

  try {
    const [result] = await db.query<ResultSetHeader>(
      'UPDATE jugadores SET nombre = ?, posicion = ?, equipo_id = ?, fecha_nacimiento = ? WHERE id = ?',
      [nombre, posicion, equipo_id, fecha_nacimiento, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }

    res.json({ message: 'Jugador actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando jugador' });
  }
};

// Eliminar un jugador
export const deleteJugador = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result] = await db.query<ResultSetHeader>('DELETE FROM jugadores WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }

    res.json({ message: 'Jugador eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando jugador' });
  }
};
