const express = require("express")
const Inventory = require("./models/inventory")
const inventoryRouter = express.Router()

inventoryRouter.get("/", (req, res, next) => {
    Inventory.find((err, inventory) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.send(inventory)
    })
})

inventoryRouter.get("/:inventoryId", (req, res, next) => {
    Inventory.find({ _id: req.params.inventoryId }, (err, inventoryItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.send(inventoryItem)
    })
})

inventoryRouter.post("/", (req, res, next) => {
    const newInventory = new Inventory(req.body)
    newInventory.save((err, saveInventory) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(saveInventory)
    })
})
inventoryRouter.delete("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndDelete(
      {_id: req.params.inventoryId},
      (err, deleteItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deleteItem.title}`)
      }
    )
  })



inventoryRouter.put("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndUpdate(
        { _id: req.params.inventoryId},
        req.body,
        {new: true},
        (err,updateinventory) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updateinventory)
    }
    )
})
module.exports = inventoryRouter