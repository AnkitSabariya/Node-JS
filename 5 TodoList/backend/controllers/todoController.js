const Todo = require("../models/model");

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Add a todo
exports.addTodo = async (req, res) => {
  try {
    const { todo } = req.body;

    if (!todo) {
      return res.status(400).json({ message: "Todo required" });
    }

    const exists = await Todo.findOne({ todo });
    if (exists) {
      return res.status(400).json({ message: "Todo already exists" });
    }

    const newTodo = await Todo.create({ todo });
    res.status(201).json({
      message: "Todo added successfully",
      success: true,
      newTodo
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { todo } = req.body;

    if (!todo) {
      return res.status(400).json({ message: "Todo required" });
    }

    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      { todo },
      { new: true }
    );

    if (!updateTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", success: true, updateTodo });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully", success: true, deletedTodo });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};
