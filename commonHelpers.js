import{f as h}from"./assets/api-bb30e552.js";/* empty css                      */import{i as a,S as y}from"./assets/vendor-4c86d853.js";a.settings({position:"topRight",transitionIn:"bounceInDown",closeOnEscape:!0});const t={input:document.querySelector("input"),button:document.querySelector(".js-search-button"),gallery:document.querySelector(".gallery"),loadMore:document.querySelector(".js-load-more")};t.input.addEventListener("input",b);t.button.addEventListener("click",v);t.loadMore.addEventListener("click",L);let i="",o=1;function b(e){e.preventDefault(),i=e.target.value.trim()}function v(e){e.preventDefault(),M(),k()&&l(o,i)}function l(e,n){h(e,n).then(r=>{w(r)}).catch(r=>{a.error({message:"Something went wrong :-( try again later."})})}function w({hits:e,totalHits:n}){if(e.length===0)return a.info({message:"Sorry, there are no images matching your search query. Please try again."});S(n),e.map(({webformatURL:r,largeImageURL:c,tags:u,likes:p,views:d,comments:f,downloads:m})=>{const g=`
        <li class="photo-card">
          <a class="gallery-link" href = ${c}>
            <img src=${r} alt=${u} loading="lazy" />
          </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <span>${s(p)}</span>
              </p>
              <p class="info-item">
                <b>Views</b>
                <span>${s(d)}</span>
              </p>
              <p class="info-item">
                <b>Comments</b>
                <span>${s(f)}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <span>${s(m)}</span>
              </p>
            </div>
          </li>`;D.refresh(),t.gallery.insertAdjacentHTML("beforeend",g)}),$(o,n)}function L(e){e.preventDefault(),o+=1,l(o,i)}function M(){o=1,t.gallery.innerHTML="",t.loadMore.classList.add("hide")}function k(){return i.length===0?(t.input.value="",a.warning({message:"You should enter something to input!"}),!1):!0}function S(e){o>=Math.ceil(e/40)?(a.info({message:"We're sorry, but you've reached the end of search results."}),t.loadMore.classList.add("hide")):t.loadMore.classList.remove("hide")}function $(e,n){e===1?a.success({message:`Hooray! We found ${n} images.`}):window.scrollBy({top:window.innerHeight*.8,behavior:"smooth"})}function s(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}const D=new y(".photo-card a",{sourceAttr:"href",overlay:!0,nav:!0});
//# sourceMappingURL=commonHelpers.js.map
