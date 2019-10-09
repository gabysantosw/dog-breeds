// === SETUP
const display = document.querySelector("#js-image");
const spinner = document.querySelector("#js-spinner");
const select = document.querySelector("#js-select");

// api urls
const RANDOM_GOLDEN_URL = "https://dog.ceo/api/breed/retriever/golden/images/random";
const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";

function init() {
  // display random golden image for the home

  fetch(RANDOM_GOLDEN_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      display.src = data.message;
    });
  
  display.addEventListener('load', function() {
    // hide spinner when image loads
    spinner.classList.add('hide');
    // show image (in case its hidden)
    display.classList.remove('hide');
  });
  
  // populate dropdown
  fetch(BREEDS_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // breeds object
      const breeds = data.message;
      // breeds array
      const breedsList = Object.keys(breeds);

      for(let i = 0; i < breedsList.length; i++) {
        // append option tag for each breed
        const option = document.createElement('option');
        option.classList.add('select__option');
        option.value = breedsList[i];
        option.innerText = breedsList[i];

        select.appendChild(option);
      }
    });

  // listen for selection changes
  select.addEventListener('change', function(event) {
    // selected breed
    const selected = event.target.value;

    getBreed(selected);
  });
}

// === FUNTIONALITY
function getBreed(name) {
  const SELECTED_BREED_URL = `https://dog.ceo/api/breed/${event.target.value}/images/random`;

  // show spinner
  spinner.classList.remove('hide');
  // hide current image
  display.classList.add('hide');

  fetch(SELECTED_BREED_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      display.src = data.message;
    })
}

// === INITIALIZE 
init();