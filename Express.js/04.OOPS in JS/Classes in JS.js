class Student {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }

    talk() {
        console.log(`Hello, i'm ${this.name}`);
    }
}

let stu1 = new Student("Chandan", 18);
let stu2 = new Student("Aman", 19);

console.log(stu1);
console.log(stu1.name);
stu1.talk();

let comparision = (stu1.talk === stu2.talk);
console.log("Comparision b/w same Function:", comparision);