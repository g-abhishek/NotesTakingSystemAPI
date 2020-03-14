var express = require('express');
var router = express.Router();

var notesController = require('../controller/notes.controller');

router.post('/notes', notesController.createNote);
router.get('/notes', notesController.listAllNotes);
router.get('/notes/:noteId', notesController.listNoteById);
router.put('/notes/:noteId', notesController.updateNote);
router.delete('/notes/:noteId', notesController.deleteNote);

module.exports = router;