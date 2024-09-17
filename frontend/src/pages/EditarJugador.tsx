
import React, { useState, useEffect } from 'react';
import { getJugadorById, updateJugador } from '../api/jugadores';
import { useParams, useNavigate } from 'react-router-dom';

const EditarJugador: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [posicion, setPosicion] = useState('');
  const [equipo_id, setEquipoId] = useState<number | undefined>(undefined);
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJugador = async () => {
      try {
        const jugador = await getJugadorById(Number(id));
        setNombre(jugador.nombre);
        setPosicion(jugador.posicion);
        setEquipoId(jugador.equipo_id);
        setFechaNacimiento(jugador.fecha_nacimiento);
      } catch (error) {
        setError('No se pudo cargar el jugador. Inténtelo de nuevo más tarde.');
      }
    };

    fetchJugador();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateJugador(Number(id), { nombre, posicion, equipo_id, fecha_nacimiento });
      navigate('/jugadores');
    } catch (error) {
      setError('No se pudo actualizar el jugador. Inténtelo de nuevo más tarde.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Jugador</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nombre</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Posición</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={posicion}
            onChange={(e) => setPosicion(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">ID del Equipo</label>
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={equipo_id || ''}
            onChange={(e) => setEquipoId(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Fecha de Nacimiento</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={fecha_nacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarJugador;
