const easeInOutQuad = (pos) => {
  if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,2);
  return -0.5 * ((pos-=2)*pos - 2);
}

const easeInOutQuart =  (pos) => {
  if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
  return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
}

export default {
  easeInOutQuad,
  easeInOutQuart
}
