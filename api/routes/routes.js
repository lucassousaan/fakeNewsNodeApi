const express = require('express');
const { OpenAI } = require('openai');
const Feedback = require('../models/feedbackModel');
const Analysis = require('../models/analysisModel');
require('dotenv').config();

const router = express.Router();
module.exports = router;

const openai = new OpenAI({
    apiKey: process.env.GPT_API_KEY,
});

//Envia texto para GPT
router.post('/sendToGPT', async (req, res) => {
    try {
        openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: `' ${req.body.text}'. Does the provided text qualify as fake news or misinformation? If your assessment is affirmative, please elucidate the rationale behind its classification. If your evaluation is negative, a simple 'no' would suffice'`,
            temperature: 0.2,
            max_tokens: 1024,
            frequency_penalty: 0,
            presence_penalty: 0,
            top_p: 1,
        }).then(response => {
            res.status(200).json({
                status: 200,
                gptAnswer: response.choices[0].text
            });
        }).catch(error => {
            res.status(500).json({
                message: error.message,
            });
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});

//Salva Feedback
router.post('/saveFeedback', async (req, res) => {
    const data = new Feedback({
        text: req.body.text,
        isFakeNewsGPT: req.body.isFakeNewsGPT,
        isGoodAnswer: req.body.isGoodAnswer,
        responseText: req.body.responseText
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Retorna todos os Feedbacks salvos
router.get('/getAllFeedbacks', async (req, res) => {
    try {
        const data = await Feedback.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retorna feedback de acordo com ID
router.get('/getFeedback/:id', async (req, res) => {
    try {
        const data = await Feedback.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

function callGPT(text) {
    var text = "";
    openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: text,
        temperature: 0.2,
        max_tokens: 1024,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 1,
    }).then(response => {
        console.log(response.choices[0].text)
        text = response.choices[0].text;
    }).catch(error => {
        text = error.message;
    });
    return text;
}
