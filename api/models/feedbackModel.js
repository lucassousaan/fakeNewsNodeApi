const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    text: {
        required: true,
        type: String
    },
    responseText: {
        required: true,
        type: String
    },
    isFakeNewsGPT: {
        required: true,
        type: Boolean
    },
    isGoodAnswer: {
        required: true,
        type: Boolean
    }
})

module.exports = mongoose.model('Feedback', feedbackSchema)