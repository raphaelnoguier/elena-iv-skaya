(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{209:function(t,e,r){"use strict";r.r(e);r(28);var n=r(5),c={asyncData:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(e){var r,n,c,data;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.app,e.params,e.error,n=e.store,t.prev=1,t.next=4,n.dispatch("GET_DOC",r.context.route);case 4:return c=t.sent,data=c.data,t.abrupt("return",{main_image:data.main_image.url,title:data.title[0].text,social_links:data.social_links,first_paragraph:data.first_paragraph[0].text,column_1:data.column_1[0].text,column_2:data.column_2[0].text,agency_representations:data.agency_representations,credits:data.credits});case 9:t.prev=9,t.t0=t.catch(1),console.log("about catch",t.t0);case 12:case"end":return t.stop()}},t,null,[[1,9]])}));return function(e){return t.apply(this,arguments)}}()},l=r(11),component=Object(l.a)(c,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"page about"},[r("div",{staticClass:"about-wrapper"},[r("div",{staticClass:"about-image"},[r("img",{attrs:{src:t.main_image}}),t._v(" "),r("div",{staticClass:"about-quote"},[r("h3",[t._v(t._s(t.title))])])]),t._v(" "),r("div",{staticClass:"about-content"},[r("div",{staticClass:"about-right"},[r("div",{staticClass:"social-links"},[r("ul",t._l(t.social_links,function(e,n){return r("li",{key:n},[r("a",{attrs:{href:e.url}},[t._v(t._s(e.link_text))])])}),0)]),t._v(" "),r("div",{staticClass:"content-text"},[r("div",{staticClass:"paragraph"},[r("p",[t._v(t._s(t.first_paragraph))])]),t._v(" "),r("div",{staticClass:"two-col"},[r("div",{staticClass:"text"},[r("p",[t._v(t._s(t.column_1))])]),t._v(" "),r("div",{staticClass:"text"},[r("p",[t._v(t._s(t.column_2))])])])])])]),t._v(" "),r("div",{staticClass:"about-footer"},[r("div",{staticClass:"agency-representations"},[r("span",[t._v("Agency representations")]),t._v(" "),r("ul",t._l(t.agency_representations,function(e,n){return r("li",{key:n},[t._v("\n            "+t._s(e.region)+" - "),r("a",{attrs:{href:e.url}},[t._v(t._s(e.link_text))])])}),0)]),t._v(" "),r("div",{staticClass:"credits"},[r("span",[t._v("Website credits")]),t._v(" "),r("ul",t._l(t.credits,function(e,n){return r("li",{key:n},[t._v("\n            "+t._s(e.role)+" - "),r("a",{attrs:{href:e.url}},[t._v(t._s(e.link_text))])])}),0)])])])])},[],!1,null,null,null);e.default=component.exports}}]);