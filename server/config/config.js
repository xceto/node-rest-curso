// Puerto
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//Base de datos
let urlDB

if( process.env.NODE_ENV === 'dev'){
 urlDB = 'mongodb://localhost:27017/cafe'
}else{
  urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB

//Vencimiento del token
// 60 * 60 * 24 * 30
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

//Seed de autenticación
process.env.SEMILLA = process.env.SEMILLA || 'secret-sed-del-token'

process.env.CLIENT_ID = process.env.CLIENT_ID || '67726131698-dptpcgljupusgessfiqvuks8gfbu1sq1.apps.googleusercontent.com'