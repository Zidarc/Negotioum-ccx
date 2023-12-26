const mongoose = require('mongoose');

const coinNames = ['Bitcoin', 'Polkadot', 'Luna', 'Dogecoin', 'XRP', 'BNB','Ethereum'];

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
        trim: true,
        unique: true
    },
    free_money: {
        type:Number,
        required: true,
        trim: true
    },
    total_worth: {
        type:Number,
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
    },
    coins_previous: {
        type: [Number],
        required: true,
        validate:{
            validator: function (v) {
                return v.lenght === coinNames.lenght;
            },
            message: props => `$props{prop.path} array should match the number of coins`,
        }
    }
});

const UserData = mongoose.model("userdata", usersdata);
module.exports = UserData;
