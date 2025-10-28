const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 8000;

const MONGO_URL = "";

const server = http.createServer(app);

async function startServer() {
  try {
    // await mongoose.connect(MONGO_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    console.log("MongoDB Connected");

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });

  } catch (err) {
    console.error("MongoDB connection error", err);
  }
}

startServer();