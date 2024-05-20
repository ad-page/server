const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGO_DB_URL}`);
    console.log(`Connected to ${connect.connection.host}`);
  } catch (err) {
    console.log(`Could not connect ${err}`);
  }
};

module.exports = connectToDB;
