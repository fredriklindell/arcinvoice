import mongoose from 'mongoose'

import CustomerReferenceModel from '../models/CustomerReferenceModel.js'

export const getCustomerReference = async (req, res) => {
  const { id } = req.params

  try {
    const customerReference = await CustomerReferenceModel.findById(id)

    res.status(200).json(customerReference)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getCustomerReferences = async (req, res) => {
  const { page } = req.query

  try {
    const LIMIT = 8
    const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page

    const total = await CustomerReferenceModel.countDocuments({})
    const customerReferences = await CustomerReferenceModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)

    res.json({
      data: customerReferences,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createCustomerReference = async (req, res) => {
  const customerReference = req.body

  const newCustomerReference = new CustomerReferenceModel({
    ...customerReference,
    createdAt: new Date().toISOString(),
  })

  try {
    await newCustomerReference.save()
    res.status(201).json(newCustomerReference)
  } catch (error) {
    res.status(409).json(error.message)
  }
}

export const updateCustomerReference = async (req, res) => {
  const { id: _id } = req.params
  const customerReference = req.body

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No customer reference with that id')

  const updatedCustomerReference =
    await CustomerReferenceModel.findByIdAndUpdate(
      _id,
      { ...customerReference, _id },
      { new: true }
    )

  res.json(updatedCustomerReference)
}

export const deleteCustomerReference = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No customer reference with that id')

  await CustomerReferenceModel.findByIdAndRemove(id)

  res.json({ message: 'Customer Reference deleted successfully' })
}

export const getCustomerReferencesByCompany = async (req, res) => {
  const { searchQuery } = req.query

  try {
    const customerReferences = await CustomerReferenceModel.find({
      customer: searchQuery,
    })

    res.json({ data: customerReferences })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
