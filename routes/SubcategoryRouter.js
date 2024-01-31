const subcategoryRouter = require("express").Router()
const { getRecord, createRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/SubcategoryController")
const { verifyAdmin } = require("../verification")

subcategoryRouter.get("/", getRecord)
subcategoryRouter.post("/", verifyAdmin, createRecord)
subcategoryRouter.get("/:_id", getSingleRecord)
subcategoryRouter.put("/:_id", verifyAdmin, updateRecord)
subcategoryRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = subcategoryRouter
