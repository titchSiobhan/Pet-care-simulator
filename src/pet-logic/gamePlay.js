import { petList } from './petTypes.js';

import { petStats } from './petStats.js';

import { guessingGame } from './guessingGame.js';

import { rockPaperScissors } from './rockPaperScissors.js';

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
	//chosenPet.hungerIsDecaying()

	console.log('Inside buttons call:', foodItems);

	// buttons(foodItems, drinkItems, chosenPet);
	baseButtons();
	
	const foodListButtons = document.querySelector('.foods');
	const drinkListButtons = document.querySelector('.drinks');
	const gameListButton = document.querySelector('.gamesBtn');

	foodListButtons.addEventListener('click', () => {
		foodButtons(foodItems, chosenPet);
		foodItems.forEach((item) => {
			item.button.style.display =
				chosenPet.level < item.levelNeeded ? 'none' : 'block';
		});
        foodListButtons.style.display = 'none';
        drinkListButtons.style.display = 'none';
		gameListButton.style.display = 'none';
		
	});

	drinkListButtons.addEventListener('click', () => {
		drinkButtons(drinkItems, chosenPet);
		drinkItems.forEach((item) => {
			item.button.style.display =
				chosenPet.level < item.levelNeeded ? 'none' : 'block';
		});
        foodListButtons.style.display = 'none';
        drinkListButtons.style.display = 'none';
		gameListButton.style.display = 'none';
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
					
					foodListButtons.style.display = 'block';
					drinkListButtons.style.display = 'block';
					gameListButton.style.display = 'block';
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
					
					foodListButtons.style.display = 'block';
					drinkListButtons.style.display = 'block';
					gameListButton.style.display = 'block';
				}, 1500)
			} else{
			rockPaperScissors(chosenPet);
			game.removeChild(gameTypeGuess)
			game.removeChild(gameTypeRPS)
			}
			
		})
		
		foodListButtons.style.display = 'none';
        drinkListButtons.style.display = 'none';
		gameListButton.style.display = 'none';
	})

	updateBars(chosenPet, foodItems, drinkItems);
}

export { gamePlay };
