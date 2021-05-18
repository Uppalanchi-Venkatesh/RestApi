const mongoose = require('mongoose');

const courses = new mongoose.Schema({
    'courseName': {type: String, required: true},
    'articles': {type: Number, required: true},
    'isdeleted': {type: Boolean, required: true, default: false}
});

module.exports = mongoose.model('Courses',courses);