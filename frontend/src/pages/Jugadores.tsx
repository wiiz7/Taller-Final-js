import React, { useState, useEffect } from 'react';
import { getJugadores, deleteJugador } from '../api/jugadores';
import { Link } from 'react-router-dom';

const Jugadores: React.FC = () => {
  const [jugadores, setJugadores] = useState<any[]>([]);

  useEffect(() => {
    // Obtener todos los jugadores
    const fetchJugadores = async () => {
      try {
        const data = await getJugadores();
        setJugadores(data);
      } catch (error) {
        console.error('Error fetching jugadores:', error);
      }
    };

    fetchJugadores();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este jugador?')) {
      try {
        await deleteJugador(id);
        setJugadores(jugadores.filter(jugador => jugador.id !== id));
      } catch (error) {
        console.error('Error deleting jugador:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Jugadores</h1>
      <Link to="/jugadores/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4">
        Crear Nuevo Jugador
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jugadores.map((jugador) => (
          <div key={jugador.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">{jugador.nombre}</h2>
            <p><strong>Posición:</strong> {jugador.posicion}</p>
            <p><strong>Equipo ID:</strong> {jugador.equipo_id}</p>
            <p><strong>Fecha de Nacimiento:</strong> {new Date(jugador.fecha_nacimiento).toLocaleDateString()}</p>
            <div className="mt-4 flex justify-between">
              <Link
                to={`/jugadores/edit/${jugador.id}`}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(jugador.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jugadores;
