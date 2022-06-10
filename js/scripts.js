// let pokemonList = [
//     {name: 'Bulbasur', height: 0.7, types: ['grass', 'poison']},
//     {name: 'Ivysaur', height: 1.0, types: ['grass', 'poison']},
//     {name: 'Pikachu', height: 0.4, types: ['electric']},
//     {name: 'Raichu', height: 0.8, types: ['electric']},
//     {name: 'Golem', height: 1.4, types: ['rock', 'ground']},
//     // {name: 'Rhydon', height: 1.9, types: ['rock', 'ground']}
// ];
let pokeBulbasur = {
    name: 'Bulbasur',
    height: 0.7,
    types: ['grass', 'poison']
};

let pokeIvysaur = {
    name: 'Ivysaur',
    height: 1.0,
    types: ['grass', 'poison']
};

let pokePikachu = {
    name: 'Picachu',
    height: 0.4,
    types: ['electric']
};

let pokeRaichu = {
    name: 'Raichu',
    height: 0.8,
    types: ['electric']
};

let pokeGolem = {
    name: 'Golem',
    height: 1.4,
    types: ['rock', 'ground']
};

let pokeRhydon = {
    name: 'Rhydon',
    height: 1.9,
    types: ['rock', 'ground']
};

let pokemonRepository = (function () {
    let pokemonList = [
        pokeBulbasur,
        pokeIvysaur,
        pokePikachu,
        pokeRaichu,
        pokeGolem,
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

// for (let i=0; i<pokemonList.length; i++){
//     document.write(pokemonList[i].name +" (height: " + pokemonList[i].height +")")    
//     if(pokemonList[i].height>=0.0 && pokemonList[i].height<0.8){
//         document.write(" is a small size.")
//         }
//     else if(pokemonList[i].height>=0.8 && pokemonList[i].height<1.4){
//         document.write(" is a medium size.")    
//     }
//     else{
//         document.write(" is a large size.")
//     }
// }

function myPokemonLoopFunction(pokemon){
    document.write(pokemon.name + " (height: " + pokemon.height + ")");
    if(pokemon.height>=0.0 && pokemon.height<0.8){
        document.write(" is a small size." + "<br>")
    }
    else if(pokemon.height>=0.8 && pokemon.height<1.4){
        document.write(" is a medium size." + "<br>")    
    }
    else{
        document.write(" is a large size." + "<br>")
    }
}
pokemonRepository.add(pokeRhydon);
pokemonRepository.forEach(myPokemonLoopFunction);