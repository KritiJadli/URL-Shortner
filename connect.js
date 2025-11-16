const mongoose=require('mongoose');
async function conectToMongoDb(url){
    return mongoose.connect(url);
    
}
module.exports={
    conectToMongoDb,
}