const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')  // it convert application open api (everyone access it) third party middleware
const app = express();

const taskRouter = require('./routers/task-route')

// database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "task_app_DB"
})

db.connect((error) => {
    if (error) {
        console.log("Failed to connect to the database");
    } else {
        console.log("Successfully Connected to DB");
    }
})

//Middlewares
app.use(bodyParser.json())
app.use(cors())

//Register  Routes
app.use('/api', taskRouter)

// Listener
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`))









////Create the tasks
// app.post("/api/task/create", (req, res) => {
//     let details = {
//         title: req.body.title,
//         description: req.body.description,
//         dueDate:`${format(req.body.dueDate, "yyyy-MM-dd")}`,
//         status: req.body.status
//     };
//     let sql = "INSERT INTO tasks SET ?";
//     db.query(sql, details, (error) => {
//         if (error) {
//             res.send({ status: false, message: error });
//         } else {
//             res.send({ status: true, message: "Task Created Successfully" });
//         }
//     });
// });

////display the Tasks
// app.get("/api/task", (req, res) => {
//     let sql = "SELECT * FROM tasks";
//     db.query(sql, (error, result) => {
//         if (error) {
//             console.log("Unable to show the data");
//         } else {
//             res.send({ status: true, data: result });
//             // console.log(result);
//         }
//     });
// });


////Search the tasks
// app.get("/api/task/:id", (req, res) => {
//     let taskid = req.params.id;
//     let sql = "SELECT * FROM tasks WHERE id=" + taskid;
//     db.query(sql, (error, result) => {
//         if (error) {
//             console.log("Unable to find the data");
//         } else {
//             res.send({ status: true, data: result });
//         }
//     });
// });

// //Update the tasks
// app.put("/api/task/update/:id", (req, res) => {
//     let sql =
//         "UPDATE tasks SET title='" + req.body.title +
//         "', description='" + req.body.description +
//         "',dueDate='" + `${format(req.body.dueDate, "yyyy-MM-dd")}` +
//         "',status='" + req.body.status +
//         "'  WHERE id=" + req.params.id;

//     let update_Query = db.query(sql, (error, result) => {
//         if (error) {
//             res.send({ status: false, message: "Failed to update the task" });
//         } else {
//             res.send({ status: true, message: "Task Updated successfully" });
//         }
//     });
// });

// //Delete the tasks
// app.delete("/api/task/delete/:id", (req, res) => {
//     let sql = "DELETE FROM tasks WHERE id=" + req.params.id + "";
//     let delete_Query = db.query(sql, (error) => {
//         if (error) {
//             res.send({ status: false, message: "Failed to delete the task" });
//         } else {
//             res.send({ status: true, message: "Task Deleted successfully" });
//         }
//     });
// });

