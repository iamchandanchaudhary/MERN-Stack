
    // Insert one document
    db.students.insertOne({
        name: "Chandan",
        age: 19,
        course: "BCA"
    });

    // Insert multiple documents
    db.students.insertMany([
        { name: "Deepanshu", age: 23, course: "MCA" },
        { name: "Ayush", age: 21, course: "B.Tech" }
    ]);

    // Find all documents
    db.students.find();

    // Find one document
    db.students.findOne({ name: "Chandan" });

    // Find with condition (age > 21)
    db.students.find({ age: { $gt: 21 } });

    // Find specific fields (only name, no _id)
    db.students.find({}, { name: 1, _id: 0 });
    
