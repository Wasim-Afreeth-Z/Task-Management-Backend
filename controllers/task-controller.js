const { format } = require('date-fns')
const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "task_app_DB"
})

//Create the tasks
const CreateTask = (req, res) => {
    let details = {
        title: req.body.title,
        description: req.body.description,
        dueDate:`${format(req.body.dueDate, "yyyy-MM-dd")}`,
        status: req.body.status,
        completetask: req.body.completetask
    };
    let sql = "INSERT INTO tasks SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: error });
        } else {
            res.send({ status: true, message: "Task Created Successfully" });
        }
    });
}

//display the Tasks
const GetTask = (req, res) => {
    let sql = "SELECT * FROM tasks";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to show the data");
        } else {
            res.send({ status: true, data: result });
            // console.log(result);
        }
    });
}

//Search the tasks
const GetTaskByID=  (req, res) => {
    let taskid = req.params.id;
    let sql = "SELECT * FROM tasks WHERE id=" + taskid;
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to find the data");
        } else {
            res.send({ status: true, data: result });
        }
    });
}

//Update the tasks
const UpdateTask =  (req, res) => {
    let sql =
        "UPDATE tasks SET title='" + req.body.title +
        "', description='" + req.body.description +
        "',dueDate='" + `${format(req.body.dueDate, "yyyy-MM-dd")}` +
        "',status='" + req.body.status +
        "',completetask='" + req.body.completetask +
        "'  WHERE id=" + req.params.id;

    let update_Query = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Failed to update the task" });
        } else {
            res.send({ status: true, message: "Task Updated successfully" });
        }
    });
}

//Delete the tasks
const DeleteTask =  (req, res) => {
    let sql = "DELETE FROM tasks WHERE id=" + req.params.id + "";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Failed to delete the task" });
        } else {
            res.send({ status: true, message: "Task Deleted successfully" });
        }
    });
}

module.exports={
    CreateTask,
    GetTask,
    GetTaskByID,
    UpdateTask,
    DeleteTask
}