const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['Pending', 'Done'], required: true }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


