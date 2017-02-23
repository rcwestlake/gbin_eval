const $grudgeContainer = $('.grudge-list-container')
const $form = $('.js-grudge-form')
const $nameInput = $('.js-name-input')
const $descInput = $('.js-desc-input')
const $dateInput = $('.js-date-input')
const $addGrudgeBtn = $('.js-add-grudge-btn')
const $sortByNameBtn = $('.js-sort-name-btn')
const $sortByOldDateBtn = $('.js-sort-date-old-btn')
const $sortByNewDateBtn = $('.js-sort-date-new-btn')
const $countList = $('.js-counts-list')

let grudgesState

$(document).ready(function() {
  getGrudges()
})

const getGrudges = () => {
  axios.get('/api/grudges')
  .then(res => {
    displayGrudgeList(res.data)
  })
}

const displayGrudgeList = (grudges) => {
  grudgesState = grudges
  //TODO: create document fragment
  clearGrudges()
  grudges.map(grudge => {
    listHTML(grudge)
  })
  getGrudgeCounts(grudges)
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
  .catch(err => console.error('ERROR: in addGrudgeToDb', err))
}

const clearGrudges = () => {
  $('.js-grudge').remove()
  $('.js-count').remove()
}

const clearInputFields = () => {
  $nameInput.val('')
  $descInput.val('')
  $dateInput.val('')
}

const getGrudgeCounts = (grudges) => {
  const length = grudges.length
  const forgiven = grudges.filter(grudges => grudges.forgiven === true).length
  const unforgiven = grudges.filter(grudges => grudges.forgiven !== true).length
  displayCounts(length, forgiven, unforgiven)
}

const displayCounts = (length, forgiven, unforgiven) => {
  $countList.append(`<li class='count js-count'>List length: ${length}</li>`)
  $countList.append(`<li class='count js-count'>Forgiven count: ${forgiven}</li>`)
  $countList.append(`<li class='count js-count'>Unforgiven count: ${unforgiven}</li>`)
}

$sortByNameBtn.on('click', () => {
  //TODO: consider allowing reverse sort
  const sorted = grudgesState.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  grudgesState = sorted
  displayGrudgeList(sorted)
})

$sortByOldDateBtn.on('click', () => {
  const sorted = grudgesState.sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })

  updateGrudgesState(grudgesState, sorted)
  displayGrudgeList(sorted)
})

$sortByNewDateBtn.on('click', () => {
  const sorted = grudgesState.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  updateGrudgesState(grudgesState, sorted)
  displayGrudgeList(sorted)
})

const updateGrudgesState = (state, newState) => {
  state = newState
}
