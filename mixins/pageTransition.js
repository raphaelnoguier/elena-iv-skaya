import anime from 'animejs'
import TweenLite from 'gsap'

let createTransition = () => {
  return {
    transition(to, from) {
      let toAbout = to.name === 'about' || to.name === 'About'
      let fromSerie = from && from.name === 'serie-slug' && to.name !== 'serie-slug'
      let toSerie = to.name === 'serie-slug'
      let serieToSerie = from && to && to.name === 'serie-slug' && from.name === 'serie-slug'
      let imgTransition = null
      let isChromeIos = navigator.userAgent.match('CriOS')

      if(document.querySelector('.error-wrapper')) return

      const app = document.getElementById('app')
      const nav = document.querySelector('.nav')
      const navItems = nav.querySelectorAll('li')
      const transitionContainer = document.querySelector('.transition-wrapper')
      const imageContainer = transitionContainer.querySelector('.image-transition')
      const mask = transitionContainer.querySelector('.image-transition img')
      const fixedEls = document.querySelector('.fixed-elements')
      const tl = anime.timeline({ easing: 'easeInOutQuad', duration: 750 })
      const isDesktop = window.innerWidth > 768

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
        beforeLeave(el) {
          el.style.transform = 'transform: translate3d(0, 0, 0)'

          if(fromSerie) {
            imgTransition = this.$store.getters.serieLoaderImg
          } else {
            imgTransition = this.$store.getters.currentDoc.data.loader_image.url
          }
        },
        leave(el, done) {
          const activeProgressBar = document.querySelector('.loading-progress.active')
          const nextImg = new Image
          nextImg.src = imgTransition

          nextImg.onload = () => {
            console.log(activeProgressBar)
            if(activeProgressBar) activeProgressBar.style.transform = 'scale3d(1, 1, 1)'
            toSerie && isDesktop ? navItems[0].style.opacity = 0 : navItems[0].style.opacity = ''

            el.classList.remove('page-enter', 'page-leave')
            el.classList.add('page-leave')
            this.$parent.transitioning = true

            tl.add({
              targets: imageContainer,
              scale: [1.1, 1],
              height: '100%',
              complete: () => {
                if(isDesktop) fixedEls.innerHTML = ''

                if(to.name !== 'index') window.scroll(0, 0)
                if(from && from.name === 'serie-slug' && to.name === 'index') window.scroll(0, this.$store.state.position)

                document.body.style.transitionDuration = '0ms'
                document.body.classList.remove('no-links')
                nav.classList.add('before-enter')

                toAbout ? document.body.dataset.background = 'dark' : document.body.dataset.background = 'white'

                TweenLite.set(mask, {top: 0})
                TweenLite.to(mask, 0.5, {y: -200, force3D: true, ease: 'Quad.easeInOut'})
              }
            }).add({
              targets: transitionContainer,
              height: 0,
              complete: () => {
                this.$parent.transitioning = false
                this.$parent.domLoaded = false

                imageContainer.style.height = ''
                transitionContainer.style.height = ''
                TweenLite.set(mask, {top: '', y: ''})

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

          this.$parent.domLoaded = true
        },
        enter(el, done) {
          let nav = this.$parent.$refs.nav.$el;
          navItems[0].style.opacity = ''
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
