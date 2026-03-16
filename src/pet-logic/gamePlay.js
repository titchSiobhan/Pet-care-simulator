import { petList } from './petTypes.js';

import { petStats } from './petStats.js';

import { guessingGame } from './guessingGame.js';

import { rockPaperScissors } from './rockPaperScissors.js';

import {
	displayStats,
	updateBars,
	foodButtons,
	drinkButtons,
	
	baseButtons,
	resetButtons,
	hideButtons,
	backButton,
} from './ui.js';



import { drinkItems, foodItems } from './food.js';

import { choseRandomPet } from '../index.js';

import { shop, showInventory } from './inventory.js';

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
	console.log(chosenPet.happiness)
	console.log(chosenPet.maxHappiness)
	console.log((chosenPet.happiness / chosenPet.maxHappiness) *100)

	//comment out to pause decay
	chosenPet.hungerIsDecaying()

	console.log('Inside buttons call:', foodItems);

	// buttons(foodItems, drinkItems, chosenPet);
	baseButtons();
	
	const foodListButtons = document.querySelector('.foods');
	const drinkListButtons = document.querySelector('.drinks');
	const gameListButton = document.querySelector('.gamesBtn');
	const shopListButton = document.querySelector('.shop');
	const inventoryButton = document.querySelector('.inventoryBtn')


	foodListButtons.addEventListener('click', () => {
		foodButtons(foodItems, chosenPet);
		foodItems.forEach((item) => {
			item.button.style.display =
				chosenPet.level < item.levelNeeded ? 'none' : 'block';
		});
        hideButtons()
		
	});

	drinkListButtons.addEventListener('click', () => {
		drinkButtons(drinkItems, chosenPet);
		drinkItems.forEach((item) => {
			item.button.style.display =
				chosenPet.level < item.levelNeeded ? 'none' : 'block';
		});
        hideButtons()
	});

	gameListButton.addEventListener('click', () => {
		const gameTypeGuess = document.createElement('button');
		gameTypeGuess.setAttribute('class', 'btn numGuess');
		gameTypeGuess.textContent = 'Number Guess';
		game.appendChild(gameTypeGuess)

		gameTypeGuess.addEventListener('click', () => {

			if (chosenPet.energy < 2) {
				const popUp = document.createElement('div');
				popUp.setAttribute('class', 'stat');
				popUp.textContent =`${chosenPet.name} is too tired`;
				game.appendChild(popUp);
				game.removeChild(gameTypeRPS);
					game.removeChild(gameTypeGuess);

				setTimeout(() => {
					game.removeChild(popUp);
					
					resetButtons()
				}, 1500)
			} else{
			guessingGame(chosenPet);
			game.removeChild(gameTypeGuess);
			game.removeChild(gameTypeRPS)
			}
			
			
		})

		const gameTypeRPS = document.createElement('button');
		gameTypeRPS.setAttribute('class', 'btn numGuess');
		gameTypeRPS.textContent = 'Rock, Paper, Scissors';
		game.appendChild(gameTypeRPS)

		gameTypeRPS.addEventListener('click', () => {
			if (chosenPet.energy < 4) {
				const popUp = document.createElement('div');
				popUp.setAttribute('class', 'stat');
				popUp.textContent =`${chosenPet.name} is too tired`;
				game.appendChild(popUp);
				game.removeChild(gameTypeRPS);
					game.removeChild(gameTypeGuess);

				setTimeout(() => {
					game.removeChild(popUp);
					
					resetButtons()
				}, 1500)
			} else{
			rockPaperScissors(chosenPet);
			game.removeChild(gameTypeGuess)
			game.removeChild(gameTypeRPS)
			}
			
		})
		
		hideButtons()
	})

	shopListButton.addEventListener('click', () => {
		backButton()
		shop(chosenPet);
		hideButtons()
	})

	inventoryButton.addEventListener('click', () => {
		backButton()
		showInventory(chosenPet)
		hideButtons()
	})

	updateBars(chosenPet, foodItems, drinkItems);
}

export { gamePlay };
