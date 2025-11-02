
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import refs from './js/refs';
import { options } from "./js/requestOptions";
import { loadPictures } from './js/loadPictures';
import { renderGallery, renderInfoline } from './js/renderGallery';

refs.lmBtnEl.style.display = "none";
refs.foundPict.style.display = "none";
refs.loadPict.style.display = "none";
refs.spinner.style.display = "none";
let page = 1;
let pictTotal = 0;
const per_page = options.params.per_page;

const optionsScroll = {
    root: null,
    rootMargin: '300px',
    threshold: 1.0,
}
const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
        page += 1;
        options.params.page = page;
        observer.disconnect();
        // refs.spinner.style.display = "inline-block";
        loadPictures()
            .then((pictures) => {
                pictTotal = pictTotal + pictures.data.hits.length;
                    if (pictures.data.totalHits < pictTotal) {
                        if (pictures.data.totalHits > per_page) { refs.lmBtnEl.style.display = "flex" };
                        iziToast.show({message:"We're sorry, but you've reached the end of search results.",
                            position: 'topCenter',
                        });
                        return
                    };
                renderGallery(pictures);
                renderInfoline(pictures.data.totalHits, pictTotal);
                observer.observe(refs.galleryEl.lastChild);
            }).catch((error) => {
                console.log(error.response);
            });
    }
};
const observer = new IntersectionObserver(callback, optionsScroll);

refs.srhFormEl.addEventListener("submit", (event) => {  
    event.preventDefault();
    options.params.q = (refs.srhFormEl.elements[0].value).trim();
    if (options.params.q === "") {
        console.log("return");
        event.currentTarget.reset();
        return
    };
    event.currentTarget.reset();
    page = 1;
    options.params.page = page;
    pictTotal = 0;
    refs.lmBtnEl.style.display = "none";
    refs.srhFormEl.children[1].setAttribute('disabled', 'true');
    refs.galleryEl.innerHTML = "";
    refs.foundPict.style.display = "none";
    refs.loadPict.style.display = "none";
    refs.spinner.style.display = "inline-block";
  
    console.log("Search:", options.params.q);
    loadPictures()
        .then((pictures) => {
            if (pictures.data.hits.length > 0) {
                iziToast.show({ message: `Hooray! We found ${pictures.data.totalHits} images.`, 
                        position: 'topCenter',
                })
                refs.spinner.style.display = "none";
                renderGallery(pictures);
                pictTotal = pictTotal + pictures.data.hits.length;
                renderInfoline(pictures.data.totalHits, pictTotal);
                observer.observe(refs.galleryEl.lastChild);

            }
            else { iziToast.show({message:`Sorry, there are no images matching your search query: "${options.params.q}".`,
                position: 'topCenter',
            }) };
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setTimeout(() => { refs.srhFormEl.children[1].removeAttribute('disabled'); }, 3000);
        });
});

refs.lmBtnEl.addEventListener("click", () => {
    window.scroll(0,0);
});