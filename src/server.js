const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv")
const PORT = process.env.PORT || 8000;

dotenv.config()

const server = http.createServer(app);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });

  } catch (err) {
    console.error("MongoDB connection error", err);
  }
}

startServer();