import mongoose from 'mongoose'

import CompanyModel from '../models/CompanyModel.js'

//export const getCompanies = async (req, res) => {
//  try {
//    const allCompanies = await CompanyModel.find().sort({ _id: -1 })
//
//    res.status(200).json(allCompanies)
//  } catch (error) {
//    res.status(404).json({ message: error.message })
//  }
//}

export const getCompany = async (req, res) => {
  const { id } = req.params

  try {
    const company = await CompanyModel.findById(id)

    res.status(200).json(company)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createCompany = async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    businessName,
    contactAddress,
    businessRegistrationNumber,
    logo,
    website,
    user,
  } = req.body

  const newCompany = new CompanyModel({
    name,
    email,
    phoneNumber,
    businessName,
    contactAddress,
    businessRegistrationNumber,
    logo,
    website,
    user,
    createdAt: new Date().toISOString(),
  })

  try {
    const existingCompany = await CompanyModel.findOne({
      businessRegistrationNumber,
      user,
    })

    if (existingCompany)
      return res.status(404).json({ message: 'Company already exist' })
    await newCompany.save()

    res.status(201).json(newCompany)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const getCompanyByUser = async (req, res) => {
  const { searchQuery } = req.query

  try {
    // const email = new RegExp(searchQuery, "i");

    const company = await CompanyModel.findOne({ user: searchQuery })

    res.json({ data: company })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getCompaniesByUser = async (req, res) => {
  const { searchQuery } = req.query

  try {
    // const email = new RegExp(searchQuery, "i");

    const company = await CompanyModel.find({ user: searchQuery })

    res.json({ data: company })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getCompaniesBySearch = async (req, res) => {
  const { searchQuery } = req.query

  try {
    const name = new RegExp(searchQuery, 'i')
    const email = new RegExp(searchQuery, 'i')

    const companies = await CompanyModel.find({ $or: [{ name }, { email }] })

    res.json({ data: companies })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const updateCompany = async (req, res) => {
  const { id: _id } = req.params
  const company = req.body

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No company with that id')

  const updatedCompany = await CompanyModel.findByIdAndUpdate(
    _id,
    { ...company, _id },
    { new: true }
  )

  res.json(updatedCompany)
}

export const deleteCompany = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No company with id: ${id}`)

  await CompanyModel.findByIdAndRemove(id)

  res.json({ message: 'Company deleted successfully.' })
}
