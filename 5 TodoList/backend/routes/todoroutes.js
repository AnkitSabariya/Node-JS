const express = require("express");
const router = express.Router();
const controller = require("../controllers/todoController");

// Add a root path handler to avoid 403
router.get("/", (req, res) => {
    res.send("Todo API is running");
});

router.get("/todos", controller.getTodos);
router.post("/todos/add", controller.addTodo);
router.put("/todos/update/:id", controller.updateTodo);
router.delete("/todos/delete/:id", controller.deleteTodo);

module.exports = router;