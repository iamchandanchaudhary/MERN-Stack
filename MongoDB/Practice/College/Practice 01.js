
    // Insert one document
    db.students.insertOne({
        name: "Alice",
        age: 22,
        course: "BCA"
    });

    // Insert multiple documents
    db.students.insertMany([
        { name: "Bob", age: 23, course: "MCA" },
        { name: "Charlie", age: 21, course: "B.Tech" }
    ]);
