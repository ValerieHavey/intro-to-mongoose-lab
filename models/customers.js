const mongoose = require('mongoose');

//Define the customer model with the following fields:
// 1) Define the schema
// 2. Compile the schema into a model  
// 3. Export the model 

const customerModelSchema = new mongoose.Schema ({
    name: String,
    age: Number,
});

// Let's compile the schema into a model

const customerModel = mongoose.model('Customer', customerModelSchema);

//Lastly, let's export the compiled model

module.exports = customerModel;