const mongoose =require('mongoose')

const courseSchema = new mongoose.Schema({
  
  courseName: String,

});

const taskSchema = new mongoose.Schema({
  courseId: String,
  taskName: String,
  dueDate: Date,
  details: String,
  
});

const Course = mongoose.model('Course', courseSchema);
const Task = mongoose.model('Task', taskSchema);

module.exports = Course;
module.exports = Task;