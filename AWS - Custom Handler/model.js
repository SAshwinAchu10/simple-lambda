const mongoose = require('mongoose');
const validator = require('validator');


const model = mongoose.model('model', {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  }
});

module.exports = model;