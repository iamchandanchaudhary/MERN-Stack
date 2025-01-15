// Constructor => dosen't return anything & Start eith Capital latter
    function Student(name, age) {
        this.name = name,
        this.age = age
    }

    Student.prototype.talk = () =>{
        console.log(`Hello, my name is ${this.name}`);
    }

    let stu1 = new Student("Chandan", 18);

    console.log(stu1);
    console.log(stu1.talk());