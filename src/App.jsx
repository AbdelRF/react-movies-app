import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import NavaBar from './components/NavaBar';
import { MovieProvider } from './contexts/MovieContext';

function App() {
  return (
    <MovieProvider>
      <NavaBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
