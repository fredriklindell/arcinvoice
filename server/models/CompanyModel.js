import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phoneNumber: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  logo: String,
  invoiceDetails: String,
  swish: String,
  businessRegistrationNumber: {
    type: String,
    required: true,
  },
  website: String,
  vatRegistrationNumber: String,
  plusGiro: String,
  bankGiro: String,
  placeOfBusiness: String,
  swift: String,
  iban: String,
  extraInfo: String,
  bankName: String,
  accountNumber: String,
  overduePaymentInterest: Number,
  termsOfPaymentDays: Number,
  references: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanyReference',
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  isDefault: Boolean,
  // TODO: fix below
  //  createdBy: {
  //    type: mongoose.Schema.Types.ObjectId,
  //    ref: 'User',
  //  },
})

const CompanyModel = mongoose.model('Company', CompanySchema)

export default CompanyModel
