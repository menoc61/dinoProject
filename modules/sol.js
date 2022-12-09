import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "../property.js"
// vitesse de base
const SPEED = 0.05
//capture tous les data-class sol
const groundElems = document.querySelectorAll("[data-ground]")

export function setupGround() {
  setCustomProperty(groundElems[0], "--left", 0)//--left est la proprieter css create dans le css
  setCustomProperty(groundElems[1], "--left", 300)
}

export function updateGround(delta, speedScale) {
  groundElems.forEach(ground => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600)
    }
  })
}