import mongoose from 'mongoose'

const InvoiceSchema = new mongoose.Schema({
  dueDate: Date,
  currency: String,
  articles: [{
    artcileNumber: Number,
    articleName: String,
    vat: Number,
    unit: String,
    unitPrice: String,
    quantity: String,
    discount: String
  }],
  rates: String,
  total: Number,
  subTotal: Number,
  notes: String,
  status: String,
  invoiceNumber: String,
  type: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  totalAmountReceived: Number,
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const InvoiceModel = mongoose.model('Invoice', InvoiceSchema)
export default InvoiceModel
