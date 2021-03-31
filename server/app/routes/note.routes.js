module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/grocery/add', notes.create);

    // Retrieve all Notes
    app.get('/grocery/getAll', notes.findAll);

    // Update a Note with noteId
    app.put('/grocery/updatePurchaseStatus', notes.update);

    // Delete a Note with noteId
    app.delete('/grocery/deleteGroceryItem', notes.delete);
}