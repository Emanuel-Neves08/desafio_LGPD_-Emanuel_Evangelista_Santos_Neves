let carouselArr = [];


class Carousel {
    static Start(arr) {
        if (arr) {
            if (arr.length > 0) {
                Carousel._sequence = 0;
                Carousel._size = arr.length;
                Carousel.ShowCurrent();
                Carousel._interval = setInterval(function () { Carousel.Next(); }, 6000); // 6 segundos por imagem


                Carousel.InitializeControls();
            }

        } else {
            throw "Method Start need a Array Variable.";
        }
    }

    static InitializeControls() {
        const prevButton = document.getElementById("carousel-prev");
        const nextButton = document.getElementById("carousel-next");

        if (prevButton) {
            prevButton.addEventListener("click", function () {
                Carousel.Previous();
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", function () {
                Carousel.Next();
            });
        }
    }

    static Previous() {
        // Para o carrossel temporariamente
        clearInterval(Carousel._interval);

        // Volta para o item anterior
        Carousel._sequence = (Carousel._sequence - 1 + Carousel._size) % Carousel._size;
        Carousel.ShowCurrent();

        // Reinicia o carrossel 8 segundos
        setTimeout(() => {
            Carousel._interval = setInterval(function () { Carousel.Next(); }, 6000);
        }, 8000);
    }

    static Next() {
        Carousel._sequence = (Carousel._sequence + 1) % Carousel._size;
        Carousel.ShowCurrent();
    }

    static ShowCurrent() {
        // Captura o elemento 
        const carouselElement = document.getElementById("carousel");
        const titleElement = document.getElementById("carousel-title");


        if (carouselElement && titleElement) {
            const currentItem = carouselArr[Carousel._sequence];


            carouselElement.innerHTML = `
                <a href="${currentItem.url}">
                    <img src="img/${currentItem.image}" alt="${currentItem.title}" style="width: 100%;">
                </a>
            `;


            titleElement.innerHTML = `
                <a href="${currentItem.url}">
                    <p>${currentItem.title}</p>
                </a>
            `;
        }
    }

    constructor(image, title, url) {
        this.image = image;
        this.title = title;
        this.url = url;
    }
};