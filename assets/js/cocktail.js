var buttonContainer = document.getElementById("button-container");
var cocktailEl = document.getElementById("cocktail");
var cocktailBtn = document.getElementById("cocktail-btn");
var favCocktail = [];

function renderDrink(cocktail) {
  var imgUrl = cocktail.drinks[0].strDrinkThumb;
  // var containerEl = document.createElement("div");
  var drinkCardEl = document.createElement("div");
  var drinkNameEl = document.createElement("h2");
  var drinkImgEl = document.createElement("img");
  var drinkDirEl = document.createElement("p");
  var drinkIngrEl = document.createElement("ul");
  var drinkSaveBtn = document.createElement("button");


  cocktailEl.innerHTML = "";
  // containerEl.append(drinkCardEl);
  drinkNameEl.textContent = cocktail.drinks[0].strDrink;
  drinkImgEl.setAttribute("src", imgUrl);
  drinkImgEl.setAttribute("class", "card-section align-center")
  drinkDirEl.textContent = cocktail.drinks[0].strInstructions;
  drinkSaveBtn.innerHTML = "Save";
  drinkSaveBtn.setAttribute("name", "drink-save-button");
  drinkSaveBtn.setAttribute("type", "submit");
  drinkCardEl.setAttribute("class", "card cell align-center");
  drinkCardEl.setAttribute("class", "drink-card");
  drinkNameEl.setAttribute("class", "card-section align-center");
  drinkImgEl.setAttribute("class", "card-section align-center"); 
  drinkDirEl.setAttribute("class", "card-section align-center"); 
  drinkIngrEl.setAttribute("class", "card-section align-center");
  drinkSaveBtn.setAttribute("class", "card-section align-center submit success button");

  drinkCardEl.append(drinkNameEl, drinkImgEl, drinkIngrEl, drinkDirEl, drinkSaveBtn);

  for (var i = 1; i < 16; i++) {
    var ingredient = document.createElement("li");
    if (cocktail.drinks[0][`strIngredient${i}`] == null) {
      break;
    }
    else if (cocktail.drinks[0][`strMeasure${i}`] == null) {
        ingredient.textContent = cocktail.drinks[0][`strIngredient${i}`];
    } 
    else {
        ingredient.textContent =
          cocktail.drinks[0][`strMeasure${i}`] +
          ": " +
          cocktail.drinks[0][`strIngredient${i}`];
        
    }
    drinkIngrEl.append(ingredient);

    cocktailEl.append(drinkCardEl);
    
    }
    drinkSaveBtn.onclick = function() {
      favCocktail.push(cocktail);
      localStorage.setItem("favorite-cocktail", JSON.stringify(favCocktail));
    }
}

function cocktail(event) {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      response.json().then(function (data) {
        console.log(data);
        console.log(data.drinks[0].strDrink);
        console.log(data.drinks[0].strDrinkThumb);
        console.log(data.drinks[0].strInstructions);
        renderDrink(data);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

cocktail();
cocktailBtn.addEventListener("click", cocktail);