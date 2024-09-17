import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Recupera el nombre del usuario del almacenamiento local

  const handleLogout = () => {
    localStorage.removeItem('username'); // Elimina el nombre de usuario del almacenamiento local
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Links visibles para todos */}
        <div className="text-white text-lg flex space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          {!username && (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
          {username && (
            <>
              <Link to="/equipos" className="hover:underline">Equipos</Link>
              <Link to="/jugadores" className="hover:underline">Jugadores</Link>
              <Link to="/resultados" className="hover:underline">Resultados</Link>
            </>
          )}
        </div>

        {/* Botón de logout visible solo si el usuario ha iniciado sesión */}
        {username && (
          <div className="flex items-center space-x-4">
            <span className="text-white">Bienvenido, {username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
