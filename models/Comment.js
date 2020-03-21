const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema;

const tempSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    body: {
        type: String,
        required: true,
    },
    approveComment: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

// This avoids HMR trying to overwrite the model after compilation
try {
    CommentSchema = mongoose.model('Comment', tempSchema);
} catch (e) {
    CommentSchema = mongoose.model('Comment');
}

module.exports = CommentSchema;
