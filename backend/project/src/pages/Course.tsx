import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, BookOpen, Share2, ThumbsUp, MessageSquare, Code, FileCode } from 'lucide-react';
import Header from '../components/ui/Header';
import toast from 'react-hot-toast';

const mockArticleData = {
  '1': {
    title: 'JavaScript Moderne - Les nouveautés ES2023',
    content: `
      <h2>Introduction aux nouvelles fonctionnalités</h2>
      <p>ECMAScript 2023 apporte plusieurs améliorations majeures au langage JavaScript, rendant le développement plus efficace et expressif. Découvrons ensemble ces nouveautés qui vont révolutionner votre façon de coder.</p>

      <h2>1. Array Methods</h2>
      <p>Les nouvelles méthodes de tableau simplifient considérablement la manipulation des données :</p>
      
      <h3>toSorted(), toReversed(), et toSpliced()</h3>
      <p>Ces méthodes non-mutables permettent de manipuler les tableaux de manière plus sûre :</p>
      <pre><code>const numbers = [3, 1, 4, 1, 5];
const sorted = numbers.toSorted(); // [1, 1, 3, 4, 5]
// numbers reste inchangé</code></pre>

      <h3>findLast() et findLastIndex()</h3>
      <p>Recherchez des éléments depuis la fin du tableau :</p>
      <pre><code>const numbers = [2, 4, 6, 8, 10, 4];
const lastEven = numbers.findLast(n => n % 2 === 0); // 4</code></pre>

      <h2>2. String Methods</h2>
      <p>De nouvelles méthodes de chaîne permettent une manipulation plus efficace du texte :</p>

      <h3>trimStart() et trimEnd()</h3>
      <pre><code>const text = "   Hello World   ";
console.log(text.trimStart()); // "Hello World   "
console.log(text.trimEnd());   // "   Hello World"</code></pre>

      <h2>3. WeakMap et WeakSet améliorés</h2>
      <p>Les collections faibles bénéficient de nouvelles fonctionnalités :</p>
      <pre><code>const weak = new WeakMap();
const key = {};
weak.set(key, "value");

// Nouveau : vérification d'existence simplifiée
console.log(weak.has(key)); // true</code></pre>

      <h2>4. Promise.withResolvers()</h2>
      <p>Une nouvelle façon de créer des promesses avec leurs résolveurs exposés :</p>
      <pre><code>const { promise, resolve, reject } = Promise.withResolvers();

// Utilisation plus claire des promesses
promise.then(value => console.log(value));
resolve("Success!");</code></pre>

      <h2>Bonnes pratiques</h2>
      <ul>
        <li>Privilégiez les nouvelles méthodes non-mutables pour une meilleure immutabilité</li>
        <li>Utilisez les nouveaux outils de recherche pour optimiser vos algorithmes</li>
        <li>Profitez des améliorations des promesses pour un code asynchrone plus clair</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Ces nouvelles fonctionnalités rendent JavaScript encore plus puissant et expressif. Elles simplifient le code tout en le rendant plus sûr et plus maintenable. N'hésitez pas à les adopter dans vos projets pour profiter de ces améliorations !</p>
    `,
    author: 'JS Academy',
    publishedDate: '2025-03-15',
    readingTime: '10 min',
    tags: ['javascript', 'es2023', 'frontend'],
    likes: 42,
    isLiked: false
  },
  '2': {
    title: 'Guide complet sur les Design Systems en 2025',
    content: `
      <h2>Qu'est-ce qu'un Design System ?</h2>
      <p>Un système de design est une collection de composants réutilisables, guidés par des règles claires, une documentation et des principes de design...</p>

      <h2>1. Principes fondamentaux</h2>
      <p>Les principes clés d'un bon système de design incluent la cohérence, la réutilisabilité et l'accessibilité...</p>

      <h2>2. Outils et technologies</h2>
      <p>Les outils modernes comme Figma, Storybook et Theme UI facilitent la création et la maintenance des design systems...</p>

      <h2>Conclusion</h2>
      <p>Un bon design system est essentiel pour créer des produits cohérents et évolutifs...</p>
    `,
    author: 'Design Talk FR',
    publishedDate: '2025-02-28',
    readingTime: '15 min',
    tags: ['design-system', 'ui', 'ux'],
    likes: 28,
    isLiked: false
  }
};

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [articleData, setArticleData] = useState(mockArticleData);
  
  const article = id ? articleData[id as keyof typeof articleData] : null;

  if (!article) {
    return <div>Article not found</div>;
  }

  const handleLike = () => {
    setArticleData(prev => ({
      ...prev,
      [id]: {
        ...prev[id as keyof typeof prev],
        likes: prev[id as keyof typeof prev].isLiked 
          ? prev[id as keyof typeof prev].likes - 1 
          : prev[id as keyof typeof prev].likes + 1,
        isLiked: !prev[id as keyof typeof prev].isLiked
      }
    }));
    
    toast.success(article.isLiked ? 'Like retiré' : 'Article liké !', {
      position: 'bottom-center',
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Lien copié !', {
      position: 'bottom-center',
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Article header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{article.readingTime} de lecture</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={20} />
              <span>Par {article.author}</span>
            </div>
            {article.type === 'code' && (
              <div className="flex items-center gap-2">
                <Code size={20} />
                <span>Code source inclus</span>
              </div>
            )}
            {article.type === 'template' && (
              <div className="flex items-center gap-2">
                <FileCode size={20} />
                <span>Template téléchargeable</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Article content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Article footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 ${
                  article.isLiked 
                    ? 'text-purple-500' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-500'
                }`}
              >
                <ThumbsUp size={20} />
                <span>{article.likes} J'aime{article.likes > 1 ? 's' : ''}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-500">
                <MessageSquare size={20} />
                <span>Commenter</span>
              </button>
            </div>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-500"
            >
              <Share2 size={20} />
              <span>Partager</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Article;