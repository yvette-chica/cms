const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    title: {
        type: String,
        required: true,
    }, 
    status: {
        type: String,
        default: 'public',
    },
    allowComments: {
        type: Boolean,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    file: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, { usePushEach: true });
 
module.exports = mongoose.model('Post', PostSchema);
