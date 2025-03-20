const apiKey = "81mkQAWSdmmNVQsQAEy8nDqPQaBQLA3SU2oqm9fcOrE";
const count = 15;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let images = [];
let loaded = false;

const loader = document.querySelector("#loader");
const imageContainer = document.querySelector("#imageContainer");

AOS.init();
async function getPhotos(){
    loaded = false;
    loader.style.display = "block";
    try {
        const response = await fetch(apiUrl);
        images = await response.json();
        console.log(images);
        displayImages(images);
    }catch(error) {
        console.log(error.message);
    }
}


function displayImages(images){
    const fregment = document.createDocumentFragment();
    images.forEach((obj, index) => {
        const anchor = document.createElement("a");
        const image = document.createElement("img");

        anchor.href = obj.links.html;
        image.src = obj.urls.regular;
        image.alt = obj.urls.regular;
        image.title = obj.alt_description;

        if(index % 2 == 0){
            anchor.setAttribute("data-aos", "fade-right");
            anchor.setAttribute("data-aos-offset", "100");
            anchor.setAttribute("data-aos-easing", "ease-in-sine");
        }else{
            anchor.setAttribute("data-aos", "fade-left");
            anchor.setAttribute("data-aos-offset", "100");
            anchor.setAttribute("data-aos-easing", "ease-in-sine");
        }

        image.classList.add("image");

        anchor.append(image);
        fregment.append(anchor);
    });
    imageContainer.append(fregment);
    loader.style.display = "none";
    loaded = true;
    // AOS.refresh();
}

window.addEventListener("scroll", () => {
    Math.ceil(window.scrollY) + window.innerHeight >= document.body.offsetHeight && loaded ? getPhotos() : "";
})

getPhotos();