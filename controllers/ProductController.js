const Product = require("../models/Product")
const fs = require("fs")

async function getRecord(req, res) {
    try {
        let data = await Product.find().sort({ _id: -1 })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function createRecord(req, res) {
    try {
        const data = new Product(req.body)
        if (req.files.pic1) {
            data.pic1 = req.files.pic1[0].path
        }
        if (req.files.pic2) {
            data.pic2 = req.files.pic2[0].path
        }
        if (req.files.pic3) {
            data.pic3 = req.files.pic3[0].path
        }
        if (req.files.pic4) {
            data.pic4 = req.files.pic4[0].path
        }
        await data.save()
        res.send({ status: 200, result: "Done", data: data })
    } catch (error) {
        if (error.errors.name)
            res.send({ status: 400, result: "Fail", message: error.errors.name.message })
        else if (error.errors.maincategory)
            res.send({ status: 400, result: "Fail", message: error.errors.maincategory.message })
        else if (error.errors.subcategory)
            res.send({ status: 400, result: "Fail", message: error.errors.subcategory.message })
        else if (error.errors.brand)
            res.send({ status: 400, result: "Fail", message: error.errors.brand.message })
        else if (error.errors.color)
            res.send({ status: 400, result: "Fail", message: error.errors.color.message })
        else if (error.errors.size)
            res.send({ status: 400, result: "Fail", message: error.errors.size.message })
        else if (error.errors.baseprice)
            res.send({ status: 400, result: "Fail", message: error.errors.baseprice.message })
        else if (error.errors.discount)
            res.send({ status: 400, result: "Fail", message: error.errors.discount.message })
        else if (error.errors.finalprice)
            res.send({ status: 400, result: "Fail", message: error.errors.finalprice.message })
        else
            res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function getSingleRecord(req, res) {
    try {
        let data = await Product.findOne({ _id: req.params._id })
        if (data)
            res.send({ status: 200, result: "Done", data: data })
        else
            res.send({ status: 404, result: "Result", message: "Record Not Found" })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function updateRecord(req, res) {
    try {
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.maincategory = req.body.maincategory ?? data.maincategory
            data.subcategory = req.body.subcategory ?? data.subcategory
            data.brand = req.body.brand ?? data.brand
            data.color = req.body.color ?? data.color
            data.size = req.body.size ?? data.size
            data.baseprice = req.body.baseprice ?? data.baseprice
            data.discount = req.body.discount ?? data.discount
            data.finalprice = req.body.finalprice ?? data.finalprice
            data.stock = req.body.stock ?? data.stock
            data.description = req.body.description ?? data.description
            if (req.files.pic1) {
                try {
                    fs.unlinkSync(data.pic1)
                } catch (error) { }
                data.pic1 = req.files.pic1[0].path
            }
            if (req.files.pic2) {
                try {
                    fs.unlinkSync(data.pic2)
                } catch (error) { }
                data.pic2 = req.files.pic2[0].path
            }
            if (req.files.pic3) {
                try {
                    fs.unlinkSync(data.pic3)
                } catch (error) { }
                data.pic3 = req.files.pic3[0].path
            }
            if (req.files.pic4) {
                try {
                    fs.unlinkSync(data.pic4)
                } catch (error) { }
                data.pic4 = req.files.pic4[0].path
            }

            await data.save()
            res.send({ status: 200, result: "Done", message: "Record Updated",data:data})
        }
        else
            res.send({ status: 404, result: "Result", message: "Record Not Found" })
    } catch (error) {
        if (error.keyValue)
            res.send({ status: 400, result: "Fail", message: "Product Name Already Exist" })
        else
            res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.pic1)
            } catch (error) { }
            try {
                fs.unlinkSync(data.pic2)
            } catch (error) { }
            try {
                fs.unlinkSync(data.pic3)
            } catch (error) { }
            try {
                fs.unlinkSync(data.pic4)
            } catch (error) { }
            await data.deleteOne()
            res.send({ status: 200, result: "Done", message: "Record is Deleted" })
        }
        else
            res.send({ status: 404, result: "Result", message: "Record Not Found" })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function search(req, res) {
    let search = req.body.search
    try {
        let data = await Product.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { maincategory: search },
                { subcategory: search },
                { brand: search },
                { color: search },
                { size: search },
                { description: { $regex: search, $options: "i" } }
            ]
        })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        console.log(error);
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}
module.exports = {
    getRecord: getRecord,
    createRecord: createRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    search: search
}