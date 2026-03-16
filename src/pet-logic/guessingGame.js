import { endGame, updateBars } from './ui';

function guessingGame(chosenPet) {
	const container = document.createElement('div');
	container.setAttribute('class', 'container gameContainer');
	const game = document.querySelector('.game');

	const gameName = document.createElement('div');
	gameName.setAttribute('class', 'minigame');
	gameName.textContent = 'Guess the number!';

	container.appendChild(gameName);

	let lives = 3;

	let numToGuess = Math.floor(Math.random() * 10) + 1;

	for (let i = 1; i < 11; i++) {
		const guessBtn = document.createElement('button');
		guessBtn.textContent = i;

		guessBtn.addEventListener('click', () => {
			console.log(`You guessed: ${i}`);

			if (lives === 1 && i != numToGuess ) {
				const gamePopup = document.createElement('div');
				gamePopup.setAttribute('class', 'stat');
				gamePopup.textContent = 'Bad luck, game over';
				container.appendChild(gamePopup);

				chosenPet.energy -= 2;
				chosenPet.happiness -= 5;
				updateBars(chosenPet);
				endGame(chosenPet);
			} else {
				if (i === numToGuess) {
					const gamePopup = document.createElement('div');
					gamePopup.setAttribute('class', 'stat');
					gamePopup.textContent = 'Correct! Well done!';
					container.appendChild(gamePopup);
					chosenPet.happiness += 2;
					if (chosenPet.happiness > chosenPet.maxHappiness) {
						chosenPet.happiness = chosenPet.maxHappiness;
					}

					chosenPet.coinAmount += 2;
					chosenPet.energy -= 2;
					chosenPet.exp += 3;
					updateBars(chosenPet);
					endGame(chosenPet);
				} else if (i < numToGuess) {
					const gamePopup = document.createElement('div');
					gamePopup.setAttribute('class', 'stat');
					gamePopup.textContent = `Your guess is too low, You guessed: ${i}`;
					container.appendChild(gamePopup);
					lives--;
				} else {
					const gamePopup = document.createElement('div');
					gamePopup.setAttribute('class', 'stat');
					gamePopup.textContent = `Your guess is too high, You guessed: ${i}`;
					container.appendChild(gamePopup);
					lives--;
				}
			}
		});
		container.appendChild(guessBtn);
	}
	game.appendChild(container);
}

export { guessingGame };
