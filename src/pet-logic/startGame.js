import { petStats } from "./petStats.js";

function startGame() {
    const button = document.createElement('button');
button.setAttribute('class', 'btn start');
button.textContent = 'Get new pet';
game.appendChild(button);
}

function startForm() {
    const formPopup = document.createElement('div');
    formPopup.setAttribute('class', 'formPopup');

    const form = document.createElement('form');
    form.setAttribute('class', 'form');

    const nameBox = document.createElement('input');
    nameBox.setAttribute('type', 'textbox');
    nameBox.setAttribute('class', 'newName');
    nameBox.setAttribute('id', 'newName')

    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('class', 'submitBtn')
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