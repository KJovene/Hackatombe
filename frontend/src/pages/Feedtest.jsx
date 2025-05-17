import React, { useEffect, useState } from "react";
import {
  fetchJavascript,
  fetchCyberSecurity,
  fetchMachineLearning,
  fetchUIDesign,
  fetchDataScience,
} from "../utils/fetchapis";
import { Search, Grid, List } from "lucide-react";
import Header from "../components/ui/Header";
import { Link } from "react-router-dom";
import axios from "axios";

function FeedTest() {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [createdPosts, setCreatedPosts] = useState([]);

  useEffect(() => {
    if (selectedType === "created-posts") {
      setLoading(true);
      axios.get('http://localhost:6782/posts')
        .then((res) => {
          setCreatedPosts(
            res.data.map((p) => {
              let thumbnail = p.image;
              if (thumbnail && !thumbnail.startsWith("data:image")) {
                thumbnail = `data:image/jpeg;base64,${thumbnail}`;
              }
              return {
                ...p,
                id: p.id,
                title: p.titre,
                description: p.description || "",
                thumbnail: thumbnail || "https://via.placeholder.com/300x200?text=Post",
                type: "created-posts",
                tags: ["created"],
              };
            })
          );
        })
        .catch(() => setCreatedPosts([]))
        .finally(() => setLoading(false));
    }
  }, [selectedType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          JsArticles,
          MLArticles,
          UIDesignArticles,
          CyberSecurityArticles,
          DataScienceArticles,
        ] = await Promise.all([
          fetchJavascript(),
          fetchMachineLearning(),
          fetchUIDesign(),
          fetchCyberSecurity(),
          fetchDataScience(),
        ]);
        // Ajoute un champ type pour filtrer
        const format = (arr, type) =>
          arr.map((a) => ({
            ...a,
            type,
            title: a.title || "",
            description: a.content_text || "",
            author: a.author || "",
            thumbnail: a.image || "",
            likes: Math.floor(Math.random() * 100),
            comments: Math.floor(Math.random() * 20),
            tags: [type],
            level: "débutant",
            id: a.url,
            url: a.url,
            date: a.date_published,
          }));
        setAllArticles([
          ...format(JsArticles, "javascript"),
          ...format(MLArticles, "machine-learning"),
          ...format(UIDesignArticles, "ui-design"),
          ...format(CyberSecurityArticles, "cyber-security"),
          ...format(DataScienceArticles, "data-science"),
        ]);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredArticles =
    selectedType === "created-posts"
      ? createdPosts.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : allArticles.filter(
        (article) =>
          (!selectedType || article.type === selectedType) &&
          (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex max-w-2xl">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Rechercher des ressources..."
                  className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Link to="/addPost">
                <button className="ml-4 px-4 py-2 bg-purple-500 text-white rounded-lg"> Ajouter un post</button>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                    ? "bg-gray-100 dark:bg-gray-800 text-purple-500"
                    : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                    ? "bg-gray-100 dark:bg-gray-800 text-purple-500"
                    : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
          {/* Filtres par thème */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!selectedType
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
                }`}
            >
              Tout
            </button>
            <button
              onClick={() => setSelectedType("javascript")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedType === "javascript"
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
                }`}
            >
              Javascript
            </button>
            <button
              onClick={() => setSelectedType("machine-learning")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedType === "machine-learning"
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
                }`}
            >
              Machine Learning
            </button>
            <button
              onClick={() => setSelectedType("ui-design")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedType === "ui-design"
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
                }`}
            >
              UI Design
            </button>
            <button
              onClick={() => setSelectedType("cyber-security")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedType === "cyber-security"
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
                }`}
            >
              Cyber Security
            </button>
            <button
              onClick={() => setSelectedType("data-science")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedType === "data-science"
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
                }`}
            >
              Data Science
            </button>
            <button
              onClick={() => setSelectedType("created-posts")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedType === "data-science"
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
                }`}
            >
              Posts créés
            </button>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <p>Chargement des articles...</p>
        ) : (
          <div
            className={`grid ${viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
              } gap-6`}
          >
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className={`bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden transition-transform hover:-translate-y-1 ${viewMode === "list" ? "flex" : ""
                  }`}
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1"
                >
                  <div
                    className={`relative ${viewMode === "list" ? "w-48" : "w-full"
                      }`}
                  >
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 rounded-full text-xs font-medium text-white">
                      {article.type}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-semibold mb-2">
                        {article.title}
                      </h2>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400">
                        {article.level}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {article.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags &&
                        article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300"
                          >
                            #{tag}
                          </span>
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 mt-auto">
                      {article.author}
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default FeedTest;
