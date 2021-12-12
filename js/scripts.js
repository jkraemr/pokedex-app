// Create IIFE to wrap pokemonList array with name, height, weight, and type properties
let pokemonRepository = (function() {
  let pokemonList = [{
    name: 'Bulbasaur',
    height: 0.7,
    weight: 6.9,
    types: ['grass', 'poison']
  }, {
    name: 'Ivysaur',
    height: 1,
    weight: 13,
    types: ['grass', 'poison']
  }, {
    name: 'Venusaur',
    height: 2,
    weight: 100,
    types: ['grass', 'poison']
  }, {
    name: 'Charmander',
    height: 0.6,
    weight: 8.5,
    types: ['fire']
  }, {
    name: 'Charmeleon',
    height: 1.1,
    weight: 19,
    types: ['fire']
  }, {
    name: 'Charizard',
    height: 1.7,
    weight: 90.5,
    types: ['fire', 'flying']
  }, {
    name: 'Squirtle',
    height: 0.5,
    weight: 9,
    types: ['water']
  }, {
    name: 'Wartortle',
    height: 1,
    weight: 22.5,
    types: ['water']
  }, {
    name: 'Blastoise',
    height: 1.6,
    weight: 85.5,
    types: ['water']
  }, {
    name: 'Caterpie',
    height: 0.3,
    weight: 2.9,
    types: ['bug']
  }, {
    name: 'Metapod',
    height: 0.7,
    weight: 9.9,
    types: ['bug']
  }, {
    name: 'Butterfree',
    height: 1.1,
    weight: 32,
    types: ['bug', 'flying']
  }, {
    name: 'Weedle',
    height: 0.3,
    weight: 3.2,
    types: ['bug', 'poison']
  }, {
    name: 'Kakuna',
    height: 0.6,
    weight: 10,
    types: ['bug', 'poison']
  }, {
    name: 'Beedrill',
    height: 1,
    weight: 29.5,
    types: ['bug', 'poison']
  }, {
    name: 'Pidgey',
    height: 0.3,
    weight: 1.8,
    types: ['flying', 'normal']
  }];

  // Return pokemonList array
  function getAll() {
    return pokemonList;
  }

  // Add new validated Pokemon object to end of pokemonList array
  function add(pokemon) {
    if ((typeof pokemon === 'object') && ('name' in pokemon) && ('height' in pokemon) && ('weight' in pokemon)) {
      pokemonList.push(pokemon);
    } else {
      console.log('incomplete data set')
    }
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

  //  Return pokemonList objects for public functions outside of IIFE (getAll, add, addListItem)
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }

  // End of IIFE
})();

// Public functions

// Add new object to pokemonList array within IIFE
pokemonRepository.add({
  name: 'Pidgeotto',
  height: 1.1,
  weight: 30,
  types: ['flying', 'normal']
});

// Call addListItem function to render pokemonList items in document
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
