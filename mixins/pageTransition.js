import anime from 'animejs'

let createTransition = () => {
  return {
    transition(to, from) {
      let toAbout = to.name === 'about' || to.name === 'About'
      let fromSerie = from && from.name === 'serie-slug' && to.name !== 'serie-slug'
      let serieToSerie = from && to && to.name === 'serie-slug' && from.name === 'serie-slug'
      let imgTransition = null

      const app = document.getElementById('app')
      const nav = document.querySelector('.nav')
      const navItems = nav.querySelectorAll('li')
      const transitionContainer = document.querySelector('.transition-wrapper')
      const imageContainer = transitionContainer.querySelector('.image-transition')
      const mask = transitionContainer.querySelector('.image-transition img')
      const fixedEls = document.querySelector('.fixed-elements')
      const tl = anime.timeline({ easing: 'easeInOutQuad', duration: 750 })

      const disableScroll = function(e) {
        e.preventDefault()
      }

      if(from && to) {
        /* disable scroll */
        app.addEventListener('scroll', disableScroll, false )
        app.ontouchmove = disableScroll
        app.onwheel = disableScroll
        app.onmousewheel = app.onmousewheel = disableScroll
        document.body.classList.add('lock')
      }

      return {
        name: 'page',
        css: false,
        beforeLeave() {
          if(fromSerie) {
            imgTransition = this.$store.getters.serieLoaderImg
          } else {
            imgTransition = this.$store.getters.currentDoc.data.loader_image.url
          }
        },
        leave(el, done) {
          const tmp = new Image
          tmp.src = imgTransition

          tmp.onload = () => {

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

                document.body.style.transitionDuration = '0ms'
                document.body.classList.remove('no-links')

                if(toAbout) {
                  document.body.dataset.background = 'dark'
                } else {
                  document.body.dataset.background = 'white'
                }

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
                transitionContainer.style.height = ''
                mask.style.top = ''
                mask.style.transform = ""

                done()
              }
            })
          }
        },
        beforeEnter() {
          document.body.style.transitionDuration = ''
          document.body.classList.remove('lock')

          app.removeEventListener('scroll', disableScroll, false)
          app.removeEventListener('touchmove', disableScroll, false)
          app.ontouchmove = null
          app.onmousewheel = app.onmousewheel = null
          app.onwheel = null

          setTimeout(() => this.$parent.domLoaded = true, 1)
        },
        enter(el, done) {

          let nav = this.$parent.$refs.nav.$el
          el.classList.remove('page-leave')
          el.classList.add('page-enter')

          setTimeout(() => nav.classList.remove('before-enter'), 200)
          done()
        }
      }
    },
  }
}

export let pageTransition = createTransition()
