
import axios from 'axios';

// Obtener todos los equipos
export const getEquipos = async () => {
  try {
    const response = await axios.get('http://localhost:3001/equipos');
    return response.data;
  } catch (error) {
    console.error('Error fetching equipos:', error);
    throw new Error('Error al obtener los equipos. Por favor, inténtelo de nuevo más tarde.');
  }
};

// Obtener un equipo por ID
export const getEquipoById = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:3001/equipos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching equipo:', error);
    throw new Error('Error al obtener el equipo. Por favor, inténtelo de nuevo más tarde.');
  }
};

// Crear un nuevo equipo
export const createEquipo = async (equipo: { nombre: string; estadio: string; ciudad: string }) => {
  try {
    const response = await axios.post('http://localhost:3001/equipos', equipo);
    return response.data;
  } catch (error) {
    console.error('Error creating equipo:', error);
    throw new Error('Error al crear el equipo. Por favor, inténtelo de nuevo más tarde.');
  }
};

// Actualizar un equipo
export const updateEquipo = async (id: number, equipo: { nombre: string; estadio: string; ciudad: string }) => {
  try {
    const response = await axios.put(`http://localhost:3001/equipos/${id}`, equipo);
    return response.data;
  } catch (error) {
    console.error('Error updating equipo:', error);
    throw new Error('Error al actualizar el equipo. Por favor, inténtelo de nuevo más tarde.');
  }
};

// Eliminar un equipo
export const deleteEquipo = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:3001/equipos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting equipo:', error);
    throw new Error('Error al eliminar el equipo. Por favor, inténtelo de nuevo más tarde.');
  }
};
