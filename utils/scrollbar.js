import Scrollbar from 'smooth-scrollbar';
import easing from '~/utils/easing.js'

const defaultProps = {
  alwaysShowTracks: false
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

const scrollTo = function (el,y, duration) {
  const scrollbar = Scrollbar.get(el)
  scrollbar.scrollTo(0, y, duration, {
    easing: easing.easeInOutQuart,
  });
}

const scrollIntoView = function (container, el) {
  const scrollbar = Scrollbar.get(container)
  scrollbar.scrollIntoView(el, {
    alignToTop: true
  });
}

const resetPosition = function(el) {
  const scrollbar = Scrollbar.get(el);
  scrollbar.setPosition(0, 0);
}

const setPosition = function(el, y) {
  const scrollbar = Scrollbar.get(el);
  scrollbar && scrollbar.setPosition(0, y);
}

const getOffset = function(el) {
  const scrollbar = Scrollbar.get(el);
  return scrollbar.offset.y
}

const isVisible = function(container, el) {
  const scrollbar = Scrollbar.get(container);
  return scrollbar.isVisible(el)
}

export default {
  add,
  destroyAll,
  listen,
  unlisten,
  scrollTo,
  scrollIntoView,
  resetPosition,
  setPosition,
  getOffset,
  isVisible
}
