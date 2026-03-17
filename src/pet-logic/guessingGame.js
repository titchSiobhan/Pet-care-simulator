import { endGame, updateBars } from './ui';

function guessingGame(chosenPet) {
	const container = document.createElement('div');
	container.setAttribute('class', 'container gameContainer');
	container.setAttribute('id', 'gameContainer');
	const game = document.querySelector('.game');
	const gameBtns = document.createElement('button');
	gameBtns.setAttribute('id', 'gameChoiceBtns');
	gameBtns.style.display = 'flex';

	const gameName = document.createElement('div');
	gameName.setAttribute('class', 'minigame');
	gameName.textContent = 'Guess the number!';

	container.appendChild(gameName);

	let lives = 3;

	let numToGuess = Math.floor(Math.random() * 10) + 1;

	for (let i = 1; i < 11; i++) {
		const guessBtn = document.createElement('button');
		guessBtn.textContent = i;
		guessBtn.setAttribute('class', ' guessBtnNum')

		guessBtn.addEventListener('click', () => {
			console.log(`You guessed: ${i}`);
			
				

			if (lives === 1 && i != numToGuess ) {
				const gamePopup = document.createElement('div');
				gamePopup.setAttribute('class', 'results popUp guessResults');
				gamePopup.textContent = `Bad luck, game over. The number was ${numToGuess}`;
				container.appendChild(gamePopup);
				// setTimeout(() => {
				// container.removeChild(gamePopup)
				// }, 1780)

				chosenPet.energy -= 2;
				chosenPet.happiness -= 5;
				updateBars(chosenPet);
				endGame(chosenPet);
			} else {
				if (i === numToGuess) {
					const gamePopup = document.createElement('div');
					gamePopup.setAttribute('class', 'results popUp guessResults');
					gamePopup.textContent = 'Correct! Well done!';
					container.appendChild(gamePopup);
					
					chosenPet.happiness += 2;
					if (chosenPet.happiness > chosenPet.maxHappiness) {
						chosenPet.happiness = chosenPet.maxHappiness;
					}
					const expIncrease = chosenPet.level * 2.7;
					let randomCoin = Math.floor(Math.random() * 6 + 5)
					chosenPet.coinAmount += randomCoin;
					chosenPet.energy -= 2;
					chosenPet.exp += expIncrease;
					if (chosenPet.exp > chosenPet.expNeeded) {
				chosenPet.increaseLevel()
			}
					updateBars(chosenPet);
					endGame(chosenPet);
				} else if (i < numToGuess) {
					const gamePopup = document.createElement('div');
					gamePopup.setAttribute('class', 'results popUp guessResults');
					gamePopup.textContent = `Your guess is too low, You guessed: ${i}`;
					container.appendChild(gamePopup);
					lives--;
					setTimeout(() => {
                    const gamePopup = document.querySelector('.guessResults');
                    // Check if gamePopup exists before attempting to remove it
                    if (gamePopup) {
                        container.removeChild(gamePopup);
                    } else {
                        return
                    }
                }, 1000);
				} else {
					const gamePopup = document.createElement('div');
					gamePopup.setAttribute('class', 'results popUp guessResults');
					gamePopup.textContent = `Your guess is too high, You guessed: ${i}`;
					container.appendChild(gamePopup);
					setTimeout(() => {
                    const gamePopup = document.querySelector('.guessResults');
                    // Check if gamePopup exists before attempting to remove it
                    if (gamePopup) {
                        container.removeChild(gamePopup);
                    } else {
                        return
                    }
                }, 1000);
					lives--;
				}
				
			}
		});
		gameBtns.appendChild(guessBtn);
		container.appendChild(gameBtns)
	}
	game.appendChild(container);
}

export { guessingGame };
