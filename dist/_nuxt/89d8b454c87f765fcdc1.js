(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{178:function(t,e,r){"use strict";e.a={map:function(t,e,r,n,o){return n+(t-e)/(r-e)*(o-n)},lerp:function(t,e,r){return t*(1-r)+e*r},clamp:function(t,e,r){return Math.min(Math.max(t,e),r)}}},179:function(t,e,r){"use strict";r.d(e,"a",function(){return o});r(16);var n=r(42),o={transition:function(t,e){var r="about"===t.name||"About"===t.name,o=e&&"serie-slug"===e.name&&"serie-slug"!==t.name,l=e&&t&&"serie-slug"===t.name&&"serie-slug"===e.name,c=null;return{name:"page",css:!1,beforeLeave:function(){document.body.classList.add("lock"),c=o?this.$store.getters.serieLoaderImg:this.$store.getters.currentDoc.data.loader_image.url},leave:function(d,h){var m=this,nav=document.querySelector(".nav"),v=nav.querySelectorAll("li"),f=document.querySelector(".transition-wrapper"),w=f.querySelector(".image-transition"),mask=f.querySelector(".image-transition img"),y=document.querySelector(".fixed-elements"),I=new Image;I.src=c,I.onload=function(){var c=n.a.timeline({easing:"easeInOutQuad",duration:750});o&&(v[0].style.opacity=0),d.classList.remove("page-enter","page-leave"),d.classList.add("page-leave"),m.$parent.transitioning=!0,c.add({targets:w,scale:[1.1,1],height:"100%",complete:function(){y.innerHTML="","index"!==t.name&&window.scroll(0,0),e&&"serie-slug"===e.name&&"index"===t.name&&window.scroll(0,m.$store.state.position),nav.classList.add("before-enter"),document.body.style.transitionDuration="0ms",document.body.dataset.background=r?"dark":"white",v[0].style.opacity=o&&!l?1:"",mask.style.top=0,mask.style.transform="translate3d(0, -200px, 0)"}}).add({targets:f,height:0,complete:function(){m.$parent.transitioning=!1,m.$parent.domLoaded=!1,w.style.height=0,f.style.height="100vh",mask.style.top="",mask.style.transform="translate3d(0, 0, 0)",h()}})}},beforeEnter:function(){var t=this;document.body.style.transitionDuration="",document.body.classList.remove("lock"),setTimeout(function(){return t.$parent.domLoaded=!0},1)},enter:function(t,e){var nav=this.$parent.$refs.nav.$el;t.classList.remove("page-leave"),t.classList.add("page-enter"),e(),setTimeout(function(){return nav.classList.remove("before-enter")},200)}}}}},180:function(t,e,r){t.exports=r.p+"img/4948d1e.svg"},181:function(t,e,r){"use strict";var n=r(178);e.a=function(t){var e=t||0,r=t||0;return{set:function(t){r=t},update:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.1;e=Math.abs(r-e)<.001?r:n.a.lerp(e,r,t)},immediateSet:function(t){e=t,r=t},get:function(){return e}}}},182:function(t,e,r){"use strict";r.d(e,"a",function(){return v});r(32),r(33),r(22),r(189);var n=r(191),o=r.n(n);"undefined"!=typeof window&&r(190);var l="intersection-index",c="Reveal api must be = {dom, update?}",d={down_enter:"down-enter",down_leave:"down-leave",up_enter:"up-enter",up_leave:"up-leave"},h=function(t){return o()({threshold:(e=20,Array(e+1).fill(0).map(function(t,r){return r/e||0})),allowLeave:!0},t);var e},m=function(t){return o()({reveal_state:null,ratioIn:.5,ratioOut:.5,prevY:0,prevRatio:0},t)};function v(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.length?t:[t],n=null,o=h(e);function v(t,e){e.classList.contains("state")||e.classList.add(t)}function f(t,e){var n=!0,c=!1,h=void 0;try{for(var m,f=t[Symbol.iterator]();!(n=(m=f.next()).done);n=!0){var w=m.value,y=w.target,I=y.getAttribute(l),x=r[I],C=x.update,_=x.ratioIn,$=x.ratioOut,L=x.prevRatio,S=x.prevY,D=w.boundingClientRect.top,A=w.intersectionRatio,k=(w.isIntersecting,null);D<S?A>L&&A>_?k=d.down_enter:A<=L&&A<1-$&&(k=d.down_leave):D>S&&(A<L&&A<1-$?k=d.up_leave:A>=L&&A>_&&(k=d.up_enter)),r[I].prevY=D,r[I].prevRatio=A,k&&r[I].reveal_state!==k&&(o.allowLeave||e.unobserve(y),r[I].reveal_state=k,v(k,y),C&&C(k,y))}}catch(t){c=!0,h=t}finally{try{n||null==f.return||f.return()}finally{if(c)throw h}}}return r.forEach(function(t,e){r[e]=m(t);var n=r[e];if(!n||!n.dom)throw new Error(c);n.dom.setAttribute(l,e)}),n=new IntersectionObserver(f,o),r.forEach(function(t){return n.observe(t.dom)}),{destroy:function(){r.forEach(function(t){return n.unobserve(t.dom)}),n=null,r=[]}}}},183:function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSI3cHgiIHZpZXdCb3g9IjAgMCAxNCA3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1My4yICg3MjY0MykgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+Y2hldnJvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSLwn5K7LURlc2t0b3AtRGVzaWduIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iSE9NRSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTcwMS4wMDAwMDAsIC04NTcuMDAwMDAwKSIgZmlsbD0iIzAwMDAwMCI+CiAgICAgICAgICAgIDxnIGlkPSJGRUFUVVJFRCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDE2NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJjaGV2cm9uIiBwb2ludHM9IjcwMSA2OTIgNzE0LjQ4ODc3IDY5MiA3MDcuNzQ0Mzg1IDY5OC43NDQzODUiPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"},244:function(t,e,r){"use strict";var n=r(24),o=r(8),l=r(31),c=r(96),d=r(97),h=r(19),m=r(245),v=r(98);o(o.S+o.F*!r(99)(function(t){Array.from(t)}),"Array",{from:function(t){var e,r,o,f,w=l(t),y="function"==typeof this?this:Array,I=arguments.length,x=I>1?arguments[1]:void 0,C=void 0!==x,_=0,$=v(w);if(C&&(x=n(x,I>2?arguments[2]:void 0,2)),null==$||y==Array&&d($))for(r=new y(e=h(w.length));e>_;_++)m(r,_,C?x(w[_],_):w[_]);else for(f=$.call(w),r=new y;!(o=f.next()).done;_++)m(r,_,C?c(f,x,[o.value,_],!0):o.value);return r.length=_,r}})},245:function(t,e,r){"use strict";var n=r(12),o=r(43);t.exports=function(object,t,e){t in object?n.f(object,t,o(0,e)):object[t]=e}},246:function(t,e){var r=4,n=.001,o=1e-7,l=10,c=11,d=1/(c-1),h="function"==typeof Float32Array;function m(t,e){return 1-3*e+3*t}function v(t,e){return 3*e-6*t}function f(t){return 3*t}function w(t,e,r){return((m(e,r)*t+v(e,r))*t+f(e))*t}function y(t,e,r){return 3*m(e,r)*t*t+2*v(e,r)*t+f(e)}function I(t){return t}t.exports=function(t,e,m,v){if(!(0<=t&&t<=1&&0<=m&&m<=1))throw new Error("bezier x values must be in [0, 1] range");if(t===e&&m===v)return I;for(var f=h?new Float32Array(c):new Array(c),i=0;i<c;++i)f[i]=w(i*d,t,m);function x(e){for(var h=0,v=1,I=c-1;v!==I&&f[v]<=e;++v)h+=d;var x=h+(e-f[--v])/(f[v+1]-f[v])*d,C=y(x,t,m);return C>=n?function(t,e,n,o){for(var i=0;i<r;++i){var l=y(e,n,o);if(0===l)return e;e-=(w(e,n,o)-t)/l}return e}(e,x,t,m):0===C?x:function(t,e,r,n,c){var d,h,i=0;do{(d=w(h=e+(r-e)/2,n,c)-t)>0?r=h:e=h}while(Math.abs(d)>o&&++i<l);return h}(e,h,h+d,t,m)}return function(t){return 0===t?0:1===t?1:w(x(t),e,v)}}},247:function(t,e,r){"use strict";r.r(e);r(70),r(244),r(38);var n=r(5),o=r(39),l=r(42),c={props:{featured:Array,type:String},methods:{click:function(t){t.target.querySelector("img").classList.add("active-link")}}},d=r(3),h=Object(d.a)(c,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home-slider-wrapper",class:"Big"===t.type?"big-slider":"small-slider"},t._l(t.featured,function(e,n){return r("div",{key:n,staticClass:"slide",class:n+1===1?"active":" ",attrs:{"data-slide":n+1},on:{click:t.click}},[r("nuxt-link",{attrs:{to:"serie/"+e.serie.uid}},[r("div",{staticClass:"image-mask"}),t._v(" "),r("div",{staticClass:"image"},[r("img",{attrs:{src:"Big"===t.type?e.serie.data.cover_serie_image.url:e.stripe.url,"data-load":"preload",alt:"home-slider-cover"+n}})])])],1)}),0)},[],!1,null,null,null).exports,m=r(69),v=r(246),f=r.n(v),w={components:{HomeSlider:h},data:function(){return{slideIndex:1,textIndex:1,transitioning:!1}},mounted:function(){this.$parent.$parent.$parent.$refs.fixedElements.$el.appendChild(this.$refs.updateStatus)},methods:{slide:function(t){var e=this;this.$el.querySelectorAll(".home-slider-wrapper").forEach(function(r){var n=r.querySelectorAll(".slide"),o=r.querySelector(".active"),c=o.dataset.slide,d=r.classList.contains("small-slider");"next"===t?c++:c--,c>n.length&&(c=1),c<1&&(c=n.length),e.slideIndex=c;var h=r.querySelector(".slide[data-slide='"+c+"']");h.classList.add("behind");var m={x:"next"===t?0:100},v=f()(.85,.015,.175,.9),w=f()(d?.85:.7,.2,.175,1);Object(l.a)({targets:m,duration:1e3,x:"next"===t?100:0,easing:"easeInOutQuad",delay:d?200:0,update:function(e){var r=v(m.x/100),n=w(m.x/100);"next"===t?(o.style.clipPath="polygon(".concat(m.x*r,"% 0, 101% 0%, 101% 101%, ").concat(n*m.x,"% 101%)"),o.style.webkitClipPath="polygon(".concat(m.x*r,"% 0, 101% 0%, 101% 101%, ").concat(n*m.x,"% 101%)")):(o.style.clipPath="polygon(0 0, ".concat(m.x*n,"% 0%, ").concat(m.x*r,"% 101%, 0 101%)"),o.style.webkitClipPath="polygon(0 0, ".concat(m.x*n,"% 0%, ").concat(m.x*r,"% 101%, 0 101%)"))},complete:function(){o.style.clipPath="",o.classList.remove("active"),h.classList.remove("behind"),h.classList.add("active")}}),e.slideText(t)})},slideText:function(t){var e=this;this.transitioning=!0;var r=this.$el.querySelectorAll(".serie-infos .date, .serie-infos .title");l.a.timeline({easing:"easeInOutQuart",duration:1e3,direction:"next"===t?"normal":"reverse"}).add({targets:r,opacity:[1,0],skewX:"-5deg",translateX:[0,"9vw"],complete:function(){e.textIndex=e.slideIndex,"prev"===t&&(e.transitioning=!1)}}).add({targets:r,opacity:[0,1],translateX:["-9vw",0],skewX:["20deg",0],delay:function(t,i,e){var r=r=t.classList.contains("date")?50:0;return r},complete:function(){e.textIndex=e.slideIndex,"next"===t&&(e.transitioning=!1)}})},scrollDown:function(){var t=this.$el.ownerDocument.querySelector(".page-content"),e=m.a.get(t).top;window.scroll(0,e)}},props:{featured:Array,lastPublication:String}},y=Object(d.a)(w,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-introduction"},[n("HomeSlider",{attrs:{type:"Big",featured:t.featured}}),t._v(" "),n("div",{staticClass:"right-col"},[n("div",{staticClass:"small-slider-wrapper"},[n("HomeSlider",{attrs:{type:"Small",featured:t.featured,index:t.slideIndex}}),t._v(" "),n("div",{staticClass:"controls",class:t.transitioning?"disabled":""},[n("div",{staticClass:"left",on:{click:function(e){return t.slide("prev")}}},[n("img",{attrs:{src:r(180),"data-load":"preload"}}),t._v(" "),n("span",[t._v("previous")])]),t._v(" "),n("div",{staticClass:"index"},[n("span",{staticClass:"current"},[t._v(t._s(t.slideIndex)+" /")]),t._v(" "),n("span",{staticClass:"total"},[t._v(t._s(t.featured.length))])]),t._v(" "),n("div",{staticClass:"right",on:{click:function(e){return t.slide("next")}}},[n("span",[t._v("next")]),t._v(" "),n("img",{attrs:{src:r(180),"data-load":"preload"}})])])],1),t._v(" "),n("div",{staticClass:"serie-infos"},[n("div",{staticClass:"title"},[n("h3",[n("nuxt-link",{attrs:{to:"serie/"+t.featured[t.textIndex-1].serie.uid}},[t._v(t._s(t.featured[t.textIndex-1].serie.data.title[0].text))])],1)]),t._v(" "),n("div",{staticClass:"date"},[n("p",[n("span",{staticClass:"copyright"},[t._v("©")]),t._v(" "+t._s(t.featured[t.textIndex-1].serie.data.date))])])]),t._v(" "),n("div",{staticClass:"chevron",on:{click:t.scrollDown}},[n("img",{attrs:{src:r(183),"data-load":"preload"}})]),t._v(" "),n("div",{ref:"updateStatus",staticClass:"update-status"},[n("div",{staticClass:"line"},[n("div",{ref:"progressDrag",staticClass:"progress"})]),t._v(" "),n("div",{staticClass:"status-text"},[n("span",{staticClass:"last-updated"},[t._v("LAST UPDATED - "+t._s(t.lastPublication))]),t._v(" "),n("span",{staticClass:"hold-instructions"},[t._v("hold & drag")])])])])],1)},[],!1,null,null,null).exports,I=(r(40),r(41),r(30)),x=r(182),C=r(178),_=r(181),$=r(54),L={data:function(){return{parallax:[],offsetY:0,currentIndex:0,downPosition:0,downY:0,isDrag:!1,dragStep:75,lerp:Object(_.a)(),timerId:null,speedUp:3}},mounted:function(){this.appContainer=document.getElementById("smooth-component"),this.sliderContent=this.$el,this.cursor=this.$parent.$parent.$parent.$refs.cursor.$el,this.containerH=this.sliderContent.getBoundingClientRect().height,this.homeHeaderBounds=this.$parent.$refs.homeHeader.$el.getBoundingClientRect(),this.progressDrag=this.$parent.$refs.homeHeader.$refs.progressDrag,this.dragComponent=this.$parent.$parent.$parent.$refs.dragComponent,this.currentIndexDrag=this.dragComponent.$refs.currentIndexDrag,this.titleMask=this.dragComponent.$refs.titleMask,this.coverLeft=this.dragComponent.$refs.coverWrapperLeft,this.coverRight=this.dragComponent.$refs.coverWrapperRight,this.galleryWrapper=this.$refs.gallery.querySelectorAll(".gallery-item-wrapper"),this.galleryItems=this.$refs.gallery.querySelectorAll(".gallery-item"),this.covers=this.$refs.gallery.querySelectorAll(".gallery-item img"),this.firstTransform=0,this.itemsPos=[],this.nav=this.$parent.$parent.$parent.$refs.nav.$el,this.cursor.classList.add("homepage"),this.calcHeights(),window.addEventListener("resize",this.resize),window.innerWidth>=768&&o.a.desktop?this.addListeners():this.$parent.$parent.$parent.calcScroll()},beforeDestroy:function(){window.innerWidth>=768&&o.a.desktop&&(window.removeEventListener("resize",this.resize),window.removeEventListener("contextmenu",this.disableContextMenu),window.removeEventListener("scroll",this.lockScroll),this.$el.parentNode.removeEventListener("mousedown",this.down),this.$el.parentNode.removeEventListener("mouseover",this.enter),this.$el.parentNode.removeEventListener("mousemove",this.move),this.$el.parentNode.removeEventListener("mouseup",this.up),this.$el.parentNode.removeEventListener("mouseout",this.exit))},methods:{disableContextMenu:function(){clearTimeout(this.timerId),this.isDrag=!1},calcHeights:function(){this.$parent.$parent.$parent.calcScroll(),this.margin=this.vw(9.375),this.totalHeightOnDrag=this.vw(43.75)*this.galleryItems.length,this.sizes={full:this.vw(27),portrait:this.vw(21.875),landscape:this.vw(13.125)},this.calcItemsPos()},calcItemsPos:function(){this.itemsPos=[];for(var i=0;i<this.galleryItems.length;i++){var element=this.galleryItems[i];this.itemsPos.push({top:m.a.get(element).top,offset:this.getSize(element)})}},getSize:function(t){return this.sizes[t.classList[1]]},addListeners:function(){window.addEventListener("contextmenu",this.disableContextMenu),this.$el.parentNode.addEventListener("mouseover",this.enter),this.$el.parentNode.addEventListener("mousedown",this.down),this.$el.parentNode.addEventListener("mousemove",this.move),this.$el.parentNode.addEventListener("mouseup",this.up),this.$el.parentNode.addEventListener("mouseleave",this.exit)},initParallax:function(){var t=this;$.a.add(this.tickPrlx),this.galleryItems.forEach(function(e,i){t.parallax.push({offsetTop:m.a.get(e).top,height:e.getBoundingClientRect().height,bloc:e})})},tickPrlx:function(){for(var t=window.innerHeight,e=.5*-t-.75*t,r=t+.75*t,i=0;i<this.parallax.length;i++){var n=this.parallax[i].bloc,o=this.offsetY+this.parallax[i].offsetTop;if(o>e&&o<r){var l=C.a.map(o,e,r,0,450);this.transform(n,l)}}},transform:function(t,e){t.style.transform="translate3d(0px, ".concat(e,"px, 0)")},resetParallax:function(){for(var i=0;i<this.parallax.length;i++){this.parallax[i].bloc.style.transform="translate3d(0, 0, 0)"}$.a.remove(this.tick)},updateTransitionImg:function(t,e){this.galleryItems[e].querySelector("img").classList.add("active-link"),this.$store.getters.currentDoc.data.loader_image.url=t},getClass:function(t){return t.includes("Big")?"full":t.includes("Landscape")?"landscape":t.includes("Portrait")?"portrait":void 0},enter:function(){this.$parent.hasMoved&&this.cursor.classList.add("visible")},down:function(cursor){var t=this;window.innerWidth<768||(this.timerId=setTimeout(function(){return t.initDrag(cursor)},350))},initDrag:function(cursor){this.isDrag=!0,this.calcPositions(),this.sliderContent.classList.add("drag","no-events"),I.a.set(this.nav,{opacity:0}),this.cursor.classList.add("focus"),this.$parent.setTheme("dark"),this.downY=cursor.y,this.downPosition=this.currentIndex,this.lerp.immediateSet(this.currentIndex),$.a.add(this.tick),I.a.to(this.dragComponent.$el,.3,{delay:.3,opacity:1,ease:"Quad.easeInOut"})},calcPositions:function(){for(var i=0;i<this.galleryItems.length;i++){var t=this.margin*(this.currentIndex-i);0===i&&(this.firstTransform=t),I.a.to(this.galleryItems[i],.5,{y:t,ease:"Quad.easeInOut",force3D:!0})}},resetDrag:function(){I.a.set(this.galleryItems,{y:0,force3D:!0})},move:function(cursor){if(this.isDrag){this.moveY=cursor.y;var t=this.moveY-this.downY,e=t>0?C.a.map(t,0,this.dragStep,0,1):C.a.map(t,0,-this.dragStep,0,-1),r=C.a.clamp(this.downPosition-e,0,this.galleryItems.length-1);this.setPosition(r)}},setPosition:function(t){this.lerp.set(t)},tick:function(){this.lerp.update(.1);var t=C.a.map(this.lerp.get(),0,this.galleryItems.length,0,1),e=C.a.map(this.lerp.get(),0,1,0,1.75),r=C.a.map(this.lerp.get(),0,1,0,43.75),n=t*this.totalHeightOnDrag,o=m.a.get(this.sliderContent).top+this.firstTransform-.5*window.innerHeight+this.vw(21.875);this.checkLimitZone(),this.progressDrag.style.transform="scale3d(1, ".concat(t,", 1)"),this.titleMask.style.transform="translate3d(0, -".concat(e,"vw, 0)"),this.currentIndexDrag.style.transform="translate3d(0, -".concat(e,"vw, 0)"),this.coverLeft.style.transform="translate3d(0, -".concat(r,"vw, 0)"),this.coverRight.style.transform="translate3d(0, -".concat(r,"vw, 0)"),window.scroll(0,n+o),this.setIndex(this.lerp.get())},checkLimitZone:function(){var cursor={y:this.moveY};this.moveY<100?(this.downY+=this.speedUp,this.move(cursor)):this.moveY>window.innerHeight-100&&(this.downY-=this.speedUp,this.move(cursor))},up:function(){window.innerWidth<768||(this.setPosScrollBar(this.currentIndex),this.disableDrag())},setPosScrollBar:function(i){if(this.isDrag){var t=this.itemsPos[i].top-.5*window.innerHeight+this.itemsPos[i].offset;window.scroll(0,t)}},disableDrag:function(t){clearTimeout(this.timerId),this.isDrag=!1,this.moveY=.5*window.innerHeight,I.a.to(this.galleryItems,.5,{y:0,ease:"Quad.easeInOut",force3D:!0}),I.a.to(this.dragComponent.$el,.3,{opacity:0,ease:"Quad.easeInOut"}),I.a.set(this.nav,{opacity:1,clearProps:"opacity"}),this.sliderContent.classList.remove("drag","no-events"),this.$parent.setTheme("white"),this.progressDrag.style.transform="scale3d(1, 0, 1)",t?this.cursor.classList.remove("focus","visible"):this.cursor.classList.remove("focus"),$.a.remove(this.tick)},setIndex:function(i){this.currentIndex=Math.round(i)},resize:function(){window.innerWidth<=768?this.resetDrag():(this.calcHeights(),this.addListeners())},vw:function(t){return t*Math.max(document.documentElement.clientWidth,window.innerWidth||0)/100},exit:function(){}},props:{series:Array}},S=Object(d.a)(L,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"gallery",staticClass:"gallery-wrapper"},t._l(t.series,function(e,n){return r("div",{key:n,staticClass:"gallery-item-wrapper",class:e.serie.data.cover_ratio.includes("Big")&&"full"},[r("div",{staticClass:"gallery-item",class:t.getClass(e.serie.data.cover_ratio)},[e.serie.data.cover_ratio.includes("Big")?r("div",{staticClass:"full-mask left"}):t._e(),t._v(" "),e.serie.data.cover_ratio.includes("Big")?r("div",{staticClass:"full-mask right"}):t._e(),t._v(" "),r("div",{staticClass:"gallery-item-content"},[r("nuxt-link",{attrs:{to:"/serie/"+e.serie.uid,draggable:"false"},nativeOn:{click:function(r){return t.updateTransitionImg(e.serie.data.cover_serie_image.url,n)}}},[r("img",{attrs:{src:e.serie.data.cover_serie_image.url,alt:e.serie.data.title[0].text}})]),t._v(" "),r("div",{staticClass:"item-title"},[r("h3",[t._v(t._s(e.serie.data.title[0].text))]),t._v(" "),r("span",[t._v(t._s(e.serie.data.category))])])],1)])])}),0)},[],!1,null,null,null).exports,D=Object(d.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("footer",[e("div",{staticClass:"credits"},[e("p",[this._v("\n     website by\n     "),e("a",{attrs:{href:"http://robin-noguier.com",target:"_blank"}},[this._v("\n       robin noguier\n     ")])]),e("div",[e("span",[this._v("&")]),this._v(" "),e("a",{attrs:{href:"http://raphael-aitelalim.fr",target:"_blank"}},[this._v("\n         raphael ait-el-alim\n       ")])]),this._v(" "),e("p")])])}],!1,null,null,null).exports,A=r(179),k={asyncData:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(e){var r,n,o,l,data,c,d;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.app,e.params,n=e.error,o=e.store,t.prev=1,t.next=4,o.dispatch("GET_DOC",r.context.route);case 4:return l=t.sent,data=l.data,c=data.series,d=data.slides,t.abrupt("return",{lastPublication:l.last_publication_date,featured:d,series:c,seo:{title:data.seo_title,description:data.seo_description}});case 11:t.prev=11,t.t0=t.catch(1),n({statusCode:404,message:"The page you are looking for does not exist. ",err:t.t0});case 14:case"end":return t.stop()}},t,null,[[1,11]])}));return function(e){return t.apply(this,arguments)}}(),mixins:[A.a],components:{HomeHeader:y,HomeGallery:S,Footer:D},head:function(){return{title:this.seo.title,meta:[{hid:"description",name:"description",content:this.seo.description},{hid:"og:title",property:"og:title",content:this.seo.title},{hid:"og:url",property:"og:url",content:"https://ivskaya.com/".concat(this.$route.path)},{hid:"og:type",property:"og:type",content:"website"},{hid:"og:description",property:"og:description",content:this.seo.description},{hid:"og:image",property:"og:image",content:this.$store.getters.currentDoc.data.loader_image.url},{hid:"twitter:card",property:"twitter:card",content:"summary_large_image"},{hid:"twitter:url",property:"twitter:url",content:"https://ivskaya.com/".concat(this.$route.path)},{hid:"twitter:title",property:"twitter:title",content:this.seo.title},{hid:"twitter:description",property:"twitter:description",content:this.seo.description},{hid:"twitter:image",property:"twitter:image",content:this.$store.getters.currentDoc.data.loader_image.url}],link:[{rel:"icon",type:"image/png",href:this.$store.getters.currentDoc.data.loader_image.url}]}},data:function(){return{container:null,cursor:null,cursorX:Object(_.a)(),cursorY:Object(_.a)(),updateStatus:null,updateStatusOffset:null,hasMoved:!1}},mounted:function(){var t=this;window.addEventListener("scroll",this.onScrollHome),window.addEventListener("resize",this.resize),this.$el.addEventListener("mousemove",this.moveCursor),this.lastPublication=this.formatDate(this.lastPublication),this.updateStatus=this.$refs.homeHeader.$refs.updateStatus,this.cursor=this.$parent.$parent.$refs.cursor.$el,this.galleryItems=this.$refs.homeGallery.$el.querySelectorAll(".gallery-item-wrapper"),this.$nextTick(function(){t.setTheme("white"),t.calcOffset(),setTimeout(function(){o.a.desktop&&window.innerWidth>768&&(t.revealGalleryItems(),$.a.add(t.tickCursor))},1)})},beforeDestroy:function(){window.removeEventListener("scroll",this.onScrollHome),window.removeEventListener("resize",this.resize),this.$el.removeEventListener("mousemove",this.moveCursor),window.innerWidth>768&&(this.reveal.destroy(),$.a.remove(this.tickCursor))},methods:{calcOffset:function(){this.updateStatusOffset=this.updateStatus.getBoundingClientRect().height},formatDate:function(t){var e=new Date(t),r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.getMonth()];return r<10&&(r="0"+r),r+" "+e.getFullYear()},setTheme:function(t){document.body.dataset.background=t},onScrollHome:function(t){this.$refs.homeGallery.offsetY=-window.scrollY,window.scrollY>this.updateStatusOffset?(this.updateStatus.classList.add("animate"),this.$refs.homeGallery.enter()):(this.updateStatus.classList.remove("animate"),this.cursor.classList.remove("visible"))},tickCursor:function(){this.cursorX.update(),this.cursorY.update(),this.cursor.style.transform="translate3d(".concat(this.cursorX.get(),"px, ").concat(this.cursorY.get(),"px, 0)")},moveCursor:function(cursor){window.innerWidth<768||(this.hasMoved=!0,this.cursorX.set(cursor.x-this.cursor.clientWidth/2),this.cursorY.set(cursor.y-this.cursor.clientHeight/2))},revealGalleryItems:function(){var t=this,e=this.galleryItems,r=Array.from(e).map(function(e,i){return{dom:e,ratioIn:.5,ratioOut:1,update:function(){return t.$refs.homeGallery.currentIndex=i}}});this.reveal=Object(x.a)(r)},resize:function(){o.a.desktop&&window.innerWidth>768?(this.calcOffset(),this.revealGalleryItems(),$.a.add(this.tickCursor)):(this.reveal&&this.reveal.destroy(),$.a.remove(this.tickCursor))}}},P=Object(d.a)(k,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("section",{staticClass:"page home"},[this.featured?e("HomeHeader",{ref:"homeHeader",attrs:{featured:this.featured,lastPublication:this.lastPublication}}):this._e(),this._v(" "),e("div",{staticClass:"page-content"},[e("HomeGallery",{ref:"homeGallery",attrs:{series:this.series}})],1)],1),this._v(" "),e("Footer")],1)},[],!1,null,null,null);e.default=P.exports}}]);