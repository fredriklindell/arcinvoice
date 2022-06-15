import mongoose from 'mongoose'

import ArticleModel from '../models/ArticleModel.js'

export const getArticle = async (req, res) => {
  const { id } = req.params

  try {
    const article = await ArticleModel.findById(id)

    res.status(200).json(article)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getArticles = async (req, res) => {
  const { page } = req.query

  try {
    const LIMIT = 8
    const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page

    const total = await ArticleModel.countDocuments({})
    const articles = await ArticleModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)

    res.json({
      data: articles,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createArticle = async (req, res) => {
  const article = req.body

  const newArticle = new ArticleModel({
    ...article,
    createdAt: new Date().toISOString(),
  })

  try {
    await newArticle.save()
    res.status(201).json(newArticle)
  } catch (error) {
    res.status(409).json(error.message)
  }
}

export const updateArticle = async (req, res) => {
  const { id: _id } = req.params
  const article = req.body

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No article with that id')

  const updatedArticle = await ArticleModel.findByIdAndUpdate(
    _id,
    { ...article, _id },
    { new: true }
  )

  res.json(updatedArticle)
}

export const deleteArticle = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No article with that id')

  await ArticleModel.findByIdAndRemove(id)

  res.json({ message: 'Article deleted successfully' })
}

export const getArticlesByCompany = async (req, res) => {
  const { searchQuery } = req.query

  try {
    const articles = await ArticleModel.find({ company: searchQuery })

    res.json({ data: articles })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
