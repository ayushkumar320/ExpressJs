import express from "express";
const app = express();
const port = 3000;

app.use(express.json());
let taskList = [];
let taskNum = 1;

// Adding the tasks
app.post("/tasks", (req, res) => {
  const {name, time} = req.body;
  const newTask = {id: taskNum++, name, time};
  taskList.push(newTask);
  res.status(200).send(newTask);
});

// Getting all the tasks
app.get("/tasks", (req, res) => {
  res.status(200).send(taskList);
});

// Getting a task by id
app.get("/tasks/:id", (req, res) => {
  const task = taskList.find((t) => {
    return t.id === parseInt(req.params.id);
  });
  if (!task) {
    res.status(404).send("404 | No such task found!");
  } else {
    res.status(200).send(task);
  }
});

// Updating a task by id
app.put("/tasks/:id", (req, res) => {
  const taskToEdit = taskList.find((t) => t.id === parseInt(req.params.id));
  if (!taskToEdit) {
    res.status(404).send("404 | Error, task not found!");
  } else {
    const {name, time} = req.body;
    taskToEdit.name = name;
    taskToEdit.time = time;
    res.status(200).send(taskToEdit);
  }
});

// Deleteing a task with id
app.delete("/tasks/:id", (req, res) => {
  const index = taskList.findIndex((t) => {
    return t.id === parseInt(req.params.id);
  });
  if (index === -1) {
    res.status(404).send("Error finding the task");
  } else {
    taskList.splice(index, 1);
    res.status(201).send();
  }
});
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
