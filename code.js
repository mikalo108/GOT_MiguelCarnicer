document.addEventListener("DOMContentLoaded", ()=>{
    // Todo el padding de a será el botón
    const botones = document.querySelectorAll("a");
    botones.forEach(a=>{
        let button = a.parentNode;
        let link = a.getAttribute("href");
        button.addEventListener("click", ()=>{
            window.location.href=link;
        })
    })
})
