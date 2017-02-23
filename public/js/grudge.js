const $grudgeContainer = $('.grudge-container')

$(document).ready(function() {
  //get param from url
  //pass to get req
  //display on page
  getParamFromURL()
})

const getParamFromURL = () => {
  const location = this.location
  const param = parseInt(
    location.href.substr(location.href.lastIndexOf('/') + 1)
  )
  getGrudge(param)
}

const getGrudge = (id) => {
  //TODO: show error when no page grudge is found
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
                            <button>Forgive</button>`)
}
