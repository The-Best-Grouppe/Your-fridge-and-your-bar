<<<<<<< HEAD


/* link ingreidents to past search results */ 
function updateFave() {
    var values = [], keys = Object.keys(localstorage), i = keys.length;
    while (i--) { values.push( localStorage.getItem(keys[i]) ); }
    document.getElementById("personal-fave").textContent = values;
=======
const favoriteItems = JSON.parse(localStorage.getItem('favorite-cocktail') || '[]');
const injectPoint = document.getElementById('favorites');

/**
 * Setup DOM.
 * 1. Empty injection point
 * 2. Loop over drink favorites and get them from renderDrink
 * 3. If no results inject no results text
 */
function setupView() {
    injectPoint.innerHTML = "";
    favoriteItems.drinks.reverse();
    if (favoriteItems.drinks.length) {
        favoriteItems.drinks.forEach(function (item) {
            injectPoint.append(renderDrink(item));
        });
    } else {
        const noResults = document.createElement('h2');
        noResults.innerText = "No favorites yet";
        injectPoint.append(noResults);
    }
}

// Get the DOM element to inject for a cocktail
function renderDrink(cocktail) {
    var imgUrl = cocktail.strDrinkThumb;
    var drinkCardEl = document.createElement("div");
    var drinkNameEl = document.createElement("h2");
    var drinkImgEl = document.createElement("img");
    var drinkDirEl = document.createElement("p");
    var drinkIngrEl = document.createElement("ul");
    var drinkRemoveBtn = document.createElement("button");
  
    drinkNameEl.textContent = cocktail.strDrink;
    drinkImgEl.setAttribute("src", imgUrl);
    drinkImgEl.setAttribute("class", "card-section align-center")
    drinkDirEl.textContent = cocktail.strInstructions;
    drinkRemoveBtn.innerHTML = "Remove";
    drinkRemoveBtn.setAttribute("name", "drink-save-button");
    drinkRemoveBtn.setAttribute("type", "submit");
    drinkCardEl.setAttribute("class", "card cell align-center");
    drinkCardEl.setAttribute("class", "drink-card");
    drinkNameEl.setAttribute("class", "card-section align-center");
    drinkImgEl.setAttribute("class", "card-section align-center"); 
    drinkDirEl.setAttribute("class", "card-section align-center"); 
    drinkIngrEl.setAttribute("class", "card-section align-center");
    drinkRemoveBtn.setAttribute("class", "align-center button");
  
    drinkCardEl.append(drinkNameEl, drinkImgEl, drinkIngrEl, drinkDirEl, drinkRemoveBtn);

    drinkRemoveBtn.onclick = function() {
        // Use Array.filter to get items that DO NOT match the current ID and store into local storage and re-render the page
        favoriteItems.drinks = favoriteItems.drinks.filter(function(item) {
            return item.idDrink !== cocktail.idDrink;
        })
        localStorage.setItem("favorite-cocktail", JSON.stringify(favoriteItems));
        setupView();
      }
     
    for (var i = 1; i < 16; i++) {
      var ingredient = document.createElement("li");
      if (cocktail[`strIngredient${i}`] == null) {
        break;
      }
      else if (cocktail[`strMeasure${i}`] == null) {
          ingredient.textContent = cocktail[`strIngredient${i}`];
      } 
      else {
          ingredient.textContent =
            cocktail[`strMeasure${i}`] +
            ": " +
            cocktail[`strIngredient${i}`];
          
      }
      drinkIngrEl.append(ingredient);
  
      return drinkCardEl;
    }
>>>>>>> e04223253fb53fd1fbd0f869d5d23accb867bb8f
}

setupView();