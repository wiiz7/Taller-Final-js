import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TeamDetails from './components/TeamDetails';
import Equipos from './pages/Equipos';
import Jugadores from './pages/Jugadores';
import Resultados from './pages/Resultados';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import CrearEquipo from './pages/CreateEquipo';
import EditarEquipo from './pages/EditEquipo';
import CrearJugador  from './pages/CreateEquipo';
import EditarJugador from './pages/EditEquipo';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/jugadores/create" element={<CrearJugador />} />
        <Route path="/jugadores/edit/:id" element={<EditarJugador />} />
        <Route path="/equipos/create" element={<CrearEquipo />} />
        <Route path="/equipos/edit/:id" element={<EditarEquipo />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/teams/:teamName" element={<TeamDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
