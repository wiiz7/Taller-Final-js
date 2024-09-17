
import React, { useState, useEffect } from 'react';
import { getEquipoById, updateEquipo } from '../api/equipos';
import { useParams, useNavigate } from 'react-router-dom';

const EditEquipo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [estadio, setEstadio] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        const equipo = await getEquipoById(Number(id));
        setNombre(equipo.nombre);
        setEstadio(equipo.estadio);
        setCiudad(equipo.ciudad);
      } catch (error) {
        setError('No se pudo cargar el equipo. Inténtelo de nuevo más tarde.');
      }
    };

    fetchEquipo();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEquipo(Number(id), { nombre, estadio, ciudad });
      navigate('/equipos');
    } catch (error) {
      setError('No se pudo actualizar el equipo. Inténtelo de nuevo más tarde.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Equipo</h1>
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
          <label className="block text-sm font-bold mb-2">Estadio</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={estadio}
            onChange={(e) => setEstadio(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Ciudad</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
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

export default EditEquipo;
