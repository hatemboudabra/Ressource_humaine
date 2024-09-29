const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
    employe: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    evaluateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    note: { type: Number, required: true, min: 0, max: 100 },
    commentaires: { type: String, required: true },
    dateEvaluation: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Evaluation', EvaluationSchema);
