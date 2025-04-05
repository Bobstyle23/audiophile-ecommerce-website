(()=>{const e=JSON.parse(sessionStorage.getItem("productData")),t=new URLSearchParams(window.location.search).get("id"),n=document.querySelector(".included__list"),c=document.querySelector(".features"),r=document.querySelector(".recommendations"),a=document.querySelector(".gallery"),o=document.querySelector(".detail__image").children,i=document.querySelector(".detail__back-btn"),l=document.querySelector(".detail--new"),d=document.querySelector(".detail__name"),m=document.querySelector(".detail__description"),s=document.querySelector(".detail__price"),u=document.querySelector(".detail__add-to-cart"),g=document.querySelector(".counter__count"),p=document.querySelector(".btn__counter--increase"),_=document.querySelector(".btn__counter--decrease"),{includes:y,gallery:S,name:f,others:h,description:b,features:q,categoryImage:w,new:C,price:$,slug:x}=e.find((e=>e.slug===t));i.addEventListener("click",(()=>{history.back()}));const L=Object.values(w).reverse();for(let[e,t]of L.entries())o[e].srcset=t;C&&(l.textContent="New Product"),d.textContent=f,m.textContent=b,s.textContent=$.toLocaleString("en-US",{style:"currency",currency:"USD",maximumSignificantDigits:4});let k=function(){let e=1;return{increase(){e+=1},decrease(){e>1&&(e-=1)},getValue:()=>e}}(),v={...e.find((e=>e.slug===t)),count:k.getValue(),cartImagePath:`./img/cart/image-${x}.webp`};function E(){g.textContent=k.getValue(),v.count=k.getValue()}p.addEventListener("click",(()=>{k.increase(),E()})),_.addEventListener("click",(()=>{k.decrease(),E()}));const I=function(){let e=JSON.parse(localStorage.getItem("cart"))||[];return{add(){const{name:t,price:n,count:c,cartImagePath:r}=v,a=n*c;e=[...e,{itemName:t,totalPrice:a,itemCount:c,itemImage:r}],localStorage.setItem("cart",JSON.stringify(e)),console.log(e)},delete(){e=[],localStorage.removeItem("cart"),localStorage.clear()}}}();u.addEventListener("click",(e=>{e.preventDefault(),I.add()}));for(let e in S)a.innerHTML+=`\n  <picture class="gallery__image gallery__image--${e}">\n    <source\n      srcset=${S[e].desktop}\n      media="(min-width: 75em)"\n      type="image/webp"\n    />\n    <source\n      srcset=${S[e].tablet}\n      media="(min-width: 48em)"\n      type="image/webp"\n    />\n    <img\n      src=${S[e].mobile}\n      alt=""\n    />\n  </picture>\n`;for(let e of h){const t=document.createElement("article");t.classList.add("recommendation"),t.innerHTML=`\n   <picture class="recommendation__image">\n      <source\n        srcset=${e.image.desktop}\n        media="(min-width: 75em)"\n        type="image/webp"\n      />\n      <source\n        srcset=${e.image.tablet}\n        media="(min-width: 48em)"\n        type="image/webp"\n      />\n      <img\n        src=${e.image.mobile}\n        alt=""\n      />\n    </picture>\n    <h3 class="recommendation__title">${e.name}</h3>\n    <a href="./category-detail.html?id=${e.slug}" class="btn btn__primary recommendation__link">See product</a>\n`,r.appendChild(t)}for(let e of q.split("\n\n")){const t=document.createElement("p");t.classList.add("features__text"),t.textContent=e,c.appendChild(t)}for(let e of y){let t=document.createElement("li"),c=document.createElement("span");t.classList.add("included__list--item"),c.textContent=`${e.quantity}x`,t.textContent=`${e.item}`,t.prepend(c),n.appendChild(t)}})();