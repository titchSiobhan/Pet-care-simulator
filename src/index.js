import './style.css';

import { petList } from './pet-logic/petTypes.js';



// import { displayStats, updateBars, buttons, checkButtons, baseButtons } from './pet-logic/ui.js';

import { startGame} from './pet-logic/startGame.js';



let chosenPet;

console.log(petList);

// const game = document.querySelector('.game');

startGame();

function choseRandomPet(petList) {
	let petRandom = Math.floor(Math.random() * petList.length);

	return petList[petRandom];
}


export { choseRandomPet }