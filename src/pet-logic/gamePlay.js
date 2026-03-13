import { petList } from './petTypes.js';

import { petStats } from './petStats.js';

import {
	displayStats,
	updateBars,
	foodButtons,
	drinkButtons,
	checkButtons,
	baseButtons,
} from './ui.js';

import { startGame, startForm } from './startGame.js';

import { drinkItems, foodItems } from './food.js';

import { choseRandomPet } from '../index.js';

let chosenPet;

function gamePlay() {
	//takes name from form
	let nameValue = document.querySelector('.newName');
	let newPetName = nameValue.value;
	console.log(newPetName);

	//attaches new to new pet
	let chosenType = choseRandomPet(petList);
	chosenPet = new petStats(chosenType);
	chosenPet.name = newPetName;
	chosenPet.type = chosenType.name;

	const game = document.querySelector('.game');

	game.innerHTML = '';

	//creates the pet display element
	const displayPet = document.createElement('div');
	displayPet.classList.add('pet');

	console.log(chosenPet);
	displayPet.textContent = newPetName;

	displayPet.setAttribute('class', 'pet');

	game.appendChild(displayPet);
	displayStats(chosenPet);

	//comment out to pause decay
	chosenPet.hungerIsDecaying()

	console.log('Inside buttons call:', foodItems);

	// buttons(foodItems, drinkItems, chosenPet);
	baseButtons();
	const foodListButtons = document.querySelector('.foods');
	const drinkListButtons = document.querySelector('.drinks');

	foodListButtons.addEventListener('click', () => {
		foodButtons(foodItems, chosenPet);
		foodItems.forEach((item) => {
			item.button.style.display =
				chosenPet.level < item.levelNeeded ? 'none' : 'block';
		});
        foodListButtons.style.display = 'none';
        drinkListButtons.style.display = 'none';
		
	});

	drinkListButtons.addEventListener('click', () => {
		drinkButtons(drinkItems, chosenPet);
		drinkItems.forEach((item) => {
			item.button.style.display =
				chosenPet.level < item.levelNeeded ? 'none' : 'block';
		});
        foodListButtons.style.display = 'none';
        drinkListButtons.style.display = 'none';
	});

	updateBars(chosenPet, foodItems, drinkItems);
}

export { gamePlay };
