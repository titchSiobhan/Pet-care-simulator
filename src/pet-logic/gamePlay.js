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
	backButton
} from './ui.js';



import { drinkItems, foodItems } from './food.js';

import { choseRandomPet } from '../index.js';

import { shop, showInventory } from './inventory.js';

let chosenPet;

function gamePlay(chosenPet) {
	// Check for saved game first
	const loadedPet = loadGame();
	if (loadedPet) {
		chosenPet = loadedPet;
		console.log('Loaded saved pet:', chosenPet);
		
		
	} else {
		//takes name from form
		let nameValue = document.querySelector('.newName');
		let newPetName = nameValue.value;
		console.log(newPetName);
		

		//attaches new to new pet
		let chosenType = choseRandomPet(petList);
		chosenPet = new petStats(chosenType);
		chosenPet.name = newPetName;
		chosenPet.type = chosenType.name;
		console.log('Created new pet:', chosenPet);
	}

	const game = document.querySelector('.game');

	game.innerHTML = '';
function autoSave() {
setInterval(() => {
    if (chosenPet.saveTimer) return;
    saveGame(chosenPet);
}, 5000);
}

autoSave()



	
	//creates the pet display element
	const displayPet = document.createElement('div');
	displayPet.classList.add('pet');

	console.log(chosenPet);
	// displayPet.textContent = newPetName;

	displayPet.setAttribute('class', 'pet');

	// game.appendChild(displayPet);
	displayStats(chosenPet);
	console.log(chosenPet.happiness)
	console.log(chosenPet.maxHappiness)
	console.log((chosenPet.happiness / chosenPet.maxHappiness) *100)

	//comment out to pause decay
	chosenPet.hungerIsDecaying()




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
				chosenPet.level < item.levelNeeded ? 'none' : 'flex';
		});
        hideButtons()
		
	});

	drinkListButtons.addEventListener('click', () => {
		drinkButtons(drinkItems, chosenPet);
		drinkItems.forEach((item) => {
			item.button.style.display =
				chosenPet.level < item.levelNeeded ? 'none' : 'flex';
		});
        hideButtons()
	});

	gameListButton.addEventListener('click', () => {
		const gameTypeGuess = document.createElement('button');
		gameTypeGuess.setAttribute('class', 'btn miniGameBtn numGuess');
		gameTypeGuess.setAttribute('id', 'numGuess')
		gameTypeGuess.textContent = 'Number Guess';
		const btnContainer = document.querySelector('#btnContainer');
		btnContainer.appendChild(gameTypeGuess)

		gameTypeGuess.addEventListener('click', () => {

			if (chosenPet.energy < 2) {
				const popUp = document.createElement('div');
				popUp.setAttribute('class', 'stat popUp');
				popUp.textContent =`${chosenPet.name} is too tired`;
				popUp.style.display = 'flex';
				game.appendChild(popUp);
				btnContainer.removeChild(gameTypeRPS);
					btnContainer.removeChild(gameTypeGuess);

				setTimeout(() => {
					game.removeChild(popUp);
					
					resetButtons()
				}, 1500)
			} else{
			guessingGame(chosenPet);
			btnContainer.removeChild(gameTypeGuess);
			btnContainer.removeChild(gameTypeRPS)
			}
			
			
		})

		const gameTypeRPS = document.createElement('button');
		gameTypeRPS.setAttribute('class', 'btn miniGameBtn numGuess');
		gameTypeRPS.setAttribute('id', 'RPS')
		gameTypeRPS.textContent = 'Rock, Paper, Scissors';
		btnContainer.appendChild(gameTypeRPS)

		gameTypeRPS.addEventListener('click', () => {
			if (chosenPet.energy < 4) {
				const popUp = document.createElement('div');
				popUp.setAttribute('class', 'stat popUp');
				popUp.textContent =`${chosenPet.name} is too tired`;
				popUp.style.display = 'flex';
				game.appendChild(popUp);
				btnContainer.removeChild(gameTypeRPS);
				btnContainer.removeChild(gameTypeGuess)
					

				setTimeout(() => {
					game.removeChild(popUp);
					
					resetButtons()
				}, 1500)
			} else{
			rockPaperScissors(chosenPet);
			btnContainer.removeChild(gameTypeGuess)
			btnContainer.removeChild(gameTypeRPS)
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
 saveGame(chosenPet)
	updateBars(chosenPet, foodItems, drinkItems);
	
}

function saveGame(chosenPet) {
	console.log("Value of chosenPet:", chosenPet);
	if (!chosenPet) {
		console.error('saveGame called with undefined chosenPet');
		return;
	}
console.log("Value of chosenPet.inventory:", chosenPet.inventory);
	 const data = {
        type: chosenPet.type,
        name: chosenPet.name,
        level: chosenPet.level,
        exp: chosenPet.exp,

        health: chosenPet.health,
        maxHealth: chosenPet.maxHealth,
        hunger: chosenPet.hunger,
        maxHunger: chosenPet.maxHunger,
        happiness: chosenPet.happiness,
        maxHappiness: chosenPet.maxHappiness,
        energy: chosenPet.energy,
        maxEnergy: chosenPet.maxEnergy,

        coinAmount: chosenPet.coinAmount,

		
        inventory: Array.from(chosenPet.inventory.entries()) 
    };
	console.log('Saving data:', data);
	localStorage.setItem('petData', JSON.stringify(data));
	console.log(chosenPet.inventory);
console.log(Array.from(chosenPet.inventory.entries()));

}

function loadGame() {
	const data = localStorage.getItem('petData');
	if (!data) return null;

	const parsedData = JSON.parse(data);
	console.log('Loaded data:', parsedData);

	const pet = new petStats(parsedData.type, parsedData.name);
	Object.assign(pet, parsedData);

	// pet.inventory = parsedData.inventory ? new Map(parsedData.inventory) : new Map(); // Restore Map from array or create empty
	pet.inventory = parsedData.inventory
    ? new Map(parsedData.inventory)
    : new Map();

	// Check if the loaded pet is already dead
	if (pet.health <= 0 || pet.hunger <= 0) {
		console.log('Loaded pet is dead, clearing save');
		clearSave();
		return null;
	}
	return pet;
}

function clearSave() {
	localStorage.removeItem('petData')
}

export { gamePlay, saveGame, clearSave, loadGame };
