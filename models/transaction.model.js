const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  // ref é um atributo especial que aponta para o modelo que está criando um relacionamento com este modelo
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    new mongoose.Schema(
      {
        qtt: Number,
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
      { _id: false }
    ),
  ],
  //fazer um setState (useEfect) para implementar um load fake
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Payment pending", "In Transit", "Delivered", "Cancelled"],
    default: "Payment pending",
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
