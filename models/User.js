const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user Schema
const UserSchema = new mongoose.Schema ({
    username : {
        type: String,
        required: true,
        unique: true
    }, 
    password : {
        type: String, 
        required: true
    }
});

// Hash the User's password before saving it to the database
UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10); // Generates a salt with 10 rounds
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next() // Proceed saving user
    } catch (error) {
        next(error);
    }
});

// Create a model from the Schema and export it
const User = mongoose.model('User', UserSchema);
module.exports = User;