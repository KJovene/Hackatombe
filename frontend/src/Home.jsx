function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    setLoading(true);
    let q;
    
    if (selectedTopic) {
      q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        where('topics', 'array-contains', selectedTopic)
      );
    } else {
      q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedTopic]);

  return (
    <div className="home-page">
      <div className="home-content">
        <aside className="sidebar">
          <TopicFilter 
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
        </aside>
        
        <main className="main-feed">
          <PostForm />
          
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Chargement des publications...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="empty-feed">
              <h3>Aucune publication trouvée</h3>
              <p>Soyez le premier à partager une ressource !</p>
            </div>
          ) : (
            posts.map(post => (
              <Post key={post.id} post={post} />
            ))
          )}
        </main>
      </div>
    </div>
  );
}