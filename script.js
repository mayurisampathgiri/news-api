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
// Function to display blogs/articles
function displayBlogs(articles) {
    blogContainer.innerHTML = ""; // Clear previous results
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle =
            article.title.length > 30
            ? article.title.slice(0, 30) + "..."
            : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDes =
            article.description.length > 120
            ? article.description.slice(0, 120) + "..."
            : article.description;
        description.textContent = truncatedDes;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

// Event listener for search button
searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsByQuery(query);
            displayBlogs(articles);
        } 
        catch (error) {
            console.error("Error fetching news by query:", error);
        }
    }
});
  
// Initially fetch and display random news on page load
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } 
    catch (error) {
        console.error("Error fetching random news:", error);
    }
})();