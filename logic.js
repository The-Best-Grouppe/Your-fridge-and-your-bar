var searchBtn = document.getElementById("search-btn");
var userInput = document.getElementById("user-input");
var searchForm = document.getElementById("search-form");
var checkBoxes = [];

function getRecipe(inputObject) {
  if (inputObject.parameters.includes("keto")) {
    var ketoParam = "&health=keto-friendly";
    console.log("keto");
  } else {
    ketoParam = "";
  }

  if (inputObject.parameters.includes("vegan")) {
    var veganParam = "&health=vegan";
    console.log("vegan");
  } else {
    veganParam = "";
  }

  if (inputObject.parameters.includes("vegetarian")) {
    var vegetarianParam = "&health=vegetarian";
    console.log("veg");
  } else {
    vegetarianParam = "";
  }
  if (inputObject.parameters.includes("gluten")) {
    var glutenParam = "&health=gluten-free";
    console.log("gluten");
  } else {
    glutenParam = "";
  }
  var apiUrl =
    `https://api.edamam.com/api/recipes/v2?type=public&q=${inputObject.ingredient}&app_id=b3ff8b0d&app_key=3d88760733ac9419c88e6d50ef3d399a` +
    ketoParam +
    veganParam +
    vegetarianParam +
    glutenParam;
  console.log(apiUrl);
  fetch(apiUrl)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      response.json().then(function (data) {
        console.log(data);
        console.log(data.hits[0].recipe.label);
        console.log(data.hits[0].recipe.calories);
        console.log(data.hits[0].recipe.healthLabels);
        console.log(data.hits[0].recipe.url);
        console.log(data.hits[0]);
        console.log(data.hits[0].recipe.ingredientLines);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function submitForm(event) {
  if (!userInput.value) {
    return;
  }
  event.preventDefault();
  var healthRestrictions = [];
  var checkBoxes = document.getElementsByName("health[]");
  var searchIngredient = userInput.value.trim();
  for (var i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      healthRestrictions.push(checkBoxes[i].value);
    }

    var inputObject = {
      ingredient: searchIngredient,
      parameters: healthRestrictions,
    };
  }
  console.log(inputObject);
  getRecipe(inputObject);
}

// searchForm.addEventListener("submit", submitForm);
// var buttonContainer = document.getElementById("button-container");
// var cocktailEl = document.getElementById("cocktail");
// var cocktailBtn = document.getElementById("cocktail-btn");

// function renderDrink(cocktail) {
//   var imgUrl = cocktail.drinks[0].strDrinkThumb;
//   var containerEl = document.createElement("div");
//   var drinkCardEl = document.createElement("div");
//   var drinkNameEl = document.createElement("h2");
//   var drinkImgEl = document.createElement("img");
//   var drinkDirEl = document.createElement("p");
//   var drinkIngrEl = document.createElement("uo");

//   cocktailEl.innerHTML = "";
//   containerEl.append(drinkCardEl);
//   drinkNameEl.textContent = cocktail.drinks[0].strDrink;
//   drinkImgEl.setAttribute("src", imgUrl);
//   drinkDirEl.textContent = cocktail.drinks[0].strInstructions;
//   drinkCardEl.append(drinkNameEl, drinkImgEl, drinkIngrEl, drinkDirEl);

//   for (var i = 1; i < 16; i++) {
//     var ingredient = document.createElement("li");
//     if (cocktail.drinks[0][`strIngredient${i}`] == null) {
//       break;
//     }
//     ingredient.textContent =
//       cocktail.drinks[0][`strMeasure${i}`] +
//       ": " +
//       cocktail.drinks[0][`strIngredient${i}`];
//     drinkIngrEl.append(ingredient);
//   }

//   cocktailEl.append(containerEl);
// }

// function cocktail(event) {
//   fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
//     .then(function (response) {
//       if (response.status !== 200) {
//         console.log(
//           "Looks like there was a problem. Status Code: " + response.status
//         );
//         return;
//       }

//       response.json().then(function (data) {
//         console.log(data);
//         console.log(data.drinks[0].strDrink);
//         console.log(data.drinks[0].strDrinkThumb);
//         console.log(data.drinks[0].strInstructions);
//         renderDrink(data);
//       });
//     })
//     .catch(function (err) {
//       console.log("Fetch Error :-S", err);
//     });
// }

// cocktailBtn.addEventListener("click", cocktail);
searchForm.addEventListener("submit", submitForm);
