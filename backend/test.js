// Load environment configs immediately before running code logic
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Pulling variables dynamically from memory
const PORT = process.env.PORT || 5000;
const DB_CONNECTION = process.env.MONGO_URI;

mongoose
  .connect(DB_CONNECTION)
  .then(() =>
    console.log("🚀 Core Cluster Network Interconnect: Connected Successfully"),
  )
  .catch((err) => console.error("❌ Database Anomaly:", err.message));

app.listen(PORT, () => {
  console.log(`📡 Backend Gateway active on port ${PORT}`);
});
