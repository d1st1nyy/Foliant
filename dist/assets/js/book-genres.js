/* assets/js/book-genres.js */

document.addEventListener("DOMContentLoaded", () => {
    const genres = [
        { title: "Книги для образования", image: "./assets/images/edu.webp" },
        { title: "Книги по менеджменту", image: "./assets/images/management.webp" },
        { title: "Книги по инженерии", image: "./assets/images/engineering.webp" },
        { title: "Фантастика", image: "./assets/images/fantasy.webp" },
        { title: "Детективы", image: "./assets/images/detective.webp" },
        { title: "Романы", image: "./assets/images/romance.webp" },
        { title: "Биография", image: "./assets/images/bio.webp" },
        { title: "Психология", image: "./assets/images/psycho.webp" },
    ];

    const contentEl = document.querySelector(".book-genres__content");
    const leftBtn = document.querySelector(".book-genres__arrow--left");
    const rightBtn = document.querySelector(".book-genres__arrow--right");
    const SWIPE_THRESHOLD = 50; 
    let touchstartX = 0;
    let touchendX = 0;

    function renderCards() {
        contentEl.innerHTML = "";
        genres.forEach(genre => {
            const card = document.createElement("div");
            card.className = "genre-card";
            card.innerHTML = `
                <img class="genre-card__image" src="${genre.image}" alt="${genre.title}" />
                <p class="genre-card__title">${genre.title}</p>
            `;
            contentEl.appendChild(card);
        });
    }
    function getScrollStep() {
        const firstCard = contentEl.querySelector(".genre-card");
        if (!firstCard) return 330; 
        const cardWidth = firstCard.offsetWidth;
        const style = window.getComputedStyle(contentEl);
        const gap = parseInt(style.gap) || 30; 
        return cardWidth + gap;
    }
    leftBtn.addEventListener("click", () => {
        contentEl.scrollLeft -= getScrollStep();
    });
    rightBtn.addEventListener("click", () => {
        contentEl.scrollLeft += getScrollStep();
    });
    contentEl.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    }, false);
    contentEl.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    }, false);
    function handleGesture() {
        const diff = touchstartX - touchendX;
        if (Math.abs(diff) < SWIPE_THRESHOLD) {
            return; 
        }
        const step = getScrollStep();
        if (diff > 0) {
            contentEl.scrollLeft += step;
        }       
        if (diff < 0) {
            contentEl.scrollLeft -= step;
        }
    }
    renderCards();
});