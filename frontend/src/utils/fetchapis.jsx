

export default fetchJavascript = async () => {
        const res = await fetch('https://rss.app/feeds/v1.1/t2ppqYnG2ZBVA0qc.json');
        const data = await res.json();
        const articles = data.items.map((item) => ({
            title: item.title,
            description: item.description,
            link: item.link,
            pubDate: item.pubDate,
        }));
    return articles;
}


