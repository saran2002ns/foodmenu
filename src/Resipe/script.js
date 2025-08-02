function searchMeal() {
  const query = document.getElementById("search").value;
  let meals=[];
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "";
    
      if (data.meals) {
        if (data.meals.length === 1) {
          resultsDiv.classList.add("single-result");
        } else {
          resultsDiv.classList.remove("single-result");
        }
    
        data.meals.forEach(meal => {
          const mealDiv = document.createElement("div");
          mealDiv.id = "res";
          mealDiv.classList.add("meal-card");
          if (data.meals.length === 1) {
            mealDiv.classList.add("single-card");
          }
          meals.push(meal);
          
          mealDiv.innerHTML = `<a  class = "meal-class" data-id=${meal.idMeal} ">
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="res-img"/>
            <p>${meal.strInstructions ? meal.strInstructions.substring(0, 200) : ''}...</p>
            </a>
          `;
          resultsDiv.appendChild(mealDiv);
       
        });
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
        
      } else {
        resultsDiv.innerHTML = "<p>No meals found.</p>";
        resultsDiv.classList.remove("single-result");
      }
   
    })
    
    
}
function clickEvent(ml,meals){
  let html=``;
 meals.forEach((meal)=>{
   html+= `<div  class = "meal-class" data-id=${meal.idMeal} ">
   <h3>${meal.strMeal}</h3>
   <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="res-img"/>
   <p>${meal.strInstructions ? meal.strInstructions.substring(0, 200) : ''}...</p>
   </div>
 `;
 })
 document.querySelector('.total-body').innerHTML='';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const toTopBtn = document.getElementById('toTopBtn');
  if (window.scrollY > 200) {
    toTopBtn.style.display = 'block';
  } else {
    toTopBtn.style.display = 'none';
  }
});
searchMeal();



