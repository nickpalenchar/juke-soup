(this["webpackJsonpmusic-mining"]=this["webpackJsonpmusic-mining"]||[]).push([[0],{100:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return a}));var r,c=n(30);function a(){return r||(r=Object(c.h)())}e.NODE_ENV}).call(this,n(21))},20:function(e,t){var n={APP_NAME:"JukeSoup",BASE_URI:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_BASE_URI||"http://localhost:3000",SPOTIFY_API:"https://api.spotify.com/v1",SPOTIFY_ACCOUNTS_API:"https://accounts.spotify.com",SPOTIFY_CLIENT_ID:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_CLIENT_ID,MONEY_SINGULAR:"ticket",MONEY_PLURAL:"tickets",MAX_MONEY:20};n.SPOTIFY_REDIRECT_URI="".concat(n.BASE_URI,"/callback"),e.exports=n},212:function(e,t,n){"use strict";var r=n(19),c=(n(220),n(96)),a=n(10),o=n(1),i=n(6),s=n(33),u=n(3),l=n.n(u),d=n(7),j=n(4),h=n(5),b=n(30),p=n(99),f=n.n(p),O=n(100),x=function(){if(localStorage.getItem("ORMDEBUG")){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];(e=console).log.apply(e,["[ORM:DEBUG]"].concat(n,[{stack:new Error}]))}};x.group=function(e){return console.group(e)},x.groupEnd=function(){return console.groupEnd()};var m=function(){function e(){Object(j.a)(this,e)}return Object(h.a)(e,null,[{key:"setDb",value:function(t){x("Setting db connection to",t),e._dbconnection=t}},{key:"model",value:function(t,n){if(!n)return e._models[t];var r=new g(t,n,e._dbconnection);return e._models[t]=r,r}}]),e}();m._models={},m._dbconnection=O.a;var g=function(){function e(t,n,r){Object(j.a)(this,e),this._schema=n,this._collection=t,this._getdb=r,this._hooks={preCreate:function(){}}}return Object(h.a)(e,[{key:"preCreate",value:function(e){this._hooks.preCreate=e}},{key:"validate",value:function(e){for(var t=0,n=Object.entries(e);t<n.length;t++){var r=Object(a.a)(n[t],2),c=r[0],o=r[1];if("_id"!==c){if(console.log(c,this._schema[c]),!this._schema[c])throw Error("document has extra property '".concat(c,"'\n        Schema keys are ").concat(Object.keys(this._schema).join(", ")));if(Array.isArray(this._schema[c])){if(!Array.isArray(o))throw Error("Expected ".concat(c," to be an Array but was ").concat(typeof o))}else if(typeof this._schema[c]()!==typeof o)throw Error("Expected '".concat(c,"' to be type ").concat(typeof this._schema[c](),", but was ").concat(typeof o,"\n        Schema keys are ").concat(Object.keys(this._schema).join(", ")))}}return e}},{key:"create",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t,n,r,c,a,o,i=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i.length>0&&void 0!==i[0]?i[0]:{},n=i.length>1&&void 0!==i[1]?i[1]:{},r=n.fetchDoc,c=void 0===r||r,x("creating document ",t),this._hooks.preCreate(t),this.validate(t),a=this._getdb(),e.next=9,Object(b.a)(Object(b.b)(a,this._collection),t);case 9:if(o=e.sent,!c){e.next=13;break}return x("fetching document"),e.abrupt("return",this.findById(o.id,{cache:!1}));case 13:return e.abrupt("return",o);case 14:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"find",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var n,r,c,a,o,i,u,d,j,h,p=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=p.length>1&&void 0!==p[1]?p[1]:{},c=r.document,a=void 0===c||c,x.group("find"),x("called with query",t),t._id&&(o=t._id,delete t._id),i=this._getdb(),x("using db",i),u=Object(b.b)(i,this._collection),x("using collection",u),d=b.i.apply(void 0,[u].concat(Object(s.a)(y(t)))),e.next=11,Object(b.g)(d);case 11:if(j=e.sent,null===(n=j.docs)||void 0===n?void 0:n.length){e.next=16;break}return x("find: no query found"),x.groupEnd(),e.abrupt("return",void 0);case 16:if(console.log("SNAP ",j),!o){e.next=22;break}return h=f()(j.docs,(function(e){return e.id===o})),x("found doc (by id): ",h),x.groupEnd(),e.abrupt("return",a?[v(h)]:[h]);case 22:return x("found docs (as snapshots):",j.docs),x.groupEnd(),e.abrupt("return",a?j.docs.map(v):j.docs);case 25:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"findOne",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var n,r,c,a,o=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>1&&void 0!==o[1]?o[1]:{},r=n.document,c=void 0===r||r,x.group("findOne"),e.next=4,this.find(t,{document:c});case 4:if(a=e.sent){e.next=9;break}return x("no docs found"),x.groupEnd(),e.abrupt("return");case 9:return x("fond ".concat(a.length," docs, first one is "),a[0]),x.groupEnd(),e.abrupt("return",a[0]);case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"findById",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var n,r,c,a,o,i,s,u,d=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=d.length>1&&void 0!==d[1]?d[1]:{},r=n.cache,c=void 0===r||r,a=n.document,o=void 0===a||a,x.group("findById"),x("using id ",t,{cache:c},this._collection),i=this._getdb(),s=Object(b.d)(i,"/".concat(this._collection,"/").concat(t)),e.next=7,c?Object(b.e)(s):Object(b.f)(s);case 7:if(u=e.sent,x.groupEnd(),o){e.next=12;break}return x("returning snapshot rather than document"),e.abrupt("return",o);case 12:return e.abrupt("return",v(u));case 13:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"findOrCreate",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x.group("findOrCreate"),x("called with queryObj =",t),e.next=4,this.findOne(t);case 4:if(n=e.sent){e.next=13;break}return t._id||delete t._id,x("doc not found, creating."),e.next=10,this.create(t);case 10:return r=e.sent,x.groupEnd(),e.abrupt("return",r);case 13:return x("Found doc:",n),x.groupEnd(),e.abrupt("return",n);case 16:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"update",value:function(){var e=Object(d.a)(l.a.mark((function e(t,n){var r,c,o,i,s,u,d,j,h,p;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x.group("update"),e.next=3,this.findOne(t);case 3:if(r=e.sent){e.next=8;break}return x("Could not find doc!"),x.groupEnd(),e.abrupt("return",null);case 8:c=this._getdb(),o=Object(b.d)(c,"/".concat(this._collection,"/").concat(r._id)),x.groupEnd(),i=[],s=0,u=Object.entries(n);case 13:if(!(s<u.length)){e.next=22;break}return d=Object(a.a)(u[s],2),j=d[0],h=d[1],e.next=17,Object(b.j)(o,j,h);case 17:p=e.sent,i.push(p);case 19:s++,e.next=13;break;case 22:return e.abrupt("return",i);case 23:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}();function y(e){for(var t=[],n=0,r=Object.entries(e);n<r.length;n++){var c=Object(a.a)(r[n],2),o=c[0],i=c[1];t.push(Object(b.k)(o,"==",i))}return t}function v(e){if(null===e||void 0===e?void 0:e.data())return Object(i.a)(Object(i.a)({},e.data()),{},{_id:e.id})}var _=n(20),k={money:Number,score:Number,displayName:String},S=m.model("User",k);S.preCreate((function(e){var t;e.score=e.score||0,e.money=null!==(t=e.money)&&void 0!==t?t:_.MAX_MONEY}));var w=S;function T(){var e=Object(o.useState)(null),t=Object(a.a)(e,2),n=t[0],r=t[1];return Object(o.useEffect)((function(){var e=localStorage.getItem("_id");w.findOrCreate({_id:e}).then((function(t){localStorage.setItem("_id",t._id),r(e)}))})),n}var I=n(2);function E(){var e=Object(o.useState)(""),t=Object(a.a)(e,2),n=t[0],r=t[1];return setTimeout((function(){return r(Object(I.jsx)("div",{children:"Loading"}))}),1200),Object(I.jsx)(I.Fragment,{children:n})}function A(e){var t=e.children,n={width:"520px",midWidth:"200px"};return e.align&&(n.textAlign=e.align),Object(I.jsx)("div",{className:"mobilish",style:n,children:t})}var C=function(e){var t=Object(r.t)();return null===T()?Object(I.jsx)(E,{}):Object(I.jsxs)(A,{children:[Object(I.jsx)("h1",{children:"Find a Quarry"}),Object(I.jsx)("input",{type:"text",className:"input-center",placeholder:'two words (e.g. "shining-pearl")'})," | ",Object(I.jsx)("button",{children:"Enter"}),Object(I.jsx)("br",{}),Object(I.jsx)("hr",{}),Object(I.jsxs)("h3",{children:["or ",Object(I.jsx)("button",{onClick:function(){return t("/quarry/new")},children:"create one"})]})]})},N=n(348),R=n(351),P=n(207),q=n(344),D=n(102),F=["shining","cool","fun","rad","good","nice","helpful","hip","musical","kind","free","great","bad","hot","cold","warm","frozen","tall","short","quick","red","green","blue","square","smart","long","rich","calm","windy","round","solid","liquid","meta","cyber","swanky","fruity"],U=["pearl","mom","dad","daddy","boy","girl","car","trick","mine","quarry","pot","egg","seltzer","gas","power","iphone","salt","pepper","bed","table","soda","chair","rug","bean","ice","yoyo","rug","can","wheel","yoga","button","stick","fire","rain","sun","god","gold","cup","app","bread","box","toy","tea"];function L(){return[F[Math.floor(Math.random()*F.length)],U[Math.floor(Math.random()*U.length)]]}var B={leader:String,name:String,queue:[],phrase:String,created:Object},M=m.model("Quarry",B);M.preCreate((function(e){e.queue=[],e.created=new Date}));var Y=M;function K(e){var t=Object(r.t)(),n=T(),c=Object(o.useState)(L()),i=Object(a.a)(c,2),s=i[0],u=i[1],l=Object(o.useState)(!1),d=Object(a.a)(l,2),j=d[0],h=d[1],b=Object(o.useState)(""),p=Object(a.a)(b,2),f=p[0],O=p[1],x=Object(o.useState)(!1),m=Object(a.a)(x,2),g=m[0],y=m[1],v=function(e){if(!1===e.currentTarget.checkValidity())return e.preventDefault(),void e.stopPropagation();h(!0),f&&(y(!0),Y.create({leader:n,phrase:s.join("-"),name:f}).then((function(e){console.log("new quarry",e),t("/quarry/".concat(e._id))})))};return null===n?Object(I.jsx)(E,{}):Object(I.jsxs)(A,{children:[Object(I.jsx)("h1",{children:"Open a Quarry. Discover Music."}),Object(I.jsxs)(N.a,{noValidate:!0,validated:j,onSubmit:v,action:"",children:[Object(I.jsxs)(N.a.Group,{controlId:"name",children:[Object(I.jsx)(N.a.Label,{children:"Quarry Name"}),Object(I.jsx)(N.a.Control,{required:!0,type:"input",placeholder:"(e.g. Nick's Soup)",value:f,onChange:function(e){O(e.target.value)}})]}),Object(I.jsx)("br",{}),Object(I.jsxs)(R.a,{style:{width:"480px"},children:[Object(I.jsx)(R.a.Text,{children:"Your 2-word phrase:"}),Object(I.jsx)(P.a,{style:{textAlign:"center",fontFamily:"monospace",color:"red"},readOnly:!0,value:s[0],"aria-label":"Recipient's username with two button addons"}),Object(I.jsx)(P.a,{style:{textAlign:"center",fontFamily:"monospace",color:"red"},readOnly:!0,value:s[1],"aria-label":"Recipient's username with two button addons"}),Object(I.jsx)(q.a,{variant:"outline-secondary",onClick:function(){return u(L())},children:Object(I.jsx)(D.b,{})})]}),Object(I.jsx)(N.a.Text,{className:"text-muted",children:"This is helps friends find you."}),Object(I.jsx)("br",{}),Object(I.jsxs)(q.a,{className:g?"btn-secondary":"btn-success",type:"",onClick:v,disabled:g,children:[" ",g?"working \ud83d\udca6":"Create"]})]})]})}var W=n(208),V=n.n(W),z=n(118),H=n.n(z),Q="spotifyAccessToken_DO_NOT_SHARE",J="spotifyRefreshToken",X=new(function(){function e(){Object(j.a)(this,e)}return Object(h.a)(e,[{key:"accessToken",get:function(){return localStorage.getItem(Q)},set:function(e){localStorage.setItem(Q,e)}},{key:"refreshToken",get:function(){return localStorage.getItem(J)},set:function(e){localStorage.setItem(J,e)}}]),e}()),G=new(function(){function e(){Object(j.a)(this,e),this.axios=this._createAxiosWithSpotifyAuth()}return Object(h.a)(e,[{key:"_createAxiosWithSpotifyAuth",value:function(){return H.a.create({baseURL:_.SPOTIFY_API,headers:{Authorization:"Bearer ".concat(X.accessToken)}})}},{key:"setAccessToken",value:function(e){X.accessToken=e,this.axios=this._createAxiosWithSpotifyAuth()}},{key:"setRefreshToken",value:function(e){X.refreshToken=e,this.axios=this._createAxiosWithSpotifyAuth()}},{key:"setTokensWithCode",value:function(){var e=Object(d.a)(l.a.mark((function e(t,n){var r,c,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new URLSearchParams).append("grant_type","authorization_code"),r.append("code",t),r.append("redirect_uri",_.SPOTIFY_REDIRECT_URI),r.append("client_id",_.SPOTIFY_CLIENT_ID),r.append("code_verifier",n),c="".concat(_.SPOTIFY_ACCOUNTS_API,"/api/token"),e.next=9,H()({url:c,method:"post",data:r,headers:{"Content-Type":"application/x-www-form-urlencoded"}});case 9:return a=e.sent,this.setAccessToken(a.data.access_token),this.setRefreshToken(a.data.refresh_token),e.abrupt("return",a);case 13:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"request",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t,n,r=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.axios.apply(this,r);case 3:t=e.sent,e.next=13;break;case 6:if(e.prev=6,e.t0=e.catch(0),"The access token expired"!==(null===(n=e.t0.response)||void 0===n?void 0:n.data.error.message)){e.next=13;break}return console.log("access token expired, trying new token"),e.next=12,this.requestAccessTokenFromRefreshToken();case 12:return e.abrupt("return",this.request.apply(this,r));case 13:return e.abrupt("return",t);case 14:case"end":return e.stop()}}),e,this,[[0,6]])})));return function(){return e.apply(this,arguments)}}()},{key:"requestAccessTokenFromRefreshToken",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("starting refresh flow"),t=new URLSearchParams({grant_type:"refresh_token",refresh_token:X.refreshToken,client_id:_.SPOTIFY_CLIENT_ID}),e.prev=2,e.next=5,H()({url:"".concat(_.SPOTIFY_ACCOUNTS_API,"/api/token"),method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:t});case 5:return n=e.sent,X.accessToken=n.data.access_token,X.refreshToken=n.data.refresh_token,e.abrupt("return",n);case 11:if(e.prev=11,e.t0=e.catch(2),"Request failed with status code 400"!==e.t0.message){e.next=18;break}alert("Please reconnect Spotify"),window.location.href="/spotifyConnect",e.next=19;break;case 18:throw e.t0;case 19:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(){return e.apply(this,arguments)}}()}]),e}()),$="codeVerifier_DO_NOT_SHARE",Z=V()(48),ee=Z.code_verifier,te=Z.code_challenge,ne=new URLSearchParams;ne.append("client_id",_.SPOTIFY_CLIENT_ID),ne.append("response_type","code"),ne.append("scope","user-read-playback-state user-modify-playback-state user-read-currently-playing"),ne.append("redirect_uri",_.SPOTIFY_REDIRECT_URI),ne.append("code_challenge_method","S256"),ne.append("code_challenge",te),console.log("using challenge ",te);var re="".concat(_.SPOTIFY_ACCOUNTS_API,"/authorize?").concat(ne.toString());function ce(){var e=Object(r.r)(),t=Object(r.t)(),n=new URLSearchParams(e.search),c=n.get("code"),a=n.get("error");if(a)return"access_denied"===a?Object(I.jsx)("h1",{children:"Oh."}):Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)("h1",{children:"Yikes."}),Object(I.jsx)("h6",{children:"Just walk away"})]});if(c){var o=localStorage.getItem($);return G.setTokensWithCode(c,o).then((function(e){return console.log(e),G.axios("/me/player/currently-playing")})).then((function(){return t("/quarry/new")})).catch((function(e){return console.error(e.message)})),Object(I.jsx)(E,{})}return localStorage.setItem($,ee),Object(I.jsxs)(A,{align:"center",children:[Object(I.jsx)("h1",{children:"Connect Your Spotify Account"}),Object(I.jsxs)("p",{children:["Let ",_.APP_NAME," control your music player on Spotify. Connect an account you plan on playing loud and proud."]}),Object(I.jsx)("br",{}),Object(I.jsx)(q.a,{variant:"outline-dark",href:re,children:"Authorize with Spotify"}),Object(I.jsx)("br",{}),Object(I.jsx)("br",{}),Object(I.jsx)("br",{}),Object(I.jsx)("small",{children:"We don't modify any data, such as playlists or liked songs (or anything else)"})]})}var ae=n(48).useParams;function oe(){var e=ae().phrase,t=Object(r.t)();/^\w{1,10}-\w{1,10}$/.test(e)||t("/");var n=Object(o.useState)(null),c=Object(a.a)(n,2),i=c[0],s=c[1];return console.log("its ",e),Y.find({phrase:e}).then((function(e){1===(null===e||void 0===e?void 0:e.length)?t("/quarry/".concat(e[0]._id)):(null===e||void 0===e?void 0:e.length)>1?(console.log("todo"),s(e)):t("/")})),null===i?Object(I.jsx)(E,{}):Object(I.jsx)("div",{children:"This is a list of soups (TODO)"})}var ie=n(82),se=n(86),ue=n(209),le=n.n(ue),de="lastMoneyUpdate",je=18e4,he=null;function be(){null!==he?(clearTimeout(he),he=null):console.warn("stopMoneyLoop - nothing to stop")}var pe=n(350),fe=n(345);function Oe(e){var t=e.track;return console.log("PREVIEW FOR TRACK",t),t?Object(I.jsxs)("div",{className:"d-flex",children:[Object(I.jsx)("div",{style:{margin:"16px"},children:Object(I.jsx)("img",{src:t.album.images[2].url,alt:"Track album"})}),Object(I.jsxs)("div",{style:{margin:"16px"},children:[Object(I.jsxs)("div",{className:"fw-bold",children:[t.name," ",t.explicit&&Object(I.jsx)(fe.a,{bg:"secondary",children:"Explicit"}),"\xa0"]}),Object(I.jsx)("div",{children:t.artists.map((function(e){return e.name})).join(", ")})]})]}):null}n(337);function xe(e){var t=e.votes,n=e.track,r=e.onVote;return Object(I.jsxs)("div",{className:"container",children:[Object(I.jsxs)("div",{className:"voteWindow",children:[Object(I.jsx)("div",{className:"clickable",onClick:function(){return r("up",{track:n})},children:Object(I.jsx)(ie.c,{})}),Object(I.jsx)("div",{children:Object(I.jsx)("h3",{children:t})}),Object(I.jsx)("div",{className:"clickable",onClick:function(){return r("down",{track:n})},children:Object(I.jsx)(ie.a,{})})]}),Object(I.jsx)("div",{children:Object(I.jsx)(Oe,{track:n})})]})}function me(e){var t=e.songs,n=e.onVote;if(!t)throw Error("SongQueue component must have props `songs`");var r=function(){return n.apply(void 0,arguments)};return t.length?Object(I.jsx)(I.Fragment,{children:Object(I.jsx)(pe.a,{children:Object(I.jsx)(pe.a.Text,{children:t.map((function(e){return Object(I.jsx)(xe,{votes:e.votes,track:e.track,onVote:r})}))})})}):Object(I.jsx)(I.Fragment,{children:Object(I.jsx)(pe.a,{children:Object(I.jsxs)(pe.a.Title,{children:[Object(I.jsx)(D.a,{})," No songs added yet"]})})})}var ge=n(347),ye=n(353),ve=n(349);function _e(e){var t=e.phrase;return Object(I.jsx)(ve.a,{defaultActiveKey:"0",children:Object(I.jsxs)(ve.a.Item,{eventKey:"0",children:[Object(I.jsx)(ve.a.Header,{children:"Bring your friends here \ud83d\ude4b\u200d\u2640\ufe0f"}),Object(I.jsxs)(ve.a.Body,{children:["Tell them to enter ",Object(I.jsxs)("code",{children:['"',t.replace("-"," "),'" ']}),"on ",_.BASE_URI,". They can also go to ",Object(I.jsx)("a",{href:"".concat(_.BASE_URI,"/").concat(t),children:"".concat(_.BASE_URI,"/").concat(t)})," directly."]})]})})}var ke=n(119),Se=n(352),we=n(210),Te=n(346);function Ie(e){var t=e.show,n=e.track,r=e.handler;return null===n?null:Object(I.jsxs)(Te.a,{show:t,children:[Object(I.jsx)(Te.a.Header,{children:Object(I.jsx)(Te.a.Title,{children:"Nominating Song"})}),Object(I.jsxs)(Te.a.Body,{children:["Do you want to spend ",Object(I.jsxs)("b",{children:["1 ",_.MONEY_SINGULAR]})," to nominate this song?",Object(I.jsx)("br",{}),Object(I.jsx)(Oe,{track:n})]}),Object(I.jsxs)(Te.a.Footer,{children:[Object(I.jsx)(q.a,{variant:"outline-secondary",onClick:function(){return r(!1)},children:"Close"}),Object(I.jsxs)(q.a,{variant:"dark",onClick:function(){return r(!0)},children:["Submit\xa0 ",Object(I.jsxs)(fe.a,{bg:"primary",pill:!0,children:["-1 ",Object(I.jsx)(se.b,{})]})]})]})]})}function Ee(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.soupId,n=e.eventHandler,r=void 0===n?function(){}:n,c=Object(o.useState)(""),i=Object(a.a)(c,2),u=i[0],l=i[1],d=Object(o.useState)([]),j=Object(a.a)(d,2),h=j[0],b=j[1],p=Object(o.useState)(!1),f=Object(a.a)(p,2),O=f[0],x=f[1],m=Object(o.useState)(null),g=Object(a.a)(m,2),y=g[0],v=g[1],k=Object(o.useState)(!1),S=Object(a.a)(k,2),E=S[0],A=S[1],C=T();function N(){G.request("/search",{params:{q:u,type:"track",limit:6}}).then((function(e){console.log(e),e&&b(e.data.tracks.items)}))}function D(e){v(e),x(!0)}function F(e){x(!1),e&&!E&&(A(!0),w.findById(C).then((function(e){if(e.money<1)throw alert("You're too broke! Wait a few minutes for your ".concat(_.MONEY_PLURAL," to be replenished.")),Error("Silent");var t=e.money-1;return w.update({_id:C},{money:t}).then((function(e){return r("updateUser"),r("selectedTrack",y),e}))})).then((function(){return Y.findById(t)})).then((function(e){console.log("got soup ",e);var t=[{votes:5,track:y}].concat(Object(s.a)(e.queue));return Y.update({_id:e._id},{queue:t})})).catch((function(e){if("silent"===e.message.toLowerCase())return e;throw e})).finally((function(){A(!1)})),C.money<1)&&console.log("no money!")}function U(e,t){var n=new we.Time(e.duration_ms);return Object(I.jsxs)(Se.a.Item,{className:"d-flex justify-content-between align-items-start",action:!0,onClick:function(){return D(e)},children:[Object(I.jsxs)("div",{children:[Object(I.jsxs)("div",{className:"fw-bold",children:[e.name,"\xa0",e.explicit&&Object(I.jsx)(fe.a,{bg:"secondary",children:"Explicit"}),"\xa0",e.popularity>75&&Object(I.jsx)(ke.a,{size:"1.3em",style:{color:"#ff8c00"}}),e.popularity>83&&Object(I.jsx)(ke.a,{size:"1.3em",style:{color:"#ff8c00"}}),e.popularity>92&&Object(I.jsx)(ke.a,{size:"1.3em",style:{color:"#ff8c00"}})]}),Object(I.jsx)("div",{children:e.artists.map((function(e){return e.name})).join(", ")})]}),Object(I.jsx)("div",{style:{fontFamily:"monospace"},children:n.toString("s")})]},t)}return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(R.a,{children:Object(I.jsx)(P.a,{placeholder:"Type to search...",value:u,onChange:function(e){return l(e.target.value)}})}),Object(I.jsx)(q.a,{onClick:N,children:"Search"}),Object(I.jsx)("br",{}),Object(I.jsx)(Se.a,{children:h.map(U)}),Object(I.jsx)(Ie,{show:O,track:y,handler:F})]})}function Ae(){var e=Object(r.w)().id,t=Object(o.useState)(null),n=Object(a.a)(t,2),c=n[0],i=n[1],s=Object(o.useState)(null),u=Object(a.a)(s,2),j=u[0],h=u[1],b=Object(o.useState)(!1),p=Object(a.a)(b,2),O=p[0],x=p[1],m=Object(o.useState)(null),g=Object(a.a)(m,2),y=g[0],v=g[1],k=T();Object(o.useEffect)((function(){if(null===c)return w.findById(k).then((function(t){return v(t,[c,k,e])})),Y.findById(e).then((function(e){if(!e)return console.log("setting error"),h(404);i(e),function(){var e=function(){var t=Object(d.a)(l.a.mark((function t(){var n,r,c,a,o,i;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=+localStorage.getItem(de),r=Date.now(),console.log({lastUpdate:n,INTERVAL:je,now:r}),!(n+je<r)){t.next=16;break}return c=3*Math.floor((r-n)/je),a=localStorage.getItem("_id"),t.next=8,w.findById(a);case 8:return o=t.sent,i=o.money+c<_.MAX_MONEY?o.money+c:_.MAX_MONEY,t.next=12,w.update({_id:a},{money:i});case 12:localStorage.setItem(de,Date.now()),he=setTimeout(e,je),t.next=22;break;case 16:return console.log("now?? ",r),console.log({INTERVAL:je}),console.log("last up?? ",n),console.log("not ready for money, will update in ",n+je-r),he=setTimeout(e,n+je-r),t.abrupt("return",he);case 22:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();if(null===he)return console.log("starting loop"),e();console.error("startMoneyLoop - cannot start loop when already running")}()})),be}));var S=function(t,n){if(!O)if("updateUser"===t)w.findById(k).then((function(t){return v(t,[c,k,e])}));else if("selectedTrack"===t)console.log("adding track",n);else if(["up","down"].includes(t)){x(!0);var r=f()(c.queue,(function(e){return e.track.id===n.track.id}));console.log("found in queue ",r),r.votes+="up"===t?1:-1,c.queue=le()(c.queue,"votes").reverse(),Y.update({_id:c._id},{queue:c.queue}).then((function(){return i(c)})).finally((function(){return x(!1)}))}};if(j)return console.log(j),404===j?Object(I.jsxs)(A,{children:[Object(I.jsxs)("h1",{children:["Quarry not found ",Object(I.jsx)("code",{children:"404"})]}),Object(I.jsx)("p",{children:"It might have been deleted. Or we might've screwed up (probs not tbh)"}),Object(I.jsx)("p",{children:Object(I.jsx)("a",{href:"/",children:"Back to the pantry"})})]}):Object(I.jsxs)(A,{children:[Object(I.jsx)("h1",{children:"Uh oh"}),Object(I.jsx)("p",{children:"Don't look at me."}),Object(I.jsx)("p",{children:Object(I.jsx)("a",{href:"/",children:"Just go away"})})]});if(null===c)return Object(I.jsx)(E,{});var C=Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(se.b,{})," ",null===y||void 0===y?void 0:y.money]});return Object(I.jsxs)(A,{align:"left",children:[Object(I.jsxs)("section",{children:[Object(I.jsxs)("h2",{children:[c.name," "]}),Object(I.jsx)("h4",{children:"number"===typeof(null===y||void 0===y?void 0:y.money)?C:" "})]}),Object(I.jsx)(_e,{phrase:c.phrase}),Object(I.jsx)("br",{}),Object(I.jsxs)(ge.a,{defaultActiveKey:"profile",id:"uncontrolled-tab-example",className:"mb-3",children:[Object(I.jsx)(ye.a,{eventKey:"songs",title:Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(se.a,{})," Songs"]}),children:Object(I.jsx)(me,{songs:c.queue,onVote:S})}),Object(I.jsx)(ye.a,{eventKey:"new",title:Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(ie.b,{})," New "]}),children:Object(I.jsx)(Ee,{eventHandler:S,soupId:e})})]})]})}var Ce={display:"flex",justifyContent:"center"};t.a=function(){return Object(c.a)({apiKey:"AIzaSyDQfAAJqtKOKXEdRL1SfqS3Pj8VjAIqvzE",authDomain:"music-mining.firebaseapp.com",projectId:"music-mining",storageBucket:"music-mining.appspot.com",messagingSenderId:"616247216727",appId:"1:616247216727:web:951437741a8d7445b3f112"}),Object(I.jsx)("div",{className:"App",style:Ce,children:Object(I.jsxs)(r.f,{children:[Object(I.jsx)(r.d,{path:"/",element:Object(I.jsx)(C,{})}),Object(I.jsx)(r.d,{path:"/spotifyConnect",element:Object(I.jsx)(ce,{})}),Object(I.jsx)(r.d,{path:"/callback",element:Object(I.jsx)(ce,{})}),Object(I.jsx)(r.d,{path:"/quarry/new",element:Object(I.jsx)(K,{})}),Object(I.jsx)(r.d,{path:"/quarry/:id",element:Object(I.jsx)(Ae,{})}),Object(I.jsx)(r.d,{path:"/:phrase",element:Object(I.jsx)(oe,{})})]})})}},214:function(e,t,n){"use strict";n.r(t),function(e){n(1);var t=n(46),r=n(48),c=(n(219),n(212)),a=n(100),o=n(30),i=n(96),s=(n(341),n(2));Object(i.a)({apiKey:"AIzaSyDQfAAJqtKOKXEdRL1SfqS3Pj8VjAIqvzE",authDomain:"music-mining.firebaseapp.com",projectId:"music-mining",storageBucket:"music-mining.appspot.com",messagingSenderId:"616247216727",appId:"1:616247216727:web:951437741a8d7445b3f112"});var u=Object(a.a)();"production"===e.NODE_ENV||Object(o.c)(u,"localhost",8080),t.render(Object(s.jsx)(r.BrowserRouter,{children:Object(s.jsx)(c.a,{})}),document.getElementById("root"))}.call(this,n(21))},219:function(e,t,n){},220:function(e,t,n){},229:function(e,t){},231:function(e,t){},241:function(e,t){},243:function(e,t){},270:function(e,t){},271:function(e,t){},276:function(e,t){},278:function(e,t){},285:function(e,t){},304:function(e,t){},337:function(e,t,n){}},[[214,1,2]]]);
//# sourceMappingURL=main.477b2493.chunk.js.map