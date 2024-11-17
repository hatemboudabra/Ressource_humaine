const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/auth');
const demandeRoutes = require('./routes/demandes');
const EvaluationRoutes = require('./routes/Evaluation');
const RapportRoutes = require('./routes/rapport');
const FeuilleTemps = require('./routes/feuilleTemps');
const NotificationRoutes = require('./routes/notification');
const userRoutes = require('./routes/user'); 


dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Version de Swagger
    info: {
      title: 'API de Gestion',
      version: '1.0.0',
      description: 'Documentation de l\'API pour le projet de gestion',
    },
  },
  apis: ['./routes/*.js'], // Spécifie où Swagger doit chercher les annotations (commentaires) dans tes fichiers de route
};

// Générer la documentation Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Route pour accéder à la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes de l'application
app.use('/auth', authRoutes);
app.use('/demandes', demandeRoutes); 
app.use('/evaluation', EvaluationRoutes);
app.use('/rapport', RapportRoutes);
app.use('/feuille', FeuilleTemps); // Corrected this line
app.use('/notif', NotificationRoutes);
app.use('/user', userRoutes); 

// Connection à MongoDB et démarrage du serveur
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Gestion des erreurs globales (facultatif)
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  mongoose.disconnect();
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  mongoose.disconnect();
});
