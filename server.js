// Extensions à importer
const express = require('express');
const dbConnect = require('./config/db')
const cors = require("cors")

// Initialiser express
const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000

//Connexion à la bdd
dbConnect();

// Middlewares
app.use(express.json({ extended: false }))

// Routes
app.get('/', (req, res) => {
    res.send("<h1>Bienvenue sur notre API</h1>")
})
app.use('/api/stagiaires', require('./routes/stagiaires'))

// Démarrage du serveur
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`))