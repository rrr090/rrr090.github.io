//I think not doing anything
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const gradients = [
  "linear-gradient(270deg, #3b012d, #42003a, #470049, #4a005a, #4b006b, #48007c, #3e0e77, #30115d, #230f43, #150a2b, #080413, #000000)",
];

// Making Ufo cursor
circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  
  if (index === 0) {
    // Если это первый элемент - картинка
    circle.style.backgroundImage = "url('/nasabek/assets/images/ufo.png')";
    circle.style.backgroundSize = "cover";  // Картинка покрывает круг
    circle.style.backgroundPosition = "center";  // Центрируем картинку
    circle.style.backgroundColor = "transparent";  // Прозрачный фон
    circle.style.zIndex = 1000;  // На передний план
  } else {
    // Применяем градиент ко всем остальным кругам
    circle.style.backgroundImage = gradients[0];  // Применяем градиент
    circle.style.backgroundSize = "150%";  // Увеличиваем размер градиента
    circle.style.backgroundPosition = `${(index / circles.length) * 100}% 0`;  // Позиционируем градиент
    circle.style.zIndex = 1;  // Остальные круги на задний план
  }
  
  circle.style.borderRadius = "50%";  // Делаем круги круглыми
  circle.style.position = "absolute";  // Для работы z-index
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}


animateCircles();