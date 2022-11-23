const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a512b4570dmsh74138a353b52985p1f0cf9jsnb0ab3f624da4",
      "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
    },
  };
  
  var userInput = "chicken";
  fetch("https://edamam-recipe-search.p.rapidapi.com/search?q=" + userInput, options)
      .then(function (response) {
          if (response.status !== 200) {
          console.log(
              "Looks like there was a problem. Status Code: " + response.status
          );
          return;
          }
  
          // Examine the text in the response
          response.json().then(function (data) {
          console.log(data);
          console.log(data.hits[0].recipe.label);
          console.log(data.hits[0].recipe.calories);
          console.log(data.hits[0].recipe.healthLabels);
          console.log(data.hits[0].recipe.url);
          console.log(data.hits[0].recipe.ingredientLines);
          });
      })
      .catch(function (err) {
          console.log("Fetch Error :-S", err);
      });
  
  function cocktail() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
  
        // Examine the text in the response
        response.json().then(function (data) {
          console.log(data);
          console.log(data.drinks[0].strDrink);
          console.log(data.drinks[0].strDrinkThumb);
          console.log(data.drinks[0].strInstructions);
  
  
  
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }
  
  cocktail();