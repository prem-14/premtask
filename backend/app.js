require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const connectDB = require('./config/db')
const Movie = require('./model/movie')
const cacheData = require('./cache')

connectDB()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
)


// List API
app.get('/movies', async (req, res) => {
  try {
    if (cacheData.movieList) {
      return res.json(cacheData.movieList)
    }

    const moviesFromDB = await Movie.find({}) 
    cacheData.movieList = moviesFromDB

    res.json(moviesFromDB)
  } catch (error) {
    console.error('Error fetching movie data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Details API
app.get('/movies/:id', async (req, res) => {
  try {
    const movieId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ error: 'Invalid movie ID' })
    }

    const movieDetails = await Movie.findById(movieId)

    if (!movieDetails) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    res.json(movieDetails)
  } catch (error) {
    console.error('Error fetching movie details:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})
