const express = require('express')
const router = express.Router();
const taskController = require('../controllers/task-controller')

//Create the tasks
router.post("/task/create",taskController.CreateTask);

//display the Tasks
router.get("/task",taskController.GetTask);

//Search the tasks
router.get("/task/:id",taskController.GetTaskByID);

//Update the tasks
router.put("/task/update/:id",taskController.UpdateTask);

//Delete the tasks
router.delete("/task/delete/:id",taskController.DeleteTask);


module.exports = router;