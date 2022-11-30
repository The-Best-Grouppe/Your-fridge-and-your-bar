var searchBtn = document.getElementById("search-btn");
var userInput = document.getElementById("user-input");
var searchForm = document.getElementById("search-form");
var checkBoxes = [];
var recipeSection = document.getElementById("recipe-card");
var favoriteRecipe = [];
var saveButtons = document.querySelectorAll(".save-button")





function renderRecipe(hit) {
  // for (var i=0; i < 5; i ++)
    var title = hit.recipe.label;
    var calories = Math.floor(hit.recipe.calories);
    var recipeUrl = hit.recipe.url;
    var recipeIngredients = hit.recipe.ingredientLines;
    var recipeImgUrl = hit.recipe.image;


    // var recipeContainer = document.createElement("div")
    var recipeCard = document.createElement("div");
    var titleEl = document.createElement("h2");
    var calorieEl = document.createElement("p");
    var urlEl = document.createElement("a");
    var ingredientEl = document.createElement("uo");
    var imgEl = document.createElement("img");
    var saveBtnEl = document.createElement("span");

    recipeSection.append(recipeCard);
    titleEl.textContent = title;
    calorieEl.textContent = calories;
    imgEl.setAttribute("src", recipeImgUrl);
    urlEl.textContent = recipeUrl;
    // saveBtn.innerHTML = "Save";
    // // saveBtn.setAttribute("type", "submit");
    // saveBtn.setAttribute("name", "save-button");
    // saveBtn.setAttribute("class", "save-button");
    recipeCard.append(titleEl, imgEl, calorieEl, ingredientEl, urlEl, saveBtnEl);

    for (var i=0; i < recipeIngredients.length; i++){
      var ingredientItem = document.createElement("li");
      ingredientItem.textContent = hit.recipe.ingredientLines[i];
      console.log(ingredientItem);
      ingredientEl.append(ingredientItem);
    }
    // for (var i=0; i < 5; i++) {
    //   var saveBtn = document.createElement("button");
    //   saveBtn.innerText = "Save";
    //   function(index){
    //     button.addEventListener("click", function() {
    //       console.log(index)
    //     })
    //   }(i)
    //   saveBtnEl.appendChild(saveBtn);
    
    // })

      

    //   })(i)
    // }



    console.log(recipeCard);
    recipeSection.append(recipeCard);
    


}





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
        for (var i=0; i < 5; i++){
          console.log(data.hits[i]);
          renderRecipe(data.hits[i]);
        }
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


searchForm.addEventListener("submit", submitForm);

