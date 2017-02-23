const $grudgeContainer = $('.grudge-list-container')
const $form = $('.js-grudge-form')
const $nameInput = $('.js-name-input')
const $descInput = $('.js-desc-input')
const $dateInput = $('.js-date-input')
const $addGrudgeBtn = $('.js-add-grudge-btn')

$(document).ready(function() {
  getGrudges()
})

const getGrudges = () => {
  axios.get('/api/grudges')
  .then(res => {
    console.log('response', res.data);
    displayGrudgeList(res.data)
  })
}

const displayGrudgeList = (grudges) => {
  //TODO: create document fragment
  clearGrudges()
  grudges.map(grudge => {
    listHTML(grudge)
  })
}

const listHTML = (grudge) => {
  $grudgeContainer.append(`<li class='grudge js-grudge ${grudge.id}'><a href="/grudge/${grudge.id}">${grudge.name}</a></li>`)
}

$form.on('submit', (e) => {
  //TODO: move values into getInput func
  e.preventDefault()
  const name = $nameInput.val()
  const offence = $descInput.val()
  const date = $dateInput.val()
  addGrudgeToDb(name, offence, date)
  clearInputFields()
})

const addGrudgeToDb = (name, offence, date) => {
  axios.post('/api/grudges', {name, offence, date})
  .then(res => displayGrudgeList(res.data))
}

const clearGrudges = () => {
  $('.js-grudge').remove()
}

const clearInputFields = () => {
  $nameInput.val('')
  $descInput.val('')
  $dateInput.val('')
}
