(self.webpackChunkreact_movie=self.webpackChunkreact_movie||[]).push([[261],{2369:function(e,t,n){var r,a=n(6690).default,o=n(9728).default,u=n(6115).default,l=n(1655).default,i=n(6389).default,c=n(4704).default,s=Object.create,f=Object.defineProperty,p=Object.getOwnPropertyDescriptor,y=Object.getOwnPropertyNames,d=Object.getPrototypeOf,m=Object.prototype.hasOwnProperty,v=function(e,t,n,r){if(t&&"object"===typeof t||"function"===typeof t){var a,o=c(y(t));try{var u=function(){var o=a.value;m.call(e,o)||o===n||f(e,o,{get:function(){return t[o]},enumerable:!(r=p(t,o))||r.enumerable})};for(o.s();!(a=o.n()).done;)u()}catch(l){o.e(l)}finally{o.f()}}return e},h=function(e,t,n){return function(e,t,n){t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n}(e,"symbol"!==typeof t?t+"":t,n),n},P={};!function(e,t){for(var n in t)f(e,n,{get:t[n],enumerable:!0})}(P,{default:function(){return w}}),e.exports=(r=P,v(f({},"__esModule",{value:!0}),r));var k=function(e,t,n){return n=null!=e?s(d(e)):{},v(!t&&e&&e.__esModule?n:f(n,"default",{value:e,enumerable:!0}),e)}(n(2791)),b=n(2737),g=n(7709),w=function(e){"use strict";l(n,e);var t=i(n);function n(){var e;return a(this,n),e=t.apply(this,arguments),h(u(e),"callPlayer",b.callPlayer),h(u(e),"duration",null),h(u(e),"currentTime",null),h(u(e),"secondsLoaded",null),h(u(e),"mute",(function(){e.callPlayer("mute")})),h(u(e),"unmute",(function(){e.callPlayer("unmute")})),h(u(e),"ref",(function(t){e.iframe=t})),e}return o(n,[{key:"componentDidMount",value:function(){this.props.onMount&&this.props.onMount(this)}},{key:"load",value:function(e){var t=this;(0,b.getSDK)("https://cdn.embed.ly/player-0.1.0.min.js","playerjs").then((function(e){t.iframe&&(t.player=new e.Player(t.iframe),t.player.on("ready",(function(){setTimeout((function(){t.player.isReady=!0,t.player.setLoop(t.props.loop),t.props.muted&&t.player.mute(),t.addListeners(t.player,t.props),t.props.onReady()}),500)})))}),this.props.onError)}},{key:"addListeners",value:function(e,t){var n=this;e.on("play",t.onPlay),e.on("pause",t.onPause),e.on("ended",t.onEnded),e.on("error",t.onError),e.on("timeupdate",(function(e){var t=e.duration,r=e.seconds;n.duration=t,n.currentTime=r}))}},{key:"play",value:function(){this.callPlayer("play")}},{key:"pause",value:function(){this.callPlayer("pause")}},{key:"stop",value:function(){}},{key:"seekTo",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.callPlayer("setCurrentTime",e),t||this.pause()}},{key:"setVolume",value:function(e){this.callPlayer("setVolume",e)}},{key:"setLoop",value:function(e){this.callPlayer("setLoop",e)}},{key:"getDuration",value:function(){return this.duration}},{key:"getCurrentTime",value:function(){return this.currentTime}},{key:"getSecondsLoaded",value:function(){return this.secondsLoaded}},{key:"render",value:function(){return k.default.createElement("iframe",{ref:this.ref,src:this.props.url,frameBorder:"0",scrolling:"no",style:{width:"100%",height:"100%"},allow:"encrypted-media; autoplay; fullscreen;",referrerPolicy:"no-referrer-when-downgrade"})}}]),n}(k.Component);h(w,"displayName","Kaltura"),h(w,"canPlay",g.canPlay.kaltura)}}]);
//# sourceMappingURL=reactPlayerKaltura.3cca1ac3.chunk.js.map