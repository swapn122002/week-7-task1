const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3000; 

const Task = require('./models/studentTasks');
require('./db/conn');


app.use(cors());
app.use(bodyParser.json());




app.post('/tasks',async(req,res)=>{
  try{
    const addingtaskData = new Task(req.body);
    const insertData = await addingtaskData.save();
    console.log(insertData);
    res.status(201).send(insertData);
  }
  catch(e){
    console.log(e);
    res.status(500).json({error: 'Error creating task'});
  }
});


app.get('/tasks/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const tasks = await Task.find({ courseId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => console.log(`Server is running on port ${port}`));