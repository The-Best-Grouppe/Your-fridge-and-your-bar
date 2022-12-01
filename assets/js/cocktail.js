var buttonContainer = document.getElementById("button-container");
var cocktailEl = document.getElementById("cocktail");
var cocktailBtn = document.getElementById("cocktail-btn");
var favCocktail = JSON.parse(localStorage.getItem("favorite-cocktail") || '{"drinks": []}');
// Added intiial retrieval of favorites from storage or defaulting to empty

function renderDrink(cocktail) {
  var imgUrl = cocktail.strDrinkThumb;
  var drinkCardEl = document.createElement("div");
  var drinkNameEl = document.createElement("h2");
  var drinkImgEl = document.createElement("img");
  var drinkDirEl = document.createElement("p");
  var drinkIngrEl = document.createElement("ul");
  var drinkSaveBtn = document.createElement("button");

  cocktailEl.innerHTML = "";
  drinkNameEl.textContent = cocktail.strDrink;
  drinkImgEl.setAttribute("src", imgUrl);
  drinkImgEl.setAttribute("class", "card-section align-center")
  drinkDirEl.textContent = cocktail.strInstructions;
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

// Jeremy, I pushed in the favorites and wrote to local storage and trigger the notification
  drinkSaveBtn.onclick = function() {
    favCocktail.drinks.push(cocktail);
    localStorage.setItem("favorite-cocktail", JSON.stringify(favCocktail));
    $('#trigger-notification').click();
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

    cocktailEl.append(drinkCardEl);
    
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
        renderDrink(data.drinks[0]);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

cocktail();
cocktailBtn.addEventListener("click", cocktail);