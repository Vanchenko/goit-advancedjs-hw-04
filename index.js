import{a as f,S as h,i as p}from"./assets/vendor-BgmC94F3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))u(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&u(d)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const e={lmBtnEl:document.querySelector(".return-begin"),galleryEl:document.querySelector(".gallery"),srhFormEl:document.querySelector("#search-form"),foundPict:document.querySelector("#found-pictures"),loadPict:document.querySelector("#load-pictures"),currentPage:document.querySelector("#current-page"),spinner:document.querySelector(".loader")},b="https://pixabay.com/api/",a={params:{key:"35244614-3f1384186f27e7cacc119fb8b",page:1,per_page:50,image_type:"photo",orientation:"horizontal",safesearch:!0}},y=async()=>await f.get(b,a);let P=new h(".gallery a",{enableKeyboard:!0,captionPosition:"bottom",captionSelector:"img",captionType:"attr",captionsData:"alt",captionDelay:250,showCounter:!1});function g(l){let t="";t=l.data.hits.map(o=>`<div class="photo-card">
            <a class="gallery link" href="${o.largeImageURL}">
                <img src="${o.webformatURL}" alt="${o.tags}" width="360" height="200" loading="lazy"/> 
            </a>
            <ul class="info">
                <li class="info-item">
                    <b>Likes</b>
                    <p>${o.likes}</p>
                </li>
                <li class="info-item">
                    <b>Views</b>
                    <p>${o.views}</p>
                </li>
                <li class="info-item">
                    <b>Comments</b>
                    <p>${o.comments}</p>
                </li>
                <li class="info-item">
                    <b>Downloads</b>
                    <p>${o.downloads}</p>
                </li>
            </ul>
            </div>`).join(""),e.galleryEl.insertAdjacentHTML("beforeend",t),P.refresh()}function m(l,t,o){e.foundPict.style.display="flex",e.loadPict.style.display="flex",e.currentPage.style.display="flex",e.foundPict.textContent=`Found pictures :${l}`,e.loadPict.textContent=`Load pictures :${t}`,e.currentPage.textContent=`Page :${o}`}e.lmBtnEl.style.display="none";e.foundPict.style.display="none";e.loadPict.style.display="none";e.currentPage.style.display="none";e.spinner.style.display="none";let i=1,n=0,c=0;const E=a.params.per_page,w={root:null,rootMargin:"300px",threshold:1},L=function(l,t){l[0].isIntersecting&&c>n?(i+=1,a.params.page=i,t.disconnect(),e.spinner.style.display="inline-block",y().then(o=>{n=n+o.data.hits.length,g(o),m(o.data.totalHits,n,i),t.observe(e.galleryEl.lastElementChild)}).catch(o=>{console.log(o.response)}).finally(()=>{e.spinner.style.display="none"})):c<=n&&(t.disconnect(),c>E&&(e.lmBtnEl.style.display="flex",p.show({message:"We're sorry, but you've reached the last page of search results.",position:"topRight",backgroundColor:"red",messageColor:"white"})))},C=new IntersectionObserver(L,w);e.srhFormEl.addEventListener("submit",l=>{if(l.preventDefault(),a.params.q=e.srhFormEl.elements[0].value.trim(),a.params.q===""){console.log("return"),l.currentTarget.reset();return}l.currentTarget.reset(),i=1,a.params.page=i,n=0,e.lmBtnEl.style.display="none",e.srhFormEl.children[1].setAttribute("disabled","true"),e.galleryEl.innerHTML="",e.foundPict.style.display="none",e.loadPict.style.display="none",e.currentPage.style.display="none",e.spinner.style.display="inline-block",y().then(t=>{t.data.hits.length>0?(p.show({message:`Hooray! We found ${t.data.totalHits} images.`,position:"topRight",backgroundColor:"blue",messageColor:"white"}),e.spinner.style.display="none",c=t.data.totalHits,g(t),n=n+t.data.hits.length,m(t.data.totalHits,n,i),C.observe(e.galleryEl.lastElementChild)):p.show({message:`Sorry, there are no images matching your search query: "${a.params.q}". Please try again!`,position:"topRight",backgroundColor:"red",messageColor:"white"})}).catch(t=>{console.log(t)}).finally(()=>{setTimeout(()=>{e.srhFormEl.children[1].removeAttribute("disabled")},3e3),e.spinner.style.display="none"})});e.lmBtnEl.addEventListener("click",()=>{window.scroll(0,0)});
//# sourceMappingURL=index.js.map
