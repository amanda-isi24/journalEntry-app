const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entriesController')

router.get('/entries', entriesController.getAllEntries)
router.get('/entries/:id', entriesController.getEntryById)
router.post('/entries', entriesController.createEntry)
router.put('/entries/:id', entriesController.updateEntry)
router.delete('/entries/:id', entriesController.deleteEntry);

module.exports = router; // export the router