import mongoose from 'mongoose'

import CompanyReferenceModel from '../models/CompanyReferenceModel.js'

export const getCompanyReference = async (req, res) => {
  const { id } = req.params

  try {
    const companyReference = await CompanyReferenceModel.findById(id)

    res.status(200).json(companyReference)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getCompanyReferences = async (req, res) => {
  const { page } = req.query

  try {
    const LIMIT = 8
    const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page

    const total = await CompanyReferenceModel.countDocuments({})
    const companyReferences = await CompanyReferenceModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)

    res.json({
      data: companyReferences,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createCompanyReference = async (req, res) => {
  const companyReference = req.body

  const newCompanyReference = new CompanyReferenceModel({
    ...companyReference,
    createdAt: new Date().toISOString(),
  })

  try {
    await newCompanyReference.save()
    res.status(201).json(newCompanyReference)
  } catch (error) {
    res.status(409).json(error.message)
  }
}

export const updateCompanyReference = async (req, res) => {
  const { id: _id } = req.params
  const companyReference = req.body

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No company reference with that id')

  const updatedCompanyReference = await CompanyReferenceModel.findByIdAndUpdate(
    _id,
    { ...companyReference, _id },
    { new: true }
  )

  res.json(updatedCompanyReference)
}

export const deleteCompanyReference = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No company reference with that id')

  await CompanyReferenceModel.findByIdAndRemove(id)

  res.json({ message: 'Company Reference deleted successfully' })
}

export const getCompanyReferencesByCompany = async (req, res) => {
  const { searchQuery } = req.query

  try {
    const companyReferences = await CompanyReferenceModel.find({
      company: searchQuery,
    })

    res.json({ data: companyReferences })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
