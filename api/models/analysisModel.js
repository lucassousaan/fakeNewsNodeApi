const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    text: {
        required: true,
        type: String
    },
    isLink: {
        required: true,
        type: Boolean
    },
    responseGPT: {
        required: false,
        type: String,
    },
})

module.exports = mongoose.model('Analysis', analysisSchema);