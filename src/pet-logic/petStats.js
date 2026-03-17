import { updateBars } from './ui.js';
import {  clearSave } from './gamePlay.js';
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
		this.inventory = new Map();
		this.saveTimer = null;
	}

	increaseLevel() {
		this.expNeeded = this.level ** 2 * 20;
		if (this.exp >= this.expNeeded) {
			this.level++;
			this.maxHealth += 5;
			this.maxHunger += 5;
			this.exp -= this.expNeeded;
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
		}, 3000);
		

	}

	cancelAutoSave() {
	clearInterval(this.saveTimer);
		this.saveTimer = null;
}
	healthIsDecreasing() {
    if (this.healthTimer) return; // prevents duplicates

    this.healthTimer = setInterval(() => {
        this.healthDecrease();
        updateBars(this);
    }, 1000);
}


	stopHealthDecay() {
		clearInterval(this.healthTimer);
		this.healthTimer = null;
	}

	stopDecay() {
		clearInterval(this.hungerTimer);
		this.hungerTimer = null;
	}

	healthDecrease() {
		if (this.health > 0) {
			this.health--;
			console.log('HEALTH DECREASE CALLED — source?', this.health);
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
	happinessDecrease() {
		if (this.happiness > 0) {
			this.happiness--;
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
			const game = document.querySelector('.game')
			const hungerPopUp = document.createElement('div');
			hungerPopUp.setAttribute('class', 'popUp hungerPop')
			hungerPopUp.style.display = 'flex';
			hungerPopUp.textContent = `${this.name} isn't hungry`;
			game.appendChild(hungerPopUp);

			setTimeout(() => {
				game.removeChild(hungerPopUp)
			}, 1780)
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
			const game = document.querySelector('.game')
			const hungerPopUp = document.createElement('div');
			hungerPopUp.setAttribute('class', 'popUp hungerPop')
			hungerPopUp.style.display = 'flex';
			hungerPopUp.textContent = `${this.name} isn't hungry`;
			game.appendChild(hungerPopUp);

			setTimeout(() => {
				game.removeChild(hungerPopUp)
			}, 1780);
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

	gameOver(pet) {
		// if (this.isDead) {
		// 	// already dead, but still allow restart
		// 	this.stopDecay();
		// 	// this.stopHealthDecay();
		// 	this.cancelAutoSave();
			
		// } else {
		// 	this.isDead = true;
		// 	this.stopDecay();
		// 	// this.stopHealthDecay();
			
		// }
		   if (!this.isDead) {
        this.isDead = true;
    }

    // Stop ALL timers
    this.stopDecay();
    this.cancelAutoSave()
    clearInterval(this.mainLoop);

		

		const game = document.querySelector('.game');
		if (!game) return;
		

		const gameOverText = document.createElement('div');
		gameOverText.setAttribute('class', 'stat popUp');
		game.appendChild(gameOverText);
		if (this.health <= 0) {
			gameOverText.textContent = `${this.name} has died due to poor health`;
			
			clearSave()
		}

		if (this.hunger <= 0) {
			gameOverText.textContent = `${this.name} has died due to hunger`;
			console.log('pet death')
			clearSave()
		}
		setTimeout(() => {
			pet = null;
			game.innerHTML = '';
			startGame();
		}, 1780);
		
		
	}
}

export { petStats };
