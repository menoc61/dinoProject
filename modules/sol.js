import {
  getCssProperty,
  incrementCssProperty,
  setCssProperty,
} from "../property.js"
// vitesse de base
const SPEED = 0.05
//capture tous les data-class sol
const groundElems = document.querySelectorAll("[data-ground]")

export function setupGround() {
  //assignier la position du premier sol a zero et celle du deuxeme a 300px a la gauche
  setCssProperty(groundElems[0], "--left", 0)//--left est la proprieter css create dans le css
  setCssProperty(groundElems[1], "--left", 300)
}

export function updateGround(delta, speedScale) {
  //faire avance la position du sol par la gauche a chaque fois que les frames sont mis a jour
  groundElems.forEach(ground => {
    incrementCssProperty(ground, "--left", delta * speedScale * SPEED * -1)

    if (getCssProperty(ground, "--left") <= -300) {
      incrementCssProperty(ground, "--left", 600)
    }
  })
}