document.addEventListener("DOMContentLoaded", ()=>{

    let botonesMuerte;
    let videoActual;
    let botonVerSoloMuertosElem;

    // Ubicación de las imágenes de los personajes
    const carpetaPersonajes="/assets/images/personajes/";

    // Tarjeta para cada personaje
    const main= document.querySelector("main");
    const cardPlantila=document.createElement("div");
    cardPlantila.classList.add("card");
    const imgPlantilla=document.createElement("img");
    imgPlantilla.classList.add("card-img-top");
    const cardBodyPlantilla=document.createElement("div");
    cardBodyPlantilla.classList.add("card-body");
    const h4Plantilla=document.createElement("h4");
    h4Plantilla.classList.add("card-title");
    h4Plantilla.style.textAlign="center";

    // Eliminado
    const eliminadoPlantilla = document.createElement("div");
    eliminadoPlantilla.classList.add("muerto");
    
        // Boton del eliminado
        const botonMuertePlantilla= document.createElement("a");
        botonMuertePlantilla.classList.add("btn");
        botonMuertePlantilla.classList.add("btn-primary");
        botonMuertePlantilla.classList.add("botonMuerte");
        botonMuertePlantilla.style.position="relative";
        botonMuertePlantilla.style.zIndex="5";
        

        // Iframe video muerte
        const iframePlantilla = document.createElement("iframe");
        iframePlantilla.style.width="100%";
        iframePlantilla.style.height="90%";
        iframePlantilla.style.position="static";
        iframePlantilla.style.left="0px";
        iframePlantilla.style.top="50px";
        iframePlantilla.style.borderRadius="40px";
        iframePlantilla.style.marginTop="20px";


        // Div Frame
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

        // Boton Cerrar
        const botonCerrarPlantilla = document.createElement("button");
        botonCerrarPlantilla.classList.add("btn");
        botonCerrarPlantilla.classList.add("btn-danger");
        botonCerrarPlantilla.style.height="50px";
        botonCerrarPlantilla.style.width="100px";
        botonCerrarPlantilla.style.position="sticky";
        botonCerrarPlantilla.style.left="100%";
        
            // Icono del boton cerrar
            const iconoCerrarPlantilla = document.createElement("img");
            iconoCerrarPlantilla.style.height="35px"; 
            iconoCerrarPlantilla.setAttribute("src", "/assets/icons/x-lg.svg");

    // Titulo ver solo muertos
    const tituloBotonMuertos = document.createElement("p");
    tituloBotonMuertos.textContent="Ver solo personajes que mueren esta temporada: ";
    tituloBotonMuertos.style.gridColumn="1/4";
    tituloBotonMuertos.style.alignSelf="center";
    tituloBotonMuertos.style.marginTop="15px";
    tituloBotonMuertos.style.justifySelf="right";
    tituloBotonMuertos.style.position="relative";
    tituloBotonMuertos.style.left="40%";
    tituloBotonMuertos.style.width="160%";
    tituloBotonMuertos.id="tituloBotonMuertos";
    

    // Boton ver solo muertos
    const labelVerSoloMuertos = document.createElement("label");
    labelVerSoloMuertos.classList.add("switch");
    labelVerSoloMuertos.style.gridColumn="4/5";
    labelVerSoloMuertos.style.justifySelf="right";
    labelVerSoloMuertos.style.marginBlock="25px";

    const botonVerSoloMuertos = document.createElement("input");
    botonVerSoloMuertos.setAttribute("type", "checkbox");
    botonVerSoloMuertos.id = "verSoloMuertos";


    const span = document.createElement("span");
    span.classList.add("slider");
    span.classList.add("round");
    labelVerSoloMuertos.append(botonVerSoloMuertos,span);
    main.append(tituloBotonMuertos, labelVerSoloMuertos);
    


    let personajes=new Array();

    // Recogemos la temporada del nombre del html
    const thisSeason = document.URL.split("/").at(-1).split(".").at(0).at(-1);

    cargarDatos= async ()=>{
       
        try {
            const response = await fetch("/assets/json/personajes.json");
            if(!response.ok){
                throw new Error("Error en la petición: "+response.status);
            }

            // Cargar personajes
            let respuestaJSON = await response.json();

            // Rellenar arrays
            respuestaJSON.map(character => {
                personajes.push(character);
            });

            // Añadir elementos al card
            personajes.map(personaje => {
                // Solo mostraremos los que sigan vivos o mueran en esta temporada.
                if(thisSeason<=personaje.deadSeason || personaje.deadSeason===""){
                    // Crear card
                    let card = cardPlantila.cloneNode();
                    
                    // Asignarle la imagen
                    let imagen = imgPlantilla.cloneNode();
                    imagen.setAttribute("src", carpetaPersonajes+personaje.image);
                    imagen.setAttribute("alt", "Retrato de "+personaje.name);

                    // Asignarle el nombre
                    let nombre = h4Plantilla.cloneNode();
                    nombre.textContent=personaje.name;
                
                    // Crear el cuerpo de la tarjeta
                    let cardBody = cardBodyPlantilla.cloneNode(); 

                    // Si el personaque está muerto
                    if(personaje.deadSeason == thisSeason){
                        let eliminado = eliminadoPlantilla.cloneNode();
                        card.append(eliminado);
                        let botonMuerte = botonMuertePlantilla.cloneNode();
                        botonMuerte.setAttribute("muerte", personaje.muerte);
                        botonMuerte.textContent="Ver muerte";
                        cardBody.append(nombre, botonMuerte);
                    } else{ // Si esta vivo
                        cardBody.append(nombre);
                    }

                    // Asignarle al card la imagen y el cuerpo
                    card.append(imagen, cardBody);

                    // Añadir elementos al main
                    main.append(card);
                }
            });
        } catch (error) {
            alert("Algo ha fallado: \n"+error)
        }

        botonesMuerte = document.querySelectorAll(".botonMuerte");
        botonesMuerte.forEach(boton=>{
            let muerte = boton.getAttribute("muerte");
            
            boton.addEventListener("click", ()=>{

                if(videoActual){
                    videoActual.remove();
                }

                let iframe = iframePlantilla.cloneNode();
                iframe.setAttribute("src", muerte)

                let divIframe = divIframePlantilla.cloneNode();
                divIframe.classList.add("videoActual");

                let botonCerrar = botonCerrarPlantilla.cloneNode();
                botonCerrar.setAttribute("id","botonCerrar");

                let iconoCerrar =iconoCerrarPlantilla.cloneNode();
                botonCerrar.append(iconoCerrar);
                
                divIframe.append(botonCerrar, iframe);
                
                main.append(divIframe);

                videoActual = document.querySelector(".videoActual");
                botonCerrar = document.getElementById("botonCerrar");
                
                botonCerrar.addEventListener("click", ()=>{
                    videoActual.remove();
                })
                
            });
            
        });

        botonVerSoloMuertosElem = document.getElementById("verSoloMuertos");

        botonVerSoloMuertosElem.addEventListener("change", (e)=>{
            if (e.target.checked) {
                const cards = main.querySelectorAll('.card');
                cards.forEach(card => {
                    if (!card.querySelector('.muerto')) {
                        card.style.display = 'none'; // O card.remove() si quieres eliminarlo del DOM
                    }
                });
            } else{
                const cards = main.querySelectorAll('.card');
                cards.forEach(card => {
                    card.style.display = ''; // Restablece el display original
                });
            }
        })
        
        document.addEventListener("DOMContentLoaded", ()=>{

            let botonesMuerte;
            let videoActual;
            let botonVerSoloMuertosElem;
        
            // Ubicación de las imágenes de los personajes
            const carpetaPersonajes="/assets/images/personajes/";
        
            // Tarjeta para cada personaje
            const main= document.querySelector("main");
            const cardPlantila=document.createElement("div");
            cardPlantila.classList.add("card");
            const imgPlantilla=document.createElement("img");
            imgPlantilla.classList.add("card-img-top");
            const cardBodyPlantilla=document.createElement("div");
            cardBodyPlantilla.classList.add("card-body");
            const h4Plantilla=document.createElement("h4");
            h4Plantilla.classList.add("card-title");
            h4Plantilla.style.textAlign="center";
        
            // Eliminado
            const eliminadoPlantilla = document.createElement("div");
            eliminadoPlantilla.classList.add("muerto");
            
                // Boton del eliminado
                const botonMuertePlantilla= document.createElement("a");
                botonMuertePlantilla.classList.add("btn");
                botonMuertePlantilla.classList.add("btn-primary");
                botonMuertePlantilla.classList.add("botonMuerte");
                botonMuertePlantilla.style.position="relative";
                botonMuertePlantilla.style.zIndex="5";
                
        
                // Iframe video muerte
                const iframePlantilla = document.createElement("iframe");
                iframePlantilla.style.width="100%";
                iframePlantilla.style.height="90%";
                iframePlantilla.style.position="static";
                iframePlantilla.style.left="0px";
                iframePlantilla.style.top="50px";
                iframePlantilla.style.borderRadius="40px";
                iframePlantilla.style.marginTop="20px";
        
        
                // Div Frame
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
        
                // Boton Cerrar
                const botonCerrarPlantilla = document.createElement("button");
                botonCerrarPlantilla.classList.add("btn");
                botonCerrarPlantilla.classList.add("btn-danger");
                botonCerrarPlantilla.style.height="50px";
                botonCerrarPlantilla.style.width="100px";
                botonCerrarPlantilla.style.position="sticky";
                botonCerrarPlantilla.style.left="100%";
                
                    // Icono del boton cerrar
                    const iconoCerrarPlantilla = document.createElement("img");
                    iconoCerrarPlantilla.style.height="35px"; 
                    iconoCerrarPlantilla.setAttribute("src", "/assets/icons/x-lg.svg");
        
            // Titulo ver solo muertos
            const tituloBotonMuertos = document.createElement("p");
            tituloBotonMuertos.textContent="Ver solo personajes que mueren esta temporada: ";
            tituloBotonMuertos.style.gridColumn="1/4";
            tituloBotonMuertos.style.alignSelf="center";
            tituloBotonMuertos.style.marginTop="15px";
            tituloBotonMuertos.style.justifySelf="right";
            tituloBotonMuertos.style.position="relative";
            tituloBotonMuertos.style.left="40%";
            tituloBotonMuertos.style.width="160%";
            tituloBotonMuertos.id="tituloBotonMuertos";
            
        
            // Boton ver solo muertos
            const labelVerSoloMuertos = document.createElement("label");
            labelVerSoloMuertos.classList.add("switch");
            labelVerSoloMuertos.style.gridColumn="4/5";
            labelVerSoloMuertos.style.justifySelf="right";
            labelVerSoloMuertos.style.marginBlock="25px";
        
            const botonVerSoloMuertos = document.createElement("input");
            botonVerSoloMuertos.setAttribute("type", "checkbox");
            botonVerSoloMuertos.id = "verSoloMuertos";
        
        
            const span = document.createElement("span");
            span.classList.add("slider");
            span.classList.add("round");
            labelVerSoloMuertos.append(botonVerSoloMuertos,span);
            main.append(tituloBotonMuertos, labelVerSoloMuertos);
            
        
        
            let personajes=new Array();
        
            // Recogemos la temporada del nombre del html
            const thisSeason = document.URL.split("/").at(-1).split(".").at(0).at(-1);
        
            cargarDatos= async ()=>{
               
                try {
                    const response = await fetch("/assets/json/personajes.json");
                    if(!response.ok){
                        throw new Error("Error en la petición: "+response.status);
                    }
        
                    // Cargar personajes
                    let respuestaJSON = await response.json();
        
                    // Rellenar arrays
                    respuestaJSON.map(character => {
                        personajes.push(character);
                    });
        
                    // Añadir elementos al card
                    personajes.map(personaje => {
                        // Solo mostraremos los que sigan vivos o mueran en esta temporada.
                        if(thisSeason<=personaje.deadSeason || personaje.deadSeason===""){
                            // Crear card
                            let card = cardPlantila.cloneNode();
                            
                            // Asignarle la imagen
                            let imagen = imgPlantilla.cloneNode();
                            imagen.setAttribute("src", carpetaPersonajes+personaje.image);
                            imagen.setAttribute("alt", "Retrato de "+personaje.name);
        
                            // Asignarle el nombre
                            let nombre = h4Plantilla.cloneNode();
                            nombre.textContent=personaje.name;
                        
                            // Crear el cuerpo de la tarjeta
                            let cardBody = cardBodyPlantilla.cloneNode(); 
        
                            // Si el personaque está muerto
                            if(personaje.deadSeason == thisSeason){
                                let eliminado = eliminadoPlantilla.cloneNode();
                                card.append(eliminado);
                                let botonMuerte = botonMuertePlantilla.cloneNode();
                                botonMuerte.setAttribute("muerte", personaje.muerte);
                                botonMuerte.textContent="Ver muerte";
                                cardBody.append(nombre, botonMuerte);
                            } else{ // Si esta vivo
                                cardBody.append(nombre);
                            }
        
                            // Asignarle al card la imagen y el cuerpo
                            card.append(imagen, cardBody);
        
                            // Añadir elementos al main
                            main.append(card);
                        }
                    });
                } catch (error) {
                    alert("Algo ha fallado: \n"+error)
                }
        
                botonesMuerte = document.querySelectorAll(".botonMuerte");
                botonesMuerte.forEach(boton=>{
                    let muerte = boton.getAttribute("muerte");
                    
                    boton.addEventListener("click", ()=>{
        
                        if(videoActual){
                            videoActual.remove();
                        }
        
                        let iframe = iframePlantilla.cloneNode();
                        iframe.setAttribute("src", muerte)
        
                        let divIframe = divIframePlantilla.cloneNode();
                        divIframe.classList.add("videoActual");
        
                        let botonCerrar = botonCerrarPlantilla.cloneNode();
                        botonCerrar.setAttribute("id","botonCerrar");
        
                        let iconoCerrar =iconoCerrarPlantilla.cloneNode();
                        botonCerrar.append(iconoCerrar);
                        
                        divIframe.append(botonCerrar, iframe);
                        
                        main.append(divIframe);
        
                        videoActual = document.querySelector(".videoActual");
                        botonCerrar = document.getElementById("botonCerrar");
                        
                        botonCerrar.addEventListener("click", ()=>{
                            videoActual.remove();
                        })
                        
                    });
                    
                });
        
                botonVerSoloMuertosElem = document.getElementById("verSoloMuertos");
        
                botonVerSoloMuertosElem.addEventListener("change", (e)=>{
                    if (e.target.checked) {
                        const cards = main.querySelectorAll('.card');
                        cards.forEach(card => {
                            if (!card.querySelector('.muerto')) {
                                card.style.display = 'none'; // O card.remove() si quieres eliminarlo del DOM
                            }
                        });
                    } else{
                        const cards = main.querySelectorAll('.card');
                        cards.forEach(card => {
                            card.style.display = ''; // Restablece el display original
                        });
                    }
                })
                
        
            }
        
            
            
        
        })
        

    }
    cargarDatos();

    
    

})
