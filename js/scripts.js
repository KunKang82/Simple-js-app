let pokemonList = [
    {name: 'Bulbasur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Ivysaur', height: 1.0, types: ['grass', 'poison']},
    {name: 'Pikachu', height: 0.4, types: ['electric']},
    {name: 'Raichu', height: 0.8, types: ['electric']},
    {name: 'Golem', height: 1.4, types: ['rock', 'ground']},
    {name: 'Rhydon', height: 1.9, types: ['rock', 'ground']}
];

for (let i=0; i<pokemonList.length; i++){
    document.write(pokemonList[i].name +" (height: " + pokemonList[i].height +")")    
    if(pokemonList[i].height>=0.0 && pokemonList[i].height<0.8){
        document.write(" is a small size.")
        }
    else if(pokemonList[i].height>=0.8 && pokemonList[i].height<1.4){
        document.write(" is a medium size.")    
    }
    else{
        document.write(" is a large size.")
    }
}

