(function(e){function t(t){for(var a,n,i=t[0],c=t[1],l=t[2],u=0,m=[];u<i.length;u++)n=i[u],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&m.push(r[n][0]),r[n]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);d&&d(t);while(m.length)m.shift()();return o.push.apply(o,l||[]),s()}function s(){for(var e,t=0;t<o.length;t++){for(var s=o[t],a=!0,n=1;n<s.length;n++){var i=s[n];0!==r[i]&&(a=!1)}a&&(o.splice(t--,1),e=c(c.s=s[0]))}return e}var a={},n={app:0},r={app:0},o=[];function i(e){return c.p+"js/"+({home:"home",loans:"loans","market-ships~ships~systems":"market-ships~ships~systems","market-ships":"market-ships","ships~systems":"ships~systems",ships:"ships",systems:"systems"}[e]||e)+"."+{home:"9b63207e",loans:"83e4ea93","market-ships~ships~systems":"b44e502c","market-ships":"80be6142","ships~systems":"ff0f9bb5",ships:"ac6b42fb",systems:"a7e40411"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var s=a[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,c),s.l=!0,s.exports}c.e=function(e){var t=[],s={loans:1,"market-ships~ships~systems":1,"ships~systems":1,systems:1};n[e]?t.push(n[e]):0!==n[e]&&s[e]&&t.push(n[e]=new Promise((function(t,s){for(var a="css/"+({home:"home",loans:"loans","market-ships~ships~systems":"market-ships~ships~systems","market-ships":"market-ships","ships~systems":"ships~systems",ships:"ships",systems:"systems"}[e]||e)+"."+{home:"31d6cfe0",loans:"95550b31","market-ships~ships~systems":"21d273aa","market-ships":"31d6cfe0","ships~systems":"1e506ee0",ships:"31d6cfe0",systems:"6cd5826e"}[e]+".css",r=c.p+a,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var l=o[i],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===a||u===r))return t()}var m=document.getElementsByTagName("style");for(i=0;i<m.length;i++){l=m[i],u=l.getAttribute("data-href");if(u===a||u===r)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||r,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete n[e],d.parentNode.removeChild(d),s(o)},d.href=r;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){n[e]=0})));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var o=new Promise((function(t,s){a=r[e]=[t,s]}));t.push(a[2]=o);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=i(e);var m=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(d);var s=r[e];if(0!==s){if(s){var a=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;m.message="Loading chunk "+e+" failed.\n("+a+": "+n+")",m.name="ChunkLoadError",m.type=a,m.request=n,s[1](m)}r[e]=void 0}};var d=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,s){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(c.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(s,a,function(t){return e[t]}.bind(null,a));return s},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var m=0;m<l.length;m++)t(l[m]);var d=u;o.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"2cb2":function(e,t,s){"use strict";s("964a")},"2db4":function(e,t,s){"use strict";s.d(t,"b",(function(){return a})),s.d(t,"a",(function(){return n}));const a={methods:{prettifyEnum(e){return e?e.replace("_"," ").split(" ").map(e=>e[0]+e.substring(1).toLowerCase()).join(" "):"N/A"}}},n={methods:{abbreviate(e){if(void 0===e||null===e)return"N/A";if(Number.isNaN(e))return"NaN";let t="";var s=e;return e>=1e12?(t=" T",s=e/1e12):e>=1e9?(t=" B",s=e/1e9):e>=1e6?(t=" M",s=e/1e6):e>=1e3&&(t="k",s=e/1e3),parseFloat(s.toFixed(2))+t}}}},"56d7":function(e,t,s){"use strict";s.r(t);var a=s("2b0e"),n=s("7496"),r=s("40dc"),o=s("5bc1"),i=s("8336"),c=s("b0af"),l=s("99d9"),u=s("cc20"),m=s("169a"),d=s("ce7e"),p=s("adda"),h=s("8860"),f=s("da13"),b=s("5d23"),g=s("f6c4"),v=s("e449"),y=s("f774"),k=s("490a"),_=s("2fa4"),T=s("8654"),S=function(){var e=this,t=e._self._c;return t(n["a"],[t(m["a"],{attrs:{value:e.status.error,persistent:"","max-width":"350"}},[t(c["a"],[t(l["c"],[e._v(" An error occured ")]),t(l["b"],[e._v(" SpaceTraders API appears to be experiencing problems. ")]),t(l["b"],[e._v(" "+e._s(e.status)+" ")])],1)],1),e.$store.state.username&&e.$store.state.token?[t(r["a"],{attrs:{dense:"",fixed:"",flat:""}},[t(o["a"],{staticClass:"d-flex d-md-none",on:{click:function(t){e.drawer=!e.drawer}}}),t("img",{staticClass:"logo logo-sm mr-5 d-none d-sm-flex",attrs:{src:"/assets/logo.png"}}),t("div",{staticClass:"d-none d-md-flex"},e._l(e.nav,(function([s,a],n){return t(i["a"],{key:"bar-"+n,staticClass:"mr-2",attrs:{text:"",to:a}},[e._v(" "+e._s(s)+" ")])})),1),t(_["a"]),e.$store.state.outstandingRequests>0?t(k["a"],{staticClass:"mr-3",attrs:{color:"primary",indeterminate:"",size:"24",width:"2"}}):e._e(),t(u["a"],{attrs:{to:"/loans"}},[e._v(" "+e._s(e.abbreviate(e.$store.state.credits))+" Credits ")]),t(v["a"],{attrs:{"offset-y":"",rounded:"b-md"},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:a}){return[t(i["a"],e._g(e._b({staticClass:"ml-3",attrs:{tile:"",color:"primary"}},"v-btn",a,!1),s),[e._v(" "+e._s(e.$store.state.username)+" ")])]}}])},[t(h["a"],{staticClass:"py-0",attrs:{dense:"",tile:""}},[t(f["a"],{on:{click:function(t){e.accountDialog=!0}}},[t(b["c"],[e._v("View Account")])],1),t(d["a"]),e._l(e.$store.state.accounts.filter(t=>t[1]!=e.$store.state.token),(function(s,a){return t(f["a"],{key:a,on:{click:function(t){return e.$store.dispatch("SET_AUTH",s)}}},[t(b["c"],[e._v(e._s(s[0]))])],1)})),e.$store.state.accounts.length>1?t(d["a"]):e._e(),t(f["a"],{on:{click:function(t){return e.$store.dispatch("SET_AUTH",["",""])}}},[t(b["c"],[e._v("Switch Account")])],1)],2)],1)],1),t(y["a"],{attrs:{app:"",temporary:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[t(p["a"],{staticClass:"bar-logo mx-auto my-3",attrs:{src:"/assets/logo.png"}}),t(d["a"],{staticClass:"mt-3"}),t(h["a"],{attrs:{dense:"",nav:""}},e._l(e.nav,(function([s,a],n){return t(f["a"],{key:"bar-"+n,attrs:{link:"",to:a}},[t(b["a"],[t(b["c"],[e._v(e._s(s))])],1)],1)})),1)],1),t(g["a"],[t("router-view")],1),t(m["a"],{attrs:{width:"500",scrollable:""},model:{value:e.accountDialog,callback:function(t){e.accountDialog=t},expression:"accountDialog"}},[t(c["a"],[t(l["c"],{staticClass:"headline"},[e._v(" Account ")]),t(d["a"]),t(l["b"],{staticClass:"pt-5"},[t(T["a"],{attrs:{label:"Token",value:e.$store.state.token,readonly:"",outlined:"","hide-details":""}})],1)],1)],1)]:t(m["a"],{attrs:{value:!0,persistent:"","max-width":"375"}},[t("login")],1)],2)},C=[],w=s("2db4"),A=s("0798"),x=s("132d"),E=s("1800"),O=s("71a3"),U=s("c671"),N=s("fe57"),P=s("aac8"),$=function(){var e=this,t=e._self._c;return null!=e.tabs?t(c["a"],[t("div",{staticClass:"py-5"},[t("img",{staticClass:"d-block logo logo-lg mx-auto",attrs:{src:"/assets/logo.png"}})]),t(d["a"]),t(N["a"],{attrs:{"fixed-tabs":""},model:{value:e.tabs,callback:function(t){e.tabs=t},expression:"tabs"}},[t(O["a"],[e._v(" Switch ")]),t(O["a"],[e._v(" Import ")]),t(O["a"],[e._v(" Create ")])],1),t(d["a"]),e.error?t(A["a"],{staticClass:"mb-0",attrs:{type:"error",tile:""}},[e._v(" "+e._s(e.error)+" ")]):e._e(),t(P["a"],{model:{value:e.tabs,callback:function(t){e.tabs=t},expression:"tabs"}},[t(U["a"],{attrs:{value:0}},[0==e.$store.state.accounts.length?t(A["a"],{staticClass:"mb-0 text-center"},[e._v(" No accounts have been added, yet. ")]):t(h["a"],{staticClass:"py-0",attrs:{tile:""}},e._l(e.$store.state.accounts,(function(s,a){return t(f["a"],{key:a,on:{click:function(t){return e.$store.dispatch("SET_AUTH",s)}}},[t(b["a"],[t(b["c"],[e._v(e._s(s[0]))])],1),t(E["a"],[t(i["a"],{attrs:{icon:"",color:"red"},on:{click:function(t){return t.stopPropagation(),e.$store.dispatch("REMOVE_ACCOUNT",s)}}},[t(x["a"],[e._v("mdi-delete")])],1)],1)],1)})),1)],1),t(U["a"],{attrs:{value:1}},[t("div",{staticClass:"pa-5"},[t(T["a"],{attrs:{label:"Username",disabled:e.loading,outlined:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),t(T["a"],{attrs:{label:"API Token",disabled:e.loading,outlined:""},model:{value:e.token,callback:function(t){e.token=t},expression:"token"}}),t(i["a"],{attrs:{depressed:"",block:"",color:"primary",loading:e.loading},on:{click:function(t){return e.$store.dispatch("SET_AUTH",[e.username,e.token])}}},[e._v(" Set Username / Token ")])],1)]),t(U["a"],{attrs:{value:2}},[t("div",{staticClass:"pa-5"},[t(T["a"],{attrs:{label:"Username",disabled:e.loading,outlined:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),t(i["a"],{attrs:{depressed:"",block:"",color:"primary",loading:e.loading},on:{click:e.createAccount}},[e._v(" Create Account ")])],1)])],1)],1):e._e()},D=[],I={data:()=>({tabs:null,error:null,loading:!1,username:"",token:""}),methods:{async createAccount(){this.loading=!0;try{const e=await this.axios.post("/users/"+this.username+"/token");this.$store.dispatch("SET_AUTH",[this.username,e.data.token])}catch(e){this.error=e.response.data.error.message}this.loading=!1}},mounted(){this.tabs=this.$store.state.accounts.length>0?0:1}},j=I,R=s("2877"),H=Object(R["a"])(j,$,D,!1,null,null,null),L=H.exports,M={components:{Login:L},mixins:[w["a"]],chimera:{status:{key:"status",url:"/game/status",interval:6e4}},data:()=>({drawer:!1,nav:[["Home","/"],["Ships","/ships"],["Systems","/systems"],["Market","/market"]],accountDialog:!1})},q=M,B=(s("2cb2"),Object(R["a"])(q,S,C,!1,null,null,null)),J=B.exports,V=s("f309");a["a"].use(V["a"]);var F=new V["a"]({theme:{dark:!0}}),z=(s("14d9"),s("2f62")),K=s("bc3a"),G=s.n(K),Q=s("130e"),W=s("9fe4"),X=s.n(W);const Y=X()(G.a.create(),{maxRequests:10,perMilliseconds:1e4});a["a"].use(Q["a"],Y);var Z=Y;a["a"].use(z["a"]);const ee=new z["a"].Store({state:{outstandingRequests:0,accounts:[],username:"",token:"",credits:null,creditsTimeout:null},mutations:{},actions:{SET_ACCOUNTS(e,t){e.state.accounts=t},ADD_ACCOUNT(e,[t,s]){e.state.accounts.push([t,s]),localStorage.setItem("accounts",JSON.stringify(e.state.accounts))},REMOVE_ACCOUNT(e,[t,s]){a["a"].delete(e.state.accounts,e.state.accounts.findIndex(e=>e[0]==t&&e[1]==s)),localStorage.setItem("accounts",JSON.stringify(e.state.accounts))},SET_AUTH(e,[t,s]){Z.defaults.headers.common["Authorization"]="Bearer "+s,e.state.username=t,e.state.token=s,localStorage.setItem("username",t),localStorage.setItem("token",s),""==t||""==s||e.state.accounts.some(e=>e[0]==t&&e[1]==s)||e.dispatch("ADD_ACCOUNT",[t,s]),e.dispatch("UPDATE_CREDITS")},async UPDATE_CREDITS(e){if(null!=e.state.creditsTimeout&&clearTimeout(e.state.creditsTimeout),e.state.username&&e.state.token){const t=(await Z.get("/users/"+e.state.username)).data;e.state.credits=t.user.credits,e.state.creditsTimeout=setTimeout(()=>e.dispatch("UPDATE_CREDITS"),1e4)}}}});function te(){setTimeout(()=>{ee.state.outstandingRequests--},500)}Z.defaults.baseURL=new URLSearchParams(window.location.search).get("url")||"https://api.spacetraders.io/v1",localStorage.getItem("accounts")&&ee.dispatch("SET_ACCOUNTS",JSON.parse(localStorage.getItem("accounts"))),localStorage.getItem("username")&&localStorage.getItem("token")&&ee.dispatch("SET_AUTH",[localStorage.getItem("username"),localStorage.getItem("token")]),Z.interceptors.request.use(e=>(ee.state.outstandingRequests++,e)),Z.interceptors.response.use(e=>(te(),e),e=>{throw te(),e}),Z.interceptors.response.use(null,e=>{if(e.response&&401==e.response.status)return ee.dispatch("REMOVE_ACCOUNT",[ee.state.username,ee.state.token]),void ee.dispatch("SET_AUTH",["",""]);throw e});var se=ee,ae=s("8c4f");a["a"].use(ae["a"]);const ne=[{path:"/",name:"Home",component:()=>s.e("home").then(s.bind(null,"bb51"))},{path:"/systems",name:"System List",component:()=>Promise.all([s.e("market-ships~ships~systems"),s.e("ships~systems"),s.e("systems")]).then(s.bind(null,"fc85"))},{path:"/systems/:id",name:"System View",component:()=>Promise.all([s.e("market-ships~ships~systems"),s.e("ships~systems"),s.e("systems")]).then(s.bind(null,"3c6b"))},{path:"/ships",name:"Ships",component:()=>Promise.all([s.e("market-ships~ships~systems"),s.e("ships~systems"),s.e("ships")]).then(s.bind(null,"5d48"))},{path:"/loans",name:"Loans",component:()=>s.e("loans").then(s.bind(null,"01d8"))},{path:"/market",name:"Market",component:()=>Promise.all([s.e("market-ships~ships~systems"),s.e("market-ships")]).then(s.bind(null,"e88b"))}],re=new ae["a"]({base:"/",routes:ne});var oe=re,ie=s("4fd8");a["a"].use(ie["b"],{axios:Z,cache:new ie["a"](5e3),keepData:!0});var ce=s("8682");a["a"].use(ce["a"],{locale:"en"}),a["a"].config.productionTip=!1,new a["a"]({vuetify:F,store:se,router:oe,render:e=>e(J)}).$mount("#app")},"964a":function(e,t,s){}});
//# sourceMappingURL=app.ecd048af.js.map