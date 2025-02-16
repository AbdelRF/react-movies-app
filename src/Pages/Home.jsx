import React, { use } from 'react'
import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import MovieCarousel from "../components/MovieCarousel";
import '../css/Home.css'
import { getAllMovies, searchMovies, getPopularMovies } from '../services/api';

const Home = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    /* useEffect(() => {
      const loadPopularMovies = async () => {
          try {
              const popularMovies = await getPopularMovies();
              setMovies(popularMovies)
          } catch (error) {
              console.log(err)
              setError("Failed to load movies...")
          }
          finally{
              setLoading(false)
          }
      }
      loadPopularMovies()
  }, []) */

  useEffect(() => {
    const loadAllMovies = async () => {
        try {
            const popularMovies = await getAllMovies();
            setMovies(popularMovies)
        } catch (error) {
            console.log(err)
            setError("Failed to load movies...")
        }
        finally{
            setLoading(false)
        }
    }
    loadAllMovies()
}, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (error) {
            console.log(err)
            setError("Failed to search movies...")
            
        } finally{
            setLoading(false)
        }
    }

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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
    
            {error && <div className="error-message">{error}</div>}
    
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          )}
        </div>
      );
}

export default Home