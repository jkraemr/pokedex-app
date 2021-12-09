// Create pokemonRepository variable to wrap pokemonList array in IIFE with return object for public functions *getAll* and *add*.

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

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      (typeof pokemon === 'object') && ((Object.keys(pokemonList[0])) !== (Object.keys(pokemon)))) {
      console.log(Object.keys(pokemonList[0]));
      console.log(Object.keys(pokemon));
      pokemonList.push(pokemon);
    }
  }
  return {
    getAll: getAll,
    add: add
  }

})();

pokemonRepository.add({
  name: 'Pidgeotto',
  height: 1.1,
  weight: 30,
  types: ['flying', 'normal']
});

// Create ordered list of Pokemons with *forEach* loop function to iterate over each object within the pokemonList array. *myLoopFunction* expects the *item* parameter and writes its details via *if else* statements to indicate weight categories.

document.write('<div class="main-content"><ol>');

function myLoopFunction(item) {
  if (item.weight > 30) {
    document.write('<li>' + item.name + ' (' + 'weight: ' + item.weight + 'kg)' + ' – OMG! That\'s a massive one. Beware: The mighty ' + item.name + ' is heavier than 30kg!' + '</li>');
  } else if ((item.weight >= 10) && (item.weight <= 30)) {
    document.write(`<li>${item.name} (weight: ${item.weight} kg) – WOW! The ${item.name} has a medium weight of 10-30kg.</li>`);
  } else {
    document.write(`<li>${item.name} (weight: ${item.weight} kg)</li>`);
  }
}

pokemonRepository.getAll().forEach(myLoopFunction);

document.write('</ol></div>');
