'use strict'

var express = require("express");
var asignacionControlador = require("../controladores/asignaciones.controlador");

var md_autorizacion = require("../middlewares/authenticated");

var api = express.Router();
api.post('/AgregarAlumno', asignacionControlador.agregarAsignacion);
api.put('/editarAlumno/:IdAsignacion', md_autorizacion.ensureAuth, asignacionControlador.editarAsignacion);
api.delete('/eliminarAlumno/:IdAsignacion', md_autorizacion.ensureAuth, asignacionControlador.eliminarAsignacion);

module.exports = api;