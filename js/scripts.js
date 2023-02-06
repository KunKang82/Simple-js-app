let pokemonRepository = (function () {
    //pokemon array
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    // let modalContainer = document.querySelector('#modal-container');
    let modalContainer = $('#modal-container');
    


    //function to add new pokemons to the pokemonList array
    function add(pokemon) {
        "name" in pokemon &&
            "detailsUrl" in pokemon &&
            "imageURL" in pokemon
        pokemonList.push(pokemon);
    }

    //add pokemon to the list
    // function addListItem(pokemon) {
    //     let pokemonList = document.querySelector('.pokemon-list');
    //     let listpokemon = document.createElement('li');//listItem
    //     let button = document.createElement('button');
    //     button.innerText = pokemon.name;
    //     button.classList.add('button-class');
    //     listpokemon.appendChild(button);
    //     pokemonList.appendChild(listpokemon);
    //     button.addEventListener('click', function (event) {
    //         showDetails(pokemon);
    //     });
    // }
    function addListItem(pokemon) {
        let pokemonList = $('.pokemon-list');
        let listpokemon = $('<li class="group-list-item"></li>');//listItem
        let button = $('<button type="button class="pokemon-button btn btn-primary" data-toggle="modal" data=target="#pokeModal">' + pokemon.name + '</button>');

        listpokemon.append(button);
        pokemonList.append(listpokemon);

        button.on("click", function(){
            showDetails(pokemon);
        })

        // button.addEventListener('click', function (event) {
        //     showDetails(pokemon);
        // });
    }

    function getAll() {
        return pokemonList;
    }

    //gets the pokemon list from the API
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
            item.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
        });
    }


    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        })
    }

    // function showModal(pokemon, text, img) {
    //     // Clear all existing modal content
    //     modalContainer.innerHTML = '';

    //     let modal = document.createElement('div');
    //     modal.classList.add('modal');

    //     // Add the new modal content
    //     let closeButtonElement = document.createElement('button');
    //     closeButtonElement.classList.add('modal-close');
    //     closeButtonElement.innerText = 'Close';
    //     closeButtonElement.addEventListener('click', hideModal);

    //     let titleElement = document.createElement('h1');
    //     titleElement.innerText = pokemon.name;

    //     let contentElement = document.createElement('p');
    //     contentElement.innerHTML = `Height: ${pokemon.height} <br> Type: ${pokemon.types.map(({ type }) => type.name)}`;

    //     let imageElement = document.createElement('img');
    //     imageElement.setAttribute('src', pokemon.imageUrl);
    //     imageElement.setAttribute('alt', "Pokemon image");

    //     modal.appendChild(closeButtonElement);
    //     modal.appendChild(titleElement);
    //     modal.appendChild(contentElement);
    //     modal.appendChild(imageElement);
    //     modalContainer.appendChild(modal);

    //     modalContainer.classList.add('is-visible');
    // }

    function showModal(pokemon) {
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');

        modalBody.empty();        
        modalTitle.text(pokemon.name);

        modalBody.append('<img class="modal-img" src="${pokemon.imageUrl}">');
        modalBody.append('<p>Height: ${pokemon.height}</p>');
        modalBody.append('<p>Types: ${pokemon.types}</p>');
        modalBody.append('<p>Abilities: ${pokemon.abilities</p>')
    }

    // document.querySelector('#show-modal').addEventListener('click', () => {
    //     showModal('Modal title', 'This is the modal content!');
    // });

    // function hideModal() {
    //     modalContainer.classList.remove('is-visible');
    // }

    // window.addEventListener('keydown', (e) => {
    //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //         hideModal();
    //     }
    // });

    // modalContainer.addEventListener('click', (e) => {
    //     let target = e.target;
    //     if (target === modalContainer) {
    //         hideModal();
    //     }
    // });

    //return data from defined functions
    return {
        //calling functions
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    }
})();

pokemonRepository.loadList().then(function () {
// forEach loop iterates over addListItem function
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});