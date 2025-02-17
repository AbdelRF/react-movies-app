import axios from "axios";

const API_KEY = "904d912b657dec1360f104fae621b14b";
const BASE_URL = "https://api.themoviedb.org/3";

export const getGenres = async() => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
}

export const getPopularMovies = async() => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const getAllMovies = async (page = 1, sortBy = 'popularity.desc', genreId = null) => {
    try {
        const params = {
            api_key: API_KEY,
            sort_by: sortBy,
            page: page,
        };

        if (genreId) {
            params.with_genres = genreId; // Filter by selected genre
        }

        const response = await axios.get(`${BASE_URL}/discover/movie`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const searchMovies = async (query, page = 1, sortBy = 'popularity.desc', genreId = null) => {
    try {
        const params = {
            api_key: API_KEY,
            query: encodeURIComponent(query),
            sort_by: sortBy,
            page: page,
        };

        if (genreId) {
            params.with_genres = genreId; // Filter by selected genre
        }

        const response = await axios.get(`${BASE_URL}/search/movie`, { params });
        return response.data;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};
