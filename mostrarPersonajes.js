document.addEventListener("DOMContentLoaded", () => {
    const rutaIconoCerrar = "./assets/icons/x-lg.svg"; // Ubicación del icono de cerrar
    const carpetaPersonajes = "./assets/images/personajes/"; // Ubicación de las imágenes de los personajes
    const rutaPersonajesJSON = "./assets/json/personajes.json"; // Ubicación del JSON

    const main = document.querySelector("main"); // El elemento main, contenedor de los principales datos
    const thisSeason = document.URL.split("/").at(-1).split(".").at(0).at(-1); // La temporada actual
    let personajes = []; // Inicializamos los personajes
    let videoActual; // Inicializamos el video que se superpone al resto de elementos

    // Creamos las plantillas de los elementos html por medio de funciones
    const cardPlantilla = crearPlantillaCard();
    const iframePlantilla = crearPlantillaIframe();
    const divIframePlantilla = crearPlantillaDivIframe();
    const botonCerrarPlantilla = crearPlantillaBotonCerrar();
    const eliminadoPlantilla = crearPlantillaEliminado();
    let botonVerSoloMuertosElem = crearBotonVerMuertos();
    const botonVerVideoPlantilla=crearPlantillaBotonVerVideo();


    async function cargarDatos() {
        try {
            const response = await fetch(rutaPersonajesJSON);
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
            }
            personajes = await response.json();
            renderizarPersonajes(personajes);
        } catch (error) {
            console.error("Error al cargar datos:", error);
            alert(`Algo ha fallado al cargar los datos: ${error.message}`);
        }
    }

    function crearBotonVerMuertos(){
        // Texto que acompaña e informa sobre la funcionalidad del botón
        const tituloBotonMuertos = document.createElement("p");
        tituloBotonMuertos.textContent = "Ver solo personajes que mueren esta temporada: ";
        tituloBotonMuertos.style.gridColumn = "1/4";
        tituloBotonMuertos.style.alignSelf = "center";
        tituloBotonMuertos.style.marginTop = "15px";
        tituloBotonMuertos.style.justifySelf = "right";
        tituloBotonMuertos.style.position = "relative";
        tituloBotonMuertos.style.left = "40%";
        tituloBotonMuertos.style.width = "160%";
        tituloBotonMuertos.id = "tituloBotonMuertos";

        // Switch que al activarse se muestran solo los personajes que mueren esta temporada
        const labelVerSoloMuertos = document.createElement("label");
        labelVerSoloMuertos.classList.add("switch");
        labelVerSoloMuertos.style.gridColumn = "4/5";
        labelVerSoloMuertos.style.justifySelf = "right";
        labelVerSoloMuertos.style.marginBlock = "25px";

        const botonVerSoloMuertos = document.createElement("input");
        botonVerSoloMuertos.setAttribute("type", "checkbox");
        botonVerSoloMuertos.id = "verSoloMuertos";

        const span = document.createElement("span");
        span.classList.add("slider", "round");
        labelVerSoloMuertos.append(botonVerSoloMuertos, span);
        main.append(tituloBotonMuertos, labelVerSoloMuertos);
    }
    function crearPlantillaCard() {
        const cardPlantila=document.createElement("div");
        cardPlantila.classList.add("card");
        const imgPlantilla=document.createElement("img");
        imgPlantilla.classList.add("card-img-top");
        imgPlantilla.alt = "";
        const cardBodyPlantilla=document.createElement("div");
        cardBodyPlantilla.classList.add("card-body");
        const h4Plantilla=document.createElement("h4");
        h4Plantilla.classList.add("card-title");
        h4Plantilla.style.textAlign="center";

        cardBodyPlantilla.appendChild(h4Plantilla);
        cardPlantila.appendChild(imgPlantilla);
        cardPlantila.appendChild(cardBodyPlantilla);

        return cardPlantila;
    }
    function crearPlantillaIframe() {
        const iframePlantilla = document.createElement("iframe");
        iframePlantilla.style.width="100%";
        iframePlantilla.style.height="90%";
        iframePlantilla.style.position="static";
        iframePlantilla.style.left="0px";
        iframePlantilla.style.top="50px";
        iframePlantilla.style.borderRadius="40px";
        iframePlantilla.style.marginTop="20px";
        return iframePlantilla;
    }
    function crearPlantillaDivIframe() {
        const divIframePlantilla = document.createElement("div");
        divIframePlantilla.style.position="fixed";
        divIframePlantilla.style.top="12.5vh";
        divIframePlantilla.style.left="12.5vw";
        divIframePlantilla.style.zIndex="25";
        divIframePlantilla.setAttribute("overflow", "hidden");
        divIframePlantilla.style.width="75vw";
        divIframePlantilla.style.height="75vh";
        divIframePlantilla.style.backgroundColor="black";
        divIframePlantilla.style.borderRadius="40px";
        return divIframePlantilla;
    }
    function crearPlantillaBotonCerrar() {
        const botonCerrarPlantilla = document.createElement("button");
        botonCerrarPlantilla.classList.add("btn", "btn-danger");
        botonCerrarPlantilla.style.height = "50px";
        botonCerrarPlantilla.style.width = "100px";
        botonCerrarPlantilla.style.position = "sticky";
        botonCerrarPlantilla.style.left = "100%";
        // Icono del boton cerrar
        const iconoCerrarPlantilla = document.createElement("img");
        iconoCerrarPlantilla.style.height = "35px";
        iconoCerrarPlantilla.setAttribute("src", rutaIconoCerrar);
        botonCerrarPlantilla.append(iconoCerrarPlantilla);
        return botonCerrarPlantilla;
    }
    function crearPlantillaEliminado() {
        const eliminadoPlantilla = document.createElement("div");
        eliminadoPlantilla.classList.add("muerto");
        return eliminadoPlantilla;
    }
    function crearPlantillaBotonVerVideo(){
        const botonVerVideoPlantilla= document.createElement("a");
        botonVerVideoPlantilla.classList.add("btn");
        botonVerVideoPlantilla.classList.add("btn-primary");
        botonVerVideoPlantilla.classList.add("botonVerVideo");
        botonVerVideoPlantilla.style.position="relative";
        botonVerVideoPlantilla.style.zIndex="5";
        return botonVerVideoPlantilla;
    }


    // Una vez recogidos los datos, creamos la carta con el personaje que se le mande
    function crearCard(personaje) {

        const card = cardPlantilla.cloneNode(true);
        const imagen = card.querySelector('.card-img-top');
        imagen.src = carpetaPersonajes + personaje.image;
        imagen.alt = `Retrato de ${personaje.name}`;
        const nombre = card.querySelector('.card-title');
        nombre.textContent = personaje.name;

        if (personaje.deadSeason == thisSeason) {
            card.appendChild(eliminadoPlantilla.cloneNode());
            const botonMuerte = botonVerVideoPlantilla.cloneNode();
            botonMuerte.setAttribute("muerte", personaje.muerte);
            botonMuerte.textContent = "Ver muerte";
            let cardBody=card.querySelector(".card-body");
            cardBody.append(botonMuerte);
        }

        return card;
    }

    // Con esos datos creamos una card para cada personaje cuando se solicite la randerización de los mismos
    function renderizarPersonajes(personajes) {
        const fragmento = document.createDocumentFragment();
        personajes.forEach(personaje => {
            if (thisSeason <= personaje.deadSeason || personaje.deadSeason === "") {
                const card = crearCard(personaje);
                fragmento.appendChild(card);
            }
        });
        main.appendChild(fragmento);

        // Delegación de eventos para los botones de "Ver muerte"
        main.addEventListener('click', (event) => {
            if (event.target.classList.contains('botonVerVideo')) {
                mostrarVideo(event.target.getAttribute('muerte'));
            }
        });

        botonVerSoloMuertosElem = document.getElementById("verSoloMuertos");
        botonVerSoloMuertosElem.addEventListener("change", filtrarPersonajes);
    }

    // Una vez se solicite la visualización de un personaje, pasará por esta función para asignarle el valor al iframe
    function mostrarVideo(videoURL) {
        if (videoActual) {
            videoActual.remove();
        }

        const iframe = iframePlantilla.cloneNode(true);
        iframe.src = videoURL;

        const divIframe = divIframePlantilla.cloneNode(true);
        divIframe.classList.add("videoActual");

        const botonCerrar = botonCerrarPlantilla.cloneNode(true);
        botonCerrar.id = "botonCerrar";

        divIframe.append(botonCerrar, iframe);
        main.append(divIframe);

        videoActual = document.querySelector(".videoActual");
        botonCerrar.addEventListener("click", () => {
            videoActual.remove();
        });
    }

    // Para mostrar solo los muertos
    function filtrarPersonajes(e) {
        const cards = main.querySelectorAll('.card');
        cards.forEach(card => {
            const estaMuerto = card.querySelector('.muerto');
            if (e.target.checked && !estaMuerto) {
                card.style.display = 'none';
            } else {
                card.style.display = '';
            }
        });
    }

    cargarDatos();
});