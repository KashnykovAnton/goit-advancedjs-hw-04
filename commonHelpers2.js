import{f as b}from"./assets/api-bb30e552.js";/* empty css                      */import{i as a,S as v}from"./assets/vendor-4c86d853.js";a.settings({position:"topRight",transitionIn:"bounceInDown",closeOnEscape:!0});const n={input:document.querySelector("input"),button:document.querySelector(".js-search-button"),gallery:document.querySelector(".gallery"),guard:document.querySelector(".js-guard")};n.input.addEventListener("input",S);n.button.addEventListener("click",M);let i="",r=1,c=0;const w={root:null,rootMargin:window.innerHeight*.5+"px",threshold:0};let u=new IntersectionObserver(D,w);function S(e){e.preventDefault(),i=e.target.value.trim()}function M(e){e.preventDefault(),k(),L()&&l(r,i)}async function l(e,t){await b(e,t).then(o=>{$(o)}).catch(o=>{a.error({message:"Something went wrong :-( try again later."})})}function $({hits:e,totalHits:t}){if(e.length===0)return a.info({message:"Sorry, there are no images matching your search query. Please try again."});I(r,t),e.map(({webformatURL:o,largeImageURL:g,tags:p,likes:f,views:m,comments:h,downloads:d})=>{const y=`
        <li class="photo-card">
          <a class="gallery-link" href = ${g}>
            <img src=${o} alt=${p} loading="lazy" />
          </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <span>${s(f)}</span>
              </p>
              <p class="info-item">
                <b>Views</b>
                <span>${s(m)}</span>
              </p>
              <p class="info-item">
                <b>Comments</b>
                <span>${s(h)}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <span>${s(d)}</span>
              </p>
            </div>
          </li>`;q.refresh(),n.gallery.insertAdjacentHTML("beforeend",y)}),c=Math.ceil(t/40),u.observe(n.guard)}function k(){r=1,c=0,u.disconnect(n.guard),n.gallery.innerHTML=""}function L(){return i.length===0?(n.input.value="",a.warning({message:"You should enter something to input!"}),!1):!0}function I(e,t){e===1&&a.success({message:`Hooray! We found ${t} images.`})}function s(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}const q=new v(".photo-card a",{sourceAttr:"href",overlay:!0,nav:!0});function D(e){e.forEach(t=>{t.isIntersecting&&(r+=1,r<=c?l(r,i):a.info({message:"We're sorry, but you've reached the end of search results."}))})}
//# sourceMappingURL=commonHelpers2.js.map
