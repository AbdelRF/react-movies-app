import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import MovieCarousel from '../components/MovieCarousel';
import '../css/Home.css';
import { getAllMovies, searchMovies, getGenres } from '../services/api';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [sortBy, setSortBy] = useState('popularity.desc'); // Default sorting by popularity
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Fetch genres for filter
        const fetchGenres = async () => {
            try {
                const genreList = await getGenres();
                setGenres(genreList);
            } catch (err) {
                console.error(err);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let response;
                if (searchQuery.trim()) {
                    response = await searchMovies(searchQuery, page, sortBy, selectedGenre);
                } else {
                    response = await getAllMovies(page, sortBy, selectedGenre);
                }
                setMovies(response.results);
                setTotalPages(response.total_pages);
                setError(null);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [searchQuery, page, sortBy, selectedGenre]);

    useEffect(() => {
        // Reset page number to 1 whenever searchQuery changes
        if (searchQuery.trim()) {
            setPage(1);
        }
    }, [searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setPage(1); // Reset page when initiating search
    };

    return (
        <div className="home">
            <div>
                <h1>Popular Movies</h1>
                <MovieCarousel />
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query as user types
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            <div className="filters">
                <select
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    value={selectedGenre || ""}
                >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                    <option value="popularity.desc">Sort by Popularity</option>
                    <option value="release_date.desc">Sort by Release Date</option>
                    <option value="vote_average.desc">Sort by Rating</option>
                </select>
            </div>

            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <div className="movies-grid">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                    <div className="pagination">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                        <span> Page {page} of {totalPages} </span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
