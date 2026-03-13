import { foodItems, drinkItems } from './food.js';
import { petStats } from './petStats.js';

function displayStats(chosenPet) {
	const game = document.querySelector('.game');
	const statArea = document.createElement('div');

	let level = document.createElement('div');
	level.textContent = `Level: ${chosenPet.level}`;
	level.setAttribute('class', 'stat level');

	let health = document.createElement('div');
	health.textContent = `Health: ${chosenPet.health}`;
	health.setAttribute('class', 'stat health');

	let hunger = document.createElement('div');
	hunger.textContent = `Hunger: ${chosenPet.hunger}`;
	hunger.setAttribute('class', 'stat hunger');

	let exp = document.createElement('div');
	exp.textContent = `Exp: ${chosenPet.exp}`;
	exp.setAttribute('class', 'stat exp');

	let type = document.createElement('div');
	type.textContent = `Type: ${chosenPet.type}`;
	type.setAttribute('class', 'stat');

	let coin = document.createElement('div');
	coin.textContent = `Coins: ${chosenPet.coinAmount}`;
	coin.setAttribute('class', 'stat coin');

	game.appendChild(statArea);
	statArea.appendChild(type);
	statArea.appendChild(level);
	statArea.appendChild(health);
	statArea.appendChild(hunger);
	statArea.appendChild(exp);
	statArea.appendChild(coin);
	return { statArea, level, health };
}

function updateBars(chosenPet) {
	if (chosenPet.health <= 0 || chosenPet.hunger <= 0) {
		
		chosenPet.gameOver();
		return;
	}

	const hunger = document.querySelector('.hunger');
	const level = document.querySelector('.level');
	const health = document.querySelector('.health');
	const exp = document.querySelector('.exp');
	const coin = document.querySelector('.coin');

	hunger.textContent = `Hunger: ${chosenPet.hunger}`;
	level.textContent = `Level: ${chosenPet.level}`;
	health.textContent = `Health: ${chosenPet.health}`;
	exp.textContent = `Exp: ${chosenPet.exp}`;
	coin.textContent = `Coins: ${chosenPet.coinAmount}`;

	
}

function foodButtons(foodItems, pet) {
	const game = document.querySelector('.game');

	foodItems.forEach((foodItem) => {
		const foodBtn = document.createElement('button');
		foodBtn.textContent = foodItem.food;
		foodBtn.setAttribute('class', 'foodBtn foodsBtn');
		game.appendChild(foodBtn);
		foodItem.button = foodBtn;

		foodBtn.addEventListener('click', () => {
			if (pet.health <= 0 ) return;

			const allFoodBtns = document.querySelectorAll('.foodsBtn');
			allFoodBtns.forEach((btn) => {
				btn.style.display = 'none';
			});
			const foodListButtons = document.querySelector('.foods');
			const drinkListButtons = document.querySelector('.drinks');
			foodListButtons.style.display = 'block';
			drinkListButtons.style.display = 'block';
			pet.eat(foodItem);
			
			updateBars(pet);
		});
	});
}
function drinkButtons(drinkItems, pet) {
	drinkItems.forEach((drinkItem) => {
		const drinkBtn = document.createElement('button');
		drinkBtn.setAttribute('class', 'drinkBtn foodsBtn');
		drinkBtn.textContent = drinkItem.drink;
		game.appendChild(drinkBtn);
		drinkItem.button = drinkBtn;

		drinkBtn.addEventListener('click', () => {
			const allFoodBtns = document.querySelectorAll('.foodsBtn');
			allFoodBtns.forEach((btn) => {
				btn.style.display = 'none';
			});
			const foodListButtons = document.querySelector('.foods');
			const drinkListButtons = document.querySelector('.drinks');
			foodListButtons.style.display = 'block';
			drinkListButtons.style.display = 'block';
			pet.eat(drinkItem);
			updateBars(pet);
		});
	});
}

function checkButtons(pet) {
	foodItems.forEach((item) => {
		item.button.style.display = pet.level < item.levelNeeded ? 'none' : 'block';
	});

	drinkItems.forEach((item) => {
		item.button.style.display = pet.level < item.levelNeeded ? 'none' : 'block';
	});
}

function baseButtons() {
	const game = document.querySelector('.game');
	const foodListButtons = document.createElement('button');
	foodListButtons.setAttribute('class', 'btn foods baseBtn');
	foodListButtons.textContent = 'Food';

	const drinkListButtons = document.createElement('button');
	drinkListButtons.setAttribute('class', 'btn drinks baseBtn');
	drinkListButtons.textContent = 'Drink';

	game.appendChild(foodListButtons);
	game.appendChild(drinkListButtons);

	// function gamesButton() {

	// }
}

export {
	updateBars,
	displayStats,
	foodButtons,
	drinkButtons,
	checkButtons,
	baseButtons,
};
