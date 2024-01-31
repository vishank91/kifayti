const Wishlist = require("../models/Wishlist")

async function getRecord(req, res) {
    try {
        let data = await Wishlist.find({userid:req.params.userid}).sort({ _id: -1 })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function createRecord(req, res) {
    try {
        const data = new Wishlist(req.body)
        await data.save()
        res.send({ status: 200, result: "Done", data: data })
    } catch (error) {
        if (error.errors.userid)
            res.send({ status: 400, result: "Fail", message: error.errors.userid.message })
        else if (error.errors.productid)
            res.send({ status: 400, result: "Fail", message: error.errors.productid.message })
        else if (error.errors.name)
            res.send({ status: 400, result: "Fail", message: error.errors.name.message })
        else if (error.errors.brand)
            res.send({ status: 400, result: "Fail", message: error.errors.brand.message })
        else if (error.errors.color)
            res.send({ status: 400, result: "Fail", message: error.errors.color.message })
        else if (error.errors.size)
            res.send({ status: 400, result: "Fail", message: error.errors.size.message })
        else if (error.errors.price)
            res.send({ status: 400, result: "Fail", message: error.errors.price.message })
        else if (error.errors.pic)
            res.send({ status: 400, result: "Fail", message: error.errors.pic.message })
        else
            res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}


async function deleteRecord(req, res) {
    try {
        let data = await Wishlist.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.send({ status: 200, result: "Done", message: "Record is Deleted" })
        }
        else
            res.send({ status: 404, result: "Result", message: "Record Not Found" })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

module.exports = {
    getRecord: getRecord,
    createRecord: createRecord,
    deleteRecord: deleteRecord
}