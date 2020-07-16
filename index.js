const express = require('express')
const app = express()

// TODO: set up
const cors = require('cors')
app.use(cors());
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

// TODO: DB Setup
const db = { knowledges: [] }
// TODO: DB Setup repos
const { KnowledgeRepo } = require('./app/repos')({ db })
// TODO: initialize in routes ?
const { knowledgeCreate } = require('./app/knowledge/feature-services')({ KnowledgeRepo })
const postKnowledges = require('./app/knowledge/handlers/post-knowledges')({ knowledgeCreate })
app.post('/knowledges', postKnowledges.handler)

const { knowledgeList } = require('./app/knowledge/feature-services')({ KnowledgeRepo })
const getKnowledges = require('./app/knowledge/handlers/get-knowledges')({ knowledgeList })

app.get('/knowledges', getKnowledges.handler)

const { knowledgeGet } = require('./app/knowledge/feature-services')({ KnowledgeRepo })
const getKnowledgeById = require('./app/knowledge/handlers/get-knowledges-id')({ knowledgeGet })

app.get('/knowledges/:id', getKnowledgeById.handler)


app.listen(3001, () => {
  console.log('Starting server');
});
