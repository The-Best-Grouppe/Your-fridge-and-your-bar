var buttonContainer = document.getElementById("button-container");
var cocktailEl = document.getElementById("cocktail");
var cocktailBtn = document.getElementById("cocktail-btn");

function renderDrink(cocktail) {
  var imgUrl = cocktail.drinks[0].strDrinkThumb;
  var containerEl = document.createElement("div");
  var drinkCardEl = document.createElement("div");
  var drinkNameEl = document.createElement("h2");
  var drinkImgEl = document.createElement("img");
  var drinkDirEl = document.createElement("p");
  var drinkIngrEl = document.createElement("uo");

  cocktailEl.innerHTML = "";
  containerEl.append(drinkCardEl);
  drinkNameEl.textContent = cocktail.drinks[0].strDrink;
  drinkImgEl.setAttribute("src", imgUrl);
  drinkDirEl.textContent = cocktail.drinks[0].strInstructions;
  drinkCardEl.append(drinkNameEl, drinkImgEl, drinkIngrEl, drinkDirEl);

  for (var i = 1; i < 16; i++) {
    var ingredient = document.createElement("li");
    if (cocktail.drinks[0][`strIngredient${i}`] == null) {
      break;
    }
    ingredient.textContent =
      cocktail.drinks[0][`strMeasure${i}`] +
      ": " +
      cocktail.drinks[0][`strIngredient${i}`];
    drinkIngrEl.append(ingredient);
  }

  cocktailEl.append(containerEl);
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

cocktailBtn.addEventListener("click", cocktail);