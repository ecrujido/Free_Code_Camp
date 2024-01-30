const pokemonName = document.getElementById('pokemon-name');
const pokemonImageContainer = document.getElementById('image-container');
const pokemonId = document.getElementById('pokemon-id');
const pokemonTypes = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


const searchPokemon = async () => {
    try { 

        const pokemonNameOrId = searchInput.value.toLowerCase();
        const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`;

       if (pokemonNameOrId === '') {
            alert('Pokemon not found.');
            return;
        }

    await fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayPokemonData(data);
        });
    }
    catch(error) {
        clearStats();
        alert('Pokemon not found.');
            
    }
}


function displayPokemonData(pokemonData) {

    pokemonName.textContent = pokemonData.name;
    // pokemonImage.src = pokemonData.sprites.front_default;
    pokemonImageContainer.innerHTML = `
    <img id="sprite" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name} front default sprite">`;
    pokemonId.textContent = pokemonData.id;

    // pokemonTypes.textContent = pokemonData.types.map(obj => `${obj.type.name}`).join(' ').toUpperCase();
  
    pokemonTypes.innerHTML = pokemonData.types
    .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
    .join(' ')


    height.textContent = pokemonData.height;
    weight.textContent = pokemonData.weight;
    hp.textContent = pokemonData.stats[0].base_stat;
    attack.textContent = pokemonData.stats[1].base_stat;
    defense.textContent = pokemonData.stats[2].base_stat;
    specialAttack.textContent = pokemonData.stats[3].base_stat;
    specialDefense.textContent = pokemonData.stats[4].base_stat;
    speed.textContent = pokemonData.stats[5].base_stat;

    const pokemonDataElement = document.getElementById('pokemonData');
    pokemonDataElement.classList.remove('hidden');
}


const clearStats = () => {
    
    const sprite = document.getElementById('sprite');
    if (sprite) sprite.remove();

  // reset stats
  pokemonName.textContent = '';
  pokemonId.textContent = '';
  types.innerHTML = '';
  height.textContent = '';
  weight.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
}


searchButton.addEventListener('click', e => {
    e.preventDefault();
    searchPokemon();
});