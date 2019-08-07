// Puerto
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//Base de datos
let urlDB

if( process.env.NODE_ENV === 'dev'){
 urlDB = 'mongodb://localhost:27017/cafe'
}else{
  urlDB = "mongodb+srv://ctroncoso:ceto123@cluster0-kou7j.mongodb.net/cafe?retryWrites=true"
}

process.env.URLDB = urlDB