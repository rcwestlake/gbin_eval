const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 1111

app.set('port', PORT)
app.locals.title = 'GBIN' //change title if necessary

app.locals.grudges = [
  {
    id: 1,
    name: 'Lebron',
    offence: 'on the cavs',
    date: '2/22/17',
    forgiven: false
  },
  {
    id: 2,
    name: 'KD',
    offence: 'left OKC',
    date: '2/15/17',
    forgiven: false
  },
  {
    id: 3,
    name: 'steph',
    offence: 'balling all over',
    date: '1/1/2017',
    forgiven: false
  }
]

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/views', 'home.html'))
})

app.get('/grudge/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/views', 'grudge.html'))
})

app.get('/api/grudges', (req, res) => {
  res.status(200).json(app.locals.grudges)
})

app.post('/api/grudges', (req, res) => {
  const { name, offence, date } = req.body
  let length = app.locals.grudges.length
  const uid = length += 1
  const grudge = { id: uid, name, offence, date, forgiven: false }
  app.locals.grudges.push(grudge)
  res.status(200).json(app.locals.grudges)
})

app.get('/api/grudges/:id', (req, res) => {
  const { id } = req.params
  const grudge = app.locals.grudges.filter(grudge => {
    if(grudge.id === parseInt(id)) return grudge
  })
  res.status(200).json(grudge)
})

app.patch('/api/grudges/:id', (req, res) => {
  const { id } = req.params
  const { forgiven } = req.body
  const updatedGrudges = app.locals.grudges.map(grudge => {
    if(grudge.id === parseInt(id)) grudge.forgiven = true
    return grudge
  })

  app.locals.grudges = updatedGrudges
  res.status(200).json(app.locals.grudges)
})

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/views', 'not-found.html'))
})

if(!module.parent){
  app.listen(PORT, () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}`)
  })
}

module.exports = app
