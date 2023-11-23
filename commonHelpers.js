import{i as u,a as h}from"./assets/vendor-6d0036ef.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const y="https://pixabay.com/api/",b="23089683-10e6383e94187ff47334541d4",f={key:"",page:1,per_page:40,image_type:"photo",orientation:"horizontal",safesearch:!0,q:""},i={input:document.querySelector("input"),button:document.querySelector("button"),gallery:document.querySelector(".gallery"),loadMore:document.querySelector(".load-more")};i.input.addEventListener("input",v);i.button.addEventListener("click",L);i.loadMore.addEventListener("click",M);let l="";function v(t){t.preventDefault(),l=t.target.value.trim()}function L(t){if(t.preventDefault(),i.gallery.innerHTML="",l.length===0)return i.input.value="",u.info({message:"You should enter something to input!"});d(l)}async function d(t){try{const{data:n}=await h(k(y,b,f,t));S(n),q(n)}catch{return u.error({message:"Something went wrong :-( try again later."})}}function k(t,n,r,s){return t+"?"+Object.keys(r).map(e=>{switch(e){case"key":return e.concat("=",n);case"q":return e.concat("=",s);default:return e.concat("=",r[e])}}).join("&")}function S(t){const{hits:n}=t;if(n.length===0)return u.info({message:"Sorry, there are no images matching your search query. Please try again."});n.map(({webformatURL:r,largeImageURL:s,tags:e,likes:o,views:a,comments:p,downloads:g})=>{const m=`
        <div class="photo-card">
          <img src=${r} alt=${e} loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span>${c(o)}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span>${c(a)}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span>${c(p)}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span>${c(g)}</span>
            </p>
          </div>
        </div>`;i.gallery.insertAdjacentHTML("beforeend",m)})}function c(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function M(t){t.preventDefault(),f.page+=1,d(l)}function q(t){const{hits:n,totalHits:r}=t;console.log(t),n.length<=f.per_page?u.info({message:"We're sorry, but you've reached the end of search results."}):i.loadMore.classList.remove("hide")}
//# sourceMappingURL=commonHelpers.js.map
