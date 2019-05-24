import anime from 'animejs'

let createTransition = () => {
  return {
    transition(to, from) {
      let toAbout = to.name === 'about' || to.name === 'About'
      let fromSerie = from && from.name === 'serie-slug' && to.name !== 'serie-slug'
      let serieToSerie = from && to && to.name === 'serie-slug' && from.name === 'serie-slug'
      let imgTransition = null

      return {
        name: 'page',
        css: false,
        beforeLeave() {
          document.body.classList.add('lock')
          if(fromSerie) {
            imgTransition = this.$store.getters.serieLoaderImg
          } else {
            imgTransition = this.$store.getters.currentDoc.data.loader_image.url
          }
        },
        leave(el, done) {
          let nav = document.querySelector('.nav')
          let navItems = nav.querySelectorAll('li')
          let transitionContainer = document.querySelector('.transition-wrapper')
          let imageContainer = transitionContainer.querySelector('.image-transition')
          let mask = transitionContainer.querySelector('.image-transition img')
          let fixedEls = document.querySelector('.fixed-elements')

          const tmp = new Image

          tmp.src = imgTransition

          tmp.onload = () => {
            const tl = anime.timeline({ easing: 'easeInOutQuad', duration: 750 })

            fromSerie ? navItems[0].style.opacity  = 0 : null

            el.classList.remove('page-enter', 'page-leave')
            el.classList.add('page-leave')
            this.$parent.transitioning = true

            tl.add({
              targets: imageContainer,
              scale: [1.1, 1],
              height: '100%',
              complete: () => {
                fixedEls.innerHTML = ''
                if(to.name !== 'index') window.scroll(0, 0)
                if(from && from.name === 'serie-slug' && to.name === 'index') window.scroll(0, this.$store.state.position)

                nav.classList.add('before-enter')
                toAbout ? document.body.dataset.background = 'dark' : document.body.dataset.background = 'white'
                fromSerie && !serieToSerie ? navItems[0].style.opacity = 1 : navItems[0].style.opacity = ''

                mask.style.top = 0
                mask.style.transform = 'translate3d(0, -200px, 0)'
              }
            }).add({
              targets: transitionContainer,
              height: 0,
              complete: () => {
                this.$parent.transitioning = false
                this.$parent.domLoaded = false

                imageContainer.style.height = 0
                transitionContainer.style.height = '100vh'
                mask.style.top = ''
                mask.style.transform = "translate3d(0, 0, 0)"
                done()
              }
            })
          }
        },
        beforeEnter() {
          document.body.classList.remove('lock')
          setTimeout(() => this.$parent.domLoaded = true, 1)
        },
        enter(el, done) {
          let nav = this.$parent.$refs.nav.$el
          el.classList.remove('page-leave')
          el.classList.add('page-enter')
          done()

          setTimeout(() => nav.classList.remove('before-enter'), 200);
        }
      }
    },
  }
}

export let pageTransition = createTransition()
