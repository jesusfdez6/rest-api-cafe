
const mongoose = require('mongoose');



const dbConnection = async() =>{

    try{
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex : true,
            useFindAndModify : true
        });
        console.log("base de datos conectada");
    }catch(error){
        console.log(error);
        throw new Error("Error a la hora de inicial la base de datos");
    }

}


module.exports ={
    dbConnection
}