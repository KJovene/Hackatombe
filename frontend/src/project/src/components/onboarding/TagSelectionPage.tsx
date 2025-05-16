import React from 'react';
import { Search } from 'lucide-react';
import TagChip from '../ui/TagChip';
import { useOnboarding } from '../../context/OnboardingContext';

const TagSelectionPage: React.FC = () => {
  const { state, dispatch } = useOnboarding();
  const { tags, searchQuery } = state;

  const handleTagToggle = (id: string) => {
    dispatch({ type: 'TOGGLE_TAG', payload: id });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  const handleContinue = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  // Filter tags based on search query
  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count selected tags
  const selectedCount = tags.filter((tag) => tag.selected).length;

  return (
    <div className="animate-fadeIn flex flex-col h-full max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
        Personnalisez votre veille
      </h1>
      <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
        Sélectionnez les sujets qui vous intéressent pour découvrir du contenu pertinent partagé par la communauté.
      </p>

      {/* Search bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Ex: JavaScript, UI Design, Marketing Digital..."
          className="bg-gray-800 text-white w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Tags section */}
      <div className="flex flex-wrap gap-3 mb-10">
        {filteredTags.length > 0 ? (
          filteredTags.map((tag) => (
            <TagChip
              key={tag.id}
              id={tag.id}
              name={tag.name}
              selected={tag.selected}
              onClick={handleTagToggle}
            />
          ))
        ) : (
          <p className="text-gray-400 w-full text-center py-4">
            Aucun résultat trouvé pour "{searchQuery}"
          </p>
        )}
      </div>

      {/* Selected tags count and hint */}
      <div className="mt-auto">
        <p className="text-center text-gray-400 mb-4">
          <span className="text-purple-500 font-medium">{selectedCount}</span> sujets sélectionnés
        </p>
        <p className="text-center text-gray-500 text-sm mb-6">
          Vous pourrez affiner vos centres d'intérêt à tout moment 🎯
        </p>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          Continuer
        </button>
      </div>
    </div>
  );
};

export default TagSelectionPage;