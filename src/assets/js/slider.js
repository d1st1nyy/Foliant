document.addEventListener("DOMContentLoaded", () => {
    const books = [
        {
            title: "Пикник на обочине | Аркадий и Борис Стругацкие",
            author: "Аркадий и Борис Стругацкие",
            desc: "«Пикник на обочине» – одно из самых прославленных произведений братьев Стругацких, увлекательная история сталкеров – отчаянно смелых людей, ищущих артефакты в таинственной Зоне...",
            image: "./assets/images/book1.webp"
        },
        {
            title: "1984 | Джордж Оруэлл",
            author: "Джордж Оруэлл",
            desc: "Мощная антиутопия о тоталитарном режиме, который контролирует каждый аспект жизни людей. Роман, влияющий на мышление поколений...",
            image: "./assets/images/book2.webp"
        },
        {
            title: "Мастер и Маргарита | Михаил Булгаков",
            author: "Михаил Булгаков",
            desc: "Одна из величайших книг XX века — о любви, свободе, добре и зле, переплетающихся в мистической истории Воланда...",
            image: "./assets/images/book3.webp"
        },
        {
            title: "Три товарища | Эрих Мария Ремарк",
            author: "Эрих Мария Ремарк",
            desc: "Грустная и невероятно светлая книга о дружбе, любви и надежде в разрушенном войной мире...",
            image: "./assets/images/book4.webp"
        }
    ];
    const titleEl = document.querySelector(".slider__book-title");
    const descEl = document.querySelector(".slider__book-desc");
    const imgEl = document.querySelector(".slider__book-img");
    const dotsEl = document.querySelector(".slider__dots");
    const leftBtn = document.querySelector(".slider__arrow--left");
    const rightBtn = document.querySelector(".slider__arrow--right");
    const contentBlock = document.querySelector(".js-open-book-modal");
    let current = 0;
    let touchstartX = 0;
    let touchendX = 0;
    const swipeThreshold = 50;
    function showNext() {
        current = (current + 1) % books.length;
        renderSlider();
    }
    function showPrev() {
        current = (current - 1 + books.length) % books.length;
        renderSlider();
    }
    function getBookDetailsUrl(index) {
        return `./index4.html?id=${index}`;
    }
    function renderSlider() {
        const book = books[current];
        titleEl.textContent = book.title;
        descEl.textContent = book.desc;
        imgEl.src = book.image;
        imgEl.style.visibility = "visible";
        contentBlock.href = getBookDetailsUrl(current);
        dotsEl.innerHTML = "";
        books.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.className = "slider__dot" + (i === current ? " active" : "");
            dot.addEventListener("click", () => {
                current = i;
                renderSlider();
            });
            dotsEl.appendChild(dot);
        });
    }
    leftBtn.addEventListener("click", (e) => {
        e.preventDefault(); 
        showPrev();
    });
    rightBtn.addEventListener("click", (e) => {
        e.preventDefault(); 
        showNext();
    });
    contentBlock.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    }, false);
    contentBlock.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    }, false);
    function handleGesture() {
        const diff = touchstartX - touchendX;
        if (Math.abs(diff) < swipeThreshold) {
            return; 
        }
        if (diff > 0) {
            showNext();
        }
        if (diff < 0) {
            showPrev();
        }
    }
    renderSlider();
});