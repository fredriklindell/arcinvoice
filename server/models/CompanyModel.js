import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema({
  name: String,
  address: String,
  zip: String,
  city: String,
  country: String,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const CompanyModel = mongoose.model('Company', CompanySchema)

export default CompanyModel
