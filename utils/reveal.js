if (typeof window !== 'undefined') require('intersection-observer')
import assign from 'lodash/assign'

const DATA_INDEX = 'intersection-index'
const ERROR_API = 'Reveal api must be = {dom, update?}'

const STATES = {
  down_enter: 'down-enter',
  up_enter: 'up-enter',
}

const thresholdArray = steps => Array(steps + 1)
    .fill(0)
    .map((_, index) => index / steps || 0)

const getDefaultOpts = (opts) => {
  return assign({
    threshold: thresholdArray(20),
    allowLeave: false
  }, opts)
}

const getDefaultEl = (el) => {
  return assign({
    reveal_state: null,
    ratioIn: 0.5,
    ratioOut: 0.5,
    prevY: 0,
    prevRatio: 0
  }, el)
}

export default function Reveal (elements, opts = {}) {
  let els = !elements.length ? [elements] : elements

  let observer = null

  const defaultOpts = getDefaultOpts(opts)

  els.forEach((el, index) => {
    els[index] = getDefaultEl(el)
    const assignedEl = els[index]
    if (!assignedEl || !assignedEl.dom) throw new Error(ERROR_API)
    assignedEl.dom.setAttribute(DATA_INDEX, index)
  })

  function toggleState (state, el) {
    if (el.classList.contains('state')) return

    for (let className in STATES) { el.classList.remove(STATES[className]) }
    el.classList.add(state)
  }

  function handler (entries, observer) {
    for (let entry of entries) {
      const el = entry.target
      const index = el.getAttribute(DATA_INDEX)
      const {update, ratioIn, ratioOut, prevRatio, prevY} = els[index]
      const currentY = entry.boundingClientRect.top
      const {intersectionRatio, isIntersecting} = entry
      let state = null

      // Down direction
      if (currentY < prevY) {
        if (intersectionRatio > prevRatio && intersectionRatio > ratioIn ) state = STATES.down_enter
        else if (intersectionRatio <= prevRatio && intersectionRatio < 1 - ratioOut) state = STATES.down_leave // 1 - value for inverse ratio on leave (always from top)
      } // Up direction
      else if (currentY > prevY) {
        if (intersectionRatio < prevRatio && intersectionRatio < 1 - ratioOut) state = STATES.up_leave // 1 - value for inverse ratio on leave (always from top)
        else if (intersectionRatio >= prevRatio && intersectionRatio > ratioIn) state = STATES.up_enter
      }

      els[index].prevY = currentY
      els[index].prevRatio = intersectionRatio

      // If no state or same state ignore it
      if (state && els[index].reveal_state !== state) {
        if (!defaultOpts.allowLeave) observer.unobserve(el)
        els[index].reveal_state = state // store state
        toggleState(state, el) // css update
        update && update(state, el) // function update
      }
    }
  }

  function init () {
    observer = new IntersectionObserver(handler, defaultOpts)
    els.forEach(el => observer.observe(el.dom))
  }

  function destroy () {
    els.forEach(el => observer.unobserve(el.dom))
    observer = null
    els = []
  }

  init()

  return {
    destroy
  }
}
