const sales = db.collection("sales");
const pipeline = [
    { $match: { status: "A" } },
    { $group: { _id: "$item", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } }
];

const aggCursor = sales.aggregate(pipeline);
await aggCursor.forEach(doc => console.log(doc));