const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const customerModel = require("./models/customers");
const prompt = require("prompt-sync")();
mongoose.connect(process.env.MONGODB_URI);

const selectOperation = () => {
  console.log("1. Create");
  console.log("2. Read");
  console.log("3. Update");
  console.log("4. Delete");
  console.log("5. Quit");

  const userOption = prompt("Number of action to run:");
  console.log(`You selected option ${userOption}.`);

  if (userOption === "1") {
    createOperation();
  } else if (userOption === "5") {
    process.exit(0);
  } else {
    selectOperation();
  }
};

const createOperation = async () => {
  console.log("create");
  const name = prompt("What is the customers name?");
  const age = prompt("What is the customers age?");
  await customerModel.create({
    name: name,
    age: age,
  });
  selectOperation();
};



selectOperation();

// const createCustomerModel = async ()  => {
//     const customerModelData = {
//         name: "Customer Model",
//         age:
//     };
//     const
// }
