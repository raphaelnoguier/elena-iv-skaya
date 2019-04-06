const map  = (value, start1, stop1, start2, stop2) => {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}

const clamp =  (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

const lerp  = (start, end, t) => {
  return start * (1 - t) + end * t
}

export default {
  map,
  lerp,
  clamp
}