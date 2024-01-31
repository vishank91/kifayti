const testimonialRouter = require("express").Router()
const multer = require('multer') //npm i multer
const { verifyAdmin } = require("../verification")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/testimonials')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

const { getRecord, createRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/TestimonialController")

testimonialRouter.get("/", getRecord)
testimonialRouter.post("/",verifyAdmin, upload.single("pic"), createRecord)
testimonialRouter.get("/:_id", getSingleRecord)
testimonialRouter.put("/:_id",verifyAdmin, upload.single("pic"), updateRecord)
testimonialRouter.delete("/:_id",verifyAdmin, deleteRecord)

module.exports = testimonialRouter
