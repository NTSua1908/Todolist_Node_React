const Task = require("../models/TodoList");

class TodoListController {
  async getAll(req, res, next) {
    const page = parseInt(req.query.page) || 0;
    const amount = parseInt(req.query.amount) || 10;

    await Task.find()
      .skip(page * amount)
      .limit(amount)
      .exec()
      .then((result) => {
        res.status(200).json({ tasks: result });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  async create(req, res, next) {
    const { name, description } = req.body;
    const newTask = new Task({
      name,
      description,
      isDone: false,
    });
    await newTask
      .save()
      .then(() => {
        res.status(201).json({ newTask });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  async update(req, res, next) {
    const _id = req.params.id;
    const { name, description } = req.body;
    await Task.findOneAndUpdate(
      { _id },
      {
        name,
        description,
      }
    )
      .then(() => {
        res.status(200).json({ name, description });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }

  async delete(req, res, next) {
    const _id = req.params.id;
    await Task.deleteOne({ _id })
      .then(() => {
        res.status(200).json();
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }

  async toggleDoneTask(req, res, next) {
    const _id = req.params.id;
    let task = await Task.findOne({ _id });
    task.isDone = !task.isDone;
    await task
      .save()
      .then(() => {
        res.status(200).json(task);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
}

module.exports = new TodoListController();
