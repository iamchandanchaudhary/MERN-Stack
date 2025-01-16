// Constructor => dosen't return anything & Start eith Capital latter
    function Student(name, age) {
        this.name = name,
        this.age = age
    }

    Student.prototype.talk = () => {
        return `Hello, my name is ${this.name}`;
    }

    let stu1 = new Student("Chandan", 18);
    let stu2 = new Student("Aman", 21);

    console.log(stu1);
    console.log(stu2);
    console.log(stu1.talk());

    let comparision = (stu1.talk === stu2.talk);
    console.log("Comparision b/w same Function:", comparision);