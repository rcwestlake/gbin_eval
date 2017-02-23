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
    offense: 'on the cavs',
    forgiven: false,
    date: '2/22/17'
  },
  {
    id: 2,
    name: 'KD',
    offense: 'left OKC',
    forgiven: false,
    date: '2/20/17'
  }
]

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views', 'home.html'));
})

app.get('/api/grudges', (req, res) => {
  res.status(200).json(app.locals.grudges)
})

app.listen(PORT, () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
})
