// prendre la valeur d'une proprieter css la convertir en float
export function getCustomProperty(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}
// donner une valeur a une proprieter css
export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value)
}
// changer ou augmenter la valeur d'une proprieter css
export function incrementCustomProperty(elem, prop, inc) {
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
}