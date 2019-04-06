import math from './math'

const lerpUtil = function (val) {
  let current = val || 0
  let target = val || 0

  function update (step = 0.1) {
    current =
      Math.abs(target - current) < 0.001
        ? target
        : math.lerp(current, target, step)
  }

  function set (t) {
    target = t
  }

  function get() {
    return current
  }

  return {
    set,
    update,
    get
  }
}

export default lerpUtil
