

/* link ingreidents to past search results */ 
function updateFave() {
    var values = [], keys = Object.keys(localstorage), i = keys.length;
    while (i--) { values.push( localStorage.getItem(keys[i]) ); }
    document.getElementById("personal-fave").textContent = values;
}

