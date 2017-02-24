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
  $grudgeContainer.append(`<li class='grudge js-grudge ${grudge.id}'>
                            <a class='grudge-text' href="/grudge/${grudge.id}">
                              ${grudge.name} ${grudge.forgiven ? '<span class="forgiven">(forgiven)</span>': ''}
                            </a>
                           </li>`)
}

$form.on('submit', (e) => {
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
  const length = getListCount(grudges)
  const forgiven = getForgivenCount(grudges)
  const unforgiven = getUnforgivenCount(grudges)
  displayCounts(length, forgiven, unforgiven)
}

const getListCount = (grudges) => {
  return grudges.length
}

const getForgivenCount = (grudges) => {
  return grudges.filter(grudges => grudges.forgiven === true).length
}

const getUnforgivenCount = (grudges) => {
  return grudges.filter(grudges => grudges.forgiven !== true).length
}

const displayCounts = (length, forgiven, unforgiven) => {
  $countList.append(`<li class='count js-count'>List length: ${length}</li>`)
  $countList.append(`<li class='count js-count'>Forgiven count: ${forgiven}</li>`)
  $countList.append(`<li class='count js-count'>Unforgiven count: ${unforgiven}</li>`)
}

$sortByNameBtn.on('click', () => {
  const sorted = sortByName()
  grudgesState = sorted
  displayGrudgeList(sorted)
})

$sortByOldDateBtn.on('click', () => {
  const sorted = sortByOldDate()
  updateGrudgesState(grudgesState, sorted)
  displayGrudgeList(sorted)
})

$sortByNewDateBtn.on('click', () => {
  const sorted = sortByNewDate()
  updateGrudgesState(grudgesState, sorted)
  displayGrudgeList(sorted)
})


const sortByName = () => {
  const sorted = grudgesState.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  return sorted
}

const sortByOldDate = () => {
  const sorted = grudgesState.sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })
  return sorted
}

const sortByNewDate = () => {
  const sorted = grudgesState.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })
  return sorted
}

const updateGrudgesState = (state, newState) => {
  state = newState
  return state
}

if(typeof module !== 'undefined') {
  module.exports = {
    getGrudgeCounts,
    sortByOldDate,
    sortByNewDate,
    sortByName,
    updateGrudgesState,
    getListCount,
    getForgivenCount,
    getUnforgivenCount
  }
}
