import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
  amountPaid: Number,
  datePaid: Date,
  paymentMethod: String,
  note: String,
  paidBy: String,
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const PaymentModel = mongoose.model('Payment', PaymentSchema)
export default PaymentModel
