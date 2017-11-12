class Person {
    constructor(name) {
        this.name = name;
    }

    hello() {
        if (typeof this.name === 'string') {
            console.log(`Hello, I am ${this.name} !`);
        } else {
            return 'Hello';
        }
    }
}

var person = new Person('nameOfPerson');
document.write(person.hello());