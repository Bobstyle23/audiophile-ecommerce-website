(()=>{"use strict";var e={886:(e,t,r)=>{function o(e,t){return e.addEventListener("click",(()=>t()))}function n(e){return e.classList.contains("open")}function c(e,t,r){n(t)?(t.classList.remove("open"),setTimeout((()=>{e.classList.add("open")}))):(e.classList.toggle("open"),r.classList.toggle("overlay__hidden"))}r.d(t,{b8:()=>o,rh:()=>n,wT:()=>c}),(JSON.parse(localStorage.getItem("cart"))||[]).map((e=>e)).reduce(((e,t)=>e+t.itemPrice*t.itemCount),0)}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,r),c.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var o=r(886);const n=document.querySelector(".header__btn--hamburger"),c=document.querySelector(".menu"),l=document.querySelector(".cart"),i=document.querySelector(".overlay"),s=document.querySelector(".hero__title"),a=document.querySelector(".hero__link"),u=document.querySelectorAll(".product__title"),d=document.querySelectorAll(".product__link"),p=()=>{(0,o.wT)(c,l,i)};(0,o.b8)(i,(()=>{(0,o.rh)(c)&&p()})),n.addEventListener("click",(()=>p())),[...c.children[0].children].forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault();const t=e.target.href;setTimeout((()=>{window.location.href=t}),350),p()}))}));for(let[e,t]of u.entries()){const r=t.textContent.trim().split(" ").filter((e=>Boolean(e)&&"\n"!==e)).join("-");d[e].href+=r}a.href=`${a.href}${s.textContent.replace("Ⅱ","two").split(" ").join("-").toLowerCase()}`})();