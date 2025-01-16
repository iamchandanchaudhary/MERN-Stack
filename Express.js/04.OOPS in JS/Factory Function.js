function studentInfo(name, age) {
    const student = {
        name: name,
        age: age,
        talk() {
            console.log(`Hii, my name is ${this.name}`);
        },
    }
    return student;
}

let stu1 = studentInfo("Chandan", 18); // copy
console.log(stu1);
console.log(stu1.talk());

let stu2 = studentInfo("Aman", 21); // copy
console.log(stu2);
console.log(stu2.talk());

// Disadvantage of Factory Function ==> Because it's creating another copy
let comparision = (stu1.talk === stu2.talk);
console.log("Comparision b/w same Function:", comparision);