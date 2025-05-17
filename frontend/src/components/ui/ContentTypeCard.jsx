import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const ContentTypeCard = ({ id, title, description, selected, onClick }) => {
  return (
    <div
      className={`rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        selected 
          ? 'bg-gray-800 border-2 border-purple-500 shadow-md hover:shadow-lg' 
          : 'bg-gray-800 border-2 border-transparent hover:bg-gray-700'
      }`}
      onClick={() => onClick(id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {selected ? (
          <CheckCircle size={20} className="text-purple-500" />
        ) : (
          <Circle size={20} className="text-gray-400" />
        )}
      </div>
      <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
    </div>
  );
};

export default ContentTypeCard;