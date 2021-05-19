const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
    default: "USER",
  },
  AddressStreet: { type: String, required: true, trim: true },
  AddressNum: { type: String, required: true, trim: true },
  AddressCity: { type: String, required: true, trim: true },
  AddressPostalCode: { type: String, required: true, trim: true },
  AddressState: { type: String, required: true, trim: true },
  AddressCountry: { type: String, required: true, trim: true },
  neighbourhood: {type: String, required: true, trim: true },
  phoneNumber: {type: String, required: true, trim: true},
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
