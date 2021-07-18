'use strict'

var mongoose = require("mongoose");
const { schema } = require("./usuario.model");
var Schema = mongoose.Schema;

var maestrosSchema = Schema({
    nombre: String,
    username: String,
    password: String,
    telefono: Number
});

module.exports = mongoose.model('maestros', maestrosSchema);