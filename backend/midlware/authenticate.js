const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé.' });
        }   
        req.user = user; // Ajoute l'utilisateur à la requête
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide.' });
    }
};

module.exports = authenticate;
