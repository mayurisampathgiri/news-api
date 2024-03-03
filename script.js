const apiKey = "b4a493f8fba0446b91f4612dc6df0f53"; //key fetched from newsAPI
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const blogContainer = document.getElementById("blog-container");

// Function to fetch random news
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=8&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } 
    catch (error) {
        console.error("Error fetching random news:", error);
        return [];
    }
}
// Function to fetch news by query
async function fetchNewsByQuery(query) {
    try {
        const pageSize = 10; // Limit to 10 articles
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
      // Filter articles that have an image
        const articlesWithImage = data.articles.filter(
            (article) => article.urlToImage
        );
        return articlesWithImage;
    } 
    catch (error) {
        console.error("Error fetching news by query:", error);
        return [];
    }
}
