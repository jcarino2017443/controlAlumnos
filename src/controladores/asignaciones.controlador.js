'use strict'

var Asignacion = require("../modulos/asignaciones.model");

function agregarAsignacion(req, res) {
    
    var asignacionModel = new Asignacion();
    var params = req.body;

    if(params.nombre && params.curso1 && params.curso2 && params.curso3){
        asignacionModel.nombre = params.nombre;
        asignacionModel.carnet = params.carnet;
        asignacionModel.curso1 = params.curso1;
        asignacionModel.curso2 = params.curso2;
        asignacionModel.curso3 = params.curso3;
        Asignacion.find({
            $or: [{carnet: asignacionModel.carnet}]
        }).exec((err, carnetEncontrado)=>{
            if(err) return res.status(500).send({mensaje: "Error en la peticion"});
            if(carnetEncontrado && carnetEncontrado.length >=1){
                res.status(500).send({mensaje: "El carnet ya existe"})
            
            }else{
                asignacionModel.save((err, asignacionGuardada)=>{
                    if(err) return res.status(500).send({mensaje: "Erroe en la petiion"});
                    if(!asignacionGuardada){
                        res.status(500).send({mensaje: "El carrnet ya existe"});
                    }
                    return res.status(200).send({asignacionGuardada});
                })
            }
        })
    }
}
function editarAsignacion(req, res) {

    if(req.params.rol === "Rol_Admin " || req.params.rol == "Rol_Alumno"){

    
    var asignacionId = req.params.IdAsignacion;
    var params =req.body;

    Asignacion.findByIdAndUpdate(asignacionId, params, {new: true},(err ,asignacionActualizada)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!asignacionActualizada){
            res.status(500).send({mensaje: "No se pudo actualizar"});
        }
        return res.status(200).send({asignacionActualizada});

    })
    }else{
        return res.status(500).send({mensaje: "Solo los roles Alumno y Admin pueden editar: Rol_Alumno"})
    }
}
function eliminarAsignacion(req, res) {
    var asignacionId = req.params.IdAsignacion;

    Asignacion.findByIdAndDelete(asignacionId, (err, asigEliminada)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!asigEliminada){
            res.status(500).send({mensaje: "No se pudo eliminar"});
        }
        return res.status(200).send({mensaje: "Alumno eliminado"});
    })
    
}

module.exports = {
    agregarAsignacion,
    editarAsignacion,
    eliminarAsignacion
} 
