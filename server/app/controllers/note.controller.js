
const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.groceryItem) {
        return res.status(400).send({
            message: "Note isPurchased can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        groceryItem: req.body.groceryItem || "UngroceryItemd Note",
        isPurchased: req.body.isPurchased
    });

    // Save Note in the database
    note.save()
        .then(data => {
            res.send({ "result": "success" });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });

};



// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    Note.findByIdAndUpdate(req.body._id, {

        isPurchased: req.body.isPurchased,

    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }
            res.send({ "result": "success" });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.body._id
            });
        });

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.body._id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }
            res.send({ "result": "success" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.body._id
            });
        });

};