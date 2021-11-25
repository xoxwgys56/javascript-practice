function Animal(type, name, sound) {
    this.type = type;
    this.name = name;
    this.sound = sound;
}

Animal.prototype.say = function() {
    console.log(this.sound);
};
Animal.prototype.sharedValue = 1;

const dog = new Animal("dog", "happy", "wah");
const cat = new Animal("cat", "nabi", "mya-ong");

dog.say(); console.log(dog.sharedValue);
cat.say(); console.log(cat.sharedValue);