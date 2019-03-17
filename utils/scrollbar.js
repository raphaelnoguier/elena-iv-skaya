import Scrollbar from 'smooth-scrollbar';

const defaultProps = {
  alwaysShowTracks: true
}

const add = function (el, listener, props = defaultProps) {
  const scrollbar = Scrollbar.init(el, props)
  listener && scrollbar.addListener(listener)
  return scrollbar
}

const listen = function (el, listener) {
  const scrollbar = Scrollbar.get(el)
  scrollbar && listener && scrollbar.addListener(listener)
  return scrollbar
}

const remove = function (el, listener) {
  const scrollbar = Scrollbar.get(el)
  listener && scrollbar.removeListener(listener)
  scrollbar.destroy(el)
}

const setPosition = function (el, x, y) {
  const scrollbar = Scrollbar.get(el)
  scrollbar.setPosition(x,y)
}

export default {
  add,
  remove,
  listen,
  setPosition
}
