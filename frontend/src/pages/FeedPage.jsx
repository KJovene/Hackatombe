import { useEffect, useState } from "react";
import {
  fetchJavascript,
  fetchCyberSecurity,
  fetchMachineLearning,
  fetchUIDesign,
  fetchDataScience,
} from "../utils/fetchapis";
import { Link } from "react-router-dom";

function FeedPage() {
  const [JsArticles, setJsArticles] = useState([]);
  const [MLArticles, setMLArticles] = useState([]);
  const [UIDesignArticles, setUIDesignArticles] = useState([]);
  const [CyberSecurityArticles, setCyberSecurityArticles] = useState([]);
  const [DataScienceArticles, setDataScienceArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('je suis la');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const JsArticles = await fetchJavascript();
        setJsArticles(JsArticles);
        const MLArticles = await fetchMachineLearning();
        setMLArticles(MLArticles);
        console.log(MLArticles);
        const UIDesignArticles = await fetchUIDesign();
        setUIDesignArticles(UIDesignArticles);
        const CyberSecurityArticles = await fetchCyberSecurity();
        setCyberSecurityArticles(CyberSecurityArticles);
        const DataScienceArticles = await fetchDataScience();
        setDataScienceArticles(DataScienceArticles);
        console.log(DataScienceArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Link to="/addPost">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">AddPost pages</button>
      </Link>
      <h1>Voici les articles classés par thème</h1>
      <h2>Javascript</h2>
      <ul>
        {JsArticles.map((article) => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
              <p>{article.content_text}</p>
              <p>{article.date_published}</p>
              {article.image && <img src={article.image} alt={article.title} />}
            </a>
          </li>
        ))}
      </ul>
      <h2>Machine Learning</h2>
      <ul>
        {MLArticles.map((article) => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
              <p>{article.content_text}</p>
              <p>{article.date_published}</p>
              {article.image && <img src={article.image} alt={article.title} />}
            </a>
          </li>
        ))}
      </ul>
      <h2>UI Design</h2>
      <ul>
        {UIDesignArticles.map((article) => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
              <p>{article.content_text}</p>
              <p>{article.date_published}</p>
              {article.image && <img src={article.image} alt={article.title} />}
            </a>
          </li>
        ))}
      </ul>
      <h2>Cyber Security</h2>
      <ul>
        {CyberSecurityArticles.map((article) => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
              <p>{article.content_text}</p>
              <p>{article.date_published}</p>
              {article.image && <img src={article.image} alt={article.title} />}
            </a>
          </li>
        ))}
      </ul>
      <h2>Data Science</h2>
      <ul>
        {DataScienceArticles.map((article) => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
              <p>{article.content_text}</p>
              <p>{article.date_published}</p>
              {article.image && <img src={article.image} alt={article.title} />}
            </a>
          </li>
        ))}
      </ul>
      {loading && <p>Loading articles...</p>}
    </div>
  );
}

export default FeedPage;
