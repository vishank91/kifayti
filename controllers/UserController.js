const User = require("../models/User")
const passwordValidator = require('password-validator')
const bcrypt = require("bcrypt")
const fs = require("fs")
const jwt = require("jsonwebtoken")

const transporter = require("../mailTransporter")
const schema = new passwordValidator();

schema
    .is().min(8)                                    // Minimum length 8
    .is().max(30)                                   // Maximum length 30
    .has().uppercase(1)                             // Must have 1 uppercase letters
    .has().lowercase(1)                             // Must have 1 lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'nitin@123', 'User123', 'User@123']); // Blacklist these values

async function getRecord(req, res) {
    try {
        let data = await User.find().sort({ _id: -1 })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function createRecord(req, res) {
    console.log(process.env.MAIL_SENDER)
    if (req.body.password && schema.validate(req.body.password)) {
        const data = new User(req.body)
        bcrypt.hash(req.body.password, 12, async (error, hash) => {
            if (error)
                res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
            else {
                data.password = hash
                try {
                    await data.save()
                    mailOptions = {
                        from: process.env.MAIL_SENDER,
                        to: data.email,
                        subject: "Account is Created : Team Kifayti",
                        text: `
                                Hello ${data.name}
                                Your Account is Successfully Created
                                Now You Can Buy Our Latest Products with Great Deals
                                Team : kifayti
                            `
                    }
                    transporter.sendMail(mailOptions, ((error) => {
                        if (error) {
                            console.log(error)
                            // res.send({ status: 401, result: "Fail", message: "Invalid Email Address" })
                        }
                    }))
                    res.send({ status: 200, result: "Done", data: data })
                }
                catch (error) {
                    console.log(error.keyValue);
                    if (error.keyValue && error.keyValue.username)
                        res.send({ status: 400, result: "Fail", message: "User Name Already Taken" })
                    else if (error.keyValue && error.keyValue.email)
                        res.send({ status: 400, result: "Fail", message: "Email Address Already Taken" })
                    else if (error.errors.name)
                        res.send({ status: 400, result: "Fail", message: error.errors.name.message })
                    else if (error.errors.email)
                        res.send({ status: 400, result: "Fail", message: error.errors.email.message })
                    else if (error.errors.phone)
                        res.send({ status: 400, result: "Fail", message: error.errors.phone.message })
                    else
                        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
                }
            }
        })
    }
    else
        res.send({
            status: 400, result: "Fail", message: "Password Must Contains Following Items 1. Minimum length 2. Maximum length 3. Must have 1 uppercase letters 4. Must have 1 lowercase letters 5. Must have at least 1 digits 6. Should not have spaces"
        })
}

async function getSingleRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
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
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.phone = req.body.phone ?? data.phone
            data.address = req.body.address ?? data.address
            data.pin = req.body.pin ?? data.pin
            data.city = req.body.city ?? data.city
            data.state = req.body.state ?? data.state

            if (req.file) {
                try {
                    fs.unlinkSync(data.pic)
                } catch (error) { }
                data.pic = req.file.path
            }
            await data.save()
            res.send({ status: 200, result: "Done", message: "Record Updated" })
        }
        else
            res.send({ status: 404, result: "Result", message: "Record Not Found" })
    } catch (error) {
        if (error.keyValue)
            res.send({ status: 400, result: "Fail", message: "User Name Already Exist" })
        else
            res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.pic)
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

async function login(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username }
            ]
        })
        if (data) {
            if (await bcrypt.compare(req.body.password, data.password)) {
                let key = data.role == "Admin" ? process.env.JWT_SALT_KEY_ADMIN : process.env.JWT_SALT_KEY_BUYER
                jwt.sign({ data }, key,{expiresIn:1296000}, (error, token) => {
                    if (error)
                        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
                    else
                        res.send({ status: 200, result: "Done", data: data, token: token })
                })
            }
            else
                res.send({ status: 401, result: "Fail", message: "Invalid Username or Password" })
        }
        else
            res.send({ status: 401, result: "Fail", message: "Invalid Username or Password" })
    } catch (error) {
        console.log(error);
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function forgetPassword1(req, res) {
    try {
        var data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username },
            ]
        })
        if (data) {
            let otp = parseInt(Math.random() * 1000000)
            data.otp = otp
            await data.save()
            mailOptions = {
                from: process.env.MAIL_SENDER,
                to: data.email,
                subject: "OTP for Password Reset : Team Kifayti",
                text: `
                        Hello ${data.name}
                        OTP for Password Reset is ${data.otp}
                        Please Never Share Your OTP With anyone
                        Team : kifayti
                    `
            }
            transporter.sendMail(mailOptions, ((error) => {
                if (error) {
                    console.log(error)
                    // res.send({ status: 401, result: "Fail", message: "Invalid Email Address" })
                }
            }))
            res.send({ status: 200, result: "Done", message: "OTP Sent on Your Registered Email Address" })
        }
        else
            res.send({ status: 401, result: "Fail", message: "User Not Found" })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}
async function forgetPassword2(req, res) {
    try {
        var data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username },
            ]
        })
        if (data) {
            if (data.otp == req.body.otp)
                res.send({ status: 200, result: "Done" })
            else
                res.send({ status: 401, result: "Fail", message: "Invalid OTP" })
        }
        else
            res.status(401).send({ status: 401, result: "Fail", message: "Anauthorized Activity" })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}
async function forgetPassword3(req, res) {
    try {
        var data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username },
            ]
        })
        if (data) {
            bcrypt.hash(req.body.password, 12, async (error, hash) => {
                if (error)
                    res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
                else {
                    data.password = hash
                    await data.save()
                    res.send({ status: 200, result: "Done", message: "Password Has Been Reset" })
                }
            })
        }
        else
            res.status(401).send({ status: 401, result: "Fail", message: "Anauthorized Activity" })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}
module.exports = {
    getRecord: getRecord,
    createRecord: createRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    login: login,
    forgetPassword1: forgetPassword1,
    forgetPassword2: forgetPassword2,
    forgetPassword3: forgetPassword3
}