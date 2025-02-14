const API_KEY = "904d912b657dec1360f104fae621b14b";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async() => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
  };

  /* export const getAllMovies = async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`);
    const data = await response.json();
    return data.results;
};
 */

export const getAllMovies = async () => {
    const categories = ["popular", "now_playing", "upcoming", "top_rated"];
    
    const requests = categories.map(category => 
        fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`).then(res => res.json())
    );

    const responses = await Promise.all(requests);
    
    // Flatten and remove duplicates
    const allMovies = [...new Set(responses.flatMap(data => data.results))];

    return allMovies;
};
