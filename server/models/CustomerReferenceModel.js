import mongoose from 'mongoose'

const CustomerReferenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const CustomerReferenceModel = mongoose.model(
  'CustomerReference',
  CustomerReferenceSchema
)
export default CustomerReferenceModel
