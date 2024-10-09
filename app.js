const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const customerModel = require("./models/customers");
const prompt = require("prompt-sync")();
mongoose.connect(process.env.MONGODB_URI);

const selectOperation = () => {
  console.log("1. Create a customer");
  console.log("2. View all customers");
  console.log("3. Update a customer");
  console.log("4. Delete a customer");
  console.log("5. Quit");

  const userOption = prompt("Number of action to run:");
  console.log(`You selected option ${userOption}.`);

  if (userOption === "1") {
    createOperation();
  } else if (userOption === "2") {
    readOperation();
  } else if (userOption === "3") {
    updateOperation(); 
  } else if (userOption === "4") {
    deleteOperation();
  } else if (userOption === "5") {
    mongoose.connection.close();
    process.exit(0);
  } else {
    selectOperation();
  }
};

const createOperation = async () => {
  console.log("Create a customer");
  const name = prompt("What is the customers name?");
  const age = prompt("What is the customers age?");
  await customerModel.create({
    name: name,
    age: age,
  });
  selectOperation();
};


const readOperation = async () => {
    console.log("Below is a list of customers");
    const listCustomers = await customerModel.find({}); 
    listCustomers.forEach((customer) => {
      console.log(`id: ${customer.id} --- Name: ${customer.name}, Age: ${customer.age}`);
    })
    selectOperation();
};

const updateOperation = async () => {
    console.log("update");
    const listCustomers = await customerModel.find({}); 
    listCustomers.forEach((customer) => {
      console.log(`id: ${customer.id} --- Name: ${customer.name}, Age: ${customer.age}`);
    });
    const id = prompt("What is the id of the customer you want to update?");
    const name = prompt("What is the customers new name?");
    const age = prompt("What is the customers new age?");
    await customerModel.findByIdAndUpdate(id, {
      name: name,
      age: age,
    });
    selectOperation();
  };

const deleteOperation = async () => {
    console.log("delete");
    const listCustomers = await customerModel.find({}); 
    listCustomers.forEach((customer) => {
      console.log(`id: ${customer.id} --- Name: ${customer.name}, Age: ${customer.age}`);
    });
    const id = prompt("What is the id of the customer you want to delete?");
    await customerModel.findByIdAndDelete(id);
    selectOperation();
}

selectOperation();
