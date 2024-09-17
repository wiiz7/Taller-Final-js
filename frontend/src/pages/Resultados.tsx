import React, { useState, useEffect } from 'react';
import { getEquipos } from '../api/equipos'; // Asegúrate de que esta ruta apunte a tu función correcta

const Resultados = () => {
  const [equipos, setEquipos] = useState([]);
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const fetchEquipos = async () => {
      const data = await getEquipos();
      setEquipos(data);

      // Generar resultados aleatorios
      const generatedResults = data.map((equipo: any) => {
        const goles = Math.floor(Math.random() * 5); // Generar un número de goles aleatorio (0-4)
        return { ...equipo, goles };
      });
      setResultados(generatedResults);
    };

    fetchEquipos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Resultados Aleatorios de Equipos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resultados.map((equipo: any) => (
          <div key={equipo.id} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">{equipo.nombre}</h2>
            <p>Estadio: {equipo.estadio}</p>
            <p>Ciudad: {equipo.ciudad}</p>
            <p className="font-bold text-lg mt-2">Goles: {equipo.goles}</p> {/* Mostrar los goles aleatorios */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resultados;
