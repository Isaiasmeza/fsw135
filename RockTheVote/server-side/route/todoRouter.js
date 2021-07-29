const express = require("express")
const todo = require("../models/todo")
const todoRouter = express.Router()
todoRouter.get("/", (req, res, next) => {
    todo.find((err, rockthevote) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(rockthevote)
    })
  })
 

todoRouter.get("/:todoId", (req, res, next) => {
    todo.findOne({ _id: req.params.todoId }, (err, rockthevote) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(rockthevote)
    })
})

todoRouter.post("/", (req, res, next) => {
    const newtodo = new todo(req.body)
    newtodo.save((err, savetodo) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savetodo)
    })
})
todoRouter.delete("/:todoId", (req, res, next) => {
    todo.findOneAndDelete(
      {_id: req.params.todoId},
      (err, deleteItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deleteItem.topic}`)
      }
    )
  })



todoRouter.put("/:todoId", (req, res, next) => {
    todo.findOneAndUpdate(
        { _id: req.params.todoId},
        req.body,
        {new: true},
        (err,updatetodo) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatetodo)
    }
    )
})
module.exports = todoRouter
