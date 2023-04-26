// inizio setTimeout con il quale simuleramo un caricamento minimo di 2 secondi
setTimeout(() => {
  // richiamiamo l'api estrapolandone i dati
  const BASE_URL = "https://api.rawg.io/api/games";
  const API_KEY = "9dab235700f447f481d7946246e3c151";
  const QUERIES = "&page_size=21&dates=2023-01-01,2023-03-15&platforms=18,1,7";
  fetch(`${BASE_URL}?key=${API_KEY}${QUERIES}`)
    .then(response => response.json())
    .then(data => {
      //criamo una costante dataClone, clone dell'oggetto estrapolato
      const dataClone = structuredClone(data)


      // rendiamo fruibile al nostro js l'oggetto dataClone rinominandolo games e rendendolo un'array di oggetti
      // ogni oggetto dell'array farà riferimento ad un gioco
      const games = dataClone.results
      //creiamo un clone di games che ci tornerà molto utile nell'utilizzo dei filtri
      const gamesNoSort = structuredClone(games)
      //////////////// INZIO MANIPOLAZIONE DOM ///////////////////////////

      //selezioniamo il campo di immissione dati #searchGame
      const searchGame = document.getElementById('searchGame');
      //diamogli l'attributo placeholder valorizzato con il nr di giochi presenti in catalogo
      searchGame.setAttribute("placeholder", `Cerca tra ${dataClone.results.length} giochi...` )
      searchGame.addEventListener('input', (e)=>{
        showGames(sortingByName(gamesNoSort, e.key, searchGame.value))
        //console.log(e)
      })
      
      
      /// #load
      // inizializziamo e valorizzioma la constante load che fa rifermento al div #load che contiene l'icona di caricamento
      const load = document.getElementById('load');
      // diamo al div #load una classe che lo renda invisibile dopo 2 sec
      load.classList.add("d-none");
      //// #showGames
      // selezioniamo il punto del dom dove voler esporre tutte le card 
      const gamesWrapper = document.getElementById('gamesWrapper');
      //funzione che creerà tutte le card e le appenderà dentro #gamesWrapper
      // creerà anche un array di array che ci tornerà utile per la sidebar
      const sidebar = showGames(games, true, gamesNoSort)

      function showGames(games, sidebar, gamesNoSort) {
        //inizializziamo tre array che ci torneranno utili per la sidebar
        //infatti sfrutteremo il ciclo per creare le card anche per popolare la sidebar
        //trovando tutti le ricorrenze contenute per platforms, genres e stores
        const platformsName = []
        const genresName = []
        const storesName = []
        // partiamo da #gamesWrapper vuoto
        gamesWrapper.innerHTML = "";
        //iniziamo a ciclare l'oggetto madre
        games.forEach(game => {
          // ad ogni giro creare un elememto html sul dom 
          // l'elemento da creare sará una colonna 
          let div = document.createElement('div')
          div.classList.add('col-12', 'col-md-4', 'mb-3', 'p-0', 'd-flex', 'justify-content-center')
          // all'interno della colonna ignettare la card 
          div.innerHTML = `
            <div class="cardJS card card-game" style="width: 20rem;">
              <img src="${game.background_image}" class="card-img-top cardImg" alt="img-game">
              <span class="card-body d-flex flex-column justify-content-between">
              <div>
              ${game.parent_platforms.map(el => {
            //qui sfrutto questo ciclo map per creare sia 
            //le icone delle piattaforme che supportano il gioco sia
            // l'array con tutti i nomi delle piattaforme presenti nell'oggetto madre
            if (!platformsName.includes(el.platform.slug) && (sidebar == true)) {
              // se platforms non include il nome della piattaforma che sta ciclando
              // e se il parametro sidebar è true
              //aggiungi il nome in formato slug nell'array
              platformsName.push(el.platform.slug)
            }//fine if
            return `<img class="me-1" src="./downloads/${el.platform.slug}.png" width="20" alt="">`
          }).join("")//fine map
            }<!--fine interpolazione-->
                
                <h5 class="card-title f-p mt-3">${game.name.substr(0, 50)}</h5>
                <span class="btn-score">+${game.reviews_count}</span>
                
                <span class="dropdown">
                  <button class="btn-feedback" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots text-white"></i>
                  </button>
                  <div class="dropdown-menu p-3">
                    <div class="row">
                      <div class="col-6 border border-1 d-flex flex-column justify-content-center align-items-center  ">
                        🎯
                        <p class="f-p small m-0">Exceptional</p> 
                      </div>
                      <div class="col-6 border border-1 d-flex flex-column justify-content-center align-items-center">
                        👍🏻
                        <p class="f-p small m-0">Recommended</p>
                      </div>
                      <div class="col-6 border border-1 d-flex flex-column justify-content-center align-items-center">
                        😑
                        <p class="f-p small m-0">Meh</p>
                      </div>
                      <div class="col-6 border border-1 d-flex flex-column justify-content-center align-items-center">
                        ⛔️
                        <p class="small m-0 f-p">Skip</p>
                      </div>
                    </div>
                  </div>
                </span><!--fine span drop-down-->

                <div class="d-flex justify-content-between border-infos mb-3 mt-3">
                <p class="f-p">Release date:</p>
                <p class="f-p small text-secondary">${new Intl.DateTimeFormat('en-EN', {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(game.released))}</p>
                </div><!--FINE DIV DATA-->

                <div class="d-flex justify-content-between border-infos mb-3">
                    <p class="f-p">Genres:</p>
                    <a class="f-p text-secondary" href="#">
                    <!--mappiamo l'array game.genres per farci ritornare in nomi dei generi-->
                     ${game.genres.map(genere => {
              //creaiamoci l'array con tutti i nomi dei generi
              if ((!genresName.includes(genere.name)) && (sidebar == true)) {
                genresName.push(genere.name)
              }
              return genere.name
              // solo due nomi
            }).slice(0, 1)}</a><!--fine map -->
                </div>
                  
                <div class="d-flex justify-content-between border-infos mb-3">
                  <p class="f-p me-1">Metacritic:</p>
                  <p class="f-p small text-secondary">${game.metacritic ? game.metacritic : "no score available"}</p>
                </div>
                </div> <!--DA CANCELLARE-->
                <div>
                <a id="${game.slug}" href="./game.html" target="_blank" class="btn-detail text-decoration-none d-flex justify-content-between f-p">
                Show more detail
                <i class="bi bi-arrow-right"></i>
                </a>    
                </div>
                        
            </span><!--fine span card body-->
            </div> <!--fine div-->
            `//fine interpolazione div card
          // appendere tutto nel punto localizzato in precedenza 
          gamesWrapper.append(div)
          // selezioniamo i bottoni che apriranno le schede prodotto
          const button = document.getElementById(game.slug)
          //al click i bottoni creeranno una variabile nel localStorage che ci aiuterà a creare la pagina per prodotto di riferimento 
          button.addEventListener('click', () => localStorage.setItem("gamePage", JSON.stringify(game.name)))
          console.log(localStorage.gamePage)

          //mappiamo gli store
          game.stores.map(store => {
            //creaiamoci l'array con tutti i nomi degli store
            if ((!storesName.includes(store.store.name)) && (sidebar == true)) {
              storesName.push(store.store.name)
            }

          })//fine map
        })//fine forEach
        //ritorniamo gli array che useremo per popolare la sidebar
        return [platformsName, genresName, storesName]
      }
      ///// SIDEBAR
      //// filtri platform, generes, stores
      const sortingByPlatform = (games, platform) => {
        return games.filter(game => game.parent_platforms.map(el => el.platform.slug).includes(platform))
      }
      const sortingByGeneres = (games, genre) => {
        return games.filter(game => game.genres.map(el => el.name).includes(genre))
      }
      const sortingByStores = (games, stor) => {
        return games.filter(game => game.stores.map(el => el.store.name).includes(stor))
      }
      sideBar(sidebar[0], "platforms", "img", sortingByPlatform)
      sideBar(sidebar[1], "genres", "p", sortingByGeneres)
      sideBar(sidebar[2], "stores", "p", sortingByStores)
      ///funzione che popolerà la sidebar e darà eventi ai bottoni per i filtri
      function sideBar(array, id, tag, sortingBy) {
        let div = document.getElementById(id)
        for (i = array.length - 1; i >= 0; i--) {
          let el = document.createElement(tag)
          tag == "img" ? el.setAttribute('src', 'downloads/' + array[i] + '.png') : el.innerHTML = array[i]
          el.setAttribute('id', array[i])
          if (tag == "img") el.setAttribute('alt', array[i])
          if (tag == "img") el.setAttribute('width', 25)
          div.append(el)

          filterGames(false, sortingBy(gamesNoSort, array[i]), array[i])
        }
      }
      //////////////// FINE MANIPOLAZIONE DOM ///////////////////////////
      ///////////////////  altri FILTRI sidebar 

      const sortingByNewest = (data) => {
        return data.sort((a, b) => new Date(b.released) - new Date(a.released))
      }
      const sortingByOldest = (data) => {
        return data.sort((a, b) => new Date(a.released) - new Date(b.released))
      }
      const sortingByRating = (data) => {
        return data.filter(game => game.metacritic !== null).sort((a, b) => b.metacritic - a.metacritic)
      }
      const sortingByName = (data, e, searchGame)=>{
        //const newData = data.map(game=>game.slug.split(""))
        //console.log(newData)
        return data.filter(game =>
          //game.slug.split("")
          {//console.log(game.slug[0]+" "+searchGame) 
          return searchGame == game.slug.slice(0, searchGame.length)}
        
          
        )
      }

      function filterGames(sortingBy, games, idButton) {
        let button = document.getElementById(idButton)
        button.addEventListener('click', () => {
          load.classList.remove('d-none')
          gamesWrapper.classList.add('d-none')
          setTimeout(() => {
            load.classList.add("d-none");
            sortingBy ? showGames(sortingBy(games)) : showGames(games)
            gamesWrapper.classList.remove('d-none')
          }, 1500);
        })
      }
      filterGames(sortingByNewest, games, "clickByNew")
      filterGames(sortingByOldest, games, "clickByOld")
      filterGames(false, gamesNoSort, "clickAll")
      filterGames(sortingByRating, games, "clickByRating")



    })// fine fetch.then
}, 2000)// fine setTimeout 