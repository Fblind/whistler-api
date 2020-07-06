const express = require('express')
const app = express()

// TODO: set up
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

// TODO: register routes from modules
const axios = require('axios')
const cheerio = require('cheerio')
const scrapper = require('./app/scrapper/scrapper')({ axios, cheerio })
const { parserService } = require('./app/parser/feature-services')({ scrapper })
const postParser = require('./app/parser/handlers/post-parse')({ parserService })

app.post('/parser', postParser.handler)

app.listen(3000, () => {
  console.log('Starting server');
});
