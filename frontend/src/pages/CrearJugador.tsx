
import React, { useState } from 'react';
import { createJugador } from '../api/jugadores';
import { useNavigate } from 'react-router-dom';

const CrearJugador: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [posicion, setPosicion] = useState('');
  const [equipo_id, setEquipoId] = useState<number | undefined>(undefined);
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createJugador({ nombre, posicion, equipo_id, fecha_nacimiento });
      navigate('/jugadores');
    } catch (error) {
      setError('No se pudo crear el jugador. Inténtelo de nuevo más tarde.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Jugador</h1>
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
          Crear Jugador
        </button>
      </form>
    </div>
  );
};

export default CrearJugador;
