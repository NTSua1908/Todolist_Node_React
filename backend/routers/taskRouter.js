const express = require("express");
const todoListController = require("../controllers/TodoListController");
const router = express.Router();

router.get("/GetAll", todoListController.getAll);
router.post("/Create", todoListController.create);
router.put("/Update/:id", todoListController.update);
router.delete("/Delete/:id", todoListController.delete);
router.delete("/ToggleDoneTask/:id", todoListController.toggleDoneTask);

module.exports = router;
