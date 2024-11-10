const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//define schema
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String},
    mobile: {type: Number},
    address: {type: String, default: 'india'},
    aadharCardNumber: {type: Number, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['voter', 'admin'], default: 'voter'},
    isVoted: {type: Boolean, default: false}
})

userSchema.pre('save', async function (next) {
    const user = this;
    //hash password only if it's modified
    if(!user.isModified('password')) return next();
    try {
        //hash password generate
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next()
    } catch (error) {
        return next(error);
    } 
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

//create trainer model
const user = mongoose.model('user', userSchema);
module.exports = user;

