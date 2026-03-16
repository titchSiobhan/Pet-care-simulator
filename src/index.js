import './style.css';

import { petList } from './pet-logic/petTypes.js';



// import { displayStats, updateBars, buttons, checkButtons, baseButtons } from './pet-logic/ui.js';

import { startGame, startForm } from './pet-logic/startGame.js';

// import { drinkItems, foodItems } from './pet-logic/food.js';

import { gamePlay } from './pet-logic/gamePlay.js';

let chosenPet;

console.log(petList);

const game = document.querySelector('.game');

startGame();

function choseRandomPet(petList) {
	let petRandom = Math.floor(Math.random() * petList.length);

	return petList[petRandom];
}
const button = document.querySelector('.start');

button.addEventListener('click', () => {
	//starts new game, giving a random choice in pet and removing the button
	console.log('click!');
	console.log(choseRandomPet(petList));
	startForm();
	button.style.display = 'none';

	// const statsUI = displayStats(chosenPet)

	const submitBtn = document.querySelector('#submitBtn');

	submitBtn.addEventListener('click', (e) => {
		e.preventDefault();
		console.log('Submit clicked!');

		gamePlay()
		
	});
});


export { choseRandomPet }