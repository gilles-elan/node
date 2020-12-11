const mongoose = require('mongoose')

const StagiaireSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    group: {
        type: String
    },
    age: {
        type: Number,
        min: 18,
        max: 65
    }
})

module.exports = Stagiaire = mongoose.model('stagiaire', StagiaireSchema)