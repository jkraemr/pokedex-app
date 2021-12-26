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
    button.setAttribute('type', 'button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modalContainer');
    button.classList.add('btn');
    button.classList.add('btn-primary');

    // listItem.classList.add('flex-fill');
    listItem.classList.add('p-2');
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
      item.height = details.height;
      item.types = details.types;

    }).catch(function(e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  // Add modal content
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = (pokemon.name);
    let imageElement = document.createElement('img');
    imageElement.src = (pokemon.imageUrl);
    let weightElement = document.createElement('p');
    let heightElement = document.createElement('p');
    let typesElement = $(`<p> Type/s : ${pokemon.types.map(p => p.type.name).join(', ')}</p>`);

    if (pokemon.weight > 500) {
      weightElement.innerHTML = ('OMG – That\'s a massive one. BEWARE: The mighty ' + '<span style="text-transform:capitalize">' + pokemon.name + '</span> ' + ' weights ' + pokemon.weight + ' hectograms!');
    } else if ((pokemon.weight <= 500) && (pokemon.weight >= 30)) {
      weightElement.innerHTML = ('WOW! The ' + '<span style="text-transform:capitalize">' + pokemon.name + '</span> ' + 'has a considerable weight of ' + pokemon.weight + ' hectograms!');
    } else {
      weightElement.innerHTML = ('HOW CUTE! The ' + '<span style="text-transform:capitalize">' + pokemon.name + '</span> ' + ' has a rather light weight of ' + pokemon.weight + ' hectograms!');
    }

    heightElement.innerText = ('Height: ' + pokemon.height + ' decimetres');


    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(weightElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);

  }


  // Show loading message in document / console
  function showLoadingMessage() {
    document.getElementById('loader').style.visibility = 'visible';
    console.clear();
    console.log('LOADING data from PokeAPI ...');
  }

  // Hide loading message in document / console
  function hideLoadingMessage() {
    setTimeout(() => {
      document.getElementById('loader').style.visibility = 'hidden'
    }, 500);
    setTimeout(() => {
      console.log('DONE: Loading data successful.')
    }, 1000);
  }

  //  Return pokemonList objects for public functions outside of IIFE (getAll, add, addListItem)
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
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
