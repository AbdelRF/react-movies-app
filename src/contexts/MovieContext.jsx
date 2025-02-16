import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) {
            console.log("Loaded Favorites from LocalStorage:", storedFavs);
            setFavorites(JSON.parse(storedFavs));
        }
    }, []);
    

    useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites]);
    

    const addToFavorites = (movie) => {
        setFavorites(prev => {
            if (!prev.some(fav => fav.id === movie.id)) {
                return [...prev, movie];
            }
            return prev;
        });
    };
    

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}