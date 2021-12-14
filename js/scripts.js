// Create IIFE to wrap pokemonList array with name, height, weight, and type properties
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';

  // Return pokemonList array
  function getAll() {
    return pokemonList;
  }

  // // Add new validated Pokemon object to end of pokemonList array
  // function add(pokemon) {
  //   if ((typeof pokemon === 'object') && ('name' in pokemon) && ('height' in pokemon) && ('weight' in pokemon)) {
  //     pokemonList.push(pokemon);
  //   } else {
  //     console.log('incomplete data set')
  //   }
  // }

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

  // Log details of clicked pokemonList item to console
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  //  Return pokemonList objects for public functions outside of IIFE (getAll, add, addListItem)
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  }

  // End of IIFE
})();

// Public functions

// // Add new object to pokemonList array within IIFE
// pokemonRepository.add({
//   name: 'Pidgeotto',
//   height: 1.1,
//   weight: 30,
//   types: ['flying', 'normal']
// });

// Call addListItem function to render pokemonList items in document
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
