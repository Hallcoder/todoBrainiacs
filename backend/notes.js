const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const { todoSchema } = require("../models/todos");
router.post("/create", async (req, res) => {
 try {
    const todo = new todoSchema({
        title: req.body.title,
      });
      await todo.save();
      res.send(todo);
 } catch (error) {
     res.send(error.message);
 }
});
router.put("/:id", async (req, res) => {
  try {
    const todo = await todoSchema.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
    });
    await todo.save();
    res.status(200).json({
      message: "Updated successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
router.delete('/:id',async(req,res) => {
    try {
        const todo = await todoSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message:'Deleted successfully',
        status:'success'
    })
    } catch (error) {
        console.log('Error:',error);
        res.send(error.message);
    }
})

module.exports = router;
