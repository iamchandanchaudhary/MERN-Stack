// Parent Class
class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
        
        this.look = "smart";
    }
    talk() {
        return `Hello, i'm ${this.name}.`;
    }
}

// Inheriting
class Student extends Person { // Child class
    constructor (name, age, marks) {
        super(name, age);  // parent class constructor is being called
        this.marks = marks;
    }
}

class Teacher extends Person {
    constructor (name, age, subject) {
        super(name, age);  // parent class constructor is being called
        this.subject = subject;
    }
}

let stu1 = new Student("Chandan", 18, 95);
let stu2 = new Student("Aman", 21, 87);

let teacher1 = new Teacher("Adom", 25, "JS");
let teacher2 = new Teacher("Evea", 23, "ML");

console.log("Student 1:", stu1);
console.log("Name:", stu1.name);
console.log("Marks:", stu1.marks);
console.log("Talk:", stu1.talk());

console.log("Teacher 1:", teacher1);
console.log("Name:", teacher1.name);
console.log("Subject:", teacher1.subject);
console.log("Talk:", teacher1.talk());
