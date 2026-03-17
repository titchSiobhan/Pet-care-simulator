// add items

// toys

// special food

// special drinks

// medicines 
let shopItemList = [];

class shopItems {
    constructor(name, category, cost, hungerPercent, healthPercent , energyPercent, happinessPercent) {
        this.name = name;
        this.category = category;
        this.cost = cost;
        this.healthPercent = healthPercent ;
        this.hungerPercent = hungerPercent;
        this.energyPercent = energyPercent;
        this.happinessPercent = happinessPercent;
    }

    use(pet) {
        const healthAmount = (pet.maxHealth * this.healthPercent) / 100
        pet.health = Math.min(pet.health + healthAmount, pet.maxHealth);

        const hungerAmount = (pet.maxHunger * this.hungerPercent) / 100
        pet.hunger = Math.min(pet.hunger + hungerAmount, pet.maxHunger);

        const energyAmount = (pet.maxEnergy * this.energyPercent) / 100
        pet.energy = Math.min(pet.energy + energyAmount, pet.maxEnergy);

        const happinessAmount = (pet.maxHappiness * this.happinessPercent) / 100
        pet.happiness = Math.min(pet.happiness + happinessAmount, pet.maxHappiness);
    }
}

const miniEnergy = new shopItems ('Mini Energy', 'drink', 10, 0, 0, 50, 0 );
const megaEnergy = new shopItems ('Mega Energy', 'drink', 25, 0, 0, 100, 0);
const miniHunger = new shopItems ('Mini Hunger', 'drink', 13, 50, 0, 0, 0);
const megaHunger = new shopItems ('Mega Hunger', 'drink', 19, 100, 0, 0, 0);
const miniHealth = new shopItems ('Mini Health', 'drink', 15,  0, 50, 0, 0);
const megaHealth = new shopItems ('Mega Health', 'drink', 25, 0, 100, 0, 0);
const miniHappiness = new shopItems ('Mini Happiness', 'drink', 20, 0, 0, 0, 50);
const megaHappiness = new shopItems ('Mega Happiness', 'drink', 70, 0 , 0, 0, 100)

shopItemList.push(miniEnergy, megaEnergy, miniHunger, megaHunger, miniHealth, megaHealth, miniHappiness, megaHappiness);

const itemData = {
    'Mini Energy': miniEnergy,
    'Mega Energy': megaEnergy,
    'Mini Hunger': miniHunger,
    'Mega Hunger': megaHunger,
    'Mini Health': miniHealth,
    'Mega Health': megaHealth,
    'Mini Happiness': miniHappiness,
    'Mega Happiness': megaHappiness
}



export { shopItemList, itemData }