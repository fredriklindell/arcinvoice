import mongoose from 'mongoose'

import CustomerModel from '../models/CustomerModel.js'

// export const getClients = async (req, res) => {
//     const userId = req.body

//     try {
//         const allClients = await CustomerModel.find({userId: userId}).sort({_id:-1})
//         //find({}).sort({_id:-1}) to sort according to date of creation

//         res.status(200).json(allClients)

//     } catch (error) {
//         res.status(409).json(error.message)

//     }

// }

export const getCustomer = async (req, res) => {
  const { id } = req.params

  try {
    const client = await CustomerModel.findById(id)

    res.status(200).json(client)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getCustomers = async (req, res) => {
  const { page } = req.query

  try {
    const LIMIT = 8
    const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page

    const total = await CustomerModel.countDocuments({})
    const clients = await CustomerModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)

    res.json({
      data: clients,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createCustomer = async (req, res) => {
  const client = req.body

  const newClient = new CustomerModel({
    ...client,
    createdAt: new Date().toISOString(),
  })

  try {
    await newClient.save()
    res.status(201).json(newClient)
  } catch (error) {
    res.status(409).json(error.message)
  }
}

export const updateCustomer = async (req, res) => {
  const { id: _id } = req.params
  const customer = req.body

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No Customer with that id')

  const updatedCustomer = await CustomerModel.findByIdAndUpdate(
    _id,
    { ...customer, _id },
    { new: true }
  )

  res.json(updatedCustomer)
}

export const deleteCustomer = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No Customer with that id')

  await CustomerModel.findByIdAndRemove(id)

  res.json({ message: 'Customer deleted successfully' })
}

export const getCustomersByCompany = async (req, res) => {
  const { searchQuery } = req.query

  try {
    const customers = await CustomerModel.find({ company: searchQuery })

    res.json({ data: customers })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
