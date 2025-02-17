import './css/App.css'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Pages/Home"
import Favorites from './Pages/Favorites'
import NavaBar from './components/NavaBar'
import { MovieProvider } from './contexts/MovieContext'

function App() {
  return (
    <MovieProvider>
      <NavaBar />
    <main className='main-content'>
    <Router>
    <Switch>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
    </Switch>
    </Router>
    </main>
    </MovieProvider>
  )
}

export default App
