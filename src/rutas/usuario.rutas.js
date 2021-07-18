'use strict'

const expreess = require('express');
var usuario_Controlador = require('../controladores/usuario.controlador');

var md_autorizacion = require('../middlewares/authenticated');

//Rutas
var api = expreess.Router();
api.get('/inicio', usuario_Controlador.inicio);
api.post('/login', usuario_Controlador.login);
api.post('/registrar', usuario_Controlador.registrar);
api.put('/editarUsuario/:IdUsuario', md_autorizacion.ensureAuth, usuario_Controlador.editar);
api.delete("/eliminarUsuario/:IdUsuario", md_autorizacion.ensureAuth, usuario_Controlador.eliminar);

module.exports = api;
