

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
    new foods('Steak', 12, 6, true, 9, 2, 3),
    new foods('Chocolate', 2, 10, false, 7, 4, 4),
    new foods('Fish', 9, 9, true, 7, 7, 5),
    new foods('Kebab', 9, 8, true, 7, 6, 0),
    new foods('Chips', 9, 9, true, 9, 12, 0)
];

const drinkItems = [
    new drinks('Milk', 5, 5, true,5, 0, 1),
    new drinks('Water', 2, 2, true, 8, 0, 0),
    new drinks('Coffee', 1, 6, true, 2, 2, 5),
    new drinks('Milkshake', 10, 9, false, 5, 5, 2),
    new drinks('Cola', 5, 12, false, 8, 7, 3),
    new drinks('Squash',6, 9, true, 2, 8, 1),
    new drinks('Tea', 1, 2, false, 3, 4, 4)
]





export {foods, foodItems, drinks, drinkItems};

