//Copyright (c) 2022 Panshak Solomon

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import articleRoutes from './routes/articles.js'
import companyRoutes from './routes/companies.js'
import companyReferenceRoutes from './routes/company-reference.js'
import customerRoutes from './routes/customers.js'
import customerReferenceRoutes from './routes/customer-reference.js'
import invoiceRoutes from './routes/invoices.js'
import userRoutes from './routes/users.js'

// import pdfTemplate from './documents/index.js';
// import invoiceTemplate from './documents/invoice.js';
import invoiceDev from './documents/invoice-dev.js'
import emailTemplate from './documents/email.js'
import generatePDF from './lib/puppeteer-pdf-generator.js'

const app = express()
dotenv.config()

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/articles', articleRoutes)
app.use('/companies', companyRoutes)
app.use('/company-references', companyReferenceRoutes)
app.use('/customers', customerRoutes)
app.use('/customer-references', customerReferenceRoutes)
app.use('/invoices', invoiceRoutes)
app.use('/users', userRoutes)

// NODEMAILER TRANSPORT FOR SENDING INVOICE VIA EMAIL
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

// SEND PDF INVOICE VIA EMAIL
app.post('/send-pdf', async (req, res, next) => {
  const { email, company } = req.body

  const content = invoiceDev(req.body)
  await generatePDF(content, 'invoice.pdf')

  // send mail with defined transport object
  try {
    transporter.sendMail({
      //      from: ` Arc Invoice <hello@arcinvoice.com>`, // sender address
      from: `Invoice ${company.businessName} <${process.env.SMTP_USER}>`, // sender address, TODO: from field in body?
      to: `${email}`, // list of receivers
      replyTo: `${company.email}`,
      subject: `Invoice from ${
        company.businessName ? company.businessName : company.name
      }`, // Subject line
      text: `Invoice from ${
        company.businessName ? company.businessName : company.name
      }`, // plain text body
      html: emailTemplate(req.body), // html body
      attachments: [
        {
          filename: 'invoice.pdf',
          path: `${__dirname}/invoice.pdf`,
        },
      ],
    })
    res.sendStatus(200)
  } catch (err) {
    next(error)
  }
})

// CREATE PDF INVOICE
app.post('/create-pdf', async (req, res) => {
  const content = invoiceDev(req.body)
  await generatePDF(content, 'invoice.pdf')
  res.sendStatus(200)
})

// GET INVOICE HTML
app.post('/invoice-html', async (req, res) => {
  res.send(invoiceDev(req.body))
})

// SEND PDF INVOICE
app.get('/fetch-pdf', (_, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`)
})

// TEST ENDPOINT
app.get('/', (_, res) => {
  res.send('SERVER IS RUNNING')
})

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 5000

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message))
