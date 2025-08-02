import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MealCard from './MealCard';

const MealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Get meal data from localStorage
    const storedMeal = localStorage.getItem('meal');
    const storedMeals = localStorage.getItem('meals');
    
    if (storedMeal) {
      setMeal(JSON.parse(storedMeal));
    }
    
    if (storedMeals) {
      setMeals(JSON.parse(storedMeals));
    }
  }, [id]);

  const handleMealClick = (selectedMeal) => {
    localStorage.setItem('meal', JSON.stringify(selectedMeal));
    localStorage.setItem('meals', JSON.stringify(meals));
    navigate(`/meal/${selectedMeal.idMeal}`);
  };

  if (!meal) {
    return <div className="loading">Loading meal details...</div>;
  }

  // Extract ingredients (API provides ingredients up to strIngredient20)
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(ingredient);
    }
  }

  return (
    <div className="meal-detail-container">
      {/* Left Side - Meal Details */}
      <div className="meal-details-left">
        <div className="card">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <div className="content">
            <h1>{meal.strMeal}</h1>
            <div className="meta">
              Category: <strong>{meal.strCategory}</strong> | 
              Area: <strong>{meal.strArea}</strong>
            </div>
            
            <div className="ingredients">
              <strong>Ingredients:</strong>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="instructions">
              <strong>Instructions:</strong>
              <p>
                {meal.strInstructions 
                  ? meal.strInstructions.substring(0, 1000) + '...Watch Video On YouTube'
                  : ''
                }
              </p>
            </div>

            {meal.strYoutube && (
              <a 
                className="btn-youtube" 
                href={meal.strYoutube} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                ▶ Watch on YouTube
              </a>
            )}
            
            <a 
              className="btn-home" 
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            >
              ▶ Back to Home Page
            </a>
          </div>
        </div>
      </div>
      
      {/* Right Side - Other Meals */}
      <div className="other-meals-right">
        <h2 className="other-meals-title">Other Meals</h2>
        <div className="other-meals-grid">
          {meals.slice(0, 15).map((mealItem) => (
            <MealCard
              key={mealItem.idMeal}
              meal={mealItem}
              onClick={() => handleMealClick(mealItem)}
              isSingle={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealDetail; 