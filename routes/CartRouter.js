const cartRouter = require("express").Router()
const { getRecord, createRecord, updateRecord, deleteRecord } = require("../controllers/CartController")
const { verifyBuyer } = require("../verification")

cartRouter.get("/:userid", verifyBuyer, getRecord)
cartRouter.post("/", verifyBuyer, createRecord)
cartRouter.put("/:_id", verifyBuyer, updateRecord)
cartRouter.delete("/:_id", verifyBuyer, deleteRecord)

module.exports = cartRouter
