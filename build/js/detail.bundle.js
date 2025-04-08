(()=>{"use strict";var e={886:(e,t,n)=>{function r(e){return e.toLocaleString("en-US",{style:"currency",currency:"USD",maximumSignificantDigits:4})}function c(){let e=1;return{increase(){e+=1},decrease(){e>1&&(e-=1)},getValue:()=>e}}n.d(t,{$g:()=>r,bE:()=>o,tH:()=>c});let a=JSON.parse(localStorage.getItem("cart"))||[];function o(e){return{add(){const{name:t,price:n,count:r,cartImagePath:c}=e,o=a.findIndex((e=>e.itemName===t));-1!==o?(a[o].itemCount+=r,localStorage.setItem("cart",JSON.stringify(a))):(a=[...a,{itemName:t,itemPrice:n,itemCount:r,itemImage:c}],localStorage.setItem("cart",JSON.stringify(a)))},delete(){a=[],localStorage.removeItem("cart"),localStorage.clear()}}}a.map((e=>e)).reduce(((e,t)=>e+t.itemPrice*t.itemCount),0)}},t={};function n(r){var c=t[r];if(void 0!==c)return c.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r=n(886);const c=JSON.parse(sessionStorage.getItem("productData")),a=new URLSearchParams(window.location.search).get("id"),o=document.querySelector(".included__list"),i=document.querySelector(".features"),l=document.querySelector(".recommendations"),d=document.querySelector(".gallery"),m=document.querySelector(".detail__image").children,s=document.querySelector(".detail__back-btn"),u=document.querySelector(".detail--new"),g=document.querySelector(".detail__name"),p=document.querySelector(".detail__description"),_=document.querySelector(".detail__price"),y=document.querySelector(".detail__add-to-cart"),S=document.querySelector(".counter__count"),f=document.querySelector(".btn__counter--increase"),b=document.querySelector(".btn__counter--decrease"),{includes:h,gallery:w,name:x,others:q,description:v,features:C,categoryImage:$,new:L,price:E,slug:I}=c.find((e=>e.slug===a));s.addEventListener("click",(()=>{history.back()}));const k=Object.values($).reverse();for(let[e,t]of k.entries())m[e].srcset=t;L&&(u.textContent="New Product"),g.textContent=x,p.textContent=v,_.textContent=(0,r.$g)(E);let O=(0,r.tH)(),P={...c.find((e=>e.slug===a)),count:O.getValue(),cartImagePath:`./img/cart/image-${I}.webp`};function N(){S.textContent=O.getValue(),P.count=O.getValue()}f.addEventListener("click",(e=>{console.log(e),O.increase(),N()})),b.addEventListener("click",(()=>{O.decrease(),N()}));const D=(0,r.bE)(P);y.addEventListener("click",(e=>{e.preventDefault(),D.add()}));for(let e in w)d.innerHTML+=`\n  <picture class="gallery__image gallery__image--${e}">\n    <source\n      srcset=${w[e].desktop}\n      media="(min-width: 75em)"\n      type="image/webp"\n    />\n    <source\n      srcset=${w[e].tablet}\n      media="(min-width: 48em)"\n      type="image/webp"\n    />\n    <img\n      src=${w[e].mobile}\n      alt=""\n    />\n  </picture>\n`;for(let e of q){const t=document.createElement("article");t.classList.add("recommendation"),t.innerHTML=`\n   <picture class="recommendation__image">\n      <source\n        srcset=${e.image.desktop}\n        media="(min-width: 75em)"\n        type="image/webp"\n      />\n      <source\n        srcset=${e.image.tablet}\n        media="(min-width: 48em)"\n        type="image/webp"\n      />\n      <img\n        src=${e.image.mobile}\n        alt=""\n      />\n    </picture>\n    <h3 class="recommendation__title">${e.name}</h3>\n    <a href="./category-detail.html?id=${e.slug}" class="btn btn__primary recommendation__link">See product</a>\n`,l.appendChild(t)}for(let e of C.split("\n\n")){const t=document.createElement("p");t.classList.add("features__text"),t.textContent=e,i.appendChild(t)}for(let e of h){let t=document.createElement("li"),n=document.createElement("span");t.classList.add("included__list--item"),n.textContent=`${e.quantity}x`,t.textContent=`${e.item}`,t.prepend(n),o.appendChild(t)}})();