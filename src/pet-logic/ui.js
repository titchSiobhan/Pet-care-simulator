import { foodItems, drinkItems } from './food.js';

import { setUpItems, setUpShop } from './inventory.js';

function displayStats(chosenPet) {
	const game = document.querySelector('.game');
	const statArea = document.createElement('div');
	const wrapper = document.createElement('div');
	wrapper.setAttribute('class', 'stat-wrapper');


	let level = document.createElement('div');
	level.textContent = `Level: ${chosenPet.level}`;
	level.setAttribute('class', 'stat level');

	// let health = document.createElement('div');
	// health.textContent = `Health: ${chosenPet.health}`;
	// health.setAttribute('class', 'stat health');
	

	let health = document.createElement('progress');
	health.value = chosenPet.health;
	health.max = chosenPet.maxHealth;
	health.setAttribute('class', 'stat health');
	const labelHealth = document.createElement('label');
	labelHealth.textContent = 'Health'
	health.setAttribute('id', 'healthBar');
	labelHealth.setAttribute('for', 'healthBar');
	wrapper.appendChild(labelHealth);
	wrapper.appendChild(health);

	// let hunger = document.createElement('div');
	// hunger.textContent = `Hunger: ${chosenPet.hunger}`;
	// hunger.setAttribute('class', 'stat hunger');

	const wrapperHunger = document.createElement('div');
	wrapperHunger.setAttribute('class', 'stat-wrapper');
	let hunger = document.createElement('progress');
	hunger.value = chosenPet.hunger;
	hunger.max = chosenPet.maxHunger;
	hunger.setAttribute('class', 'stat hunger');
	const labelHunger = document.createElement('label');
	labelHunger.textContent = 'Hunger'
	hunger.setAttribute('id', 'hungerBar');
	labelHunger.setAttribute('for', 'hungerBar');
	wrapperHunger.appendChild(labelHunger);
	wrapperHunger.appendChild(hunger);


	// let exp = document.createElement('div');
	// exp.textContent = `Exp: ${chosenPet.exp}`;
	// exp.setAttribute('class', 'stat exp');

	const wrapperExp = document.createElement('div');
	wrapperExp.setAttribute('class', 'stat-wrapper');
	let exp = document.createElement('progress');
	exp.value = chosenPet.exp;
	exp.max = chosenPet.expNeeded ?? 1;
	exp.setAttribute('class', 'stat exp');
	const labelExp = document.createElement('label');
	labelExp.textContent = 'Exp'
	exp.setAttribute('id', 'expBar');
	labelExp.setAttribute('for', 'expBar');
	wrapperExp.appendChild(labelExp);
	wrapperExp.appendChild(exp);

	
	let type = document.createElement('div');
	type.textContent = `Type: ${chosenPet.type}`;
	type.setAttribute('class', 'stat');

	let coin = document.createElement('div');
	coin.textContent = `Coins: ${chosenPet.coinAmount}`;
	coin.setAttribute('class', 'stat coin');

	// let energy = document.createElement('div');
	// energy.textContent = `Energy: ${chosenPet.energy}`;
	// energy.setAttribute('class', 'stat energy');

	const wrapperEnergy = document.createElement('div');
	wrapperEnergy.setAttribute('class', 'stat-wrapper');
	let energy = document.createElement('progress');
	energy.value = chosenPet.energy;
	energy.max = chosenPet.maxEnergy;
	energy.setAttribute('class', 'stat energy');
	const labelEnergy = document.createElement('label');
	labelEnergy.textContent = 'Energy'
	energy.setAttribute('id', 'energyBar');
	labelEnergy.setAttribute('for', 'energyBar');
	wrapperEnergy.appendChild(labelEnergy);
	wrapperEnergy.appendChild(energy);
	
	// let happiness = document.createElement('div');
	// happiness.textContent = 'Happiness: ' + ((chosenPet.happiness / chosenPet.maxHappiness) * 100) + '%';
	// happiness.setAttribute('class', 'stat happiness');

	const wrapperHappiness = document.createElement('div');
	wrapperHappiness.setAttribute('class', 'stat-wrapper');
	let happiness = document.createElement('progress');
	happiness.value = chosenPet.happiness;
	happiness.max = chosenPet.maxHappiness;
	happiness.setAttribute('class', 'stat happiness');
	const labelHappiness = document.createElement('label');
	labelHappiness.textContent = 'Happiness'
	happiness.setAttribute('id', 'happinessBar');
	labelHappiness.setAttribute('for', 'happinessBar');
	wrapperHappiness.appendChild(labelHappiness);
	wrapperHappiness.appendChild(happiness);

	game.appendChild(statArea);
	statArea.appendChild(type);
	statArea.appendChild(level);
	statArea.appendChild(wrapper);
	statArea.appendChild(wrapperHunger);
	statArea.appendChild(wrapperExp)
	statArea.appendChild(wrapperEnergy);
	statArea.appendChild(wrapperHappiness)
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
	const energy = document.querySelector('.energy');
	const happiness = document.querySelector('.happiness')
console.log('hunger element: ', hunger)
	hunger.value = chosenPet.hunger;
	hunger.max = chosenPet.maxHunger;
	if (chosenPet.hunger > chosenPet.maxHunger) {
		chosenPet.hunger = chosenPet.maxHunger;
	};

	level.textContent = `Level: ${chosenPet.level}`;

	health.value = chosenPet.health;
	health.max = chosenPet.maxHealth
	if (chosenPet.health > chosenPet.maxHealth) {
		chosenPet.health = chosenPet.maxHealth;
	}
	console.log(chosenPet.health, + chosenPet.maxHealth)

	exp.value = chosenPet.exp;
	exp.max = chosenPet.expNeeded ?? 1;
	// if (chosenPet.hunger > chosenPet.maxHunger) {
	// 	chosenPet.hunger = chosenPet.maxHunger;
	// };
	coin.textContent = `Coins: ${chosenPet.coinAmount}`;
	energy.value = chosenPet.energy;
	energy.max = chosenPet.maxEnergy
	if (chosenPet.energy > chosenPet.maxEnergy) {
		chosenPet.energy = chosenPet.maxEnergy;
	}
	happiness.value = chosenPet.happiness;
	happiness.max = chosenPet.maxHappiness
	if (chosenPet.happiness > chosenPet.maxHappiness) {
		chosenPet.happiness = chosenPet.maxHappiness;
	}
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
			if (pet.health <= 0) return;

			const allFoodBtns = document.querySelectorAll('.foodsBtn');
			allFoodBtns.forEach((btn) => {
				btn.style.display = 'none';
			});
			resetButtons()
			pet.eat(foodItem);

			updateBars(pet);
		});
	});
}
function drinkButtons(drinkItems, pet) {
	drinkItems.forEach((drinkItem) => {
		const game = document.querySelector('.game')
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
			resetButtons()
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

	const gamesBtn = document.createElement('button');
	gamesBtn.setAttribute('class', 'baseBtn btn games gamesBtn');
	gamesBtn.textContent = 'Games';
	game.appendChild(gamesBtn);

	const shopBtn = document.createElement('button');
	shopBtn.setAttribute('class', 'btn shop');
	shopBtn.textContent = 'Shop';
	game.appendChild(shopBtn);

	

	const inventoryBtn = document.createElement('button');
	inventoryBtn.setAttribute('class', 'btn inventory inventoryBtn');
	inventoryBtn.textContent = 'Inventory';
	game.appendChild(inventoryBtn);
}

function endGame() {
	const container = document.querySelector('.container');

	setTimeout(() => {
						game.removeChild(container);
						resetButtons()
					}, 1780);
}
function resetButtons() {

			const foodListButtons = document.querySelector('.foods');
			const drinkListButtons = document.querySelector('.drinks');
			const gameListButton = document.querySelector('.gamesBtn');
			const shopBtn = document.querySelector('.shop');
			const inventoryBtn = document.querySelector('.inventoryBtn');
			const backBtn = document.querySelector('.backBtn');

			foodListButtons.style.display = 'block';
			drinkListButtons.style.display = 'block';
			gameListButton.style.display = 'block';
			shopBtn.style.display = 'block';
			inventoryBtn.style.display = 'block';
			if (backBtn){
			game.removeChild(backBtn) }
}

function hideButtons() {
	const foodListButtons = document.querySelector('.foods');
			const drinkListButtons = document.querySelector('.drinks');
			const gameListButton = document.querySelector('.gamesBtn');
			const shopBtn = document.querySelector('.shop');
			const inventoryBtn = document.querySelector('.inventoryBtn');

			foodListButtons.style.display = 'none';
			drinkListButtons.style.display = 'none';
			gameListButton.style.display = 'none';
			shopBtn.style.display = 'none';
			inventoryBtn.style.display = 'none';
}

function backButton() {
	const game = document.querySelector('.game')
	const backBtn = document.createElement('button');
	backBtn.setAttribute('class', 'back btn backBtn');
	backBtn.textContent = 'Back';
	game.appendChild(backBtn)

	backBtn.addEventListener('click', () => {
		game.removeChild(backBtn)
		resetButtons();
		setUpItems();
		setUpShop();
	})
	
}
export {
	updateBars,
	displayStats,
	foodButtons,
	drinkButtons,
	checkButtons,
	baseButtons,
	endGame,
	hideButtons,
	resetButtons, backButton
};
