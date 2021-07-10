const express = require("express")
const Issue = require("../models/issue")
const issueRouter = express.Router()
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, rockthevote) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(rockthevote)
    })
  })
 

issueRouter.get("/:issueId", (req, res, next) => {
    Issue.findOne({ _id: req.params.issueId }, (err, rockthevote) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(rockthevote)
    })
})

issueRouter.post("/", (req, res, next) => {
    const newIssue = new Issue(req.body)
    newIssue.save((err, saveIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(saveIssue)
    })
})
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete(
      {_id: req.params.issueId},
      (err, deleteItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deleteItem.topic}`)
      }
    )
  })



issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId},
        req.body,
        {new: true},
        (err,updateIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updateIssue)
    }
    )
})
module.exports = issueRouter