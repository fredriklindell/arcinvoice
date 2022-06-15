import mongoose from 'mongoose'

const CompanyReferenceSchema = new mongoose.Schema({
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

const CompanyReferenceModel = mongoose.model(
  'CompanyReference',
  CompanyReferenceSchema
)
export default CompanyReferenceModel
