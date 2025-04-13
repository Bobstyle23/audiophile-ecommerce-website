(()=>{"use strict";var t={886:(t,e,n)=>{function r(t){return t.toLocaleString("en-US",{style:"currency",currency:"USD",maximumSignificantDigits:5})}n.d(e,{$g:()=>r,Cn:()=>s,b8:()=>a,bE:()=>o,rh:()=>i,wT:()=>l});let c=JSON.parse(localStorage.getItem("cart"))||[];function o(t){return{add(){const{name:e,price:n,count:r,cartImagePath:o}=t,a=c.findIndex((t=>t.itemName===e));-1!==a?(c[a].itemCount+=r,localStorage.setItem("cart",JSON.stringify(c))):(c=[...c,{itemName:e,itemPrice:n,itemCount:r,itemImage:o}],localStorage.setItem("cart",JSON.stringify(c)))},delete(){c=[],localStorage.removeItem("cart"),localStorage.clear()}}}function a(t,e){return t.addEventListener("click",(()=>e()))}function i(t){return t.classList.contains("open")}function l(t,e,n){i(e)?(e.classList.remove("open"),setTimeout((()=>{t.classList.add("open")}))):(t.classList.toggle("open"),n.classList.toggle("overlay__hidden"))}const s=c.map((t=>t)).reduce(((t,e)=>t+e.itemPrice*e.itemCount),0)}},e={};function n(r){var c=e[r];if(void 0!==c)return c.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var r=n(886);const c=document.querySelector(".cart__count"),o=JSON.parse(localStorage.getItem("cart"))||[],a=document.querySelector(".cart__products"),i=document.querySelector(".total__price"),l=document.querySelector(".header__btn--cart"),s=document.querySelector(".cart__delete-btn"),u=document.querySelector(".cart"),m=document.querySelector(".overlay"),d=document.querySelector(".menu");let _=(0,r.bE)();function g(){(0,r.wT)(u,d,m)}(0,r.b8)(m,(()=>{(0,r.rh)(u)&&g()})),l.addEventListener("click",(()=>{u.parentNode.style.position="relative",g()})),s.addEventListener("click",(()=>{_.delete(),g()})),o.length<1&&(s.textContent="");for(let t of o)a.innerHTML+=`\n   <div class="cart__product">\n      <img src=${t.itemImage} alt="" class="cart-product__img" />\n      <h3 class="cart-product__title">${t.itemName.split(" ")[0]}</h3>\n      <small class="cart-product__price">${(0,r.$g)(t.itemPrice)}</small>\n\n      <div class="counter cart-product__counter">\n        <button type="button" class="btn btn__counter btn__counter--decrease">\n          ˗\n        </button>\n        <span class="counter__count">${t.itemCount||1}</span>\n        <button type="button" class="btn btn__counter btn__counter--increase">\n          +\n        </button>\n      </div>\n    </div>\n`;[...a.children].forEach(((t,e)=>{const n=t.querySelector(".counter__count"),r=t.querySelector(".btn__counter--increase"),c=t.querySelector(".btn__counter--decrease");let a=o[e].itemCount||1;const i=()=>{n.textContent=a,o[e].itemCount=a};r.addEventListener("click",(()=>{a++,i(),o[e].itemCount=a,localStorage.setItem("cart",JSON.stringify(o))})),c.addEventListener("click",(()=>{a>1&&(a--,i(),o[e].itemCount=a,localStorage.setItem("cart",JSON.stringify(o)))}))})),c.textContent+=o.length?`(${o.length})`:"",i.textContent=(0,r.$g)(r.Cn)})();