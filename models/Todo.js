const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  description: {
    type: String
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: Boolean,
    default: false
  },
});

mongoose.model('todos', todoSchema);
