(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{205:function(e,t,r){e.exports=r.p+"img/4948d1e.svg"},207:function(e,t,r){"use strict";r.r(t);r(42),r(43),r(14),r(28);var n=r(5),l=(r(81),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"left"},[t("img",{attrs:{src:r(205)}}),t("span",[this._v("previous")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"date"},[t("p",[t("span",{staticClass:"copyright"},[this._v("©")]),this._v(" 2019")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"chevron"},[t("img",{attrs:{src:r(112)}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"update-status"},[t("div",{staticClass:"line"}),this._v(" "),t("span",[this._v("LAST UPDATED - FEB 2019")])])}]),c=(r(206),{props:{series:Array,type:String}}),o=r(11),d={components:{HomeSlider:Object(o.a)(c,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"home-slider-wrapper",class:"Big"===this.type?"big-slider":"small-slider"},this._l(this.series,function(e,r){return t("div",{key:r,staticClass:"slide",class:r+1===1?"active":" ",style:"z-index: "+(1-r),attrs:{"data-slide":r+1}},[t("div",{staticClass:"image",style:"background-image: url('"+e.cover_serie_image.url+"')"})])}),0)},[],!1,null,null,null).exports},data:function(){return{slideIndex:0}},mounted:function(){},methods:{nextSlide:function(){var e=this.$el.querySelector(".big-slider"),t=e.querySelectorAll(".slide"),r=e.querySelector(".active"),n=r.dataset.slide;if(++n<=t.length){var l=e.querySelector(".slide[data-slide='"+n+"']");r.classList.add("sliding"),l.classList.add("active"),r.addEventListener("animationend",function(){r.classList.remove("active"),l.classList.add("active")})}else{var c=e.querySelector(".slide[data-slide='1']");r.classList.remove("active"),r.classList.remove("sliding"),c.classList.add("active"),n=0}this.mirror()},mirror:function(){var e=this.$el.querySelector(".small-slider"),t=e.querySelectorAll(".slide"),r=e.querySelector(".active"),n=r.dataset.slide;if(++n<=t.length){var l=e.querySelector(".slide[data-slide='"+n+"']");r.classList.add("sliding"),l.classList.add("active"),r.addEventListener("animationend",function(){r.classList.remove("active"),l.classList.add("active")})}else{var c=e.querySelector(".slide[data-slide='1']");r.classList.remove("active"),r.classList.remove("sliding"),c.classList.add("active"),n=0}}},props:{series:Array}},v=Object(o.a)(d,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page-introduction"},[n("HomeSlider",{attrs:{type:"Big",series:e.series}}),e._v(" "),n("div",{staticClass:"right-col"},[n("div",{staticClass:"small-slider-wrapper"},[n("HomeSlider",{attrs:{type:"Small",series:e.series}}),e._v(" "),n("div",{staticClass:"controls"},[e._m(0),e._v(" "),n("div",{staticClass:"dots"},[n("ul",e._l(e.series,function(t,r){return n("li",{key:r,class:r+1===1?"active":""},[e._v("•")])}),0)]),e._v(" "),n("div",{staticClass:"right",on:{click:e.nextSlide}},[n("span",[e._v("next")]),n("img",{attrs:{src:r(205)}})])])],1),e._v(" "),e._l(e.series.slice(0,1),function(t,r){return n("div",{key:r,staticClass:"serie-infos"},[n("div",{staticClass:"title"},[n("h3",[e._v(e._s(t.title[0].text))])]),e._v(" "),e._m(1,!0)])}),e._v(" "),e._m(2),e._v(" "),e._m(3)],2)],1)},l,!1,null,null,null).exports,m={asyncData:function(){var e=Object(n.a)(regeneratorRuntime.mark(function e(t){var r,n,l,c,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.app,t.params,t.error,n=t.store,e.prev=1,e.next=4,n.dispatch("GET_DOC",r.context.route);case 4:return l=e.sent,c=[],o=[],l.results.forEach(function(e){"index"===e.uid&&c.push(e.data),"serie"===e.type&&o.push(e.data)}),e.abrupt("return",{title:c[0].title[0].text,description:c[0].description[0].text,slider:c[0].slider,seo:{title:c[0].seo_title,description:c[0].seo_description},currentSeries:o});case 11:e.prev=11,e.t0=e.catch(1),console.log("index page catch",e.t0);case 14:case"end":return e.stop()}},e,null,[[1,11]])}));return function(t){return e.apply(this,arguments)}}(),components:{HomeHeader:v},head:function(){return{}},data:function(){return{timerID:"",counter:0,dragMode:!1}},mounted:function(){var e=document.querySelector(".gallery");e&&(e.addEventListener("mousedown",this.down),e.addEventListener("mousemove",this.move),e.addEventListener("mouseleave",this.up),e.addEventListener("mouseup",this.up),e.addEventListener("touchstart",this.down),e.addEventListener("touchend",this.up))},beforeDestroy:function(){var e=document.querySelector(".gallery");e&&(e.removeEventListener("mousedown",this.down),e.removeEventListener("mousemove",this.move),e.removeEventListener("mouseup",this.up),e.removeEventListener("mouseleave",this.up),e.removeEventListener("touchstart",this.down),e.removeEventListener("touchend",this.up))},methods:{getClass:function(e){return e.includes("Big")?"full":e.includes("Landscape")?"landscape":e.includes("Portrait")?"portrait":void 0},down:function(e){requestAnimationFrame(this.timer),e.preventDefault()},up:function(e){cancelAnimationFrame(this.timerID),this.counter=0,this.dragMode=!1},timer:function(){document.querySelector(".gallery");this.counter<0?(this.timerID=requestAnimationFrame(this.timer),this.counter++):this.dragMode=!0},move:function(e){this.dragMode&&console.log(e.pageY)}}},h=Object(o.a)(m,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"home"},[e.currentSeries?r("HomeHeader",{attrs:{series:e.currentSeries}}):e._e(),e._v(" "),r("div",{staticClass:"page-content",class:e.dragMode?"black":""},[r("div",{staticClass:"gallery"},[r("div",{staticClass:"gallery-wrapper",class:e.dragMode?"drag-mode":""},e._l(e.currentSeries,function(t,n){return r("div",{key:n,staticClass:"gallery-item",class:e.getClass(t.cover_ratio)},[r("img",{attrs:{src:t.cover_serie_image.url}}),e._v(" "),r("div",{staticClass:"item-title"},[r("h3",[e._v(e._s(t.title[0].text))]),e._v(" "),r("span",[e._v(e._s(t.category))])])])}),0)])])],1)},[],!1,null,null,null);t.default=h.exports}}]);