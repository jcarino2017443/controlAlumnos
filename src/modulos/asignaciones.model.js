'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var asignacionSchema = Schema({
    nombre: String,
    carnet: Number, 
    curso1: String,
    curso2: String,
    curso3: String
});

module.exports = mongoose.model('asignacion', asignacionSchema);
