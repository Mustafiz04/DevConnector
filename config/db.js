const mongoose = require('mongoose');
const config = require('config');
const db = config.get("mongoURL");


const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true,
            useFindAndModify : false
        });

        console.log("Database is connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;