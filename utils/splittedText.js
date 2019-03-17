const make = function (text) {
  let letters = []
  text.split('').forEach((letter, index) => {
    letters.push(letter)
  })

  return letters
}


export default {
  make
}
