import { updateBars, endGame} from './ui';



function rockPaperScissors(chosenPet) {
	const container = document.createElement('div');
	container.setAttribute('class', 'container');

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

	container.appendChild(playerRock);
	container.appendChild(playerPaper);
	container.appendChild(playerScissors);

	const rock = document.querySelector('.rock');
	const paper = document.querySelector('.paper');
	const scissors = document.querySelector('.scissors');

	function getPlayerChoice(event) {
        container.removeChild(playerRock);
	container.removeChild(playerPaper);
	container.removeChild(playerScissors);
		return event.target.textContent; // "Rock", "Paper", or "Scissors"
	}

	function playRound(player, computer, chosenPet, updateBars) {
    if (player === computer) {
        chosenPet.energy -= 4;
        updateBars(chosenPet);
        return "Draw";
    }

    if (
        (player === 'Rock' && computer === 'Scissors') ||
        (player === 'Paper' && computer === 'Rock') ||
        (player === 'Scissors' && computer === 'Paper')
    ) {
        chosenPet.coinAmount += 4;
        chosenPet.exp += 6;
        chosenPet.energy -= 4;
        updateBars(chosenPet);
        return "Win";
    }

    chosenPet.energy -= 4;
    updateBars(chosenPet);
    return "Lose";
}

	function gameRPS(event) {
		const humanMove = getPlayerChoice(event);
		const computerMove = getComputerChoice();
		const result = playRound(humanMove, computerMove, chosenPet, updateBars);
		const gameResults = document.createElement('div');
		gameResults.setAttribute('class', 'stat');
		const gameChoicesRPS = document.createElement('div');
		gameChoicesRPS.setAttribute('class', 'stat');
		gameChoicesRPS.textContent = `Player choice: ${humanMove}, Computer choice: ${computerMove}`;
		if (result == 'Win' || result === 'Lose') {
			gameResults.textContent = `You ${result}`;
		} else {
			gameResults.textContent = "It's a draw!";
		}
		container.appendChild(gameChoicesRPS);
		container.appendChild(gameResults);

		endGame(chosenPet);

		console.log(`You: ${humanMove} | Computer: ${computerMove} → ${result}`);
	}
	playerRock.addEventListener('click', gameRPS);
	playerPaper.addEventListener('click', gameRPS);
	playerScissors.addEventListener('click', gameRPS);
}

export { rockPaperScissors };
