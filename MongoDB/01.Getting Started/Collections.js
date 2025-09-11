    
    // Create collection
    db.createCollection("students")

    // Insert document
    db.students.insertOne({ name: "Rahul", age: 22, course: "CS" })
