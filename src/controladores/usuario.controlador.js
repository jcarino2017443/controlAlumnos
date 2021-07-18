'use strict'
//importaciones
var Usuario = require('../modulos/Usuario.model');
var Asignacion = require('../modulos/asignaciones.model')
var bcrypt =  require('bcrypt-nodejs')
var jwt = require('../servicios/jwt');

function inicio(req, res) {
    res.status(200).send({mensaje: 'Bienvenido'});    
}

function registrar(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body;
    if(params.email && params.username && params.password){
        usuarioModel.nombre = params.nombre;
        usuarioModel.username = params.username;
        usuarioModel.email = params.email;
        usuarioModel.rol = params.rol;
        Usuario.find({
            $or: [
                {username: usuarioModel.username},
                {email: usuarioModel.email}
            ]
        }).exec((err, usuariosEncontrados)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion Usuarios'});
            if(usuariosEncontrados && usuariosEncontrados.length >= 1){
                return res.status(500).send({mensaje: 'el usuario ya existe'});
            }else{
                bcrypt.hash(params.password, null, null, (err, passworsEncriptado)=>{
                    usuarioModel.password = passworsEncriptado;
                    usuarioModel.save((err, usuarioGuardado )=>{
                        if(err) return res.status(500).send({mensaje: 'error añ guardar el usuario'});

                        if(usuarioGuardado){
                            res.status(200).send({usuarioGuardado});
                        }else{
                            res.status(404).send({mensaje: 'no se ha podido registar el usuario'});
                        }
                    })
                })
            }
        })

        }
}
function login(req, res) {
    var params = req.body;
    Usuario.findOne({email: params.email}, (err, adminEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'error en la peticion'});

            if(adminEncontrado){
                bcrypt.compare(params.password, adminEncontrado.password, (err, passVerificada)=>{
                    if(passVerificada){
                        if(params.getToken === 'true'){
                            return res.status(200).send({token: jwt.createToken(adminEncontrado)})
                        }else{
                            adminEncontrado.password = undefined;
                            return res.status(200).send({adminEncontrado});
                        }
                    }else{
                        return res.status(500).send({mensaje: 'error al buscar el usuario'});
                    }
                })
            }
    })   
}
function editar(req, res) {
    var usuarioId = req.params.IdUsuario;
    var params = req.body;

    Usuario.findByIdAndUpdate(usuarioId, params, {new: true}, (err, usuarioActualizado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!usuarioActualizado){
            res.status(500).send({mensaje: "No se pudo actualizar el usuario"});
        }
            return res.status(200).send({usuarioActualizado});
    })
}
function eliminar(req, res) {
    var usuarioId = req.params.IdUsuario;

    Usuario.findByIdAndDelete(usuarioId, (err, usuarioEliminado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!usuarioEliminado){
            res.status(500).send({mensaje: "No se pudo eliminar el usuario"});
        }
        return res.status(200).send({mensaje: "usuario Eliminado"});
    })
    
}
function setAsignacion(req, res) {
    let userId = req.params.id;
    let params = req.body;
    var asignacion = new Asignacion();

    if(params.curso1 && params.curso2 && params.curso3){
        Usuario.findById(userId, (err, usuarioEncontrado)=>{
            if(err){
                res.status(500).send({mensaje: 'Error no se pudo hacer el procedimiento'});
            }else if(usuarioEncontrado){
                asignacion.curso1 = params.curso1;
                asignacion.curso2 = params.curso2;
                asignacion.curso3 = params.curso3;

                Usuario.findByIdAndUpdate(userId, {$push:{Asig: asignacion}}, {new:true}, (err, usuarioActualizado)=>{
                    if(err){
                        res.status(500).send({message:'Error general'});
                    }else if(usuarioActualizado){
                        res.status(500).send({usuarioActualizado});
                    }else{
                        res.status(418).send({mensaje: 'no se pudo actualizar'});
                    }
                        
                });
            }else{
                res.status(418).send({mensaje: 'Usuario no encontrado'});
            }
        });
    }else{
        res.status(418).send({mensaje: 'hacen falta datos'})
    }
    
}    

module.exports = {
    inicio,
    login,
    registrar,
    editar,
    eliminar,
    setAsignacion
}