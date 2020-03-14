var Notes = require('../models/notes.model');

exports.createNote = (req, res) => {
    var noteTitle = req.body.noteTitle;
    var noteTxt = req.body.noteTxt;
    if (!noteTxt) {
        return res.send({
            message: 'note text cannot be empty',
            responseCode: 400
        })
    } else {
        var noteSchema = {
            noteTitle: noteTitle,
            noteTxt: noteTxt
        }
        Notes.create(noteSchema).then(note => {
            return res.send(note);
        }).catch(error => {
            return res.send({
                message: 'error while creating a note',
                responseCode: 500,
                error: error.message
            })
        })

    }
}

exports.listAllNotes = (req, res) => {
    Notes.find().then(allNotes => {
        if (!allNotes) {
            return res.send({
                message: 'there is no notes available',
                responseCode: 400
            })
        }
        return res.send(allNotes);
    }).catch(error => {
        return res.send({
            message: 'there is some error while retrieving notes',
            responseCode: 500,
            error: error.message
        })
    })
}

exports.listNoteById = (req, res) => {
    var noteId = req.params.noteId;
    Notes.findById(noteId).then(notes => {
        if (!notes) {
            return res.send({
                message: 'there is no notes available',
                responseCode: 400
            })
        }
        return res.send(notes);
    }).catch(error => {
        if (error.kind == 'ObjectId') {
            return res.send({
                message: "note not found with id " + noteId,
                responseCode: 404
            });
        }
        return res.send({
            message: 'there is some error while retrieving notes',
            responseCode: 500,
            error: error.message
        })
    })
}

exports.updateNote = (req, res) => {
    var noteId = req.params.noteId;
    var noteTitle = req.body.noteTitle;
    var noteTxt = req.body.noteTxt;

    if (!noteTxt) {
        return res.send({
            message: 'note text cannot be empty',
            responseCode: 400
        })
    } else {
        var noteSchema = {
            noteTitle: noteTitle || 'untitled',
            noteTxt: noteTxt
        }
        Notes.findByIdAndUpdate(noteId, noteSchema, { new: true, useFindAndModify: false }).then(note => {
            if (!note) {
                return res.send({
                    message: 'no notes available to update with id' + noteId,
                    responseCode: 400
                })
            }
            return res.send(note);
        }).catch(error => {
            if (error.kind == 'ObjectId') {
                return res.send({
                    message: "Note not found with id " + noteId,
                    responseCode: 404
                });
            }
            return res.send({
                message: 'error while updating a note',
                responseCode: 500,
                error: error.message
            })
        })
    }
}

exports.deleteNote = (req, res) => {
    var noteId = req.params.noteId;
    Notes.findByIdAndDelete(noteId, { useFindAndModify: false }).then(note => {
        if (!note) {
            return res.send({
                message: "Note not found with id " + noteId,
                responseCode: 400
            });
        }
        res.send({
            message: "Note deleted successfully!",
            note: note
        });
    }).catch(error => {
        if (error.kind == 'ObjectId') {
            return res.send({
                message: "Note not found with id " + noteId,
                responseCode: 404
            });
        }
        return res.send({
            message: "Could not delete note with id " + req.params.noteId,
            responseCode: 500
        });
    });

}