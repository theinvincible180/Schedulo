import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import AlgoPage from './pages/AlgoPages';
import Stats from './pages/Stats';
import AIExplainer from './pages/AIExplainer';

function App() {

 
 
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/algo" element={<AlgoPage />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/aiexplainer" element={<AIExplainer />} />
    </Routes>


  </Router>
  )
}

export default App
