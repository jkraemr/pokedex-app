// Create IIFE to wrap pokemonList array with name, height, weight, and type properties
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';

  // Return pokemonList array
  function getAll() {
    return pokemonList;
  }

  // Add new Pokemon object to end of pokemonList array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // Generate pokemonList items for document with clickable buttons in unordered list
  function addListItem(pokemon) {
    let pokeList = document.querySelector('.poke-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = (pokemon.name);
    button.classList.add('button');
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    })
  }

  // Load Pokemon list from PokeAPI
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      hideLoadingMessage();
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  // Fetch Pokemon details from PokeAPI and assign details parameters to objects in pokemonList
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      hideLoadingMessage();
      item.imageUrl = details.sprites.front_default;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function(e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  // Define modal content
  function showDetails(pokemon) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');

    loadDetails(pokemon).then(function showModal() {
      // Clear all existing modal content
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Add new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      // Hide modal on Esc
      window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
      });

      // Hide modal on click outside of modal
      modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

      let titleElement = document.createElement('h1');
      titleElement.innerText = (pokemon.name);

      let imageElement = document.createElement('img');
      imageElement.src = (pokemon.imageUrl);

      let weightElement = document.createElement('p');
      weightElement.innerText = (`Beware! The mighty ${pokemon.name} weights ${pokemon.weight} kg!`);

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(imageElement);
      modal.appendChild(weightElement);
      modalContainer.appendChild(modal);
      modalContainer.classList.add('is-visible');
    });
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // Show loading message in document / console
  function showLoadingMessage() {
    document.getElementById("loader").style.visibility = "visible";
    console.clear();
    console.log('LOADING data from PokeAPI ...');
  }

  // Hide loading message in document / console
  function hideLoadingMessage() {
    setTimeout(() => {
      document.getElementById("loader").style.visibility = "hidden"
    }, 500);
    setTimeout(() => {
      console.log("DONE: Loading data successful.")
    }, 1000);
  }

  //  Return pokemonList objects for public functions outside of IIFE (getAll, add, addListItem)
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  }

  // End of IIFE
})();

// PUBLIC FUNCTIONS

// Call loadList function to load pokemon list via PokeAPI from IIFE
// Call addListItem function to render pokemonList items in DOM
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
