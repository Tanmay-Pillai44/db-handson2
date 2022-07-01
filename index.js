const employeeArr = require("./employee.json");
const mongoClient = require('mongodb').MongoClient;

const connectionString = 'mongodb://127.0.0.1:27017/Human_Resource2';

mongoClient.connect(connectionString, async (err, db) => {
    if(err) {
        console.error("Error while connecting", err);
        return;
    }
    console.log("Connected to Database")
    // const database = db.db("Human_Resource2")
    // console.log(database);

    const result = await database.collection("employee").insertMany(employeeArr);
    console.log(result);

    const simpleFind = await database.collection("employee").find().toArray();
    console.log(simpleFind);

    const findWithSalary = await database.collection("employee").find({"salary": {$gt: "30000"}}).toArray();
    console.log(findWithSalary);

    const findWithExp = await database.collection("employee").find({"overallExp": {$gt: "1"}}).toArray();
    console.log(findWithExp);

    const findWithTwoConditions = await database.collection("employee").find({$and: [{"yearGrad": {$gt: "2015"}}, {"overallExp": {$gt: "1"}}]}).toArray();
    console.log(findWithTwoConditions);

    const updateSalary = await database.collection("employee").updateMany({"salary": {$gt: "30000"}}, {$set: {"salary": "28000"}});
    console.log(updateSalary);

    const deleteWithLastCompany = await database.collection("employee").deleteMany({"lastCompany": "Y"});
    console.log(deleteWithLastCompany);
})