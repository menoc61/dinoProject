import { updateGround, setupGround } from "./modules/sol.js"

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
// redimensionner l'ecran dependant de ça taille
setPixelToWorldScale() // loopback function
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime // utiliser pour pouvoir garder la valeur de la milliseconde passe et calculer delta
let speedScale
let score
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

  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  if (checkLose()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
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