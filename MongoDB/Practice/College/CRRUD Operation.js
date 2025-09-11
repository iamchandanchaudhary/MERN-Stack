
    // ==> CRUD Operations using MongoDB

    // ==> Create
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

    // ==> Read
    // Find all documents
    db.students.find();

    // Find one document
    db.students.findOne({ name: "Chandan" });

    // Find with condition (age > 20)
    db.students.find({ age: { $gt: 20 } });

    // Find specific fields (only name, no _id)
    db.students.find({}, { name: 1, _id: 0 });

    // ==> Update
    // Update one document
    db.students.updateOne(
        { name: "Chandan" },         // filter
        { $set: { age: 20 } }      // update
    );

    // Update multiple documents
    db.students.updateMany(
        { course: "BCA" },
        { $set: { course: "BCA - Honors" } }
    );

    // Replace a whole document
    db.students.replaceOne(
        { name: "Deepanshu" },
        { name: "Deepanshu", age: 22, course: "M.Tech" }
    );

    // ==> Delete
    // Delete one document
    db.students.deleteOne({ name: "Ayush" });

    // Delete multiple documents
    db.students.deleteMany({ age: { $lt: 22 } });
