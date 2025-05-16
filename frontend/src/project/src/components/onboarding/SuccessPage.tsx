import React from 'react';
import { CheckCircle, Video, Headphones, FileCode, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useOnboarding();
  const selectedTypes = state.contentTypes.filter(type => type.selected);

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'vidéos':
        return <Video size={24} className="text-purple-500" />;
      case 'podcasts':
        return <Headphones size={24} className="text-blue-500" />;
      case 'templates':
        return <FileCode size={24} className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fadeIn flex flex-col items-center justify-center min-h-screen max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="mb-8">
          <CheckCircle size={64} className="text-purple-500 mx-auto" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Votre feed est prêt !
        </h1>
        
        <p className="text-gray-400 text-lg mb-8">
          Nous avons personnalisé votre expérience en fonction de vos centres d'intérêt.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {selectedTypes.map((type) => (
          <div
            key={type.id}
            className="bg-gray-800 rounded-lg p-6 transform hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              {getIcon(type.title)}
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                {type.title}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{type.description}</p>
          </div>
        ))}
      </div>

      <div className="w-full">
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-white font-semibold mb-4">Prochaines étapes</h2>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Explorez votre feed personnalisé
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Interagissez avec la communauté
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Partagez vos découvertes
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/feed')}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          Accéder à mon feed
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;