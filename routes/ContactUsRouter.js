const contactUsRouter = require("express").Router()
const { getRecord, createRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/ContactUsController")
const { verifyAdmin } = require("../verification")

contactUsRouter.get("/", verifyAdmin, getRecord)
contactUsRouter.post("/", createRecord)
contactUsRouter.get("/:_id", verifyAdmin, getSingleRecord)
contactUsRouter.put("/:_id", verifyAdmin, updateRecord)
contactUsRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = contactUsRouter
