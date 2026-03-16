
import { updateBars } from './ui.js';

import { startGame } from './startGame.js';

// start with egg
//add random pet
// add health
// add hunger
// add happiness
//add level
//coins

class petStats {
	constructor(name, type) {
		this.type = type;
		this.name = name;
		this.level = 1;
		this.health = 10;
		this.exp = 0;
		this.hunger = 10;
		this.maxHealth = 10;
		this.maxHunger = 10;
		this.coinAmount = 0;
		this.energy = 10;
		this.maxEnergy = 10;
		this.happiness = 100;
		this.maxHappiness = 100;
	}

	increaseLevel() {
		this.expNeeded = this.level ** 2 * 20;
		if (this.exp >= this.expNeeded) {
			this.level++;
			this.maxHealth += 5;
			this.maxHunger += 5;
			this.exp = 0;
			this.health += 5;
			this.coinAmount += 4;
			this.maxEnergy += 5;
			this.maxHappiness += 10;
			// buttons(this, foodItems, drinkItems);
		}
	}

	hungerDecrease() {
		if (this.hunger > 0) {
			this.hunger--;
		}
	}

	hungerIsDecaying() {
		this.hungerTimer = setInterval(() => {
			this.hungerDecrease();
			updateBars(this);
		}, 4000);
	}

	stopDecay() {
		clearInterval(this.hungerTimer);
		this.hungerTimer = null;
	}

	healthDecrease() {
		if (this.health > 0) {
			this.health--;
		}
	}

	healthIncrease() {
		this.health++;
		if (this.health > this.maxHealth) {
			this.health = this.maxHealth;
		}
	}

	happinessIncrease() {
		if (this.happiness > this.maxHappiness) {
			this.happiness = this.maxHappiness;
		}
	}

	energyDecrease() {
		if (this.energy > 0) {
			this.energy--;
		}
	}

	energyIncrease() {
		this.energy++;
		if (this.energy > this.maxEnergy) {
			this.energy = this.maxEnergy;
		}
	}

	eat(foodItem) {
		if (this.hunger >= this.maxHunger) {
			console.log(`${this.name} isn't hungry`);
		} else {
			this.hunger += foodItem.giveHunger;
			if (this.hunger > this.maxHunger) {
				this.hunger = this.maxHunger;
			}
			if (foodItem.healthPoints === true) {
				this.health += foodItem.giveHealth;
			} else {
				this.health -= foodItem.giveHealth;
			}
			this.gainExp(foodItem.giveExp);
			if (this.happiness > this.maxHappiness) {
			this.happiness = this.maxHappiness;
		}

			this.energy += foodItem.energyGiven;
			if (this.energy > this.maxEnergy) {
				this.energy = this.maxEnergy;
			}
		}
	}

	drink(drinkItem) {
		if (this.hunger >= this.maxHunger) {
			console.log(`${this.name} isn't hungry`);
		} else {
			this.hunger += drinkItem.giveHunger;
			if (this.hunger > this.maxHunger) {
				this.hunger = this.maxHunger;
			}
			this.gainExp(drinkItem.giveExp);
			if (this.happiness > this.maxHappiness) {
			this.happiness = this.maxHappiness;
		}

			this.energy += drinkItem.energyGiven;
			if (this.energy > this.maxEnergy) {
				this.energy = this.maxEnergy;
			}
		}
	}

	gainExp(amount = 1) {
		this.exp += amount;
		this.increaseLevel();
		updateBars(this);
	}

	gameOver() {
		if (this.isDead) return;
		this.isDead = true;
		this.stopDecay();
		const game = document.querySelector('.game');
		if (!game) return;
		game.innerHTML = '';

		const gameOverText = document.createElement('div');
		gameOverText.setAttribute('class', 'stat');
		game.appendChild(gameOverText);
		if (this.health <= 0) {
			gameOverText.textContent = `${this.name} has died due to poor health`;
		}

		if (this.hunger <= 0) {
			gameOverText.textContent = `${this.name} has died due to hunger`;
		}
		setTimeout(() => {
			game.removeChild(gameOverText);
			startGame();
		}, 1780);
	}
}

export { petStats };
