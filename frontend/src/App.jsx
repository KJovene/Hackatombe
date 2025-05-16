import { useEffect } from 'react';


function App() {

  useEffect(() => {
    const fetchData = async () => {
      const articles = await fetchJavascript();
      console.log(articles);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Welcome to the RSS Feed App</h1>
      <p>Check the console for fetched articles.</p>
    </div>
  )
}

export default App
