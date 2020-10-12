/*
const title = document.getElementById('title')
const deezer = document.getElementById('listen')
const player = document.getElementById('player')

function hidePlayer (text, link) {
  if (!link) link = ''
  player.style.display = 'none'
  title.innerText = text
  title.href = link
}

function showPlayer (text, link) {
  if (!link) link = ''
  player.style.display = 'block'
  title.innerText = text
  title.href = link
}

function infinity() {
  DZ.Event.subscribe('track_end', function() {
    const last = DZ.player.getTrackList().length - 1
    const current = DZ.player.getCurrentIndex()
    console.log(last, current)
    if(current === last) {
      hidePlayer("Loading...")
      findAlbum()
    }
  })
}

function playMusic () {
  // infinity()
  console.log('Picking album...')
  var req = new XMLHttpRequest()
  req.addEventListener('load', function result (event) {
    const selected = JSON.parse(req.response)
    title.innerText = selected.title
    title.href = selected.link
    deezer.href = selected.link
    console.log('Picked album')
    console.log(selected)
    DZ.player.playAlbum(selected.id, false, function () {
      player.style.display = 'block'
    })
  })
  req.open('GET', './discover')
  req.send()
}
*/

function login () {
  console.log('Logging in...')
  DZ.login(function (response) {
    if (response.status !== 'connected') {
      console.log('Login failed')
    } else {
      console.log('Logged in')
      //return playMusic()
    }
  }, {
    perms: 'basic_access'
  })
}

function getLoginStatus () {
  console.log('Fetching login status...')
  DZ.getLoginStatus(function (response) {
    console.log('Fetched status')
    console.log(response)
    if (response.status !== 'connected') {
      return login()
    } else {
    }
  })
}

window.dzAsyncInit = function () {
  console.log('Initializing the deezer sdk...')
  DZ.ready(function () {
    console.log('Initialized the deezer sdk')
    return getLoginStatus()
  })
  DZ.init({
    appId: '438782',
    channelUrl: 'https://audile.app/channel.html',
    player: {
      container: 'player',
      width: 300,
      height: 300,
      format: 'square'
    }
  })
}

document.addEventListener('DOMContentLoaded', function (event) {
  var loader = document.createElement('script')
  loader.src = 'https://cdns-files.dzcdn.net/js/min/dz.js'
  loader.async = true
  document.getElementById('dz-root').appendChild(loader)
})
