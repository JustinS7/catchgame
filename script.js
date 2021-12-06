const screens = document.querySelectorAll('.screen')
const choose_face_btn = document.querySelectorAll('.choose-face')
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const messageEl = document.getElementById('message')
let seconds = 0
let score = 0
let selected_face = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_face_btn.forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img')
    const src = img.getAttribute('src')
    const alt = img.getAttribute('alt')
    selected_face = { src, alt }
    screens[1].classList.add('up')
    setTimeout(createFace, 1000)
    startGame()
  })
})

function startGame() {
  setInterval(increaseTime, 1000)
}

function increaseTime() {
  let m = Math.floor(seconds / 60)
  let s = seconds % 60
  m = m < 10 ? `0${m}` : m
  s = s < 10 ? `0${s}` : s 
}

function createFace() {
  const face = document.createElement('div')
  face.classList.add('faceimage')
  const { x, y } = getRandomLocation()
  face.style.top = `${y}px`
  face.style.left = `${x}px`
  face.innerHTML = `<img src="${selected_face.src}" alt="${selected_face.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

  face.addEventListener('click', catchFace)

  game_container.appendChild(face)
}

function getRandomLocation() {
  const width = window.innerWidth
  const height  = window.innerHeight
  const x = Math.random() * (width - 200) + 100
  const y = Math.random() * (height - 200) + 100
  return { x, y }
}

function catchFace() {
  increaseScore()
  this.classList.add('caught')
  setTimeout(() => this.remove(), 2000)
  addFace()
}

function addFace() {
  setTimeout(createFace, 1000)
  setTimeout(createFace, 1500)
}

function increaseScore() {
  score++
  if(score > 19) {
    message.classList.add('visible')
  }
  scoreEl.innerHTML = `Score: ${score}`
}