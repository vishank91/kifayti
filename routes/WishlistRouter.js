const wishlistRouter = require("express").Router()
const { getRecord, createRecord, deleteRecord } = require("../controllers/WishlistController")
const { verifyBuyer } = require("../verification")
wishlistRouter.get("/:userid", verifyBuyer, getRecord)
wishlistRouter.post("/", verifyBuyer, createRecord)
wishlistRouter.delete("/:_id", verifyBuyer, deleteRecord)

module.exports = wishlistRouter
