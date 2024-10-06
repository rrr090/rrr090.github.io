
function Init() {
   
   
    var myElement = document.querySelector(".inner");
  
    myElement.style.opacity = 0;

   
    setTimeout(function() {
        var myElement = document.querySelector(".inner");
        myElement.style.display = "none";

 
        var myElement = document.querySelector(".loading-prompt");
     
        myElement.style.display = "block";
        myElement.style.opacity = 1;
     
        var medidorDeProgreso = document.querySelector(".progress-meter");

      
        var carga = 0;
        var temporizador = setInterval(function() {
            carga += 5;
            medidorDeProgreso.style.width = carga + "%";

            if (carga >= 100) {
                clearInterval(temporizador);
                Init_end();
            }
        }, 300); 
    }, 800); 

}

function Init_end() {

    var myElement = document.querySelector(".container-main");
   
    myElement.style.display = "none";
 
    var myElement = document.querySelector(".scene-nav-menu");

    myElement.style.display = "block";

    var myElement = document.querySelector(".scene-title");

    myElement.style.display = "block";

    var myElement = document.getElementById("Exoplanet");

    myElement.style.display = "block";
}
