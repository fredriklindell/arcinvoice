import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema({
  customerNumber: Number,
  name: String,
  address: String,
  zip: String,
  city: String,
  country: String,
  businessRegistrationNumber: String,
  // TODO: should below two be on the reference person instead?
  phone: String,
  email: String,
  company: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
  ],
  references: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CustomerReference',
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const CustomerModel = mongoose.model('Customer', CustomerSchema)
export default CustomerModel
