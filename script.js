"use strict";
//898 pokemon Total
//Get elements for two text box inputs
const inputPokeEl1 = document.getElementById("txtPokemonName1");
const inputPokeEl2 = document.getElementById("txtPokemonName2");
//Get Elements Global Scope
let elPokeImg1 = document.getElementById("pokeImg1");
let elPokeImg2 = document.getElementById("pokeImg2");
let elPokeName1 = document.getElementById("pokeName1");
let elPokeName2 = document.getElementById("pokeName2");
let elPokeCont1 = document.getElementById("pokeCont1");
let elPokeCont2 = document.getElementById("pokeCont2");

let poke1Img;
let poke2Img;

let poke1Art;
let poke2Art;

let poke1Home;
let poke2Home;

let hdrStat = `<h3>Statistics</h3>`;
let hdrAbilities = `<h3>Abilities</h3>`;
let hdrPokeMoves = `<h3>Moves</h3>`;

let movesScroll = `<div style='height:500px;width:450px;border:1px groove; overflow:auto;'>`;

//TOGGLE FOR IMAGES
let currentImg1 = 1;
let currentImg2 = 1;

document.addEventListener("DOMContentLoaded", () => {
	//Get random number one
	let randomPoke1 = getRandomIntInclusive(0, 898);
	//Get random number two
	let randomPoke2 = getRandomIntInclusive(0, 898);
	//Default Load of two pokemon
	let initialUrl1 = `https://pokeapi.co/api/v2/pokemon/${randomPoke1}`;
	let initialUrl2 = `https://pokeapi.co/api/v2/pokemon/${randomPoke2}`;
	//Get Pokemon 1 info
	fetch(initialUrl1)
		.then((response) => response.json())
		.then((pokemon) => {
			console.log(pokemon);
			//Set title
			elPokeName1.innerHTML = capitalizeFirstLetter(pokemon.name);
			//Now that we have pokemon info need to update the display
			console.log(pokemon.id);

			//set image
			poke1Img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
			poke1Art = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
			poke1Home = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

			elPokeImg1.srcset = poke1Img;

			//get stats map them to a p element and then join.
			let pokeStats = pokemon.stats
				.map((stat) => {
					return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
				})
				.join("");

			console.log(pokeStats);

			//Set stats for display
			elPokeCont1.innerHTML = pokeStats;

			//get abilities
			let pokeAbilities = pokemon.abilities
				.map((ability) => {
					return `<p>${ability.ability.name}</p>`;
				})
				.join("");

			//get moves
			let pokeMoves = pokemon.moves
				.map((move) => {
					return `<p>${move.move.name}</p>`;
				})
				.join("");

			elPokeCont1.innerHTML =
				hdrStat +
				pokeStats +
				hdrAbilities +
				pokeAbilities +
				hdrPokeMoves +
				movesScroll +
				pokeMoves +
				`</div>`;
		})
		.catch((e) => console.log(e.message));

	//Get Pokemon 1 info
	fetch(initialUrl2)
		.then((response) => response.json())
		.then((pokemon) => {
			console.log(pokemon);
			//Set title
			elPokeName2.innerHTML = capitalizeFirstLetter(pokemon.name);
			//Now that we have pokemon info need to update the display
			console.log(pokemon.id);
			//set image
			poke2Img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
			poke2Art = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
			poke2Home = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

			elPokeImg2.srcset = poke2Img;

			//get stats map them to a p element and then join.
			let pokeStats = pokemon.stats
				.map((stat) => {
					return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
				})
				.join("");

			console.log(pokeStats);

			//Set stats for display
			elPokeCont2.innerHTML = pokeStats;

			//get abilities
			let pokeAbilities = pokemon.abilities
				.map((ability) => {
					return `<p>${ability.ability.name}</p>`;
				})
				.join("");

			//get moves
			let pokeMoves = pokemon.moves
				.map((move) => {
					return `<p>${move.move.name}</p>`;
				})
				.join("");

			elPokeCont2.innerHTML =
				hdrStat +
				pokeStats +
				hdrAbilities +
				pokeAbilities +
				hdrPokeMoves +
				movesScroll +
				pokeMoves +
				`</div>`;
		})
		.catch((e) => console.log(e.message));

	//Add event handler to submit button
	btn1_get_data.addEventListener("click", handleSubmit1);
	btn1_get_random.addEventListener("click", handleRandom1);

	btn2_get_data.addEventListener("click", handleSubmit2);
	btn2_get_random.addEventListener("click", handleRandom2);

	elPokeImg1.addEventListener("click", handleImg1Click);
	elPokeImg2.addEventListener("click", handleImg2Click);
});
//*FUNCTIONS*//
/**
 * handleSubmit1
 */
