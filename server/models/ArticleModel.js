import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
  number: Number,
  name: String,
  vat: Number,
  unit: String,
  unitPrice: Number,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const ArticleModel = mongoose.model('Article', ArticleSchema)
export default ArticleModel
