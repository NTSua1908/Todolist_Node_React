const Task = require("../models/TodoList");

class TodoListController {
  async getAll(req, res, next) {
    let page = parseInt(req.query.page) || 0;
    let amount = parseInt(req.query.amount) || 10;
    const user = req.id;

    page = page < 0 ? 0 : page;
    amount = amount < 0 ? 10 : amount;

    try {
      Task.find({ user })
        .skip(page * amount)
        .limit(amount)
        .exec()
        .then((results) => {
          Task.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / amount);
            res.status(200).json({
              data: results,
              currentPage: parseInt(page),
              totalPages: totalPages,
            });
          });
        });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async create(req, res, next) {
    const { name, description } = req.body;

    const user = req.id;

    const newTask = new Task({
      name,
      description,
      isDone: false,
      user,
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
    const user = req.id;

    await Task.findOneAndUpdate(
      { _id, user },
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
    const user = req.id;
    await Task.deleteOne({ _id, user })
      .then(() => {
        res.status(200).json();
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }

  async toggleDoneTask(req, res, next) {
    const _id = req.params.id;
    const user = req.id;
    let task = await Task.findOne({ _id, user });
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
