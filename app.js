import { updateGround, setupGround } from "./modules/sol.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./modules/dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./modules/cactus.js"

//longeur de l'ecran par default
const WORLD_WIDTH = 100
//hauteur de l'ecran par default
const WORLD_HEIGHT = 30
// vitesse par default
const SPEED_SCALE_INCREASE = 0.00001

//selectionner des data-class sur le DOM
const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
const endScreenElem = document.querySelector("[data-end-screen]")
const record = document.querySelector(".record")
// redimensionner l'ecran dependant de ça taille
setPixelToWorldScale() // loopback function
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime // utiliser pour pouvoir garder la valeur de la milliseconde passe et calculer delta
let speedScale
let score
let name
var player = []
// function qui s'execute chaque seconde et actualise completement le contenu du navigateur
function update(time) {
  if (lastTime == null) {
    lastTime = time
    //execute et met a jour les frame sur l'ecran a chaque fois que la function est execute
    window.requestAnimationFrame(update)
    return
  }
  // delta est la constant gardant le temps entre chaque frame
  const delta = time - lastTime

  updateGround(delta, speedScale)//update the speed of the ground depending on the speed scale
  updateDino(delta, speedScale)//update the speed of the dino depending on the speed scale
  updateCactus(delta, speedScale)//update the speed of the cactus depending on the speed scale
  updateSpeedScale(delta)// keep updating the speed scale depending on time
  updateScore(delta)//update the score of the user

  if (checkLose()) return handleLose()

  lastTime = time
     //execute et met a jour les frame sur l'ecran a chaque fois que la function est execute
  window.requestAnimationFrame(update)
}
//function pour verifier les collision
function checkLose() {
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
  }
  
  function isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    )
  }
  //function pour calcule le degree de vitesse dependant du temps et du coiefficients d'incrementation
  function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
  }
  //calculer le score de l'utiliser
  function updateScore(delta) {
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score)
  }
  console.log(score,lastTime)
  //function pour le lancement d'un nouveau jeux
  function handleStart() {
    lastTime = null
    speedScale = 1 // inisializ the default speed scale
    score = 0
    name = prompt("Enter your name:")
  
    setupGround()
    setupDino()
    setupCactus()
    startScreenElem.classList.add("hide")
    endScreenElem.classList.add("hide")
    window.requestAnimationFrame(update)
  }

  //function pour la fin d'un nouveau jeux
  function handleLose() {
    setDinoLose()
    setTimeout(() => {
      document.addEventListener("keydown", handleStart, { once: true })
      endScreenElem.classList.remove("hide")
      let person = {name,score}
      player.push(person)
      Array.from(player).forEach(user => {
        record.textContent += user.name + " " + parseInt(user.score) 
      })
    }, 100)
  }  

function setPixelToWorldScale() {
    let worldToPixelScale
    //calcule la taille du world dependant de l'orintation 
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        //si horizontal prendre measure dependant de la longeur
      worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        //si horizontal prendre measure dependant de la hauteur
      worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }
  // create des styles pour insere dynamiquement sur le DOM
    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
  }