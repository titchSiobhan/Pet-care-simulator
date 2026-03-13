
const petList = [];

class petChoice {
    constructor(name, img) {
        this.name = name;
        this.img = img;
    }


}

const purpleFrog = new petChoice('frog', './images/frog.png')

const cat = new petChoice('cat', 'catImg')

const Chicken = new petChoice('chicken', 'chickenImg')

const pig = new petChoice('pig', 'pigImg')
const dog = new petChoice('dog', 'dogImg')

petList.push(purpleFrog, cat, Chicken, pig, dog)

export {petList}