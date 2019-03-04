import Scrollbar from 'smooth-scrollbar';

const defaultProps = {
  alwaysShowTracks: true,
  damping: 0.15
}

const add = function (el, listener, props = defaultProps) {
  const scrollbar = Scrollbar.init(el, props)
  listener && scrollbar.addListener(listener)
  return scrollbar
}

const remove = function (el, listener) {
  const scrollbar = Scrollbar.get(el)
  listener && scrollbar.removeListener(listener)
  Scrollbar.destroy(el)
}

export default {
  add,
  remove
}
