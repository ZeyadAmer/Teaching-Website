require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const courseRoutes = require("./routes/courses");
const instructorRoutes = require("./routes/instructor");
const userRoutes = require("./routes/users");
const indTraineeRoutes = require("./routes/individualTrainee");
const corpTraineeRoutes = require("./routes/corporateTrainee");
const adminRoutes = require("./routes/administrator");
const guestRoutes = require("./routes/guest");
const problemsRoutes = require("./routes/problems");
const courseRoutesCorp = require("./routes/coursesCorp");

// express app
const app = express();

// routes

app.use(express.json());
app.use("/courses", courseRoutes);
app.use("/instructor", instructorRoutes);
app.use("/user", userRoutes);
app.use("/invidualTrainee", indTraineeRoutes);
app.use("/corporateTrainee", corpTraineeRoutes);
app.use("/admin", adminRoutes);
app.use("/guest", guestRoutes);
app.use("/problems", problemsRoutes);
app.use("/c", courseRoutesCorp);

// dbconnection
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;
