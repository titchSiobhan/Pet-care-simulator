

class foods {
    constructor(food, giveHunger, giveExp, healthPoints, giveHealth, levelNeeded) {
        this.food = food;
        this.giveHunger = giveHunger;
        this.giveExp = giveExp;
        this.giveHealth = giveHealth;
        this.healthPoints = healthPoints;
        this.levelNeeded = levelNeeded;
    }
     
}
class drinks {
    constructor(drink, giveHunger, giveExp, healthPoints, giveHealth, levelNeeded) {
        this.drink = drink;
        this.giveHunger = giveHunger;
        this.giveExp = giveExp;
        this.giveHealth = giveHealth;
        this.healthPoints = healthPoints;
        this.levelNeeded = levelNeeded;
    }
     
}

const foodItems = [
    
    new foods('Cake', 20, 9, false, 20, 0),
    new foods('Carrot', 7, 9, true, 6, 0),
    new foods('Banana', 7, 9, true, 4, 0),
    new foods('Cheese', 10, 12, true, 9, 2),
    new foods('Steak', 12, 6, false, 9, 2),
    new foods('Chocolate', 2, 10, false, 7, 4),
    new foods('Fish', 9, 9, true, 7, 7),
    new foods('Kebab', 9, 8, true, 7, 6),
    new foods('Chips', 9, 9, true, 9, 12)
];

const drinkItems = [
    new drinks('Milk', 5, 5, true,5, 0),
    new drinks('Water', 2, 2, true, 8, 0),
    new drinks('Coffee', 1, 6, true, 2, 2),
    new drinks('Milkshake', 10, 9, false, 5, 5),
    new drinks('Cola', 5, 12, false, 8, 7),
    new drinks('Squash',6, 9, true, 2, 8),
    new drinks('Tea', 1, 2, false, 3, 4)
]





export {foods, foodItems, drinks, drinkItems};

