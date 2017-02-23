const $grudgeContainer = $('.grudge-container')
let uid;

$(document).ready(function() {
  getParamFromURL()
})

const getParamFromURL = () => {
  const location = this.location
  const param = parseInt(
    location.href.substr(location.href.lastIndexOf('/') + 1)
  )
  uid = param
  getGrudge(param)
}

const getGrudge = (id) => {
  axios.get(`/api/grudges/${id}`)
  .then(res => displayGrudge(res.data[0]))
  .catch(err => console.error('ERROR: in getGrudge func', err))
}

const displayGrudge = (grudge) => {
  grudgeToHTML(grudge)
}

const grudgeToHTML = (grudge) => {
  //TODO: document fragement
  $grudgeContainer.append(`<h1>${grudge.name}</h1>
                            <p>Reason for grudge: ${grudge.offence}</p>
                            <button class='forgive-btn'>Forgive</button>
                            <h3 class='forgiven-msg'></h3>`)

  if(grudge.forgiven) {
    showForgivenStyles()
    showForgivenContent()
  }
}

const forgiveGrudge = (id) => {
  updateForgiveInDb(id)
  showForgivenStyles()
  showForgivenContent()
}

const updateForgiveInDb = (id) => {
  axios.patch(`/api/grudges/${id}`)
  .then(res => console.log(res))
  .catch(err => console.error('ERROR: in updateForgiveInDb', err))
}

$grudgeContainer.on('click', (e) => {
  if(e.target && e.target.matches("button.forgive-btn")) {
    forgiveGrudge(uid)
  }
})

const showForgivenStyles = () => {
  $('body').css('background-color', 'pink')
  $('.forgive-btn').remove()
}

const showForgivenContent = () => {
  $('.forgiven-msg').text(`You must feel great. You\'ve forgiven this person.`)
}
