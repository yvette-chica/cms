const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = null;

const tempSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

tempSchema.methods.testMethod = function() {
    console.log('using schema methods');
};

// This avoids HMR trying to overwrite the model after compilation
try {
    UserSchema = mongoose.model('User', tempSchema);
} catch (e) {
    UserSchema = mongoose.model('User');
}

module.exports = UserSchema;
