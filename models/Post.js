const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

let PostSchema = null;

const tempSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    title: {
        type: String,
        required: true,
    }, 
    slug: {
        type: String,
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

tempSchema.plugin(URLSlugs('title', { field: 'slug' }));

// This avoids HMR trying to overwrite the model after compilation
try {
    PostSchema = mongoose.model('Post', tempSchema);
} catch (e) {
    PostSchema = mongoose.model('Post');
}

 
module.exports = PostSchema;
