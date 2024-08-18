import mongoose from "mongoose";

const DB_Config = async () => {
  // try {
     await mongoose.connect(process.env.DB_CLOUD)
     .then(conn => console.log("Db Connection" + conn.connection.host))
     .catch(err => console.log("Error connecting" + err.message));
  //   console.log("Connected to database ");
  // } catch (err) {
  //   console.log("Error connecting:", err);
  // }
};

export default DB_Config;
