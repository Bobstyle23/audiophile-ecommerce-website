(()=>{const e=JSON.parse(sessionStorage.getItem("productData")),t=new URLSearchParams(window.location.search).get("id"),n=document.querySelector(".included__list"),c=document.querySelector(".features"),r=document.querySelector(".recommendations"),i=document.querySelector(".gallery"),a=document.querySelector(".detail__image").children,o=document.querySelector(".detail__back-btn"),l=document.querySelector(".detail--new"),d=document.querySelector(".detail__name"),s=document.querySelector(".detail__description"),m=document.querySelector(".detail__price"),u=(document.querySelector(".detail__add-to-cart"),document.querySelector(".counter__count")),_=document.querySelector(".btn__counter--increase"),g=document.querySelector(".btn__counter--decrease"),{includes:p,gallery:y,name:S,others:f,description:b,features:h,categoryImage:q,new:w,price:x}=e.find((e=>e.slug===t));o.addEventListener("click",(()=>{history.back()}));const C=Object.values(q);for(let[e,t]of C.entries())a[e].srcset=t;w&&(l.textContent="New Product"),d.textContent=S,s.textContent=b,m.textContent=x.toLocaleString("en-US",{style:"currency",currency:"USD",maximumSignificantDigits:4});let $=function(){let e=1;return{increase(){e+=1},decrease(){e>1&&(e-=1)},getValue:()=>e}}(),L=e.find((e=>e.slug===t));_.addEventListener("click",(()=>{$.increase(),u.textContent=$.getValue(),L={...L,count:$.getValue()}})),g.addEventListener("click",(()=>{$.decrease(),u.textContent=$.getValue(),L={...L,count:$.getValue()}}));for(let e in y)i.innerHTML+=`\n  <picture class="gallery__image gallery__image--${e}">\n    <source\n      srcset=${y[e].desktop}\n      media="(min-width: 75em)"\n      type="image/webp"\n    />\n    <source\n      srcset=${y[e].tablet}\n      media="(min-width: 48em)"\n      type="image/webp"\n    />\n    <img\n      src=${y[e].mobile}\n      alt=""\n    />\n  </picture>\n`;for(let e of f){const t=document.createElement("article");t.classList.add("recommendation"),t.innerHTML=`\n   <picture class="recommendation__image">\n      <source\n        srcset=${e.image.desktop}\n        media="(min-width: 75em)"\n        type="image/webp"\n      />\n      <source\n        srcset=${e.image.tablet}\n        media="(min-width: 48em)"\n        type="image/webp"\n      />\n      <img\n        src=${e.image.mobile}\n        alt=""\n      />\n    </picture>\n    <h3 class="recommendation__title">${e.name}</h3>\n    <a href="./category-detail.html?id=${e.slug}" class="btn btn__primary recommendation__link">See product</a>\n`,r.appendChild(t)}for(let e of h.split("\n\n")){const t=document.createElement("p");t.classList.add("features__text"),t.textContent=e,c.appendChild(t)}for(let e of p){let t=document.createElement("li"),c=document.createElement("span");t.classList.add("included__list--item"),c.textContent=`${e.quantity}x`,t.textContent=`${e.item}`,t.prepend(c),n.appendChild(t)}})();