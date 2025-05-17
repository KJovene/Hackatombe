import React from 'react';

const TagChip = ({ id, name, selected, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        selected
          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
      onClick={() => onClick(id)}
    >
      {name}
    </button>
  );
};

export default TagChip;