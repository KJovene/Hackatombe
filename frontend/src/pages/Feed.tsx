import React, { useState } from 'react';
import { Search, Grid, List, Share2, ThumbsUp, MessageSquare, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import CommentModal from '../components/CommentModal';
import Header from '../components/ui/Header';

interface Resource {
  id: string;
  type: 'video' | 'podcast' | 'article';
  title: string;
  description: string;
  author: string;
  thumbnail: string;
  likes: number;
  comments: number;
  tags: string[];
  level: 'débutant' | 'intermédiaire' | 'expert';
  isLiked?: boolean;
}

const mockResources: Resource[] = [
  {
    id: '1',
    type: 'video',
    title: 'JavaScript Moderne - Les nouveautés ES2023',
    description: 'Découvrez les dernières fonctionnalités de JavaScript et comment les utiliser dans vos projets. Une analyse détaillée des améliorations apportées au langage.',
    author: 'JS Academy',
    thumbnail: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg',
    likes: 42,
    comments: 12,
    tags: ['javascript', 'es2023', 'frontend'],
    level: 'intermédiaire'
  },
  {
    id: '2',
    type: 'article',
    title: 'Guide complet sur les Design Systems en 2025',
    description: 'Tout ce que vous devez savoir sur la création et la maintenance de systèmes de design modernes. Bonnes pratiques et outils recommandés.',
    author: 'Design Talk FR',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    likes: 28,
    comments: 8,
    tags: ['design-system', 'ui', 'ux'],
    level: 'débutant'
  },
  {
    id: '3',
    type: 'article',
    title: 'React 19 - Les nouvelles fonctionnalités',
    description: 'Exploration des nouvelles fonctionnalités de React 19 et leur impact sur le développement d\'applications modernes',
    author: 'React Masters',
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
    likes: 156,
    comments: 24,
    tags: ['react', 'javascript', 'frontend'],
    level: 'intermédiaire'
  },
  {
    id: '4',
    type: 'podcast',
    title: 'UX Research en 2025 - Nouvelles méthodologies',
    description: 'Discussion sur l\'évolution des méthodes de recherche UX et leur application dans les projets modernes',
    author: 'UX Insights',
    thumbnail: 'https://images.pexels.com/photos/7014766/pexels-photo-7014766.jpeg',
    likes: 89,
    comments: 15,
    tags: ['ux', 'research', 'design'],
    level: 'expert'
  },
  {
    id: '5',
    type: 'article',
    title: 'Performance JavaScript - Guide d\'optimisation',
    description: 'Techniques avancées pour optimiser les performances de vos applications JavaScript. Mesures, debugging et solutions concrètes.',
    author: 'JS Performance',
    thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
    likes: 112,
    comments: 18,
    tags: ['javascript', 'performance', 'optimization'],
    level: 'expert'
  }
];

const Feed: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState(mockResources);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredResources = resources.filter(resource => 
    (!selectedType || resource.type === selectedType) &&
    (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleShare = (id: string) => {
    console.log('Sharing resource:', id);
  };

  const handleLike = (id: string) => {
    setResources(resources.map(resource => {
      if (resource.id === id) {
        const isLiked = !resource.isLiked;
        return {
          ...resource,
          likes: resource.likes + (isLiked ? 1 : -1),
          isLiked
        };
      }
      return resource;
    }));
  };

  const handleComment = (id: string) => {
    setSelectedResourceId(id);
    setIsCommentModalOpen(true);
  };

  const handleCommentSubmit = (comment: string) => {
    if (selectedResourceId) {
      setResources(resources.map(resource => {
        if (resource.id === selectedResourceId) {
          return {
            ...resource,
            comments: resource.comments + 1
          };
        }
        return resource;
      }));
    }
  };

  const handleResourceClick = (id: string) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      
      {/* Sub-header with search and controls */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Search bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher des ressources..."
                  className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* View controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-800 text-purple-500' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-800 text-purple-500' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !selectedType ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Tout
            </button>
            <button
              onClick={() => setSelectedType('article')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedType === 'article' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen size={16} />
              Articles
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'video' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Vidéos
            </button>
            <button
              onClick={() => setSelectedType('podcast')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === 'podcast' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Podcasts
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Resource grid */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {filteredResources.map((resource) => (
            <article
              key={resource.id}
              className={`bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden transition-transform hover:-translate-y-1 ${
                viewMode === 'list' ? 'flex' : ''
              } cursor-pointer`}
              onClick={() => handleResourceClick(resource.id)}
            >
              {/* Thumbnail */}
              <div className={`relative ${viewMode === 'list' ? 'w-48' : 'w-full'}`}>
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 rounded-full text-xs font-medium text-white">
                  {resource.type}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-semibold mb-2">{resource.title}</h2>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    resource.level === 'débutant' ? 'bg-green-500/20 text-green-400' :
                    resource.level === 'intermédiaire' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {resource.level}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{resource.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Author and interactions */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{resource.author}</span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(resource.id);
                      }}
                      className={`flex items-center transition-colors ${
                        resource.isLiked
                          ? 'text-purple-500'
                          : 'text-gray-400 hover:text-purple-500'
                      }`}
                    >
                      <ThumbsUp size={16} className="mr-1" />
                      <span className="text-sm">{resource.likes}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComment(resource.id);
                      }}
                      className="flex items-center text-gray-400 hover:text-purple-500 transition-colors"
                    >
                      <MessageSquare size={16} className="mr-1" />
                      <span className="text-sm">{resource.comments}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(resource.id);
                      }}
                      className="text-gray-400 hover:text-purple-500 transition-colors"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        resourceId={selectedResourceId || ''}
        onSubmit={handleCommentSubmit}
      />
    </div>
  );
};

export default Feed;