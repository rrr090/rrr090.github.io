const toggle_Grat = document.getElementById('toggle_Grat');
let landingSitesVisible = false;
const toggle_atmosphere = document.getElementById('toggle_atmosphere');
const toggle_light = document.getElementById('toggle_light');
let lightVisible=true;
const sliderTemp = document.getElementById("ranTemp");
const valueTemp = document.getElementById("tempVal");
const sliderAlt = document.getElementById("ranAlt");
const valueAlt = document.getElementById("altVal");
const sliderSize = document.getElementById("ranSize");
const valueSize = document.getElementById("sizeVal");
const starTypeVal = document.getElementById("exoTypeSelect");


let contador_blink=0;


function ambientLightOn() {
    const directionalLight = exoplanet.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
        if (directionalLight) {
            directionalLight.intensity=0;
        }
        const ambientLight = exoplanet.scene().children.find(obj3d => obj3d.type === 'AmbientLight');
        if (ambientLight) {
            ambientLight.intensity=3.14;
        }
        if(!toggle_light.checked){
            toggle_light.checked=true;
        }
      

        
}

function ambientLightOFF() {
    const ambientLight = exoplanet.scene().children.find(obj3d => obj3d.type === 'AmbientLight');
        if (ambientLight) {
            ambientLight.intensity=0;
        }
        const directionalLight = exoplanet.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
        if (directionalLight) {
            directionalLight.intensity=2;
        }
        if(toggle_light.checked){
            toggle_light.checked=false;
        }
}
//Fin

function colorChange() {
  
    const colorStops = [
        { temp: 0, color: '#000080' },           // Deep Blue for 0°C
        { temp: 250, color: '#007FFF' },         // Light Blue for 250°C
        { temp: 500, color: '#00BFFF' },         // Sky Blue for 500°C
        { temp: 750, color: '#A3E4FF' },         // Light Cyan for 750°C
        { temp: 1000, color: '#C0E8FF' },        // Soft Cyan for 1000°C
        { temp: 1250, color: '#FFE4B5' },        // Light Peach for 1250°C
        { temp: 1500, color: '#FFDAB9' },        // Peach for 1500°C
        { temp: 1750, color: '#FFDF80' },        // Light Yellow for 1750°C
        { temp: 2000, color: '#FFCC66' },        // Soft Yellow for 2000°C
        { temp: 2250, color: '#FFB347' },        // Yellow Orange for 2250°C
        { temp: 2500, color: '#FFA07A' },        // Light Salmon for 2500°C
        { temp: 2750, color: '#FF6347' },        // Tomato for 2750°C
        { temp: 3000, color: '#FF4500' },        // Orange Red for 3000°C
        { temp: 3250, color: '#A40000' },        // Red for 3250°C
        { temp: 3500, color: '#4B0000' },        // Dark Red for 3500°C
        { temp: 3750, color: '#2C0000' },        // Very Dark Red for 3750°C
        { temp: 4000, color: '#1A1A1A' },        // Almost Black for 4000°C
        { temp: 4500, color: '#000000' }         // Black for above 4000°C
    ];

    // Get the temperature value from the slider
    const tempValue = sliderTemp.value;

    // Find the appropriate color based on the temperature
    for (let i = 0; i < colorStops.length - 1; i++) {
        const start = colorStops[i];
        const end = colorStops[i + 1];

        // Check if the temperature falls between the current and next color stop
        if (tempValue >= start.temp && tempValue <= end.temp) {
            // Interpolate the color
            const ratio = (tempValue - start.temp) / (end.temp - start.temp);
            const color = interpolateColor(start.color, end.color, ratio);
            exoplanet.atmosphereColor(color);
            break;
        }
    }

    exoplanet.update();
}

// Function to interpolate between two colors
function interpolateColor(color1, color2, ratio) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio);
    
    return rgbToHex(r, g, b);
}

// Function to convert hex color to RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

// Function to convert RGB to hex color
function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

toggle_Grat.addEventListener("change", () => {
    exoplanet.showGraticules(toggle_Grat.checked);
  });
toggle_atmosphere.addEventListener("change", () => {
    exoplanet.showAtmosphere(toggle_atmosphere.checked);
  });


   
 


function togglelight() {
    if (lightVisible) {
        //!Check Is not a texture
        // if (toggle_light.checked){}
            ambientLightOn();
    } else {
        //!Check Add transition
        // if (!toggle_light.checked){}
            ambientLightOFF();

    }
    lightVisible = !lightVisible;
}

function cargar_textura(ruta){
    var myElement = document.getElementById("cargando");
    myElement.style.display = "block";
    const loader = new THREE.TextureLoader();
    // load a resource
    const texture = loader.load(
        // resource URL
        ruta,
        // onLoad callback
        function ( texture ) {
            var myElement = document.getElementById("cargando");
            myElement.style.display = "none";
        },
        // onProgress callback currently not supported
        undefined,
        // onError callback
        function ( err ) {
            console.error( 'An error happened.' );
        }
    );
    exoplanet.globeMaterial(new THREE.MeshStandardMaterial({ map: texture }));
}


//Listen for toggles buttons 
toggle_Grat.addEventListener('click', toggle_Grat);
toggle_atmosphere.addEventListener('click', colorChange);
toggle_light.addEventListener('click', togglelight);


let dateSelected;
// Function to update the displayed date and background color
function updateSliders() {
  let temp = parseInt(sliderTemp.value, 10) ;
  let alt = parseInt(sliderAlt.value, 10) ;
  let size = parseInt(sliderSize.value, 10) ;
  valueAlt.textContent = alt + "%";
  valueTemp.textContent = temp;
  valueSize.textContent = size;

  // Set the background color with linear gradients for each slider


}


// Add event listeners to each slider
sliderTemp.addEventListener("input", () => {
  updateSliders();
  colorChange();
  exoplanet.update();

});
//NOT READY KKK
sliderAlt.addEventListener("input", () => {
    // Convert slider value to a float representing the atmosphere altitude
    const altitudeValue = Math.min(sliderAlt.value / 100, 1); // Max altitude is 1 for slider value 10

    // Set the atmosphere altitude
    exoplanet.atmosphereAltitude(altitudeValue);

    // Call the update functions
    updateSliders();
    colorChange();
    exoplanet.update();
});
sliderSize.addEventListener("input", () => {
    const sizeValue = Math.max(1, Math.min(10,11-sliderSize.value));
    exoplanet.pointOfView({altitude: sizeValue});
    updateSliders();
    colorChange();
    exoplanet.update();
});
starTypeVal.addEventListener("input",() =>{
    generateTexture();
    updateGlobeImageUrl();

})
let loadingIndex = 0;
const loadingText = document.getElementById('loading-text');
const loadingStates = ["Loading", "Loading.", "Loading..", "Loading..."];

// Функция для смены текста
function updateLoadingText() {
    loadingText.textContent = loadingStates[loadingIndex];
    loadingIndex = (loadingIndex + 1) % loadingStates.length; // Циклически обновляем индекс
}

// Обновляем текст каждые 500 мс
setInterval(updateLoadingText, 500);


// Call the function initially to set the initial displayed date and background color
updateSliders();


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
    circle.style.backgroundImage = "url('/textures/ufo.png')";
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

