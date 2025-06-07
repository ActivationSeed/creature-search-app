const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const cWeight = document.getElementById("weight");
const cHeight = document.getElementById("height");
const cTypes = document.getElementById("types");
const cHP = document.getElementById("hp");
const cAttack = document.getElementById("attack");
const cDefense = document.getElementById("defense");
const cSpecAttack = document.getElementById("special-attack");
const cSpecDefense = document.getElementById("special-defense");
const cSpeed = document.getElementById("speed");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


/*
List of 20 creature IDs and names,
as objects in array:

https://rpg-creature-api.freecodecamp.rocks/api/creatures
*/

searchButton.addEventListener("click", () => {
  const searchValue = searchInput.value.toLowerCase();
  cTypes.textContent = "";
  fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${searchValue}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const {id, name, weight, height, stats, types} = data;
    const hp = stats.find(stat => stat.name === "hp")?.base_stat;
    const attack = stats.find(stat => stat.name === "attack")?.base_stat;
    const defense = stats.find(stat => stat.name === "defense")?.base_stat;
    const specialAttack = stats.find(stat => stat.name === "special-attack")?.base_stat;
    const specialDefense = stats.find(stat => stat.name === "special-defense")?.base_stat;
    const speed = stats.find(stat => stat.name === "speed")?.base_stat;
    populateFields({ id, name, weight, height, hp, attack, defense, specialAttack, specialDefense, speed, types });
  })
  .catch((error) => {
    alert("Creature not found");
    console.error("Creature not found or error fetching:", error);
  });
});

const populateFields = ({ id, name, weight, height, hp, attack, defense, specialAttack, specialDefense, speed, types }) => {
  creatureName.innerText = name;
  creatureId.innerText = `#${id}`;
  cWeight.innerText = `${weight}`;
  cHeight.innerText = `${height}`;
  cHP.innerText = hp;
  cAttack.innerText = attack;
  cDefense.innerText = defense;
  cSpecAttack.innerText = specialAttack;
  cSpecDefense.innerText = specialDefense;
  cSpeed.innerText = speed;

  cTypes.innerHTML = "";
  types.forEach((type, index) => {
    const span = document.createElement("span");
    span.textContent = type.name.toUpperCase();
    span.style.marginRight = "1rem";
    cTypes.appendChild(span);
  });
};

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});


/*
Access any specific creature by name or ID:

https://rpg-creature-api.freecodecamp.rocks/api/creature/{name-or-id}

Page is an object with key-value pairs.

The "stats" key has value of an array of objects with 2 key-value pairs.
*/