const $grudgeContainer = $('.grudge-list-container')

$(document).ready(function() {
  axios.get('/api/grudges')
  .then(res => {
    console.log('response', res.data);
    displayGrudgeList(res.data)
  })
})

const displayGrudgeList = (grudges) => {
  //TODO: create document fragment
  grudges.map(grudge => {
    listHTML(grudge)
  })
}

const listHTML = (grudge) => {
  $grudgeContainer.append(`<li class=${grudge.id}><a href="/${grudge.id}">${grudge.name}</a></li>`)
}