function handleSubmit1() {
	let pokeName1 = inputPokeEl1.value.toLowerCase();
	console.log(pokeName1);
	let url1 = `https://pokeapi.co/api/v2/pokemon/${pokeName1}`;
	//Get Pokemon 1 info
	fetch(url1)
		.then((response) => response.json())
		.then((pokemon) => {
			console.log(pokemon);

			//Set title
			elPokeName1.innerHTML = capitalizeFirstLetter(pokemon.name);
			//Now that we have pokemon info need to update the display
			console.log(pokemon.id);

			//set image
			poke1Img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
			poke1Art = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
			poke1Home = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

			elPokeImg1.srcset = poke1Img;

			//get stats map them to a p element and then join.
			let pokeStats = pokemon.stats
				.map((stat) => {
					return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
				})
				.join("");

			console.log(pokeStats);

			//Set stats for display
			elPokeCont1.innerHTML = pokeStats;

			//get abilities
			let pokeAbilities = pokemon.abilities
				.map((ability) => {
					return `<p>${ability.ability.name}</p>`;
				})
				.join("");

			//get moves
			let pokeMoves = pokemon.moves
				.map((move) => {
					return `<p>${move.move.name}</p>`;
				})
				.join("");

			elPokeCont1.innerHTML =
				hdrStat +
				pokeStats +
				hdrAbilities +
				pokeAbilities +
				hdrPokeMoves +
				movesScroll +
				pokeMoves +
				`</div>`;
		})
		.catch((e) => console.log(e.message));
}
/**
 *
 */
function handleRandom1() {
	let randomPoke = getRandomIntInclusive(0, 898);

	let url1 = `https://pokeapi.co/api/v2/pokemon/${randomPoke}`;

	//Get Pokemon 1 info
	fetch(url1)
		.then((response) => response.json())
		.then((pokemon) => {
			console.log(pokemon);

			//Set title
			elPokeName1.innerHTML = capitalizeFirstLetter(pokemon.name);
			//Now that we have pokemon info need to update the display
			console.log(pokemon.id);

			//set image
			poke1Img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
			poke1Art = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
			poke1Home = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

			elPokeImg1.srcset = poke1Img;

			//get stats map them to a p element and then join.
			let pokeStats = pokemon.stats
				.map((stat) => {
					return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
				})
				.join("");

			console.log(pokeStats);

			//Set stats for display
			elPokeCont1.innerHTML = pokeStats;

			//get abilities
			let pokeAbilities = pokemon.abilities
				.map((ability) => {
					return `<p>${ability.ability.name}</p>`;
				})
				.join("");

			//get moves
			let pokeMoves = pokemon.moves
				.map((move) => {
					return `<p>${move.move.name}</p>`;
				})
				.join("");

			elPokeCont1.innerHTML =
				hdrStat +
				pokeStats +
				hdrAbilities +
				pokeAbilities +
				hdrPokeMoves +
				movesScroll +
				pokeMoves +
				`</div>`;
		})
		.catch((e) => console.log(e.message));
}
/**
 *
 */
function handleSubmit2() {
	let pokeName2 = inputPokeEl2.value.toLowerCase();
	console.log(pokeName2);
	let url2 = `https://pokeapi.co/api/v2/pokemon/${pokeName2}`;

	//Get Pokemon 1 info
	fetch(url2)
		.then((response) => response.json())
		.then((pokemon) => {
			console.log(pokemon);
			//Set title
			elPokeName2.innerHTML = capitalizeFirstLetter(pokemon.name);
			//Now that we have pokemon info need to update the display
			console.log(pokemon.id);
			//set image
			poke2Img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
			poke2Art = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
			poke2Home = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

			elPokeImg2.srcset = poke2Img;

			//get stats map them to a p element and then join.
			let pokeStats = pokemon.stats
				.map((stat) => {
					return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
				})
				.join("");

			console.log(pokeStats);

			//Set stats for display
			elPokeCont2.innerHTML = pokeStats;

			//get abilities
			let pokeAbilities = pokemon.abilities
				.map((ability) => {
					return `<p>${ability.ability.name}</p>`;
				})
				.join("");

			//get moves
			let pokeMoves = pokemon.moves
				.map((move) => {
					return `<p>${move.move.name}</p>`;
				})
				.join("");

			elPokeCont2.innerHTML =
				hdrStat +
				pokeStats +
				hdrAbilities +
				pokeAbilities +
				hdrPokeMoves +
				movesScroll +
				pokeMoves +
				`</div>`;
		})
		.catch((e) => console.log(e.message));
}
/** */
function handleRandom2() {
	let randomPoke = getRandomIntInclusive(0, 898);

	let url2 = `https://pokeapi.co/api/v2/pokemon/${randomPoke}`;

	//Get Pokemon 1 info
	fetch(url2)
		.then((response) => response.json())
		.then((pokemon) => {
			console.log(pokemon);
			//Set title
			elPokeName2.innerHTML = capitalizeFirstLetter(pokemon.name);
			//Now that we have pokemon info need to update the display
			console.log(pokemon.id);
			//set image
			poke2Img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
			poke2Art = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
			poke2Home = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

			//raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/859.png

			https: elPokeImg2.srcset = poke2Img;

			//get stats map them to a p element and then join.
			let pokeStats = pokemon.stats
				.map((stat) => {
					return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
				})
				.join("");

			console.log(pokeStats);

			//Set stats for display
			elPokeCont2.innerHTML = pokeStats;

			//get abilities
			let pokeAbilities = pokemon.abilities
				.map((ability) => {
					return `<p>${ability.ability.name}</p>`;
				})
				.join("");

			//get moves
			let pokeMoves = pokemon.moves
				.map((move) => {
					return `<p>${move.move.name}</p>`;
				})
				.join("");

			elPokeCont2.innerHTML =
				hdrStat +
				pokeStats +
				hdrAbilities +
				pokeAbilities +
				hdrPokeMoves +
				movesScroll +
				pokeMoves +
				`</div>`;
		})
		.catch((e) => console.log(e.message));
}
//capitalize only the first letter of the string.
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
//Toggle Images 1
function handleImg1Click() {
	//Get element document
	let elImageText = document.getElementById("idImgText1");

	if (currentImg1 == 1) {
		elPokeImg1.srcset = poke1Art;
		currentImg1 = 2;
	} else if (currentImg1 == 2) {
		elPokeImg1.srcset = poke1Home;
		currentImg1 = 3;
	} else {
		elPokeImg1.srcset = poke1Img;
		currentImg1 = 1;
	}

	elImageText.innerText = `Image ${currentImg1} of 3`;
}
//Toggle Images 2
function handleImg2Click() {
	//Get element document
	let elImageText = document.getElementById("idImgText2");

	if (currentImg2 == 1) {
		elPokeImg2.srcset = poke2Art;
		currentImg2 = 2;
	} else if (currentImg2 == 2) {
		elPokeImg2.srcset = poke2Home;
		currentImg2 = 3;
	} else {
		elPokeImg2.srcset = poke2Img;
		currentImg2 = 1;
	}

	elImageText.innerText = `Image ${currentImg2} of 3`;
}
//Get Random Number
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
/**
 *
 */
