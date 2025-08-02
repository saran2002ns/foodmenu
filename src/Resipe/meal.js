const meal =JSON.parse(localStorage.getItem('meal'));
const meals=JSON.parse(localStorage.getItem('meals'));
console.log(meal);
console.log(meals);
function mealFunction(){

    document.querySelector('.card').innerHTML=`
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="content">
      <h1>${meal.strMeal}</h1>
      <div class="meta">Category: <strong>${meal.strCategory}</strong> | Area: <strong>${meal.strArea}</strong></div>
      
      <div class="ingredients">
        <strong>Ingredients:</strong>
        <ul>
          <li>${meal.strIngredient1}</li>
          <li>${meal.strIngredient2}</li>
           <li>${meal.strIngredient3}</li>
           <li>${meal.strIngredient4}</li>
        </ul>
      </div>

      <div class="instructions">
        <strong>Instructions:</strong>
        <p>
           <li>${meal.strInstructions ? meal.strInstructions.substring(0, 1000) +`...Watch Video On YouTube`: '' }</li>
        </p>
      </div>

      <a class="btn-youtube" href="${meal.strYoutube
      }" target="_blank">▶ Watch on YouTube</a>
       <a class="btn-home" href="index.html" target="_blank">▶ Back to Home Page</a>
    </div>`;
    document.querySelector('.results-grid').innerHTML=mealsHTML();
     document.querySelectorAll('.meal-class').forEach(el => {
          el.addEventListener('click', () => {
       
            let meal;
            meals.forEach((ml)=>{
              if(ml.idMeal===el.dataset.id)
                meal=ml
            });
            localStorage.setItem('meal',JSON.stringify(meal));
            localStorage.setItem('meals',JSON.stringify(meals));
            window.location.href = "meal.html";
          });
        });
}
 function mealsHTML(){
    let html=``;
    for(let i=0;i<15;i++){
        element=meals[i];
        html+=`<a  class = "meal-class" data-id=${element.idMeal} ">
            <h3>${element.strMeal}</h3>
            <img src="${element.strMealThumb}" alt="${element.strMeal}" class="res-img"/>
            <p>${element.strInstructions ? element.strInstructions.substring(0, 200) : ''}...</p>
            </a>
          `;
    }
    return html;
}
mealFunction();