const mongoose = require('mongoose');

const feuilleTempsSchema = new mongoose.Schema({
    employe: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    heuresTravaillees: { type: Number, required: true },
    date: { type: Date, required: true },
    statut: { 
        type: String, 
        enum: ['En attente', 'Validé'], 
        default: 'En attente' 
    },
    valideParRh: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateCreation: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FeuilleTemps', feuilleTempsSchema);