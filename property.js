// prendre la valeur d'une proprieter css la convertir en float
export function getCssProperty(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}
// donner une valeur a une proprieter css
export function setCssProperty(elem, prop, value) {
  elem.style.setProperty(prop, value)
}
// changer ou augmenter la valeur d'une proprieter css
export function incrementCssProperty(elem, prop, inc) {
  setCssProperty(elem, prop, getCssProperty(elem, prop) + inc)
}