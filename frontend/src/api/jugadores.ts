
import axios from 'axios';

// Obtener todos los jugadores
export const getJugadores = async () => {
  try {
    const response = await axios.get('http://localhost:3001/jugadores');
    return response.data;
  } catch (error) {
    console.error('Error fetching jugadores:', error);
    throw new Error('Error al obtener los jugadores. Por favor, inténtelo de nuevo más tarde.');
  }
};

// Obtener un jugador por ID
export const getJugadorById = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:3001/jugadores/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jugador:', error);
    throw new Error('Error al obtener el jugador. Por favor, inténtelo de nuevo más tarde.');
  }
};

// Crear un nuevo jugador
export const createJugador = async (jugador: { nombre: string; posicion?: string; equipo_id?: number; fecha_nacimiento: string }) => {
  try {
    const response = await axios.post('http://localhost:3001/jugadores', jugador);
    return response.data;
  } catch (error) {
    console.error('Error creating jugador:', error);
    throw new Error('Error al crear el jugador. Por favor, inténtelo de nuevo más tarde.');
  }
};

// Actualizar un jugador
export const updateJugador = async (id: number, jugador: { nombre: string; posicion?: string; equipo_id?: number; fecha_nacimiento: string }) => {
  try {
    const response = await axios.put(`http://localhost:3001/jugadores/${id}`, jugador);
    return response.data;
  } catch (error) {
    console.error('Error updating jugador:', error);
    throw new Error('Error al actualizar el jugador. Por favor, inténtelo de nuevo más tarde.');
  }
};

// Eliminar un jugador
export const deleteJugador = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:3001/jugadores/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting jugador:', error);
    throw new Error('Error al eliminar el jugador. Por favor, inténtelo de nuevo más tarde.');
  }
};
