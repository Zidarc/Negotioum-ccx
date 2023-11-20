const mongoose = require('mongoose')

const usersdata = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    num: {
        type: String,
        required: true,
        trim: true
    }
})
const UserData =  mongoose.model("userdata", usersdata)
module.exports = UserData