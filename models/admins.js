const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Schema to Define what information the admin page
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: ['true', 'username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: ['true', 'email is required'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: ['true', 'password cannot be less than 8 characters'],
        minlength: 8
    }
});

AdminSchema.pre('save', async function () {
    if (!this.password || !this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const AdminsModel = mongoose.model('Admin', AdminSchema);
module.exports = AdminsModel;
