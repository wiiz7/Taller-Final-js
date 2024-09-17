import React, { useState, useEffect } from 'react';
import { getEquipos, deleteEquipo } from '../api/equipos';
import { Link } from 'react-router-dom';

const Equipos: React.FC = () => {
  const [equipos, setEquipos] = useState<any[]>([]);

  useEffect(() => {
    // Obtener todos los equipos
    const fetchEquipos = async () => {
      const data = await getEquipos();
      setEquipos(data);
    };

    fetchEquipos();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este equipo?')) {
      await deleteEquipo(id);
      setEquipos(equipos.filter(equipo => equipo.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Equipos</h1>
      <Link to="/equipos/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4">
        Crear Nuevo Equipo
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipos.map((equipo) => (
          <div key={equipo.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">{equipo.nombre}</h2>
            <p><strong>Estadio:</strong> {equipo.estadio}</p>
            <p><strong>Ciudad:</strong> {equipo.ciudad}</p>
            <div className="mt-4 flex justify-between">
              <Link
                to={`/equipos/edit/${equipo.id}`}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(equipo.id)}
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

export default Equipos;