function handleSubmitBtn() {
	let pokeName1 = inputPokeEl1.value.toLowerCase();
	let pokeName2 = inputPokeEl2.value.toLowerCase();

	console.log(pokeName1);
	console.log(pokeName2);

	let url1 = `https://pokeapi.co/api/v2/pokemon/${pokeName1}`;
	let url2 = `https://pokeapi.co/api/v2/pokemon/${pokeName2}`;

	//raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png

	//Get Pokemon 1 info
	fetch(url1)
		.then((response) => response.json())
		.then((pokemon) => {
			console.log(pokemon);

			//Set title
			elPokeName1.innerHTML = capitalizeFirstLetter(pokemon.name);
			//Now that we have pokemon info need to update the display
			console.log(pokemon.id);

			//set image
			poke1Img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
			poke1Art = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

			elPokeImg1.srcset = poke1Img;

			//get stats map them to a p element and then join.
			let pokeStats = pokemon.stats
				.map((stat) => {
					return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
				})
				.join("");

			console.log(pokeStats);

			//Set stats for display
			elPokeCont1.innerHTML = pokeStats;

			//get abilities
			let pokeAbilities = pokemon.abilities
				.map((ability) => {
					return `<p>${ability.ability.name}</p>`;
				})
				.join("");

			//get moves
			let pokeMoves = pokemon.moves
				.map((move) => {
					return `<p>${move.move.name}</p>`;
				})
				.join("");

			elPokeCont1.innerHTML =
				hdrStat +
				pokeStats +
				hdrAbilities +
				pokeAbilities +
				hdrPokeMoves +
				pokeMoves;
		})
		.catch((e) => console.log(e.message));

	//Get Pokemon 1 info
	fetch(url2)
		.then((response) => response.json())
		.then((pokemon) => {
			console.log(pokemon);
			//Set title
			elPokeName2.innerHTML = capitalizeFirstLetter(pokemon.name);
			//Now that we have pokemon info need to update the display
			console.log(pokemon.id);
			//set image
			poke2Img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
			poke2Art = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

			elPokeImg2.srcset = poke2Img;

			//get stats map them to a p element and then join.
			let pokeStats = pokemon.stats
				.map((stat) => {
					return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
				})
				.join("");

			console.log(pokeStats);

			//Set stats for display
			elPokeCont2.innerHTML = pokeStats;

			//get abilities
			let pokeAbilities = pokemon.abilities
				.map((ability) => {
					return `<p>${ability.ability.name}</p>`;
				})
				.join("");

			//get moves
			let pokeMoves = pokemon.moves
				.map((move) => {
					return `<p>${move.move.name}</p>`;
				})
				.join("");

			elPokeCont2.innerHTML =
				hdrStat +
				pokeStats +
				hdrAbilities +
				pokeAbilities +
				hdrPokeMoves +
				pokeMoves;
		})
		.catch((e) => console.log(e.message));
}
