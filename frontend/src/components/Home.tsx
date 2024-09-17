import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import Card from './Card';

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('Guest');
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    // Recupera el nombre del usuario del almacenamiento local
    const storedUsername = localStorage.getItem('username') || 'Guest';
    setUsername(storedUsername);
  }, []); // El array vacío asegura que esto solo se ejecute al montar el componente

  // Datos de las tarjetas
  const cards = [
    {
      title: 'REAL MADRID',
      description: 'VER MAS',
      imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726582411/real_madrid_huxb95.png',
    },
    {
      title: 'LIVERPOOL',
      description: 'VER MAS',
      imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726584364/Liverpool_FC.svg_lxytk8.png',
    },
    {
      title: 'FC BAYERN MUNICH',
      description: 'VER MAS',
      imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726584098/FC_Bayern_M%C3%BCnchen_logo__2017_.svg_zt7ay6.png',
    },
    {
      title: 'FC BARCELONA',
      description: 'VER MAS',
      imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726583412/FC_Barcelona_y7ldpf.png',
    },
    {
      title: 'MANCHESTER UNITED',
      description: 'VER MAS',
      imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726583439/Manchester_United_FC_crest.svg_jfuodi.png',
    },
    {
      title: 'ARSENAL',
      description: 'VER MAS',
      imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726584347/Arsenal_FC.svg_co5jyk.png',
    },
  ];

  const handleCardClick = (teamName: string) => {
    // Navegar a la página de detalles del equipo
    navigate(`/teams/${teamName}`);
  };

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {username}!
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} onClick={() => handleCardClick(card.title)}>
            <Card
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;


