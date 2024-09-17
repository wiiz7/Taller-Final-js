import React from 'react';
import { useParams } from 'react-router-dom';

const TeamDetails: React.FC = () => {
  const { teamName } = useParams<{ teamName: string }>();

  const teamData: { [key: string]: any } = {
    'REAL MADRID': {
      founded: '6 de marzo de 1902',
      stadium: 'Santiago Bernabéu',
      capacity: '81,044',
      location: 'Madrid, España',
      description: 'Real Madrid es uno de los clubes de fútbol más exitosos de la historia, con numerosas victorias en La Liga y la UEFA Champions League.',
      players: [
        { name: 'Jude Bellingham', position: 'centrocampista', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726587168/Jude_Bellingham.1_yzheax.webp' },
        { name: 'Vinícius Júnior', position: 'delantero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726588400/Vin3Fnior.1_vpdepw.webp' },
        { name: 'Thibaut Courtois', position: 'Portero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726586885/Thibaut_Courtois_bov4tc.webp' }
      ],
    },
    'LIVERPOOL': {
      founded: '3 de junio de 1892',
      stadium: 'Anfield',
      capacity: '53,394',
      location: 'Liverpool, Inglaterra',
      description: 'Liverpool FC es un club icónico del fútbol inglés, famoso por su éxito tanto a nivel nacional como internacional. Ha ganado múltiples títulos de la Premier League y Champions League.',
      players: [
        { name: 'Mohamed Salah', position: 'Delantero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726589294/Mohamed_Salah.3_n6uqdv.webp' },
        { name: 'Virgil van Dijk', position: 'Defensa', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726589326/Virgil_van_Dijk_yujaf4.webp' },
        { name: 'Alisson Becker', position: 'Portero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726589280/Alisson_mlezrv.webp' }
      ],
    },
    'FC BAYERN MUNICH': {
      founded: '27 de febrero de 1900',
      stadium: 'Allianz Arena',
      capacity: '75,000',
      location: 'Múnich, Alemania',
      description: 'Bayern Múnich es el equipo más exitoso en la historia del fútbol alemán, con numerosos títulos de la Bundesliga y campeonatos europeos.',
      players: [
        { name: 'harry kane', position: 'Delantero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726589849/Harry_Kane_j6bmxg.webp' },
        { name: 'Thomas Müller', position: 'Delantero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726590546/Thomas_M_3Fller_anvjya.webp' },
        { name: 'Manuel Neuer', position: 'Portero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726590572/Manuel_Neuer_awqvwv.webp' }
      ],
    },
    'FC BARCELONA': {
      founded: '29 de noviembre de 1899',
      stadium: 'Camp Nou',
      capacity: '99,354',
      location: 'Barcelona, España',
      description: 'FC Barcelona es uno de los clubes más grandes y exitosos del mundo, conocido por su estilo de juego ofensivo y su rivalidad histórica con el Real Madrid.',
      players: [
        { name: 'Robert Lewandowski', position: 'Delantero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726590923/Robert_Lewandowski.1_l1z2u6.webp' },
        { name: '	Dani Olmo', position: 'Centrocampista', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726590935/Dani_Olmo_ndhyap.webp' },
        { name: 'Marc-André ter Stegen', position: 'Portero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726590945/Marc-Andr%C3%A9_ter_Stegen_tujwpg.webp' }
      ],
    },
    'MANCHESTER UNITED': {
      founded: '1878 (como Newton Heath)',
      stadium: 'Old Trafford',
      capacity: '74,140',
      location: 'Mánchester, Inglaterra',
      description: 'Manchester United es uno de los clubes más exitosos en la historia del fútbol inglés, con múltiples títulos de la Premier League y la UEFA Champions League.',
      players: [
        { name: 'Bruno Fernandes', position: 'Centrocampista', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726591297/Marcus_Rashford_rvks4r.webp' },
        { name: 'Marcus Rashford', position: 'Delantero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726591279/Bruno_Fernandes_29_j1jite.webp' },
        { name: 'André Onana', position: 'Portero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726591265/Andr_3F_Onana_kqgimy.webp' }
      ],
    },
    'ARSENAL': {
      founded: '1886',
      stadium: 'Emirates Stadium',
      capacity: '60,260',
      location: 'Londres, Inglaterra',
      description: 'Arsenal es uno de los clubes más exitosos y tradicionales de Inglaterra, famoso por su estilo de juego atractivo y sus títulos en la FA Cup y la Premier League.',
      players: [
        { name: 'Bukayo Saka', position: 'Delantero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726591481/Bukayo_Saka.2_etzxr9.webp' },
        { name: 'Martin Ødegaard', position: 'Centrocampista', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726591538/Martin__3Fdegaard.6_fzdhc5.webp' },
        { name: 'David Raya', position: 'Portero', imageUrl: 'https://res.cloudinary.com/dtss7bgnn/image/upload/v1726591466/David_Raya.1_aabsbg.webp' }
      ],
    },
  };

  const team = teamData[teamName || ''];

  return (
    <div className="p-4">
      {team ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{teamName}</h1>
          <p><strong>Fundado:</strong> {team.founded}</p>
          <p><strong>Estadio:</strong> {team.stadium}</p>
          <p><strong>Capacidad:</strong> {team.capacity}</p>
          <p><strong>Ubicación:</strong> {team.location}</p>
          <p><strong>Descripción:</strong> {team.description}</p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Jugadores Claves</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.players.map((player: any, index: number) => (
              <div key={index} className="max-w-sm rounded-lg border border-gray-300 overflow-hidden shadow-md">
                <div className="h-64 w-full"> {/* Contenedor de tamaño fijo para la imagen */}
                  <img
                    className="w-full h-full object-cover" // Clases de Tailwind para ajustar la imagen
                    src={player.imageUrl}
                    alt={player.name}
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{player.name}</div>
                  <p className="text-gray-700 text-base">{player.position}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Información no disponible para este equipo.</p>
      )}
    </div>
  );
};

export default TeamDetails;
