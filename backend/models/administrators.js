const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const administratorSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const administrator = mongoose.model(
  "administrator",
  administratorSchema
);
module.exports = administrator;
