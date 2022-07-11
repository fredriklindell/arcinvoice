import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const SECRET = process.env.SECRET
const HOST = process.env.SMTP_HOST
const PORT = process.env.SMTP_PORT
const USER = process.env.SMTP_USER
const PASS = process.env.SMTP_PASS

import UserModel from '../models/UserModel.js'
import CompanyModel from '../models/CompanyModel.js'

export const getUsers = async (_, res) => {
  try {
    const users = await UserModel.find()

    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body //Coming from formData

  try {
    const existingUser = await UserModel.findOne({ email }).populate('company')

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" })

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' })

    const userCompany = await CompanyModel.findOne({
      user: existingUser?._id,
    })

    //If crednetials are valid, create a token for the user
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET,
      { expiresIn: '1h' }
    )
    console.log(token)

    //Then send the token to the client/frontend
    res.status(200).json({ user: existingUser, company: userCompany, token })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body

  try {
    const existingUser = await UserModel.findOne({ email })

    if (existingUser)
      return res.status(400).json({ message: 'User already exist' })

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" })

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    })

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET, {
      expiresIn: '1h',
    })

    res.status(200).json({ user: result, company: null, token })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const forgotPassword = (req, res) => {
  const { email } = req.body

  // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
  const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    auth: {
      user: USER,
      pass: PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
    }
    const token = buffer.toString('hex')
    UserModel.findOne({ email: email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: 'User does not exist in our database' })
      }
      user.resetToken = token
      user.expireToken = Date.now() + 3600000
      user
        .save()
        .then((result) => {
          transporter.sendMail({
            to: user.email,
            from: 'Arc Invoice <hello@arcinvoice.com>',
            subject: 'Password reset request',
            html: `
                    <p>You requested for password reset from Arc Invoicing application</p>
                    <h5>Please click this <a href="https://arcinvoice.com/reset/${token}">link</a> to reset your password</h5>
                    <p>Link not clickable?, copy and paste the following url in your address bar.</p>
                    <p>https://arcinvoice.com/reset/${token}</p>
                    <P>If this was a mistake, just ignore this email and nothing will happen.</P>
                    `,
          })
          res.json({ message: 'check your email' })
        })
        .catch((err) => console.log(err))
    })
  })
}

export const resetPassword = (req, res) => {
  const newPassword = req.body.password
  const sentToken = req.body.token
  UserModel.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: 'Try again session expired' })
      }
      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((saveduser) => {
          res.json({ message: 'password updated success' })
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

export const updateUserName = async (req, res) => {
  const { id: _id } = req.params
  const { newUserName } = req.body

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No User with that id')

  const updatedUser = await UserModel.findByIdAndUpdate(
    _id,
    { name: newUserName, _id },
    { new: true }
  )

  const returnCompany = await UserModel.findById(updatedUser._id)

  res.json(returnCompany)
}
