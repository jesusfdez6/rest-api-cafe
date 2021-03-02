  require('dotenv').config();
  const express = require('express');
  var cors = require('cors');
  const {dbConnection} = require('../database/config')  

/*
var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

*/

class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.usuariosPath ='/api/usuarios'; 
        this.categoriasPath ='/api/categorias'; 
        this.productosPath ='/api/productos'; 
        this.buscarPath ='/api/buscar'; 


        this.authPath ='/auth'; 

        //conectar base de datos

        this.conectarDB();
        //middlewares
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();


    }

    async conectarDB(){

        await dbConnection();
    }

    routes(){
      
        this.app.use(this.usuariosPath,require('../routes/user'));
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.categoriasPath,require('../routes/categorias'));
        this.app.use(this.productosPath,require('../routes/productos'));
        this.app.use(this.buscarPath,require('../routes/buscar'));


          


    }
    listen(){
        this.app.listen(this.port);
    }

    middlewares(){

        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(cors())
    }





}
module.exports = Server;

//export {
  //  Server
//}