const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = null;

const tempSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

// This avoids HMR trying to overwrite the model after compilation
try {
    CategorySchema = mongoose.model('Category', tempSchema);
} catch (e) {
    CategorySchema = mongoose.model('Category');
}

module.exports = CategorySchema;
