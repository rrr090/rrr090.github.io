$(document).ready(function() {
  $('.has-submenu').click(function(e) {
    e.preventDefault();
    $(this).find('.submenu').slideToggle();
  });

  // Evitar que el submenú se cierre al hacer clic en un enlace del submenú
  $('.submenu').click(function(e) {
    e.stopPropagation(); // Evita que el evento se propague al elemento principal '.has-submenu'
  });
});

function close_info(){
    var objeto = document.querySelector('.scene-nav-infoo'); // Reemplaza 'tuDiv' con el ID de tu div
    objeto.style.display = 'none';
    var myElement = document.getElementById("closeinfo");
    myElement.style.display = "none";
}

function Update_celular() {
    // Obtén el tamaño de la pantalla
    var anchoPantalla = window.innerWidth;
    
    // Define el umbral para el ancho de pantalla de un celular
    var umbralCelular = 600; // Puedes ajustar este valor según tus necesidades
    
    // Obtén el div que deseas ocultar
    
    // Verifica si el ancho de pantalla es menor que el umbral
    if (anchoPantalla < umbralCelular) {
        var infoluna = document.getElementById('infoluna'); // Reemplaza 'tuDiv' con el ID de tu div
        var title = document.getElementById('title'); // Reemplaza 'tuDiv' con el ID de tu div
        // Oculta el div si se cumple la condición
        title.innerText = "";
        infoluna.style.display = 'none';
        var sceneNavMenu = document.querySelector(".scene-nav-menu");
        // Cambia el ancho del div
        sceneNavMenu.style.width = "160px"; // Puedes ajustar este valor según sea necesario
        var scenenavinfoo = document.querySelector(".scene-nav-infoo");
        // Cambia el ancho del div
        scenenavinfoo.style.width = "55%"; // Puedes ajustar este valor según sea necesario
    }
}

const toggle_menu = document.getElementById('botonmenu');
let menu = true;

function togglemenu() {
    if (menu) {
         var menuu = document.getElementById('menu'); // Reemplaza 'tuDiv' con el ID de tu div
         menuu.style.display = 'none';
         var menuClose = document.getElementById("MenuClose");
         menuClose.innerText = "+";
    } else {
       var menuu = document.getElementById('menu'); // Reemplaza 'tuDiv' con el ID de tu div
         menuu.style.display = 'block';
         var menuClose = document.getElementById("MenuClose");
         menuClose.innerText = "-";
    }
    menu = !menu;
        
    // Obtén el tamaño de la pantalla
    var anchoPantalla = window.innerWidth;
    
    // Define el umbral para el ancho de pantalla de un celular
    var umbralCelular = 600; // Puedes ajustar este valor según tus necesidades
    if(anchoPantalla<umbralCelular){
        
    }
}

toggle_menu.addEventListener('click', togglemenu);
document.getElementById('closeinfo').addEventListener('click', close_info);
Update_celular();