$(document).ready(function() {
  $('.has-submenu').click(function(e) {
    e.preventDefault();
    $(this).find('.submenu').slideToggle();
  });

  $('.submenu').click(function(e) {
    e.stopPropagation(); 
  });
});

function close_info(){
    var object = document.querySelector('.scene-nav-infoo'); 
    object.style.display = 'none';
    var myElement = document.getElementById("closeinfo");
    myElement.style.display = "none";
}

function Update_celular() {
    
    var screenWidth = window.innerWidth;
    
    
    var shadow = 600; 
    
    
    if (screenWidth < shadow) {
        var infoluna = document.getElementById('infoluna');
        var title = document.getElementById('title'); 
      
        title.innerText = "";
        infoluna.style.display = 'none';
        var sceneNavMenu = document.querySelector(".scene-nav-menu");
       
        sceneNavMenu.style.width = "160px"; 
        var scenenavinfoo = document.querySelector(".scene-nav-infoo");
       
        scenenavinfoo.style.width = "55%"; 
    }
}

const toggle_menu = document.getElementById('botonmenu');
let menu = true;

function togglemenu() {
    if (menu) {
         var menuu = document.getElementById('menu');
         menuu.style.display = 'none';
         var menuClose = document.getElementById("MenuClose");
         menuClose.innerText = "+";
    } else {
       var menuu = document.getElementById('menu');
         menuu.style.display = 'block';
         var menuClose = document.getElementById("MenuClose");
         menuClose.innerText = "-";
    }
    menu = !menu;
        
 
    var screenWidth = window.innerWidth;
    
   
    var shadow = 600;
    if(screenWidth<shadow){
        
    }
}

toggle_menu.addEventListener('click', togglemenu);
Update_celular();