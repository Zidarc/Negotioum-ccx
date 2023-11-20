const mongoose = require('mongoose');

const coinNames = ['Bitcoin', 'Polkadot', 'Luna', 'Dogecoin', 'XRP', 'BNB'];

const usersdata = new mongoose.Schema({
    Team_name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Team_password: {
        type: String,
        required: true,
        trim: true
    },
    coins: {
        type: [Number],
        required: true,
        validate: {
            validator: function (v) {
                // Ensure the length of the array matches the number of coins
                return v.length === coinNames.length;
            },
            message: props => `${props.path} array length should match the number of coins`,
        }
    }
});

const UserData = mongoose.model("userdata", usersdata);
module.exports = UserData;
