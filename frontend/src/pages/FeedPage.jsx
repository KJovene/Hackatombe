import { useEffect, useState } from "react";
import {
  fetchJavascript,
  fetchCyberSecurity,
  fetchMachineLearning,
  fetchUIDesign,
  fetchDataScience,
} from "../utils/fetchapis";

function FeedPage() {
  const [JsArticles, setJsArticles] = useState([]);
  const [MLArticles, setMLArticles] = useState([]);
  const [UIDesignArticles, setUIDesignArticles] = useState([]);
  const [CyberSecurityArticles, setCyberSecurityArticles] = useState([]);
  const [DataScienceArticles, setDataScienceArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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
