const express = require('express')
const { check, validationResult } = require('express-validator')

const Stagiaire = require('../models/Stagiaire')
const router = express.Router()

// @route   GET api/stagiaires
// @desc    Faire appraitre la liste des stagiaires
// @access  Public
router.get('/', async (req, res) => {
  try {
    const stagiaires = await Stagiaire.find()
    res.json(stagiaires)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Erreur serveur')
  }
})

// @route   POST api/stagiaires
// @desc    Créer un stagiaire
// @access  Public
router.post('/', [
  // Middleware permettant de faire la vérification des informations
  check('name', 'Veuillez indiquer un nom').not().isEmpty(),
  check('email', 'Veuillez entrer un email valide').isEmail(),
  check('age', 'Donnez un age entre 18ans et 65ans').isInt({ min: 18, max: 65 })
], async (req, res) => {
  // On récupère les éventuels messages d'erreur suite à la vérification
  const errors = validationResult(req)
  // S'il y a des erreurs, on renvoie un statut 400 avec les messages d'erreur
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // On récupères les données dans le corps de la requete
  const { name, email, group, age } = req.body

  try {
    // Verifier si le user existe (avec son email)
    let stagiaire = await Stagiaire.findOne({ email })
    if (stagiaire) {
      return res.status(400).json({ errors: [{ msg: "Ce stagiaire existe déjà" }] })
    }

    stagiaire = new Stagiaire({
      name,
      email,
      group,
      age
    })

    await stagiaire.save()
    res.json({ success: [{ msg: "Le stagiaire est bien enregistré" }] })

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Erreur serveur')
  }
})

// @route   DELETE api/stagiaires
// @desc    Supprimer un stagiaire
// @access  Public
router.delete('/', async (req, res) => {
  try {
    await Stagiaire.findOneAndRemove({ email: req.body.email })
    res.json({ success: [{ msg: "L'utilisateur a bien été supprimé" }] })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Erreur serveur')
  }
})

// @route   PUT api/stagiaires
// @desc    modifier un stagiaire
// @access  Public
router.put('/', [
  check('name', 'Veuillez indiquer un nom').not().isEmpty(),
  check('email', 'Veuillez entrer un email valide').isEmail(),
  check('age', 'Donnez un age entre 18ans et 65ans').isInt({ min: 18, max: 65 })
], async (req, res) => {
  // On récupère les éventuels messages d'erreur suite à la vérification
  const errors = validationResult(req)
  // S'il y a des erreurs, on renvoie un statut 400 avec les messages d'erreur
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // On récupères les données dans le corps de la requete
  const { name, email, group, age } = req.body

  const fields = {
    name,
    group,
    age
  }

  try {
    // Verifier si le user existe (avec son email)
    let stagiaire = await Stagiaire.findOne({ email })
    if (!stagiaire) {
      return res.status(400).json({ errors: [{ msg: "Ce stagiaire n'existe pas" }] })
    }

    stagiaire = await Stagiaire.findOneAndUpdate(
      { email },
      { $set: fields },
      { new: true }
    )
    
    res.json(stagiaire)

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Erreur serveur')
  }
})


module.exports = router
