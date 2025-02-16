import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/MovieCarousel.css";
import { getPopularMovies } from '../services/api';

const MovieCarousel = () => {
    const [movies, setMovies] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
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
      }, [])

    return (
        <div className="movie-carousel">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 }
                }}
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className="movie-slide">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieCarousel;