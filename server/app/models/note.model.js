const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    groceryItem: String,
    isPurchased: false
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);