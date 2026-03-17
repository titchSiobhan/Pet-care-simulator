



import { saveGame, loadGame } from './gamePlay.js';
import { gamePlay } from './gamePlay.js';
import { choseRandomPet } from '../index.js';
import { petList } from './petTypes.js';

function startGame(chosenPet) {
    const game = document.querySelector('.game');
    
    // New Game button
    const newGameButton = document.createElement('button');
    newGameButton.setAttribute('class', 'btn start');
    newGameButton.setAttribute('id', 'newGameBtn');
    newGameButton.textContent = 'Get new pet';
    game.appendChild(newGameButton);

    // Load Game button
    const loadGameButton = document.createElement('button');
    loadGameButton.setAttribute('class', 'btn load ');
    loadGameButton.setAttribute('id', 'loadGameBtn');
    loadGameButton.textContent = 'Load saved pet';
    game.appendChild(loadGameButton);

    newGameButton.addEventListener('click', () => {
        console.log('New game clicked!');
        startForm();
        newGameButton.style.display = 'none';
        loadGameButton.style.display = 'none';

        const submitBtn = document.querySelector('#submitBtn');
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Submit clicked!');
            gamePlay();
        });
    });

    loadGameButton.addEventListener('click', () => {
        const loadedPet = loadGame();
        if (loadedPet) {
            chosenPet =loadedPet
            console.log('Loading saved pet:', loadedPet);
            newGameButton.style.display = 'none';
            loadGameButton.style.display = 'none';
            gamePlay(chosenPet); // This will load the pet inside gamePlay
        } else {
            alert('No saved game found!');
            
        }
    });
}

function startForm() {
    const formPopup = document.createElement('div');
    formPopup.setAttribute('class', 'formPopup');

    const form = document.createElement('form');
    form.setAttribute('class', 'form');
    formPopup.setAttribute('id', 'form')

    const nameBox = document.createElement('input');
    nameBox.setAttribute('type', 'textbox');
    nameBox.setAttribute('class', 'newName');
    nameBox.setAttribute('id', 'newName');
    nameBox.setAttribute('maxLength', 15)

    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('class', 'submitBtn btn')
    submit.setAttribute('id', 'submitBtn')
    submit.textContent = 'Name Pet'
    
    game.appendChild(formPopup)

formPopup.appendChild(form)
    form.appendChild(nameBox);
    form.appendChild(submit)
    return {form, nameBox, submit}
}



export {
    startGame, startForm
}