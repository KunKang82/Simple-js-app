let pokemonRepository = (function () {
    //pokemon array
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let loadBar = document.querySelector('.lds-dual-ring');

    //function to add new pokemons to the pokemonList array
    function add(pokemon) {
        "name" in pokemon &&
            "detailsUrl" in pokemon &&
            "imageURL" in pokemon
        pokemonList.push(pokemon);
    }

    // This function returns a pokemon array with all pokemons
    // that include the "search" term in their Name
    function getByName(search) {
        return pokemonList.filter(function (pokemon) {
            return pokemon.name.toLowerCase().includes(search.toLowerCase());
        });
    }

    // This function adds a button to the website with the pokemon name
    // and an event listener that calls the showDetails function on click
    function addListItem(pokemon) {
        let uPokemonList = $(".pokemon-list");
        let listItem = $('<li class="group-list-item"></li>');
        let button = $(`<button type="button" class="pokemon-button btn btn-primary" 
            data-toggle="modal" data-target="#pokeModal">${pokemon.name}</button>`);

        listItem.append(button);
        uPokemonList.append(listItem);

        button.on("click", function () {
            showDetails(pokemon);
        });
    }

    function getAll() {
        return pokemonList;
    }

    //gets the pokemon list from the API
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            console.error(e);
        }).finally(function() {
            hideLoadingMessage();
        });
    }

    //loads the details of the pokemon from detailsUrl call
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            item.weight = details.weight;
            item.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // This function shows a loading animation
    function showLoadingMessage() {
        loadBar.classList.remove("lds-dual-ring-hidden");
        loadBar.classList.add("lds-dual-ring-visible");
    }

    // This function hides the loading animation
    function hideLoadingMessage() {
        loadBar.classList.remove("lds-dual-ring-visible");
        loadBar.classList.add("lds-dual-ring-hidden");
    }

    // This function logs the given pokemon details on the console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    // This function shows a modal with the pokemon details
    function showModal(pokemon) {
        let types = "";
        pokemon.types.forEach(function (type) {
            types += type.type.name + " ";
        });

        let abilities = "";
        pokemon.abilities.forEach(function (ability) {
            abilities += ability.ability.name + " ";
        });

        let modalTitile = $(".modal-title");
        let modalBody = $(".modal-body");

        modalTitile.empty();
        modalBody.empty();

        modalTitile.append(pokemon.name);
        modalBody.append(`<img class="modal-img" src="${pokemon.imageUrl}">`);
        modalBody.append(`<p>Height: ${pokemon.height}</p>`);
        modalBody.append(`<p>Types: ${types}</p>`);
        modalBody.append(`<p>Weight: ${pokemon.weight}</p>`);
        modalBody.append(`<p>Abilities: ${abilities}</p>`);
    }

    //Load Pokemons from the API and print each pokemon on the website
    function loadAll() {
        loadList().then(function () {
            getAll().forEach(function (pokemon) {
                addListItem(pokemon);
            });
        });
    }

    //return data from defined functions
    return {
        //calling functions
        add: add,
        getByName: getByName,
        addListItem: addListItem,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        loadAll: loadAll,
    };
})();

pokemonRepository.loadAll();