const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const authRoutes = require('./routes/auth');
const demandeRoutes = require('./routes/demandes');
const EvaluationRoutes = require('./routes/Evaluation');
const RapportRoutes = require('./routes/rapport')
const FeuilleTemps =  require('./routes/feuilleTemps')
const NotificationRoutes = require('./routes/notification')
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors())
app.use('/auth', authRoutes);
app.use('/demandes', demandeRoutes); 
app.use('/evaluation', EvaluationRoutes);
app.use('/rapport',RapportRoutes)
app.use('feuille',FeuilleTemps)
app.use('/notif',NotificationRoutes)
// Connection to MongoDB and start server
mongoose.connect(MONGODB_URI).then(() => {
    console.log('connected to MongoDb');
    app.listen(PORT, () => {
      console.log(`server listening on ${PORT}`);
    });
  }).catch((err) => {
    console.error('Error connecting to mongodb:', err.message);
  });
  