
const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/controlAlumnos', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('la base de datos esta corriendo :D');

    app.listen(8080, function () {
        console.log('el puerto 8080 esta elvantado');
    });
}).catch(err => console.log(err));