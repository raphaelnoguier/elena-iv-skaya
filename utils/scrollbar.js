import Scrollbar from 'smooth-scrollbar';
import easing from '~/utils/easing.js'

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

const unlisten = function (el, listener) {
  const scrollbar = Scrollbar.get(el)
  listener && scrollbar.removeListener(listener)
}

const destroyAll = function () {
  Scrollbar.destroyAll()
}

const scrollTo = function (el,y) {
  const scrollbar = Scrollbar.get(el)
  scrollbar.scrollTo(0, y, 500, {
    easing: easing.easeInOutQuad,
  });
}

export default {
  add,
  destroyAll,
  listen,
  unlisten,
  scrollTo
}
