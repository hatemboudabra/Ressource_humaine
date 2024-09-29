const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    RH: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['DemandeConge', 'Evaluation', 'FeuilleTemps'], 
        required: true 
    },
    dateCreation: { type: Date, default: Date.now },
    lu: { type: Boolean, default: false },
});

module.exports = mongoose.model('Notification', notificationSchema);