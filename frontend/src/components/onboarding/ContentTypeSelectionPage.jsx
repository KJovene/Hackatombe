import React from 'react';
import ContentTypeCard from '../ui/ContentTypeCard';
import { useOnboarding } from '../../context/OnboardingContext';
import { ArrowLeft } from 'lucide-react';

const ContentTypeSelectionPage = () => {
  const { state, dispatch } = useOnboarding();
  const { contentTypes } = state;

  const handleContentTypeToggle = (id) => {
    dispatch({ type: 'TOGGLE_CONTENT_TYPE', payload: id });
  };

  const handlePrevious = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const handleFinish = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const selectedCount = contentTypes.filter((type) => type.selected).length;
  const totalCount = contentTypes.length;

  return (
    <div className="animate-fadeIn flex flex-col h-full max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={handlePrevious}
        className="self-start flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={18} className="mr-1" />
        Retour
      </button>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
        Quel type de contenu souhaitez-vous découvrir ?
      </h1>
      
      <p className="text-gray-400 text-center mb-8">
        Personnalisez votre feed en sélectionnant les formats qui vous intéressent.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {contentTypes.map((type) => (
          <ContentTypeCard
            key={type.id}
            id={type.id}
            title={type.title}
            description={type.description}
            selected={type.selected}
            onClick={handleContentTypeToggle}
          />
        ))}
      </div>

      <div className="mt-auto">
        <p className="text-center text-gray-400 mb-6">
          <span className="text-purple-500 font-medium">{selectedCount}</span> sur {totalCount} types de contenus sélectionnés
        </p>

        <button
          onClick={handleFinish}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          Accéder à mon feed personnalisé
        </button>
      </div>
    </div>
  );
};

export default ContentTypeSelectionPage;