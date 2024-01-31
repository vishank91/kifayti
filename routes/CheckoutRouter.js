const checkoutRouter = require("express").Router()
const { getRecord, createRecord, updateRecord, deleteRecord, getUserRecord, getSingleRecord,order,verifyOrder } = require("../controllers/CheckoutController")
const { verifyBuyer, verifyAdmin } = require("../verification")

checkoutRouter.get("/", verifyAdmin, getRecord)          //all record for admin
checkoutRouter.get("/user/:userid", verifyBuyer, getUserRecord)//all record of user
checkoutRouter.get("/:_id", verifyAdmin, getSingleRecord)//single record
checkoutRouter.post("/", verifyBuyer, createRecord)
checkoutRouter.put("/:_id", verifyAdmin, updateRecord)
checkoutRouter.delete("/:_id", verifyAdmin, deleteRecord)
checkoutRouter.post("/orders",verifyBuyer,order)
checkoutRouter.post("/verify",verifyBuyer,verifyOrder)

module.exports = checkoutRouter
