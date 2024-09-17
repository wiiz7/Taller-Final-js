
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEquipo } from '../api/equipos';

const CrearEquipo: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [estadio, setEstadio] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEquipo({ nombre, estadio, ciudad });
      navigate('/equipos');
    } catch (error) {
      console.error('Error creating equipo:', error);
      setError('No se pudo crear el equipo. Inténtelo de nuevo más tarde.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Equipo</h1>
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
          Crear Equipo
        </button>
      </form>
    </div>
  );
};

export default CrearEquipo;
