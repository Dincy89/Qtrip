
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const a = new URLSearchParams(search);
  return a.get('city');

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let b=await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
  let d=await b.json();
  return d;
  }catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    let c=document.createElement("div");
    c.className="col-sm-6 col-lg-3 mb-4 position-relative";
    let p=document.getElementById("data");
    var h= `
    <a href="detail/?adventure=${key.id}" id="${key.id}">
      <div class="activity-card">
        <img src=${key.image}  alt="${key.name}" class="card-img-top"/>
        <div class="card-body d-flex flex-lg-row flex-column align-items-center  justify-content-lg-between w-100 p-3">
          <h5 class="mb-0">${key.name}</h5>
          <p class="mb-0">₹${key.costPerHead}</p>
        </div>
        <div class="card-body d-flex flex-lg-row flex-column align-items-center  justify-content-lg-between w-100 p-3">
          <h5 class="mb-0">Duration</h5>
          <p class="mb-0">${key.duration} hours</p>
        </div>
      </div>
    </a>
  `;
  c.innerHTML = h;
  c.innerHTML += `<div class="category-banner">${key.category}</div>`;
  p.appendChild(c);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
    var a=list.filter(e=>e.duration>=low&&e.duration<=high);
    return a;
   
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let fl=[];
  list.filter(function(e){
    if(categoryList.includes(e.category))
    fl.push(e);
  });
  return fl;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  let fl=[];
  let d=filters["duration"].split("-");
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
 
 if(filters["category"].length>0&&filters["duration"].length>0){
    fl=filterByCategory(list,filters.category);
    fl=filterByDuration(fl,parseInt(d[0]),parseInt(d[1]));
  }
  else if(filters["category"].length>0)
  fl=filterByCategory(list,filters.category);
  else if(filters["duration"].length>0)
  fl=filterByDuration(list,parseInt(d[0]),parseInt(d[1]));
  else
  return list;
  return fl;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
   window.localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

return JSON.parse(window.localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList=filters["category"];
  let l=[];
  for(let i=0;i<categoryList.length;i++){
    l.push(categoryList[i]);
  }
  for(let i=0;i<l.length;i++){
    var d=document.createElement("div");
    d.setAttribute("class","category-filter");
    d.innerText=l[i];
    document.getElementById("category-list").append(d);
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
