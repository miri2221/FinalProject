import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

//mongoose.connect('mongodb://127.0.0.1:27017/celebrate');
console.log(process.env.MONGO_URI);
mongoose.connect(`${process.env.MONGO_URI}/celebrate`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("mongo connected")
});

export default db;