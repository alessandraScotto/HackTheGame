//localStorage.clear();
const BASE_URL = "https://api.rawg.io/api/games";
const API_KEY = "9dab235700f447f481d7946246e3c151";
const QUERIES = "&page_size=30&dates=2023-01-01,2023-03-15&platforms=18,1,7";
fetch(`${BASE_URL}?key=${API_KEY}${QUERIES}`)
    .then(response => response.json())
    .then(data => {
        //criamo una costante dataClone, clone dell'oggetto estrapolato
        const dataClone = structuredClone(data)


        // rendiamo fruibile al nostro js l'oggetto dataClone rinominandolo games e rendendolo un'array di oggetti
        // ogni oggetto dell'array farà riferimento ad un gioco
        const games = dataClone.results
        console.log(games)
        const game = JSON.parse(localStorage.gamePage)
        console.log(game)

        const filterMetaCritics = games.filter(game => game.metacritic !== null).sort((a, b) => b.metacritic - a.metacritic)

        function getGameDetail(data, name) {

            return data.find(game => {
                return game.name == name
            })

        }

        const responseGame = getGameDetail(games, game)
        const iconsPlatformsGame = document.querySelector('#iconsPlatformsGame');
        const playtime = document.querySelector('#playtime');
        const name = document.querySelector('#name');


        /*DA RIGA 37 A RIGA 43 OPZIONE PER AVERE TRE IMMAGINI STATICHE */
        /* ATTENZIONE PER POTERLA USARE BISOGNA AVERE NEL HTML DI GAMES LE TRE CLASSI DI IMG CON NOME game-image DA RIGA 81 A RIGA 87 */
        /* const shortScreenshots = responseGame.short_screenshots.slice(1,4);
        const gameImages = document.querySelectorAll('.game-image');
            
        shortScreenshots.forEach((screenshot, i) => {
        gameImages[i].src = screenshot.image;
        }); */


        /* INIZIO CARICAMENTO CASUALE DI IMMAGINI */

        /* ATTENZIONE PER POTERLE USARE BISONA AVERE NEL HTML DI GAMES LE TRE CLASSI DI IMG CON NOMI  
        gameImage, gameImage1 E gameImage2 DA RIGA 81 A RIGA 87*/

        // mappo un array con gli screnshots presenti in games TRANNE PER IL PRIMO ELEMENTO CHE CORRISPONDE AL BACKGROUND DELLA PAGINA .slice(1)
        const images = responseGame.short_screenshots.slice(1).map(el => { return el.image })
        // verifico che images sia definita 
        console.log(images);

        // Definisco la funzione che appende tre immagini casuali
        function appendThreeImages() {
            // Ottengo l'elemento HTML dove appendere la prima immagine usando il selettore di classe '.gameImage'
            const gameImage = document.querySelector('.gameImage');
            // Ottengo l'elemento HTML dove appendere la seconda immagine usando il selettore di classe '.gameImage1'
            const gameImage1 = document.querySelector('.gameImage1');
            // Ottengo l'elemento HTML dove appendere la terza immagine usando il selettore di classe '.gameImage2'
            const gameImage2 = document.querySelector('.gameImage2');

            // Ottengo tre indici casuali dell'array di immagini usando la funzione getRandomIndexes
            const randomIndexes = getRandomIndexes(images.length);

            // Imposto la sorgente dell'immagine dell'elemento HTML 'gameImage' con l'immagine corrispondente all'indice casuale 0 dell'array 'images'
            gameImage.src = images[randomIndexes[0]];
            // Imposto la sorgente dell'immagine dell'elemento HTML 'gameImage1' con l'immagine corrispondente all'indice casuale 1 dell'array 'images'
            gameImage1.src = images[randomIndexes[1]];
            // Imposto la sorgente dell'immagine dell'elemento HTML 'gameImage2' con l'immagine corrispondente all'indice casuale 2 dell'array 'images'
            gameImage2.src = images[randomIndexes[2]];
        }

        // Definisco la funzione che genera tre indici casuali dell'array di immagini
        function getRandomIndexes(max) {
            const indexes = [];
            for (let i = 0; i < images.length; i++) {
                let index = Math.floor(Math.random() * max);
                if (!indexes.includes(index)) {
                    indexes.push(index);
                }
            }
            return indexes;
        }

        /* invoco la funzione  sulla map di immagini che ad essere pignoli 
        non appende ma imposta il source di ogni singola IMMAGINE*/
        appendThreeImages(images)

        /* FINE CARICAMENTO IMMAGINI CASUALI */



        /* INIZIO CAMBIO IMMAGINI AL HOVER */

        // Aggiungo l'event listener 'mouseenter' a ciascun elemento HTML che contiene le immagini
        const gameImage = document.querySelector('.gameImage');
        const gameImage1 = document.querySelector('.gameImage1');
        const gameImage2 = document.querySelector('.gameImage2');

        gameImage.addEventListener('mouseenter', handleImageHover);
        gameImage1.addEventListener('mouseenter', handleImageHover);
        gameImage2.addEventListener('mouseenter', handleImageHover);

        // Definisco la funzione che gestisce l'evento hover sulle immagini
        function handleImageHover() {
            setTimeout(() => {
                const randomIndexes = getRandomIndexes(images.length);
                // Imposto la sorgente dell'immagine dell'elemento HTML 'gameImage' con l'immagine corrispondente all'indice casuale 0 dell'array 'images'
                gameImage.src = images[randomIndexes[0]];
                // Imposto la sorgente dell'immagine dell'elemento HTML 'gameImage1' con l'immagine corrispondente all'indice casuale 1 dell'array 'images'
                gameImage1.src = images[randomIndexes[1]];
                // Imposto la sorgente dell'immagine dell'elemento HTML 'gameImage2' con l'immagine corrispondente all'indice casuale 2 dell'array 'images'
                gameImage2.src = images[randomIndexes[2]];
            }, 650);
        }
        /* FINE CAMBIO IMMGINI AL HOVER */

        const plotReviews = document.querySelector('#plotReviews');
        const platforms = document.querySelector('#platforms');
        const genres = document.querySelector('#genres');
        console.log(genres)
        const ecommerceWrapper = document.querySelector('.ecommerceWrapper')


        document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.551),rgba(0, 0, 0, 0.650)), url(${responseGame.background_image})`;
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";


        responseGame.parent_platforms.forEach(parentPlatform => {
            if (parentPlatform.platform.name == 'PC') {
                let div = document.createElement('div')
                div.classList.add('fs-4', 'text-white')
                div.innerHTML = `<i class="bi bi-windows fs-5 me-md-3 m-0"></i>`
                iconsPlatformsGame.append(div)
            }
            if (parentPlatform.platform.name == 'PlayStation') {
                let div = document.createElement('div')
                div.classList.add('fs-4', 'text-white')
                div.innerHTML = `<i class="bi bi-playstation fs-5 me-md-3 m-0"></i>`
                iconsPlatformsGame.append(div)
            }
            if (parentPlatform.platform.name == 'Xbox') {
                let div = document.createElement('div')
                div.classList.add('fs-4', 'text-white')
                div.innerHTML = `<i class="bi bi-xbox fs-5 me-md-3 m-0"></i> `
                iconsPlatformsGame.append(div)
            }
            if (parentPlatform.platform.name == 'Nintendo') {
                let div = document.createElement('div')
                div.classList.add('fs-4', 'text-white')
                div.innerHTML = ` <i class="bi bi-nintendo-switch fs-5 me-md-3 m-0"></i>`
                iconsPlatformsGame.append(div)
            }
            if (parentPlatform.platform.name == 'Linux') {
                let div = document.createElement('div')
                div.classList.add('fs-4', 'text-white')
                div.innerHTML = `<i class="bi bi-ubuntu fs-3"></i>`
                iconsPlatformsGame.append(div)
            }
        });


        playtime.textContent = responseGame.playtime
        name.textContent = responseGame.name

        responseGame.ratings.forEach(rating => {
            let div = document.createElement('div')
            div.classList.add("progress", "bg-transparent", "rounded-0", "my-2","d-flex", "justify-content-between")
            div.innerHTML = `
                <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${rating.percent}%">
                </div>
                <p class="f-s text-secondary ms-3 text-white"> ${rating.title} - ${rating.percent} %</p>
                `
            plotReviews.append(div)

        })

        responseGame.platforms.forEach(platform => {
            let li = document.createElement('li')
            li.classList.add("text-white", "small", "mx-0", "me-md-3", "me-0", "mb-2", "mb-md-0")
            li.innerText = platform.platform.name
            platforms.append(li)
        })

        responseGame.genres.forEach(genre => {
            let li = document.createElement('li')
            li.classList.add("text-white", "small", "mx-0", "me-2")
            li.innerText = genre.name

            genres.append(li)
        })


        responseGame.stores.map(el => { return el.store.name }).forEach(store => {
            let li = document.createElement('li')
            li.classList.add("me-md-4", "mb-2", "mb-md-0", "me-0", "d-flex", "justify-content-center")
            li.innerHTML = `
            <button class="btn btn-outline-light">
                ${store}
            </button>
            `
            ecommerceWrapper.append(li)
        });


        const related = []
        //filtro games togliendo gioco visualizzato in pagina eppoi ciclo
        games.filter(game => game.name != responseGame.name).forEach(g => {
            //ottengo array con nomi slug dei generi del gioco e lo ciclo
            let i = 0
            g.genres.map(gg => { return gg.slug }).forEach(gn => {
                //ottengo array con nomi dei generi del gioco visualizzato in pagina e controllo se ci sono corrispondenze con il gioco ciclato
                // aggiungo all'oggetto del gioco una nuova chiave con il valore dei generi in comune con il gioco della pagina aggiungo il gioco
                //all'array dei giochi che potrebbero uscire come consigliati
                if (responseGame.genres.map(gen => { return gen.slug }).includes(gn)) { i++; g.related = i; if (!related.includes(g)) related.push(g) }

            })

        })
        function rel(related) {
            const div = document.getElementById("related")
            related.sort((a, b) => (b.related - a.related))
            related.slice(0, 4).forEach(
                (rel) => {
                    let img = document.createElement("img")
                    img.setAttribute("src", rel.background_image)
                    img.setAttribute("width", "180px")
                    img.classList.add("me-md-5")
                    div.append(img)
                }
            )
        }
        rel(related)



    })

const contributors = [
    { Nome: "Luca", Cognome: "Giordano", Nick: "Alcatr4z", psw: "", review: 4, games: [] },
    { Nome: "Randy", Cognome: "Silvera", Nick: "Dale Manya", psw: "", review: 8, games: [] },
    { Nome: "Antonio", Cognome: "Fallacara", Nick: "Peppe", psw: "", review: 4, games: [] },
    { Nome: "Alessia", Cognome: "Regno", Nick: "Ale", psw: "", review: 2, games: [] },
    { Nome: "Nazir", Cognome: "Abishov", Nick: "Sir Zir'", psw: "", review: 12, games: [] },
    { Nome: "Emanule", Cognome: "Coco", Nick: "Coco_Ema", psw: "", review: 3, games: [] },
    { Nome: "Nicola", Cognome: "Gasparro", Nick: "Nico", psw: "", review: 13, games: [] },
    { Nome: "Patrik", Cognome: "Ngom", Nick: "Pa", psw: "", review: 3, games: [] },
    { Nome: "Nicholas", Cognome: "Berardicurti", Nick: "Nicholas", psw: "", review: 15, games: [] },
    { Nome: "Francesco", Cognome: "Vernice", Nick: "CiccioVE", psw: "", review: 7, games: [] },
    { Nome: "Alessandra", Cognome: "Scotto", Nick: "Alex", psw: "", review: 7, games: [] },
]

contributors.map(c => c.review = Math.floor(Math.random() * 10))
const ulContributors = document.getElementById('contributors')
ulContributors.innerHTML = ""
contributors.sort((a, b) => b.review - a.review).slice(0, 3).forEach((c, i) => {
    let li = document.createElement('li')
    li.classList.add("w-100", "d-flex", "justify-content-between", "border-bottom", "border-1", "border-secondary", "py-3")
    li.innerHTML =
        ` 
            <div>
                <p class="m-0 f-p text-white">${c.Nick}</p>
                <p class="m-0 small text-secondary f-p">${c.review}</p>
            </div>
            
            <div class="align-items-center d-flex"> 
                <button class="btn btn-outline-secondary small f-p rounded-0 mx-2 ">+ Follow</button>
                <i class="bi bi-person-circle fs-3 text-white mx-2"></i>
            </div>
            `
    ulContributors.append(li)

})




