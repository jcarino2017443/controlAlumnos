'use strict'

const expreess = require('express');
const app = expreess();
const bodyParser = require('body-parser');

// importarms la ruta 
var usuario_rutas = require('./src/rutas/usuario.rutas');
var alumno_rutas = require("./src/rutas/asignacion.rutas");
//midleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//aplicacion de la ruta
app.use('/api', usuario_rutas, alumno_rutas);

module.exports = app;