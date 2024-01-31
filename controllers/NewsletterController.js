const Newsletter = require("../models/Newsletter")
const transporter = require("../mailTransporter")

async function getRecord(req, res) {
    try {
        let data = await Newsletter.find().sort({ _id: -1 })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function createRecord(req, res) {
    try {
        const data = new Newsletter(req.body)
        await data.save()
        res.send({ status: 200, result: "Done", data: data, message: "Your Email Address is Regsitered With Us. Now We can Send Emails Regarding New Products and Best Offerse to You" })
        mailOptions = {
            from: process.env.MAIL_SENDER,
            to: data.email,
            subject: "Newsletter Subscribed : Team Kifayti",
            text: `
                    Hello User
                    Your Email Address is Regsitered With Us. 
                    Now We can Send Emails Regarding New Products and Best Offerse to You
                    Team : kifayti
                `
        }
        transporter.sendMail(mailOptions, ((error) => {
            if (error) {
                console.log(error)
                // res.send({ status: 401, result: "Fail", message: "Invalid Email Address" })
            }
        }))
    } catch (error) {
        if (error.keyValue)
            res.send({ status: 400, result: "Fail", message: "Your Email Address is Already Registered With Us" })
        else if (error.errors.email)
            res.send({ status: 400, result: "Fail", message: error.errors.email.message })
        else
            res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}


async function deleteRecord(req, res) {
    try {
        let data = await Newsletter.findOne({ _id: req.params._id })
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