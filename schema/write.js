const mongoose = require('mongoose');

const {Schema} = mongoose;
const writesSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model('Writes', writesSchema);