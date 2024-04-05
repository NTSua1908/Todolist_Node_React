const express = require("express");
const role = require("../common/enum/Role.enum");
const todoListController = require("../controllers/TodoListController");
const router = express.Router();
const authJWT = require("../middleware/auth");

router.get(
  "/GetAll",
  [authJWT.verifyToken, authJWT.verifyRoles([role.USER])],
  todoListController.getAll
);
router.post(
  "/Create",
  [authJWT.verifyToken, authJWT.verifyRoles([role.USER])],
  todoListController.create
);
router.put(
  "/Update/:id",
  [authJWT.verifyToken, authJWT.verifyRoles([role.USER])],
  todoListController.update
);
router.delete(
  "/Delete/:id",
  [authJWT.verifyToken, authJWT.verifyRoles([role.USER])],
  todoListController.delete
);
router.delete(
  "/ToggleDoneTask/:id",
  [authJWT.verifyToken, authJWT.verifyRoles([role.USER])],
  todoListController.toggleDoneTask
);

module.exports = router;
