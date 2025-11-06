import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import refs from './js/refs';
import { options } from "./js/requestOptions";
import { loadPictures } from './js/pixabay-api';
import { renderGallery, renderInfoline } from './js/render-functions';

refs.lmBtnEl.style.display = "none";
refs.foundPict.style.display = "none";
refs.loadPict.style.display = "none";
refs.currentPage.style.display = "none";
refs.spinner.style.display = "none";
let page = 1;
let pictTotal = 0;
let totalHits = 0;
const per_page = options.params.per_page;

const optionsScroll = {
    root: null,
    rootMargin: '300px',
    threshold: 1.0,
}
const callback = function (entries, observer) {
    if (entries[0].isIntersecting && totalHits > pictTotal ) {
        page += 1;
        options.params.page = page;
        observer.disconnect();
        refs.spinner.style.display = "inline-block";
        loadPictures()
            .then((pictures) => {
                pictTotal = pictTotal + pictures.data.hits.length;
                renderGallery(pictures);
                renderInfoline(pictures.data.totalHits, pictTotal, page);
                observer.observe(refs.galleryEl.lastElementChild);
            }).catch((error) => {
                console.log(error.response);
            }).finally(() => {
            refs.spinner.style.display = "none";
        });
    } else { 
          if (totalHits <= pictTotal) {
                        observer.disconnect();
                        if (totalHits > per_page) { 
                            refs.lmBtnEl.style.display = "flex";
                            iziToast.show({message:"We're sorry, but you've reached the last page of search results.",
                                position: 'topRight',
                                backgroundColor: 'red',
                                messageColor: 'white',
                            });
                             };
                        
                    }; };
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
    refs.currentPage.style.display = "none";
    refs.spinner.style.display = "inline-block";
  
    loadPictures()
        .then((pictures) => {
            if (pictures.data.hits.length > 0) {
                iziToast.show({ message: `Hooray! We found ${pictures.data.totalHits} images.`, 
                        position: 'topRight',
                        backgroundColor: 'blue',
                        messageColor: 'white',
                })
                refs.spinner.style.display = "none";
                totalHits = pictures.data.totalHits;
                renderGallery(pictures);
                pictTotal = pictTotal + pictures.data.hits.length;
                renderInfoline(pictures.data.totalHits, pictTotal, page);
                observer.observe(refs.galleryEl.lastElementChild);

            }
            else { iziToast.show({message:`Sorry, there are no images matching your search query: "${options.params.q}". Please try again!`,
                position: 'topRight',
                backgroundColor: 'red',
                messageColor: 'white',
            }) };
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setTimeout(() => { refs.srhFormEl.children[1].removeAttribute('disabled'); }, 3000);
            refs.spinner.style.display = "none";
        });
});

refs.lmBtnEl.addEventListener("click", () => {
    window.scroll(0,0);
});