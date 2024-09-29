const mongoose = require('mongoose');

const rapportSchema = new mongoose.Schema({
    employe: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalConges: { type: Number, default: 0 },
    Evaluation: { type: Number, default: 0 },
    totalHeuresTravaillees: { type: Number, default: 0 },
    dateGeneration: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Rapport', rapportSchema);