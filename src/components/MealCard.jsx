import React from 'react';

const MealCard = ({ meal, onClick, isSingle }) => {
  return (
    <div 
      id="res"
      className={`meal-card ${isSingle ? 'single-card' : ''}`}
      onClick={onClick}
    >
      <div className="meal-class">
        <h3>{meal.strMeal}</h3>
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal} 
          className="res-img"
        />
        <p>
          {meal.strInstructions 
            ? meal.strInstructions.substring(0, 200) + '...' 
            : ''
          }
        </p>
      </div>
    </div>
  );
};

export default MealCard; 