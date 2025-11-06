import refs from "./refs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let gallery = new SimpleLightbox('.gallery a', {
    enableKeyboard: true,
    captionPosition: 'bottom',
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionDelay: 250,
    showCounter: false,
});

export function renderGallery(pictures) {
    let markUp = "";
    markUp = pictures.data.hits.map((elem) => `<div class="photo-card">
            <a class="gallery link" href="${elem.largeImageURL}">
                <img src="${elem.webformatURL}" alt="${elem.tags}" width="360" height="200" loading="lazy"/> 
            </a>
            <ul class="info">
                <li class="info-item">
                    <b>Likes</b>
                    <p>${elem.likes}</p>
                </li>
                <li class="info-item">
                    <b>Views</b>
                    <p>${elem.views}</p>
                </li>
                <li class="info-item">
                    <b>Comments</b>
                    <p>${elem.comments}</p>
                </li>
                <li class="info-item">
                    <b>Downloads</b>
                    <p>${elem.downloads}</p>
                </li>
            </ul>
            </div>`).join("");
    refs.galleryEl.insertAdjacentHTML("beforeend", markUp);
    gallery.refresh();

   // observer.observe(refs.galleryEl.lastChild);
}

export function renderInfoline(qqpict, pictTotal, page) {
    refs.foundPict.style.display = "flex";
    refs.loadPict.style.display = "flex";
    refs.currentPage.style.display = "flex";
    refs.foundPict.textContent = `Found pictures :${qqpict}`;
    refs.loadPict.textContent = `Load pictures :${pictTotal}`;
    refs.currentPage.textContent = `Page :${page}`;
}