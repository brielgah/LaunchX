const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            alert("El nombre del pokemon ingreso es incorrecto");
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if(data)
        {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            updateImage(pokeImg);
            updateName(data.id,data.name);
            updateDescription(data.id);
            updateStats(data.stats);
            for(let x=0;x<data.types.length;x++)
            {
                let typeId = "type"+(x+1);
                updateType(data.types[x].type.name,typeId);
                if(data.types.length == 1)
                {
                    updateType("","type2");
                }
            }
        }
    });
}

const updateImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const updateName = (id,name) =>{
    const pokeNameTag = document.getElementById("pokeId");
    pokeNameTag.innerHTML = id + " - "+ name;
}

const updateDescription = (id) => {
    const urlDescription = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    console.log(urlDescription);
    fetch(urlDescription)
    .then((response) => response.json())
    .then((data) => {
        var description = data.flavor_text_entries.find((text_entry) => text_entry.language.name === 'en').flavor_text;
        description = description.replace(/\n/g, ' ').replace(/\f/g, ' ');
        document.getElementById("desc").textContent = description;
    });
}

const updateStats = (stats) =>{
    const hp = document.getElementById("hp");
    const attack = document.getElementById("attack");
    const defense = document.getElementById("defense");
    const sa = document.getElementById("sa");
    const sd = document.getElementById("sd");
    const speed = document.getElementById("speed");
    hp.value = stats[0].base_stat;
    attack.value = stats[1].base_stat;
    defense.value = stats[2].base_stat;
    sa.value = stats[3].base_stat;
    sd.value = stats[4].base_stat;
    speed.value = stats[5].base_stat;
}

const updateType = (type,typeId) =>{
    console.log(typeId);
    const typeTag = document.getElementById(typeId);
    typeTag.src = getType(type);
}

const getType = (type) =>
{
    switch(type){
        case 'normal':
            return 'https://cdn2.bulbagarden.net/upload/3/39/NormalIC_Big.png';
        case 'fighting':
            return 'https://cdn2.bulbagarden.net/upload/6/67/FightingIC_Big.png';
        case 'flying':
            return 'https://cdn2.bulbagarden.net/upload/c/cb/FlyingIC_Big.png';
        case 'poison':
            return 'https://cdn2.bulbagarden.net/upload/3/3d/PoisonIC_Big.png';
        case 'ground':
            return 'https://cdn2.bulbagarden.net/upload/8/8f/GroundIC_Big.png';
        case 'rock':
            return 'https://cdn2.bulbagarden.net/upload/c/ce/RockIC_Big.png';
        case 'bug':
            return 'https://cdn2.bulbagarden.net/upload/c/c8/BugIC_Big.png';
        case 'ghost':
            return 'https://cdn2.bulbagarden.net/upload/7/73/GhostIC_Big.png';
        case 'steel':
            return 'https://cdn2.bulbagarden.net/upload/d/d4/SteelIC_Big.png';
        case 'fire':
            return 'https://cdn2.bulbagarden.net/upload/2/26/FireIC_Big.png';
        case 'water':
            return 'https://cdn2.bulbagarden.net/upload/5/56/WaterIC_Big.png';
        case 'grass':
            return 'https://cdn2.bulbagarden.net/upload/7/74/GrassIC_Big.png';
        case 'electric':
            return 'https://cdn2.bulbagarden.net/upload/4/4a/ElectricIC_Big.png';
        case 'psychic':
            return 'https://cdn2.bulbagarden.net/upload/6/60/PsychicIC_Big.png';
        case 'ice':
            return 'https://cdn2.bulbagarden.net/upload/6/6f/IceIC_Big.png';
        case 'dragon':
            return 'https://cdn2.bulbagarden.net/upload/4/48/DragonIC_Big.png';
        case 'dark':
            return 'https://cdn2.bulbagarden.net/upload/5/56/DarkIC_Big.png';
        case 'fairy':
            return 'https://cdn2.bulbagarden.net/upload/d/df/Picross_FairyIC.png';
        default:
            return 'https://cdn2.bulbagarden.net/upload/3/3c/UnknownIC_Big.png';
    }
}