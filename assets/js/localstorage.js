/* event listener to check for clicks */
document.getElementById("btnsave").addEventListener("click", function(){
window.localStorage.setItem("ingredients","");
updateFave();
});

/* grab user input for ingredients into search box */ 
window.localStorage.setItem("ingredients","potatos");
/* create a variable to hold user searches */
const user = {
    ingredients:"potatoes",
}

window.localStorage.setItem('potatoes', JSON.stringify(ingreidnets));
/* convert it to string and then add it to local storage */ 

/* print items from local storage to ingredient card*/

/* link ingreidents to past search results */ 
function updateFave() {
    var values = [], keys = Object.keys(localstorage), i = keys.length;
    while (i--) { values.push( localStorage.getItem(keys[i]) ); }
    document.getElementById("fave-currently").textContent = values;
}

