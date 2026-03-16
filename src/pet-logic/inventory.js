
import { shopItemList, itemData } from './shop.js';
import { resetButtons, updateBars } from './ui.js';

const inventory = new Map();
//add item
//creates new entry or increases quantity
function addStock(name, amount = 1) {
	const current = inventory.get(name) || 0;
	inventory.set(name, current + amount);
}

//remove item
//decreases quantity or deletes item
function removeStock(name, amount = 1) {
	const current = inventory.get(name) || 0;
	if (current <= amount) {
		inventory.delete(name);
	} else {
		inventory.set(name, current - amount);
	}
}

//check if play has item
function playerHasItem(itemName) {
	return inventory.has(itemName);
}

//get quantity
function checkQuantity(itemName) {
	return inventory.get(itemName) || 0;
}

//connect to shop
function shop(chosenPet) {
	const game = document.querySelector('.game');

	shopItemList.forEach((item) => {
		const shopItem = document.createElement('button');
		shopItem.setAttribute('class', 'btn shopBtn');
		shopItem.textContent = `${item.name}: - ${item.cost} coins`;

		shopItem.addEventListener('click', () => {
			buyItem(item, chosenPet);

			console.log(inventory);
			resetButtons(); //re adds base buttons and should delete back button
			setUpShop(); //removes all shop items
			updateBars(chosenPet);
		});
		game.appendChild(shopItem);
	});
}

//buying from shop
//check to see if enough coins
//take coins away
function buyItem(item, chosenPet) {
    const game = document.querySelector('.game')
	if (chosenPet.coinAmount >= item.cost) {
		chosenPet.coinAmount -= item.cost;
		addStock(item.name);
	} else {
        const popUp = document.createElement('div');
        popUp.textContent = `You have ${chosenPet.coinAmount} coins, ${item.name} costs ${item.cost} coins`;
        game.appendChild(popUp);

        setTimeout(() => {
            game.removeChild(popUp)
        }, 1000)
	}
}

//using item
//apply effect and removes from inventory

// function useItem(itemName, pet) {
//     if (!hasItem(itemName)) return;

// }

//show items

function showInventory(chosenPet) {
	const game = document.querySelector('.game');
	inventory.forEach((quantity, name) => {
		console.log(`${name}: x${quantity}`);
		const inventoryItem = document.createElement('button');
		inventoryItem.setAttribute('class', 'inventoryItem');
		inventoryItem.textContent = `${name}: x${quantity}`;
		game.appendChild(inventoryItem);

		inventoryItem.addEventListener('click', () => {
			const item = itemData[name];
			item.use(chosenPet);
			removeStock(name);
			updateBars(chosenPet);
			console.log(chosenPet);
            setUpItems();
			resetButtons();
			
		});
	});
}

function setUpItems() {
    const game = document.querySelector('.game');
	const inventoryItems = document.querySelectorAll('.inventoryItem');
	inventoryItems.forEach((btn) => {
		game.removeChild(btn);
	});
}

function setUpShop() {
     const game = document.querySelector('.game');
	const shopItemBtns = document.querySelectorAll('.shopBtn');
	shopItemBtns.forEach((btn) => {
		game.removeChild(btn);
	});
}

export { shop, showInventory, setUpItems, setUpShop };
