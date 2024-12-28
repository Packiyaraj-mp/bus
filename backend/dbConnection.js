const  mongoose=require('mongoose');

function DbConnection() {
  mongoose.connect('mongodb+srv://packiyaraj:Raj357890@shomo.tsgni.mongodb.net/?retryWrites=true&w=majority&appName=shomo')
    .then(con => console.log(`${con.connection.host}`))
    .catch(err => console.error('Connection error', err));
};


module.exports= DbConnection;

