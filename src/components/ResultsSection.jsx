import React from 'react';
import { useNavigate } from 'react-router-dom';
import MealCard from './MealCard';

const ResultsSection = ({ meals, loading, error }) => {
  const navigate = useNavigate();

  const handleMealClick = (meal) => {
    // Store meal data in localStorage for the detail page
    localStorage.setItem('meal', JSON.stringify(meal));
    localStorage.setItem('meals', JSON.stringify(meals));
    navigate(`/meal/${meal.idMeal}`);
  };

  if (loading) {
    return (
      <section id="results-section">
        <div className="loading">Loading meals...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="results-section">
        <div className="error">{error}</div>
      </section>
    );
  }

  return (
    <section id="results-section">
      <div 
        id="results" 
        className={`results-grid ${meals.length === 1 ? 'single-result' : ''}`}
      >
        {meals.map((meal) => (
          <MealCard 
            key={meal.idMeal}
            meal={meal}
            onClick={() => handleMealClick(meal)}
            isSingle={meals.length === 1}
          />
        ))}
      </div>
    </section>
  );
};

export default ResultsSection; 