import config from "../conf/index.js";
async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{ 
    let a=await fetch(`${config.backendEndpoint}/cities`);
  let d=await a.json();
  return d;
}
catch(err){
  return null;
}
 
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let c=document.createElement("div");
  c.className="col-sm-6 col-lg-3 mb-4";
  let p=document.getElementById("data");
  var h= `
  <a href="pages/adventures/?city=${id}" id="${id}">
    <div class="tile">
    <img src=${image} alt="${city}"/>
       <div class="tile-text">
        <h4 class="tile-heading">${city}</h4>
         <h6 class="tile-subheading">${description}</h6>
       </div>
    </div>
  </a>`;
  c.innerHTML = h;
  p.appendChild(c);
}

export { init, fetchCities, addCityToDOM };
