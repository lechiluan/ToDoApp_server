//import mongoose to create new schema
const mongoose = require("mongoose");
const {User} = require("./user")

//create Schema
const TodoItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  }
});

//export this Schema
module.exports = mongoose.model("todo", TodoItemSchema);
