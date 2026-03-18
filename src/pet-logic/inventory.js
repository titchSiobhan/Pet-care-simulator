import { shopItemList, itemData } from './shop.js';
import { resetButtons, updateBars } from './ui.js';
import { saveGame } from './gamePlay.js';

function addStock(pet, name, amount = 1) {
	const current = pet.inventory.get(name) || 0;
	pet.inventory.set(name, current + amount);
}

//remove item
//decreases quantity or deletes item
function removeStock(pet, name, amount = 1) {
	const current = pet.inventory.get(name) || 0;
	if (current <= amount) {
		pet.inventory.delete(name);
	} else {
		pet.inventory.set(name, current - amount);
	}
}

//connect to shop
function shop(chosenPet) {
	const game = document.querySelector('.game');
	const btnContainer = document.querySelector('.btnContainer');

	shopItemList.forEach((item) => {
		const shopItem = document.createElement('button');
		shopItem.setAttribute('class', 'btn shopBtn itemBtn');
		shopItem.textContent = `${item.name}: - ${item.cost} coins`;

		shopItem.addEventListener('click', () => {
			buyItem(item, chosenPet);
			resetButtons(); //re adds base buttons and should delete back button
			setUpShop(); //removes all shop items
			updateBars(chosenPet);
		});
		btnContainer.appendChild(shopItem);
		game.appendChild(btnContainer);
	});
}

//buying from shop
//check to see if enough coins
//take coins away
function buyItem(item, chosenPet) {
	const game = document.querySelector('.game');
	if (chosenPet.coinAmount >= item.cost) {
		chosenPet.coinAmount -= item.cost;
		addStock(chosenPet, item.name);
		saveGame(chosenPet);
	} else {
		const popUp = document.createElement('div');
		popUp.textContent = `You have ${chosenPet.coinAmount} coins, ${item.name} costs ${item.cost} coins`;
		game.appendChild(popUp);
		popUp.setAttribute('class', 'popUp');

		setTimeout(() => {
			game.removeChild(popUp);
		}, 1000);
	}
}

//show items

function showInventory(chosenPet) {
	chosenPet.inventory.forEach((quantity, name) => {
		const btnContainer = document.querySelector('.btnContainer');

		const inventoryItem = document.createElement('button');
		inventoryItem.setAttribute('class', 'inventoryItem btn itemBtn');
		inventoryItem.textContent = `${name}: x${quantity}`;
		btnContainer.appendChild(inventoryItem);

		inventoryItem.addEventListener('click', () => {
			const item = itemData[name];
			item.use(chosenPet);
			removeStock(chosenPet, name);
			updateBars(chosenPet);
			saveGame(chosenPet);

			setUpItems();
			resetButtons();
		});
	});
}

function setUpItems() {
	const btnContainer = document.querySelector('.btnContainer');
	const inventoryItems = document.querySelectorAll('.inventoryItem');
	inventoryItems.forEach((btn) => {
		btnContainer.removeChild(btn);
	});
}

function setUpShop() {
	const btnContainer = document.querySelector('.btnContainer');
	const shopItemBtns = document.querySelectorAll('.shopBtn');
	shopItemBtns.forEach((btn) => {
		btnContainer.removeChild(btn);
	});
}

export { shop, showInventory, setUpItems, setUpShop };
