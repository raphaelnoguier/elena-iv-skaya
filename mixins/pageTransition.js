import anime from 'animejs'

let createTransition = () => {
  return {
    transition(to, from) {
      let toHome = to.name === 'index'
      return {
        name: 'page',
        leave(el, done) {
          let transitionContainer = document.querySelector('.transition-wrapper')
          let imageContainer = transitionContainer.querySelector('.image-transition')
          let mask = transitionContainer.querySelector('.image-transition .transition-mask')

          let tmpImg = new Image
          tmpImg.src = this.$store.getters.currentDoc.data.loader_image.url
          tmpImg.onload = () => {
            let tl = anime.timeline({
              easing: 'easeInOutQuad',
              duration: 750,
            })

            if(toHome) {
              imageContainer.style.top = 0
              mask.style.top = 0
            }

            tl.add({
              targets: imageContainer,
              scale: [1.1, 1],
              height: '100%',
              complete: () => {
                if(toHome) {
                  imageContainer.style.top = 'unset'
                  imageContainer.style.bottom = 0
                  transitionContainer.style.top = 'unset'
                  transitionContainer.style.bottom = 0
                } else {
                  imageContainer.style.top = 0
                  imageContainer.style.bottom = 'unset'
                  transitionContainer.style.top = 0
                  transitionContainer.style.bottom = 'unset'
                  mask.style.top = 0
                }
                mask.style.transform = 'translate3d(0, -200px, 0)'
              }
            }).add({
              targets: transitionContainer,
              height: 0,
              complete: () => {
                imageContainer.style.height = 0
                imageContainer.style.top = ''
                imageContainer.style.bottom = 0
                transitionContainer.style.height = '100vh'
                mask.style.top = ''
                mask.style.bottom = '0'
                mask.style.transform = "translate3d(0, 0, 0)"
                this.$parent.domLoaded = false
                done()
              }
            })
          }
        },
        beforeEnter() {
          this.$nextTick( () => {
            this.$parent.domLoaded = true
          })
        },
        enter(el, done) {
          done()
        }
      }
    },
  }
}

export let pageTransition = createTransition()
