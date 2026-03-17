

class foods {
    constructor(food, giveHunger, giveExp, healthPoints, giveHealth, levelNeeded, energyGiven) {
        this.food = food;
        this.giveHunger = giveHunger;
        this.giveExp = giveExp;
        this.giveHealth = giveHealth;
        this.healthPoints = healthPoints;
        this.levelNeeded = levelNeeded;
        this.energyGiven = energyGiven;
    }
     
}
class drinks {
    constructor(drink, giveHunger, giveExp, healthPoints, giveHealth, levelNeeded, energyGiven) {
        this.drink = drink;
        this.giveHunger = giveHunger;
        this.giveExp = giveExp;
        this.giveHealth = giveHealth;
        this.healthPoints = healthPoints;
        this.levelNeeded = levelNeeded;
        this.energyGiven = energyGiven
    }
     
}

const foodItems = [
    
    new foods('Cake', 20, 9, false, 2, 0, 10),
    new foods('Carrot', 7, 9, true, 6, 0, 0),
    new foods('Banana', 7, 9, true, 4, 0, 0),
    new foods('Cheese', 10, 12, true, 9, 2, 0),
    new foods('Steak', 12, 6, true, 9, 3, 4),
    new foods('Chocolate', 2, 10, false, 7, 5, 4),
    new foods('Fish', 9, 9, true, 7, 7, 5),
    new foods('Kebab', 9, 8, true, 7, 6, 0),
    new foods('Chips', 9, 9, true, 9, 12, 10),
    new foods ('Apple', 7,8, true, 5, 1, 3)
];

const drinkItems = [
    new drinks('Milk', 5, 5, true,5, 0, 1),
    new drinks('Water', 2, 2, true, 8, 0, 0),
    new drinks('Coffee', 1, 6, true, 2, 2, 5),
    new drinks('Milkshake', 10, 9, false, 5, 5, 2),
    new drinks('Cola', 5, 12, false, 8, 7, 5),
    new drinks('Squash',6, 9, true, 2, 8, 1),
    new drinks('Tea', 1, 2, false, 3, 4, 4),
    new drinks('Green Tea', 4, 12, true, 10, 9, 10)
]





export {foods, foodItems, drinks, drinkItems};

