const brandRouter = require("express").Router()
const { getRecord, createRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/BrandController")
const { verifyAdmin } = require("../verification")

brandRouter.get("/", getRecord)
brandRouter.post("/", verifyAdmin, createRecord)
brandRouter.get("/:_id", getSingleRecord)
brandRouter.put("/:_id", verifyAdmin, updateRecord)
brandRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = brandRouter
