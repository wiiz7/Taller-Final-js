import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-300 overflow-hidden shadow-md transition-transform transform hover:scale-105">
      {/* Cambié object-cover a object-contain para que la imagen no se recorte */}
      <img className="w-full h-48 object-contain" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export default Card;
