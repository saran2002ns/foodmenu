
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import MealDetail from './components/MealDetail';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMeals = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
        setError('No meals found.');
      }
    } catch (err) {
      setError('Error fetching meals. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial search on component mount
  useEffect(() => {
    searchMeals('chicken');
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <SearchSection onSearch={searchMeals} />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <ResultsSection 
                meals={meals} 
                loading={loading} 
                error={error} 
              />
            } 
          />
          <Route path="/meal/:id" element={<MealDetail />} />
        </Routes>
        
        <ScrollToTop />
        <Footer />
      </div>
    </Router>
  );
}

export default App;



