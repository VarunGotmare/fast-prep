const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    dob: {
        type: Date,
        required: true
    },
    class: {
        type: String,
        enum: ["11", "12"],
        required: true
    },
    examType: {
        type: String,
        enum: ["JEE", "NEET", "UPSC"],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);