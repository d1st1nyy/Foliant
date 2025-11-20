document.addEventListener("DOMContentLoaded", () => {
    const books = [
        {
            title: "Пикник на обочине",
            author: "Аркадий и Борис Стругацкие",
            desc: "«Пикник на обочине» – одно из самых прославленных произведений братьев Стругацких, увлекательная история сталкеров – отчаянно смелых людей, ищущих артефакты в таинственной Зоне. Это глубокое размышление о смысле человеческого существования и моральном выборе.",
            genre: "Научная фантастика, Антиутопия",
            pereplet: "Твердый",
            count: 500,
            year: 1972,
            price: 440,
            image: "./assets/images/book1.webp"
        },
        {
            title: "1984",
            author: "Джордж Оруэлл",
            desc: "Мощная антиутопия о тоталитарном режиме, который контролирует каждый аспект жизни людей, стирая историю и лишая человека свободы. Роман, влияющий на мышление поколений о политике и личности.",
            genre: "Антиутопия, Социальная фантастика",
            pereplet: "Твердый",
            count: 379,
            year: 1949,
            price: 380,
            image: "./assets/images/book2.webp"
        },
        {
            title: "Мастер и Маргарита",
            author: "Михаил Булгаков",
            desc: "Одна из величайших книг XX века — о любви, свободе, добре и зле, переплетающихся в мистической истории Воланда и его свиты, посетивших Москву 30-х годов. Шедевр, полный юмора и трагедии.",
            genre: "Роман, Фантасмагория",
            pereplet: "Мягкий",
            count: 198,
            year: 1966,
            price: 520,
            image: "./assets/images/book3.webp"
        },
        {
            title: "Три товарища",
            author: "Эрих Мария Ремарк",
            desc: "Грустная и невероятно светлая книга о дружбе, любви и надежде в разрушенном войной мире. История трех друзей, пытающихся найти свое место в послевоенной Германии, полна лирики и гуманизма.",
            genre: "Роман, Драма",
            pereplet: "Мягкий",
            count: 435,
            year: 1936,
            price: 410,
            image: "./assets/images/book4.webp"
        }
    ];
    const urlParams = new URLSearchParams(window.location.search);
    const bookIndex = parseInt(urlParams.get('id'));
    const book = books[bookIndex];
    const container = document.querySelector(".book-details-container");
    const notFound = document.getElementById("not-found");
    
    if (book && !isNaN(bookIndex)) {
        document.getElementById('page-title').textContent = `${book.title} | Фолиант`;
        document.getElementById('detail-title').textContent = book.title;
        document.getElementById('detail-author').textContent = book.author;
        document.getElementById('detail-pereplet').textContent = book.pereplet;
        document.getElementById('detail-count').textContent = book.count;
        document.getElementById('detail-price').textContent = `${book.price} ₽`;
        document.getElementById('detail-img').src = book.image;
        document.getElementById('detail-desc').textContent = book.desc;
        document.getElementById('detail-year').textContent = book.year;
        document.getElementById('detail-genre').textContent = book.genre;
        document.querySelector('.old-price').textContent = `${book.price + 50} ₽`; 
    } 
});