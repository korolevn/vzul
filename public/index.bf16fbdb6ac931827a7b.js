!function(){"use strict";var t={91:function(t){t.exports=function(t,e){return e||(e={}),t?(t=String(t.__esModule?t.default:t),e.hash&&(t+=e.hash),e.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(t)?'"'.concat(t,'"'):t):t}},594:function(t,e,n){t.exports=n.p+"b9379d610a1a48b7d911.css"}},e={};function n(r){var s=e[r];if(void 0!==s)return s.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}n.m=t,n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t;n.g.importScripts&&(t=n.g.location+"");var e=n.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var r=e.getElementsByTagName("script");r.length&&(t=r[r.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=t}(),n.b=document.baseURI||self.location.href,function(){var t=n(91),e=n.n(t),r=new URL(n(594),n.b);e()(r);class s{constructor(t,e,n){if(new.target===s)throw new Error("can not instantiate AbstractComponent");this._ctx=n.getContext("2d"),this._element=null,this._ctx.translate(0,n.height),this._ctx.scale(1,-1),this._coords={x:t,y:e}}get context(){return this._ctx}get element(){return this._element||(this._element=this.template),this._element}get template(){throw new Error("method must be implemented")}get coords(){return this._coords}renderChart(){return this.template}}const o=document.querySelector(".container"),i=new class{constructor(t,e){this._element=null,this._width=t,this._height=e}get template(){return(t=>{const e=document.createElement("div");return e.innerHTML=t,e.firstChild})(`<canvas id="canvas"\n   width="${this._width}" height="${this._height}" \n  </canvas>`)}get element(){return this._element||(this._element=this.template),this._element}renderCanvas(){return this.element}}(800,400);((t,e,n="end")=>{"begin"===n&&e.prepend(t),"end"===n&&e.append(t)})(i.renderCanvas(),o);const h=new class{constructor(t,e,n){this._canvas=n,this._ctx=n.getContext("2d"),this._row=t,this._col=e,this._element=null}get context(){return this._ctx}get template(){return((t,e,n,r)=>{const s=t.height,o=t.width,i=(t.width-(r+1))/r+1,h=(s-(n+1))/n+1,c="_label_",l="normal 20px sans-serif",a=30;e.font=l;const u=e.measureText(c);t.width+=u.width+a+50,t.height+=70,e.beginPath(),e.strokeStyle="#d4cdcd",e.font=l;let d=.5;for(let t=0;t<n+1;t++)e.textBaseline="middle",e.textAlign="left",e.fillText(c,0,d+20),e.moveTo(u.width+a,d+20),e.lineTo(o+a+u.width,d+20),d+=h;let f=.5;for(let t=0;t<r+1;t++)e.textBaseline="top",e.textAlign="center",e.fillText(c,f+u.width+a,h*n+20+30),e.moveTo(f+u.width+a,20.5),e.lineTo(f+u.width+a,h*n+20),f+=i;e.stroke(),e.closePath(),e.translate(u.width+a,-50)})(this._canvas,this.context,this._row,this._col)}get element(){return this._element||(this._element=this.template),this._element}renderGrid(){return this.element}}(5,10,i.element);h.renderGrid(),new class extends s{get template(){return((t,e,n)=>{t.lineWidth=2,t.strokeStyle="#8bb2ff",t.setLineDash([10,3]),t.beginPath(),t.moveTo(0,0);const r=((t,e)=>{let n,r=t.length;if(r!==e.length)throw"Need an equal count of xs and ys.";if(0===r)return function(t){return 0};if(1===r){let t=+e[0];return function(e){return t}}const s=[];for(n=0;n<r;n++)s.push(n);s.sort((function(e,n){return t[e]<t[n]?-1:1}));const o=t,i=e;for(t=[],e=[],n=0;n<r;n++)t.push(+o[s[n]]),e.push(+i[s[n]]);const h=[],c=[],l=[];for(n=0;n<r-1;n++){const r=t[n+1]-t[n],s=e[n+1]-e[n];c.push(r),h.push(s),l.push(s/r)}const a=[l[0]];for(n=0;n<c.length-1;n++){const t=l[n],e=l[n+1];if(t*e<=0)a.push(0);else{const r=c[n],s=c[n+1],o=r+s;a.push(3*o/((o+s)/t+(o+r)/e))}}a.push(l[l.length-1]);const u=[],d=[];for(n=0;n<a.length-1;n++){const t=a[n],e=l[n],r=1/c[n],s=t+a[n+1]-e-e;u.push((e-t-s)*r),d.push(s*r*r)}return function(r){if(n=t.length-1,r===t[n])return e[n];let s,o=0,i=d.length-1;for(;o<=i;){s=Math.floor(.5*(o+i));const n=t[s];if(n<r)o=s+1;else{if(!(n>r))return e[s];i=s-1}}n=Math.max(0,i);const h=r-t[n],c=h*h;return e[n]+a[n]*h+u[n]*c+d[n]*h*c}})(e,n);for(let e=0;e<389;e++)t.lineTo(e,r(e));t.stroke(),t.closePath()})(this.context,this.coords.x,this.coords.y)}}([0,100,200],[0,100,300],i.element).renderChart()}()}();