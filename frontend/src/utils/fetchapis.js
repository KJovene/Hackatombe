

export async function fetchJavascript() {
        const res = await fetch('https://rss.app/feeds/v1.1/t2ppqYnG2ZBVA0qc.json');
        const data = await res.json();
        const articles = data.items.map((item) => ({
            title: item.title,
            content_text: item.content_text,
            url: item.url,
            date_published: item.date_published,
            image: item.image,
        }));
    return articles;
};

export async function fetchMachineLearning() {
        const res = await fetch('https://rss.app/feeds/v1.1/tECTUiZDvjnk9cQ1.json');
        const data = await res.json();
        const articles = data.items.map((item) => ({
            title: item.title,
            content_text: item.content_text,
            url: item.url,
            date_published: item.date_published,
            image: item.image,
        }));
    return articles;
};

export async function fetchCyberSecurity() {
        const res = await fetch('https://rss.app/feeds/v1.1/tC6N0UYn0x7BuaXQ.json');
        const data = await res.json();
        const articles = data.items.map((item) => ({
            title: item.title,
            content_text: item.content_text,
            url: item.url,
            date_published: item.date_published,
            image: item.image,
        }));
    return articles;
};

export async function fetchUIDesign() {
        const res = await fetch('https://rss.app/feeds/v1.1/tkJ8NTcc8nTUXitK.json');
        const data = await res.json();
        const articles = data.items.map((item) => ({
            title: item.title,
            content_text: item.content_text,
            url: item.url,
            date_published: item.date_published,
            image: item.image,
        }));
    return articles;
};






