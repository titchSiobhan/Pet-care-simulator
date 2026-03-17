import { updateBars, endGame } from './ui';



function rockPaperScissors(chosenPet) {
	const container = document.createElement('div');
	container.setAttribute('class', 'container gameContainer');
	container.setAttribute('id', 'gameContainer');
	const gameBtns = document.createElement('button');
	gameBtns.setAttribute('id', 'gameChoiceBtns');
	gameBtns.style.display = 'flex';

	const game = document.querySelector('.game');
	const RPSName = document.createElement('div');
	RPSName.setAttribute('class', 'minigame');
	RPSName.textContent = 'Rock, Paper, Scissors';
	game.appendChild(container);

	container.appendChild(RPSName);
	function getComputerChoice() {
		let options = ['Rock', 'Paper', 'Scissors'];

		const computerRandomChoice = Math.floor(Math.random() * options.length);
		return options[computerRandomChoice];
	}

	const playerRock = document.createElement('button');
	playerRock.className = 'btn playerChoice rock';
	playerRock.textContent = 'Rock';

	const playerPaper = document.createElement('button');
	playerPaper.className = 'btn playerChoice paper';
	playerPaper.textContent = 'Paper';

	const playerScissors = document.createElement('button');
	playerScissors.className = 'btn playerChoice scissors';
	playerScissors.textContent = 'Scissors';

	gameBtns.appendChild(playerRock);
	gameBtns.appendChild(playerPaper);
	gameBtns.appendChild(playerScissors);
	container.appendChild(gameBtns);

	function getPlayerChoice(event) {
		gameBtns.removeChild(playerRock);
		gameBtns.removeChild(playerPaper);
		gameBtns.removeChild(playerScissors);
		return event.target.textContent; // "Rock", "Paper", or "Scissors"
	}

	function playRound(player, computer, chosenPet, updateBars) {
		const expIncrease = chosenPet.level * 6.4;
		if (player === computer) {
			chosenPet.energy -= 4;
			chosenPet.exp += expIncrease / 4;
			if (chosenPet.exp >= chosenPet.expNeeded) {
				chosenPet.increaseLevel()
			}
			updateBars(chosenPet);
			return 'Draw';
		}

		if (
			(player === 'Rock' && computer === 'Scissors') ||
			(player === 'Paper' && computer === 'Rock') ||
			(player === 'Scissors' && computer === 'Paper')
		) {
			let randomCoin = Math.floor(Math.random() * 11 + 7)
			chosenPet.coinAmount += randomCoin;
			chosenPet.exp += expIncrease;
			if (chosenPet.exp > chosenPet.expNeeded) {
				chosenPet.increaseLevel()
			} 


			chosenPet.energy -= 4;
			chosenPet.happiness += 2;
			if (chosenPet.happiness > chosenPet.maxHappiness) {
				chosenPet.happiness = chosenPet.maxHappiness;
			}
			updateBars(chosenPet);
			return 'Win';
		}

		chosenPet.energy -= 4;
		chosenPet.happiness -= 5;

		updateBars(chosenPet);
		return 'Lose';
	}

	function gameRPS(event) {
		const humanMove = getPlayerChoice(event);
		const computerMove = getComputerChoice();
		const result = playRound(humanMove, computerMove, chosenPet, updateBars);
		const gameResults = document.createElement('div');
		gameResults.setAttribute('class', 'gameResults');
		const gameChoicesRPS = document.createElement('div');

		gameBtns.style.display = 'flex';

		if (result == 'Win' || result === 'Lose') {
			gameResults.textContent = `Player choice: ${humanMove}, Computer choice: ${computerMove}.
			You ${result}`;
		} else {
			gameResults.textContent = ` Player choice: ${humanMove}, Computer choice: ${computerMove}.
			It's a draw!`;
		}
		const resultsPopUp = document.createElement('div');
		resultsPopUp.setAttribute('class', 'stat popUp results');

		resultsPopUp.appendChild(gameChoicesRPS);
		resultsPopUp.appendChild(gameResults);
		container.appendChild(resultsPopUp);

		endGame(chosenPet);

		console.log(`You: ${humanMove} | Computer: ${computerMove} → ${result}`);
	}
	playerRock.addEventListener('click', gameRPS);
	playerPaper.addEventListener('click', gameRPS);
	playerScissors.addEventListener('click', gameRPS);
}

export { rockPaperScissors };
